require("./include");

function TaskArgs(cmd, args, opts) {
	var self = this;
	self.cmd = cmd;
	self.args = args;
	self.opts = opts;
	self.__type__ = "<grunt-spawn/>::tasks::lib::TaskArgs::";
}

module.exports = TaskArgs;