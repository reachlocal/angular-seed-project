describe('Authentication', function () {

    beforeEach(module('rl.auth'));

    // WIP
    xit('renders an iframe to the realm address', function () {
        var realm = 'https://authenticate.here';
        var directive = compileDirective('<body></body>', { realm: realm });
        var frame = directive.element.find('iframe');
        expect(frame.attr('src')).toEqual('https://authenticate.here');
    });

});