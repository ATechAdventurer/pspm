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
$ npm install -g pspm-cli
$ pspm-cli COMMAND
running command...
$ pspm-cli (--version)
pspm-cli/0.0.0 darwin-arm64 node-v18.11.0
$ pspm-cli --help [COMMAND]
USAGE
  $ pspm-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pspm-cli help [COMMANDS]`](#pspm-cli-help-commands)
* [`pspm-cli install INSTALL`](#pspm-cli-install-install)
* [`pspm-cli nuke`](#pspm-cli-nuke)

## `pspm-cli help [COMMANDS]`

Display help for pspm-cli.

```
USAGE
  $ pspm-cli help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for pspm-cli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.19/src/commands/help.ts)_

## `pspm-cli install INSTALL`

Install a package

```
USAGE
  $ pspm-cli install INSTALL

ARGUMENTS
  INSTALL  Path to install

DESCRIPTION
  Install a package

EXAMPLES
  $ pspm-cli install
```

_See code: [dist/commands/install/index.ts](https://github.com/ATechAdventurer/pspm/blob/v0.0.0/dist/commands/install/index.ts)_

## `pspm-cli nuke`

Nuke all installed packages

```
USAGE
  $ pspm-cli nuke

DESCRIPTION
  Nuke all installed packages

EXAMPLES
  $ pspm-cli nuke
```

_See code: [dist/commands/nuke/index.ts](https://github.com/ATechAdventurer/pspm/blob/v0.0.0/dist/commands/nuke/index.ts)_
<!-- commandsstop -->
