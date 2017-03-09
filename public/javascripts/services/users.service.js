(function(){
	"use strict";

	angular.module("testing_app")
		.factory("UsersService", function(){

			var Users = {};

			var userList = [
				{ id: 1, name: "Richard Hendricks", email: "richard@piedpiper.com", phone: 4085550011, pokemon: { isPresent: true, name: "eevee"} },
				{ id: 2, name: "Erlich Bachman", email: "erlich@aviato.com", phone: 4155552233, pokemon: { isPresent: true, name: "celebi"} },
				{ id: 3, name: "Gavin Belson", email: "gavin@hooli.com", phone: 9165554455, pokemon: { isPresent: true, name: "snorlax"} }
			];

			Users.all = function(){
				return userList;
			};

			Users.findById = function(id){
				return userList.find(function(user){
					return user.id === id;
				});
			};

			return Users;
		});
})();