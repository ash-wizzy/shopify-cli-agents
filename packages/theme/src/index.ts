import CheckCommand from './cli/commands/theme/check.js'
import ThemeInfo from './cli/commands/theme/info.js'
import Init from './cli/commands/theme/init.js'
import LanguageServer from './cli/commands/theme/language-server.js'
import ListCommnd from './cli/commands/theme/list.js'
import Package from './cli/commands/theme/package.js'
import Pull from './cli/commands/theme/pull.js'
import Push from './cli/commands/theme/push.js'

// AGENT THEME COMMANDS: only unpublished-theme push is permitted; publish and other mutations remain disabled.
const COMMANDS = {
  'theme:init': Init,
  'theme:check': CheckCommand,
  'theme:language-server': LanguageServer,
  'theme:package': Package,
  'theme:list': ListCommnd,
  'theme:info': ThemeInfo,
  'theme:pull': Pull,
  'theme:push': Push,
}

export default COMMANDS

/** Development server for theme extensions */
export * from './cli/utilities/theme-ext-environment/theme-ext-server.js'

/** Storefront authentication support for running the development server on password-protected stores */
export {isStorefrontPasswordProtected} from './cli/utilities/theme-environment/storefront-session.js'
export {ensureValidPassword} from './cli/utilities/theme-environment/storefront-password-prompt.js'
export {
  fetchOrCreateCrawlerSignatureHeaders,
  type CrawlerSignatureHeaders,
} from './cli/utilities/theme-environment/crawler-signature.js'

// Expose core utilities for developers to build and expand on the CLI
export {pull} from './cli/services/pull.js'
export {push} from './cli/services/push.js'
export {publicFetchStoreThemes as fetchStoreThemes} from './cli/utilities/theme-selector/fetch.js'
