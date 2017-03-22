angular.module('thymer.cooking', [])

.controller('cookingController', function($scope, Recipes) {

  $scope.recipe = Recipes.getCurrentRecipe();

  var totalTime = 0;
  // var cookTime = function() {
  //   for (var i = 0; i < $scope.steps.length; i++) {
  //     var step = $scope.steps[i];
  //     if (step.type === 'cookType') {
  //       totalTime += step.totalMinutes;
  //     }
  //   }
  // };

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

  FlipClock($('.step-time'), 250, {
    clockFace: 'MinuteCounter',
    countdown: true,
    autoStart: true
  });

});