# Commands
<!-- commands -->
* [`shopify auth login`](#shopify-auth-login)
* [`shopify auth logout`](#shopify-auth-logout)
* [`shopify help [command] [flags]`](#shopify-help-command-flags)
* [`shopify theme check`](#shopify-theme-check)
* [`shopify theme info`](#shopify-theme-info)
* [`shopify theme init [name] [flags]`](#shopify-theme-init-name-flags)
* [`shopify theme language-server`](#shopify-theme-language-server)
* [`shopify theme list`](#shopify-theme-list)
* [`shopify theme package`](#shopify-theme-package)
* [`shopify theme pull`](#shopify-theme-pull)
* [`shopify theme push`](#shopify-theme-push)
* [`shopify version`](#shopify-version)

## `shopify auth login`

Logs you in to your Shopify account.

```
USAGE
  $ shopify auth login [--alias <value>] [-j] [--json-schema] [--no-color] [--no-input] [--verbose]

FLAGS
  -j, --json
      Output the result as JSON. Automatically disables color output.
      [env: SHOPIFY_FLAG_JSON]

  --alias=<value>
      Alias of an existing session you want to use. Required if non interactive.
      [env: SHOPIFY_FLAG_AUTH_ALIAS]

  --json-schema
      Print the command's JSON schemas.
      [env: SHOPIFY_FLAG_JSON_SCHEMA]

  --no-color
      Disable color output.
      [env: SHOPIFY_FLAG_NO_COLOR]

  --no-input
      Disable interactive prompts and browser authentication.
      [env: SHOPIFY_FLAG_NO_INPUT]

  --verbose
      Increase the verbosity of the output. May include sensitive data.
      [env: SHOPIFY_FLAG_VERBOSE]

DESCRIPTION
  Logs you in to your Shopify account.

  Use `--json-schema` to print the result, error, and event schemas.

  Output from `--json` conforms to the `AuthLoginResult` schema.

  ```json
  {
    "type": "object",
    "properties": {
      "status": {
        "type": "string",
        "const": "success"
      },
      "alias": {
        "type": "string"
      }
    },
    "required": [
      "status",
      "alias"
    ],
    "additionalProperties": false,
    "title": "AuthLoginResult",
    "$schema": "http://json-schema.org/draft-07/schema#"
  }
  ```
```

## `shopify auth logout`

Logs you out of the Shopify account or Partner account and store.

```
USAGE
  $ shopify auth logout [-j] [--json-schema] [--no-color] [--no-input] [--verbose]

FLAGS
  -j, --json
      Output the result as JSON. Automatically disables color output.
      [env: SHOPIFY_FLAG_JSON]

  --json-schema
      Print the command's JSON schemas.
      [env: SHOPIFY_FLAG_JSON_SCHEMA]

  --no-color
      Disable color output.
      [env: SHOPIFY_FLAG_NO_COLOR]

  --no-input
      Disable interactive prompts and browser authentication.
      [env: SHOPIFY_FLAG_NO_INPUT]

  --verbose
      Increase the verbosity of the output. May include sensitive data.
      [env: SHOPIFY_FLAG_VERBOSE]

DESCRIPTION
  Logs you out of the Shopify account or Partner account and store.

  Use `--json-schema` to print the result, error, and event schemas.

  Output from `--json` conforms to the `AuthLogoutResult` schema.

  ```json
  {
    "type": "object",
    "properties": {
      "status": {
        "type": "string",
        "const": "success"
      }
    },
    "required": [
      "status"
    ],
    "additionalProperties": false,
    "title": "AuthLogoutResult",
    "$schema": "http://json-schema.org/draft-07/schema#"
  }
  ```
```

## `shopify help [command] [flags]`

Display help for Shopify CLI

```
USAGE
  $ shopify help [command] [flags]

ARGUMENTS
  [COMMAND...]  Command to show help for.

FLAGS
  -j, --json
      Output the result as JSON. Automatically disables color output.
      [env: SHOPIFY_FLAG_JSON]

  -n, --nested-commands
      Include all nested commands in the output.
      [env: SHOPIFY_FLAG_CLI_NESTED_COMMANDS]

  --json-schema
      Print the command's JSON schemas.
      [env: SHOPIFY_FLAG_JSON_SCHEMA]

DESCRIPTION
  Display help for Shopify CLI

  Use `--json-schema` to print the result, error, and event schemas.

  Output from `--json` conforms to the `HelpResult` schema.

  ```json
  {
    "anyOf": [
      {
        "type": "object",
        "properties": {
          "kind": {
            "type": "string",
            "const": "root"
          },
          "commands": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/HelpCommandSummary"
            }
          },
          "topics": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/HelpTopic"
            }
          }
        },
        "required": [
          "kind",
          "commands",
          "topics"
        ],
        "additionalProperties": false
      },
      {
        "type": "object",
        "properties": {
          "kind": {
            "type": "string",
            "const": "topic"
          },
          "topic": {
            "$ref": "#/definitions/HelpTopic"
          },
          "commands": {
            "$ref": "#/definitions/HelpResult/anyOf/0/properties/commands"
          },
          "topics": {
            "$ref": "#/definitions/HelpResult/anyOf/0/properties/topics"
          }
        },
        "required": [
          "kind",
          "topic",
          "commands",
          "topics"
        ],
        "additionalProperties": false
      },
      {
        "type": "object",
        "properties": {
          "kind": {
            "type": "string",
            "const": "command"
          },
          "command": {
            "$ref": "#/definitions/HelpCommand"
          },
          "commands": {
            "$ref": "#/definitions/HelpResult/anyOf/0/properties/commands"
          },
          "topics": {
            "$ref": "#/definitions/HelpResult/anyOf/0/properties/topics"
          }
        },
        "required": [
          "kind",
          "command",
          "commands",
          "topics"
        ],
        "additionalProperties": false
      }
    ],
    "title": "HelpResult",
    "definitions": {
      "HelpCommandSummary": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "summary": {
            "type": "string"
          },
          "hidden": {
            "type": "boolean",
            "default": false
          }
        },
        "required": [
          "id"
        ],
        "additionalProperties": false
      },
      "HelpTopic": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "hidden": {
            "type": "boolean",
            "default": false
          }
        },
        "required": [
          "name"
        ],
        "additionalProperties": false
      },
      "HelpArgument": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "required": {
            "type": "boolean",
            "default": false
          },
          "hidden": {
            "type": "boolean",
            "default": false
          },
          "options": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "default": {}
        },
        "required": [
          "name"
        ],
        "additionalProperties": false
      },
      "HelpFlag": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "type": {
            "type": "string",
            "enum": [
              "boolean",
              "option"
            ]
          },
          "char": {
            "type": "string"
          },
          "summary": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "env": {
            "type": "string"
          },
          "required": {
            "type": "boolean",
            "default": false
          },
          "hidden": {
            "type": "boolean",
            "default": false
          },
          "options": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "default": {},
          "multiple": {
            "type": "boolean"
          },
          "allowNo": {
            "type": "boolean"
          },
          "aliases": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "dependsOn": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "exclusive": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "exactlyOne": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "name",
          "type"
        ],
        "additionalProperties": false
      },
      "HelpCommand": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/definitions/HelpCommandSummary/properties/id"
          },
          "summary": {
            "$ref": "#/definitions/HelpCommandSummary/properties/summary"
          },
          "hidden": {
            "$ref": "#/definitions/HelpCommandSummary/properties/hidden"
          },
          "description": {
            "type": "string"
          },
          "aliases": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "usage": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            ]
          },
          "examples": {
            "type": "array",
            "items": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "object",
                  "properties": {
                    "description": {
                      "type": "string"
                    },
                    "command": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "description",
                    "command"
                  ],
                  "additionalProperties": false
                }
              ]
            }
          },
          "strict": {
            "type": "boolean",
            "default": true
          },
          "args": {
            "type": "object",
            "additionalProperties": {
              "$ref": "#/definitions/HelpArgument"
            }
          },
          "flags": {
            "type": "object",
            "additionalProperties": {
              "$ref": "#/definitions/HelpFlag"
            }
          }
        },
        "required": [
          "id",
          "aliases",
          "args",
          "flags"
        ],
        "additionalProperties": false
      }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
  }
  ```
```

