angular.module('thymer.searchRecipes', [])

.controller('searchRecipesController', function($scope, $location, Recipes) {


  Recipes.getRecipes()
  .then(function(data) {
    $scope.recipes = data;
  });

  $scope.updateCurrentRecipe = function(recipe) {
    Recipes.setCurrentRecipe(recipe);
    $location.path('/cooking');
    }
});