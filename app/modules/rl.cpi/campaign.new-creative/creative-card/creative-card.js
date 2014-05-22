angular
  .rlmodule('rl.cpi.campaignNewCreative')
  .controller('rlCreativeCardCtrl', function ($scope, PublisherTextCreativeRules, _) {
    var stopSyncing = angular.noop;
    $scope.singleDescLine = false; // Default to 2 desc lines
    $scope.isMaster = !$scope.linkedTo;
    $scope.isEnabled = true;

    function combineDescriptiveLines(creative) {
      var descLine2 = creative.descriptiveLines.splice(1, 1)[0];
      if (descLine2.length > 0) {
        creative.descriptiveLines[0] += ' ' + descLine2;
      }
    }

    function synchronize(value) {
      $scope.creative = angular.copy(value);
      // For single-desc-lines, concat line 2 to line 1 (and delete line 2)
      if ($scope.singleDescLine) {
        combineDescriptiveLines($scope.creative);
      }

      // If the master has an ad group selected, match correct ad group for this publisher and set it
      if (!!value.adGroup) {
        var publisherAdGroups = $scope.publisher.adGroups;
        var masterAdGroupName = value.adGroup.name;
        $scope.creative.adGroup = _.findWhere(publisherAdGroups, {name: masterAdGroupName});
        var noAdGroupDefined = ($scope.creative.adGroup === undefined);
        if (noAdGroupDefined) {
          $scope.unlink();
        }
      }
    }

    $scope.link = function link() {
      $scope.isLinked = true;
      stopSyncing = $scope.$watch('linkedTo', synchronize, true);
    };

    $scope.unlink = function unlink() {
      stopSyncing();
      $scope.isLinked = false;
    };

    $scope.enable = function enable() {
      $scope.isEnabled = true;
      $scope.link();
    };

    function clear() { return ''; }

    $scope.disable = function disable() {
      $scope.isEnabled = false;
      $scope.unlink();
      $scope.creative.headLines = _.map($scope.creative.headLines, clear);
      $scope.creative.descriptiveLines = _.map($scope.creative.descriptiveLines, clear);
      $scope.creative.adGroup = undefined;
    };

    $scope.creative = $scope.ngModel;

    if ($scope.linkedTo) {
      $scope.link();
    }

    var ruleSet = PublisherTextCreativeRules.allByCampaignId($scope.campaign.currentCampaignId);
    if (!$scope.isMaster) {
      $scope.rules = ruleSet.forPublisherId($scope.publisher.publisherId);
      $scope.singleDescLine = ($scope.rules.descriptiveLines.length === 1);
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
        scope.$negative = scope.$remainder < 0;
      });
    };

    return directive;
  });


