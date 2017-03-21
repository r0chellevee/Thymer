angular.module('thymer.searchRecipes', [])

.controller('searchRecipesController', function($scope, Recipes) {

  console.log('getrecipes:', Recipes.getRecipes);
  Recipes.getRecipes()
  .then(function(data) {
    $scope.recipes = data;
  });
});