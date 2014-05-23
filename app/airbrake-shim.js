(function bootStrapAirbrake(window) {

  // Which environments should we *ignore*?
  // Partial hostnames are fine :)
  var ignoreHosts = [
    'localhost',
    'bamboo'
  ];

  // This will show up in our error reports
  var environment = location.hostname;

  var isAirbrakeEnabled = true;
  for (var i = 0; i < ignoreHosts.length; i++) {
    if (environment.search(ignoreHosts[i]) > -1) {
      isAirbrakeEnabled = false;
    }
  }

  // Airbrake shim that stores exceptions until Airbrake notifier is loaded.
  var Airbrake = [];
  window.Airbrake = Airbrake;

  // Registers the environment name
  Airbrake.onload = function (client) {
    client.setEnvironmentName(environment);
  };

  // Reports unhandled exceptions (everything else is wired up with angular's
  // Exception handler - see airbrake.js in the config dir
  window.onerror = function airbrakeGlobalExceptionHandler(message, file, line, column, error) {
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

  function loadAirbrakeNotifier() {
    var script = document.createElement('script'),
      sibling = document.getElementsByTagName('script')[0];
    script.src = 'https://ssljscdn.airbrake.io/0.3/airbrake.min.js';
    script.async = true;
    sibling.parentNode.insertBefore(script, sibling);
  }

  if (isAirbrakeEnabled) {
    // Asynchronously loads Airbrake notifier.
    if (window.addEventListener) {
      window.addEventListener('load', loadAirbrakeNotifier, false);
    } else {
      window.attachEvent('onload', loadAirbrakeNotifier);
    }
  }

}(window));
