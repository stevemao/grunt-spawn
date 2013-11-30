var g = require("../include");

function MarkdownPath(relativePath, opts) {

	g.assert(relativePath, "Please make sure you supply a relative path");

	var self = this;
	self.scanPattern = /.*/;
	self.relativePath = relativePath;
	self.rootPath = opts && opts.cwd ? opts.cwd : process.cwd();

	self.normalize = function(leftPath, rightPath) {
		var joinedPath = g.path.join(leftPath, rightPath);
		return g.path.normalize(joinedPath);
	};

	self.relativePath = function() {
		return relativePath.replace(self.rootPath, "");
	};

	self.getFullPath = function() {
		return self.normalize(self.rootPath, relativePath);
	};

	self.getFullDirectoryPath = function() {
		var normalizedPath = self.getFullPath();
		var basename = g.path.basename(normalizedPath);
		var directoryPath = normalizedPath.replace(basename, "");
		return directoryPath;
	};

	self.endsWith = function(ext) {
		return g.S(relativePath).endsWith(ext);
	}

	self.findAllFiles = function(ext) {
		var results = [];
		g.fstools.walkSync(
			self.getFullPath(),
			self.scanPattern,
			function(fileSystemItem) {
				var path = new MarkdownPath(fileSystemItem);
				if (path.endsWith(ext)) {
					var directory = path.relativePath();
					results.push(directory);
				}
			});
		return g._.unique(results);
	};
}

module.exports = MarkdownPath;