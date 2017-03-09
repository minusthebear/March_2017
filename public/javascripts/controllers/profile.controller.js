(function(){
	"use strict";

	angular.module("testing_app")
		.controller("ProfileController", function(resolvedUser, ImageService){
			var vm = this;
			vm.user = resolvedUser;

			ImageService.findByName(vm.user.pokemon.name)
				.then(function(res){
					return;
					// vm.user.pokemon.id = res.id;
					// vm.user.pokemon.image = res.sprites.front_default;
					// vm.user.pokemon.type = res.types[0].type.name;
				});
		});
})();