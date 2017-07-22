(function () {
	angular
		.module('loc8rApp')
		.controller('navigationCtrl',navigationCtrl)

	navigationCtrl.$inject = ['$route','$location','authentication']
	function navigationCtrl($route,$location,authentication) {
		var vm = this;
		vm.currentPath = $location.path();

		vm.isLoggedIn = authentication.isLoggedIn();
		vm.currentUser = authentication.currentUser();

		vm.logout = function () {
			authentication.logout();
			$route.reload();
			//$location.path(vm.currentPath);
			//$('window').location.reload();
		};
	}
})();