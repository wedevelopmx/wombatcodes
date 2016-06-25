angular.module('geospatial')
  .controller('ProjectController', ['$scope', '$routeParams', function($scope, $routeParams) {
    if($routeParams.id != undefined) {
      $scope.id = $routeParams.id;
    }
  }]);
