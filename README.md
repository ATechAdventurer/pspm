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
$ npm install -g pspm
$ pspm COMMAND
running command...
$ pspm (--version)
pspm/0.0.0 darwin-arm64 node-v18.11.0
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
* [`pspm plugins`](#pspm-plugins)
* [`pspm plugins:install PLUGIN...`](#pspm-pluginsinstall-plugin)
* [`pspm plugins:inspect PLUGIN...`](#pspm-pluginsinspect-plugin)
* [`pspm plugins:install PLUGIN...`](#pspm-pluginsinstall-plugin-1)
* [`pspm plugins:link PLUGIN`](#pspm-pluginslink-plugin)
* [`pspm plugins:uninstall PLUGIN...`](#pspm-pluginsuninstall-plugin)
* [`pspm plugins:uninstall PLUGIN...`](#pspm-pluginsuninstall-plugin-1)
* [`pspm plugins:uninstall PLUGIN...`](#pspm-pluginsuninstall-plugin-2)
* [`pspm plugins update`](#pspm-plugins-update)

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

## `pspm plugins`

List installed plugins.

```
USAGE
  $ pspm plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ pspm plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.4.2/src/commands/plugins/index.ts)_

## `pspm plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ pspm plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ pspm plugins add

EXAMPLES
  $ pspm plugins:install myplugin 

  $ pspm plugins:install https://github.com/someuser/someplugin

  $ pspm plugins:install someuser/someplugin
```

## `pspm plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ pspm plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ pspm plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.4.2/src/commands/plugins/inspect.ts)_

## `pspm plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ pspm plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ pspm plugins add

EXAMPLES
  $ pspm plugins:install myplugin 

  $ pspm plugins:install https://github.com/someuser/someplugin

  $ pspm plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.4.2/src/commands/plugins/install.ts)_

## `pspm plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ pspm plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ pspm plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.4.2/src/commands/plugins/link.ts)_

## `pspm plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ pspm plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ pspm plugins unlink
  $ pspm plugins remove
```

## `pspm plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ pspm plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ pspm plugins unlink
  $ pspm plugins remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.4.2/src/commands/plugins/uninstall.ts)_

## `pspm plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ pspm plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ pspm plugins unlink
  $ pspm plugins remove
```

## `pspm plugins update`

Update installed plugins.

```
USAGE
  $ pspm plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.4.2/src/commands/plugins/update.ts)_
<!-- commandsstop -->
