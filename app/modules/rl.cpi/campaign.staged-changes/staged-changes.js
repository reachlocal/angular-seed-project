angular.rlmodule('rl.cpi.campaignStagedChanges', [
  'ui.router',
  'rl.back',
  'rl.cpi.main.directives',
  'rl.cpi.main.services.Creatives',
  'rl.cpi.utils',
  'ui.router'
])
.config(function ($stateProvider) {
  $stateProvider.state('cpi.campaignStagedChanges', {
    url: '/staged-changes',
    data: { title: 'Staged Changes' },
    templateUrl: 'modules/rl.cpi/campaign.staged-changes/staged-changes.html',
    controller: 'StagedChangesCtrl',
    resolve: {
      creatives: function (Creatives, $stateParams) {
        return Creatives.query($stateParams);
      }
    }
  });
})
.controller('StagedChangesCtrl', function ($scope, creatives, PublishedTextCreativesService) {
  $scope.stagedTextCreatives = creatives.filter(function (creative) {
    return creative.isStaged();
  });

  $scope.remove = function(stagedCreative) {
    var creativeIndex = $scope.stagedTextCreatives.indexOf(stagedCreative);
    $scope.stagedTextCreatives.splice(creativeIndex, 1);

    var failure = function() {
      $scope.stagedTextCreatives.splice(creativeIndex, 0, stagedCreative);
    };

    stagedCreative.$remove().catch(failure);
  };

  $scope.publish = function() {
    var currentCampaignId = $scope.campaign.currentCampaignId;

    var stagedTextCreativesLinks = $scope.stagedTextCreatives.map(function(creative) {
      return creative.self;
    });

    PublishedTextCreativesService.publish(currentCampaignId, stagedTextCreativesLinks).then(function() {
       history.back();
    });
  };
});

angular.module('rl.cpi.campaignStagedChanges')
.service('PublishedTextCreativesService', function ($http, Config) {
  this.publish = function (campaignId, links) {
    return $http.post(Config.gatewayBaseUrl + '/campaigns/' + campaignId + '/published-text-creatives', { links: links });
  };
});