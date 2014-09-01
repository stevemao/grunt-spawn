var path = require("path");

module.exports = function(grunt) {
  'use strict';

  grunt.option("force", false);

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

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
        passThrough: true,
        dontWait: true,
        ignore: ["gruntfile.js"]
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
        npm: false
      }
    }

  });

  grunt.loadTasks("./tasks");
  grunt.loadNpmTasks("grunt-release");
  grunt.registerTask("test", ["spawn:test"]);
  grunt.registerTask("default", ["spawn:test"]);

};