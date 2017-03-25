"use strict";

// Work on testing exception handling!!!


describe("testing_app app.js file", function(){
	let $q, $httpBackend, $state, $stateParams, $templateCache, $location, $rootScope, $injector, mockedDeferred, mockedService, UsersService;

	let singleUser = { id: 2, name: "Erlich Bachman", email: "erlich@aviato.com", phone: 4155552233, pokemon: { isPresent: true, name: "celebi"}, icon: { isPresent: false, name: null} };

	function mockTemplate(templateRoute, template){
		$templateCache.put(templateRoute, template || templateRoute);
	}

	function goToStateAndParam(state, params){
		$state.go(state, params);
		$rootScope.$digest();
	}

	function goTo(url){
		$location.url(url);
		$rootScope.$digest();
	}

	function mockQ(id){
		var deferred = $q.defer();

		deferred.resolve(userList.find(function(user){
			return user.id === id;
		}));

		return deferred.promise;
	}

	beforeEach(angular.mock.module("testing_app"));

	beforeEach(inject(function(_$q_, _$httpBackend_, _$stateParams_, _$state_, _$templateCache_, _$location_, _$rootScope_, _$injector_){
		$q = _$q_;
		$httpBackend = _$httpBackend_;
		$stateParams = _$stateParams_;
		$state = _$state_;
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
		let badUrl = "/fdsfsdfdfds";
		
		beforeEach(function(){
			mockTemplate("templates/404.html");
		});

		it("should go to 404 state", function(){
			goTo(badUrl);
			expect($location.url()).toEqual(badUrl);
			expect($state.current.name).toEqual("404");
		});
	});

	describe("users check", function(){
		beforeEach(function(){
			mockTemplate("templates/users.html");
		});

		it("should route to /users", function(){
			goTo("users");
			expect($state.current.name).toEqual("users");
		});
	});

	describe("user/:id check", function(){
		let state = "profile";

		beforeEach(function(){
			mockTemplate("templates/profile.html");
			goToStateAndParam(state, {id: 2});

			inject(function($injector){
				UsersService = $injector.get("UsersService");
			});
		});

		it("should check if UsersService was injected",function(){
			expect(UsersService.findById).toBeDefined();
		});

		it("route to the correct state", function(){			
			expect($location.url()).toEqual("/user/2");
			expect($state.current.name).toEqual("profile");
		});

		it("should return correct data on calling the resolve block", function(){
			let resolve = $injector.invoke($state.current.resolve.resolvedUser);
			resolve.then(function(data){
				expect(data).toEqual(singleUser);
			});
			$rootScope.$digest();
		});

	});
});