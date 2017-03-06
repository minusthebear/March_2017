(function(){
	angular.module("testing_app")
		.controller("UsersController", function(UsersService){
			var vm = this;

			vm.users = UsersService.all();
		});
})();