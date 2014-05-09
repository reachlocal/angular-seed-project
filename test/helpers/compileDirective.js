/**
 * Given a string of HTML, compile it (and any directives it contains).
 * If you provide a hash of scopeData, it will be injected into the scope.
 **/
function compileDirective(html, scopeData) {
  var directiveHtml = html;
  var scopeD = scopeData;
  var directive = {};
  inject(function ($rootScope, $compile) {
    directive.scope = $rootScope.$new();
    if (scopeD) {
      for (var key in scopeD) {
        directive.scope[key] = scopeD[key];
      }
    }
    directive.element = $compile(directiveHtml)(directive.scope);
    directive.scope.$digest();
  });
  return directive;
}
