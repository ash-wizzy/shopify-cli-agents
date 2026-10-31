# Shopify CLI Agents — restricted AI-agent build

> **Experimental fork, not official Shopify CLI.** This build restricts theme pushes to unpublished themes, and removes publishing and other unsafe operations from the CLI and its generated Oclif manifest. **Do not give AI agents production-write Shopify credentials.** Command restrictions alone are not an authorization boundary.

This repository is a public native fork of [Shopify/cli](https://github.com/Shopify/cli) with agent-specific command restrictions.

**Allowed:** `auth login`, `auth logout`, `theme init`, `theme check`, `theme language-server`, `theme package`, `theme list`, `theme info`, `theme pull`, **`theme push` (unpublished themes only)**, `version`, `help`.

**Disabled:** theme publishing, live-theme writes, development-theme uploads, theme deletion/rename, preview/share, app/store mutations and plugin commands. Push checks Shopify's current unpublished role before each write batch. For a security rationale and deployment roadmap, see [agent-security/README.md](agent-security/README.md).

## Authentication

Run `node packages/cli/bin/run.js auth login` to select or authenticate a Shopify account, and `node packages/cli/bin/run.js auth logout` to sign out. These are official Shopify CLI authentication operations; signing in does **not** reduce the Shopify permissions attached to that account. Never give unattended agents owner credentials or production-write tokens.

## Build the restricted CLI

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm nx build cli
python3 agent-security/verify-policy.py .
node packages/cli/bin/run.js theme check --help
```

**Push examples:** in an interactive terminal run `node packages/cli/bin/run.js theme push --store your-store.myshopify.com` to choose an unpublished theme. In an agent or CI session specify `--theme THEME_ID --store your-store.myshopify.com` or create a new draft using `--unpublished --theme NAME --store your-store.myshopify.com`. `--live`, `--allow-live`, `--publish` and `--development` are prohibited, including their environment-variable equivalents. The CLI is a best-effort guard, not a credential-level guarantee if an unpublished theme is published concurrently.

Use `node packages/cli/bin/run.js` explicitly to run this fork; `shopify` on `PATH` may be the unrestricted official CLI. The build requires Node.js >=22.12.0. Deployments must use a separate trusted process with human approval and isolated write credentials.

---

## Original upstream README

<img src="https://github.com/Shopify/cli/blob/main/assets/logo.png?raw=true" width="150"/>

# Shopify CLI
<a href="http://twitter.com/ShopifyDevs"><img src="https://img.shields.io/twitter/follow/ShopifyDevs?style=flat-square" alt="Twitter Followers"></a>
<img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License">
<a href="https://github.com/Shopify/cli/actions/workflows/shopify-cli.yml">![badge](https://github.com/Shopify/cli/actions/workflows/shopify-cli.yml/badge.svg)</a>

With the Shopify command line interface (Shopify CLI), you can:
- initialize, build, dev, and deploy Shopify apps, extensions, functions and themes
- build custom storefronts and manage their hosting

Learn more in the [commands docs](./packages/cli/README.md#commands).

<p>&nbsp;</p>

## Before you begin

Install the latest version of  [Node.js](https://nodejs.org/en/download/) and [npm](https://docs.npmjs.com/getting-started) (or another package manager of your choice).

<p>&nbsp;</p>

## Developing apps with Shopify CLI

When you’re building a Shopify app, you can initialize your project using your preferred package manager. A single command will install all the dependencies you need — including Shopify CLI itself.

Initialize your project using one of the following commands:
- `npm init @shopify/app@latest` (installed by default with Node)
- `pnpm create @shopify/create-app@latest`
- `yarn create @shopify/app`
- `bun create @shopify/app@latest` (experimental)

Learn more in the docs: [Create an app](https://shopify.dev/apps/getting-started/create)

<p>&nbsp;</p>

## Developing themes with Shopify CLI

To work with themes, the CLI needs to be installed globally with:

- `npm install -g @shopify/cli`

You can also install it through Homebrew on macOS: `brew tap shopify/shopify && brew install shopify-cli`

Learn more in the docs: [Shopify CLI for themes](https://shopify.dev/docs/storefronts/themes/tools/cli)

<p>&nbsp;</p>

## Developing Hydrogen custom storefronts with Shopify CLI ##

The Hydrogen code lives here: https://github.com/Shopify/hydrogen/tree/main/packages/cli

Learn more in the docs: [Shopify CLI for Hydrogen storefronts](https://shopify.dev/docs/custom-storefronts/hydrogen/cli)

<p>&nbsp;</p>

## Help 🖐

If you encounter issues using the CLI or have feedback you'd like to share with us, below are some options:

- [File a bug report](https://community.shopify.dev/c/shopify-cli-libraries/14) - To report bugs create a post in Shopify CLI and Libraries on the dev community
- [Ask a question or request a new feature](https://community.shopify.dev/c/dev-platform/32) - To ask a question or request a new feature create a post in Dev Platform on the dev community
- [Shopify Community Forums](https://community.shopify.com/) - Visit our forums to connect with the community and learn more about Shopify CLI development
- [CLI Documentation - Apps](https://shopify.dev/apps/tools/cli) - To view CLI documentation for app development
- [CLI Documentation - Themes](https://shopify.dev/themes/tools/cli) - To view CLI documentation for theme development
- [CLI Documentation - Hydrogen](https://shopify.dev/custom-storefronts/tools/cli) - To view CLI documentation for Hydrogen (custom storefront) development

## Contribute 👩🏽‍💻

If you'd like to contribute to the project, check out the [contributors docs](/docs) and the [steps to get started](/docs/cli/get-started.md).

<p>&nbsp;</p>

## References

- [oclif](https://oclif.io/)
