angular.module('geospatial')
	.controller('RepoContentController', ['$scope', 'repoInfo', function($scope, repoInfo) {

		console.log(repoInfo.returnRepoInfo());

		$scope.chartPicture = false;
		$scope.charType = "- - - chart - - -";
		$scope.chartObject = null;


		/*
		** Code for website editor
		*/

		$scope.saveWebsite = function(websiteContent) {


			var project = {
				owner: repoInfo.owner,
				repository: repoInfo.repository,
				id: repoInfo.id,
				content : websiteContent
			};

			console.log(project);

			var jumpUrl = '/#/website/' + project.owner + '/' + project.repository;
			console.log(jumpUrl);

			// hit web generator
			createWebsite();

			//open a new window with the web location
			//console.log(jumpUrl);
			window.open(jumpUrl, '_blank'); // in new tab

			//return to home
			window.location.href = '/#/';


		};

		$scope.skipToProfileWithURL = function(url) {
			window.location.href = '/#/profile';
		};

		$scope.skipToProfileWithoutURL = function() {
			window.location.href = '/#/profile';
		};

		/*
		**  Hit the web creator
		*/

		var createWebsite = function(project) {



			console.log(project);
			console.log("generate");
				$http({
					method: 'POST',
					url: 'http://localhost:3000/project/api/webcreator',
					data: project
				}).success(function (data)  {

					console.log(data.success);

				}).error(function (error) {
					$scope.message = 'Error: cannot connect to server. Please make sure your server is running.';
					$scope.showDropinContainer = false;
					$scope.isError = true;
				});
		};



	//	var context = document.getElementById("canvas").getContext("2d");
	//	$scope.chartObject = new Chart(context);


		$scope.skipToProfileWithURL = function(url) {
			window.location.href = '/#/profile';
		};

		$scope.skipToProfileWithoutURL = function() {
			window.location.href = '/#/profile';
		};

		$scope.clearChart = function() {
			$scope.chartPicture = false;
		};

	/*	$scope.$watch('charType', function() {
			if($scope.charType == "- - - chart - - -") {
				$scope.chartPicture = false;
			}
			else if($scope.charType=="Doughnut") {
				console.log("doughnut");
				$scope.chartPicture = true;
				// doughnut chart
				var pieData = [
					{
						value: 35,
						color:"#FFCDD2"
					},
					{
						value : 100-35,
						color : "#F44336"
					}
				];

				$scope.chartObject.Doughnut(pieData);
			}
			else if($scope.charType=="Line") {
				$scope.chartPicture = true;
				//// line chart
				var barData = {
				labels: ['Italy', 'UK', 'USA', 'Germany', 'France', 'Japan'],
				datasets: [
					{
						 label: '2010 customers #',
						 fillColor: '#fff',
						 strokeColor: '#FF9800',
						 pointColor: '#FF9800',
						 data: [2500, 1902, 1041, 610, 1245, 952]
					}
				]
				};

				$scope.chartObject.Line(barData);
			}

    }, true); */

		$scope.selectChart = function(chart) {
			$scope.chartPicture = true;
			console.log($scope.chartPicture);
			if(chart==1) {
				// doughnut chart
				var pieData = [
		    	{
		        value: 35,
		        color:"#FFCDD2"
		      },
		      {
		        value : 100-35,
						color : "#F44336"
		      }
		    ];

		    var myPie = new Chart(document.getElementById("canvas").getContext("2d")).Doughnut(pieData,{percentageInnerCutout : 80});
			}
			else if(chart==2) {
				//// line chart
				var barData = {
		 		labels: ['Italy', 'UK', 'USA', 'Germany', 'France', 'Japan'],
		 		datasets: [
					{
						 label: '2010 customers #',
						 fillColor: '#fff',
						 strokeColor: '#FF9800',
		    		 pointColor: '#FF9800',
						 data: [2500, 1902, 1041, 610, 1245, 952]
				 	}
		 		]
				};

				var context = document.getElementById('canvas').getContext('2d');
				var clientsChart = new Chart(context).Line(barData);
			}
		};


	}]);
