require("./lib/include");

grunt.registerMultiTask("spawn", function() {
	'use strict';

	var spawn = require("./lib");

	var counter = 0;
	var actions = [];
	var done = this.async();
	var factory = new spawn.TaskFactory(this);
	var tasks = factory.buildTasks();

	_.each(tasks, function(task) {
		actions.push(function(callback) {
			task.execute(function() {
				callback(null, counter++);
			});
		});
	});

	async.series(actions, function() {
		done();
	});

});