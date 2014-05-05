var page = require('../page_objects/nav_bar');

module.exports = function() {
  Then(/^the user is presented with a visual indicator that shows that (\d+) changes are staged$/, function (numberOfStagedCreatives, callback) {
      expect(page.getStagedChangesText()).to.eventually
                                  .equal(numberOfStagedCreatives + ' Changes Ready To Publish')
                                  .then(function () { callback(); });
  });
};
