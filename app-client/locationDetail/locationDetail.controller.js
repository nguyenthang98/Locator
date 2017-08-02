(function () {
	angular
		.module('loc8rApp')
		.controller('locationDetailCtrl',locationDetailCtrl);

	locationDetailCtrl.$inject = ['$routeParams','$location','loc8rData','$sce','authentication'];
	function locationDetailCtrl ($routeParams, $location ,loc8rData,$sce,authentication) {
		var vm = this;
		vm.locationId = $routeParams.locationId;
		
		vm.isLoggedIn = authentication.isLoggedIn();
		vm.currentPath = $location.path();

		loc8rData.locationById(vm.locationId)
			.then(function (response) {
				//console.log(response)
				vm.data = {
					location : response.data
				};
				vm.pageHeader = {
					title: vm.data.location.name,
					strapline: ''
				}
				/*Google map*/
				/*map maker*/
				vm.initMap(response.data);
				//google.maps.event.addDomListener(window, 'load', $scope.initialize);	

				// var url = "https://www.google.com/maps/embed/v1/place?q="+response.data.coordinates[1]+","+response.data.coordinates[0]+"&key=AIzaSyDj4EwB-gAC3YgEtK6dbmaquAHtIbiqdnY";
				// var url = "https://www.google.com/maps/embed/v1/view?key=AIzaSyDj4EwB-gAC3YgEtK6dbmaquAHtIbiqdnY&center="+response.data.coordinates[1]+","+response.data.coordinates[0]+"&zoom=17&maptype=roadmap";

				// vm.mapURL = $sce.trustAsResourceUrl(url);
			},function (err) {
				console.log(err)
			});
		//modal add review controller
		vm.onSubmit = function () {
			vm.formError = "";
			if(/*!vm.formData.name || */!vm.formData.rating || !vm.formData.reviewText){
				vm.formError = "All fields are required, please try again";
				return false;
			}else{
				vm.doAddReview(vm.locationId,vm.formData);
			}
		}

		vm.doAddReview = function (locationId,formData) {
			
			loc8rData.addReviewById(locationId,{
				/*author: authentication.currentUser().name,*/
				rating: formData.rating,
				reviewText: formData.reviewText,
			})
				.success(function (data) {
					$('#myModal').modal('toggle');
					vm.data.location.reviews.push(data);
				})
				.error(function(data){
					vm.formError = 'Your review has not saved, try again';
				})
				return false;
		}

		vm.initMap = function (location) {
			var myLatLng = {lat: location.coordinates[1], lng: location.coordinates[0]};

	        var map = new google.maps.Map(document.getElementById('map'), {
	          zoom: 17,
	          center: myLatLng
	        });

	        var marker = new google.maps.Marker({
	          position: myLatLng,
	          map: map,
	          title: location.name
	        });
		}
	};
})();