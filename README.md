# grunt-init-hull
> Create a complete [Hull.io][] application with [grunt-init][].

## Installation
If you haven't already done so, install [grunt-init][] by running:

> npm install -g grunt-init

Once grunt-init is installed, place this template in your `~/.grunt-init/`
directory (`%USERPROFILE%\.grunt-init\` on Windows). It's recommended that you
use git to clone this template into that directory, as follows:

```
git clone git://github.com/hull/grunt-init-hull.git ~/.grunt-init/hull
```

## Usage
At the command-line, change into an empty directory, run the following command
and answer the prompts.

```
grunt-init hull
npm install
```

> Note that this template will generate files in the current directory, so
  be sure to change to a new directory first if you don't want to overwrite
  existing files.

## After `grunt-init hull`

Once your project is built, we provide your project with a bunch of [grunt][] tasks
to help you get started.

> grunt dist

This is the default task. It compiles all your assets so they are production-ready.

> grunt server

Starts a static server (on port 9000), bundled with LiveReload, to run your application on your workstation.

# License

MIT

[grunt-init]: http://gruntjs.com/project-scaffolding
[grunt]: http://gruntjs.com/
[Hull.io]: http://hull.io

