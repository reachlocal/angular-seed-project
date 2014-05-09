(function(window) {

// Airbrake shim that stores exceptions until Airbrake notifier is loaded.
window.Airbrake = [];

// Wraps passed function and returns new function that catches and
// reports unhandled exceptions.
Airbrake.wrap = function(fn) {
  var airbrakeWrapper = function() {
    try {
      return fn.apply(this, arguments);
    } catch (exc) {
      args = Array.prototype.slice.call(arguments);
      Airbrake.push({error: exc, params: {arguments: args}});
    }
  };
  if (fn.guid) {
    airbrakeWrapper.guid = fn.guid;
  }
  return airbrakeWrapper;
};

// Registers console reporter when notifier is ready.
Airbrake.onload = function(client) {
  //Airbrake.addReporter(Airbrake.consoleReporter);
  client.setEnvironmentName(location.hostname);
};

// Reports unhandled exceptions.
window.onerror = function(message, file, line, column, error) {
  if (error) {
    Airbrake.push({error: error});
  } else {
    Airbrake.push({error: {
      message: message,
      fileName: file,
      lineNumber: line,
      columnNumber: column || 0
    }});
  }
};

var loadAirbrakeNotifier = function() {
  var script = document.createElement('script'),
      sibling = document.getElementsByTagName('script')[0];
  script.src = 'https://ssljscdn.airbrake.io/0.3/airbrake.min.js';
  script.async = true;
  sibling.parentNode.insertBefore(script, sibling);
};

// Asynchronously loads Airbrake notifier.
if (window.addEventListener) {
  window.addEventListener('load', loadAirbrakeNotifier, false);
} else {
  window.attachEvent('onload', loadAirbrakeNotifier);
}

})(window);
