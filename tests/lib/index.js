require("../../tasks/lib/include");

describe("Given spawn.*", function() {

	var spawn = require("../../tasks/lib");
	assert(spawn != null);

	describe("When spawn.Task()", function() {

		it("Then should exist", function() {

			assert(spawn.Task != null);

		});

	});

	describe("When spawn.TaskArgs()", function() {

		it("Then should exist", function() {

			assert(spawn.TaskArgs != null);

		});

	});

	describe("When spawn.TaskFactory()", function() {

		it("Then should exist", function() {

			assert(spawn.TaskFactory != null);

		});

	});

});