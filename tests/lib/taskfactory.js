require("../../tasks/lib/include");

var TaskFactory = require("../../tasks/lib/taskfactory");
var FileBuilder = require("../../tasks/lib/filebuilder");

describe("Given TaskFactory() with files", function() {

	var task = {
		data: {
			command: "command",
			commandArgs: ["arg1", "arg2", "{0}"],
			directory: __dirname, 
			pattern: "**/*.js",
			ignore: ["wildcard.js"]
		},
	};

	var taskFactory = new TaskFactory(task);

	describe("When #format()", function() {

		var file = "anyfile";
		var args = ["arg1", "arg2", "{0}"];
		var result = taskFactory.format(args, file);

		it("Then should have ['arg1', 'arg2', 'anyfile']", function() {
			assert(result.length == 3);
			assert(result[0] == "arg1");
			assert(result[1] == "arg2");
			assert(result[2] == "anyfile");
		});

	});

	describe("When #shouldIgnore()", function(){

		it("Then should exclude wildcard.js", function(){
			var result = taskFactory.shouldIgnore("anyDir/wildcard.js");
			assert(result, "Ignore logic in factory failed");
		});

	});

	describe("When #filterIgnoredFiles", function(){

		it("Then should remove wildcard.js", function(){
			var files = ["anyFile.js", "wildcard.js"];
			var result = taskFactory.filterIgnoredFiles(files);
			assert(result.length == 1);
		});

	});

	describe("When #buildTasks()", function() {

		var tasks = taskFactory.buildTasks();

		var files = 
			(new FileBuilder())
				.setDirectory(__dirname)
				.allFiles();

		it("Then should have {0} tasks".format(files.length), function() {
			assert(tasks.length == (files.length - 1), "Tasks dont match files");
		});

	});

});

describe("Given TaskFactory() without files", function() {

	var task = {};

	var taskFactory = new TaskFactory(task);

	describe("When #format()", function() {

		var args = ["arg1", "arg2", "arg3"];
		var result = taskFactory.format(args);

		it("Then should have ['arg1', 'arg2', 'arg3']", function() {
			assert(result.length == 3);
			assert(result[0] == "arg1");
			assert(result[1] == "arg2");
			assert(result[2] == "arg3");

		});

	});

});