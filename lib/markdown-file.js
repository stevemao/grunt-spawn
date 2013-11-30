var g = require("../include");

function MarkdownFile(relativePath, opts){

	var MarkdownPath = require("./markdown-path");

	g.assert(relativePath, "Please make sure you supply a relative path");
	
	var self = this;
	self.path = new MarkdownPath(relativePath);
	self.converter = new g.showdown.converter();

	self.write = function(content){
		var fullPath = self.path.getFullPath();
		g.fs.writeFileSync(fullPath, content);
	};

	self.parse = function(){
		var fullPath = self.path.getFullPath();
		var mdContent = g.fs.readFileSync(fullPath).toString();
		var htmlContent = self.converter.makeHtml(mdContent);
		return {
			fullPath: fullPath,
			relativePath: relativePath,
			markdown: mdContent,
			html: htmlContent
		};
	};
}

module.exports = MarkdownFile;