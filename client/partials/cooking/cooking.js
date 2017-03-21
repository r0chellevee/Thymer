angular.module('thymer.cooking', [])

.controller('cookingController', function($scope, Recipes) {

  var totalTime = 0;
  var cookTime = function() {
    for (var i = 0; i < $scope.steps.length; i++) {
      var step = $scope.steps[i];
      if (step.type === 'cookType') {
        totalTime += step.totalMinutes;
      }
    }
  };

  FlipClock($('.total-cook'), totalTime, {
    clockFace: 'HourlyCounter',
    countdown: true,
    autoStart: true
  });

  FlipClock($('.step-time'), 250, {
    clockFace: 'MinuteCounter',
    countdown: true,
    autoStart: true
  });

});