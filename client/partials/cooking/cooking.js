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


  // creates the total timer
  var totalClock = FlipClock($('.total-cook'), $scope.recipe.time * 60, {
    clockFace: 'HourlyCounter',
    countdown: true,
    autoStart: false
  });

  var i = 0;
  //creates the local timer
  var stepClock = new FlipClock($('.step-time'), $scope.cookStepTimes[i] * 60, {
    clockFace: 'MinuteCounter',
    countdown: true,
    autoStart: false
  });

  var cookingStarted = false;

  $scope.toggleCooking = function() {
    if (!cookingStarted) {
      totalClock.start();
      stepClock.start();
      cookingStarted = true;
    } else {
      totalClock.stop();
      stepClock.stop();
      cookingStarted = false;
    }
  }
  // creating a style for active ingredients
  var activeStyle = {
    'color': '#62E2CD',
    'font-size': '25px',
    'font-weight': 'bold',
    'background-color': '#FFE8BC'
  }

  // initializes first step styling - TODO initiate on click
  setTimeout(function() {
      $('#step' + i).css(activeStyle);
  }, 10)

//checks to see whether the step timer is done
  setInterval(function(){
    // if step timer is done, increment to the next step
    if (!stepClock.face.factory.running && cookingStarted) {
      i++;
      var nextStepTime = $scope.cookStepTimes[i] * 60;
      //stops the step timer once the incrementor is the array length
      if (i >= $scope.cookStepTimes.length) {
        stepClock.stop();
      }
      else {
        // styles specific steps based on whether they are active or complete
        $('#step' + i).css(activeStyle);
        $('#step' + (i-1)).css({
          'color': 'black',
          'font-size': '14px',
          'font-weight': 'normal',
          'background-color': '#96E0FA'
        })
        // adding in the check-mark glyphicon
        $('#step' + (i-1) + ' small').append('<span class="glyphicon glyphicon-ok-circle"></span>');
        $('.glyphicon').css({
          'font-size': '25px',
          'float': 'right'
        });
        // initiating the next step countdown
        stepClock.setTime(nextStepTime);
        stepClock.start();
      }
    };
  }, 1000);
});