describe("404 page", function(){
	var $controller, $404;

	beforeEach(angular.mock.module("ui.router"));
	beforeEach(angular.mock.module("testing_app"));

	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
		$404 = $controller("FourOFour", {});
	}));

	it("should be defined", function(){
		expect($404).toBeDefined();
	});
});