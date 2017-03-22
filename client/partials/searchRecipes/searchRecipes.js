angular.module('thymer.searchRecipes', [])

.controller('searchRecipesController', function($scope, $location, Recipes) {

  console.log('getrecipes:', Recipes.getRecipes);
  Recipes.getRecipes()
  .then(function(data) {
    $scope.recipes = data;
  });

  $scope.updateCurrentRecipe = function(recipe) {
    Recipes.setCurrentRecipe(recipe);
    $location.path('/cooking');
    }
});