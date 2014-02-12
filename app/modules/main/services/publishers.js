angular
    .rlmodule('rl.cpi.main.services.publishers', ['ngResource', 'rl.cpi.main.config'])
    .factory('Publishers', function ($resource, Config) {
        return $resource(Config.gatewayBaseUrl + '/campaigns/:campaignId/web_publisher_campaigns');
    });