import {fetchTheme} from '@shopify/cli-kit/node/themes/api'
import {UNPUBLISHED_THEME_ROLE} from '@shopify/cli-kit/node/themes/utils'
import {AbortError} from '@shopify/cli-kit/node/error'
import type {AdminSession} from '@shopify/cli-kit/node/session'
import type {Theme} from '@shopify/cli-kit/node/themes/types'

interface AgentPushFlags {
  live?: boolean
  allowLive?: boolean
  publish?: boolean
  development?: boolean
  developmentContext?: string
}

export function assertAgentSafePushFlags(flags: AgentPushFlags): void {
  if (flags.live || flags.allowLive || flags.publish || flags.development || flags.developmentContext) {
    throw new AbortError(
      'Shopify CLI Agents can push only to unpublished themes. ' +
        '--live, --allow-live, --publish and --development are forbidden.',
    )
  }
}

/** Even if a theme selector returns a stale entry, deny any non-draft role. */
export function assertUnpublishedSelectedTheme(theme: Theme): void {
  if (theme.role !== UNPUBLISHED_THEME_ROLE) {
    throw new AbortError(`Refusing to modify theme ${theme.id}: role is "${theme.role}", not "unpublished".`)
  }
}

/** Recheck from Shopify; fail closed on inaccessible, missing or published themes. */
export async function assertUnpublishedTheme(themeId: number, session: AdminSession): Promise<void> {
  const current = await fetchTheme(themeId, session)
  if (!current || String(current.id) !== String(themeId) || current.role !== UNPUBLISHED_THEME_ROLE) {
    throw new AbortError(`Refusing to modify theme ${themeId}: Shopify did not confirm it is currently unpublished.`)
  }
}
