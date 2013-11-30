var g = require("../include");

function MarkdownDirectory(relativePath) {

	var MarkdownPath = require("./markdown-path");
	var MarkdownFile = require("./markdown-file");

	g.assert(relativePath, "Please make sure you supply a relative path");

	var self = this;
	self.scanPattern = /.*/;
	self.path = new MarkdownPath(relativePath);

	var ensureDirectory = function(relativeFilePath) {
		var filePath = new MarkdownPath(relativeFilePath);
		var fullDirectoryPath = filePath.getFullDirectoryPath();
		g.fs.mkdir(fullDirectoryPath);
	};

	self.writeFile = function(relativeToDirectoryPath, content) {
		var relativeFilePath = self.path.normalize(relativePath, relativeToDirectoryPath);
		ensureDirectory(relativeFilePath);
		var markdownFile = new MarkdownFile(relativeFilePath);
		markdownFile.write(content);
		return markdownFile;
	};

	self.parse = function() {
		var results = [];
		var relativePathFiles = self.path.findAllFiles(".md");
		g._.each(relativePathFiles, function(relativePathFile) {
			var markdownFile = new MarkdownFile(relativePathFile);
			var parsedFile = markdownFile.parse();
			results.push(parsedFile);
		});
		return results;
	};
}

module.exports = MarkdownDirectory;