## `shopify theme check`

Validate the theme.

```
USAGE
  $ shopify theme check [--auth-alias <value>] [-a] [-C <value>] [-e <value>...] [--fail-level
    crash|error|suggestion|style|warning|info] [-j | --init | -v | --print | --list] [--json-schema] [--no-color]
    [--no-input] [-o text|json] [--path <value>] [--verbose]

FLAGS
  -C, --config=<value>
      Path to a config file to use, overriding .theme-check.yml if present
      Use --path to set the theme directory
      Supports all theme-check: config values, e.g., theme-check:theme-app-extension,
      theme-check:recommended, theme-check:all
      For backwards compatibility, :theme_app_extension is also supported
      [env: SHOPIFY_FLAG_CONFIG]

  -a, --auto-correct
      Automatically fix offenses
      [env: SHOPIFY_FLAG_AUTO_CORRECT]

  -e, --environment=<value>...
      The environment to apply to the current command.
      [env: SHOPIFY_FLAG_ENVIRONMENT]

  -j, --json
      Output the result as JSON. Automatically disables color output.
      [env: SHOPIFY_FLAG_JSON]

  -o, --output=<option>
      [default: text] The output format to use
      [env: SHOPIFY_FLAG_OUTPUT]
      <options: text|json>

  -v, --version
      Print Theme Check version
      [env: SHOPIFY_FLAG_VERSION]

  --auth-alias=<value>
      Alias of the Shopify account to use for authentication.
      [env: SHOPIFY_FLAG_AUTH_ALIAS]

  --fail-level=<option>
      [default: error] Minimum severity for exit with error code
      [env: SHOPIFY_FLAG_FAIL_LEVEL]
      <options: crash|error|suggestion|style|warning|info>

  --init
      Generate a .theme-check.yml file
      [env: SHOPIFY_FLAG_INIT]

  --json-schema
      Print the command's JSON schemas.
      [env: SHOPIFY_FLAG_JSON_SCHEMA]

  --list
      List enabled checks
      [env: SHOPIFY_FLAG_LIST]

  --no-color
      Disable color output.
      [env: SHOPIFY_FLAG_NO_COLOR]

  --no-input
      Disable interactive prompts and browser authentication.
      [env: SHOPIFY_FLAG_NO_INPUT]

  --path=<value>
      The path where you want to run the command. Defaults to the current working directory.
      [env: SHOPIFY_FLAG_PATH]

  --print
      Output active config to STDOUT
      [env: SHOPIFY_FLAG_PRINT]

  --verbose
      Increase the verbosity of the output. May include sensitive data.
      [env: SHOPIFY_FLAG_VERBOSE]

DESCRIPTION
  Validate the theme.

  Calls and runs "Theme Check" (https://shopify.dev/docs/themes/tools/theme-check) to analyze your theme code for errors
  and to ensure that it follows theme and Liquid best practices. "Learn more about the checks that Theme Check runs."
  (https://shopify.dev/docs/themes/tools/theme-check/checks)

  Use `--json-schema` to print the result, error, and event schemas.

  Output from `--json` conforms to the `ThemeCheckResult` schema.

  ```json
  {
    "anyOf": [
      {
        "$ref": "#/definitions/ThemeEnvironment/anyOf/0/properties/result"
      },
      {
        "type": "object",
        "properties": {
          "environments": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/ThemeEnvironment"
            }
          }
        },
        "required": [
          "environments"
        ],
        "additionalProperties": false
      }
    ],
    "title": "ThemeCheckResult",
    "definitions": {
      "ThemeCheckIssue": {
        "type": "object",
        "properties": {
          "filePath": {
            "type": "string",
            "description": "The absolute native path of the file."
          },
          "check": {
            "type": "string"
          },
          "severity": {
            "type": "string",
            "enum": [
              "error",
              "warning",
              "info"
            ]
          },
          "startRow": {
            "type": "integer",
            "exclusiveMinimum": 0,
            "description": "The one-based starting line."
          },
          "startColumn": {
            "type": "integer",
            "exclusiveMinimum": 0,
            "description": "The one-based starting column."
          },
          "endRow": {
            "type": "integer",
            "exclusiveMinimum": 0,
            "description": "The one-based ending line."
          },
          "endColumn": {
            "type": "integer",
            "exclusiveMinimum": 0,
            "description": "The one-based ending column."
          },
          "message": {
            "type": "string"
          }
        },
        "required": [
          "filePath",
          "check",
          "severity",
          "startRow",
          "startColumn",
          "endRow",
          "endColumn",
          "message"
        ],
        "additionalProperties": false
      },
      "ThemeEnvironment": {
        "anyOf": [
          {
            "type": "object",
            "properties": {
              "environment": {
                "type": "string"
              },
              "result": {
                "anyOf": [
                  {
                    "type": "object",
                    "properties": {
                      "valid": {
                        "type": "boolean",
                        "description": "Whether the validation passes the selected blocking policy."
                      },
                      "issues": {
                        "type": "array",
                        "items": {
                          "$ref": "#/definitions/ThemeCheckIssue"
                        }
                      },
                      "errorCount": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "warningCount": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "infoCount": {
                        "type": "integer",
                        "minimum": 0
                      }
                    },
                    "required": [
                      "valid",
                      "issues",
                      "errorCount",
                      "warningCount",
                      "infoCount"
                    ],
                    "additionalProperties": false
                  },
                  {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "string",
                        "const": "cancelled"
                      }
                    },
                    "required": [
                      "status"
                    ],
                    "additionalProperties": false
                  }
                ]
              }
            },
            "required": [
              "environment",
              "result"
            ],
            "additionalProperties": false
          },
          {
            "type": "object",
            "properties": {
              "environment": {
                "type": "string"
              },
              "error": {
                "anyOf": [
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "const": "abort"
                      },
                      "message": {
                        "type": "string"
                      },
                      "code": {
                        "type": "string",
                        "minLength": 1,
                        "description": "A stable error code, included only when known."
                      },
                      "tryMessage": {
                        "type": "string"
                      },
                      "nextSteps": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      },
                      "customSections": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "title": {
                              "type": "string"
                            },
                            "body": {
                              "anyOf": [
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "array",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    }
                                  }
                                }
                              ]
                            }
                          },
                          "required": [
                            "body"
                          ],
                          "additionalProperties": false
                        }
                      },
                      "details": {
                        "description": "Selected domain details, preserving native API payloads such as GraphQL errors, extensions, and data."
                      }
                    },
                    "required": [
                      "type",
                      "message"
                    ],
                    "additionalProperties": false
                  },
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "const": "bug"
                      },
                      "message": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/message"
                      },
                      "code": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/code"
                      },
                      "tryMessage": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/tryMessage"
                      },
                      "nextSteps": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/nextSteps"
                      },
                      "customSections": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/customSections"
                      },
                      "details": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/details"
                      },
                      "stack": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "type",
                      "message"
                    ],
                    "additionalProperties": false
                  },
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "const": "external"
                      },
                      "message": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/message"
                      },
                      "code": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/code"
                      },
                      "tryMessage": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/tryMessage"
                      },
                      "nextSteps": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/nextSteps"
                      },
                      "customSections": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/customSections"
                      },
                      "details": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/details"
                      },
                      "command": {
                        "type": "string"
                      },
                      "args": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    },
                    "required": [
                      "type",
                      "message",
                      "command",
                      "args"
                    ],
                    "additionalProperties": false
                  }
                ]
              }
            },
            "required": [
              "environment",
              "error"
            ],
            "additionalProperties": false
          }
        ]
      }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
  }
  ```
```

