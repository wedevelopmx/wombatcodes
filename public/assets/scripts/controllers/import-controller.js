angular.module('geospatial')
	.controller('ImportController', ['$scope', '$http', '$location',
	 		function($scope, $http, $location) {
		console.log($scope.user);

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

		/************ repos **************/
		if($scope.user.sync.github != undefined && $scope.showGithub) {
			$http.get('/user/repos').then(function(res) {
					console.log(res.data);
					$scope.repos = res.data;
			});
		}

		$scope.saveRepository = function(repo){
			var project = {
				owner: repo.owner.login,
				repository: repo.name
			};

			$http.post('/project', project, function(res) {
				console.log(res);
				$location.url('/project/' + res.data.id);
			});
		};

	}]);
