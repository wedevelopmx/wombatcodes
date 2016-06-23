angular.module('geospatial')
	.service('ProjectService', [ '$resource', function($resource) {
	
	var self = this;
	
	this.projectAPI = 
		$resource('project/:projectId', {projectId: '@id'}, { 
			getUserProjects: { method: 'GET',  isArray:true },
			update: { method: 'PUT' }, 
			delete: { method: 'DELETE', isArray: true }
		});
	
	this.query = function() {
		return self.projectAPI.query();
	}
	
	this.get = function(id) {
		return self.projectAPI.get({projectId:id});
	}

	this.getUserProjects = function(id) {
		return self.projectAPI.getUserProjects({userId:id});	
	}
	
	this.remove = function(id) {
		return self.projectAPI.delete({projectId:id});
	}
	
	this.update = function(id, object) {
		return self.projectAPI.update({projectId:id}, object);
	}
	
	this.save = function(object) {
		return self.projectAPI.save({}, object);
	}

}]);	
