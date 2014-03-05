/*global module,browser,assert,By */
/**
 * Kill the browser after every scenario
 */
module.exports = function() {

    // Start a new browser
    this.Before(function(callback) {
        var protractor = require('protractor');
        var webdriver = require('selenium-webdriver');

        var driver = new webdriver
            .Builder()
            .usingServer('http://localhost:4444/wd/hub')
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
        driver.manage().timeouts().setScriptTimeout(100000);

        // Protractor-wrapped driver
        browser = protractor.wrapDriver(driver);

        // Protractor's locators
        By = protractor.By;

        callback();
    });

    // Close the browser
    this.After(function(callback) {
        browser.quit()
            .then(callback);
    });
};