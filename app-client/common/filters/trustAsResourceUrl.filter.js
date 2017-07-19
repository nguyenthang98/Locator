(function () {
	angular
		.module('loc8rApp')
		.filter('trustAsResourceUrl',['$sce',function ($sce) {
			return function (val) {
				return $sce.trustAsResourceUrl(val);
			}
		}]);
})();