#Easy Test

A command line tool for generating mocha test scaffolds with chai.

##Install

```
npm install easy-test
```

##Usage

There is currently only one command and it creates a test scaffold within the test directory of your project

###Example

```
node_modules/.bin/ezt test MyTest
```

The above command will create

```
|- test
||- my-test.js
```

The contents of my-test.js will be

```js
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();

describe('MyTest', function () {
	
	it('should be sane', function () {
		expect(1).to.equal(1);
	});

});
```