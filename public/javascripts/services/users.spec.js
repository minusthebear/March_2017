describe("Users Factory", function(){
	var Users;

	beforeEach(angular.mock.module("testing_app"));

	beforeEach(inject(function(_Users_){
		Users = _Users_;
	}));

	it("should exist", function(){
		expect(Users).toBeDefined();
	});

	describe("Users.all()", function(){
		it("should exist", function(){
			expect(Users.all).toBeDefined();
		});
	});
});