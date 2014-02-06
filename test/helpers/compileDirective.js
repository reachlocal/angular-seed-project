/**
 * Given a string of HTML, compile it (and any directives it contains).
 *
 **/
function compileDirective(html) {
    var directiveHtml = html;
    var directive = {};
    inject(function ($rootScope, $compile) {
        directive.scope = $rootScope.$new();
        directive.element = $compile(directiveHtml)(directive.scope);
        directive.scope.$digest();
    });
    return directive;
}