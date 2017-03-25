"use strict";

describe("testing Sample Directive", function(){
	var $compile, $scope, directiveElem;

	function getCompiledElementOne(e){
		let element = angular.element(e);
		let compiledElement = $compile(element)($scope);
		$scope.$digest();
		return compiledElement;
	}

	function getCompiledElementTwo(e){
		let compiledDirective = $compile(angular.element(e))($scope);
		$scope.$digest();
		return compiledDirective;
	}

	beforeEach(angular.mock.module("testing_app"));

	beforeEach(inject(function(_$compile_, _$rootScope_){
		$compile = _$compile_;
		$scope = _$rootScope_.$new();
	}));

	describe("Sample Directive One", function(){
		beforeEach(function(){
			directiveElem = getCompiledElementOne("<sample-directive-one></sample-directive-one");
		});

		it("should have span element", function(){
			let spanElement = directiveElem.find("span");
			expect(spanElement).toBeDefined();
			expect(spanElement.text()).toEqual("This span is appended from directive");
		});
	});

	describe("Sample Directive Two", function(){
		beforeEach(function(){
			directiveElem = getCompiledElementOne("<sample-directive-two></sample-directive-two");
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
			directiveElem = getCompiledElementOne("<sample-directive-three></sample-directive-three");
		});
		
		it("should increment on click of a button", function(){
			$scope.value = 10;

			let button = directiveElem.find("button");

			button.triggerHandler("click");
			$scope.$digest();

			expect($scope.value).toEqual(11);

		});
	});	
	
	describe("Sample Directive Four", function(){

		beforeEach(function(){
			$scope.config = {
				prop: "value"
			};
			$scope.notify = true;
			$scope.onChange = jasmine.createSpy("onChange");
			directiveElem = getCompiledElementTwo('<sample-directive-four config="config" notify="notify" on-change="onChange()"></sample-directive-four>');
		});
		
		it("config on isolated scope is two-way bound", function(){
			let isolatedScope = directiveElem.isolateScope();

			isolatedScope.config.prop = "value2";

			expect($scope.config.prop).toEqual("value2");
		});

		it("notify on isolated scope is one-way bound", function(){
			let isolatedScope = directiveElem.isolateScope();

			isolatedScope.notify = false;

			expect($scope.notify).toEqual(true);
		});

		it("onChange should be a function", function(){
			let isolatedScope = directiveElem.isolateScope();

			expect(typeof(isolatedScope.onChange)).toEqual("function");
		});

		it("should call onChange method of scope when invoked from isolated scope", function(){
			let isolatedScope = directiveElem.isolateScope();
			isolatedScope.onChange();

			expect($scope.onChange).toHaveBeenCalled();
		});
	});



	
});