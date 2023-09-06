oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @atechadventurer/pspm
$ pspm COMMAND
running command...
$ pspm (--version)
@atechadventurer/pspm/0.0.0 darwin-arm64 node-v18.11.0
$ pspm --help [COMMAND]
USAGE
  $ pspm COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pspm help [COMMANDS]`](#pspm-help-commands)
* [`pspm install INSTALL`](#pspm-install-install)
* [`pspm nuke`](#pspm-nuke)

## `pspm help [COMMANDS]`

Display help for pspm.

```
USAGE
  $ pspm help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for pspm.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.19/src/commands/help.ts)_

## `pspm install INSTALL`

Install a package

```
USAGE
  $ pspm install INSTALL

ARGUMENTS
  INSTALL  Path to install

DESCRIPTION
  Install a package

EXAMPLES
  $ pspm install
```

_See code: [dist/commands/install/index.ts](https://github.com/ATechAdventurer/pspm/blob/v0.0.0/dist/commands/install/index.ts)_

## `pspm nuke`

Nuke all installed packages

```
USAGE
  $ pspm nuke

DESCRIPTION
  Nuke all installed packages

EXAMPLES
  $ pspm nuke
```

_See code: [dist/commands/nuke/index.ts](https://github.com/ATechAdventurer/pspm/blob/v0.0.0/dist/commands/nuke/index.ts)_
<!-- commandsstop -->
