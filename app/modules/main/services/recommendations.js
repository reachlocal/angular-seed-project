angular
    .rlmodule('rl.cpi.main.services.Recommendations', ['ngResource', 'rl.cpi.main.Config'])
    .factory('Recommendations', function($resource, Config) {
        return $resource(Config.gatewayBaseUrl + '/campaigns/:campaignId/recommendations');
    });
