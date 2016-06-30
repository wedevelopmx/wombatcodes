angular.module('geospatial')
	.controller('ProfileController', ['$scope', 'fakeData', function($scope, fakeData) {

		/*
		** declare and assign fake data to the scope variables
		*/
		$scope.userProfile = fakeData.returnFakeProfile();


	}]);
