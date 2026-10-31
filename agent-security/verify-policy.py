#!/usr/bin/env python3
"""Static verification for the Shopify CLI agent-restricted build."""
from pathlib import Path
import json
import re
import sys

r = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path.cwd()
root = (r / 'packages/cli/src/index.ts').read_text()
theme = (r / 'packages/theme/src/index.ts').read_text()
push = (r / 'packages/theme/src/cli/services/push.ts').read_text()

root_commands = re.search(r'const AGENT_ALLOWED_COMMANDS = new Set\(\[([\s\S]*?)\]\)', root)
assert root_commands, 'Missing root command allowlist'
allowed = set(re.findall(r"'([^']+)'", root_commands.group(1)))
expected = {'help','version','auth:login','auth:logout','theme:init','theme:check','theme:language-server',
            'theme:package','theme:list','theme:info','theme:pull','theme:push','store:list','organization:list'}
assert allowed == expected, f'Unexpected root commands: {allowed ^ expected}'
assert 'Object.entries(ALL_COMMANDS).filter(([command]) => AGENT_ALLOWED_COMMANDS.has(command))' in root

block = re.search(r'// AGENT THEME COMMANDS[\s\S]*?const COMMANDS = \{([\s\S]*?)\n\}', theme)
assert block, 'Missing theme command registration boundary'
registered = set(re.findall(r"'([^']+)':", block.group(1)))
assert registered == expected - {'help','version','auth:login','auth:logout','store:list','organization:list'}, f'Unexpected theme commands: {registered}'

assert push.count('assertAgentSafePushFlags(flags)') >= 2, 'CLI and exported push flag guards missing'
assert 'await assertUnpublishedTheme(theme.id, session)' in push, 'Fresh pre-upload role verification missing'
assert 'assertCanWrite: () => assertUnpublishedTheme(theme.id, session)' in push, 'Per-mutation role recheck missing'
policy = (r / 'packages/theme/src/cli/services/agent-push-policy.ts').read_text()
assert 'current.role !== UNPUBLISHED_THEME_ROLE' in policy, 'Unpublished role enforcement missing'
assert 'flags.live || flags.allowLive || flags.publish || flags.development' in policy, 'Forbidden flag guard missing'
uploader = (r / 'packages/theme/src/cli/utilities/theme-uploader.ts').read_text()
assert uploader.count('await assertCanWrite?.()') >= 2 and 'await options.assertCanWrite?.()' in uploader, 'Upload/delete mutation guards missing'
for denied in ('theme:publish','theme:delete','theme:dev',
               'theme:share','theme:preview','theme:rename','theme:duplicate'):
    assert denied not in registered and denied not in allowed, f'Unsafe command enabled: {denied}'

manifest = json.loads((r / 'packages/cli/oclif.manifest.json').read_text())
manifest_commands = set(manifest['commands'])
assert manifest_commands == expected, f'Unsafe Oclif command manifest entries: {manifest_commands ^ expected}'
assert 'theme:publish' not in manifest['commands']
assert 'theme:push' in manifest['commands']
assert 'store:list' in allowed and 'store:list' in manifest_commands, 'Read-only store listing missing'
assert 'store:list' in root, 'Store list missing from root allowlist'
assert 'organization:list' in allowed and 'organization:list' in manifest_commands, 'Organization list missing'
organization_list = (r / 'packages/app/src/cli/commands/organization/list.ts').read_text()
organization_service = (r / 'packages/app/src/cli/services/organization/list.ts').read_text()
assert 'await organizationList()' in organization_list, 'Organization list no longer uses expected listing service'
assert 'await fetchOrganizations()' in organization_service, 'Organization list no longer uses read-only fetch'
assert not any(c.startswith('organization:') and c != 'organization:list' for c in manifest_commands), 'Unapproved organization command present'
for command in ('store:delete','store:execute','store:auth','store:create:dev','store:create:preview','store:stripe-auth','store:bulk:execute'):
    assert command not in allowed and command not in manifest_commands, f'Unsafe store command enabled: {command}'
store_list = (r / 'packages/store/src/cli/commands/store/list.ts').read_text()
assert 'await listStores({' in store_list, 'Store list no longer invokes expected read-only listing service'

for auth_command in ('auth:login', 'auth:logout'):
    assert auth_command in allowed and auth_command in manifest_commands, f'Auth command missing: {auth_command}'

print('PASS: root/theme/manifest allowlist with unpublished-only push guards (static only).')
