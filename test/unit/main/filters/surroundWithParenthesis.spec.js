describe('Surround with parenthesis filter', function() {
  
  var filter;
  beforeEach(function() {
    module('rl.cpi.main.filters.SurroundWithParenthesis');
    inject(function($filter) {
      filter = $filter('surroundWithParenthesis');
    });
  });

  it('surround text with parenthesis', function() {
    expect(filter('text')).toBe('(text)');
  });

  it('ignores blanks and undefined', function() {
    expect(filter('')).toBe('');
    expect(filter(undefined)).toBe(undefined);
    expect(filter(null)).toBe(null);
  });

});
