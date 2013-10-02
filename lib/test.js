var path = require('path');
var fs = require('fs');

var swig = require('swig');
var colors = require('colors');
var mkdirp = require('mkdirp');
var S = require('string');

var testPath = path.join(process.cwd(), 'test');
var testTemplate = path.join(__dirname, '..', 'templates/test.swig');

function fileExistsError (path) {
	return (
		'\n' + 
		'The file:\n' + path +  '\n' +
		'already exists.\n' +
		'Choose a different name for your test, or delete the current one.' 
	);
}

function renderTest (ctx) {
	return swig.renderFile(testTemplate, ctx);
}

function lowerCaseFirstLetter (s) {
	return s[0].toLowerCase() + s.substr(1);
}

module.exports = function (program) {

	program
		.command('test [name]')
		.description('creates a test suite')
		.action(function (name) {
			if (!name)
				return console.error('You must provide a name for your test suite.'.red);

			var testFileName = S(lowerCaseFirstLetter(name)).dasherize().s + '.js';
			var testFilePath = path.join(testPath, testFileName);
			var creatingMessage = "Creating " + testFilePath;
			
			console.log(creatingMessage.green);

			mkdirp.sync(testPath);

			if (fs.existsSync(testFilePath))
				return console.error(fileExistsError(testFilePath).red);

			var renderedTemplate = renderTest({
				suiteName: name
			});
			
			var err = fs.writeFileSync(testFilePath, renderedTemplate);

			var err;
			if (err)
				return console.error(('There is an error write your file: ' + testFilePath + ' ' + err));
		});

};