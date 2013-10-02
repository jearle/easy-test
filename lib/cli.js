#!/usr/bin/env node

var program = require('commander');

require('./test')(program);

program.parse(process.argv);