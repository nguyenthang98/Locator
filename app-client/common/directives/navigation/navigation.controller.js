(function () {
	angular
		.module('loc8rApp')
		.controller('navigationCtrl',navigationCtrl)

	navigationCtrl.$inject = ['$route','$location','authentication']
	function navigationCtrl($route,$location,authentication) {
		var vm = this;
		vm.currentPath = $location.path();
		$('nav').find('.active').removeClass('active');
		switch (vm.currentPath) {
			case '/':
				$("#home").addClass('active');
				break;
			case '/login': case '/register': case '/about':
				var id = vm.currentPath.replace('/','#');
				$(id).addClass('active');
				break;
		}
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