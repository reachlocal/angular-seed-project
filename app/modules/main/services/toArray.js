/**
 * Take supplied input and give back an array no matter what!
 */
angular
    .rlmodule('rl.cpi.main.services.toArray', ['underscore'])
    .factory('toArray', function(_) {
        return function(arrayIn) {
            if (angular.isArray(arrayIn)) {
                return arrayIn;
            }
            var array = []; // Default to blank array
            try {
                // If there's an array in the form of a string, parse it and use that
                var possibleArray = JSON.parse(arrayIn);
                if (angular.isArray(possibleArray)) {
                    array = possibleArray;
                } else {
                    array = [possibleArray.toString()];
                }
            } catch (ignored) {
                // Let's just split on ','
                if (angular.isString(arrayIn)) {
                    array = arrayIn.split(',');
                }
            }
            return _.without(array, '');
        };
    });