angular.module('thymer.home', [])

.controller('homeController', function($scope, Recipes) {

  // console.log('getrecipes:', Recipes.getRecipes);
  Recipes.getRecipes()
  .then(function(data) {
    console.log("home controller get request");
    $scope.recipes = data;
  });
});