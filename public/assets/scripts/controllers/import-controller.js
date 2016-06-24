angular.module('geospatial')

	.controller('ImportController', ['$scope', '$http', '$location', '$routeParams',
	 		function($scope, $http, $location, $routeParams) {

		/************ profile ************/
		$scope.sync = false;

		/*
		**  toggle
		*/
		$scope.showBitbucket = false;
		$scope.showGithub = true;

		$scope.toggleGitNav = function(val) {
      if(val==1)	{
        $scope.showGithub = true;
        $scope.showBitbucket = false;
      }
      else if(val==2)	{
        $scope.showGithub = false;
        $scope.showBitbucket = true;
      }
		}


	}]);
