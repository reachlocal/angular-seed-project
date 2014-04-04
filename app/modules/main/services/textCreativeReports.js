angular
    .rlmodule('rl.cpi.main.services.TextCreativeReports', ['ngResource', 'rl.cpi.main.Config'])
    .factory('TextCreativeReports', function($resource, Config) {
        return $resource(Config.gatewayBaseUrl + '/campaigns/:campaignId/text-creative-reports');
    });
