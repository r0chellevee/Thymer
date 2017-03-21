angular.module('thymer.newRecipe', [])

.controller('newRecipeController', function($scope, Recipes) {

  $scope.steps = [];

  $scope.addStep = function() {
    var totalMinutesForStep = $scope.min + (60 * $scope.hrs);
    var newStep = {
      type: $scope.stepType,
      description: $scope.stepDescription,
      totalMinutes: totalMinutesForStep
    };
    $scope.steps.push(newStep);
    $scope.min = 0;
    $scope.hrs = 0;
    $scope.stepDescription = '';
  };

  //initialize step time values to 0
  $scope.min = 0;
  $scope.hrs = 0;

  $scope.displayTime = function(totalMinutes) {
    if (totalMinutes < 60) {
      return `${totalMinutes} min `;
    } else {
      var hrs = Math.floor(totalMinutes / 60);
      var min = totalMinutes % 60;
      return `${hrs} hr ${min} min `;
    }
  };

  //initialize diet checkbox values to false
  $scope.vegan = false;
  $scope.dairyFree = false;
  $scope.glutenFree = false;
  $scope.fodMap = false;
  $scope.vegitarian = false;
  $scope.carnivoritarian = false;

  $scope.ingredients = [];

  $scope.addIngredient = function() {
    var newIngredient = $scope.ingredientQty + ' ' + $scope.ingredientName;
    $scope.ingredients.push(newIngredient);
    $scope.ingredientQty = '';
    $scope.ingredientName = '';
    console.log($scope.ingredients);
  };

  $scope.submitRecipe = function() {

    var cookTime = function() {
      var totalTime = 0;
      for (var i = 0; i < $scope.steps.length; i++) {
        var step = $scope.steps[i];
        if (step.type === 'cookType') {
          totalTime += step.totalMinutes;
        }
      }
      return totalTime;
    };

    var diet = [
      $scope.vegan,
      $scope.dairyFree,
      $scope.glutenFree,
      $scope.fodMap,
      $scope.vegitarian,
      $scope.carnivoritarian
    ].filter(v => v !== false );

    // console.log('time: ', cookTime());
    // console.log('ingredients: ', $scope.ingredients);
    // console.log('steps: ', $scope.steps);
    // console.log('title: ', $scope.title);
    // console.log('author: ', $scope.author);
    // console.log('diet: ', diet);
    // console.log('cuisine: ', $scope.cuisine);
    // console.log('image: ', $scope.image);
    // console.log('description: ', $scope.description);

    var recipe = {
      time: cookTime(), // done
      servings: $scope.servings,  // done
      ingredients: $scope.ingredients,  // done
      steps: $scope.steps, //done
      title: $scope.title, //done
      author: $scope.author, //done
      cuisine: $scope.cuisine, //done
      diet: diet, //done
      image: $scope.image, //done
      description: $scope.description //done
    };

    // console.log(recipe);
    //send to server and db
    Recipes.addRecipe(recipe);
  };
});