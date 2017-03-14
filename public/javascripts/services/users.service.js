(function(){
	"use strict";

	angular.module("testing_app")
		.factory("UsersService", function($q){

			var Users = {};

			var userList = [
				{ id: 1, name: "Richard Hendricks", email: "richard@piedpiper.com", phone: 4085550011, pokemon: { isPresent: true, name: "eevee"}, icon: { isPresent: false, name: null} },
				{ id: 2, name: "Erlich Bachman", email: "erlich@aviato.com", phone: 4155552233, pokemon: { isPresent: true, name: "celebi"}, icon: { isPresent: false, name: null} },
				{ id: 3, name: "Gavin Belson", email: "gavin@hooli.com", phone: 9165554455, pokemon: { isPresent: true, name: "snorlax"}, icon: { isPresent: false, name: null} }
			];

			Users.all = function(){
				return userList;
			};

			Users.findById = function(id){
				var deferred = $q.defer();

				deferred.resolve(userList.find(function(user){
					return user.id == id;
				}));

				return deferred.promise;
			};

			return Users;
		});
})();