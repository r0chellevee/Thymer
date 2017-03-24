angular.module('thymer', [
  'thymer.cooking',
  'thymer.home',
  'thymer.newRecipe',
  'thymer.searchRecipes',
  'ngRoute'
])
.run(function ($location) {
  console.dir($location);
  if ($location.$$path === '/cooking')
  $location.path('/searchRecipes');
})
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
    return $http ({
      method: 'POST',
      url: '/api/recipes',
      data: recipe
    });
  };

  var currentRecipe;

  var visible = function(){
    if(currentRecipe) {
      $('.cookingTab').css('visibility', 'visible');
    } else {
      $('.cookingTab').removeAttr('visibility').css('visibility', 'hidden');
    }
  }

  var getCurrentRecipe = function() {
    return currentRecipe;
  };

  var setCurrentRecipe = function(recipe) {
    currentRecipe = recipe;
    // console.log("currentRecipe: ", currentRecipe);
  };
    //.then(function(newRecipe) {
      //redirect user to newly added recipe
      //how will we id each recipe
      //how will we display selected recipe for cookin view
    //});

  return {
    addRecipe: addRecipe,
    getRecipes: getRecipes,
    setCurrentRecipe: setCurrentRecipe,
    getCurrentRecipe: getCurrentRecipe,
    visible: visible
  };
});