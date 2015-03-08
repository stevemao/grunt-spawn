require("./include");

function FileBuilder() {
	'use strict';
	
	var self = this;
	self.scanPattern = /.*/;
	self.rootDirectory = path.normalize(__dirname + "/../../");
	self.__type__ = "<grunt-spawn/>::tasks::lib::FileBuilder::";

	self.setDirectory = function(directory) {
		assert(directory, self.__type__ + "setDirectory(directory != null)");
		self.rootDirectory = path.normalize(directory);
		return this;
	};

	self.eachDirectory = function(directoryCallback) {
		assert(directoryCallback, self.__type__ + "eachDirectory(directoryCallback != null)");
		var results = [];
		fstools.walkSync(
			self.rootDirectory, 
			self.scanPattern, 
			function(fileSystemItem) {
				var directory = path.dirname(fileSystemItem);
				directory = path.normalize(directory);
				results.push(directory);
			});
		results = _.unique(results);
		_.each(results, function(directory){
			directoryCallback(directory);
		});
	}

	self.allDirectories = function(){
		var results = [];
		self.eachDirectory(function(directory){
			results.push(directory);
		});
		return results;
	};

	self.eachFile = function(fileCallback) {
		assert(fileCallback, self.__type__ + "eachFile(fileCallback != null)");
		fstools.walkSync(
			self.rootDirectory, 
			self.scanPattern, 
			function(fileSystemItem) {
				var filePath = path.normalize(fileSystemItem);
				fileCallback(filePath);
			});
	};

	self.allFiles = function(){
		var results = [];
		self.eachFile(function(file){
			results.push(file);
		});
		return results;
	};

	self.all = function(){
		var results = [];
		results = results.concat(self.allDirectories());
		results = results.concat(self.allFiles());
		return results;
	};

}

module.exports = FileBuilder;