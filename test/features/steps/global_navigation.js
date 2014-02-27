/*global module,browser,assert,By */
module.exports = function() {
    this.World = require('../support/world.js').World;

   // var assertIsEqualByBinding = function(table_value, binding_value) {
   //   browser.findElement(By.binding(binding_value)).getText().then(function(text) {
   //     assert.equal(table_value, text);
   //   });
   // };

    this.Given(/^campaign with id "([^"]*)" exists$/, function(campaign_id, callback) {
      callback();
    });

    this.Given('a typical campaign exists', function(callback) {
      callback();
    });

    this.When(/^a user views the campaign id "([^"]*)" dashboard$/, function(campaign_id, callback) {
      browser.get('http://localhost:4000/#campaign/' + campaign_id);
      callback();
    });

    this.Then(/^the user should see a campaign header:$/, function(table, callback) {
      var hash = table.hashes()[0];

      assert.equal(browser.isElementPresent(By.xpath('//rl-campaign-header//*[contains(text(),"' + hash["Advertiser Name"] + '")]')), true, "Advertiser Name is not present");
      assert.equal(browser.isElementPresent(By.xpath('//rl-campaign-header//*[contains(text(),"' + hash["Campaign Name"] + '")]')), true, "Campaign Name is not present");
      assert.callback(callback);
     // browser.findElement(By.binding('overview.advertiserName')).getText().then(function(text) {
     //   assert.equal(hash['Advertiser Name'], text);
     //   callback();
     // });

     // browser.findElement(By.binding('overview.advertiserName')).getText().then(function(text) {
     //   assert.equal(hash['Advertiser Name'], text);
     // });
     // assertIsEqualByBinding(hash["Advertiser Name"], "overview.advertiserName").then(function() {
     //   callback();
     // });

    });


      // _.forEach(table.hashes(), function(hash) {
      // });

     // browser.findElement(By.binding('overview.name')).getText().then(function(value) {
     //   //console.log(table.hashes());
     //   assert.equal(table.rows()['
     //   assert.equal(table.rows["Campaign Name"], value);
     // });

   // this.Then(/^the user should see a campaign header$/, function(callback) {
   //   browser.isElementPresent(By.className('campaign-info')).then(function(present) {
   //     assert.equal(present, true, 'Element campaign-info was not found');
   //     callback();
   //   });
   // });

};
