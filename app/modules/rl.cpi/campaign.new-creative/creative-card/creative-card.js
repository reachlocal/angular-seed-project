angular
  .rlmodule('rl.cpi.campaignNewCreative')
  .controller('rlCreativeCardCtrl', function ($scope, PublisherTextCreativeRules) {
   var stopSyncing = angular.noop;

    function synchronize(value) {
      $scope.creative = angular.copy(value);
    }

    $scope.link = function link() {
      $scope.isLinked = true;
      stopSyncing = $scope.$watch('linkedTo', synchronize, true);
    };

    $scope.unlink = function unlink() {
      stopSyncing();
      $scope.isLinked = false;
    };

    $scope.creative = $scope.ngModel;

    if ($scope.linkedTo) {
      $scope.link();
    }

    var ruleSet = PublisherTextCreativeRules.allByCampaignId($scope.campaign.currentCampaignId);
    if ($scope.publisher) {
      $scope.rules = ruleSet.forPublisherId($scope.publisher.publisherId);
    }
  })

  .directive('rlCreativeCard', function () {
    return {
      templateUrl: 'modules/rl.cpi/campaign.new-creative/creative-card/creative-card.html',
      scope: {
        publisher: '=',
        ngModel: '=',
        linkedTo: '=',
        campaign: '='
      },
      restrict: 'E',
      replace: true,
      controller: 'rlCreativeCardCtrl'
    };
  })

  .directive('rlRemainingChars', function($compile) {
    var template = '<span class="rl-xcounter" ng-model="ngModel" ng-hide="noRules" ng-class="{ negative: $negative }">{{ $remainder }}</span>';
    var directive = {
      restrict: 'A',
      scope: {
        'ngModel': '='
      }
    };

    directive.compile = function (element) {
      return directive.link;
    };

    directive.link = function (scope, element, attributes) {
      element.after(angular.element($compile(template)(scope)));
      scope.noRules = !attributes.rlRemainingChars;
      scope.$watch('ngModel', function (value) {
        scope.$remainder = parseInt(attributes.rlRemainingChars) - (value ? value.length : 0);
        scope.$negative = scope.remainder < 0;
      });
    };

    return directive;
  });


