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

  $scope.cookStepTimes = [];

  $scope.recipe.steps.forEach(function(step) {
    $scope.cookStepTimes.push(step.totalMinutes);
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