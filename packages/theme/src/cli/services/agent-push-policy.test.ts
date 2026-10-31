import {assertAgentSafePushFlags, assertUnpublishedSelectedTheme, assertUnpublishedTheme} from './agent-push-policy.js'
import {createOrSelectTheme} from './push.js'
import {findOrSelectTheme} from '../utilities/theme-selector.js'
import {fetchTheme, themeCreate} from '@shopify/cli-kit/node/themes/api'
import {buildTheme} from '@shopify/cli-kit/node/themes/factories'
import {test, describe, vi, expect, beforeEach} from 'vitest'
import type {AdminSession} from '@shopify/cli-kit/node/session'

vi.mock('@shopify/cli-kit/node/themes/api')
vi.mock('../utilities/theme-selector.js')

const session = {storeFqdn: 'example.myshopify.com', token: 'test-token'} as AdminSession
const draft = buildTheme({id: 42, name: 'Working Copy', role: 'unpublished'})!
const live = buildTheme({id: 43, name: 'Published', role: 'live'})!
const development = buildTheme({id: 44, name: 'Dev', role: 'development'})!

describe('agent draft-only push policy', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(fetchTheme).mockResolvedValue(draft)
  })

  test('accepts no flags (interactive) and explicit draft IDs', () => {
    expect(() => assertAgentSafePushFlags({})).not.toThrow()
    expect(() => assertAgentSafePushFlags({})).not.toThrow()
  })

  test.each([
    {live: true},
    {allowLive: true},
    {publish: true},
    {development: true},
    {developmentContext: 'agent'},
  ])('rejects unsafe flags before remote calls: %j', (flags) => {
    expect(() => assertAgentSafePushFlags(flags)).toThrow(/unpublished/)
  })

  test('allows verified unpublished targets and rejects live/development roles', () => {
    expect(() => assertUnpublishedSelectedTheme(draft)).not.toThrow()
    expect(() => assertUnpublishedSelectedTheme(live)).toThrow(/not "unpublished"/)
    expect(() => assertUnpublishedSelectedTheme(development)).toThrow(/not "unpublished"/)
  })

  test('fetches current role from Shopify before writes', async () => {
    await expect(assertUnpublishedTheme(42, session)).resolves.toBeUndefined()
    expect(fetchTheme).toHaveBeenCalledWith(42, session)
  })

  test.each([live, development, undefined])('rejects missing or non-unpublished current role: %s', async (theme) => {
    vi.mocked(fetchTheme).mockResolvedValue(theme)
    await expect(assertUnpublishedTheme(42, session)).rejects.toThrow(/did not confirm/)
  })

  test('rejects a theme ID mismatch even if role is unpublished', async () => {
    vi.mocked(fetchTheme).mockResolvedValue(buildTheme({id: 12, name: 'Other', role: 'unpublished'}))
    await expect(assertUnpublishedTheme(42, session)).rejects.toThrow()
  })

  test('interactive selection asks for unpublished themes only', async () => {
    vi.mocked(findOrSelectTheme).mockResolvedValue(draft)
    await expect(createOrSelectTheme(session, {})).resolves.toEqual(draft)
    expect(findOrSelectTheme).toHaveBeenCalledWith(session, expect.objectContaining({
      allowedRoles: ['unpublished'],
      filter: {theme: undefined},
    }))
  })

  test('rejects a live theme even if a selector incorrectly returns one', async () => {
    vi.mocked(findOrSelectTheme).mockResolvedValue(live)
    await expect(createOrSelectTheme(session, {theme: '43'})).rejects.toThrow(/not "unpublished"/)
  })

  test('allows creation of new unpublished themes only', async () => {
    vi.mocked(themeCreate).mockResolvedValue(draft)
    const result = await createOrSelectTheme(session, {unpublished: true, theme: 'Working Copy'})
    expect(themeCreate).toHaveBeenCalledWith({name: 'Working Copy', role: 'unpublished'}, session)
    expect(result).toMatchObject({role: 'unpublished', createdAtRuntime: true})
  })

  test('denies a newly created theme if Shopify returns an unexpected role', async () => {
    vi.mocked(themeCreate).mockResolvedValue(live)
    await expect(createOrSelectTheme(session, {unpublished: true, theme: 'Bad'})).rejects.toThrow()
  })

  test('blocks forbidden flags without selecting or creating a theme', async () => {
    await expect(createOrSelectTheme(session, {publish: true})).rejects.toThrow()
    expect(findOrSelectTheme).not.toHaveBeenCalled()
    expect(themeCreate).not.toHaveBeenCalled()
  })
})
