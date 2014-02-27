var World, driver, ptor;

var path = require('path');
var protractor = require('protractor');
var webdriver = require('selenium-webdriver');
var rlasserter = require('./assert');

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

        /**
         * A method you can add to protractor's By object
         * Allow user to search by text
         * @param text      Text to search for.  Ex: "Advertiser Name:"
         *                  Note: xpaths don't have quote escaping.
         *                        Do not use double-quotes in your search string
         *                        (I know, it's lame.)
         * @param baseXpath Base Xpath to constrain search to. Ex: "//rlCampaignHeader"
         *                  Optional.  If not specified, search from "//"
         **/
        By.text = function(text, baseXpath) {
            if (!baseXpath) {
                baseXpath = '';
            }
            return By.xpath(baseXpath + '//*[contains(text(),"' + text + '")]');
        };

        assert = rlasserter;
        callback();
    }

    return World;

}());

module.exports.World = World;
