import {readFileSync, writeFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'

const manifestPath = fileURLToPath(new URL('../packages/cli/oclif.manifest.json', import.meta.url))
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
const allowed = new Set([
  'help',
  'version',
  'theme:init',
  'theme:check',
  'theme:language-server',
  'theme:package',
  'theme:list',
  'theme:info',
  'theme:pull',
  'theme:push',
])
if (![...allowed].every((name) => manifest.commands?.[name])) {
  throw new Error('The Shopify Oclif manifest changed: cannot verify safe command allowlist.')
}
manifest.commands = Object.fromEntries(
  Object.entries(manifest.commands).filter(([name]) => allowed.has(name)),
)
const push = manifest.commands['theme:push']
push.summary = 'Push only to unpublished themes; live themes and publishing are forbidden.'
push.description = 'Push only to unpublished themes; live themes and publishing are forbidden.'
push.descriptionWithMarkdown = push.description
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log('Retained only the 10 authorized commands in the Shopify CLI manifest.')
