angular.module('geospatial')
	.service('fakeData', function() {

		/************ profile ************/
		var profile = {
			name: 'Jason Warren',
			tech: 'Full stack developer',
			web: 'www.wombatcodes.com',
			contect: '@gmail.com',
			repos: '2',
			purchased: '2',
			favorities: '1',
			profile: 'Donec a dui nulla. Praesent sed sagittis felis. Donec vel efficitur risus, a finibus neque.',
			location: 'London, UK'
		};

    /************ my repos ***********/
    var myrepo1 = {
      name: 'badger project',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non bibendum lorem, at ullamcorper nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas eu aliquam purus, eget tincidunt lacus. Vestibulum ornare porttitor neque. ' ,
      clasification: ['js','java','android'],
      widget: [{chart: 'line', val: '15', title: 'cobertura'},{chart: 'pie', val:'50', title:'sonar'}],
      score : '1' ,
			type: 'github',
      price: '15'
    };
    var myrepo2 = {
      name: 'comapp',
      content: 'Donec tristique ante quis odio mattis, sed dictum quam efficitur. Donec a dui nulla. Praesent sed sagittis felis. Donec vel efficitur risus, a finibus neque.' ,
      clasification: ['js','java','angularjs'],
      widget: [{chart: 'pie', val:'70', title: 'sonar'}],
      score : '1' ,
			type: 'github',
      price: '3'
    };

    /************ bought repos ***********/
    var brepo1 = {
      name: 'yeoma',
      content: 'Duis tempor sapien eget consequat iaculis. Vestibulum euismod nec felis in lobortis. Donec cursus sodales metus, eu tempus augue fermentum a. Aliquam porttitor id magna quis volutpat. Proin sit amet mi nisi.' ,
      clasification: ['js'],
      widget: [{chart: 'line', val: '15', title: 'cobertura'},{chart: 'pie', val:'50', title:'sonar'}],
      score : '1' ,
      price: 'free'
    };
    var brepo2 = {
      name: 'angular braintree',
      content: 'Vestibulum in augue non velit aliquam aliquet. Nam ultricies porta ullamcorper. Nulla ultricies non ex sit amet lobortis. Integer dictum, risus sit amet fermentum tristique, nisi purus consectetur sapien, nec sodales erat est mollis lectus. Mauris at leo faucibus, efficitur augue porttitor, porttitor dolor.' ,
      clasification: ['js','angularjs'],
      widget: [{chart: 'pie', val:'70', title: 'sonar'}],
      score : '1' ,
      price: '3'
    };

    /************ favorite repos ***********/
    var frepo1 = {
      name: 'Campus Party',
      content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...' ,
      clasification: ['video','hackaton'],
      widget: [{chart: 'line', val: '15', title: 'cobertura'}],
      score : '1' ,
      price: 'free'
    };

    /************ best repos ***********/
    var bestrepo1 = {
      name: 'tech crunch',
      content: 'Mauris ut arcu nec quam dignissim sagittis. Phasellus sed lacus in odio egestas euismod. Aliquam orci massa, facilisis eu nulla ac, fringilla bibendum nisi. Vivamus non purus nec sem accumsan aliquet. ' ,
      clasification: ['js','java','android'],
      widget: [{chart: 'line', val: '15', title: 'cobertura'},{chart: 'pie', val:'50', title:'sonar'}],
      score : '1' ,
      price: '15'
    };
    var bestrepo2 = {
      name: 'new threading angularjs',
      content: 'Duis a varius erat, nec dapibus magna. Phasellus tempus laoreet lorem, feugiat vehicula nisl suscipit quis. Suspendisse elementum tellus nisl, sed vehicula lorem scelerisque ullamcorper. ' ,
      clasification: ['js','java','angularjs'],
      widget: [{chart: 'pie', val:'70', title: 'sonar'}],
      score : '1' ,
      price: '3'
    };

		this.returnFakeProfile = function () {
      return profile;
    }

    this.returnFakeMyRepos = function () {
      var myRepos = [myrepo1, myrepo2];
      return myRepos;
    }

    this.returnFakeBoughtRepos = function () {
      var myRepos = [brepo1, brepo2];
      return myRepos;
    }

    this.returnFakeFavoriteRepos = function () {
      var myRepos = [frepo1];
      return myRepos;
    }

    this.returnFakeBestRepos = function () {
      var myRepos = [bestrepo1, bestrepo2];
      return myRepos;
    }

});
