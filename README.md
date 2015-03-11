grunt-spawn [![Build Status](https://travis-ci.org/fir3pho3nixx/grunt-spawn.png?branch=master)](https://travis-ci.org/fir3pho3nixx/grunt-spawn)
===========

A process launcher designed for when you dont have a grunt plugin, or know the console command but cannot be bothered adding yet
another plugin to your arsenal of tools :)

Sometimes bootstrapping the console is the simplist way and removes a layer of abstraction between you as the developer and the kind of automation you need. I also found it particularly useful for teaching javascript automation in a predominently C# environment where knowledge of javascript is zero to none. 

## What is this?

This project is a plugin for Grunt.JS that gives one the ability to spawn processes. This project has been tested heaps on windows but most of the development happens from a Unix flavour of some description(Mac).

## How do I use it?

### npm install

You can install this plugin via the node package manager. 

    npm install grunt-cli -g
    npm install grunt
    npm install grunt-spawn

### package.json

It is also good to create yourself a package.json file and embed this in your devDependencies section. For more please click [here](https://docs.npmjs.com/files/package.json). Example below: 

    {
      "name": "my-project",
      "version": "0.0.1",
      "private": true,
      "author": "foo@world.com",
      "description": "my-project",
      "keywords": [
        "grunt",
        "spawn"
      ],
      "repository": {
        "type": "git",
        "url": "https://github.com/me/my-project.git"
      },
      "dependencies": {
      },
      "devDependencies": {
        "grunt": "0.4.x",
        "grunt-spawn": "0.0.x"
      },
      "scripts": {
        "test": "grunt spawn:test"
      },
      "engines": {
        "node": "0.10.x"
      }
    }

## What about Grunt?

### gruntfile.js

You can use the following example to setup your grunt file. To get you started.

    path = require("path");

    module.exports = function(grunt) {
    //grunt.option("force", true);
    
    grunt.initConfig({
      
      pkg: grunt.file.readJSON("package.json"),

      jshint: {
        files: [
          "package.json",
          "gruntfile.js", 
          "lib/**/*.js",
          "test/**/*.js"
        ]
      },

      spawn: {
        echo: {
          command: "echo",
          commandArgs: ["{0}"], 
          directory: "./tests",
          pattern: "**/*.js",
          useQuotes: true,
          quoteDelimiter: "\"",
          groupFiles: true,
          fileDelimiter: " ", 
          ignore: ["notNeededFile.js"]
        },
        list: {
          command: "ls",
          commandArgs: ["-la", "{0}"], 
          directory: "./tests"
        },
        test: {
          command: "mocha",
          commandArgs: ["--reporter", "spec", "{0}"],
          directory: "./tests",
          pattern: "**/*.js"
        }
      },

      release: {
        options: {
          bump: true,
          file: "package.json",
          add: true, 
          commit: true,
          tag: true,
          push: true,
          pushTags: true,
          npm: true
        }
      }

    });

    
      grunt.loadTasks("./tasks");
      grunt.loadNpmTasks("grunt-release");
      grunt.loadNpmTasks("grunt-contrib-jshint");

      grunt.registerTask("test", ["spawn:test"]);
      grunt.registerTask("default", ["spawn:test", "release"]);
    
    };

## What does it all mean?

### The 'spawn' task

Pay special attention to the spawn task above. There are two targets namely `list` which is merely a demonstration of a bare bones shell command and `test` which demonstrates how this plugin can be tweaked to do slightly more fine grained spawning. Grunt-cli commands below: 

    grunt spawn:echo

OR

    grunt spawn:list

OR

    grunt spawn:test

Here is a brief description of the elements involved when configuring a grunt-spawn subtask:

 - `command`: "echo" -> Any command
 - `commandArgs`: ["{0}"] -> commandArgs where '{0}' is a placeholder for a file
 - `directory`: "./tests" -> Working directory
 - `pattern`: "**/*.js" -> Globbing wildcard based on minimatch
 - `useQuotes`: true -> Whether to use the quote delimiter or not
 - `quoteDelimiter`: "\"" -> The actual quote delimiter if useQuotes = true
 - `groupFiles`: true -> Whether to group files into a single string
 - 'passThrough': good with groupFiles = true; removes lame file scanning.
 - `fileDelimiter`: " " -> The file delimiter if groupFiles = true
 - `ignore`: ["any.js"] -> The files you would like to exclude
 - `opts`: { cwd: process.cwd() } -> Pass through mechanism for passing 'opts' to grunt.spawn
 - `dontWait`: true | false -> To wait or not?

## More Examples?

Here is a further example of how you would create a start/wait task for express. This 
was tested with express v4.11.0. Notice how we use opts to override stdio. This is 
passed to nodejs spawn. 

### When to 'groupFiles'

If you are not scanning for any wildcard patterns and you would like to pass your
arguments as a space separated array to a single command then you would need to 
set this option to true. If you dont this, then each result found within the wildcard
matching pattern will be run individually against the command. So if three files are 
found, the command will be run 3 times. 

### When to 'passThrough'

If you are not interested in scanning the filesystem and have a command that does not require any file based input from grunt-spawn then you can use set this option to true. This will bypass any scanning done on the current directory. This can dramatically speed up the execution time of things. 

### Express example

Here is an example that launches and provides feedback from express in a blocking way. You
have to CTRL-C to exit.

    module.exports = function(grunt) {

      // Project configuration.
      grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // *** - grunt-spawn: WebStart for Express {Start}
        spawn: {
          webstart: {
            command: 'node',
            commandArgs: ['{0}'],
            directory: './',
            groupFiles: true, 
            passThrough: false,
            pattern: 'www',
            opts: {
              stdio: 'inherit',
              cwd: __dirname + '/'
            }
          }
        // *** - grunt-spawn: WebStart for Express {End}
        }
      });

      // Grunt plugins.
      grunt.loadNpmTasks('grunt-spawn');
      grunt.loadNpmTasks('grunt-contrib-concat');
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-qunit');
      grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-watch');

      // Default task.
      grunt.registerTask('default', ['spawn:webstart']);

    };

###Express example output

Included some example output from an express process. 

    Running "spawn:webstart" (spawn) task


    <grunt-spawn/>: Launching child process
    >> <grunt-spawn/>: Launching 'node bin/www' starting in '/usr/local/src/nodejs/poly-plates' overridden with cwd='/usr/local/src/nodejs/poly-plates/'
    GET / 304 314.669 ms - -
    GET /stylesheets/style.css 304 5.350 ms - -
    GET /favicon.ico 404 57.264 ms - 1186


More examples coming soon. Any problems, please raise issues.

