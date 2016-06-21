angular.module('geospatial')
	.controller('GithubImportController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {

		if($routeParams.user == undefined) {
        	$scope.repos = [];
			$http.get('/user/repos').then(function(res) {
			    $scope.repos = res.data;
			});
        } else {
        	$scope.project = {
        		title: '',
			    description: '',
			    pageContent: '',
			    price: '',
			    type: '',
			    githubId: ''
        	};

        	$scope.languages = [];

        	$scope.categories = [];

            $scope.repo = {};

			$http.get('/user/import/' + $routeParams.user + '/' + $routeParams.repo)
				.then(function(res) {
					var colors = ['#009688', '#F44336', '#03A9F4', '#8BC34A', '#FFEB3B'];
					$scope.pieData = [];
					$scope.repo = res.data;

					$scope.project.title = $scope.repo.name;
					$scope.project.description = $scope.repo.description;
					$scope.project.githubId = $scope.repo.id;

					//Pull out languages
					angular.forEach($scope.repo.languages, function(value, key) {
						console.log(value + ' is ' + key);
						$scope.pieData.push({
							label: key,
							data: value,
							color: colors.pop()
						});

						$scope.languages.push({ name: key, lines: value});
					});

					//Graph Languages
                    if($('#donut-chart')[0]){
		                $.plot('#donut-chart', $scope.pieData, {
		                    series: {
		                        pie: {
		                            innerRadius: 0.5,
		                            show: true,
		                            stroke: {
		                                width: 2,
		                            },
		                        },
		                    },
		                    legend: {
		                        container: '.flc-donut',
		                        backgroundOpacity: 0.5,
		                        noColumns: 0,
		                        backgroundColor: "white",
		                        lineWidth: 0
		                    },
		                    grid: {
		                        hoverable: true,
		                        clickable: true
		                    },
		                    tooltip: true,
		                    tooltipOpts: {
		                        content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
		                        shifts: {
		                            x: 20,
		                            y: 0
		                        },
		                        defaultTheme: false,
		                        cssClass: 'flot-tooltip'
		                    }

		                });
		            }

				});
        }

        $scope.categories = [];
        $scope.addCategory = function() {
        	$http.post('/category', { name: $scope.category })
					.then(function(res) {
					$scope.categories.push(res.data);
        			$scope.category = '';
					});
        }

        $scope.removeCategory = function(index) {
        	$scope.categories.splice(index, 1);
        }


				$scope.submitProject = function() {

					/// 1. create the repo web page
					var IndataWebGenerator = {
						path1: $routeParams.user,
						path2: $routeParams.repo,
						path3: "v1",
						html: $scope.project.pageContent
					};

					console.log(IndataWebGenerator);
					// webGenerator(IndataWebGenerator); //-> generate the web page

					/// 2. update the profile with the repo
        	$scope.project.languages = $scope.languages;
        	$scope.project.categories = $scope.categories;
        	$http.post('/project', $scope.project)
					.then(function(res) {
						console.log(res);
						$location.path( "/profile" );
					});

					/// 3. insert repo into elasticsearch searcher
					var rawPageContent = $scope.project.pageContent;
					rawPageContent = String(rawPageContent).replace(/<[^>]+>/gm, ' ');
					console.log(rawPageContent);
					var IndataElasticSearch = {
						cont: $scope.project.rawPageContent ,  // content
						ct: $scope.project.categories ,     // categories
 						scr: ''                            // score
					};
					//insertRepoElasticSearch(IndataElasticSearch ); //--> insert the repo in elastic search


        }


				var webGenerator = function(IndataWebGenerator) {
					console.log("generate");

					/// listen in port 3001
						$http({
							method: 'POST',
							url: 'http://localhost:3001/generator/api/createweb',
							data: IndataWebGenerator
						}).success(function (data)  {

							console.log(data.success);

						}).error(function (error) {
							$scope.message = 'Error: cannot connect to server. Please make sure your server is running.';
							console.log(error);
						});
				}

				var insertRepoElasticSearch = function(IndataElasticSearch ) {
					/// listen in port 9200
					$http({
						method: 'POST',
						url: 'http://localhost:9200/gitrepo/repos/' ,
						data: IndataElasticSearch
					}).success(function (data)  {
						console.log(data.success);
					}).error(function (error) {
						$scope.message = 'Error: cannot connect to server. Please make sure your server is running.';
						console.log(error);
					});
				}

	}]);
