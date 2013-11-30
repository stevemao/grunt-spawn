grunt-spawn [![Build Status](https://travis-ci.org/fir3pho3nixx/grunt-spawn.png?branch=master)](https://travis-ci.org/fir3pho3nixx/grunt-spawn)
===========

A process launcher that does what it says on the tin

## What is this?

This project is a plugin for Grunt.JS that gives one the ability to spawn processes. This project has not been tested on windows but I am sure with all the heavy lifting the grunt team have done to make Grunt work everywhere, it might just work. The tests are not supported for windows.

## How do I use it?

### npm install

You can install this plugin via the node package manager. 

    npm install grunt-cli -g
    npm install grunt
    npm install grunt-spawn

### package.json

It is also good to create yourself a package.json file and emebed it in the dependencies or devDependencies section. For more please click [here](https://npmjs.org/doc/json.html). Example below: 

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

You can use the following example to setup your grunt file. 

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

Here is a brief description of the elements involved:

 - `command`: "echo" -> Any command
 - `commandArgs`: ["{0}"] -> commandArgs where '{0}' is a placeholder for a file
 - `directory`: "./tests" -> Working directory
 - `pattern`: "**/*.js" -> Globbing wildcard based on minimatch
 - `useQuotes`: true -> Whether to use the quote delimiter or not
 - `quoteDelimiter`: "\"" -> The actual quote delimiter if useQuotes = true
 - `groupFiles`: true -> Whether to group files into a single string
 - `fileDelimiter`: " " -> The file delimiter if groupFiles = true
 - `ignore`: ["any.js"] -> The files you would like to exclude
 - `opts`: { cwd: process.cwd() } -> Pass through mechanism for passing 'opts' to grunt.spawn

Ciao! :)
