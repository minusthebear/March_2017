/*
When not sick, do this:

grunt-html2js is very easy to configure and to use. It needs the source path(s) of the html file(s) and a destination path where the resultant script has to be written. The following is the configuration used in the sample code:
*/

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

	describe("Sample Directive Five", function(){

		it("should fail if ngModel is not specified", function(){
			expect(function(){
				getCompiledElementTwo('<input type="text" sample-directive-five />');
			}).toThrow();
		});

		it("should work if ng-model is specified and not wrapped in form", function(){
			expect(function(){
				getCompiledElementTwo('<div><input type="text" ng-model="name" sample-directive-five /></div>');
			}).not.toThrow();
		});

		it("should set form dirty", function(){
			let directiveElem = getCompiledElementTwo('<form name="sampleForm"><input type="text" ng-model="name" sample-directive-five /></form>');
			expect($scope.sampleForm.$dirty).toEqual(true);
		});

	});

	describe("Sample Directive Six", function(){
		it("should have replaced directive element", function(){
			let compiledDirective = getCompiledElementTwo('<div><sample-directive-six></sample-directive-six></div>');

			expect(compiledDirective.find("sample-directive-six").length).toEqual(0);
		});
	});
/*
	describe("Sample Directive Seven", function(){
		it("should have an ng-transclude directive", function(){
			let transcludeElem = directiveElem.find("div[ng-transclude]");
			expect(transcludeElem.length).toBe(1);
		});
	});
*/


	
});