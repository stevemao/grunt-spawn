require("./include");

function Task(taskArgs) {
	'use strict';

	var self = this;
	self.taskArgs = taskArgs;
	self.__type__ = "<grunt-spawn/>::tasks::lib::Task::";

	self.fail = function() {
		grunt.fail.fatal("<grunt-spawn/>: A child process generated error. Exiting.", 1);
	};

	self.hasCwd = function(taskArgs) {
		return taskArgs.opts && taskArgs.opts.cwd;
	};

	self.cwdExists = function(taskArgs) {
		return fs.existsSync(taskArgs.opts.cwd);
	};

	self.checkCwd = function(taskArgs, spawnCommand) {
		if (self.hasCwd(taskArgs)) {
			grunt.log.ok("<grunt-spawn/>: Launching '{0}' starting in '{1}' overridden with cwd='{2}'".format(spawnCommand, process.cwd(), taskArgs.opts.cwd));
			if (!self.cwdExists(taskArgs)) {
				grunt.log.ok("<grunt-spawn/>: The directory '{0}' could not be found. Is your path relative to '{1}' or absolute?".format(taskArgs.opts.cwd, process.cwd()));
				self.fail();
			}
		} else {
			grunt.log.ok("<grunt-spawn/>: Launching '{0}' in current process working directory '{1}'".format(spawnCommand, process.cwd()));
		}
	};

	self.formatCmd = function(taskArgs) {
		var formattedCmd = taskArgs.cmd;
		var formattedArgs = S(_(taskArgs.args).toString()).replaceAll(",", " ");
		var spawnCommand = "{0} {1}".format(formattedCmd, formattedArgs);
		return spawnCommand;
	};

	self.execute = function(done) {
		grunt.log.debug(self.__type__ + "execute(done) ->");

		grunt.log.subhead("\n<grunt-spawn/>: Launching child process");
		var spawnCommand = self.formatCmd(taskArgs);
		self.checkCwd(taskArgs, spawnCommand);

		if (self.taskArgs.config && self.taskArgs.config.dontWait) {
			var command = self.taskArgs.cmd + " " + self.taskArgs.args.join(" ");
			childProcess.exec(command, taskArgs.opts);
			if (done != null) done(0);
		} else {
			var spawn = grunt.util.spawn(self.taskArgs, function() {});

			spawn.stdin && spawn.stdin.pipe(process.stdin);
			spawn.stdout && spawn.stdout.pipe(process.stdout);
			spawn.stderr && spawn.stderr.pipe(process.stderr);

			spawn.on("error", function() {
				if (done != null) done(1);
				self.fail();
			});

			spawn.on("exit", function(code) {
				spawn.stdin && spawn.stdin.unpipe(process.stdin);
				spawn.stdout && spawn.stdout.unpipe(process.stdout);
				spawn.stderr && spawn.stderr.unpipe(process.stderr);
				if (done != null) done(code);
				if (code !== 0) self.fail(done);
			});
		}

		grunt.log.debug(self.__type__ + "execute(result=void) <-");
	};
}

module.exports = Task;