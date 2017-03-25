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
	})
	.directive("sampleDirectiveFour", function(){
		return {
			scope: {
				config: "=",
				notify: "@",
				onChange: "&"
			}
		}
	})
	.directive("sampleDirectiveFive", function(){
		return {
			require: ["ngModel", "^?form"],
			link: function(scope, elem, attrs, ctrls){
				if(ctrls[1]){
					ctrls[1].$setDirty();
				}
			}
		}
	})
	.directive("sampleDirectiveSix", function(){
		return {
			replace: true,
			template: "<div>Content in the directive</div>"
		}	
	})
	.directive("sampleDirectiveSeven", function(){
		return {
			transclude: true,
			template: "<div>Text in the directive<div ng-transclude></div></div>"
		}
	});
})();