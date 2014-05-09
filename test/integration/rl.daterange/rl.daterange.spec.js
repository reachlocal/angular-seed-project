describe('rl.daterange', function () {
  var directiveHtml = '<rl-date-range ng-model="model" options="options"></rl-date-range>';
  var options;
  var scope;


  beforeEach(module('rl.daterange'));
  beforeEach(inject(function setupVars(DateRangeOptions, Moment) {
    // Freeze time
    timekeeper.freeze(new Date('2000-01-15'));
    var now = Moment.build().utc();

    // Setup stuff to compile directive
    options = DateRangeOptions.build(now);
    scope = {
      options: options, // Default options
      model: {}
    };
  }));

  it('formats the pretty-version of the date correctly', function () {
    var directive = compileDirective(directiveHtml, scope);
    expect(directive.element['0'].outerHTML).toContain('Jan 15, 2000');
  });
  it('formats the pretty-version of the date using a custom format', function () {
    options.prettyFormat('shortDate');
    var directive = compileDirective(directiveHtml, scope);
    expect(directive.element['0'].outerHTML).toContain('1/15/00');
  });
});