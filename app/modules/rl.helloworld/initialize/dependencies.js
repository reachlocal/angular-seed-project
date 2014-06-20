// These are passive dependencies - just include them and they start working :)
// Note:  You MUST include the templates dependency - this links your project to
// the compile angular templates when things get minified.
angular.rlmodule('rl.helloworld.initialize.Dependencies', ['rl.sso', 'templates']);
