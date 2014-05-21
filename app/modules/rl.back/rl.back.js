angular.module('rl.back', []).directive('rlBack', function () {
  var directive = { restrict: 'A' };

  directive.link = function (scope, element) {
    element.bind('click', function goBack () {
      scope.$apply(function () { history.back(); });
    });
  };

  return directive;
});
