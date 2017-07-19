(function () {
	angular
		.module('loc8rApp')
		.controller('aboutCtrl',aboutCtrl);

	function aboutCtrl() {
		var vm = this;

		vm.pageHeader = {
			title: 'About loc8r',
			strapline: ''
		};
		vm.main = {
			content : "Loc8r was  created to help people find places nearby to sit down and get a bit of work done. \n\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Enim veniam consectetur nesciunt dolor, vel id provident quisquam! Aliquid earum vel iusto deserunt, tenetur sequi sunt quia voluptate commodi exercitationem eos!"
		}
	}
})();