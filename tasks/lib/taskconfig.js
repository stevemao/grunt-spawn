require("./include");

function TaskConfig(task) {
	'use strict';

	var self = this;
	self.task = task;
	self._task = _(task);
	self._data = _(task.data);
	self.taskIsNotNull = !_.isNull(task);
	self.taskHasData = self._task.has("data");
	self.__type__ = "<grunt-spawn/>::tasks::lib::TaskConfig::";
	assert(task, self.__type__ + "task = null");

	self.propertyDefinitions = {
		command: { required: true, type: "path", defaultValue: "ls" },
		commandArgs: { required: false, type: "array", defaultValue: ["{0}"] },
		directory: { required: false, type: "path", defaultValue: process.cwd() },
		pattern: { required: false, type: "string", defaultValue: "**/*.js" },
		useQuotes: { required: false, type: "bool", defaultValue: false },
		quoteDelimiter: { required: false, type: "char", defaultValue: "\"" },
		groupFiles: { required: false, type: "bool", defaultValue: false },
		fileDelimiter: { require: false, type: "char", defaultValue: " " },
		ignore: { require: false, type: "array", defaultValue: [] },
		passThrough: { required: false, type: "passThrough", defaultValue: false },
		dontWait: { required: false, type: "dontWait", defaultValue: false },
		opts: { require: false, type: "object", defaultValue: { cwd: process.cwd() } }
	};

	self.hasData = function(){
		grunt.log.debug(self.__type__ + "hasData() ->");
		var result = self.taskIsNotNull && self.taskHasData;
		grunt.log.debug(self.__type__ + "hasData(result={0}) <-".format(result));
		return result;
	};

	self.hasProperty = function(propertyName) {
		grunt.log.debug(self.__type__ + "hasProperty(propertyName={0}) ->".format(propertyName));
		var result = self.hasData() && _(self.task.data).has(propertyName);
		grunt.log.debug(self.__type__ + "hasProperty(result={0}) <-".format(result));
		return result;
	};

	self.getProperty = function(propertyName) {
		grunt.log.debug(self.__type__ + "hasProperty(propertyName={0}) ->".format(propertyName));
		var result = self.task.data[propertyName];
		grunt.log.debug(self.__type__ + "hasProperty(result={0}) <-".format(result));
		return result;
	};

	self.throwIfPropertyNotFound = function(propertyName, propertySpecification) {
		grunt.log.debug(self.__type__ + "throwIfPropertyNotFound(propertyName={0}, propertySpecification={1}) ->".format(propertyName, propertySpecification));
		if (!self.hasProperty(propertyName))
			throw "Could not find property '{0}' for task '{1}', please make sure you define one of type '{2}'"
				.format(propertyName, self.task.name, propertySpecification);
		grunt.log.debug(self.__type__ + "throwIfPropertyNotFound(result=void) ->");
	};

	self.get = function(){
		grunt.log.debug(self.__type__ + "get() ->");
		var result = {};
		_.forIn(self.propertyDefinitions, function(value, key, object){
			var propertyValue = value.defaultValue;
			if (value.required)
				self.throwIfPropertyNotFound(key, value);
			if (self.hasProperty(key))
				propertyValue = self.getProperty(key);
			result[key] = propertyValue;
		});
		grunt.log.debug(self.__type__ + "get(result={0}) <-".format(result));
		return result;

	};
}

module.exports = TaskConfig;