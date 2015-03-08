require("./include");

var Task = require("./task");
var TaskArgs = require("./taskargs");
var TaskConfig = require("./taskconfig");
var Wildcard = require("./wildcard");
var FileBuilder = require("./filebuilder");

function TaskFactory(task) {
	'use strict';

	assert(task, "TaskFactory::task = null");

	var self = this;
	self.config = new TaskConfig(task);
	self.__type__ = "<grunt-spawn/>::tasks::lib::TaskFactory::";

	grunt.log.debug("spawn::lib::TaskFactory::#ctor() ->");

	self.format = function(args, filepath) {
		grunt.log.debug(self.__type__ + "format(args={0}, filepath={1}) ->".format(args, filepath));
		var formattedArgs = [];
		_.each(args, function(arg) {
			if (!_.isNull(filepath)) {
				formattedArgs.push(arg.format(filepath));
			} else {
				if (arg !== "{0}") formattedArgs.push(arg);
			}
		});
		grunt.log.debug(self.__type__ + "format(result={0}) <-".format(formattedArgs));
		return formattedArgs;
	};

	self.quoteWith = function(delimiter, stringArray) {
		grunt.log.debug(self.__type__ + "quoteWith(delimiter={0}, stringArray={1}) ->".format(delimiter, stringArray));
		var result = [];
		_.each(stringArray, function(str) {
			result.push(delimiter + str + delimiter);
		});
		grunt.log.debug(self.__type__ + "quoteWith(result={0}) <-".format(result));
		return result;
	};

	self.shouldIgnore = function(file) {
		grunt.log.debug(self.__type__ + "shouldIgnore(file={0}) ->".format(file));
		var result = false;
		_.each(self.config.get().ignore, function(ignoreFile) {
			if (S(file).endsWith(ignoreFile)) {
				result = true;
			}
		});
		grunt.log.debug(self.__type__ + "shouldIgnore(result={0}) <-".format(result));
		return result;
	};

	self.filterIgnoredFiles = function(files) {
		grunt.log.debug(self.__type__ + "filterIgnoredFiles(files={0}) ->".format(files));
		var result = [];
		_.each(files, function(file) {
			if (!self.shouldIgnore(file))
				result.push(file);
		});
		grunt.log.debug(self.__type__ + "filterIgnoredFiles(result={0}) <-".format(result));
		return result;
	};

	self.filterFiles = function(files) {
		grunt.log.debug(self.__type__ + "filterFiles(files={0}) <-".format(files));
		var config = self.config.get();
		var wildcard = new Wildcard();
		var result = wildcard.matches(config.pattern, files);
		result = self.filterIgnoredFiles(result);
		grunt.log.debug(self.__type__ + "filterFiles(result={0}) <-".format(result));
		return result;
	};

	self.getAllFiles = function() {
		var config = self.config.get();
		var fileBuilder = new FileBuilder();
		var files = fileBuilder
			.setDirectory(config.directory)
			.allFiles();
		return files;
	};

	self.createTask = function(fileOrFiles) {
		var config = self.config.get();
		var args = self.format(config.commandArgs, fileOrFiles);
		var taskArgs = new TaskArgs(config.command, args, config.opts);
		taskArgs.config = config;
		var task = new Task(taskArgs);
		return task;
	};

	self.buildTasks = function() {

		grunt.log.debug(self.__type__ + "buildTasks() ->");

		var tasks = [];
		var config = self.config.get();

		if (!config.passThrough) {
			var files = self.getAllFiles();
			var filteredFiles = self.filterFiles(files);
			if (config.useQuotes)
				filteredFiles = self.quoteWith(config.quoteDelimiter, filteredFiles);

			if (config.groupFiles) {
				var groupedFiles = filteredFiles.join(config.fileDelimiter);
				var task = self.createTask(groupedFiles);
				tasks.push(task);
			} else {
				_.each(filteredFiles, function(file) {
					var task = self.createTask(file);
					tasks.push(task);
				});
			}
		} else {
			var task = self.createTask('');
			tasks.push(task);
		}

		grunt.log.debug(self.__type__ + "buildTasks(result=void) <-");

		return tasks;
	};

}

module.exports = TaskFactory;