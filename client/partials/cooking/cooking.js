angular.module('thymer.cooking', [])

.controller('cookingController', function($scope, Recipes) {

  $scope.recipe = Recipes.getCurrentRecipe();

  $scope.cookSteps = [];
  $scope.cookStepTimes = [];
  $scope.prepStepDescriptions = [];

  //sort through and organize step information
  $scope.recipe.steps.forEach(function(step) {
    if (step.type === 'prepType') {
      $scope.prepStepDescriptions.push(step.description);
    } else { //cookType steps
      $scope.cookStepTimes.push(step.totalMinutes);
      $scope.cookSteps.push(step);
    }
  });

  FlipClock($('.total-cook'), $scope.recipe.time * 60, {
    clockFace: 'HourlyCounter',
    countdown: true,
    autoStart: true
  });

  var i = 0;
  var stepClock = new FlipClock($('.step-time'), $scope.cookStepTimes[i] * 60, {
    clockFace: 'MinuteCounter',
    countdown: true,
    autoStart: true
  });


    console.dir(stepClock);

    //set next step
    setInterval(function(){
      if (!stepClock.face.factory.running) {
        i++;
        var nextStepTime = $scope.cookStepTimes[i] * 60;
        if (i >= $scope.cookStepTimes.length) {
          stepClock.stop();
        }
        else {
          stepClock.setTime(nextStepTime);
          stepClock.start();
        }
      }
    }, 1000)
});