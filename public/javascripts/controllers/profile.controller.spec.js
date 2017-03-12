describe("profile.controller", function(){
	var $controller, ImageService, $q, $httpBackend, $state,
		API = "http://pokeapi.co/api/v2/pokemon/";

	var RESPONSE_SUCCESS = {
		'id': 251,
		'name': 'celebi',
		'sprites': {
	      'front_default': 'http://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/251.png'
	    },
	    'types': [{
	      'type': { 'name': 'grass' }
	    }]
	};

	var RESPONSE_ERROR = {
		"detail": "Not found."
	};

	beforeEach(angular.mock.module("testing_app"));
	beforeEach(angular.mock.module("ui.router"));

	beforeEach(inject(function(_$controller_, _ImageService_, _$q_, _$httpBackend_, _$state_){
		$controller = _$controller_;
		ImageService = _ImageService_;
		$q = _$q_;
		$httpBackend = _$httpBackend_;
		$state = _$state_;
	}));

	describe("ProfileController should exist", function(){
		var ProfileController, singleUser;

		beforeEach(function(){
			singleUser = { id: 2, name: "Erlich Bachman", email: "erlich@aviato.com", phone: 4155552233, pokemon: { isPresent: true, name: "celebi"}, icon: { isPresent: false, name: null} };
			ProfileController = $controller("ProfileController", {resolvedUser: singleUser, ImageService: ImageService, $state: $state});
		});

		it("should be defined", function(){
			expect(ProfileController).toBeDefined();
		});
	});

	describe("ProfileController with a valid user and valid Pokemon", function(){
		var ProfileController, singleUser;

		beforeEach(function(){
			singleUser = { id: 2, name: "Erlich Bachman", email: "erlich@aviato.com", phone: 4155552233, pokemon: { isPresent: true, name: "celebi"}, icon: { isPresent: false, name: null} };
			spyOn(ImageService, "findByName").and.callThrough();
			ProfileController = $controller("ProfileController", {resolvedUser: singleUser, ImageService: ImageService, $state: $state});
		});

		it("should set state to resolvedUser", function(){
			expect(ProfileController.user).toEqual(singleUser);
		});

		it("should call ImageService.findByName() and return Pokemon icon", function(){
			expect(ProfileController.user.pokemon.id).toBeUndefined();
			expect(ProfileController.user.pokemon.name).toEqual("celebi");
			expect(ProfileController.user.pokemon.image).toBeUndefined();
			expect(ProfileController.user.pokemon.type).toBeUndefined();

			$httpBackend.whenGET(API + "celebi").respond(200, $q.when(RESPONSE_SUCCESS));
			$httpBackend.flush();

			expect(ImageService.findByName).toHaveBeenCalledWith("celebi");
			expect(ProfileController.user.pokemon.id).toEqual(251);
			expect(ProfileController.user.pokemon.name).toEqual("celebi");
			expect(ProfileController.user.pokemon.image).toContain(".png");
			expect(ProfileController.user.pokemon.type).toEqual("grass");
		});
	});

	describe("ProfileController with valid user and invalid Pokemon", function(){
		var ProfileController, singleUser;

		beforeEach(function(){
			singleUser = { id: 2, name: "Erlich Bachman", email: "erlich@aviato.com", phone: 4155552233, pokemon: { isPresent: true, name: "deathmetaleagle"}, icon: { isPresent: false, name: null} };
			spyOn(ImageService, "findByName").and.callThrough();
			ProfileController = $controller("ProfileController", {resolvedUser: singleUser, ImageService: ImageService, $state: $state});
		});
		// https://www.native-instruments.com/forum/data/avatars/m/328/328352.jpg?1439377390
		it("should call findByName() and default to a placeholder image", function(){
			expect(ProfileController.user.pokemon.image).toBeUndefined();

			$httpBackend.whenGET(API + singleUser.pokemon.name).respond(404, $q.reject(RESPONSE_ERROR));
			$httpBackend.flush();

			expect(ImageService.findByName).toHaveBeenCalledWith("deathmetaleagle");
			expect(ProfileController.user.pokemon.image).toEqual("https://www.native-instruments.com/forum/data/avatars/m/328/328352.jpg?1439377390");
		});
	});

	describe("ProfileController with invalid user", function(){
		var ProfileController, singleUser;

		beforeEach(function(){
			spyOn($state, "go");
			spyOn(ImageService, "findByName");

			ProfileController = $controller("ProfileController", { resolvedUser: singleUser, ImageService: ImageService, $state: $state});
		});

		it("should redirect to 404", function(){
			expect(ProfileController.user).toBeUndefined();
			expect(ImageService.findByName).not.toHaveBeenCalled();
			expect($state.go).toHaveBeenCalledWith("404");
		});
	});
});