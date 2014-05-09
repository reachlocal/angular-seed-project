require('shelljs/global');
var os = require('os');

exports.config = {
  baseUrl: 'http://' + os.hostname() + ':4000',
  seleniumAddress: 'http://thoughtrkssmini.rlcorp.local:4444/wd/hub',
  framework: 'cucumber',
  specs: [ '*.feature' ],
  capabilities: {
    browserName: process.env.browser || 'chrome'
  },
  cucumberOpts: {
    tags: process.env.tags,
    require: process.env.require
  }
};