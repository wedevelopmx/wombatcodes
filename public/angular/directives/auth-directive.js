angular.module('geospatial')   
  .directive('permission', ['Auth', '$rootScope', function(Auth, $rootScope) {
     return {
         restrict: 'A',
         scope: {
            permission: '='
         },
         link: function (scope, elem, attrs) {
              $rootScope.$watch('user', function() {
                  if (Auth.userHasPermission(scope.permission)) {
                      $(elem[0]).show();
                  } else {
                      $(elem[0]).hide();
                  }
              });                
         }
     }
  }]);