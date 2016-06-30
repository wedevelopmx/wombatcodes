angular.module('geospatial')
	.service('repoInfo', function() {

		var owner = "";
		var repository = "";
		var id = "";

		this.setRepoInfo = function (ownerInfo, repositoryInfo, idInfo) {
			owner = ownerInfo;
			var repository = repositoryInfo;
			var id = idInfo;
    }

		this.returnRepoInfo = function () {

			var info = {
				owner: owner,
				repository : repository,
				id: id
			};

			return info;
    }


 });
