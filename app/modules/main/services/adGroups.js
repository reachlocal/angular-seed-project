angular
    .rlmodule('rl.cpi.main.services.adGroups', ['ngResource'])
    .factory('AdGroups', function ($resource) {
        return $resource('/campaigns/:campaignId/adGroups');
    });