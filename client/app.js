angular.module('thymer', [
  'thymer.cooking',
  'thymer.home',
  'thymer.newRecipe',
  'thymer.searchRecipes',
  'ngRoute'
])

.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/home/home.html',
    controller: 'homeController'
  })
  .when('/cooking', {
    templateUrl: 'partials/cooking/cooking.html',
    controller: 'cookingController'
  })
  .when('/newRecipe', {
    templateUrl: 'partials/newRecipe/newRecipe.html',
    controller: 'newRecipeController'
  })
  .when('/searchRecipes', {
    templateUrl: 'partials/searchRecipes/searchRecipes.html',
    controller: 'searchRecipesController'
  })
  .otherwise({
    redirectTo: '/'
  });
})

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
    recipe = angular.toJson(recipe);
    $http ({
      method: 'POST',
      url: '/api/recipes',
      data: recipe
    });

    //.then(function(newRecipe) {
      //redirect user to newly added recipe
      //how will we id each recipe
      //how will we display selected recipe for cookin view
    //});
  };

  return {
    addRecipe: addRecipe,
    getRecipes: getRecipes
  };
});