## `shopify theme info`

Displays information about your theme environment, including your current store. Can also retrieve information about a specific theme.

```
USAGE
  $ shopify theme info [--auth-alias <value>] [-d] [-e <value>...] [-j] [--json-schema] [--no-color]
    [--no-input] [--password <value>] [--path <value>] [-s <value>] [-t <value>] [--verbose]

FLAGS
  -d, --development
      Retrieve info from your development theme.
      [env: SHOPIFY_FLAG_DEVELOPMENT]

  -e, --environment=<value>...
      The environment to apply to the current command.
      [env: SHOPIFY_FLAG_ENVIRONMENT]

  -j, --json
      Output the result as JSON. Automatically disables color output.
      [env: SHOPIFY_FLAG_JSON]

  -s, --store=<value>
      Store URL. It can be the store prefix (example) or the full myshopify.com URL (example.myshopify.com,
      https://example.myshopify.com).
      [env: SHOPIFY_FLAG_STORE]

  -t, --theme=<value>
      Theme ID or name of the remote theme.
      [env: SHOPIFY_FLAG_THEME_ID]

  --auth-alias=<value>
      Alias of the Shopify account to use for authentication.
      [env: SHOPIFY_FLAG_AUTH_ALIAS]

  --json-schema
      Print the command's JSON schemas.
      [env: SHOPIFY_FLAG_JSON_SCHEMA]

  --no-color
      Disable color output.
      [env: SHOPIFY_FLAG_NO_COLOR]

  --no-input
      Disable interactive prompts and browser authentication.
      [env: SHOPIFY_FLAG_NO_INPUT]

  --password=<value>
      Password generated from the Theme Access app or an Admin API token.
      [env: SHOPIFY_CLI_THEME_TOKEN]

  --path=<value>
      The path where you want to run the command. Defaults to the current working directory.
      [env: SHOPIFY_FLAG_PATH]

  --verbose
      Increase the verbosity of the output. May include sensitive data.
      [env: SHOPIFY_FLAG_VERBOSE]

DESCRIPTION
  Displays information about your theme environment, including your current store. Can also retrieve information about a
  specific theme.

  Use `--json-schema` to print the result, error, and event schemas.

  Output from `--json` conforms to the `ThemeInfoResult` schema.

  ```json
  {
    "anyOf": [
      {
        "$ref": "#/definitions/ThemeEnvironment/anyOf/0/properties/result"
      },
      {
        "type": "object",
        "properties": {
          "environments": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/ThemeEnvironment"
            }
          }
        },
        "required": [
          "environments"
        ],
        "additionalProperties": false
      }
    ],
    "title": "ThemeInfoResult",
    "definitions": {
      "Theme": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "pattern": "^\\d+$",
            "description": "The decimal Online Store theme ID, not a Shopify GID."
          },
          "name": {
            "type": "string"
          },
          "role": {
            "type": "string",
            "description": "The upstream theme role; known values include live, unpublished, and development."
          },
          "storeDomain": {
            "anyOf": [
              {
                "type": "string",
                "pattern": "^[a-z0-9][a-z0-9-]*\\.myshopify\\.com$"
              },
              {
                "type": "null"
              }
            ]
          },
          "previewUrl": {
            "anyOf": [
              {
                "type": "string",
                "format": "uri"
              },
              {
                "type": "null"
              }
            ]
          },
          "editorUrl": {
            "anyOf": [
              {
                "type": "string",
                "format": "uri"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "required": [
          "id",
          "name",
          "role",
          "storeDomain",
          "previewUrl",
          "editorUrl"
        ],
        "additionalProperties": false
      },
      "ThemeEnvironmentInfo": {
        "type": "object",
        "properties": {
          "storeDomain": {
            "$ref": "#/definitions/Theme/properties/storeDomain"
          },
          "developmentThemeId": {
            "anyOf": [
              {
                "$ref": "#/definitions/Theme/properties/id"
              },
              {
                "type": "null"
              }
            ],
            "description": "The decimal Online Store theme ID, not a Shopify GID."
          },
          "cliVersion": {
            "type": "string"
          },
          "os": {
            "type": "string"
          },
          "shell": {
            "type": [
              "string",
              "null"
            ]
          },
          "nodeVersion": {
            "type": "string"
          }
        },
        "required": [
          "storeDomain",
          "developmentThemeId",
          "cliVersion",
          "os",
          "shell",
          "nodeVersion"
        ],
        "additionalProperties": false
      },
      "ThemeEnvironment": {
        "anyOf": [
          {
            "type": "object",
            "properties": {
              "environment": {
                "type": "string"
              },
              "result": {
                "anyOf": [
                  {
                    "anyOf": [
                      {
                        "type": "object",
                        "properties": {
                          "theme": {
                            "$ref": "#/definitions/Theme"
                          }
                        },
                        "required": [
                          "theme"
                        ],
                        "additionalProperties": false
                      },
                      {
                        "$ref": "#/definitions/ThemeEnvironmentInfo"
                      }
                    ]
                  },
                  {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "string",
                        "const": "cancelled"
                      }
                    },
                    "required": [
                      "status"
                    ],
                    "additionalProperties": false
                  }
                ]
              }
            },
            "required": [
              "environment",
              "result"
            ],
            "additionalProperties": false
          },
          {
            "type": "object",
            "properties": {
              "environment": {
                "type": "string"
              },
              "error": {
                "anyOf": [
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "const": "abort"
                      },
                      "message": {
                        "type": "string"
                      },
                      "code": {
                        "type": "string",
                        "minLength": 1,
                        "description": "A stable error code, included only when known."
                      },
                      "tryMessage": {
                        "type": "string"
                      },
                      "nextSteps": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      },
                      "customSections": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "title": {
                              "type": "string"
                            },
                            "body": {
                              "anyOf": [
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "array",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    }
                                  }
                                }
                              ]
                            }
                          },
                          "required": [
                            "body"
                          ],
                          "additionalProperties": false
                        }
                      },
                      "details": {
                        "description": "Selected domain details, preserving native API payloads such as GraphQL errors, extensions, and data."
                      }
                    },
                    "required": [
                      "type",
                      "message"
                    ],
                    "additionalProperties": false
                  },
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "const": "bug"
                      },
                      "message": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/message"
                      },
                      "code": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/code"
                      },
                      "tryMessage": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/tryMessage"
                      },
                      "nextSteps": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/nextSteps"
                      },
                      "customSections": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/customSections"
                      },
                      "details": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/details"
                      },
                      "stack": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "type",
                      "message"
                    ],
                    "additionalProperties": false
                  },
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "const": "external"
                      },
                      "message": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/message"
                      },
                      "code": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/code"
                      },
                      "tryMessage": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/tryMessage"
                      },
                      "nextSteps": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/nextSteps"
                      },
                      "customSections": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/customSections"
                      },
                      "details": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/details"
                      },
                      "command": {
                        "type": "string"
                      },
                      "args": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    },
                    "required": [
                      "type",
                      "message",
                      "command",
                      "args"
                    ],
                    "additionalProperties": false
                  }
                ]
              }
            },
            "required": [
              "environment",
              "error"
            ],
            "additionalProperties": false
          }
        ]
      }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
  }
  ```
```

