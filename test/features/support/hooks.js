/*global browser:true,by:true*/
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
        global.driver = driver;
        global.protractor = protractor;
        global.browser = browser;
        global.$ = browser.$;
        global.$$ = browser.$$;
        global.element = element = browser.element;
        global.by = global.By = by = protractor.By;

        callback();
    });

    // Close the browser
    this.After(function(callback) {
        browser.quit()
            .then(callback);
    });
};