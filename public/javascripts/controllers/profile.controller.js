(function(){
	"use strict";

	angular.module("testing_app")
		.controller("ProfileController", function(resolvedUser, ImageService, $state){
			var vm = this;
			console.log(resolvedUser);
			
			if (resolvedUser){
				vm.user = resolvedUser;
			} else { 
				return $state.go("404");
			}

			ImageService.findByName(vm.user.pokemon.name)
				.then(function(res){
					vm.user.pokemon.id = res.id;
					vm.user.pokemon.image = res.sprites.front_default;
					vm.user.pokemon.type = res.types[0].type.name;
				})
				.catch(function(res){
					vm.user.pokemon.image = "https://www.native-instruments.com/forum/data/avatars/m/328/328352.jpg?1439377390";
				});
		});
})();