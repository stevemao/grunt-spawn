grunt = require("grunt");
should = require("should");

Task = require("../../tasks/lib/task");
TaskArgs = require("../../tasks/lib/taskargs");

describe("Given Task('ls', ['-la'])", function(){

	var args = new TaskArgs("ls", ["-la"]);
	var task = new Task(args);

	describe("When #execute()", function(){

		it("Then should not throw", function(){

			(function(){
				task.execute();
			}).should.not.throw();

		});

	});

	describe("When #execute() with callback", function(){

		it("Then should not throw", function(done){

			task.execute(function(error, result, code){
				code.should.equal(0);
				done();
			});

		});

	});

});
