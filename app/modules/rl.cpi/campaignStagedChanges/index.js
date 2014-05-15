angular.rlmodule('rl.cpi.campaignStagedChanges', [
  'rl.cpi.main.directives',
  'rl.cpi.main.services.Creatives',
  'ui.router'
])
.config(function ($stateProvider) {
  $stateProvider.state('cpi.campaignStagedChanges', {
      url: '/staged-changes',
      views: {
        'content': {
          templateUrl: 'modules/rl.cpi/campaignStagedChanges/index.html',
          controller: 'StagedChangesCtrl',
          resolve: {
            creatives: function (Creatives, $stateParams) {
              var creatives = Creatives.query($stateParams);
              return creatives.$promise;
            }
          },
        },
      }
  });
});