## `shopify theme init [name] [flags]`

Clones a Git repository to use as a starting point for building a new theme.

```
USAGE
  $ shopify theme init [name] [flags]

ARGUMENTS
  [NAME]  Name of the new theme

FLAGS
  -j, --json
      Output the result as JSON. Automatically disables color output.
      [env: SHOPIFY_FLAG_JSON]

  -l, --latest
      Downloads the latest release of the `clone-url`
      [env: SHOPIFY_FLAG_LATEST]

  -u, --clone-url=<value>
      [default: https://github.com/Shopify/skeleton-theme.git] The Git URL to clone from. Defaults to Shopify's Skeleton
      theme.
      [env: SHOPIFY_FLAG_CLONE_URL]

  --auth-alias=<value>
      Alias of the Shopify account to use for authentication.
      [env: SHOPIFY_FLAG_AUTH_ALIAS]

  --json-schema
      Print the command's JSON schemas.
      [env: SHOPIFY_FLAG_JSON_SCHEMA]

  --no-color
      Disable color output.
      [env: SHOPIFY_FLAG_NO_COLOR]

  --no-input
      Disable interactive prompts and browser authentication.
      [env: SHOPIFY_FLAG_NO_INPUT]

  --path=<value>
      The path where you want to run the command. Defaults to the current working directory.
      [env: SHOPIFY_FLAG_PATH]

  --verbose
      Increase the verbosity of the output. May include sensitive data.
      [env: SHOPIFY_FLAG_VERBOSE]

DESCRIPTION
  Clones a Git repository to use as a starting point for building a new theme.

  Clones a Git repository to your local machine to use as the starting point for building a theme.

  If no Git repository is specified, then this command creates a copy of Shopify's "Skeleton theme"
  (https://github.com/Shopify/skeleton-theme.git), with the specified name in the current folder. If no name is
  provided, then you're prompted to enter one.

  > Caution: If you're building a theme for the Shopify Theme Store, then you can use our example theme as a starting
  point. However, the theme that you submit needs to be "substantively different from existing themes"
  (https://shopify.dev/docs/themes/store/requirements#uniqueness) so that it provides added value for users.


  Use `--json-schema` to print the result, error, and event schemas.

  Output from `--json` conforms to the `ThemeInitResult` schema.

  ```json
  {
    "type": "object",
    "properties": {
      "status": {
        "type": "string",
        "enum": [
          "success",
          "partial"
        ]
      },
      "changed": {
        "type": "boolean",
        "const": true
      },
      "directory": {
        "$ref": "#/definitions/AbsolutePath"
      },
      "repoUrl": {
        "type": "string",
        "minLength": 1,
        "description": "The source Git remote (including HTTPS, SSH, or SCP-style Git URLs)."
      },
      "latest": {
        "type": "boolean"
      },
      "aiInstructions": {
        "anyOf": [
          {
            "type": "string",
            "enum": [
              "all",
              "github",
              "cursor",
              "claude"
            ]
          },
          {
            "type": "null"
          }
        ]
      },
      "instructionFilePaths": {
        "anyOf": [
          {
            "type": "array",
            "items": {
              "$ref": "#/definitions/AbsolutePath"
            }
          },
          {
            "type": "null"
          }
        ],
        "description": "Created instruction files, or null when setup failed before their completion could be established."
      },
      "reason": {
        "type": [
          "string",
          "null"
        ],
        "description": "The reason for incomplete setup, or null when setup completed."
      }
    },
    "required": [
      "status",
      "changed",
      "directory",
      "repoUrl",
      "latest",
      "aiInstructions",
      "instructionFilePaths",
      "reason"
    ],
    "additionalProperties": false,
    "title": "ThemeInitResult",
    "definitions": {
      "AbsolutePath": {
        "type": "string",
        "description": "An absolute native filesystem path."
      }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
  }
  ```
```

## `shopify theme language-server`

Start a Language Server Protocol server.

```
USAGE
  $ shopify theme language-server [--auth-alias <value>] [--json-schema] [--no-color] [--no-input] [--verbose]

FLAGS
  --auth-alias=<value>
      Alias of the Shopify account to use for authentication.
      [env: SHOPIFY_FLAG_AUTH_ALIAS]

  --json-schema
      Print the command's JSON schemas.
      [env: SHOPIFY_FLAG_JSON_SCHEMA]

  --no-color
      Disable color output.
      [env: SHOPIFY_FLAG_NO_COLOR]

  --no-input
      Disable interactive prompts and browser authentication.
      [env: SHOPIFY_FLAG_NO_INPUT]

  --verbose
      Increase the verbosity of the output. May include sensitive data.
      [env: SHOPIFY_FLAG_VERBOSE]

DESCRIPTION
  Start a Language Server Protocol server.

  Starts the "Language Server" (https://shopify.dev/docs/themes/tools/cli/language-server).
```

## `shopify theme list`

Lists the themes in your store, along with their IDs and statuses.

```
USAGE
  $ shopify theme list [--auth-alias <value>] [-e <value>...] [--id <value>] [-j] [--json-schema] [--name
    <value>] [--no-color] [--no-input] [--password <value>] [--path <value>] [--role live|unpublished|development] [-s
    <value>] [--verbose]

FLAGS
  -e, --environment=<value>...
      The environment to apply to the current command.
      [env: SHOPIFY_FLAG_ENVIRONMENT]

  -j, --json
      Output the result as JSON. Automatically disables color output.
      [env: SHOPIFY_FLAG_JSON]

  -s, --store=<value>
      Store URL. It can be the store prefix (example) or the full myshopify.com URL (example.myshopify.com,
      https://example.myshopify.com).
      [env: SHOPIFY_FLAG_STORE]

  --auth-alias=<value>
      Alias of the Shopify account to use for authentication.
      [env: SHOPIFY_FLAG_AUTH_ALIAS]

  --id=<value>
      Only list theme with the given ID.
      [env: SHOPIFY_FLAG_ID]

  --json-schema
      Print the command's JSON schemas.
      [env: SHOPIFY_FLAG_JSON_SCHEMA]

  --name=<value>
      Only list themes that contain the given name.
      [env: SHOPIFY_FLAG_NAME]

  --no-color
      Disable color output.
      [env: SHOPIFY_FLAG_NO_COLOR]

  --no-input
      Disable interactive prompts and browser authentication.
      [env: SHOPIFY_FLAG_NO_INPUT]

  --password=<value>
      Password generated from the Theme Access app or an Admin API token.
      [env: SHOPIFY_CLI_THEME_TOKEN]

  --path=<value>
      The path where you want to run the command. Defaults to the current working directory.
      [env: SHOPIFY_FLAG_PATH]

  --role=<option>
      Only list themes with the given role.
      [env: SHOPIFY_FLAG_ROLE]
      <options: live|unpublished|development>

  --verbose
      Increase the verbosity of the output. May include sensitive data.
      [env: SHOPIFY_FLAG_VERBOSE]

DESCRIPTION
  Lists the themes in your store, along with their IDs and statuses.

  Use `--json-schema` to print the result, error, and event schemas.

  Output from `--json` conforms to the `ThemeListResult` schema.

  ```json
  {
    "anyOf": [
      {
        "$ref": "#/definitions/ThemeEnvironment/anyOf/0/properties/result"
      },
      {
        "type": "object",
        "properties": {
          "environments": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/ThemeEnvironment"
            }
          }
        },
        "required": [
          "environments"
        ],
        "additionalProperties": false
      }
    ],
    "title": "ThemeListResult",
    "definitions": {
      "Theme": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "pattern": "^\\d+$",
            "description": "The decimal Online Store theme ID, not a Shopify GID."
          },
          "name": {
            "type": "string"
          },
          "role": {
            "type": "string",
            "description": "The upstream theme role; known values include live, unpublished, and development."
          }
        },
        "required": [
          "id",
          "name",
          "role"
        ],
        "additionalProperties": false
      },
      "ThemeEnvironment": {
        "anyOf": [
          {
            "type": "object",
            "properties": {
              "environment": {
                "type": "string"
              },
              "result": {
                "anyOf": [
                  {
                    "type": "object",
                    "properties": {
                      "themes": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "$ref": "#/definitions/Theme/properties/id"
                            },
                            "name": {
                              "$ref": "#/definitions/Theme/properties/name"
                            },
                            "role": {
                              "$ref": "#/definitions/Theme/properties/role"
                            },
                            "processing": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "id",
                            "name",
                            "role",
                            "processing"
                          ],
                          "additionalProperties": false
                        }
                      }
                    },
                    "required": [
                      "themes"
                    ],
                    "additionalProperties": false,
                    "description": "The complete theme library after applying the requested filters."
                  },
                  {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "string",
                        "const": "cancelled"
                      }
                    },
                    "required": [
                      "status"
                    ],
                    "additionalProperties": false
                  }
                ]
              }
            },
            "required": [
              "environment",
              "result"
            ],
            "additionalProperties": false
          },
          {
            "type": "object",
            "properties": {
              "environment": {
                "type": "string"
              },
              "error": {
                "anyOf": [
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "const": "abort"
                      },
                      "message": {
                        "type": "string"
                      },
                      "code": {
                        "type": "string",
                        "minLength": 1,
                        "description": "A stable error code, included only when known."
                      },
                      "tryMessage": {
                        "type": "string"
                      },
                      "nextSteps": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      },
                      "customSections": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "title": {
                              "type": "string"
                            },
                            "body": {
                              "anyOf": [
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "array",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    }
                                  }
                                }
                              ]
                            }
                          },
                          "required": [
                            "body"
                          ],
                          "additionalProperties": false
                        }
                      },
                      "details": {
                        "description": "Selected domain details, preserving native API payloads such as GraphQL errors, extensions, and data."
                      }
                    },
                    "required": [
                      "type",
                      "message"
                    ],
                    "additionalProperties": false
                  },
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "const": "bug"
                      },
                      "message": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/message"
                      },
                      "code": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/code"
                      },
                      "tryMessage": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/tryMessage"
                      },
                      "nextSteps": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/nextSteps"
                      },
                      "customSections": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/customSections"
                      },
                      "details": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/details"
                      },
                      "stack": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "type",
                      "message"
                    ],
                    "additionalProperties": false
                  },
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "const": "external"
                      },
                      "message": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/message"
                      },
                      "code": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/code"
                      },
                      "tryMessage": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/tryMessage"
                      },
                      "nextSteps": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/nextSteps"
                      },
                      "customSections": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/customSections"
                      },
                      "details": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/details"
                      },
                      "command": {
                        "type": "string"
                      },
                      "args": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    },
                    "required": [
                      "type",
                      "message",
                      "command",
                      "args"
                    ],
                    "additionalProperties": false
                  }
                ]
              }
            },
            "required": [
              "environment",
              "error"
            ],
            "additionalProperties": false
          }
        ]
      }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
  }
  ```
```

