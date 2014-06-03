angular
  .rlmodule('rl.cpi.campaignNewCreative.rlCreativeCard', [
    'rl.cpi.main.services.Creatives',
    'rl.cpi.main.services.PublisherTextCreativeRules',
    'rl.cpi.directives.rlTrimspaces',
    'underscore'])
  .controller('rlCreativeCardCtrl', function ($scope, $stateParams, PublisherTextCreativeRules, _, Creatives) {
    var stopSyncing = angular.noop;
    $scope.singleDescLine = false; // Default to 2 desc lines
    $scope.isMaster = !$scope.linkedTo;
    if ($scope.isMaster) {
      $scope.creative = $scope.ngModel;
    } else {
      $scope.creative = new Creatives();
      $scope.creative.webPublisherCampaignId = $scope.publisher.id;
    }

    $scope.isEnabled = initializeEnabledState();
    $scope.isSaved = false;

    function initializeEnabledState() {
      if (!$stateParams.publisher || $scope.isMaster) return true;
      return ($stateParams.publisher === $scope.publisher.name);
    }

    function combineDescriptiveLines(creative) {
      var descLine2 = creative.descriptiveLines.splice(1, 1)[0];
      if (descLine2.length > 0) {
        creative.descriptiveLines[0] += ' ' + descLine2;
      }
    }

    function synchronize(value) {
      $scope.creative.headLines = angular.copy(value.headLines);
      $scope.creative.descriptiveLines = angular.copy(value.descriptiveLines);
      $scope.creative.adGroup = angular.copy(value.adGroup);
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
      if (!$scope.isSaved) {
        $scope.isEnabled = true;
        $scope.link();
      }
    };

    function clear() { return ''; }

    $scope.disable = function disable() {
      $scope.isEnabled = false;
      $scope.unlink();
      $scope.creative.headLines = _.map($scope.creative.headLines, clear);
      $scope.creative.descriptiveLines = _.map($scope.creative.descriptiveLines, clear);
      $scope.creative.adGroup = undefined;
    };

    if ($scope.linkedTo) {
      $scope.link();
    }

    var ruleSet = PublisherTextCreativeRules.allByCampaignId($scope.campaign.currentCampaignId);
    if (!$scope.isMaster) {
      $scope.rules = ruleSet.forPublisherId($scope.publisher.publisherId);
      $scope.singleDescLine = ($scope.rules.descriptiveLines.length === 1);
    }

    // Save the creative (if it hasn't already been saved) and return a promise
    function save() {
      if (!$scope.isSaved && $scope.isEnabled) {
        return $scope.creative.$create({ campaignId: $scope.campaign.currentCampaignId }).then(function () {
          $scope.isSaved = true;
          $scope.isEnabled = false;
        });
      }
    }
    if (angular.isFunction($scope.registerSaveAction)) {
      $scope.registerSaveAction(save);
    }
  })

  .directive('rlCreativeCard', function () {
    return {
      templateUrl: 'modules/rl.cpi/campaign.new-creative/creative-card/creative-card.html',
      scope: {
        publisher: '=',
        ngModel: '=',
        linkedTo: '=',
        campaign: '=',
        registerSaveAction: '='
      },
      restrict: 'E',
      replace: true,
      controller: 'rlCreativeCardCtrl'
    };
  })

  .directive('rlRemainingChars', function($compile) {
    var template = '<span class="rl-xcounter" for-input="{{ $forInput }}" ng-model="ngModel" ng-hide="noRules" ng-class="{ negative: $negative }">{{ $remainder }}</span>';
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
      scope.$forInput = attributes.ngModel;

      scope.$watch('ngModel', function (value) {
        scope.$remainder = parseInt(attributes.rlRemainingChars) - (value ? value.length : 0);
        scope.$negative = scope.$remainder < 0;
      });
    };

    return directive;
  });


