angular.module('geospatial')
	.controller('DashboardController', ['$scope', 'fakeData', function($scope, fakeData) {
		/*
		** declare and assign fake data to the scope variables
		*/
		$scope.myRepos = fakeData.returnFakeMyRepos();
		$scope.boughtRepos = fakeData.returnFakeBoughtRepos();
		$scope.favoriteRepos = fakeData.returnFakeFavoriteRepos();
		$scope.bestRepos = fakeData.returnFakeBestRepos();

		/*
		**  toggle
		*/
		$scope.showMyRepo = false;
		$scope.showBoughtRepo = false;
		$scope.showFavoriteRepo = false;
		$scope.showBestRepo = false;

    $scope.toggleMyRepo = function() {
        $scope.showMyRepo = $scope.showMyRepo === false ? true: false;
    };

		$scope.toggleBoughtRepo = function() {
        $scope.showBoughtRepo = $scope.showBoughtRepo === false ? true: false;
    };

		$scope.toggleFavoriteRepo = function() {
        $scope.showFavoriteRepo = $scope.showFavoriteRepo === false ? true: false;
    };

		$scope.toggleBestRepo = function() {
        $scope.showBestRepo = $scope.showBestRepo === false ? true: false;
    };

}]);