## `shopify theme package`

Package your theme into a .zip file, ready to upload to the Online Store.

```
USAGE
  $ shopify theme package [--auth-alias <value>] [-j] [--json-schema] [--no-color] [--no-input] [--path <value>]
    [--verbose]

FLAGS
  -j, --json
      Output the result as JSON. Automatically disables color output.
      [env: SHOPIFY_FLAG_JSON]

  --auth-alias=<value>
      Alias of the Shopify account to use for authentication.
      [env: SHOPIFY_FLAG_AUTH_ALIAS]

  --json-schema
      Print the command's JSON schemas.
      [env: SHOPIFY_FLAG_JSON_SCHEMA]

  --no-color
      Disable color output.
      [env: SHOPIFY_FLAG_NO_COLOR]

  --no-input
      Disable interactive prompts and browser authentication.
      [env: SHOPIFY_FLAG_NO_INPUT]

  --path=<value>
      The path where you want to run the command. Defaults to the current working directory.
      [env: SHOPIFY_FLAG_PATH]

  --verbose
      Increase the verbosity of the output. May include sensitive data.
      [env: SHOPIFY_FLAG_VERBOSE]

DESCRIPTION
  Package your theme into a .zip file, ready to upload to the Online Store.

  Packages your local theme files into a ZIP file that can be uploaded to Shopify.

  Only folders that match the "default Shopify theme folder structure"
  (https://shopify.dev/docs/storefronts/themes/tools/cli#directory-structure) are included in the package.

  The package includes the `listings` directory if present (required for multi-preset themes per "Theme Store
  requirements"
  (https://shopify.dev/docs/storefronts/themes/store/requirements#adding-presets-to-your-theme-zip-submission)).

  The ZIP file uses the name `theme_name-theme_version.zip`, based on parameters in your "settings_schema.json"
  (https://shopify.dev/docs/storefronts/themes/architecture/config/settings-schema-json) file.

  Use `--json-schema` to print the result, error, and event schemas.

  Output from `--json` conforms to the `ThemePackageResult` schema.

  ```json
  {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "The absolute native path of the ZIP archive."
      }
    },
    "required": [
      "path"
    ],
    "additionalProperties": false,
    "title": "ThemePackageResult",
    "$schema": "http://json-schema.org/draft-07/schema#"
  }
  ```
```

