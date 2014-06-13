var ourHooks = function () {
  var isRegressionScenario = false;
  var hasPendingSteps = false;
  var regressionFailuredMessage = 'Scenarios marked with regression should not have pending steps.';

  this.StepResult(function(step, callback) {
    if (!isRegressionScenario) return callback();

    var stepIsUndefined = step.getPayloadItem('stepResult').isUndefined();
    var stepIsPending = step.getPayloadItem('stepResult').isPending();

    if (stepIsUndefined || stepIsPending) {
      hasPendingSteps = true;
    }

    callback();
  });

  this.Before('@regression', function(scenario, callback) {
    isRegressionScenario = true;
    callback();
  });

  this.After('@regression', function(scenario, callback) {
    isRegressionScenario = false;

    if (hasPendingSteps) {
      callback(regressionFailuredMessage);
      hasPendingSteps = false;
      return;
    }

    callback();
  });

};

module.exports = ourHooks;
