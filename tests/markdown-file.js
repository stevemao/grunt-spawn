var g = require("../include");

describe("Given library/markdown-walker/MarkdownFile", function(){

	var test = {
		content: "#AnyContent",
		relativePath: "./tests/markdown-file-test.md"
	}

	var MarkdownFile = require("../lib/markdown-file");
	
	var file = new MarkdownFile(test.relativePath);
	file.write(test.content);

	describe("When #load(relativePath)", function(){

		var result = file.parse(test.relativePath);

		it("Then the result should have html", function(){
			g.assert(result.html == "<h1 id=\"anycontent\">AnyContent</h1>");
		});

		it("Then the result should have markdown", function(){
			g.assert(result.markdown == "#AnyContent");
		});

		it("Then the result should have the relative path", function(){
			g.assert(result.relativePath == file.path.relativePath());
		});

		it("Then the result should have the full path", function(){
			g.assert(result.fullPath == file.path.getFullPath());
		});

	});
	
});