## `shopify theme pull`

Download your remote theme files locally.

```
USAGE
  $ shopify theme pull [--auth-alias <value>] [-d] [-e <value>...] [-x <value>...] [-j] [--json-schema] [-l]
    [--no-color] [--no-input] [-n] [-o <value>...] [--password <value>] [--path <value>] [-s <value>] [-t <value>]
    [--verbose]

FLAGS
  -d, --development
      Pull theme files from your remote development theme. Use --development, --live, or --theme in non-interactive
      environments.
      [env: SHOPIFY_FLAG_DEVELOPMENT]

  -e, --environment=<value>...
      The environment to apply to the current command.
      [env: SHOPIFY_FLAG_ENVIRONMENT]

  -j, --json
      Output the result as JSON. Automatically disables color output.
      [env: SHOPIFY_FLAG_JSON]

  -l, --live
      Pull theme files from your remote live theme. Use --development, --live, or --theme in non-interactive environments.
      [env: SHOPIFY_FLAG_LIVE]

  -n, --nodelete
      Prevent deleting local files that don't exist remotely.
      [env: SHOPIFY_FLAG_NODELETE]

  -o, --only=<value>...
      Download only the specified files (Multiple flags allowed). Wrap the value in double quotes if you're using
      wildcards.
      [env: SHOPIFY_FLAG_ONLY]

  -s, --store=<value>
      Store URL. It can be the store prefix (example) or the full myshopify.com URL (example.myshopify.com,
      https://example.myshopify.com).
      [env: SHOPIFY_FLAG_STORE]

  -t, --theme=<value>
      Theme ID or name of the remote theme. Use --development, --live, or --theme in non-interactive environments.
      [env: SHOPIFY_FLAG_THEME_ID]

  -x, --ignore=<value>...
      Skip downloading the specified files (Multiple flags allowed). Wrap the value in double quotes if you're using
      wildcards.
      [env: SHOPIFY_FLAG_IGNORE]

  --auth-alias=<value>
      Alias of the Shopify account to use for authentication.
      [env: SHOPIFY_FLAG_AUTH_ALIAS]

  --json-schema
      Print the command's JSON schemas.
      [env: SHOPIFY_FLAG_JSON_SCHEMA]

  --no-color
      Disable color output.
      [env: SHOPIFY_FLAG_NO_COLOR]

  --no-input
      Disable interactive prompts and browser authentication.
      [env: SHOPIFY_FLAG_NO_INPUT]

  --password=<value>
      Password generated from the Theme Access app or an Admin API token.
      [env: SHOPIFY_CLI_THEME_TOKEN]

  --path=<value>
      The path where you want to run the command. Defaults to the current working directory.
      [env: SHOPIFY_FLAG_PATH]

  --verbose
      Increase the verbosity of the output. May include sensitive data.
      [env: SHOPIFY_FLAG_VERBOSE]

DESCRIPTION
  Download your remote theme files locally.

  Retrieves theme files from Shopify.

  If no theme is specified, then you're prompted to select the theme to pull from the list of the themes in your store.

  Use `--json-schema` to print the result, error, and event schemas.

  Output from `--json` conforms to the `ThemePullResult` schema.

  ```json
  {
    "anyOf": [
      {
        "$ref": "#/definitions/ThemeEnvironment/anyOf/0/properties/result"
      },
      {
        "type": "object",
        "properties": {
          "environments": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/ThemeEnvironment"
            }
          }
        },
        "required": [
          "environments"
        ],
        "additionalProperties": false
      }
    ],
    "title": "ThemePullResult",
    "definitions": {
      "ThemePullTheme": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "pattern": "^\\d+$",
            "description": "The decimal Online Store theme ID, not a Shopify GID."
          },
          "name": {
            "type": "string"
          },
          "role": {
            "type": "string",
            "description": "The upstream theme role; known values include live, unpublished, and development."
          },
          "storeDomain": {
            "anyOf": [
              {
                "type": "string",
                "pattern": "^[a-z0-9][a-z0-9-]*\\.myshopify\\.com$"
              },
              {
                "type": "null"
              }
            ]
          },
          "previewUrl": {
            "anyOf": [
              {
                "type": "string",
                "format": "uri"
              },
              {
                "type": "null"
              }
            ]
          },
          "editorUrl": {
            "anyOf": [
              {
                "type": "string",
                "format": "uri"
              },
              {
                "type": "null"
              }
            ]
          },
          "processing": {
            "type": "boolean"
          },
          "sourceUrl": {
            "anyOf": [
              {
                "type": "string",
                "format": "uri"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "required": [
          "id",
          "name",
          "role",
          "storeDomain",
          "previewUrl",
          "editorUrl",
          "processing",
          "sourceUrl"
        ],
        "additionalProperties": false
      },
      "ThemeEnvironment": {
        "anyOf": [
          {
            "type": "object",
            "properties": {
              "environment": {
                "type": "string"
              },
              "result": {
                "anyOf": [
                  {
                    "anyOf": [
                      {
                        "type": "object",
                        "properties": {
                          "status": {
                            "type": "string",
                            "const": "success"
                          },
                          "changed": {
                            "type": "boolean"
                          },
                          "directory": {
                            "type": "string"
                          },
                          "theme": {
                            "$ref": "#/definitions/ThemePullTheme"
                          }
                        },
                        "required": [
                          "status",
                          "changed",
                          "directory",
                          "theme"
                        ],
                        "additionalProperties": false
                      },
                      {
                        "type": "object",
                        "properties": {
                          "status": {
                            "type": "string",
                            "const": "skipped"
                          },
                          "reason": {
                            "type": "string",
                            "const": "unsafe-directory"
                          }
                        },
                        "required": [
                          "status",
                          "reason"
                        ],
                        "additionalProperties": false
                      }
                    ]
                  },
                  {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "string",
                        "const": "cancelled"
                      }
                    },
                    "required": [
                      "status"
                    ],
                    "additionalProperties": false
                  }
                ]
              }
            },
            "required": [
              "environment",
              "result"
            ],
            "additionalProperties": false
          },
          {
            "type": "object",
            "properties": {
              "environment": {
                "type": "string"
              },
              "error": {
                "anyOf": [
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "const": "abort"
                      },
                      "message": {
                        "type": "string"
                      },
                      "code": {
                        "type": "string",
                        "minLength": 1,
                        "description": "A stable error code, included only when known."
                      },
                      "tryMessage": {
                        "type": "string"
                      },
                      "nextSteps": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      },
                      "customSections": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "title": {
                              "type": "string"
                            },
                            "body": {
                              "anyOf": [
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "array",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    }
                                  }
                                }
                              ]
                            }
                          },
                          "required": [
                            "body"
                          ],
                          "additionalProperties": false
                        }
                      },
                      "details": {
                        "description": "Selected domain details, preserving native API payloads such as GraphQL errors, extensions, and data."
                      }
                    },
                    "required": [
                      "type",
                      "message"
                    ],
                    "additionalProperties": false
                  },
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "const": "bug"
                      },
                      "message": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/message"
                      },
                      "code": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/code"
                      },
                      "tryMessage": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/tryMessage"
                      },
                      "nextSteps": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/nextSteps"
                      },
                      "customSections": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/customSections"
                      },
                      "details": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/details"
                      },
                      "stack": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "type",
                      "message"
                    ],
                    "additionalProperties": false
                  },
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "const": "external"
                      },
                      "message": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/message"
                      },
                      "code": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/code"
                      },
                      "tryMessage": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/tryMessage"
                      },
                      "nextSteps": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/nextSteps"
                      },
                      "customSections": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/customSections"
                      },
                      "details": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/details"
                      },
                      "command": {
                        "type": "string"
                      },
                      "args": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    },
                    "required": [
                      "type",
                      "message",
                      "command",
                      "args"
                    ],
                    "additionalProperties": false
                  }
                ]
              }
            },
            "required": [
              "environment",
              "error"
            ],
            "additionalProperties": false
          }
        ]
      }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
  }
  ```
```

