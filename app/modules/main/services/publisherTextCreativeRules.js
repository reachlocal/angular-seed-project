angular
  .rlmodule('rl.cpi.main.services.PublisherTextCreativeRules', ['ngResource', 'underscore', 'rl.cpi.main.Config'])
  .factory('PublisherTextCreativeRules', function ($resource, Config, _) {
    function arrayToHash(array, key) {
      if (angular.isString(array)) {
        array = JSON.parse(array);
      }
      return _.object(_.map(array, function mapRow(row) {
        return [row[key], row];
      }));
    }

    var baseUrl = Config.gatewayBaseUrl + '/publisher-text-creative-rules';
    var defaultParams = {};
    var customMethods = {
      asHash: {
        method: 'GET',
        isArray: false,
        cache: true,
        transformResponse: function transform(data) {
          return arrayToHash(data, 'publisherId');
        }
      }
    };

    var resource = $resource(
      baseUrl,
      defaultParams,
      customMethods
    );

    return resource;
  });