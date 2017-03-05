"use strict";

describe("testing_app app.js file", function(){
	var $q, $state, $stateParams, $templateCache, $location, $rootScope, $injector;

	function mockTemplate(templateRoute, template){
		$templateCache.put(templateRoute,template || templateRoute);
	}

	function goFrom(url){
		return {
			toState: function(state, params){
				$location.replace().url(url);
				$state.go(state, params);
				$rootScope.$digest();
			}
		}
	}

	function goTo(url){
		$location.url(url);
		$rootScope.$digest();
	}

	beforeEach(angular.mock.module("testing_app"));

	beforeEach(inject(function(_$q_, _$state_, _$stateParams_, _$templateCache_, _$location_, _$rootScope_, _$injector_){
		$q = _$q_;
		$state = _$state_;
		$stateParams = _$stateParams_;
		$templateCache = _$templateCache_;
	    $location = _$location_;
	    $rootScope = _$rootScope_;
	    $injector = _$injector_;
	}));

	describe("home check", function(){
		beforeEach(function(){
			mockTemplate("templates/home.html")
		});

		it("should go to home when home", function(){
			goTo("/home");
			expect($state.current.name).toEqual("home");
		});

		it("should go to home when empty", function(){
			goTo("");
			expect($state.current.name).toEqual("home");
		});

		it("should go to home when /", function(){
			goTo("/");
			expect($state.current.name).toEqual("home");
		});
	});

	describe("404 check", function(){
		var badUrl = "/fdsfsdfdfds";
		
		beforeEach(function(){
			mockTemplate("templates/404.html");
		});

		it("should go to 404 state", function(){
			goTo(badUrl);
			expect($location.url()).toEqual(badUrl);
			expect($state.current.name).toEqual("404");
		});
	});
});