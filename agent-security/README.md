# Shopify CLI Agents — security model

This repository is **public**. All push changes require regression tests and an isolated production credential boundary.

## V0: safe theme operations

- **Allowed:** `auth login`, `auth logout`, `store list` (read-only), `organization list` (read-only), `theme init`, `theme check`, `theme language-server`, `theme package`, `theme list`, `theme info`, `theme pull`, `theme push` to Shopify-confirmed **unpublished** themes, `help` and `version`.
- **Disabled:** `theme publish`, `theme dev`, `theme share`, `theme delete`, `theme rename`, `theme duplicate`, `theme preview`, all app commands and store-management commands other than `store list`, plugin commands, upgrade shortcuts, and push options selecting a live/development theme or publishing.
- The theme push service validates unsafe flags before authentication; its interactive picker shows only unpublished themes; it fetches a fresh role before sync and before every file mutation batch (including retries).
- The static policy checker fails if command registration, the generated manifest or push guards are altered. Unit tests exercise draft selection and flag/role denials.

## Threat boundary

The CLI source restrictions are **not** Shopify authorization. Do not give an autonomous agent production store-owner sessions, Theme Access passwords, Admin API write tokens, or credentials with `write_themes`. An agent with shell access could bypass a fork by using official Shopify CLI or the API directly. For production data, issue only genuinely read-only credentials when Shopify authentication supports them; otherwise use a separate test store or trusted gateway.

**Concurrency limitation:** Shopify's API does not expose an atomic role precondition for theme file mutations. A theme could be published between the role check and a write; per-batch checks reduce but do not eliminate this race. For strong live-theme protection, use a dedicated deployment gateway with approved unpublished theme IDs, controls preventing concurrent publishing, auditing and credentials inaccessible to the agent. The agent must not be able to call Shopify Admin APIs directly with write tokens.

## Build verification

Run after upstream import:

```bash
python3 agent-security/verify-policy.py .
corepack pnpm install --frozen-lockfile
corepack pnpm nx build cli
node packages/cli/bin/run.js theme publish --help # should be unavailable
node packages/cli/bin/run.js theme push --help    # should be available
node packages/cli/bin/run.js auth login --help     # should be available
node packages/cli/bin/run.js auth logout --help    # should be available
node packages/cli/bin/run.js store list --help     # should be available
node packages/cli/bin/run.js organization list --help # should be available
corepack pnpm exec vitest run packages/theme/src/cli/services/agent-push-policy.test.ts
```

This repository is a native GitHub fork of Shopify CLI. Rebase or sync upstream changes only after reviewing their command definitions, generated Oclif manifest, and authentication behavior; rerun security verification, lint, build and regression tests. Some upstream GitHub Actions workflows are inherited and may need to be disabled independently.

Do not run agents with write-capable Shopify credentials even after CI passes. Add CODEOWNERS and protect main before deploying this binary.
