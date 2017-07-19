(function () {
	homeCtrl.$inject = ['$scope','loc8rData','geolocation'];
	function homeCtrl($scope,loc8rData,geolocation) {
			var vm = this;
			vm.pageHeader = {
				title : 'Loc8r',
				strapline: 'This is a strapline'
			}
			vm.sidebar = {
				content : 'Looking for wifi and a seat Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo atque blanditiis assumenda, minima quas aliquam dicta natus a repellat fugit, labore obcaecati, est, sequi facilis quos hic magni molestias incidunt.'
			}
			vm.message = 'checking your location';
			vm.data = {locations: []};
			vm.getData = function (position) {
				var lat = position.coords.latitude;
				var lng = position.coords.longitude;
				vm.message = 'Searching for nearby places';
				loc8rData.locationByCoords(lat,lng)
					.then(function (response) {
						vm.message = response.data.length > 0 ? "":"No locations found nearby";
						vm.data.locations = response.data;
					}, function (error) {
						console.log(error.message);
						vm.message = 'Sorry, something went wrong';
					});
				};
			vm.showError = function (error) {
				$scope.$apply(function () {
					vm.message = error.message;
				});
			};
			vm.noGeo = function () {
				$scope.apply(function () {
					vm.message = 'geolocation is not supported by this browser.';
				});
			};	
			geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
		};	
	
		angular
			.module('loc8rApp')
			.controller('homeCtrl', homeCtrl);
})();