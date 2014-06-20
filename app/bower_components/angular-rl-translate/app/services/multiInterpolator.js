/**
 * This is a custom interpolator for use with the angular-translate module.
 * Normally, if you want to use Angular's interpolator (which support number/currency/date formats)
 * as well as use the MessageFormat interpolator (which supports plurals and such), you would be
 * forced to choose one or the other.
 *
 * You could select which one to use on a message-by-message basis, but what if you need to the
 * functionality of both at the same time?  Enter this multiinterpolator.
 *
 * All this thing does it pipe your translation through Angular's interpolator, then pipe the
 * resulting string through the MessageFormat interpolator.  Why does this work?  Because angular
 * uses double curlies and MessageFormat only uses single.
 *
 * Here's an example that uses both: "I have {{ NUM | filter:number }} { NUM, plural, one{thing} other{things} }"
 * Angular's interpolator parses anything wrapped in double curlies: {{ }}
 * Next, MessageFormat's interpolator parses anything wrapped in single curlies: { }
 *
 * That's it.
 */
angular.module('rl.l10n.services.MultiInterpolator', ['pascalprecht.translate'])
  .factory('MultiInterpolator', function ($interpolate, $translateMessageFormatInterpolation) {
    var $locale;
    return {
      setLocale: function (locale) {
        $locale = locale;
      },

      getInterpolationIdentifier: function () {
        return 'multiinterpolator';
      },

      interpolate: function (stringIn, interpolateParams) {
        var stringOut = $interpolate(stringIn)(interpolateParams);
        stringOut = $translateMessageFormatInterpolation.interpolate(stringOut, interpolateParams);
        return stringOut;
      }
    };
  });
