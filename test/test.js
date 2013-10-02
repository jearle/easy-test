var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

describe('test', function () {
	
	afterEach(function () {
		var fakeTestPath = path.join(__dirname, './fake-test.js')
		if (fs.existsSync(fakeTestPath))
			fs.unlinkSync(fakeTestPath);
	});

	it('should be sane', function () {
		expect(1).to.equal(1);
	});

	it('should create a test file', function (done) {
		exec('./lib/cli.js test FakeTest', function (err, stdout, stderr) {
			if (err) throw err;
			stdout.match(/\/easy-test\/test\/fake-test.js/).should.be.ok;
			stderr.should.not.be.ok;
			done();
		});
	});

	it('should have match FakeTest', function (done) {
		exec('./lib/cli.js test FakeTest', function (err, stdout, stderr) {
			if (err) throw err;
			var file = fs.readFileSync(path.join(__dirname, 'fake-test.js')).toString();
			file.match(/FakeTest/).should.be.ok;
			stderr.should.not.be.ok;
			done();
		});
	});
});