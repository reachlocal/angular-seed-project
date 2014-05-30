/*
 * Adapted to angular based on:
 * http://codepen.io/FWeinb/pen/xLakC
 * https://github.com/matthewp/position--sticky-
 *
 * Known issues:
 * - Does not deal with screen resizing and horizontal scroll.
 */
angular.module('rl.stick', [])

.directive('rlStick', ['$window', 'rl.stick.offset',
function stickIt ($window, getOffset) {
  var elements = [];

  var directive = {
    restrict: 'A',
    compile : prepare
  };

  function prepare ($element) {
    calculateStickySettingsFor($element);
    watchDOMUpdatesOn($element);
    elements.push($element);
  }

  function calculateStickySettingsFor ($element) {
    var parent        = $element.parent()[0];
    var element       = $element[0];
    var styles        = $window.getComputedStyle(element);
    var elementOffset = getOffset($element);

    styles._top = parseInt(styles.top, 10) || 0;
    var originalStyle = extract(styles);

    $element.$sticky = {
      originalStyle : originalStyle,
      stickyStyle   : originalStyle + 'position:fixed;z-index:999',
      placeholder   : placeholderFor($element),
      start         : elementOffset.top - styles._top,
      end           : (parent.offsetTop + parent.offsetHeight) -
                      (element.offsetHeight + styles._top)
    };
  }

  function extract (styles) {
    return 'position:' + styles.position + ';' +
           'width:'    + styles.width    + ';' +
           'height:'   + styles.height   + ';' +
           'top:'      + styles._top     + ';';
  }

  function placeholderFor ($element) {
    var element  = $element[0];
    var position = 'position:static;';
    var width    = 'width:'  + px(element.offsetWidth)  + ';';
    var height   = 'height:' + px(element.offsetHeight) + ';';
    return angular.element(
      '<div style="' + position + width + height +'"></div>'
    );
  }

  // When angular first loads content into $element's parent.
  function watchDOMUpdatesOn ($element) {
    var parent = $element.parent()[0];
    var observer = new MutationObserver(function () {
      calculateStickySettingsFor($element);
      observer.disconnect();
    });
    observer.observe(parent, { characterData: true, subtree: true });
  }

  function updatePosition ($element) {
    var doc = $window.document;
    var top = doc.documentElement.scrollTop || doc.body.scrollTop;
    var props = $element.$sticky;

    // Stick
    if (!props.stuck && top > props.start && top < props.end) {
      $element.attr('style', props.stickyStyle);
      $element.after(props.placeholder);
      return (props.stuck = true);
    }

    if (!props.stuck) return;

    // Unstick
    if (top < props.start) {
      $element.attr('style', props.originalStyle);
      props.placeholder.remove();
      return (props.stuck = false);
    }

    // Attach to parent's bottom
    if (top > props.end) {
      var offset = getOffset($element);
      $element.attr('style', props.stickyStyle)
        .css('top', px(offset.top))
        .css('left', px(offset.left))
        .css('position', 'absolute');
      return (props.stuck = false);
    }
  }

  function px (value) {
    return value + 'px';
  }

  // Faster than native Array.forEach
  function each (callback) {
    return function () {
      for (var i = elements.length; i--;) { callback(elements[i]); }
    };
  }

  angular.element($window)
    .bind('scroll', each(updatePosition));
    // TODO: .bind('resize', each(calculateStickySettingsFor));

  return directive;

}])

.factory('rl.stick.offset', function () {
  return function getOffset ($element) {
    var box = { top: 0, left: 0 };
    var element = $element[0];

    var doc = element && element.ownerDocument;
    if (!doc) return;

    var body = doc.body;
    var documentElem = doc.documentElement;

    if (angular.isDefined(element.getBoundingClientRect)) {
      box = element.getBoundingClientRect();
    }

    var clientTop  = documentElem.clientTop || body.clientTop || 0;
    var clientLeft = documentElem.clientLeft || body.clientLeft || 0;
    var scrollTop  = window.pageYOffset || documentElem.scrollTop;
    var scrollLeft = window.pageXOffset || documentElem.scrollLeft;

    return {
      top: box.top + scrollTop - clientTop,
      left: box.left + scrollLeft - clientLeft
    };
  };
});
