angular.module('geospatial')
	.controller('ProfileController', ['$scope', 'ProjectService', function($scope, ProjectService) {

		$scope.projects = ProjectService.getUserProjects($scope.user.id);

	}]);