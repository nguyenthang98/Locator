(function () {
	angular
		.module('loc8rApp')
		.service('loc8rData',loc8rData);

	loc8rData.$inject = ['$http','authentication'];
	function loc8rData($http,authentication) {
		var locationByCoords = function (lat,lng) {
			console.log(lat + ' and '+ lng)
			return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=100')
		}
		var locationById = function (locationId) {
			return $http.get('/api/locations/'+locationId);
		}
		var addReviewById = function (locationId,data) {
			return $http.post('/api/locations/' + locationId + "/reviews",data,{
				headers : {
					Authorization: 'Bearer '+ authentication.getToken(),
				}
			});
		}
		return{
			locationByCoords : locationByCoords,
			locationById : locationById,
			addReviewById : addReviewById
		}
	}
})();