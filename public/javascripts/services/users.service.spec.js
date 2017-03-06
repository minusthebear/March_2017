describe("Users Factory", function(){
	var UsersService;

	var userList = [
		{ id: 1, name: "Richard Hendricks", email: "richard@piedpiper.com", phone: 4085550011 },
		{ id: 2, name: "Erlich Bachman", email: "erlich@aviato.com", phone: 4155552233 },
		{ id: 3, name: "Gavin Belson", email: "gavin@hooli.com", phone: 9165554455 }
	];

	var singleUser = { id: 2, name: "Erlich Bachman", email: "erlich@aviato.com", phone: 4155552233 };

	beforeEach(angular.mock.module("testing_app"));

	beforeEach(inject(function(_UsersService_){
		UsersService = _UsersService_;
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
		it("should exist", function(){
			expect(UsersService.findById).toBeDefined();
		});

		it("should retrieve a user with the id of 2", function(){
			expect(UsersService.findById(2)).toEqual(singleUser);
		});

		it("should return an unknown user number as undefined", function(){
			expect(UsersService.findById(666)).not.toBeDefined();
		});
	});
});