angular.module('geospatial', [
	'ngRoute',
	'ngResource',
	'ngStorage',
	'textAngular'
	])
	.constant('clientTokenPath', '/client-token')
	.config(['$httpProvider', function($httpProvider) {
		// $httpProvider.interceptors.push(function($q, $location,$rootScope) {
		// 	return {
		// 		response: function(response) {
		// 			return response;
		// 		},
		// 		responseError: function(response) {
		// 			console.log('Response: ' );
		// 			console.log(response);
		// 			if (response.status === 401)  {
		// 				$rootScope.message = 'You need to log in.';
		// 				$location.url('/');
		// 			}

		// 			return $q.reject(response);
		// 		}
		// 	};
		// });
	}])
	.run(['$rootScope', '$location', '$http', 'Auth', function ($rootScope, $location, $http, Auth) {
		//Review if user has been authenticated before
		Auth.init();
		$rootScope.$on('$routeChangeError', function(event, next, current) {
			if(current !== undefined)
				$location.url(current.$$route.originalPath);
			else
				$location.url('/');
		});
	  }])
	.constant('policies',{

		'/repo-content': {
			templateUrl: 'assets/template/content/repo-content.html',
			controller: 'RepoContentController'
		},
		'/search': {
			templateUrl: 'assets/template/search/search-main.html',
			controller: 'SearchController'
		},
		'/payment': {
			templateUrl: 'assets/template/payment/payment.html',
			controller: 'PaymentController'
		},
		'/': {
			templateUrl: 'assets/template/dashboard.html',
			controller: 'DashboardController'
		},
		'/repository/import': {
			templateUrl: 'assets/template/repository/import.html',
			controller: 'ImportController'
		},
		'/project/:id': {
			templateUrl: 'assets/template/project/project.html',
			controller: 'ProjectController'
		},

		'/profile/import/:user/:repo': {
			templateUrl: 'assets/template/repository/repo-content.html',
			controller: 'GithubImportController'
		},
		'/profile': {
			templateUrl: 'assets/template/profile/profile.html',
			controller: 'ProfileController'
		},
		'/profile/import': {
			templateUrl: 'assets/template/profile/import.html',
			controller: 'GithubImportController'
		},
		'/profile/import/:user/:repo': {
			templateUrl: 'assets/template/profile/import-project.html',
			controller: 'GithubImportController'
		}

	})
	.config(['$routeProvider', 'policies', function($routeProvider, policies) {

		//Our NOT THAT complex logic for authentification and authorization validation
		var authResolver = function(path) {
		  return {
		    routingMessage : function(Auth, $q, $rootScope) {
				console.log(path)
				var deferred = $q.defer();

				Auth.userHasPermissionForView(path)
					.then(function(msg) {
						console.log(msg);
						deferred.resolve();
					}, function(msg) {
						$rootScope.message = msg;
						deferred.reject();
					});

				return deferred.promise;
			}
		  }
		};

		//Configuring Routes and Auth
		for(path in policies) {
			//Build Route
			var route = {
				templateUrl: policies[path].templateUrl,
				controller: policies[path].controller
			};

			//Sync with server about user status
			route.resolve =  authResolver(path);

			//Register route
			$routeProvider.when(path, route);
		}

		$routeProvider.otherwise({redirectTo: '/'});
	}]);
