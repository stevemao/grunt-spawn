require("../../tasks/lib/include");
var fs = require("fs");

var Wildcard = require("../../tasks/lib/wildcard");
var FileBuilder = require("../../tasks/lib/filebuilder");

describe("Given Wildcard()", function(){

	describe("When #matches('anyValue', 'anyValue')", function(){

		var wildcard = new Wildcard();

		it("Then should match correctly", function(){

			var result = wildcard.matches("anyValue", "anyValue");
			assert(result == true, "Failed to match identicle values");

		});

	});

	describe("When #matches('anyValue', ['anyValue'])", function(){

		var wildcard = new Wildcard();

		it("Then should match correclty", function(){

			var result = wildcard.matches("anyValue", ["anyValue"]);
			assert(_(result).isArray() == true, "An array in should be an array out");
			assert(result.length == 1, "Should have matched identicle values");

		});

	});
	
	describe("When #matches('any*', ['anyValue1', 'anyValue2', 'anyValue3'])", function(){

		var wildcard = new Wildcard();

		it("Then should match all three array elements", function(){

			var result = wildcard.matches("any*", ["anyValue1", "anyValue2", "anyValue3"]);
			assert(_(result).isArray() == true, "Should be an array");
			assert(result.length == 3, "Should have 3 results");

		});

	});
	
	describe("When #matches() with FileBuilder() #allDirectories()", function(){

		var wildcard = new Wildcard();
		var fileBuilder = new FileBuilder().setDirectory(".");
		var allFiles = fileBuilder.allFiles();
		var testDirectory = "temp/";
		var testFile = "file.json";

		it("Then should find a nested file", function(){
			fs.mkdirSync(testDirectory);
			fs.writeFileSync(testDirectory + testFile, "");
			var pattern = "**/package.json";
			var result = wildcard.matches(pattern, allFiles);
			assert(result.length > 0, "Could not find any matches for '" + testFile + "'");
			fs.unlinkSync(testDirectory + testFile);
			fs.rmdirSync(testDirectory);
		});

	});

});