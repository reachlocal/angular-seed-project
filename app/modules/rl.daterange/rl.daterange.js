angular.module('rl.daterange', [])

.directive('rlDateRange', function () {
  var directive = {
    restrict   : 'E',
    replace    : true,
    controller : 'rlDateRangeCtrl',
    scope      : {
      model    : '=ngModel',
      options  : '='
    }
  };

  directive.template = '\
  <fieldset class="rl-daterange">\
    <input type="checkbox" id="{{ id }}">\
    <label for="{{ id }}">\
      <span>{{ model.from | date: options.dateFormat }}</span><span>{{ model.to | date: options.dateFormat }}</span>\
    </label>\
    <ul>\
      <li ng:repeat="range in options.ranges track by $index">\
        <input id="{{ id }}-predef.{{ $index }}" type="radio" ng:model="$parent.range" ng:value="range.value">\
        <label for="{{ id }}-predef.{{ $index }}" translate>{{ range.label }}</label>\
      </li>\
      <li>\
        <input id="{{ custom }}-{{ id }}" type="radio" ng:model="range" value="{{ custom }}">\
        <label for="{{ custom }}-{{ id }}" translate>{{ options.customLabel }}</label>\
        <input type="date" ng:change="range=custom" ng:model="model.from" max="{{ model.to }}">\
        <input type="date" ng:change="range=custom" ng:model="model.to" min="{{ model.from }}" max="{{ options.maxToDate }}">\
      </li>\
    </ul>\
  </fieldset>';

  return directive;
})

.controller('rlDateRangeCtrl', function ($window, $scope) {
  var defaultOptions = {
    customLabel: 'Custom',
    ranges: [],
    dateFormat: 'MMM, dd yyyy'
  };

  $scope.id = 'daterange-' + $window.Date.now();
  $scope.custom = '-custom-';
  $scope.options = angular.extend(defaultOptions, $scope.options);

  function setModel (value) {
    if (!value) return;
    if (!isCustom(value)) {
      $scope.model.from = value.from;
      $scope.model.to = value.to;
    }
  }

  function isCustom (value) {
    return value === $scope.custom;
  }

  $scope.$watch('range', setModel, true);
  $scope.range = $scope.custom;
  setModel($scope.options.value);
});