## `shopify theme push`

Uploads your local theme files to the connected store, overwriting the remote version if specified.

```
USAGE
  $ shopify theme push
  $ shopify theme push --unpublished --json

FLAGS
  -a, --allow-live
      Allow push to a live theme. Required in non-interactive environments when targeting the live theme.
      [env: SHOPIFY_FLAG_ALLOW_LIVE]

  -c, --development-context=<value>
      Unique identifier for a development theme context (e.g., PR number, branch name). Reuses an existing development
      theme with this context name, or creates one if none exists.
      [env: SHOPIFY_FLAG_DEVELOPMENT_CONTEXT]

  -d, --development
      Push theme files from your remote development theme. Use --development, --live, --theme, or --unpublished in
      non-interactive environments.
      [env: SHOPIFY_FLAG_DEVELOPMENT]

  -e, --environment=<value>...
      The environment to apply to the current command.
      [env: SHOPIFY_FLAG_ENVIRONMENT]

  -j, --json
      Output the result as JSON. Automatically disables color output.
      [env: SHOPIFY_FLAG_JSON]

  -l, --live
      Push theme files from your remote live theme. Use --development, --live, --theme, or --unpublished in
      non-interactive environments.
      [env: SHOPIFY_FLAG_LIVE]

  -n, --nodelete
      Prevent deleting remote files that don't exist locally.
      [env: SHOPIFY_FLAG_NODELETE]

  -o, --only=<value>...
      Upload only the specified files (Multiple flags allowed). Wrap the value in double quotes if you're using wildcards.
      [env: SHOPIFY_FLAG_ONLY]

  -p, --publish
      Publish as the live theme after uploading.
      [env: SHOPIFY_FLAG_PUBLISH]

  -s, --store=<value>
      Store URL. It can be the store prefix (example) or the full myshopify.com URL (example.myshopify.com,
      https://example.myshopify.com).
      [env: SHOPIFY_FLAG_STORE]

  -t, --theme=<value>
      Theme ID or name of the remote theme. Use --development, --live, --theme, or --unpublished in non-interactive
      environments. When using --unpublished without --development, use --theme to provide the new theme name.
      [env: SHOPIFY_FLAG_THEME_ID]

  -u, --unpublished
      Create a new unpublished theme and push to it. Use --development, --live, --theme, or --unpublished in
      non-interactive environments. When using --unpublished without --development, use --theme to provide the new theme
      name.
      [env: SHOPIFY_FLAG_UNPUBLISHED]

  -x, --ignore=<value>...
      Skip uploading the specified files (Multiple flags allowed). Wrap the value in double quotes if you're using
      wildcards.
      [env: SHOPIFY_FLAG_IGNORE]

  --auth-alias=<value>
      Alias of the Shopify account to use for authentication.
      [env: SHOPIFY_FLAG_AUTH_ALIAS]

  --json-schema
      Print the command's JSON schemas.
      [env: SHOPIFY_FLAG_JSON_SCHEMA]

  --listing=<value>
      The listing preset to use for multi-preset themes. Applies preset files from listings/[preset-name] directory.
      [env: SHOPIFY_FLAG_LISTING]

  --no-color
      Disable color output.
      [env: SHOPIFY_FLAG_NO_COLOR]

  --no-input
      Disable interactive prompts and browser authentication.
      [env: SHOPIFY_FLAG_NO_INPUT]

  --password=<value>
      Password generated from the Theme Access app or an Admin API token.
      [env: SHOPIFY_CLI_THEME_TOKEN]

  --path=<value>
      The path where you want to run the command. Defaults to the current working directory.
      [env: SHOPIFY_FLAG_PATH]

  --strict
      Require theme check to pass without errors before pushing. Warnings are allowed.
      [env: SHOPIFY_FLAG_STRICT_PUSH]

  --verbose
      Increase the verbosity of the output. May include sensitive data.
      [env: SHOPIFY_FLAG_VERBOSE]

DESCRIPTION
  Uploads your local theme files to the connected store, overwriting the remote version if specified.

  Uploads your local theme files to Shopify, overwriting the remote version if specified.

  If no theme is specified, then you're prompted to select the theme to overwrite from the list of the themes in your
  store.

  You can run this command only in a directory that matches the "default Shopify theme folder structure"
  (https://shopify.dev/docs/themes/tools/cli#directory-structure).

  This command returns the following information:

  - A link to the "editor" (https://shopify.dev/docs/themes/tools/online-editor) for the theme in the Shopify admin.
  - A "preview link"
  (https://help.shopify.com/manual/online-store/themes/adding-themes#share-a-theme-preview-with-others) that you can
  share with others.

  If you use the `--json` flag, then theme information is returned in JSON format, which can be used as a
  machine-readable input for scripts or continuous integration.

  Sample output:

    ```json
    {
      "status": "success",
      "changed": true,
      "issues": [],
      "theme": {
        "id": "108267175958",
        "name": "MyTheme",
        "role": "unpublished",
        "storeDomain": "mystore.myshopify.com",
        "editorUrl": "https://mystore.myshopify.com/admin/themes/108267175958/editor",
        "previewUrl": "https://mystore.myshopify.com/?preview_theme_id=108267175958"
      }
    }
    ```


  Use `--json-schema` to print the result, error, and event schemas.

  Output from `--json` conforms to the `ThemePushJsonResult` schema.

  ```json
  {
    "anyOf": [
      {
        "$ref": "#/definitions/ThemeEnvironment/anyOf/0/properties/result"
      },
      {
        "type": "object",
        "properties": {
          "environments": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/ThemeEnvironment"
            }
          }
        },
        "required": [
          "environments"
        ],
        "additionalProperties": false
      }
    ],
    "title": "ThemePushJsonResult",
    "definitions": {
      "ThemePushTheme": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "pattern": "^\\d+$",
            "description": "The decimal Online Store theme ID, not a Shopify GID."
          },
          "name": {
            "type": "string"
          },
          "role": {
            "type": "string",
            "description": "The upstream theme role; known values include live, unpublished, and development."
          },
          "storeDomain": {
            "anyOf": [
              {
                "type": "string",
                "pattern": "^[a-z0-9][a-z0-9-]*\\.myshopify\\.com$"
              },
              {
                "type": "null"
              }
            ]
          },
          "previewUrl": {
            "anyOf": [
              {
                "type": "string",
                "format": "uri"
              },
              {
                "type": "null"
              }
            ]
          },
          "editorUrl": {
            "anyOf": [
              {
                "type": "string",
                "format": "uri"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "required": [
          "id",
          "name",
          "role",
          "storeDomain",
          "previewUrl",
          "editorUrl"
        ],
        "additionalProperties": false
      },
      "ThemeEnvironment": {
        "anyOf": [
          {
            "type": "object",
            "properties": {
              "environment": {
                "type": "string"
              },
              "result": {
                "anyOf": [
                  {
                    "anyOf": [
                      {
                        "type": "object",
                        "properties": {
                          "status": {
                            "type": "string",
                            "enum": [
                              "success",
                              "partial"
                            ]
                          },
                          "changed": {
                            "type": "boolean"
                          },
                          "theme": {
                            "$ref": "#/definitions/ThemePushTheme"
                          },
                          "issues": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "filePath": {
                                  "type": "string"
                                },
                                "message": {
                                  "type": "string"
                                }
                              },
                              "required": [
                                "filePath",
                                "message"
                              ],
                              "additionalProperties": false
                            }
                          }
                        },
                        "required": [
                          "status",
                          "changed",
                          "theme",
                          "issues"
                        ],
                        "additionalProperties": false
                      },
                      {
                        "type": "object",
                        "properties": {
                          "status": {
                            "type": "string",
                            "const": "skipped"
                          },
                          "reason": {
                            "type": "string",
                            "const": "unsafe-directory"
                          }
                        },
                        "required": [
                          "status",
                          "reason"
                        ],
                        "additionalProperties": false
                      }
                    ]
                  },
                  {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "string",
                        "const": "cancelled"
                      }
                    },
                    "required": [
                      "status"
                    ],
                    "additionalProperties": false
                  }
                ]
              }
            },
            "required": [
              "environment",
              "result"
            ],
            "additionalProperties": false
          },
          {
            "type": "object",
            "properties": {
              "environment": {
                "type": "string"
              },
              "error": {
                "anyOf": [
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "const": "abort"
                      },
                      "message": {
                        "type": "string"
                      },
                      "code": {
                        "type": "string",
                        "minLength": 1,
                        "description": "A stable error code, included only when known."
                      },
                      "tryMessage": {
                        "type": "string"
                      },
                      "nextSteps": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      },
                      "customSections": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "title": {
                              "type": "string"
                            },
                            "body": {
                              "anyOf": [
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "array",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    }
                                  }
                                }
                              ]
                            }
                          },
                          "required": [
                            "body"
                          ],
                          "additionalProperties": false
                        }
                      },
                      "details": {
                        "description": "Selected domain details, preserving native API payloads such as GraphQL errors, extensions, and data."
                      }
                    },
                    "required": [
                      "type",
                      "message"
                    ],
                    "additionalProperties": false
                  },
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "const": "bug"
                      },
                      "message": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/message"
                      },
                      "code": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/code"
                      },
                      "tryMessage": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/tryMessage"
                      },
                      "nextSteps": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/nextSteps"
                      },
                      "customSections": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/customSections"
                      },
                      "details": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/details"
                      },
                      "stack": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "type",
                      "message"
                    ],
                    "additionalProperties": false
                  },
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "const": "external"
                      },
                      "message": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/message"
                      },
                      "code": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/code"
                      },
                      "tryMessage": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/tryMessage"
                      },
                      "nextSteps": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/nextSteps"
                      },
                      "customSections": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/customSections"
                      },
                      "details": {
                        "$ref": "#/definitions/ThemeEnvironment/anyOf/1/properties/error/anyOf/0/properties/details"
                      },
                      "command": {
                        "type": "string"
                      },
                      "args": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    },
                    "required": [
                      "type",
                      "message",
                      "command",
                      "args"
                    ],
                    "additionalProperties": false
                  }
                ]
              }
            },
            "required": [
              "environment",
              "error"
            ],
            "additionalProperties": false
          }
        ]
      }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
  }
  ```
```

