describe("Users Factory", function(){
	var UsersService, $q, $rootScope, $provide, deferred, promise, mockedDeferred;

	var userList = [
		{ id: 1, name: "Richard Hendricks", email: "richard@piedpiper.com", phone: 4085550011, pokemon: { isPresent: true, name: "eevee"}, icon: { isPresent: false, name: null} },
		{ id: 2, name: "Erlich Bachman", email: "erlich@aviato.com", phone: 4155552233, pokemon: { isPresent: true, name: "celebi"}, icon: { isPresent: false, name: null} },
		{ id: 3, name: "Gavin Belson", email: "gavin@hooli.com", phone: 9165554455, pokemon: { isPresent: true, name: "snorlax"}, icon: { isPresent: false, name: null} }
	];

	var singleUser = { id: 2, name: "Erlich Bachman", email: "erlich@aviato.com", phone: 4155552233, pokemon: { isPresent: true, name: "celebi"}, icon: { isPresent: false, name: null} };

	function mockQ(id){
		var deferred = $q.defer();

		deferred.resolve(userList.find(function(user){
			return user.id == id;
		}));

		return deferred.promise;
	}

	beforeEach(angular.mock.module("testing_app"));
	beforeEach(angular.mock.module(function(_$provide_){
		$provide = _$provide_;
	}));

	afterEach(function(){
		$rootScope.$apply();
	});

	beforeEach(inject(function(_UsersService_, _$q_, _$rootScope_){
		UsersService = _UsersService_;
		$q = _$q_;
		$rootScope = _$rootScope_;
	}));

	it("should exist", function(){
		expect(UsersService).toBeDefined();
	});

	describe("Users.all()", function(){
		it("should exist", function(){
			expect(UsersService.all).toBeDefined();
		});

		it("should return the userlist", function(){
			expect(UsersService.all()).toEqual(userList);
		});
	});

	describe("Users.findById()", function(){
		var UsersServiceMock;

		beforeEach(function(){
			mockedDeferred = mockQ(2);
		});
		
		it("should exist", function(){
			expect(UsersService.findById).toBeDefined();
		});

		it("should produce a promise", function(){
			expect(mockedDeferred instanceof $q.resolve().constructor).toBeTruthy();
		});

		it("should equal singleUser", function(){
			var resolvedValue;

			mockedDeferred.then(function(value){
				resolvedValue = value;
			});

			$rootScope.$apply();

			expect(resolvedValue).toEqual(singleUser);
		});
	});
});