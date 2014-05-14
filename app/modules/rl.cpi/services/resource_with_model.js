angular
  .rlmodule('rl.cpi.main.services.ResourceWithModel', [])
  .factory('ResourceWithModel', function () {
    function ResourceWithModel(resource, listModel, itemModel) {
      function wrap(method, model) {
        return function (opts) {
          if (model) {
            return resource[method](opts).$promise.then(model.build);
          }
          return resource[method](opts).$promise;
        };
      }

      /*
       * This wrapping should be enough for now, but at some point
       * we will have to consider supporting custom-declared
       * methods from angular's resource. This would involve
       * taking over the responsibilities of $resources to have
       * access to the custom action list.
       */
      return {
        query: wrap('query', listModel),
        get: wrap('get', itemModel),
        save: wrap('save', itemModel),
        remove: wrap('remove'),
        delete: wrap('delete'),
      };
    }

    return ResourceWithModel;
  });
