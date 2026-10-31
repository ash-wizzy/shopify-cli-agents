import {themePushResultSchema, themePushJsonResult} from './push/types.js'
import {checkThemeBeforePush, renderThemePushResult} from './push/result.js'
import {hasRequiredThemeDirectories, mountThemeFileSystem} from '../utilities/theme-fs.js'
import {uploadTheme} from '../utilities/theme-uploader.js'
import {ensureDirectoryConfirmed} from '../utilities/theme-ui.js'
import {DevelopmentThemeManager} from '../utilities/development-theme-manager.js'
import {findOrSelectTheme} from '../utilities/theme-selector.js'
import {assertAgentSafePushFlags, assertUnpublishedTheme, assertUnpublishedSelectedTheme} from './agent-push-policy.js'
import {configureCLIEnvironment} from '../utilities/cli-config.js'
import {ensureThemeStore} from '../utilities/theme-store.js'
import {ensureListingExists, getListingFilePath} from '../utilities/theme-listing.js'
import {AdminSession, ensureAuthenticatedThemes} from '@shopify/cli-kit/node/session'
import {themeCreate, fetchChecksums} from '@shopify/cli-kit/node/themes/api'
import {Theme} from '@shopify/cli-kit/node/themes/types'
import {themeEditorUrl, themePreviewUrl} from '@shopify/cli-kit/node/themes/urls'
import {cwd, resolvePath} from '@shopify/cli-kit/node/path'
import {
  promptThemeName,
  UNPUBLISHED_THEME_ROLE,
} from '@shopify/cli-kit/node/themes/utils'
import {AbortError} from '@shopify/cli-kit/node/error'
import {recordTiming} from '@shopify/cli-kit/node/analytics'

import {Writable} from 'stream'

interface PushOptions {
  path: string
  nodelete?: boolean
  force?: boolean
  publish?: boolean
  ignore?: string[]
  only?: string[]
  allowLive?: boolean
  environment?: string
  multiEnvironment?: boolean
  listing?: string
}

export interface PushFlags {
  /** The path to your theme directory. */
  path?: string

  /** Password generated from the Theme Access app. */
  password?: string

  /** Store URL. It can be the store prefix (example) or the full myshopify.com URL (example.myshopify.com, https://example.myshopify.com). */
  store?: string

  /** Theme ID or name of the remote theme. */
  theme?: string

  /** Push theme files from your remote development theme. */
  development?: boolean

  /**
   * Unique identifier for a development theme context (e.g., PR number, branch name).
   * Reuses an existing development theme with this context name, or creates one if none exists.
   */
  developmentContext?: string

  /** Push theme files from your remote live theme. */
  live?: boolean

  /** Create a new unpublished theme and push to it. */
  unpublished?: boolean

  /** Runs the push command without deleting local files. */
  nodelete?: boolean

  /** Push only the specified files (Multiple flags allowed). */
  only?: string[]

  /** Skip downloading the specified files (Multiple flags allowed). */
  ignore?: string[]

  /** Output JSON instead of a UI. */
  json?: boolean

  /** Allow push to a live theme. */
  allowLive?: boolean

  /** Publish as the live theme after uploading. */
  publish?: boolean

  /** Proceed without confirmation, if current directory does not seem to be theme directory. */
  force?: boolean

  /** Disable color output. */
  noColor?: boolean

  /** Increase the verbosity of the output. */
  verbose?: boolean

  /** Require theme check to pass without errors before pushing. Warnings are allowed. */
  strict?: boolean

  /** The environment to push the theme to. */
  environment?: string[]

  /** The listing preset to use for multi-preset themes. */
  listing?: string
}

/**
 * Initiates the push process based on provided flags.
 *
 * @param flags - The flags for the push operation.
 */
export async function executeThemePush(
  flags: Omit<PushFlags, 'json' | 'strict'>,
  adminSession?: AdminSession,
  multiEnvironment?: boolean,
  context?: {stdout?: Writable; stderr?: Writable},
) {
  assertAgentSafePushFlags(flags)

  const environment = flags.environment?.[0]

  // when push is used programmatically, we don't have an admin session, so need to create one
  const session =
    adminSession ?? (await ensureAuthenticatedThemes(ensureThemeStore({store: flags.store}), flags.password))

  recordTiming('theme-service:push:setup')

  configureCLIEnvironment({
    verbose: flags.verbose,
    noColor: flags.noColor,
  })

  const force = flags.force ?? false

  const workingDirectory = flags.path ? resolvePath(flags.path) : cwd()
  if (
    !(await hasRequiredThemeDirectories(workingDirectory)) &&
    !(await ensureDirectoryConfirmed(force, undefined, environment, multiEnvironment))
  ) {
    return
  }

  if (flags.listing) {
    await ensureListingExists(workingDirectory, flags.listing)
  }

  const selectedTheme: Theme | undefined = await createOrSelectTheme(session, flags, multiEnvironment)
  if (!selectedTheme) {
    return
  }

  recordTiming('theme-service:push:setup')

  return executePush(
    selectedTheme,
    session,
    {
      allowLive: flags.allowLive ?? false,
      environment,
      force,
      ignore: flags.ignore ?? [],
      multiEnvironment,
      nodelete: flags.nodelete ?? false,
      only: flags.only ?? [],
      path: workingDirectory,
      publish: flags.publish ?? false,
      listing: flags.listing,
    },
    context,
  )
}

