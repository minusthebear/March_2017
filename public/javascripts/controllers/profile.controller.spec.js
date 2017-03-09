describe("profile.controller", function(){
	var $controller, ImageService, $q, $httpBackend,
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

	beforeEach(angular.mock.module("testing_app"));
	beforeEach(angular.mock.module("ui.router"));

	beforeEach(inject(function(_$controller_, _ImageService_, _$q_, _$httpBackend_){
		$controller = _$controller_;
		ImageService = _ImageService_;
		$q = _$q_;
		$httpBackend = _$httpBackend_;
	}));

	describe("ProfileController should exist", function(){
		var ProfileController, singleUser;

		beforeEach(function(){
			singleUser = { id: 2, name: "Erlich Bachman", email: "erlich@aviato.com", phone: 4155552233, pokemon: { isPresent: true, name: "celebi"} };
			ProfileController = $controller("ProfileController", {resolvedUser: singleUser});
		});

		it("should be defined", function(){
			expect(ProfileController).toBeDefined();
		});
	});

	describe("ProfileController with a valid user and valid Pokemon", function(){
		var ProfileController, singleUser;

		beforeEach(function(){
			singleUser = { id: 2, name: "Erlich Bachman", email: "erlich@aviato.com", phone: 4155552233, pokemon: { isPresent: true, name: "celebi"} };
			spyOn(ImageService, "findByName").and.callThrough();
			ProfileController = $controller("ProfileController", {resolvedUser: singleUser, ImageService: ImageService});
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
});