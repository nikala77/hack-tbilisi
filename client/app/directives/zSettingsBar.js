angular.module('app')
    .directive('settingsHide', function ($location) {
        return {
            restrict: 'C',
            scope: false,
            link: function (scope, element) {
                function setActive() {
                    var path = $location.path();
                    if (path) {
                        if (path.indexOf('settings') > -1) {
                            element.hide();
                        } else {
                            element.show();
                        }
                    }
                }
                
                setActive();
                scope.$on('$locationChangeSuccess', setActive);
            }
        };
    })
    .directive('settingsShow', function ($location) {
        return {
            restrict: 'C',
            scope: false,
            link: function (scope, element) {
                function setActive() {
                    var path = $location.path();
                    if (path) {
                        if (path.indexOf('settings') > -1) {
                            element.show();
                        } else {
                            element.hide();
                        }
                    }
                }
                
                setActive();
                scope.$on('$locationChangeSuccess', setActive);
            }
        };
    });