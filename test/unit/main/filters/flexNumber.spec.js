describe('flexNumber filter', function () {
  var filter;
  beforeEach(function () {
    module('rl.cpi.main.filters.FlexNumber');
    inject(function ($filter) {
      filter = $filter('flexnumber');
    });
  });

  it('should output currency', function () {
    expect(filter(100, "currency")).toBe('$100.00');
  });
  it('should output integers', function () {
    var format = 'integer';
    expect(filter(100, format)).toBe('100');
    expect(filter(100.1, format)).toBe('100');
    expect(filter(0.1, format)).toBe('0');
    expect(filter(0.5, format)).toBe('1');
  });
  it('should output decimals', function () {
    var format = 'decimal';
    expect(filter(100, format)).toBe('100.00');
    expect(filter(100.1, format)).toBe('100.10');
    expect(filter(0.1, format)).toBe('0.10');
    expect(filter(0.5, format)).toBe('0.50');
  });
  it('should output percents', function () {
    var format = 'percent';
    expect(filter(1, format)).toBe('100.00%');
    expect(filter(1.001, format)).toBe('100.10%');
    expect(filter(0.001, format)).toBe('0.10%');
    expect(filter(0.005, format)).toBe('0.50%');
  });

  it('should not modify input without a valid output format specified', function () {
    expect(filter(12.3, 'invalid')).toBe(12.3);
  });
  it('should accept numbers as strings for input', function () {
    var format = 'integer';
    expect(filter('100', format)).toBe('100');
  });

  it('should set blanks to "N/A"', function () {
    var format = 'currency';
    var exp = 'N/A';
    expect(filter('', format)).toBe(exp);
    expect(filter(undefined, format)).toBe(exp);
    expect(filter(null, format)).toBe(exp);
  });
});
