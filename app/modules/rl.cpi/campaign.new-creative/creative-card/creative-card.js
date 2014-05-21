angular
  .rlmodule('rl.cpi.campaignNewCreative')
  .controller('rlCreativeCardCtrl', function ($scope, PublisherTextCreativeRules) {
    var stopSyncing = angular.noop;
    $scope.singleDescLine = false; // Default to 2 desc lines

    function combineDescriptiveLines(creative) {
      var descLine2 = creative.descriptiveLines.splice(1, 1)[0];
      if (descLine2.length > 0) {
        creative.descriptiveLines[0] += " " + descLine2;
      }
    }

    function stripWhitespace(creative) {
      var crRegex = /[\n\r]/g;
      var doublespaceRegex = /\s{2,}/g;
      if (creative && creative.hasOwnProperty('descriptiveLines')) {
        for (var i = 0; i < creative.descriptiveLines.length; i++) {
          creative.descriptiveLines[i] = creative.descriptiveLines[i].replace(crRegex, ' ');
          creative.descriptiveLines[i] = creative.descriptiveLines[i].replace(doublespaceRegex, ' ');
        }
      }
      if (creative && creative.hasOwnProperty('headLines')) {
        for (var i = 0; i < creative.headLines.length; i++) {
          creative.headLines[i] = creative.headLines[i].replace(crRegex, ' ');
          creative.headLines[i] = creative.headLines[i].replace(doublespaceRegex, ' ');
        }
      }
    }

    function synchronize(value) {
      $scope.creative = angular.copy(value);
      // For single-desc-lines, concat line 2 to line 1 (and delete line 2)
      if ($scope.singleDescLine) {
        combineDescriptiveLines($scope.creative);
      }
    }

    $scope.link = function link() {
      $scope.isLinked = true;
      stopSyncing = $scope.$watch('linkedTo', synchronize, true);
    };

    $scope.$watch('creative', function () {
      stripWhitespace($scope.creative);
    }, true);

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
        scope.$negative = scope.remainder < 0;
      });
    };

    return directive;
  });


