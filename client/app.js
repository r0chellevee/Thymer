angular.module = ('thymer', [
  // 'AddRecipeController',
  // 'SearchRecipeController' //Tell Nathan we renamed it
  ])

.factory('Recipes', function($http) {
  //this is scaled to small DB, in the event of bigger DB we will need to fine-tune
  //the function to perform a filter on the backend rather then the front
  var getRecipes = function() {
    return $http ({
      method: 'GET',
      url: '/api/recipes'
    }).then(function(res) {
      return res.data;
    });
  };
  var addRecipe = function(recipe) {
    recipe = json.stringify(recipe);
    return $http ({
      method: 'POST',
      url: '/api/recipes',
      data: recipe
    });
  };

  return {
    addRecipe: addRecipe,
    getRecipes: getRecipes
  };
})

.controller('SearchRecipeController', function($scope, Recipes) {
  Recipes.getRecipes(function(data) {
    $scope.recipes = data;
  });
})
.controller('AddRecipeController', function($scope, Recipes) {
  $scope.steps = [];
  $scope.addStep = function() {
    $scope.steps.push([$scope.stepDescription, $scope.stepTime]);
  }
  $scope.ingredients = [];
  $scope.addIngredient = function() {
    $scope.steps.push($scope.ingredient);
  }
  $scope.onClick = function() {
    var cookTime = function() {
      var results = 0;
      for(var i = 0; i < $scope.steps.length; i++) {
        results += $scope.steps[i][1];
      }
      return results;
    }
    var recipe = {
      time: cookTime(),
      ingredients: $scope.ingredients,
      steps: $scope.steps,
      title: $scope.title,
      author: $scope.author,
      cuisine: $scope.cuisine,
      diet: $scope.diet,
      image: $scope.image,
      description: $scope.description
    };
    Recipes.addRecipe(recipe);
  }
});