## `shopify version`

Shopify CLI version currently installed.

```
USAGE
  $ shopify version [-j] [--json-schema] [--no-color] [--no-input] [--verbose]

FLAGS
  -j, --json
      Output the result as JSON. Automatically disables color output.
      [env: SHOPIFY_FLAG_JSON]

  --json-schema
      Print the command's JSON schemas.
      [env: SHOPIFY_FLAG_JSON_SCHEMA]

  --no-color
      Disable color output.
      [env: SHOPIFY_FLAG_NO_COLOR]

  --no-input
      Disable interactive prompts and browser authentication.
      [env: SHOPIFY_FLAG_NO_INPUT]

  --verbose
      Increase the verbosity of the output. May include sensitive data.
      [env: SHOPIFY_FLAG_VERBOSE]

DESCRIPTION
  Shopify CLI version currently installed.

  Use `--json-schema` to print the result, error, and event schemas.

  Output from `--json` conforms to the `VersionResult` schema.

  ```json
  {
    "type": "object",
    "properties": {
      "version": {
        "type": "string"
      }
    },
    "required": [
      "version"
    ],
    "additionalProperties": false,
    "title": "VersionResult",
    "$schema": "http://json-schema.org/draft-07/schema#"
  }
  ```
```
<!-- commandsstop -->
