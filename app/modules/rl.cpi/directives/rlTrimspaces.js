/**
 * Attach this to an element to trim consecutive white-spaces
 * and turn carriage returns into spaces.
 * EX:  <textarea rl-trimspaces>Foo   !</textarea> (becomes "Foo !")
 * EX:  <input rl-trimspaces value="Foo   !"> (becomes "Foo !")
 */
angular.rlmodule('rl.cpi.directives.rlTrimspaces', [])
  .directive('rlTrimspaces', function () {
    var directive = {
      restrict: 'A',
      link: function (scope, element, attrs) {

        function stripWhitespace(value) {
          var crRegex = /[\n\r]/g;
          var doublespaceRegex = /\s{2,}/g;

          var trimmed = value.replace(crRegex, ' ');
          trimmed = trimmed.replace(doublespaceRegex, ' ');
          return trimmed;
        }

        scope.$watch(attrs.ngModel, function (value) {
          if (angular.isString(value)) {
            element[0].value = stripWhitespace(value);
          }
        });

      }
    };

    return directive;
  });