angular.module('loc8rApp', [])

var _isNumeric = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function () {
  return function (distance) {
    var numDistance, unit;
    if ( distance>=0 && _isNumeric(distance)) {
      if (distance > 1) {
        numDistance = parseFloat(distance).toFixed(1);
        unit = 'km';
      } else {
        numDistance = parseInt(distance * 1000,10);
        unit = 'm';
      }
      return numDistance + unit;
    } else {
      return "?";
    }
  };
};

var ratingStars = function () {
  return {
    scope: {
      thisRating : '=rating'
    },
    templateUrl: '/angular/rating-stars.html'
  };
};

 var myController = function ($scope , loc8rData, geolocation) {
    $scope.message = 'Checking your location';
    $scope.data = { locations : [] };

    $scope.getData = function (position ) {
      $scope.message = 'searching for nearby places';
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      loc8rData.locationByCoords(lat,lng)
        .then(function (response) {
          $scope.message = response.data.length > 0 ? "" : "No locations found";
          $scope.data.locations = response.data;
        }, function (err) {
          $scope.message = 'sorry something gone wrong';
          console.log(err);
        });
    };
    $scope.showError = function (error) {
      $scope.$apply(function () {
        $scope.message = error.message;
      });
    };
    $scope.noGeo = function () {
      $scope.$apply(function(){
        $scope.message = 'geolocation not supportd by this browser.';
      });
    };
    geolocation.getPostion($scope.getData,$scope.showError,$scope.noGeo);
};
var loc8rData = function ($http) {
    var locationByCoords = function (lat, lng) {
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20');
    };
    return {
      locationByCoords : locationByCoords
    };
};

var geolocation = function () {
  var getPostion = function (cbSuccess,cbError,cbNoGeo) {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(cbSuccess,cbError);
    }else{
      cbNoGeo();
    };
  };

  return {
    getPostion : getPostion
  };
}

angular
 .module('loc8rApp')
 .controller('myController',myController)
 .filter('formatDistance',formatDistance)
 .directive('ratingStars', ratingStars)
 .service('loc8rData', loc8rData)
 .service('geolocation',geolocation);