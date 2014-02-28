angular
    .rlmodule('rl.cpi.main.services.Creatives', ['ngResource', 'rl.cpi.main.Config'])
    .factory('Creatives', function($resource, Config) {
        return $resource(Config.gatewayBaseUrl + '/campaigns/:campaignId/ad_groups/1/text_creatives');
    });