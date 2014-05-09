require('shelljs/global');

exports.config = {
  baseUrl: process.env.baseUrl || 'http://localhost:4000',
  seleniumServerJar: '../../' + ls('node_modules/protractor/selenium/*.jar')[0],
  framework: 'cucumber',
  specs: [ '*.feature' ],
  capabilities: {
    browserName: process.env.browser || 'chrome'
  },
  cucumberOpts: {
    tags: process.env.tags,
    require: process.env.require,
    format: process.env.format || 'pretty'
  }
};
