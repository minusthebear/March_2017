describe("UsersController", function(){
	var $controller, UsersController;

	var userList = [
		{ id: 1, name: "Richard Hendricks", email: "richard@piedpiper.com", phone: 4085550011, pokemon: { isPresent: true, name: "eevee"}, icon: { isPresent: false, name: null} },
		{ id: 2, name: "Erlich Bachman", email: "erlich@aviato.com", phone: 4155552233, pokemon: { isPresent: true, name: "celebi"}, icon: { isPresent: false, name: null} },
		{ id: 3, name: "Gavin Belson", email: "gavin@hooli.com", phone: 9165554455, pokemon: { isPresent: true, name: "snorlax"}, icon: { isPresent: false, name: null} }
	];

	beforeEach(angular.mock.module("ui.router"));
	beforeEach(angular.mock.module("testing_app"));

	beforeEach(inject(function(_$controller_, _UsersService_){
		$controller = _$controller_;
		UsersService = _UsersService_;

		spyOn(UsersService, "all").and.callFake(function(){
			return userList;
		});

		UsersController = $controller("UsersController", {});
	}));

	it("should be defined", function(){
		expect(UsersController).toBeDefined();
	});

	it("should init with a call to UsersService.all()", function(){
		expect(UsersService.all).toHaveBeenCalled();
		expect(UsersController.users).toEqual(userList);
	});
});