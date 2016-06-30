angular.module('geospatial')
  .controller('ProjectController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    if($routeParams.id != undefined) {
      $scope.id = $routeParams.id;

      $http.get('/project/' + $scope.id).then(function(res) {
        $scope.project = res.data;
      });
    }
  }]);
