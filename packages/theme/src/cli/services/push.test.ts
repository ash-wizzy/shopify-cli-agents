import {push, createOrSelectTheme} from './push.js'
import {findOrSelectTheme} from '../utilities/theme-selector.js'
import {hasRequiredThemeDirectories} from '../utilities/theme-fs.js'
import {uploadTheme} from '../utilities/theme-uploader.js'
import {runThemeCheck} from '../commands/theme/check.js'
import {ensureAuthenticatedThemes} from '@shopify/cli-kit/node/session'
import {fetchTheme, fetchChecksums, themeCreate, themePublish} from '@shopify/cli-kit/node/themes/api'
import {buildTheme} from '@shopify/cli-kit/node/themes/factories'
import {describe, test, expect, vi, beforeEach} from 'vitest'
import {Severity, SourceCodeType} from '@shopify/theme-check-node'
import {AbortError} from '@shopify/cli-kit/node/error'
import type {PushFlags} from './push.js'

vi.mock('../utilities/theme-selector.js')
vi.mock('../utilities/theme-fs.js')
vi.mock('../utilities/theme-uploader.js')
vi.mock('../utilities/theme-store.js')
vi.mock('../utilities/theme-listing.js')
vi.mock('../commands/theme/check.js')
vi.mock('@shopify/cli-kit/node/themes/api')
vi.mock('@shopify/cli-kit/node/session')
vi.mock('@shopify/cli-kit/node/ui')

const adminSession = {token: 'test-token', storeFqdn: 'example.myshopify.com'}
const draft = buildTheme({id: 42, name: 'Safe Draft', role: 'unpublished'})!
const live = buildTheme({id: 43, name: 'Published', role: 'live'})!
const defaultFlags: PushFlags = {path: '/my-theme', theme: '42'}

describe('agent-only theme push service', () => {
  beforeEach(() => {
    vi.mocked(findOrSelectTheme).mockResolvedValue(draft)
    vi.mocked(fetchTheme).mockResolvedValue(draft)
    vi.mocked(fetchChecksums).mockResolvedValue([])
    vi.mocked(hasRequiredThemeDirectories).mockResolvedValue(true)
    vi.mocked(ensureAuthenticatedThemes).mockResolvedValue(adminSession)
    vi.mocked(uploadTheme).mockReturnValue({
      workPromise: Promise.resolve(),
      uploadResults: new Map(),
      hasChanges: false,
      renderThemeSyncProgress: async () => {},
    })
  })

  test('pushes only when Shopify confirms the current theme is unpublished', async () => {
    await push(defaultFlags, adminSession)
    expect(fetchTheme).toHaveBeenCalledWith(42, adminSession)
    expect(uploadTheme).toHaveBeenCalledTimes(1)
    const [, , , , options] = vi.mocked(uploadTheme).mock.calls[0]!
    expect(options!.assertCanWrite).toBeTypeOf('function')
    await options!.assertCanWrite!()
    expect(fetchTheme).toHaveBeenCalledTimes(2)
    expect(themePublish).not.toHaveBeenCalled()
  })

  test('rejects a theme that became live after selection, without uploading', async () => {
    vi.mocked(fetchTheme).mockResolvedValue(live)
    await expect(push(defaultFlags, adminSession)).rejects.toThrow(/currently unpublished/)
    expect(uploadTheme).not.toHaveBeenCalled()
  })

  test('rejects an explicit live theme even if the picker returns one', async () => {
    vi.mocked(findOrSelectTheme).mockResolvedValue(live)
    await expect(push({...defaultFlags, theme: '43'}, adminSession)).rejects.toThrow(/not "unpublished"/)
    expect(uploadTheme).not.toHaveBeenCalled()
    expect(themePublish).not.toHaveBeenCalled()
  })

  test.each([
    {publish: true},
    {live: true},
    {allowLive: true},
    {development: true},
    {developmentContext: 'foo'},
  ])('blocks forbidden flags before authentication or writes: %j', async (flags) => {
    await expect(push({...defaultFlags, ...flags}, adminSession)).rejects.toThrow(/unpublished/)
    expect(uploadTheme).not.toHaveBeenCalled()
    expect(findOrSelectTheme).not.toHaveBeenCalled()
  })

  test('uses a strict draft-only picker for interactive push', async () => {
    await createOrSelectTheme(adminSession, {})
    expect(findOrSelectTheme).toHaveBeenCalledWith(adminSession, expect.objectContaining({
      create: true,
      filter: {theme: undefined},
      allowedRoles: ['unpublished'],
    }))
  })

  test('creates an unpublished theme with the proper role', async () => {
    vi.mocked(themeCreate).mockResolvedValue(draft)
    await push({path: '/my-theme', unpublished: true, theme: 'Safe Draft'}, adminSession)
    expect(themeCreate).toHaveBeenCalledWith({name: 'Safe Draft', role: 'unpublished'}, adminSession)
    expect(uploadTheme).toHaveBeenCalledTimes(1)
  })

  test('rejects strict theme-check errors before uploading', async () => {
    vi.mocked(runThemeCheck).mockResolvedValue({
      offenses: [{
        severity: Severity.ERROR,
        message: 'Broken Liquid',
        check: 'SyntaxError',
        uri: 'file:///my-theme/layout/theme.liquid',
        type: SourceCodeType.LiquidHtml,
        start: {index: 0, line: 1, character: 1},
        end: {index: 1, line: 1, character: 2},
      }],
      theme: [],
    })
    await expect(push({...defaultFlags, strict: true}, adminSession)).rejects.toThrow(AbortError)
    expect(uploadTheme).not.toHaveBeenCalled()
  })
})
