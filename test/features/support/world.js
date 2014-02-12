var World, asserter, driver, path, protractor, ptor, webdriver;

asserter = require('assert');
path = require('path');
protractor = require('protractor');
webdriver = require('selenium-webdriver');

driver = new webdriver.Builder().usingServer('http://localhost:4444/wd/hub').withCapabilities(webdriver.Capabilities.chrome()).build();
driver.manage().timeouts().setScriptTimeout(100000);

ptor = protractor.wrapDriver(driver);

World = (function () {
    function World(callback) {
        // Pull reference to protractor into scope
        this.protractor = protractor;

        // We're going to put some very useful stuff in global scope
        // because it'll be super-helpful

        // Protractor-wrapped driver
        browser = ptor;
        // Protractor's locators
        By = protractor.By;
        assert = asserter;
        callback();
    }

    return World;

}());

module.exports.World = World;