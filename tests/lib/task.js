require("../../tasks/lib/include");
var fs = require('fs');

var Task = require("../../tasks/lib/task");
var TaskArgs = require("../../tasks/lib/taskargs");

describe("Given Task('ls', ['-la'])", function() {

	describe("When #execute()", function() {

		var args = new TaskArgs("ls", ["-la"]);
		var task = new Task(args);
		it("Then should not throw", function() {
			task.execute();
		});

	});

	describe("When #execute() with callback", function() {

		var args = new TaskArgs("ls", ["-la"]);
		var task = new Task(args);
		it("Then should not throw", function(done) {

			task.execute(function(code) {
				assert(code == 0, "Task did not exit cleanly");
				done();
			});

		});

	});

	describe("When #execute with invalid directory", function() {

		var args = new TaskArgs("ls", ["-la"], {cwd: "non-existant"});
		var task = new Task(args);

		it("Then exit with an error", function(done) {

			task.execute(function(code) {
				assert(code > 0, "Task should not exit cleanly");
				done();
			});

		});

	});

});