/**
 * Executes the push operation for a specific theme.
 *
 * @param theme - the remote theme to be updated by the push command
 * @param session - the admin session to access the API and upload the theme
 * @param options - the options that modify how the theme gets uploaded
 */
async function executePush(
  theme: Theme,
  session: AdminSession,
  options: PushOptions,
  context?: {stdout?: Writable; stderr?: Writable},
) {
  assertUnpublishedSelectedTheme(theme)
  await assertUnpublishedTheme(theme.id, session)
  recordTiming('theme-service:push:file-system')
  const themeChecksums = await fetchChecksums(theme.id, session)
  const themeFileSystem = mountThemeFileSystem(options.path, {
    filters: options,
    listing: options.listing,
  })
  recordTiming('theme-service:push:file-system')

  let sourcePaths: Record<string, string> | undefined
  if (options.listing) {
    const listing = options.listing
    await themeFileSystem.ready()
    sourcePaths = Object.fromEntries(
      await Promise.all(
        [...themeFileSystem.files.keys()].map(async (key) => [
          key,
          (await getListingFilePath(options.path, listing, key)) ?? key,
        ]),
      ),
    )
  }

  const upload = uploadTheme(
    theme,
    session,
    themeChecksums,
    themeFileSystem,
    {...options, assertCanWrite: () => assertUnpublishedTheme(theme.id, session)},
    context,
  )

  await upload.renderThemeSyncProgress()
  const {uploadResults} = upload

  const errors: Record<string, string[]> = {}
  for (const [key, result] of uploadResults) {
    if (!result.success) {
      errors[key] = result.errors?.asset?.length ? result.errors.asset : ['File upload failed']
    }
  }

  const result = themePushResultSchema.parse({
    environment: options.environment,
    directory: options.path,
    ...(sourcePaths && {sourcePaths}),
    changed: theme.createdAtRuntime === true || options.publish === true || upload.hasChanges,
    theme: {
      id: theme.id,
      name: theme.name,
      role: theme.role,
      shop: session.storeFqdn,
      editor_url: themeEditorUrl(theme, session),
      preview_url: themePreviewUrl(theme, session),
    },
    published: options.publish ?? false,
    hasErrors: [...uploadResults.values()].some((result) => !result.success),
    errors,
  })
  if (result.hasErrors && !result.changed) {
    const error = new AbortError(`The theme '${theme.name}' could not be pushed.`)
    error.details = {themeId: String(theme.id), issues: themePushJsonResult(result).issues}
    throw error
  }
  return result
}

export async function createOrSelectTheme(
  session: AdminSession,
  flags: PushFlags,
  _multiEnvironment?: boolean,
): Promise<Theme | undefined> {
  assertAgentSafePushFlags(flags)
  const {unpublished, theme} = flags
  if (unpublished) {
    const themeName = theme ?? (await promptThemeName('Name of the new unpublished theme'))
    const created = await themeCreate({name: themeName, role: UNPUBLISHED_THEME_ROLE}, session)
    if (created) assertUnpublishedSelectedTheme(created)
    return created ? {...created, createdAtRuntime: true} : undefined
  }

  const selected = await findOrSelectTheme(session, {
    create: true,
    header: 'Select an unpublished theme to push to:',
    filter: {theme},
    allowedRoles: [UNPUBLISHED_THEME_ROLE],
  })
  if (selected) assertUnpublishedSelectedTheme(selected)
  return selected
}

/** Compatibility adapter for callers of the exported theme API. */
export async function push(
  flags: PushFlags,
  adminSession?: AdminSession,
  multiEnvironment?: boolean,
  context?: {stdout?: Writable; stderr?: Writable},
): Promise<void> {
  assertAgentSafePushFlags(flags)

  const session =
    adminSession ?? (await ensureAuthenticatedThemes(ensureThemeStore({store: flags.store}), flags.password))
  await checkThemeBeforePush(flags, true)
  const result = await executeThemePush(flags, session, multiEnvironment, context)
  if (result) renderThemePushResult(result, flags.json ? 'json' : 'text')
}
