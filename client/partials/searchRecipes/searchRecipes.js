angular.module('thymer.searchRecipes', [])

.controller('searchRecipesController', function($scope, $location, Recipes) {

  console.log('getrecipes:', Recipes.getRecipes);
  Recipes.getRecipes()
  .then(function(data) {
    $scope.recipes = data;
  });
  /*select recipe onClick
      .then(function() {
        $location.path('/cooking');
      })*/
});