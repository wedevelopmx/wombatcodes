angular.module('geospatial')
	.controller('MainController', ['$scope', 'Auth', '$location', function($scope, Auth, $location){
		$scope.toggleSidebar = function() {
			if($('#sidebar').hasClass('toggled'))
				$('#sidebar').removeClass('toggled')
			else
				$('#sidebar').addClass('toggled')
		};

		$scope.logout =function() {
			Auth.logout();
			$location.url('/');
		}
	}]);