(function(){
	"use strict";

	angular.module("testing_app").directive("sampleDirectiveOne", function(){
		return function(scope, elem){
			elem.append("<span>This span is appended from directive</span>");
		};
	})
	.directive("sampleDirectiveTwo", function(){
		return function(scope, elem){
			let spanElement = angular.element("<span>" + scope.text + "</span>");
			elem.append(spanElement);

			scope.$watch("text", function(newVal, oldVal){
				spanElement.text(newVal);
			});
		};
	})
	.directive("sampleDirectiveThree", function(){
		return {
			template: "<button>Increment Value</button>",
			link: function(scope, elem){
				elem.find("button").on("click", function(){
					scope.value++;
				});
			}
		};
	});
})();