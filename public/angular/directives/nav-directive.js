angular.module('geospatial')
.directive('activeLink', function () {
    return {
        link: function (scope, element, attrs) {
            element.find('.nav-link a').on('click', function () {
                angular.element(this)
                    .parent().siblings('.active')
                    .removeClass('active');
                angular.element(this)
                    .parent()
                    .addClass('active');
            });
        }
    };
});
