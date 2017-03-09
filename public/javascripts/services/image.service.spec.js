describe("imageService", function(){
	var ImageService, $q, $httpBackend,
		API = "http://pokeapi.co/api/v2/pokemon/";

	var RESPONSE_SUCCESS = {
	    'id': 25,
	    'name': 'pikachu',
	    'sprites': {
	      'front_default': 'http://pokeapi.co/media/sprites/pokemon/25.png'
	    },
	    'types': [{
	      'type': { 'name': 'electric' }
	    }]
	};

	var RESPONSE_ERROR = {
		"detail": "Not found."
	};

	beforeEach(angular.mock.module("testing_app"));

	beforeEach(inject(function(_ImageService_, _$q_, _$httpBackend_){
		ImageService = _ImageService_;
		$q = _$q_;
		$httpBackend = _$httpBackend_;
	}));

	it("should exist", function(){
		expect(ImageService).toBeDefined();
	});

	describe("findByName()", function(){
		var result;
		beforeEach(function(){
			result = {};
			spyOn(ImageService, "findByName").and.callThrough();
		});

		it("should return with a valid name", function(){
			var pokemon = "pikachu";

			$httpBackend.whenGET(API + pokemon).respond(200, $q.when(RESPONSE_SUCCESS));
		
			expect(ImageService.findByName).not.toHaveBeenCalled();
			expect(result).toEqual({});

			ImageService.findByName(pokemon)
				.then(function(res){
					result = res;
				});

			$httpBackend.flush();
			expect(ImageService.findByName).toHaveBeenCalledWith(pokemon);
			expect(result.id).toEqual(25);
			expect(result.name).toEqual("pikachu");
			expect(result.sprites.front_default).toContain(".png");
			expect(result.types[0].type.name).toEqual("electric");


		});

		it("should call a 404", function(){
			var pokemon = "nessie";

			$httpBackend.whenGET(API + pokemon).respond(404, $q.reject(RESPONSE_ERROR));

			expect(ImageService.findByName).not.toHaveBeenCalled();
			expect(result).toEqual({});
			
			ImageService.findByName(pokemon).catch(function(res){
				result = res;
			});
			$httpBackend.flush();


			expect(ImageService.findByName).toHaveBeenCalledWith(pokemon);
			expect(result).toEqual({"detail": "Not found."});

		});
	});
});