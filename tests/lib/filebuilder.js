
require("../../tasks/lib/include");
FileBuilder = require("../../tasks/lib/filebuilder");

describe("Given FileBuilder()", function(){
	
	var fileBuilder = new FileBuilder();

	beforeEach(function(){
		fileBuilder = new FileBuilder();
	});

	describe("When #constructor()", function(){

		it("Then the rootDirectory should be set", function(){

			var assertDirectory = path.normalize(__dirname + "/../../");
			assert(fileBuilder.rootDirectory == assertDirectory, 
				"{0} != {1}".format(fileBuilder.rootDirectory, assertDirectory));

		});

	});

	describe("When #setDirectory()", function(){

		it("Then should change the rootFolder", function(){

			fileBuilder.setDirectory("anyDirectory");
			assert(fileBuilder.rootDirectory == "anyDirectory", "rootFolder did not change");

		});

	});

	describe("When #eachDirectory()", function(){

		it("Then we should find at least one directory", function(){

			var directoryCallbackWasCalled = false;

			fileBuilder.eachDirectory(function(directory){
				directoryCallbackWasCalled = true;
			});

			assert(directoryCallbackWasCalled, 
				"directory callback was not called for '{0}'"
					.format(fileBuilder.rootDirectory));

		});

		it("Then we should have a directory called 'tasks'", function(){

			var directoryWasFound = false;

			fileBuilder.eachDirectory(function(directory) {

				if (S(directory).contains("tasks/"))
					directoryWasFound = true;

			});

			assert(directoryWasFound, "Could not find 'tasks' directory");

		});

	});

	describe("When #eachFile()", function(){

		it("Then should find 'package.json'", function(){

			var fileWasFound = false;

			fileBuilder.eachFile(function(file){

				if (S(file).contains("package.json"))
					fileWasFound = true;

			});

			assert(fileWasFound, "Could not find file 'package.json'");


		});

	});

	describe("When #allDirectories()", function(){

		var directories = fileBuilder.allDirectories();

		it("Then should find more than one directory", function(){
			assert(directories.length > 0, "Could not find any directories");
		});

		it ("Then should find directory 'tasks'", function(){
			var result = _(directories).first(function(directory){
				return S(directory).contains("/tasks/");
			});

			assert(!_.isNull(result) && !_.isEmpty(result), "Could not find directory 'tasks'");
		});

	});

	describe("When #allFiles()", function(){

		var files = fileBuilder.allFiles();

		it("Then should find more than one files", function(){
			assert(files.length > 0, "Could not find any files");
		});

		it ("Then should find file 'package.json'", function(){
			var result = _(files).first(function(file){
				return S(files).contains("package.json");
			});

			assert(!_.isNull(result) && !_.isEmpty(result), "Could not find file 'package.json'");
		});

	});

	describe("When #all()", function(){

		var all = fileBuilder.all();

		it("Then should find more than one item", function(){
			assert(all.length > 0, "Could not find any directory or file items in result");
		})

	});

});