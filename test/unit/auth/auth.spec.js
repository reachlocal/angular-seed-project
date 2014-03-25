describe('rl.auth', function () {
    var authService;

    beforeEach(module('rl.auth'));

    beforeEach(module(function ($provide) {
        authService = jasmine.createSpyObj('authService', [ 'loginConfirmed' ]);
        $provide.value('authService', authService);
    }));

    beforeEach(inject(function ($rootScope, $compile) {
        this.rootScope = $rootScope;
        this.sandbox = document.createElement('iframe');
        document.body.appendChild(this.sandbox);
        this.element = angular.element(this.sandbox.contentDocument.body);
        this.scope = $rootScope.$new();
        $compile(this.element)(this.scope);
    }));

    afterEach(function () { document.body.removeChild(this.sandbox); });

    describe('when reacting to a "loginRequired" event', function () {

        beforeEach(function () {
            var responseBody = { realm: '/authenticate.here' };
            this.rootScope.$broadcast('event:auth-loginRequired', { data: responseBody });
        });

        it('adds the realm to the scope', function () {
            expect(this.scope.realm).toEqual('/authenticate.here');
        });

        it('adds the realm to the scope only once', function () {
            var responseBody = { realm: '/authenticate.here.again' };
            this.rootScope.$broadcast('event:auth-loginRequired', { data: responseBody });
            expect(this.scope.realm).toEqual('/authenticate.here');
        });

        it('renders the iframe with the realm location', function () {
            var frame = this.element.find('iframe').attr('src');
            expect(frame).toBeUndefined();

            this.scope.$digest();
            frame = this.element.find('iframe').attr('src');
            expect(frame).toEqual('/authenticate.here');
        });
    });

    describe('when receiving a token message', function () {
        beforeEach(function () {
            this.userData = { email: 'email@example.com' };
            var base64UserData = btoa(JSON.stringify(this.userData));
            this.token = 'jwtstuff.'+base64UserData+'.jwtsignature';
            window.postMessage({ type: 'token', value: this.token }, '*');
        });

        it('saves the token on the sessionStorage', function () {
            waitsFor(function () {
                return window.sessionStorage.getItem('token') === this.token;
            }, 'token to get saved in the session storage', 500);
        });

        it('hides the iframe', function () {
            this.scope.realm = '/authenticate.here';
            waitsFor(function () {
                this.scope.$digest();
                return !this.element.find('iframe').attr('src');
            }, 'the iframe to disappear', 500);
        });

        it('notifies the authService', function () {
            waitsFor(function () {
                var spy = authService.loginConfirmed;
                // OGM!
                return !!spy.callCount && (
                    spy.mostRecentCall.args &&
                    spy.mostRecentCall.args[0].email === this.userData.email);
            }, 'authService.loginConfirmed to be called with the user data', 500);
        });
    });
});
