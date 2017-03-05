(function() {
  "use strict";

  angular.module("testing_app", [
    "ui.router"
  ])
  .config(function($urlRouterProvider, $locationProvider, $stateProvider) {
    $locationProvider.html5Mode({
    	enabled: true,
    	requireBase: false
    });

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
    	.state("404", {
    		templateUrl: "templates/404.html"
    	});
  });
})();


