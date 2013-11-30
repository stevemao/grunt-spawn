require("../../tasks/lib/include");

var TaskConfig = require("../../tasks/lib/taskconfig");

describe("Given TaskConfig()", function() {

	var taskConfig = new TaskConfig({
		data: {
			command:"anyCommand", 
			commandArgs: ["anyArg"], 
			pattern: "anyPattern",
			directory: "anyDirectory"
		}
	});

	describe("When #get()", function() {

		var config = taskConfig.get();

		it("Then should find 'command'", function() {
			assert(config.command == "anyCommand", "command != null");
		});

		it("Then should find 'commandArgs'", function() {
			assert(config.commandArgs, "commandArgs != null");
			assert(config.commandArgs.length > 0, "commandArgs.length > 0");
			assert(config.commandArgs[0] == "anyArg", "commandArgs[0] != 'anyArg'");
		});

		it("Then should find 'pattern'", function() {
			assert(config.pattern == "anyPattern", "pattern == null");
		});

		it("Then should find 'directory'", function() {
			assert(config.directory == "anyDirectory", "directory == null");
		});

	});

});