"use strict";

describe("testing Sample Directive", function(){
	var $compile, $scope, directiveElem;

	function getCompiledElement(e){
		let element = angular.element(e);
		let compiledElement = $compile(element)($scope);
		$scope.$digest();
		return compiledElement;
	}

	beforeEach(angular.mock.module("testing_app"));

	beforeEach(inject(function(_$compile_, _$rootScope_){
		$compile = _$compile_;
		$scope = _$rootScope_.$new();
	}));

	describe("Sample Directive One", function(){
		beforeEach(function(){
			directiveElem = getCompiledElement("<sample-directive-one></sample-directive-one");
		});

		it("should have span element", function(){
			let spanElement = directiveElem.find("span");
			expect(spanElement).toBeDefined();
			expect(spanElement.text()).toEqual("This span is appended from directive");
		});
	});

	describe("Sample Directive Two", function(){
		beforeEach(function(){
			directiveElem = getCompiledElement("<sample-directive-two></sample-directive-two");
		});
		
		it("should have updated text in element", function(){
			$scope.text = "some other text";
			$scope.$digest();
			let spanElement = directiveElem.find("span");
			expect(spanElement).toBeDefined();
			expect(spanElement.text()).toEqual($scope.text);
		});
	});
	
	describe("Sample Directive Three", function(){
		beforeEach(function(){
			directiveElem = getCompiledElement("<sample-directive-three></sample-directive-three");
		});
		
		it("should increment on click of a button", function(){
			$scope.value = 10;

			let button = directiveElem.find("button");

			button.triggerHandler("click");
			$scope.$digest();

			expect($scope.value).toEqual(11);

		});
	});

	

	
});