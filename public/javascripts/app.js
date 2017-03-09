(function() {
  "use strict";

  angular.module("testing_app", [
    "ui.router"
  ])
  .config(function($urlRouterProvider, $locationProvider, $stateProvider, $qProvider) {
    $locationProvider.html5Mode(true);
    $qProvider.errorOnUnhandledRejections(false);

    $urlRouterProvider
    	.when("", "/home")
    	.when("/", "/home")
	    .otherwise(function($injector){
	    	$injector.get("$state").go("404", {}, { location: false})
	    });

    $stateProvider
    	.state("home", {
    		url: "/home",
    		templateUrl: "templates/home.html"
    	})
    	.state("users", {
    		url: "/users",
    		templateUrl: "templates/users.html",
    		controller: "UsersController as uc"
    	})
      .state("profile", {
        url: "/user/:id",
        templateUrl: "templates/profile.html",
        controller: "ProfileController as pc",
        resolve: {
          resolvedUser: function(UsersService, $stateParams){
            return UsersService.findById($stateParams.id);
          }
        }
      })
    	.state("404", {
    		templateUrl: "templates/404.html"
    	});
  });
})();


