angular.module('geospatial')

	.controller('ImportController', ['$scope', '$http', '$location', '$routeParams', 'fakeData',
	 		function($scope, $http, $location, $routeParams, fakeData) {

		/************ profile ************/
		$scope.sync = false;

    /************ repos **************/
    $scope.myRepos = fakeData.returnFakeMyRepos();
    console.log($scope.myRepos);

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
