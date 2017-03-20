angular.module('thymer', [
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
    $http ({
      method: 'POST',
      url: '/api/recipes',
      data: recipe
    }).then(function(newRecipe) {
      //redirect user to newly added recipe
      //how will we id each recipe
      //how will we display selected recipe for cookin view
    });
  };

  return {
    addRecipe: addRecipe,
    getRecipes: getRecipes
  };
})

.controller('SearchRecipeController', function($scope, Recipes) {

  console.log('getrecipes:', Recipes.getRecipes);
  Recipes.getRecipes()
  .then(function(data) {
    $scope.recipes = data;
  });
})

.controller('AddRecipeController', function($scope, Recipes) {
  $scope.steps = [];
  $scope.addStep = function() {
    $scope.steps.push([$scope.stepDescription, $scope.stepTime]);
  };

  $scope.vegan = false;
  $scope.dairyFree = false;
  $scope.glutenFree = false;
  $scope.fodMap = false;
  $scope.vegitarian = false;
  $scope.carnivoritarian = false;

  $scope.ingredients = [];
  $scope.addIngredient = function() {
    $scope.steps.push($scope.ingredient);
  };

  $scope.submitRecipe = function() {

    var cookTime = function() {
      var results = 0;
      for (var i = 0; i < $scope.steps.length; i++) {
        results += $scope.steps[i][1];
      }
      return results;
    };

    var diets = [
      $scope.vegan,
      $scope.dairyFree,
      $scope.glutenFree,
      $scope.fodMap,
      $scope.vegitarian,
      $scope.carnivoritarian
    ].filter(v => v !== false );

    console.log(diets);

    var recipe = {
      time: cookTime(),
      ingredients: $scope.ingredients,
      steps: $scope.steps,
      title: $scope.title,
      author: $scope.author,
      cuisine: $scope.cuisine,
      diet: diets,
      image: $scope.image,
      description: $scope.description
    };



    //send to server and db
    // Recipes.addRecipe(recipe);
  };
});