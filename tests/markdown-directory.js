var g = require("../include");

describe("Given markdown-walker/MarkdownDirectory", function(){

	var test = {
		relativePath: "./tests/markdown-directory", 
		files: [{
			name: "test-markdown-1.md",
			content: "#AnyContent1"
		},{
			name: "test-markdown-2.md",
			content: "#AnyContent2"
		},{
			name: "test-markdown-3.md",
			content: "#AnyContent3"
		}]
	};

	var MarkdownDirectory = require("../lib/markdown-directory");
	var MarkdownFile = require("../lib/markdown-file");

	var directory = new MarkdownDirectory(test.relativePath);
	
	g._.each(test.files, function(file){
		directory.writeFile(file.name, file.content);
	});

	describe("When #load(relativePath)", function(){	

		var files = directory.parse();

		it("Then the result should have 3 Markdown files", function(){
			g.assert(files.length == 3);
		});

		it("Then the result should have the correct content", function(){
			var counter = 1;
			g._.each(files, function(file){
				g.assert(file.markdown == "#AnyContent{0}".format(counter));
				g.assert(file.html == "<h1 id=\"anycontent{0}\">AnyContent{0}</h1>".format(counter));
				g.assert(file.relativePath == "/markdown-directory/test-markdown-{0}.md".format(counter));
				g.assert(file.fullPath == new MarkdownFile(file.relativePath).path.getFullPath());
				counter++;
			})
		});

	});

});