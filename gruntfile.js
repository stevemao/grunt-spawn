module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    spawn: {
      mocha_test: {
        command: "mocha",
        commandArgs: ["--reporter", "spec", "{0}"],
        directory: "./tests",
        pattern: "**/*.js"
      }
    }
  });

  grunt.registerTask("test", ["spawn:mocha_test"]);

  grunt.loadNpmTasks("grunt-spawn");
}