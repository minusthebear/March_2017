(function() {
  "use strict";

  angular.module("testing_app", [
    "ui.router"
  ])
  .config(function($urlRouterProvider, $locationProvider, $stateProvider, $qProvider) {
    $locationProvider.html5Mode(true);
    
    /* 
     * Uncomment line below during unit testing to handle $q.reject
     */
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
          resolvedUser: ["UsersService", "$q", "$stateParams", function(UsersService, $q, $stateParams){
            console.log($stateParams.id);
            return UsersService.findById($stateParams.id).then(function(user){
              console.log(user);
              return user;
            }).catch(function(error){
              return $q.reject(error);
            });
          }]
        }
      })
    	.state("404", {
        url: "/404",
    		templateUrl: "templates/404.html",
        controller: "FourOFour as ff"
    	});
  });
})();

/*
function($stateParams){
            console.log($stateParams.id);
            var u = UsersServiceProvider.$get().findById($stateParams.id);
            console.log(u);
          }
          */


