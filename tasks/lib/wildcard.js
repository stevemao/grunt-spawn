require("./include");

function Wildcard() {
	'use strict';

	var self = this;
	self.__type__ = "<grunt-spawn/>::tasks::lib::Wildcard::";

	self.isArrayAndNotNull = function(value) {
		grunt.log.debug(self.__type__ + "isArrayAndNotNull(value={0}) ->".format(value));
		var result = !_.isNull(value) && _(value).isArray();
		grunt.log.debug(self.__type__ + "isArrayAndNotNull(result={0}) ->".format(result));
		return result;
	};

	self.matchArray = function(pattern, values) {
		grunt.log.debug(self.__type__ + "matchArray(pattern={0}, values={1}) ->".format(pattern, values));
		var results = [];
		if (self.isArrayAndNotNull(values)) {
			_.each(values, function(value) {
				if (minimatch(value, pattern, {
					matchBase: true
				})) {
					results.push(value);
				}
			});
		}
		grunt.log.debug(self.__type__ + "matchArray(result={0}) ->".format(results));
		return results;
	};

	self.matchSingle = function(pattern, value) {
		grunt.log.debug(self.__type__ + "format(pattern={0}, value={1}) ->".format(pattern, value));
		var result = minimatch(value, pattern, {
			matchBase: true
		});
		grunt.log.debug(self.__type__ + "format(result={0}) ->".format(result));
		return result;
	};

	self.matches = function(pattern, listOfValues) {
		var result = false;
		grunt.log.debug(self.__type__ + "matches(pattern={0}, listOfValues={1}) ->".format(pattern, listOfValues));
		if (self.isArrayAndNotNull(listOfValues)) {
			result = self.matchArray(pattern, listOfValues);
			grunt.log.debug(self.__type__ + "matches(result={0}) ->".format(result));
			return result;
		}
		result = self.matchSingle(pattern, listOfValues);
		grunt.log.debug(self.__type__ + "matches(result={0}) ->".format(result));
		return result;
	};
}

module.exports = Wildcard;