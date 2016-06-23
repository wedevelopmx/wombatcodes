angular.module('geospatial')
	.controller('DashboardController', ['$scope', 'fakeData', function($scope, fakeData) {
		/*
		** declare and assign fake data to the scope variables
		*/
		$scope.myRepos = fakeData.returnFakeMyRepos();
		$scope.boughtRepos = fakeData.returnFakeBoughtRepos();
		$scope.favoriteRepos = fakeData.returnFakeFavoriteRepos();
		$scope.bestRepos = fakeData.returnFakeBestRepos();

		$scope.showMyRepo = false;
    $scope.toggleMyRepo = function() {
        $scope.showMyRepo = $scope.showMyRepo === false ? true: false;
    };


}]);
