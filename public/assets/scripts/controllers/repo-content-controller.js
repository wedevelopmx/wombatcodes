angular.module('geospatial')
	.controller('RepoContentController', ['$scope', function($scope) {

		$scope.chartPicture = true;
		init();
		function init(){
			$('[ui-jp]').uiJp();
			$('body').uiInclude();
		}

	}]);
