angular.module('rl.dateRange', [])
.directive('rlDateRange', function () {
  var directive = {
    restrict : 'E',
    replace  : true,
    scope    : {
      model  : '=ngModel',
      options: '='
    }
  };

  directive.template = '\
  <fieldset class="rl-daterange">\
    <input type="checkbox" id="{{ id }}">\
    <label for="{{ id }}">{{ model.from | date: options.dateFormat }} - {{ model.to | date: options.dateFormat }}</label>\
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

  directive.controller = function ($window, $scope) {
    var defaultOptions = {
      customLabel: 'Custom',
      ranges: [],
      dateFormat: 'MMM, dd yyyy'
    };

    function setModel (value) {
      if (!value) return;
      $scope.model =  isCustom(value)? $scope.model : { from: value.from, to: value.to };
    }

    function isCustom (value) {
      return value === $scope.custom;
    }

    $scope.id = 'daterange-' + $window.Date.now();
    $scope.custom = '-custom-';
    $scope.options = angular.extend(defaultOptions, $scope.options);

    $scope.$watch('range', setModel, true);
    $scope.range = $scope.custom;
    setModel($scope.options.value);
  };

  return directive;
});
