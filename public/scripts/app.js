/// <reference path="../../typings/angularjs/angular.d.ts"/>
angular.module('app', [
    'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.calendar',
    'angularSpectrumColorpicker', 'ui.select', 'ngImgCrop', 'ngFileUpload', 'ngAutocomplete',
    'monospaced.elastic', 'smartArea', 'angular-sortable-view', 'angular-jwt'
]);

angular.module('app').config(['$routeProvider', '$locationProvider', '$httpProvider', '$provide', 'uiSelectConfig', function ($routeProvider, $locationProvider, $httpProvider, $provide, uiSelectConfig) {
    Raygun.init('oiIY1Dn+9RrZk8tOk3Jahw=='); // TODO: implement a new way to get ApiKey
    $.cookie.json = true;
    
    $provide.decorator('$exceptionHandler', ['$delegate', function($delegate) {
        return function(err, cause) {
            console.log('[App unhandled error]', err, cause);
            Raygun.send(err);
            $delegate(err, cause);
        };
    }]);
    
    var routeRoleChecks = {
        admin: {
            auth: function (zAuth) {
                return zAuth.authorizeCurrentUserForRoute('admin');
            }
        },
        loggedIn: {
            auth: function (zAuth) {
                return zAuth.loggedIn();
            }
        }
    };

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/not-found', {
            templateUrl: 'views/landing/not-found.html'
        })
        .when('/', {
            templateUrl: 'views/landing/home.html'
        })
        .when('/login', {
            templateUrl: 'views/account/login.html',
            controller: 'zLoginCtrl'
        })
        .when('/verify/:id', {
            templateUrl: 'views/account/token.html',
            controller: 'zTokenCtrl'
        })
        .when('/signup', {
            templateUrl: 'views/account/signup.html',
            controller: 'zSignupCtrl'
        })
        .when('/signup-confirm', {
            templateUrl: 'views/account/signup-confirm.html',
            controller: 'zSignupConfirmCtrl'
        })
        .when('/new-owner', {
            templateUrl: 'views/account/new-owner.html',
            controller: 'zNewOwnerCtrl'
        })
        .when('/lostpassword', {
            templateUrl: 'views/account/lostpassword.html',
            controller: 'zLostPasswordCtrl'
        })
        .when('/dashboard', {
            templateUrl: 'views/dashboard/dashboard/dashboard.html',
            controller: 'zDashboardCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/dashboard/dashboards', {
            templateUrl: 'views/dashboard/dashboards/dashboard-list.html',
            controller: 'zDashboardListCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/dashboard/new', {
            templateUrl: 'views/dashboard/dashboards/dashboard-new.html',
            controller: 'zDashboardNewCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/clients', {
            templateUrl: 'views/dashboard/clients/client.html',
            controller: 'zClientCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/clients/new', {
            templateUrl: 'views/dashboard/clients/client-new.html',
            controller: 'zClientNewCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/clients/:_id', {
            templateUrl: 'views/dashboard/clients/client.html',
            controller: 'zClientCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/clients/:_id/edit', {
            templateUrl: 'views/dashboard/clients/client-edit.html',
            controller: 'zClientEditCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/appointments', {
            templateUrl: 'views/dashboard/appointments/appointments.html',
            controller: 'zAppointmentsCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        // TODO: delete
        .when('/appointments/:id/edit', {
            templateUrl: 'views/dashboard/appointments/appointment-edit.html',
            controller: 'zAppointmentEditCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/appointments/settings', {
            redirectTo: '/appointments/settings/resources'
        })
        .when('/appointments/settings/resources', {
            templateUrl: 'views/dashboard/appointments/resources/resource-list.html',
            controller: 'zResourceListCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/appointments/settings/resources/new', {
            templateUrl: 'views/dashboard/appointments/resources/resource-new.html',
            controller: 'zResourceNewCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/appointments/settings/resources/:id/edit', {
            templateUrl: 'views/dashboard/appointments/resources/resource-edit.html',
            controller: 'zResourceEditCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/appointments/settings/resources/:id/avaliable-times', {
            templateUrl: 'views/dashboard/appointments/resources/resource-week-av-times.html',
            controller: 'zResourceWeekAvTimesCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/appointments/settings/resources/:id', {
            templateUrl: 'views/dashboard/appointments/resources/resource-details.html',
            controller: 'zResourceDetailsCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/appointments/settings/templates', {
            templateUrl: 'views/dashboard/appointments/templates/appointmentTemplate-list.html',
            controller: 'zAppointmentTemplateListCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/appointments/settings/templates/new', {
            templateUrl: 'views/dashboard/appointments/templates/appointmentTemplate-new.html',
            controller: 'zAppointmentTemplateNewCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/appointments/settings/templates/:id/edit', {
            templateUrl: 'views/dashboard/appointments/templates/appointmentTemplate-edit.html',
            controller: 'zAppointmentTemplateEditCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/appointments/settings/templates/:id', {
            templateUrl: 'views/dashboard/appointments/templates/appointmentTemplate-details.html',
            controller: 'zAppointmentTemplateDetailsCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/accounts', {
            templateUrl: 'views/dashboard/accounts/accounts.html',
            controller: 'zAccountsCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/communication', {
            redirectTo: '/communication/events'
        }) 
        .when('/communication/call', {
            templateUrl: 'views/dashboard/communication/call/call-edit.html',
            controller: 'zCallEditCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/communication/note', {
            templateUrl: 'views/dashboard/communication/events/event-edit-note.html',
            controller: 'zEventEditCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/communication/events', {
            templateUrl: 'views/dashboard/communication/events/event-list.html',
            controller: 'zEventListCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/communication/events/:id', {
            templateUrl: 'views/dashboard/communication/events/event-detail.html',
            controller: 'zEventDetailCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/communication/lists', {
            templateUrl: 'views/dashboard/communication/lists/list-list.html',
            controller: 'zListListCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/communication/lists/:id', {
            templateUrl: 'views/dashboard/communication/lists/list-detail.html',
            controller: 'zListDetailCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/communication/lists/:id/edit', {
            templateUrl: 'views/dashboard/communication/lists/list-edit.html',
            controller: 'zListDetailCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/communication/message/user', {
            templateUrl: 'views/dashboard/communication/events/event-edit-user-message.html',
            controller: 'zEventEditUserMessageCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/communication/message', {
            templateUrl: 'views/dashboard/communication/message/message-send.html',
            controller: 'zMessageSendCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/communication/settings', {
            redirectTo: '/communication/settings/templates'
        })
        .when('/communication/settings/templates', {
            templateUrl: 'views/dashboard/communication/templates/template-list.html',
            controller: 'zTemplateListCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/communication/settings/template/:id/edit', {
            templateUrl: 'views/dashboard/communication/templates/template-edit.html',
            controller: 'zTemplateEditCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/communication/settings/template/:id', {
            templateUrl: 'views/dashboard/communication/templates/template-detail.html',
            controller: 'zTemplateDetailCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/settings', {
            redirectTo: '/settings/profile'
        })
        .when('/settings/profile', {
            templateUrl: 'views/dashboard/settings/profile/profile-details.html',
            controller: 'zProfileDetailsCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/settings/profile/edit', {
            templateUrl: 'views/dashboard/settings/profile/profile-edit.html',
            controller: 'zProfileEditCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/settings/account', {
            templateUrl: 'views/dashboard/settings/account/account-details.html',
            controller: 'zSiteAccountDetails',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/settings/users', {
            templateUrl: 'views/dashboard/settings/users/user-list.html',
            controller: 'zUserListCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/settings/users/new', {
            templateUrl: 'views/dashboard/settings/users/user-new.html',
            controller: 'zUserNewCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/settings/users/:id/edit', {
            templateUrl: 'views/dashboard/settings/users/user-edit.html',
            controller: 'zUserEditCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/settings/users/:id', {
            templateUrl: 'views/dashboard/settings/users/user-details.html',
            controller: 'zUserDetailsCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/settings/api', {
            templateUrl: 'views/dashboard/settings/apis/api-list.html',
            controller: 'zApiListCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/settings/api/new', {
            templateUrl: 'views/dashboard/settings/apis/api-new.html',
            controller: 'zApiNewCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/settings/api/:id', {
            templateUrl: 'views/dashboard/settings/apis/api-details.html',
            controller: 'zApiDetailsCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/settings/api/:id/edit', {
            templateUrl: 'views/dashboard/settings/apis/api-edit.html',
            controller: 'zApiEditCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/settings/sites/new', {
            templateUrl: 'views/dashboard/settings/sites/site-new.html',
            controller: 'zSiteNewCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/settings/sites', {
            templateUrl: 'views/dashboard/settings/sites/site-list.html',
            controller: 'zSiteListCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/settings/sites/:id', {
            templateUrl: 'views/dashboard/settings/sites/site-details.html',
            controller: 'zSiteDetailsCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .when('/settings/sites/:id/edit', {
            templateUrl: 'views/dashboard/settings/sites/site-edit.html',
            controller: 'zSiteEditCtrl',
            resolve: routeRoleChecks.loggedIn
        })
        .otherwise({
          redirectTo: '/not-found'
        });

    uiSelectConfig.theme = 'bootstrap';

    $httpProvider.interceptors.push('zAuthInterceptor');

    $httpProvider.defaults.transformResponse.push(function (responseData) {
        convertDateStringsToDates(responseData);
        return responseData;
    });
    
    // TODO: is required?
    var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;
    function convertDateStringsToDates(input) {
        // Ignore things that aren't objects.
        if (typeof input !== 'object') {
          return input;
        }
        for (var key in input) {
            if (!input.hasOwnProperty(key)) {
              continue;
            }
            var value = input[key];
            var match;
            // Check for string properties which look like dates.
            if (typeof value === 'string' && (match = value.match(regexIso8601))) {
                var milliseconds = Date.parse(match[0]);
                if (!isNaN(milliseconds)) {
                    input[key] = new Date(milliseconds);
                }
            } else if (typeof value === 'object') {
                // Recurse into object
                convertDateStringsToDates(value);
            }
        }
    }
}]);

angular.module('app').run(['$rootScope', '$location', 'zNotifier', function ($rootScope, $location, zNotifier) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized' || rejection === 'not authenticated') {
            zNotifier.info('You need to login');
            var redirectPath = encodeURIComponent($location.path());
            $location.path('/login').search({
                redirect: redirectPath
            });
        }
    });
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBLFFBQVEsT0FBTyxPQUFPO0lBQ2xCLGNBQWMsV0FBVyxnQkFBZ0I7SUFDekMsOEJBQThCLGFBQWEsYUFBYSxnQkFBZ0I7SUFDeEUsc0JBQXNCLGFBQWEseUJBQXlCOzs7QUFHaEUsUUFBUSxPQUFPLE9BQU8sOEZBQU8sVUFBVSxnQkFBZ0IsbUJBQW1CLGVBQWUsVUFBVSxnQkFBZ0I7SUFDL0csT0FBTyxLQUFLO0lBQ1osRUFBRSxPQUFPLE9BQU87O0lBRWhCLFNBQVMsVUFBVSxtQ0FBcUIsU0FBUyxXQUFXO1FBQ3hELE9BQU8sU0FBUyxLQUFLLE9BQU87WUFDeEIsUUFBUSxJQUFJLHlCQUF5QixLQUFLO1lBQzFDLE9BQU8sS0FBSztZQUNaLFVBQVUsS0FBSzs7OztJQUl2QixJQUFJLGtCQUFrQjtRQUNsQixPQUFPO1lBQ0gsTUFBTSxVQUFVLE9BQU87Z0JBQ25CLE9BQU8sTUFBTSw2QkFBNkI7OztRQUdsRCxVQUFVO1lBQ04sTUFBTSxVQUFVLE9BQU87Z0JBQ25CLE9BQU8sTUFBTTs7Ozs7SUFLekIsa0JBQWtCLFVBQVU7SUFDNUI7U0FDSyxLQUFLLGNBQWM7WUFDaEIsYUFBYTs7U0FFaEIsS0FBSyxLQUFLO1lBQ1AsYUFBYTs7U0FFaEIsS0FBSyxVQUFVO1lBQ1osYUFBYTtZQUNiLFlBQVk7O1NBRWYsS0FBSyxlQUFlO1lBQ2pCLGFBQWE7WUFDYixZQUFZOztTQUVmLEtBQUssV0FBVztZQUNiLGFBQWE7WUFDYixZQUFZOztTQUVmLEtBQUssbUJBQW1CO1lBQ3JCLGFBQWE7WUFDYixZQUFZOztTQUVmLEtBQUssY0FBYztZQUNoQixhQUFhO1lBQ2IsWUFBWTs7U0FFZixLQUFLLGlCQUFpQjtZQUNuQixhQUFhO1lBQ2IsWUFBWTs7U0FFZixLQUFLLGNBQWM7WUFDaEIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyx5QkFBeUI7WUFDM0IsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyxrQkFBa0I7WUFDcEIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyxZQUFZO1lBQ2QsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyxnQkFBZ0I7WUFDbEIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyxpQkFBaUI7WUFDbkIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyxzQkFBc0I7WUFDeEIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyxpQkFBaUI7WUFDbkIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7O1NBRzVCLEtBQUssMEJBQTBCO1lBQzVCLGFBQWE7WUFDYixZQUFZO1lBQ1osU0FBUyxnQkFBZ0I7O1NBRTVCLEtBQUssMEJBQTBCO1lBQzVCLFlBQVk7O1NBRWYsS0FBSyxvQ0FBb0M7WUFDdEMsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyx3Q0FBd0M7WUFDMUMsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyw2Q0FBNkM7WUFDL0MsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyx3REFBd0Q7WUFDMUQsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyx3Q0FBd0M7WUFDMUMsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyxvQ0FBb0M7WUFDdEMsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyx3Q0FBd0M7WUFDMUMsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyw2Q0FBNkM7WUFDL0MsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyx3Q0FBd0M7WUFDMUMsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyxhQUFhO1lBQ2YsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyxrQkFBa0I7WUFDcEIsWUFBWTs7U0FFZixLQUFLLHVCQUF1QjtZQUN6QixhQUFhO1lBQ2IsWUFBWTtZQUNaLFNBQVMsZ0JBQWdCOztTQUU1QixLQUFLLHVCQUF1QjtZQUN6QixhQUFhO1lBQ2IsWUFBWTtZQUNaLFNBQVMsZ0JBQWdCOztTQUU1QixLQUFLLHlCQUF5QjtZQUMzQixhQUFhO1lBQ2IsWUFBWTtZQUNaLFNBQVMsZ0JBQWdCOztTQUU1QixLQUFLLDZCQUE2QjtZQUMvQixhQUFhO1lBQ2IsWUFBWTtZQUNaLFNBQVMsZ0JBQWdCOztTQUU1QixLQUFLLHdCQUF3QjtZQUMxQixhQUFhO1lBQ2IsWUFBWTtZQUNaLFNBQVMsZ0JBQWdCOztTQUU1QixLQUFLLDRCQUE0QjtZQUM5QixhQUFhO1lBQ2IsWUFBWTtZQUNaLFNBQVMsZ0JBQWdCOztTQUU1QixLQUFLLGlDQUFpQztZQUNuQyxhQUFhO1lBQ2IsWUFBWTtZQUNaLFNBQVMsZ0JBQWdCOztTQUU1QixLQUFLLCtCQUErQjtZQUNqQyxhQUFhO1lBQ2IsWUFBWTtZQUNaLFNBQVMsZ0JBQWdCOztTQUU1QixLQUFLLDBCQUEwQjtZQUM1QixhQUFhO1lBQ2IsWUFBWTtZQUNaLFNBQVMsZ0JBQWdCOztTQUU1QixLQUFLLDJCQUEyQjtZQUM3QixZQUFZOztTQUVmLEtBQUsscUNBQXFDO1lBQ3ZDLGFBQWE7WUFDYixZQUFZO1lBQ1osU0FBUyxnQkFBZ0I7O1NBRTVCLEtBQUssNkNBQTZDO1lBQy9DLGFBQWE7WUFDYixZQUFZO1lBQ1osU0FBUyxnQkFBZ0I7O1NBRTVCLEtBQUssd0NBQXdDO1lBQzFDLGFBQWE7WUFDYixZQUFZO1lBQ1osU0FBUyxnQkFBZ0I7O1NBRTVCLEtBQUssYUFBYTtZQUNmLFlBQVk7O1NBRWYsS0FBSyxxQkFBcUI7WUFDdkIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSywwQkFBMEI7WUFDNUIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyxxQkFBcUI7WUFDdkIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyxtQkFBbUI7WUFDckIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyx1QkFBdUI7WUFDekIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyw0QkFBNEI7WUFDOUIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyx1QkFBdUI7WUFDekIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyxpQkFBaUI7WUFDbkIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyxxQkFBcUI7WUFDdkIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyxxQkFBcUI7WUFDdkIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSywwQkFBMEI7WUFDNUIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyx1QkFBdUI7WUFDekIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyxtQkFBbUI7WUFDckIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyx1QkFBdUI7WUFDekIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsS0FBSyw0QkFBNEI7WUFDOUIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTLGdCQUFnQjs7U0FFNUIsVUFBVTtVQUNULFlBQVk7OztJQUdsQixlQUFlLFFBQVE7O0lBRXZCLGNBQWMsYUFBYSxLQUFLOztJQUVoQyxjQUFjLFNBQVMsa0JBQWtCLEtBQUssVUFBVSxjQUFjO1FBQ2xFLDBCQUEwQjtRQUMxQixPQUFPOzs7O0lBSVgsSUFBSSxlQUFlO0lBQ25CLFNBQVMsMEJBQTBCLE9BQU87O1FBRXRDLElBQUksT0FBTyxVQUFVLFVBQVU7VUFDN0IsT0FBTzs7UUFFVCxLQUFLLElBQUksT0FBTyxPQUFPO1lBQ25CLElBQUksQ0FBQyxNQUFNLGVBQWUsTUFBTTtjQUM5Qjs7WUFFRixJQUFJLFFBQVEsTUFBTTtZQUNsQixJQUFJOztZQUVKLElBQUksT0FBTyxVQUFVLGFBQWEsUUFBUSxNQUFNLE1BQU0sZ0JBQWdCO2dCQUNsRSxJQUFJLGVBQWUsS0FBSyxNQUFNLE1BQU07Z0JBQ3BDLElBQUksQ0FBQyxNQUFNLGVBQWU7b0JBQ3RCLE1BQU0sT0FBTyxJQUFJLEtBQUs7O21CQUV2QixJQUFJLE9BQU8sVUFBVSxVQUFVOztnQkFFbEMsMEJBQTBCOzs7Ozs7QUFNMUMsUUFBUSxPQUFPLE9BQU8sNkNBQUksVUFBVSxZQUFZLFdBQVcsV0FBVztJQUNsRSxXQUFXLElBQUkscUJBQXFCLFVBQVUsS0FBSyxTQUFTLFVBQVUsV0FBVztRQUM3RSxJQUFJLGNBQWMsb0JBQW9CLGNBQWMscUJBQXFCO1lBQ3JFLFVBQVUsS0FBSztZQUNmLElBQUksZUFBZSxtQkFBbUIsVUFBVTtZQUNoRCxVQUFVLEtBQUssVUFBVSxPQUFPO2dCQUM1QixVQUFVOzs7OztBQUsxQiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vdHlwaW5ncy9hbmd1bGFyanMvYW5ndWxhci5kLnRzXCIvPlxuYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgICAnbmdSZXNvdXJjZScsICduZ1JvdXRlJywgJ3VpLmJvb3RzdHJhcCcsICd1aS5jYWxlbmRhcicsXG4gICAgJ2FuZ3VsYXJTcGVjdHJ1bUNvbG9ycGlja2VyJywgJ3VpLnNlbGVjdCcsICduZ0ltZ0Nyb3AnLCAnbmdGaWxlVXBsb2FkJywgJ25nQXV0b2NvbXBsZXRlJyxcbiAgICAnbW9ub3NwYWNlZC5lbGFzdGljJywgJ3NtYXJ0QXJlYScsICdhbmd1bGFyLXNvcnRhYmxlLXZpZXcnLCAnYW5ndWxhci1qd3QnXG5dKTtcblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyLCAkaHR0cFByb3ZpZGVyLCAkcHJvdmlkZSwgdWlTZWxlY3RDb25maWcpIHtcbiAgICBSYXlndW4uaW5pdCgnb2lJWTFEbis5UnJaazh0T2szSmFodz09Jyk7IC8vIFRPRE86IGltcGxlbWVudCBhIG5ldyB3YXkgdG8gZ2V0IEFwaUtleVxuICAgICQuY29va2llLmpzb24gPSB0cnVlO1xuICAgIFxuICAgICRwcm92aWRlLmRlY29yYXRvcignJGV4Y2VwdGlvbkhhbmRsZXInLCBmdW5jdGlvbigkZGVsZWdhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGVyciwgY2F1c2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbQXBwIHVuaGFuZGxlZCBlcnJvcl0nLCBlcnIsIGNhdXNlKTtcbiAgICAgICAgICAgIFJheWd1bi5zZW5kKGVycik7XG4gICAgICAgICAgICAkZGVsZWdhdGUoZXJyLCBjYXVzZSk7XG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgXG4gICAgdmFyIHJvdXRlUm9sZUNoZWNrcyA9IHtcbiAgICAgICAgYWRtaW46IHtcbiAgICAgICAgICAgIGF1dGg6IGZ1bmN0aW9uICh6QXV0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB6QXV0aC5hdXRob3JpemVDdXJyZW50VXNlckZvclJvdXRlKCdhZG1pbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBsb2dnZWRJbjoge1xuICAgICAgICAgICAgYXV0aDogZnVuY3Rpb24gKHpBdXRoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHpBdXRoLmxvZ2dlZEluKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAgIC53aGVuKCcvbm90LWZvdW5kJywge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9sYW5kaW5nL25vdC1mb3VuZC5odG1sJ1xuICAgICAgICB9KVxuICAgICAgICAud2hlbignLycsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvbGFuZGluZy9ob21lLmh0bWwnXG4gICAgICAgIH0pXG4gICAgICAgIC53aGVuKCcvbG9naW4nLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2FjY291bnQvbG9naW4uaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnekxvZ2luQ3RybCdcbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy92ZXJpZnkvOmlkJywge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9hY2NvdW50L3Rva2VuLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3pUb2tlbkN0cmwnXG4gICAgICAgIH0pXG4gICAgICAgIC53aGVuKCcvc2lnbnVwJywge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9hY2NvdW50L3NpZ251cC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6U2lnbnVwQ3RybCdcbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9zaWdudXAtY29uZmlybScsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvYWNjb3VudC9zaWdudXAtY29uZmlybS5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6U2lnbnVwQ29uZmlybUN0cmwnXG4gICAgICAgIH0pXG4gICAgICAgIC53aGVuKCcvbmV3LW93bmVyJywge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9hY2NvdW50L25ldy1vd25lci5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6TmV3T3duZXJDdHJsJ1xuICAgICAgICB9KVxuICAgICAgICAud2hlbignL2xvc3RwYXNzd29yZCcsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvYWNjb3VudC9sb3N0cGFzc3dvcmQuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnekxvc3RQYXNzd29yZEN0cmwnXG4gICAgICAgIH0pXG4gICAgICAgIC53aGVuKCcvZGFzaGJvYXJkJywge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9kYXNoYm9hcmQvZGFzaGJvYXJkL2Rhc2hib2FyZC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6RGFzaGJvYXJkQ3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MubG9nZ2VkSW5cbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9kYXNoYm9hcmQvZGFzaGJvYXJkcycsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZGFzaGJvYXJkL2Rhc2hib2FyZHMvZGFzaGJvYXJkLWxpc3QuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnekRhc2hib2FyZExpc3RDdHJsJyxcbiAgICAgICAgICAgIHJlc29sdmU6IHJvdXRlUm9sZUNoZWNrcy5sb2dnZWRJblxuICAgICAgICB9KVxuICAgICAgICAud2hlbignL2Rhc2hib2FyZC9uZXcnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9kYXNoYm9hcmRzL2Rhc2hib2FyZC1uZXcuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnekRhc2hib2FyZE5ld0N0cmwnLFxuICAgICAgICAgICAgcmVzb2x2ZTogcm91dGVSb2xlQ2hlY2tzLmxvZ2dlZEluXG4gICAgICAgIH0pXG4gICAgICAgIC53aGVuKCcvY2xpZW50cycsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZGFzaGJvYXJkL2NsaWVudHMvY2xpZW50Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3pDbGllbnRDdHJsJyxcbiAgICAgICAgICAgIHJlc29sdmU6IHJvdXRlUm9sZUNoZWNrcy5sb2dnZWRJblxuICAgICAgICB9KVxuICAgICAgICAud2hlbignL2NsaWVudHMvbmV3Jywge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9kYXNoYm9hcmQvY2xpZW50cy9jbGllbnQtbmV3Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3pDbGllbnROZXdDdHJsJyxcbiAgICAgICAgICAgIHJlc29sdmU6IHJvdXRlUm9sZUNoZWNrcy5sb2dnZWRJblxuICAgICAgICB9KVxuICAgICAgICAud2hlbignL2NsaWVudHMvOl9pZCcsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZGFzaGJvYXJkL2NsaWVudHMvY2xpZW50Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3pDbGllbnRDdHJsJyxcbiAgICAgICAgICAgIHJlc29sdmU6IHJvdXRlUm9sZUNoZWNrcy5sb2dnZWRJblxuICAgICAgICB9KVxuICAgICAgICAud2hlbignL2NsaWVudHMvOl9pZC9lZGl0Jywge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9kYXNoYm9hcmQvY2xpZW50cy9jbGllbnQtZWRpdC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6Q2xpZW50RWRpdEN0cmwnLFxuICAgICAgICAgICAgcmVzb2x2ZTogcm91dGVSb2xlQ2hlY2tzLmxvZ2dlZEluXG4gICAgICAgIH0pXG4gICAgICAgIC53aGVuKCcvYXBwb2ludG1lbnRzJywge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9kYXNoYm9hcmQvYXBwb2ludG1lbnRzL2FwcG9pbnRtZW50cy5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6QXBwb2ludG1lbnRzQ3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MubG9nZ2VkSW5cbiAgICAgICAgfSlcbiAgICAgICAgLy8gVE9ETzogZGVsZXRlXG4gICAgICAgIC53aGVuKCcvYXBwb2ludG1lbnRzLzppZC9lZGl0Jywge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9kYXNoYm9hcmQvYXBwb2ludG1lbnRzL2FwcG9pbnRtZW50LWVkaXQuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnekFwcG9pbnRtZW50RWRpdEN0cmwnLFxuICAgICAgICAgICAgcmVzb2x2ZTogcm91dGVSb2xlQ2hlY2tzLmxvZ2dlZEluXG4gICAgICAgIH0pXG4gICAgICAgIC53aGVuKCcvYXBwb2ludG1lbnRzL3NldHRpbmdzJywge1xuICAgICAgICAgICAgcmVkaXJlY3RUbzogJy9hcHBvaW50bWVudHMvc2V0dGluZ3MvcmVzb3VyY2VzJ1xuICAgICAgICB9KVxuICAgICAgICAud2hlbignL2FwcG9pbnRtZW50cy9zZXR0aW5ncy9yZXNvdXJjZXMnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvcmVzb3VyY2VzL3Jlc291cmNlLWxpc3QuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnelJlc291cmNlTGlzdEN0cmwnLFxuICAgICAgICAgICAgcmVzb2x2ZTogcm91dGVSb2xlQ2hlY2tzLmxvZ2dlZEluXG4gICAgICAgIH0pXG4gICAgICAgIC53aGVuKCcvYXBwb2ludG1lbnRzL3NldHRpbmdzL3Jlc291cmNlcy9uZXcnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvcmVzb3VyY2VzL3Jlc291cmNlLW5ldy5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6UmVzb3VyY2VOZXdDdHJsJyxcbiAgICAgICAgICAgIHJlc29sdmU6IHJvdXRlUm9sZUNoZWNrcy5sb2dnZWRJblxuICAgICAgICB9KVxuICAgICAgICAud2hlbignL2FwcG9pbnRtZW50cy9zZXR0aW5ncy9yZXNvdXJjZXMvOmlkL2VkaXQnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvcmVzb3VyY2VzL3Jlc291cmNlLWVkaXQuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnelJlc291cmNlRWRpdEN0cmwnLFxuICAgICAgICAgICAgcmVzb2x2ZTogcm91dGVSb2xlQ2hlY2tzLmxvZ2dlZEluXG4gICAgICAgIH0pXG4gICAgICAgIC53aGVuKCcvYXBwb2ludG1lbnRzL3NldHRpbmdzL3Jlc291cmNlcy86aWQvYXZhbGlhYmxlLXRpbWVzJywge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9kYXNoYm9hcmQvYXBwb2ludG1lbnRzL3Jlc291cmNlcy9yZXNvdXJjZS13ZWVrLWF2LXRpbWVzLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3pSZXNvdXJjZVdlZWtBdlRpbWVzQ3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MubG9nZ2VkSW5cbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9hcHBvaW50bWVudHMvc2V0dGluZ3MvcmVzb3VyY2VzLzppZCcsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZGFzaGJvYXJkL2FwcG9pbnRtZW50cy9yZXNvdXJjZXMvcmVzb3VyY2UtZGV0YWlscy5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6UmVzb3VyY2VEZXRhaWxzQ3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MubG9nZ2VkSW5cbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9hcHBvaW50bWVudHMvc2V0dGluZ3MvdGVtcGxhdGVzJywge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9kYXNoYm9hcmQvYXBwb2ludG1lbnRzL3RlbXBsYXRlcy9hcHBvaW50bWVudFRlbXBsYXRlLWxpc3QuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnekFwcG9pbnRtZW50VGVtcGxhdGVMaXN0Q3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MubG9nZ2VkSW5cbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9hcHBvaW50bWVudHMvc2V0dGluZ3MvdGVtcGxhdGVzL25ldycsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZGFzaGJvYXJkL2FwcG9pbnRtZW50cy90ZW1wbGF0ZXMvYXBwb2ludG1lbnRUZW1wbGF0ZS1uZXcuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnekFwcG9pbnRtZW50VGVtcGxhdGVOZXdDdHJsJyxcbiAgICAgICAgICAgIHJlc29sdmU6IHJvdXRlUm9sZUNoZWNrcy5sb2dnZWRJblxuICAgICAgICB9KVxuICAgICAgICAud2hlbignL2FwcG9pbnRtZW50cy9zZXR0aW5ncy90ZW1wbGF0ZXMvOmlkL2VkaXQnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvdGVtcGxhdGVzL2FwcG9pbnRtZW50VGVtcGxhdGUtZWRpdC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6QXBwb2ludG1lbnRUZW1wbGF0ZUVkaXRDdHJsJyxcbiAgICAgICAgICAgIHJlc29sdmU6IHJvdXRlUm9sZUNoZWNrcy5sb2dnZWRJblxuICAgICAgICB9KVxuICAgICAgICAud2hlbignL2FwcG9pbnRtZW50cy9zZXR0aW5ncy90ZW1wbGF0ZXMvOmlkJywge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9kYXNoYm9hcmQvYXBwb2ludG1lbnRzL3RlbXBsYXRlcy9hcHBvaW50bWVudFRlbXBsYXRlLWRldGFpbHMuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnekFwcG9pbnRtZW50VGVtcGxhdGVEZXRhaWxzQ3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MubG9nZ2VkSW5cbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9hY2NvdW50cycsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZGFzaGJvYXJkL2FjY291bnRzL2FjY291bnRzLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3pBY2NvdW50c0N0cmwnLFxuICAgICAgICAgICAgcmVzb2x2ZTogcm91dGVSb2xlQ2hlY2tzLmxvZ2dlZEluXG4gICAgICAgIH0pXG4gICAgICAgIC53aGVuKCcvY29tbXVuaWNhdGlvbicsIHtcbiAgICAgICAgICAgIHJlZGlyZWN0VG86ICcvY29tbXVuaWNhdGlvbi9ldmVudHMnXG4gICAgICAgIH0pIFxuICAgICAgICAud2hlbignL2NvbW11bmljYXRpb24vY2FsbCcsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZGFzaGJvYXJkL2NvbW11bmljYXRpb24vY2FsbC9jYWxsLWVkaXQuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnekNhbGxFZGl0Q3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MubG9nZ2VkSW5cbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9jb21tdW5pY2F0aW9uL25vdGUnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9jb21tdW5pY2F0aW9uL2V2ZW50cy9ldmVudC1lZGl0LW5vdGUuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnekV2ZW50RWRpdEN0cmwnLFxuICAgICAgICAgICAgcmVzb2x2ZTogcm91dGVSb2xlQ2hlY2tzLmxvZ2dlZEluXG4gICAgICAgIH0pXG4gICAgICAgIC53aGVuKCcvY29tbXVuaWNhdGlvbi9ldmVudHMnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9jb21tdW5pY2F0aW9uL2V2ZW50cy9ldmVudC1saXN0Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3pFdmVudExpc3RDdHJsJyxcbiAgICAgICAgICAgIHJlc29sdmU6IHJvdXRlUm9sZUNoZWNrcy5sb2dnZWRJblxuICAgICAgICB9KVxuICAgICAgICAud2hlbignL2NvbW11bmljYXRpb24vZXZlbnRzLzppZCcsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZGFzaGJvYXJkL2NvbW11bmljYXRpb24vZXZlbnRzL2V2ZW50LWRldGFpbC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6RXZlbnREZXRhaWxDdHJsJyxcbiAgICAgICAgICAgIHJlc29sdmU6IHJvdXRlUm9sZUNoZWNrcy5sb2dnZWRJblxuICAgICAgICB9KVxuICAgICAgICAud2hlbignL2NvbW11bmljYXRpb24vbGlzdHMnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9jb21tdW5pY2F0aW9uL2xpc3RzL2xpc3QtbGlzdC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6TGlzdExpc3RDdHJsJyxcbiAgICAgICAgICAgIHJlc29sdmU6IHJvdXRlUm9sZUNoZWNrcy5sb2dnZWRJblxuICAgICAgICB9KVxuICAgICAgICAud2hlbignL2NvbW11bmljYXRpb24vbGlzdHMvOmlkJywge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9kYXNoYm9hcmQvY29tbXVuaWNhdGlvbi9saXN0cy9saXN0LWRldGFpbC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6TGlzdERldGFpbEN0cmwnLFxuICAgICAgICAgICAgcmVzb2x2ZTogcm91dGVSb2xlQ2hlY2tzLmxvZ2dlZEluXG4gICAgICAgIH0pXG4gICAgICAgIC53aGVuKCcvY29tbXVuaWNhdGlvbi9saXN0cy86aWQvZWRpdCcsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZGFzaGJvYXJkL2NvbW11bmljYXRpb24vbGlzdHMvbGlzdC1lZGl0Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3pMaXN0RGV0YWlsQ3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MubG9nZ2VkSW5cbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9jb21tdW5pY2F0aW9uL21lc3NhZ2UvdXNlcicsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZGFzaGJvYXJkL2NvbW11bmljYXRpb24vZXZlbnRzL2V2ZW50LWVkaXQtdXNlci1tZXNzYWdlLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3pFdmVudEVkaXRVc2VyTWVzc2FnZUN0cmwnLFxuICAgICAgICAgICAgcmVzb2x2ZTogcm91dGVSb2xlQ2hlY2tzLmxvZ2dlZEluXG4gICAgICAgIH0pXG4gICAgICAgIC53aGVuKCcvY29tbXVuaWNhdGlvbi9tZXNzYWdlJywge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9kYXNoYm9hcmQvY29tbXVuaWNhdGlvbi9tZXNzYWdlL21lc3NhZ2Utc2VuZC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6TWVzc2FnZVNlbmRDdHJsJyxcbiAgICAgICAgICAgIHJlc29sdmU6IHJvdXRlUm9sZUNoZWNrcy5sb2dnZWRJblxuICAgICAgICB9KVxuICAgICAgICAud2hlbignL2NvbW11bmljYXRpb24vc2V0dGluZ3MnLCB7XG4gICAgICAgICAgICByZWRpcmVjdFRvOiAnL2NvbW11bmljYXRpb24vc2V0dGluZ3MvdGVtcGxhdGVzJ1xuICAgICAgICB9KVxuICAgICAgICAud2hlbignL2NvbW11bmljYXRpb24vc2V0dGluZ3MvdGVtcGxhdGVzJywge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9kYXNoYm9hcmQvY29tbXVuaWNhdGlvbi90ZW1wbGF0ZXMvdGVtcGxhdGUtbGlzdC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6VGVtcGxhdGVMaXN0Q3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MubG9nZ2VkSW5cbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9jb21tdW5pY2F0aW9uL3NldHRpbmdzL3RlbXBsYXRlLzppZC9lZGl0Jywge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9kYXNoYm9hcmQvY29tbXVuaWNhdGlvbi90ZW1wbGF0ZXMvdGVtcGxhdGUtZWRpdC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6VGVtcGxhdGVFZGl0Q3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MubG9nZ2VkSW5cbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9jb21tdW5pY2F0aW9uL3NldHRpbmdzL3RlbXBsYXRlLzppZCcsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZGFzaGJvYXJkL2NvbW11bmljYXRpb24vdGVtcGxhdGVzL3RlbXBsYXRlLWRldGFpbC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6VGVtcGxhdGVEZXRhaWxDdHJsJyxcbiAgICAgICAgICAgIHJlc29sdmU6IHJvdXRlUm9sZUNoZWNrcy5sb2dnZWRJblxuICAgICAgICB9KVxuICAgICAgICAud2hlbignL3NldHRpbmdzJywge1xuICAgICAgICAgICAgcmVkaXJlY3RUbzogJy9zZXR0aW5ncy9wcm9maWxlJ1xuICAgICAgICB9KVxuICAgICAgICAud2hlbignL3NldHRpbmdzL3Byb2ZpbGUnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9zZXR0aW5ncy9wcm9maWxlL3Byb2ZpbGUtZGV0YWlscy5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6UHJvZmlsZURldGFpbHNDdHJsJyxcbiAgICAgICAgICAgIHJlc29sdmU6IHJvdXRlUm9sZUNoZWNrcy5sb2dnZWRJblxuICAgICAgICB9KVxuICAgICAgICAud2hlbignL3NldHRpbmdzL3Byb2ZpbGUvZWRpdCcsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZGFzaGJvYXJkL3NldHRpbmdzL3Byb2ZpbGUvcHJvZmlsZS1lZGl0Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3pQcm9maWxlRWRpdEN0cmwnLFxuICAgICAgICAgICAgcmVzb2x2ZTogcm91dGVSb2xlQ2hlY2tzLmxvZ2dlZEluXG4gICAgICAgIH0pXG4gICAgICAgIC53aGVuKCcvc2V0dGluZ3MvYWNjb3VudCcsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZGFzaGJvYXJkL3NldHRpbmdzL2FjY291bnQvYWNjb3VudC1kZXRhaWxzLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3pTaXRlQWNjb3VudERldGFpbHMnLFxuICAgICAgICAgICAgcmVzb2x2ZTogcm91dGVSb2xlQ2hlY2tzLmxvZ2dlZEluXG4gICAgICAgIH0pXG4gICAgICAgIC53aGVuKCcvc2V0dGluZ3MvdXNlcnMnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9zZXR0aW5ncy91c2Vycy91c2VyLWxpc3QuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnelVzZXJMaXN0Q3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MubG9nZ2VkSW5cbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9zZXR0aW5ncy91c2Vycy9uZXcnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9zZXR0aW5ncy91c2Vycy91c2VyLW5ldy5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6VXNlck5ld0N0cmwnLFxuICAgICAgICAgICAgcmVzb2x2ZTogcm91dGVSb2xlQ2hlY2tzLmxvZ2dlZEluXG4gICAgICAgIH0pXG4gICAgICAgIC53aGVuKCcvc2V0dGluZ3MvdXNlcnMvOmlkL2VkaXQnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9zZXR0aW5ncy91c2Vycy91c2VyLWVkaXQuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnelVzZXJFZGl0Q3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MubG9nZ2VkSW5cbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9zZXR0aW5ncy91c2Vycy86aWQnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9zZXR0aW5ncy91c2Vycy91c2VyLWRldGFpbHMuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnelVzZXJEZXRhaWxzQ3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MubG9nZ2VkSW5cbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9zZXR0aW5ncy9hcGknLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9zZXR0aW5ncy9hcGlzL2FwaS1saXN0Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3pBcGlMaXN0Q3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MubG9nZ2VkSW5cbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9zZXR0aW5ncy9hcGkvbmV3Jywge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9kYXNoYm9hcmQvc2V0dGluZ3MvYXBpcy9hcGktbmV3Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3pBcGlOZXdDdHJsJyxcbiAgICAgICAgICAgIHJlc29sdmU6IHJvdXRlUm9sZUNoZWNrcy5sb2dnZWRJblxuICAgICAgICB9KVxuICAgICAgICAud2hlbignL3NldHRpbmdzL2FwaS86aWQnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9zZXR0aW5ncy9hcGlzL2FwaS1kZXRhaWxzLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3pBcGlEZXRhaWxzQ3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MubG9nZ2VkSW5cbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9zZXR0aW5ncy9hcGkvOmlkL2VkaXQnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9zZXR0aW5ncy9hcGlzL2FwaS1lZGl0Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3pBcGlFZGl0Q3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MubG9nZ2VkSW5cbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9zZXR0aW5ncy9zaXRlcy9uZXcnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9zZXR0aW5ncy9zaXRlcy9zaXRlLW5ldy5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6U2l0ZU5ld0N0cmwnLFxuICAgICAgICAgICAgcmVzb2x2ZTogcm91dGVSb2xlQ2hlY2tzLmxvZ2dlZEluXG4gICAgICAgIH0pXG4gICAgICAgIC53aGVuKCcvc2V0dGluZ3Mvc2l0ZXMnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9zZXR0aW5ncy9zaXRlcy9zaXRlLWxpc3QuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnelNpdGVMaXN0Q3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MubG9nZ2VkSW5cbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9zZXR0aW5ncy9zaXRlcy86aWQnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9zZXR0aW5ncy9zaXRlcy9zaXRlLWRldGFpbHMuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnelNpdGVEZXRhaWxzQ3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiByb3V0ZVJvbGVDaGVja3MubG9nZ2VkSW5cbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9zZXR0aW5ncy9zaXRlcy86aWQvZWRpdCcsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZGFzaGJvYXJkL3NldHRpbmdzL3NpdGVzL3NpdGUtZWRpdC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6U2l0ZUVkaXRDdHJsJyxcbiAgICAgICAgICAgIHJlc29sdmU6IHJvdXRlUm9sZUNoZWNrcy5sb2dnZWRJblxuICAgICAgICB9KVxuICAgICAgICAub3RoZXJ3aXNlKHtcbiAgICAgICAgICByZWRpcmVjdFRvOiAnL25vdC1mb3VuZCdcbiAgICAgICAgfSk7XG5cbiAgICB1aVNlbGVjdENvbmZpZy50aGVtZSA9ICdib290c3RyYXAnO1xuXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnekF1dGhJbnRlcmNlcHRvcicpO1xuXG4gICAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy50cmFuc2Zvcm1SZXNwb25zZS5wdXNoKGZ1bmN0aW9uIChyZXNwb25zZURhdGEpIHtcbiAgICAgICAgY29udmVydERhdGVTdHJpbmdzVG9EYXRlcyhyZXNwb25zZURhdGEpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2VEYXRhO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIFRPRE86IGlzIHJlcXVpcmVkP1xuICAgIHZhciByZWdleElzbzg2MDEgPSAvXihcXGR7NH18XFwrXFxkezZ9KSg/Oi0oXFxkezJ9KSg/Oi0oXFxkezJ9KSg/OlQoXFxkezJ9KTooXFxkezJ9KTooXFxkezJ9KVxcLihcXGR7MSx9KShafChbXFwtK10pKFxcZHsyfSk6KFxcZHsyfSkpPyk/KT8pPyQvO1xuICAgIGZ1bmN0aW9uIGNvbnZlcnREYXRlU3RyaW5nc1RvRGF0ZXMoaW5wdXQpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoaW5ncyB0aGF0IGFyZW4ndCBvYmplY3RzLlxuICAgICAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHJldHVybiBpbnB1dDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gaW5wdXQpIHtcbiAgICAgICAgICAgIGlmICghaW5wdXQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGlucHV0W2tleV07XG4gICAgICAgICAgICB2YXIgbWF0Y2g7XG4gICAgICAgICAgICAvLyBDaGVjayBmb3Igc3RyaW5nIHByb3BlcnRpZXMgd2hpY2ggbG9vayBsaWtlIGRhdGVzLlxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgKG1hdGNoID0gdmFsdWUubWF0Y2gocmVnZXhJc284NjAxKSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWlsbGlzZWNvbmRzID0gRGF0ZS5wYXJzZShtYXRjaFswXSk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihtaWxsaXNlY29uZHMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0W2tleV0gPSBuZXcgRGF0ZShtaWxsaXNlY29uZHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIC8vIFJlY3Vyc2UgaW50byBvYmplY3RcbiAgICAgICAgICAgICAgICBjb252ZXJ0RGF0ZVN0cmluZ3NUb0RhdGVzKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJykucnVuKGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkbG9jYXRpb24sIHpOb3RpZmllcikge1xuICAgICRyb290U2NvcGUuJG9uKCckcm91dGVDaGFuZ2VFcnJvcicsIGZ1bmN0aW9uIChldnQsIGN1cnJlbnQsIHByZXZpb3VzLCByZWplY3Rpb24pIHtcbiAgICAgICAgaWYgKHJlamVjdGlvbiA9PT0gJ25vdCBhdXRob3JpemVkJyB8fCByZWplY3Rpb24gPT09ICdub3QgYXV0aGVudGljYXRlZCcpIHtcbiAgICAgICAgICAgIHpOb3RpZmllci5pbmZvKCdZb3UgbmVlZCB0byBsb2dpbicpO1xuICAgICAgICAgICAgdmFyIHJlZGlyZWN0UGF0aCA9IGVuY29kZVVSSUNvbXBvbmVudCgkbG9jYXRpb24ucGF0aCgpKTtcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvbG9naW4nKS5zZWFyY2goe1xuICAgICAgICAgICAgICAgIHJlZGlyZWN0OiByZWRpcmVjdFBhdGhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').controller('zLoginCtrl', 
    ['$scope', '$window', '$http', 'zSite', 'zAuth', 'zIdentity', 'zNotifier', '$location', 'zUser', 'zUserEchoService', function ($scope, $window, $http, zSite, zAuth, zIdentity, zNotifier, $location, zUser, zUserEchoService) {
    
    if (zIdentity.isAuthenticated()) {
        $location.url('/dashboard');
    }

    // generate feedback
    zUserEchoService.generateFeedback();

    $scope.signin = function (email, password) {
        zAuth
            .authenticateUser(email, password)
            .then(function () {
                zSite.refreshSites(true);
                zNotifier.notify('You have successfully logged in!');
                if ($location.search().redirect) {
                    $location.path(decodeURIComponent($location.search().redirect)).search({});
                } else {
                    $location.path('/dashboard');
                }
            })
            .catch(function(err) {
                if (err.status === 401) {
                    $scope.info = err.data.info;
                    switch (err.data.info.status) {
                    case 'no password':
                        zNotifier.warning('You haven\'t set your password');
                        break;
                    case 'un-verified owner':
                        zNotifier.warning('Account not verified');
                        break;
                    case 'un-verified user':
                        zNotifier.warning('You need to verify your account');
                        break;
                    case 'disabled':
                        zNotifier.error('Your account is currently disabled');
                        break;
                    case 'invalid un/pw':
                        zNotifier.error('Invalid username or password');
                        break;
                    }
                } else {
                    zNotifier.error('Unexpected server error');
                }
            });
    };

    $scope.resendOwnerEmail = function () {
        //$scope.user.$update({id: $scope.user._id, action: 'sendNewUserEmail'}).then(function() {
        //$http.get('/api/users/')
        zUser
            .get({
                id: $scope.info.userId,
                action: 'resendNewOwnerEmail'
            })
            .$promise
            .then(function () {
                zNotifier.notify('New owner email resent to ' + $scope.info.email);
                $scope.info.status = 'new owner email re-sent';
            })
            .catch(function (err) {
                zNotifier.error(err.data.reason);
            });
    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2FjY291bnQvekxvZ2luQ3RybC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxXQUFXO3lIQUM3QixVQUFVLFFBQVEsU0FBUyxPQUFPLE9BQU8sT0FBTyxXQUFXLFdBQVcsV0FBVyxPQUFPLGtCQUFrQjs7SUFFMUcsSUFBSSxVQUFVLG1CQUFtQjtRQUM3QixVQUFVLElBQUk7Ozs7SUFJbEIsaUJBQWlCOztJQUVqQixPQUFPLFNBQVMsVUFBVSxPQUFPLFVBQVU7UUFDdkM7YUFDSyxpQkFBaUIsT0FBTzthQUN4QixLQUFLLFlBQVk7Z0JBQ2QsTUFBTSxhQUFhO2dCQUNuQixVQUFVLE9BQU87Z0JBQ2pCLElBQUksVUFBVSxTQUFTLFVBQVU7b0JBQzdCLFVBQVUsS0FBSyxtQkFBbUIsVUFBVSxTQUFTLFdBQVcsT0FBTzt1QkFDcEU7b0JBQ0gsVUFBVSxLQUFLOzs7YUFHdEIsTUFBTSxTQUFTLEtBQUs7Z0JBQ2pCLElBQUksSUFBSSxXQUFXLEtBQUs7b0JBQ3BCLE9BQU8sT0FBTyxJQUFJLEtBQUs7b0JBQ3ZCLFFBQVEsSUFBSSxLQUFLLEtBQUs7b0JBQ3RCLEtBQUs7d0JBQ0QsVUFBVSxRQUFRO3dCQUNsQjtvQkFDSixLQUFLO3dCQUNELFVBQVUsUUFBUTt3QkFDbEI7b0JBQ0osS0FBSzt3QkFDRCxVQUFVLFFBQVE7d0JBQ2xCO29CQUNKLEtBQUs7d0JBQ0QsVUFBVSxNQUFNO3dCQUNoQjtvQkFDSixLQUFLO3dCQUNELFVBQVUsTUFBTTt3QkFDaEI7O3VCQUVEO29CQUNILFVBQVUsTUFBTTs7Ozs7SUFLaEMsT0FBTyxtQkFBbUIsWUFBWTs7O1FBR2xDO2FBQ0ssSUFBSTtnQkFDRCxJQUFJLE9BQU8sS0FBSztnQkFDaEIsUUFBUTs7YUFFWDthQUNBLEtBQUssWUFBWTtnQkFDZCxVQUFVLE9BQU8sK0JBQStCLE9BQU8sS0FBSztnQkFDNUQsT0FBTyxLQUFLLFNBQVM7O2FBRXhCLE1BQU0sVUFBVSxLQUFLO2dCQUNsQixVQUFVLE1BQU0sSUFBSSxLQUFLOzs7SUFHdEMiLCJmaWxlIjoiY29udHJvbGxlcnMvYWNjb3VudC96TG9naW5DdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ3pMb2dpbkN0cmwnLCBcbiAgICBmdW5jdGlvbiAoJHNjb3BlLCAkd2luZG93LCAkaHR0cCwgelNpdGUsIHpBdXRoLCB6SWRlbnRpdHksIHpOb3RpZmllciwgJGxvY2F0aW9uLCB6VXNlciwgelVzZXJFY2hvU2VydmljZSkge1xuICAgIFxuICAgIGlmICh6SWRlbnRpdHkuaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgJGxvY2F0aW9uLnVybCgnL2Rhc2hib2FyZCcpO1xuICAgIH1cblxuICAgIC8vIGdlbmVyYXRlIGZlZWRiYWNrXG4gICAgelVzZXJFY2hvU2VydmljZS5nZW5lcmF0ZUZlZWRiYWNrKCk7XG5cbiAgICAkc2NvcGUuc2lnbmluID0gZnVuY3Rpb24gKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICB6QXV0aFxuICAgICAgICAgICAgLmF1dGhlbnRpY2F0ZVVzZXIoZW1haWwsIHBhc3N3b3JkKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHpTaXRlLnJlZnJlc2hTaXRlcyh0cnVlKTtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIubm90aWZ5KCdZb3UgaGF2ZSBzdWNjZXNzZnVsbHkgbG9nZ2VkIGluIScpO1xuICAgICAgICAgICAgICAgIGlmICgkbG9jYXRpb24uc2VhcmNoKCkucmVkaXJlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoZGVjb2RlVVJJQ29tcG9uZW50KCRsb2NhdGlvbi5zZWFyY2goKS5yZWRpcmVjdCkpLnNlYXJjaCh7fSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIuc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmluZm8gPSBlcnIuZGF0YS5pbmZvO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGVyci5kYXRhLmluZm8uc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ25vIHBhc3N3b3JkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHpOb3RpZmllci53YXJuaW5nKCdZb3UgaGF2ZW5cXCd0IHNldCB5b3VyIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndW4tdmVyaWZpZWQgb3duZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgek5vdGlmaWVyLndhcm5pbmcoJ0FjY291bnQgbm90IHZlcmlmaWVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndW4tdmVyaWZpZWQgdXNlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICB6Tm90aWZpZXIud2FybmluZygnWW91IG5lZWQgdG8gdmVyaWZ5IHlvdXIgYWNjb3VudCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Rpc2FibGVkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignWW91ciBhY2NvdW50IGlzIGN1cnJlbnRseSBkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ludmFsaWQgdW4vcHcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdJbnZhbGlkIHVzZXJuYW1lIG9yIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignVW5leHBlY3RlZCBzZXJ2ZXIgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnJlc2VuZE93bmVyRW1haWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vJHNjb3BlLnVzZXIuJHVwZGF0ZSh7aWQ6ICRzY29wZS51c2VyLl9pZCwgYWN0aW9uOiAnc2VuZE5ld1VzZXJFbWFpbCd9KS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyRodHRwLmdldCgnL2FwaS91c2Vycy8nKVxuICAgICAgICB6VXNlclxuICAgICAgICAgICAgLmdldCh7XG4gICAgICAgICAgICAgICAgaWQ6ICRzY29wZS5pbmZvLnVzZXJJZCxcbiAgICAgICAgICAgICAgICBhY3Rpb246ICdyZXNlbmROZXdPd25lckVtYWlsJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC4kcHJvbWlzZVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5ub3RpZnkoJ05ldyBvd25lciBlbWFpbCByZXNlbnQgdG8gJyArICRzY29wZS5pbmZvLmVtYWlsKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5mby5zdGF0dXMgPSAnbmV3IG93bmVyIGVtYWlsIHJlLXNlbnQnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKGVyci5kYXRhLnJlYXNvbik7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').controller('zLostPasswordCtrl', ['$scope', '$http', '$routeParams', 'zNotifier', '$location', function ($scope, $http, $routeParams, zNotifier, $location) {
    $scope.email = $routeParams.email;
    $scope.findUser = function () {
        $http
            .get('/api/users/findUserForPwReset?email=' + encodeURI($scope.email))
            .success(function (data) {
                if (data.displayName) {
                    zNotifier.info('Found your account ' + data.displayName);
                    $scope.resetPassword($scope.email);
                } else {
                    zNotifier.warning('Unable to find your account');
                }
            })
            .error(function (data) {
                zNotifier.warn(data.reason);
            });
    };

    $scope.resetPassword = function (email) {
        $http
            .post('/api/users/generatePwResetToken', {
                email: email
            })
            .success(function () {
                zNotifier.info('Follow link in email to reset password');
                $location.path('/login');
            })
            .error(function (data) {
                zNotifier.warning(data.reason);
            });
    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2FjY291bnQvekxvc3RQYXNzd29yZEN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sV0FBVyxtRkFBcUIsVUFBVSxRQUFRLE9BQU8sY0FBYyxXQUFXLFdBQVc7SUFDL0csT0FBTyxRQUFRLGFBQWE7SUFDNUIsT0FBTyxXQUFXLFlBQVk7UUFDMUI7YUFDSyxJQUFJLHlDQUF5QyxVQUFVLE9BQU87YUFDOUQsUUFBUSxVQUFVLE1BQU07Z0JBQ3JCLElBQUksS0FBSyxhQUFhO29CQUNsQixVQUFVLEtBQUssd0JBQXdCLEtBQUs7b0JBQzVDLE9BQU8sY0FBYyxPQUFPO3VCQUN6QjtvQkFDSCxVQUFVLFFBQVE7OzthQUd6QixNQUFNLFVBQVUsTUFBTTtnQkFDbkIsVUFBVSxLQUFLLEtBQUs7Ozs7SUFJaEMsT0FBTyxnQkFBZ0IsVUFBVSxPQUFPO1FBQ3BDO2FBQ0ssS0FBSyxtQ0FBbUM7Z0JBQ3JDLE9BQU87O2FBRVYsUUFBUSxZQUFZO2dCQUNqQixVQUFVLEtBQUs7Z0JBQ2YsVUFBVSxLQUFLOzthQUVsQixNQUFNLFVBQVUsTUFBTTtnQkFDbkIsVUFBVSxRQUFRLEtBQUs7OztJQUdwQyIsImZpbGUiOiJjb250cm9sbGVycy9hY2NvdW50L3pMb3N0UGFzc3dvcmRDdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ3pMb3N0UGFzc3dvcmRDdHJsJywgZnVuY3Rpb24gKCRzY29wZSwgJGh0dHAsICRyb3V0ZVBhcmFtcywgek5vdGlmaWVyLCAkbG9jYXRpb24pIHtcbiAgICAkc2NvcGUuZW1haWwgPSAkcm91dGVQYXJhbXMuZW1haWw7XG4gICAgJHNjb3BlLmZpbmRVc2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkaHR0cFxuICAgICAgICAgICAgLmdldCgnL2FwaS91c2Vycy9maW5kVXNlckZvclB3UmVzZXQ/ZW1haWw9JyArIGVuY29kZVVSSSgkc2NvcGUuZW1haWwpKVxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5kaXNwbGF5TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICB6Tm90aWZpZXIuaW5mbygnRm91bmQgeW91ciBhY2NvdW50ICcgKyBkYXRhLmRpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnJlc2V0UGFzc3dvcmQoJHNjb3BlLmVtYWlsKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB6Tm90aWZpZXIud2FybmluZygnVW5hYmxlIHRvIGZpbmQgeW91ciBhY2NvdW50Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lcnJvcihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci53YXJuKGRhdGEucmVhc29uKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUucmVzZXRQYXNzd29yZCA9IGZ1bmN0aW9uIChlbWFpbCkge1xuICAgICAgICAkaHR0cFxuICAgICAgICAgICAgLnBvc3QoJy9hcGkvdXNlcnMvZ2VuZXJhdGVQd1Jlc2V0VG9rZW4nLCB7XG4gICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5pbmZvKCdGb2xsb3cgbGluayBpbiBlbWFpbCB0byByZXNldCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvbG9naW4nKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIud2FybmluZyhkYXRhLnJlYXNvbik7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').controller('zNavBarAccountCtrl', 
    ['$location', '$scope', 'zNotifier', 'zIdentity', 'zAuth', 'zSite', 'zUserEchoService', 'zTheme', 'zDashboard', function ($location, $scope, zNotifier, zIdentity, zAuth, zSite, zUserEchoService, zTheme, zDashboard) {
    $scope.identity = zIdentity;
    $scope.dashboards = [];

    zDashboard.getDashboards()
        .then(function(data) {
            $scope.dashboards = data;
            $scope.dashboard = _.find(data, 'name', zIdentity.getCurrentUser().activeRole);

            zDashboard.setActiveDashboard($scope.dashboard);
            zDashboard.setActiveDashboards($scope.dashboards);
        })
        .catch(function(err) {
            zNotifier.error('Can\'t load dashboards: ' + err);
        });


    // generate feedback
    zUserEchoService.getToken()
        .then(function(data) {
            var token = data.token;
            zUserEchoService.generateFeedback(token);
        })
        .catch(function(err) {
            zNotifier.error('Unable to generate feedback: ' + err);
        });
    
    zSite
        .refreshSites()
        .then(function() {
            $scope.sites = zSite.getAllSites();
            $scope.currentSite = zSite.getCurrentSite();
        });

    $scope.changeDashboard = zDashboard.setActiveDashboard;
    
    $scope.$watch(function() {
        return zDashboard.getActiveDashboard();
    }, function() {
        $scope.dashboard = zDashboard.getActiveDashboard();
    });

    $scope.logout = function () {
        zAuth.logoutUser();
        zNotifier.notify('You have successfully logged out');
        $location.url('/');
    };
    
    $scope.changeSite = function (site) {
        if (site._id !== zIdentity.getCurrentUser().currentSite) {
            zAuth
                .changeSite(site._id)
                .then(function() {
                    zNotifier.notify('Current site changed to ' + site.name);
                    return zSite.refreshSites(true);
                })
                .then(function() {
                    $scope.sites = zSite.getAllSites();
                    $scope.currentSite = zSite.getCurrentSite();
                    $location.path('/dashboard');

                    return zDashboard.getDashboards();
                })
                .then(function(dashboards) {
                    var dashboard;
                    
                    if(!dashboards.length) {
                        dashboard = zDashboard.getDefaultDashboard(zIdentity.getCurrentUser().activeRole);
                        zDashboard.createDashboard(dashboard);
                        dashboards.push(dashboard);
                    } else {
                        dashboard = dashboards[0];
                    }
                    
                    $scope.dashboard = dashboard;
                    $scope.dashboards = dashboards;

                    zDashboard.setActiveDashboard($scope.dashboard);
                    zDashboard.setActiveDashboards($scope.dashboards);
                
                })
                .catch(function (err) {
                    zNotifier.error('Unable to change site: ' + err);
                });
        }
    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2FjY291bnQvek5hdkJhckFjY291bnRDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVc7b0hBQzdCLFVBQVUsV0FBVyxRQUFRLFdBQVcsV0FBVyxPQUFPLE9BQU8sa0JBQWtCLFFBQVEsWUFBWTtJQUN2RyxPQUFPLFdBQVc7SUFDbEIsT0FBTyxhQUFhOztJQUVwQixXQUFXO1NBQ04sS0FBSyxTQUFTLE1BQU07WUFDakIsT0FBTyxhQUFhO1lBQ3BCLE9BQU8sWUFBWSxFQUFFLEtBQUssTUFBTSxRQUFRLFVBQVUsaUJBQWlCOztZQUVuRSxXQUFXLG1CQUFtQixPQUFPO1lBQ3JDLFdBQVcsb0JBQW9CLE9BQU87O1NBRXpDLE1BQU0sU0FBUyxLQUFLO1lBQ2pCLFVBQVUsTUFBTSw2QkFBNkI7Ozs7O0lBS3JELGlCQUFpQjtTQUNaLEtBQUssU0FBUyxNQUFNO1lBQ2pCLElBQUksUUFBUSxLQUFLO1lBQ2pCLGlCQUFpQixpQkFBaUI7O1NBRXJDLE1BQU0sU0FBUyxLQUFLO1lBQ2pCLFVBQVUsTUFBTSxrQ0FBa0M7OztJQUcxRDtTQUNLO1NBQ0EsS0FBSyxXQUFXO1lBQ2IsT0FBTyxRQUFRLE1BQU07WUFDckIsT0FBTyxjQUFjLE1BQU07OztJQUduQyxPQUFPLGtCQUFrQixXQUFXOztJQUVwQyxPQUFPLE9BQU8sV0FBVztRQUNyQixPQUFPLFdBQVc7T0FDbkIsV0FBVztRQUNWLE9BQU8sWUFBWSxXQUFXOzs7SUFHbEMsT0FBTyxTQUFTLFlBQVk7UUFDeEIsTUFBTTtRQUNOLFVBQVUsT0FBTztRQUNqQixVQUFVLElBQUk7OztJQUdsQixPQUFPLGFBQWEsVUFBVSxNQUFNO1FBQ2hDLElBQUksS0FBSyxRQUFRLFVBQVUsaUJBQWlCLGFBQWE7WUFDckQ7aUJBQ0ssV0FBVyxLQUFLO2lCQUNoQixLQUFLLFdBQVc7b0JBQ2IsVUFBVSxPQUFPLDZCQUE2QixLQUFLO29CQUNuRCxPQUFPLE1BQU0sYUFBYTs7aUJBRTdCLEtBQUssV0FBVztvQkFDYixPQUFPLFFBQVEsTUFBTTtvQkFDckIsT0FBTyxjQUFjLE1BQU07b0JBQzNCLFVBQVUsS0FBSzs7b0JBRWYsT0FBTyxXQUFXOztpQkFFckIsS0FBSyxTQUFTLFlBQVk7b0JBQ3ZCLElBQUk7O29CQUVKLEdBQUcsQ0FBQyxXQUFXLFFBQVE7d0JBQ25CLFlBQVksV0FBVyxvQkFBb0IsVUFBVSxpQkFBaUI7d0JBQ3RFLFdBQVcsZ0JBQWdCO3dCQUMzQixXQUFXLEtBQUs7MkJBQ2I7d0JBQ0gsWUFBWSxXQUFXOzs7b0JBRzNCLE9BQU8sWUFBWTtvQkFDbkIsT0FBTyxhQUFhOztvQkFFcEIsV0FBVyxtQkFBbUIsT0FBTztvQkFDckMsV0FBVyxvQkFBb0IsT0FBTzs7O2lCQUd6QyxNQUFNLFVBQVUsS0FBSztvQkFDbEIsVUFBVSxNQUFNLDRCQUE0Qjs7OztJQUk3RCIsImZpbGUiOiJjb250cm9sbGVycy9hY2NvdW50L3pOYXZCYXJBY2NvdW50Q3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCd6TmF2QmFyQWNjb3VudEN0cmwnLCBcbiAgICBmdW5jdGlvbiAoJGxvY2F0aW9uLCAkc2NvcGUsIHpOb3RpZmllciwgeklkZW50aXR5LCB6QXV0aCwgelNpdGUsIHpVc2VyRWNob1NlcnZpY2UsIHpUaGVtZSwgekRhc2hib2FyZCkge1xuICAgICRzY29wZS5pZGVudGl0eSA9IHpJZGVudGl0eTtcbiAgICAkc2NvcGUuZGFzaGJvYXJkcyA9IFtdO1xuXG4gICAgekRhc2hib2FyZC5nZXREYXNoYm9hcmRzKClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgJHNjb3BlLmRhc2hib2FyZHMgPSBkYXRhO1xuICAgICAgICAgICAgJHNjb3BlLmRhc2hib2FyZCA9IF8uZmluZChkYXRhLCAnbmFtZScsIHpJZGVudGl0eS5nZXRDdXJyZW50VXNlcigpLmFjdGl2ZVJvbGUpO1xuXG4gICAgICAgICAgICB6RGFzaGJvYXJkLnNldEFjdGl2ZURhc2hib2FyZCgkc2NvcGUuZGFzaGJvYXJkKTtcbiAgICAgICAgICAgIHpEYXNoYm9hcmQuc2V0QWN0aXZlRGFzaGJvYXJkcygkc2NvcGUuZGFzaGJvYXJkcyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignQ2FuXFwndCBsb2FkIGRhc2hib2FyZHM6ICcgKyBlcnIpO1xuICAgICAgICB9KTtcblxuXG4gICAgLy8gZ2VuZXJhdGUgZmVlZGJhY2tcbiAgICB6VXNlckVjaG9TZXJ2aWNlLmdldFRva2VuKClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgdmFyIHRva2VuID0gZGF0YS50b2tlbjtcbiAgICAgICAgICAgIHpVc2VyRWNob1NlcnZpY2UuZ2VuZXJhdGVGZWVkYmFjayh0b2tlbik7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignVW5hYmxlIHRvIGdlbmVyYXRlIGZlZWRiYWNrOiAnICsgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgXG4gICAgelNpdGVcbiAgICAgICAgLnJlZnJlc2hTaXRlcygpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLnNpdGVzID0gelNpdGUuZ2V0QWxsU2l0ZXMoKTtcbiAgICAgICAgICAgICRzY29wZS5jdXJyZW50U2l0ZSA9IHpTaXRlLmdldEN1cnJlbnRTaXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgJHNjb3BlLmNoYW5nZURhc2hib2FyZCA9IHpEYXNoYm9hcmQuc2V0QWN0aXZlRGFzaGJvYXJkO1xuICAgIFxuICAgICRzY29wZS4kd2F0Y2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB6RGFzaGJvYXJkLmdldEFjdGl2ZURhc2hib2FyZCgpO1xuICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuZGFzaGJvYXJkID0gekRhc2hib2FyZC5nZXRBY3RpdmVEYXNoYm9hcmQoKTtcbiAgICB9KTtcblxuICAgICRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHpBdXRoLmxvZ291dFVzZXIoKTtcbiAgICAgICAgek5vdGlmaWVyLm5vdGlmeSgnWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBvdXQnKTtcbiAgICAgICAgJGxvY2F0aW9uLnVybCgnLycpO1xuICAgIH07XG4gICAgXG4gICAgJHNjb3BlLmNoYW5nZVNpdGUgPSBmdW5jdGlvbiAoc2l0ZSkge1xuICAgICAgICBpZiAoc2l0ZS5faWQgIT09IHpJZGVudGl0eS5nZXRDdXJyZW50VXNlcigpLmN1cnJlbnRTaXRlKSB7XG4gICAgICAgICAgICB6QXV0aFxuICAgICAgICAgICAgICAgIC5jaGFuZ2VTaXRlKHNpdGUuX2lkKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB6Tm90aWZpZXIubm90aWZ5KCdDdXJyZW50IHNpdGUgY2hhbmdlZCB0byAnICsgc2l0ZS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHpTaXRlLnJlZnJlc2hTaXRlcyh0cnVlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2l0ZXMgPSB6U2l0ZS5nZXRBbGxTaXRlcygpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY3VycmVudFNpdGUgPSB6U2l0ZS5nZXRDdXJyZW50U2l0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2Rhc2hib2FyZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB6RGFzaGJvYXJkLmdldERhc2hib2FyZHMoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRhc2hib2FyZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhc2hib2FyZDtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKCFkYXNoYm9hcmRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGFzaGJvYXJkID0gekRhc2hib2FyZC5nZXREZWZhdWx0RGFzaGJvYXJkKHpJZGVudGl0eS5nZXRDdXJyZW50VXNlcigpLmFjdGl2ZVJvbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgekRhc2hib2FyZC5jcmVhdGVEYXNoYm9hcmQoZGFzaGJvYXJkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhc2hib2FyZHMucHVzaChkYXNoYm9hcmQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGFzaGJvYXJkID0gZGFzaGJvYXJkc1swXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhc2hib2FyZCA9IGRhc2hib2FyZDtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRhc2hib2FyZHMgPSBkYXNoYm9hcmRzO1xuXG4gICAgICAgICAgICAgICAgICAgIHpEYXNoYm9hcmQuc2V0QWN0aXZlRGFzaGJvYXJkKCRzY29wZS5kYXNoYm9hcmQpO1xuICAgICAgICAgICAgICAgICAgICB6RGFzaGJvYXJkLnNldEFjdGl2ZURhc2hib2FyZHMoJHNjb3BlLmRhc2hib2FyZHMpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdVbmFibGUgdG8gY2hhbmdlIHNpdGU6ICcgKyBlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').controller('zSignupConfirmCtrl', ['$scope', 'zIdentity', function($scope, zIdentity) {
    $scope.user = zIdentity.getCurrentUser();
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2FjY291bnQvelNpZ251cENvbmZpcm1DdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcsOENBQXNCLFNBQVMsUUFBUSxXQUFXO0lBQy9FLE9BQU8sT0FBTyxVQUFVO0lBQ3pCIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2FjY291bnQvelNpZ251cENvbmZpcm1DdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ3pTaWdudXBDb25maXJtQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgeklkZW50aXR5KSB7XG4gICAgJHNjb3BlLnVzZXIgPSB6SWRlbnRpdHkuZ2V0Q3VycmVudFVzZXIoKTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').controller('zSignupCtrl', ['$scope', 'zUser', 'zNotifier', '$location', 'zAuth', function ($scope, zUser, zNotifier, $location, zAuth) {
    $scope.signup = function () {
        if ($scope.password !== $scope.repeatPassword) {
            zNotifier.error('Passwords don\'t match');
            return;
        }
        var newOwnerData = {
            email: $scope.email,
            password: $scope.password,
            displayName: $scope.displayName || $scope.email,
            siteName: $scope.siteName
        };
        
        zAuth
            .registerOwner(newOwnerData)
            .then(function () {
                zNotifier.notify('New account created - need to confirm email');
                $location.path('/signup-confirm');
            })
            .catch(function (err) {
                zNotifier.error(err.data.reason);
            });
    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2FjY291bnQvelNpZ251cEN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sV0FBVyxzRUFBZSxVQUFVLFFBQVEsT0FBTyxXQUFXLFdBQVcsT0FBTztJQUNsRyxPQUFPLFNBQVMsWUFBWTtRQUN4QixJQUFJLE9BQU8sYUFBYSxPQUFPLGdCQUFnQjtZQUMzQyxVQUFVLE1BQU07WUFDaEI7O1FBRUosSUFBSSxlQUFlO1lBQ2YsT0FBTyxPQUFPO1lBQ2QsVUFBVSxPQUFPO1lBQ2pCLGFBQWEsT0FBTyxlQUFlLE9BQU87WUFDMUMsVUFBVSxPQUFPOzs7UUFHckI7YUFDSyxjQUFjO2FBQ2QsS0FBSyxZQUFZO2dCQUNkLFVBQVUsT0FBTztnQkFDakIsVUFBVSxLQUFLOzthQUVsQixNQUFNLFVBQVUsS0FBSztnQkFDbEIsVUFBVSxNQUFNLElBQUksS0FBSzs7O0lBR3RDIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2FjY291bnQvelNpZ251cEN0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignelNpZ251cEN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCB6VXNlciwgek5vdGlmaWVyLCAkbG9jYXRpb24sIHpBdXRoKSB7XG4gICAgJHNjb3BlLnNpZ251cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCRzY29wZS5wYXNzd29yZCAhPT0gJHNjb3BlLnJlcGVhdFBhc3N3b3JkKSB7XG4gICAgICAgICAgICB6Tm90aWZpZXIuZXJyb3IoJ1Bhc3N3b3JkcyBkb25cXCd0IG1hdGNoJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld093bmVyRGF0YSA9IHtcbiAgICAgICAgICAgIGVtYWlsOiAkc2NvcGUuZW1haWwsXG4gICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLnBhc3N3b3JkLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICRzY29wZS5kaXNwbGF5TmFtZSB8fCAkc2NvcGUuZW1haWwsXG4gICAgICAgICAgICBzaXRlTmFtZTogJHNjb3BlLnNpdGVOYW1lXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICB6QXV0aFxuICAgICAgICAgICAgLnJlZ2lzdGVyT3duZXIobmV3T3duZXJEYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5ub3RpZnkoJ05ldyBhY2NvdW50IGNyZWF0ZWQgLSBuZWVkIHRvIGNvbmZpcm0gZW1haWwnKTtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3NpZ251cC1jb25maXJtJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIuZXJyb3IoZXJyLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').controller('zTokenCtrl', ['$scope', '$routeParams', 'zToken', 'zNotifier', '$http', '$location', function($scope, $routeParams, zToken, zNotifier, $http, $location) {
    zToken.get({id: $routeParams.id}, function(tokenData) {
        if (tokenData) {
            $scope.data = tokenData;
            switch (tokenData.tokenType) {
                case 'newOwner':
                case 'newUser':
                    zNotifier.notify('You are now verified');
                    break;
                case 'emailChange':
                    zNotifier.notify('Email address updated');
                    break;
                case 'passwordReset':
                    zNotifier.notify('Enter your password');
                    break;
            }

        }
    }, function(body) {
        zNotifier.error(body.data.reason);
        $scope.reason = body.data.reason;
    });

    $scope.setPassword = function(password, repeatPassword) {
        if (password !== repeatPassword) {
            return zNotifier.warn('Passwords don\'t match');
        }
        $http.post('/api/users/' + $scope.data.userId + '/setPassword', {password: password}).then(function() {
            zNotifier.notify('Password set');
            $location.path('/login');
        }, function(res) {
            zNotifier.error(res.data.reason);
        });
    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2FjY291bnQvelRva2VuQ3RybC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxXQUFXLHNGQUFjLFNBQVMsUUFBUSxjQUFjLFFBQVEsV0FBVyxPQUFPLFdBQVc7SUFDL0csT0FBTyxJQUFJLENBQUMsSUFBSSxhQUFhLEtBQUssU0FBUyxXQUFXO1FBQ2xELElBQUksV0FBVztZQUNYLE9BQU8sT0FBTztZQUNkLFFBQVEsVUFBVTtnQkFDZCxLQUFLO2dCQUNMLEtBQUs7b0JBQ0QsVUFBVSxPQUFPO29CQUNqQjtnQkFDSixLQUFLO29CQUNELFVBQVUsT0FBTztvQkFDakI7Z0JBQ0osS0FBSztvQkFDRCxVQUFVLE9BQU87b0JBQ2pCOzs7O09BSWIsU0FBUyxNQUFNO1FBQ2QsVUFBVSxNQUFNLEtBQUssS0FBSztRQUMxQixPQUFPLFNBQVMsS0FBSyxLQUFLOzs7SUFHOUIsT0FBTyxjQUFjLFNBQVMsVUFBVSxnQkFBZ0I7UUFDcEQsSUFBSSxhQUFhLGdCQUFnQjtZQUM3QixPQUFPLFVBQVUsS0FBSzs7UUFFMUIsTUFBTSxLQUFLLGdCQUFnQixPQUFPLEtBQUssU0FBUyxnQkFBZ0IsQ0FBQyxVQUFVLFdBQVcsS0FBSyxXQUFXO1lBQ2xHLFVBQVUsT0FBTztZQUNqQixVQUFVLEtBQUs7V0FDaEIsU0FBUyxLQUFLO1lBQ2IsVUFBVSxNQUFNLElBQUksS0FBSzs7O0lBR2xDIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2FjY291bnQvelRva2VuQ3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCd6VG9rZW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkcm91dGVQYXJhbXMsIHpUb2tlbiwgek5vdGlmaWVyLCAkaHR0cCwgJGxvY2F0aW9uKSB7XG4gICAgelRva2VuLmdldCh7aWQ6ICRyb3V0ZVBhcmFtcy5pZH0sIGZ1bmN0aW9uKHRva2VuRGF0YSkge1xuICAgICAgICBpZiAodG9rZW5EYXRhKSB7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YSA9IHRva2VuRGF0YTtcbiAgICAgICAgICAgIHN3aXRjaCAodG9rZW5EYXRhLnRva2VuVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ25ld093bmVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICduZXdVc2VyJzpcbiAgICAgICAgICAgICAgICAgICAgek5vdGlmaWVyLm5vdGlmeSgnWW91IGFyZSBub3cgdmVyaWZpZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZW1haWxDaGFuZ2UnOlxuICAgICAgICAgICAgICAgICAgICB6Tm90aWZpZXIubm90aWZ5KCdFbWFpbCBhZGRyZXNzIHVwZGF0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncGFzc3dvcmRSZXNldCc6XG4gICAgICAgICAgICAgICAgICAgIHpOb3RpZmllci5ub3RpZnkoJ0VudGVyIHlvdXIgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAgICAgek5vdGlmaWVyLmVycm9yKGJvZHkuZGF0YS5yZWFzb24pO1xuICAgICAgICAkc2NvcGUucmVhc29uID0gYm9keS5kYXRhLnJlYXNvbjtcbiAgICB9KTtcblxuICAgICRzY29wZS5zZXRQYXNzd29yZCA9IGZ1bmN0aW9uKHBhc3N3b3JkLCByZXBlYXRQYXNzd29yZCkge1xuICAgICAgICBpZiAocGFzc3dvcmQgIT09IHJlcGVhdFBhc3N3b3JkKSB7XG4gICAgICAgICAgICByZXR1cm4gek5vdGlmaWVyLndhcm4oJ1Bhc3N3b3JkcyBkb25cXCd0IG1hdGNoJyk7XG4gICAgICAgIH1cbiAgICAgICAgJGh0dHAucG9zdCgnL2FwaS91c2Vycy8nICsgJHNjb3BlLmRhdGEudXNlcklkICsgJy9zZXRQYXNzd29yZCcsIHtwYXNzd29yZDogcGFzc3dvcmR9KS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgek5vdGlmaWVyLm5vdGlmeSgnUGFzc3dvcmQgc2V0Jyk7XG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2xvZ2luJyk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKHJlcy5kYXRhLnJlYXNvbik7XG4gICAgICAgIH0pO1xuICAgIH07XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').controller('zModalCtrl', ['$scope', '$modalInstance', 'items', 'zDashboard', 'zIdentity', function ($scope, $modalInstance, items, zDashboard, zIdentity) {
    $scope.items = items;

    $scope.dashboard = zIdentity.getCurrentUser().activeRole;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2NvbW1vbi96TW9kYWxDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcsK0VBQWMsVUFBVSxRQUFRLGdCQUFnQixPQUFPLFlBQVksV0FBVztJQUMzRyxPQUFPLFFBQVE7O0lBRWYsT0FBTyxZQUFZLFVBQVUsaUJBQWlCOztJQUU5QyxPQUFPLEtBQUssWUFBWTtRQUNwQixlQUFlOzs7SUFHbkIsT0FBTyxTQUFTLFlBQVk7UUFDeEIsZUFBZSxRQUFROzs7QUFHL0IiLCJmaWxlIjoiY29udHJvbGxlcnMvY29tbW9uL3pNb2RhbEN0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignek1vZGFsQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsICRtb2RhbEluc3RhbmNlLCBpdGVtcywgekRhc2hib2FyZCwgeklkZW50aXR5KSB7XG4gICAgJHNjb3BlLml0ZW1zID0gaXRlbXM7XG5cbiAgICAkc2NvcGUuZGFzaGJvYXJkID0geklkZW50aXR5LmdldEN1cnJlbnRVc2VyKCkuYWN0aXZlUm9sZTtcblxuICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJG1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XG4gICAgfTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').controller('PicUploaderCtrl', ['$scope', '$http', 'zCommonUtil', 'zNotifier', function ($scope, $http, zCommonUtil, zNotifier) {
    $scope.myImage = '';
    $scope.myCroppedImage = '';
    $scope.files = null;
    $scope.isUploadingPic = false;

    $scope.uploadPic = function(files) {
        if (files && files.length) {
            var file = files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function($scope) {
                    $scope.myImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        }
    };

    $scope.savePic = function(image, picInfo) {
        if (!picInfo || !picInfo.id || !picInfo.type || !_.isFunction(picInfo.cb)) {
            throw new Error('Unable to upload picture, picInfo{id, type, cb} must be defined in parent controller');
        }
        
        $scope.isUploadingPic = true;
        var blob = zCommonUtil.dataURItoBlob(image);
        var fd = new FormData();
        fd.append('image', blob);
        var options = {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined }
        };
        
        var url = '/api/uploads/upload?type=:type&_id=:id'
            .replace(':type', picInfo.type)
            .replace(':id', picInfo.id);
        $http
            .post(url, fd, options)
            .then(function() {
                zNotifier.notify('Image uploaded succesfully');
                return picInfo.cb();
            })
            .catch(function(err) {
                zNotifier.error('Unable to upload picture: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isUploadingPic = false;
            });
    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2NvbW1vbi96UGljVXBsb2FkZXJDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcsbUVBQW1CLFVBQVUsUUFBUSxPQUFPLGFBQWEsV0FBVztJQUNqRyxPQUFPLFVBQVU7SUFDakIsT0FBTyxpQkFBaUI7SUFDeEIsT0FBTyxRQUFRO0lBQ2YsT0FBTyxpQkFBaUI7O0lBRXhCLE9BQU8sWUFBWSxTQUFTLE9BQU87UUFDL0IsSUFBSSxTQUFTLE1BQU0sUUFBUTtZQUN2QixJQUFJLE9BQU8sTUFBTTtZQUNqQixJQUFJLFNBQVMsSUFBSTtZQUNqQixPQUFPLFNBQVMsVUFBVSxLQUFLO2dCQUMzQixPQUFPLE9BQU8sU0FBUyxRQUFRO29CQUMzQixPQUFPLFVBQVUsSUFBSSxPQUFPOzs7WUFHcEMsT0FBTyxjQUFjOzs7O0lBSTdCLE9BQU8sVUFBVSxTQUFTLE9BQU8sU0FBUztRQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsTUFBTSxDQUFDLFFBQVEsUUFBUSxDQUFDLEVBQUUsV0FBVyxRQUFRLEtBQUs7WUFDdkUsTUFBTSxJQUFJLE1BQU07OztRQUdwQixPQUFPLGlCQUFpQjtRQUN4QixJQUFJLE9BQU8sWUFBWSxjQUFjO1FBQ3JDLElBQUksS0FBSyxJQUFJO1FBQ2IsR0FBRyxPQUFPLFNBQVM7UUFDbkIsSUFBSSxVQUFVO1lBQ1Ysa0JBQWtCLFFBQVE7WUFDMUIsU0FBUyxDQUFDLGdCQUFnQjs7O1FBRzlCLElBQUksTUFBTTthQUNMLFFBQVEsU0FBUyxRQUFRO2FBQ3pCLFFBQVEsT0FBTyxRQUFRO1FBQzVCO2FBQ0ssS0FBSyxLQUFLLElBQUk7YUFDZCxLQUFLLFdBQVc7Z0JBQ2IsVUFBVSxPQUFPO2dCQUNqQixPQUFPLFFBQVE7O2FBRWxCLE1BQU0sU0FBUyxLQUFLO2dCQUNqQixVQUFVLE1BQU0sK0JBQStCLElBQUksS0FBSzs7YUFFM0QsUUFBUSxXQUFXO2dCQUNoQixPQUFPLGlCQUFpQjs7OztBQUl4QyIsImZpbGUiOiJjb250cm9sbGVycy9jb21tb24velBpY1VwbG9hZGVyQ3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdQaWNVcGxvYWRlckN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCAkaHR0cCwgekNvbW1vblV0aWwsIHpOb3RpZmllcikge1xuICAgICRzY29wZS5teUltYWdlID0gJyc7XG4gICAgJHNjb3BlLm15Q3JvcHBlZEltYWdlID0gJyc7XG4gICAgJHNjb3BlLmZpbGVzID0gbnVsbDtcbiAgICAkc2NvcGUuaXNVcGxvYWRpbmdQaWMgPSBmYWxzZTtcblxuICAgICRzY29wZS51cGxvYWRQaWMgPSBmdW5jdGlvbihmaWxlcykge1xuICAgICAgICBpZiAoZmlsZXMgJiYgZmlsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgZmlsZSA9IGZpbGVzWzBdO1xuICAgICAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5teUltYWdlID0gZXZ0LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgJHNjb3BlLnNhdmVQaWMgPSBmdW5jdGlvbihpbWFnZSwgcGljSW5mbykge1xuICAgICAgICBpZiAoIXBpY0luZm8gfHwgIXBpY0luZm8uaWQgfHwgIXBpY0luZm8udHlwZSB8fCAhXy5pc0Z1bmN0aW9uKHBpY0luZm8uY2IpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byB1cGxvYWQgcGljdHVyZSwgcGljSW5mb3tpZCwgdHlwZSwgY2J9IG11c3QgYmUgZGVmaW5lZCBpbiBwYXJlbnQgY29udHJvbGxlcicpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAkc2NvcGUuaXNVcGxvYWRpbmdQaWMgPSB0cnVlO1xuICAgICAgICB2YXIgYmxvYiA9IHpDb21tb25VdGlsLmRhdGFVUkl0b0Jsb2IoaW1hZ2UpO1xuICAgICAgICB2YXIgZmQgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgZmQuYXBwZW5kKCdpbWFnZScsIGJsb2IpO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRyYW5zZm9ybVJlcXVlc3Q6IGFuZ3VsYXIuaWRlbnRpdHksXG4gICAgICAgICAgICBoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6IHVuZGVmaW5lZCB9XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICB2YXIgdXJsID0gJy9hcGkvdXBsb2Fkcy91cGxvYWQ/dHlwZT06dHlwZSZfaWQ9OmlkJ1xuICAgICAgICAgICAgLnJlcGxhY2UoJzp0eXBlJywgcGljSW5mby50eXBlKVxuICAgICAgICAgICAgLnJlcGxhY2UoJzppZCcsIHBpY0luZm8uaWQpO1xuICAgICAgICAkaHR0cFxuICAgICAgICAgICAgLnBvc3QodXJsLCBmZCwgb3B0aW9ucylcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5ub3RpZnkoJ0ltYWdlIHVwbG9hZGVkIHN1Y2Nlc2Z1bGx5Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBpY0luZm8uY2IoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdVbmFibGUgdG8gdXBsb2FkIHBpY3R1cmU6ICcgKyBlcnIuZGF0YS5yZWFzb24pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pc1VwbG9hZGluZ1BpYyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').controller('zAccountsCtrl', ['$scope', function($scope) {
    /* jshint maxlen: 160 */
    $scope.appointments = [
        {clientName: 'Fiona Sawyer', appointmentName: 'Adjustment', appointmentDate: new Date('2014-06-28 10:00'), duration: 5, doctorName: 'Dr Richard'},
        {clientName: 'Xavier Sawyer', appointmentName: 'Adjustment', appointmentDate: new Date('2014-06-28 10:10'), duration: 5, doctorName: 'Dr Richard'},
        {clientName: 'Max Sawyer', appointmentName: 'Adjustment', appointmentDate: new Date('2014-06-28 10:20'), duration: 5, doctorName: 'Dr Richard'},
        {clientName: 'Oscar Sawyer', appointmentName: 'Adjustment', appointmentDate: new Date('2014-06-28 10:30'), duration: 5, doctorName: 'Dr Richard'}
    ];
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9hY2NvdW50cy96QWNjb3VudHNDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcsNEJBQWlCLFNBQVMsUUFBUTs7SUFFL0QsT0FBTyxlQUFlO1FBQ2xCLENBQUMsWUFBWSxnQkFBZ0IsaUJBQWlCLGNBQWMsaUJBQWlCLElBQUksS0FBSyxxQkFBcUIsVUFBVSxHQUFHLFlBQVk7UUFDcEksQ0FBQyxZQUFZLGlCQUFpQixpQkFBaUIsY0FBYyxpQkFBaUIsSUFBSSxLQUFLLHFCQUFxQixVQUFVLEdBQUcsWUFBWTtRQUNySSxDQUFDLFlBQVksY0FBYyxpQkFBaUIsY0FBYyxpQkFBaUIsSUFBSSxLQUFLLHFCQUFxQixVQUFVLEdBQUcsWUFBWTtRQUNsSSxDQUFDLFlBQVksZ0JBQWdCLGlCQUFpQixjQUFjLGlCQUFpQixJQUFJLEtBQUsscUJBQXFCLFVBQVUsR0FBRyxZQUFZOztJQUV6SSIsImZpbGUiOiJjb250cm9sbGVycy9kYXNoYm9hcmQvYWNjb3VudHMvekFjY291bnRzQ3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCd6QWNjb3VudHNDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgLyoganNoaW50IG1heGxlbjogMTYwICovXG4gICAgJHNjb3BlLmFwcG9pbnRtZW50cyA9IFtcbiAgICAgICAge2NsaWVudE5hbWU6ICdGaW9uYSBTYXd5ZXInLCBhcHBvaW50bWVudE5hbWU6ICdBZGp1c3RtZW50JywgYXBwb2ludG1lbnREYXRlOiBuZXcgRGF0ZSgnMjAxNC0wNi0yOCAxMDowMCcpLCBkdXJhdGlvbjogNSwgZG9jdG9yTmFtZTogJ0RyIFJpY2hhcmQnfSxcbiAgICAgICAge2NsaWVudE5hbWU6ICdYYXZpZXIgU2F3eWVyJywgYXBwb2ludG1lbnROYW1lOiAnQWRqdXN0bWVudCcsIGFwcG9pbnRtZW50RGF0ZTogbmV3IERhdGUoJzIwMTQtMDYtMjggMTA6MTAnKSwgZHVyYXRpb246IDUsIGRvY3Rvck5hbWU6ICdEciBSaWNoYXJkJ30sXG4gICAgICAgIHtjbGllbnROYW1lOiAnTWF4IFNhd3llcicsIGFwcG9pbnRtZW50TmFtZTogJ0FkanVzdG1lbnQnLCBhcHBvaW50bWVudERhdGU6IG5ldyBEYXRlKCcyMDE0LTA2LTI4IDEwOjIwJyksIGR1cmF0aW9uOiA1LCBkb2N0b3JOYW1lOiAnRHIgUmljaGFyZCd9LFxuICAgICAgICB7Y2xpZW50TmFtZTogJ09zY2FyIFNhd3llcicsIGFwcG9pbnRtZW50TmFtZTogJ0FkanVzdG1lbnQnLCBhcHBvaW50bWVudERhdGU6IG5ldyBEYXRlKCcyMDE0LTA2LTI4IDEwOjMwJyksIGR1cmF0aW9uOiA1LCBkb2N0b3JOYW1lOiAnRHIgUmljaGFyZCd9XG4gICAgXTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').controller('zResourceDetailsCtrl', ['$scope', '$location', '$routeParams', 'zResource', 'zUser', 'zNotifier', 'zIdentity', function(
    $scope, $location, $routeParams, zResource, zUser, zNotifier, zIdentity) {
    
    $scope.isLoading = true;
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    
    zResource
        .get({ id : $routeParams.id })
        .$promise
        .then(function(resource) {
            $scope.resource = resource;
        })
        .then(function() {
            if ($scope.resource.practitioner) {
                return zUser.get({ id: $scope.resource.practitioner }).$promise;
            }
        })
        .then(function(practitioner) {
            if (practitioner) {
                $scope.resource.practitioner = practitioner;
            }
            $scope.isLoading = false;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load record: ' + err.data.reason);
            $location.path('/appointments/settings/resources');
        });
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvcmVzb3VyY2VzL3pSZXNvdXJjZURldGFpbHNDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcsZ0hBQXdCO0lBQ3JELFFBQVEsV0FBVyxjQUFjLFdBQVcsT0FBTyxXQUFXLFdBQVc7O0lBRXpFLE9BQU8sWUFBWTtJQUNuQixPQUFPLFVBQVUsVUFBVSxhQUFhLENBQUMsU0FBUzs7SUFFbEQ7U0FDSyxJQUFJLEVBQUUsS0FBSyxhQUFhO1NBQ3hCO1NBQ0EsS0FBSyxTQUFTLFVBQVU7WUFDckIsT0FBTyxXQUFXOztTQUVyQixLQUFLLFdBQVc7WUFDYixJQUFJLE9BQU8sU0FBUyxjQUFjO2dCQUM5QixPQUFPLE1BQU0sSUFBSSxFQUFFLElBQUksT0FBTyxTQUFTLGdCQUFnQjs7O1NBRzlELEtBQUssU0FBUyxjQUFjO1lBQ3pCLElBQUksY0FBYztnQkFDZCxPQUFPLFNBQVMsZUFBZTs7WUFFbkMsT0FBTyxZQUFZOztTQUV0QixNQUFNLFNBQVMsS0FBSztZQUNqQixVQUFVLE1BQU0sNEJBQTRCLElBQUksS0FBSztZQUNyRCxVQUFVLEtBQUs7OztBQUczQiIsImZpbGUiOiJjb250cm9sbGVycy9kYXNoYm9hcmQvYXBwb2ludG1lbnRzL3Jlc291cmNlcy96UmVzb3VyY2VEZXRhaWxzQ3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCd6UmVzb3VyY2VEZXRhaWxzQ3RybCcsIGZ1bmN0aW9uKFxuICAgICRzY29wZSwgJGxvY2F0aW9uLCAkcm91dGVQYXJhbXMsIHpSZXNvdXJjZSwgelVzZXIsIHpOb3RpZmllciwgeklkZW50aXR5KSB7XG4gICAgXG4gICAgJHNjb3BlLmlzTG9hZGluZyA9IHRydWU7XG4gICAgJHNjb3BlLmNhbkVkaXQgPSB6SWRlbnRpdHkuaXNBdXRob3JpemVkKFsnb3duZXInLCAnbWFuYWdlciddKTtcbiAgICBcbiAgICB6UmVzb3VyY2VcbiAgICAgICAgLmdldCh7IGlkIDogJHJvdXRlUGFyYW1zLmlkIH0pXG4gICAgICAgIC4kcHJvbWlzZVxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXNvdXJjZSkge1xuICAgICAgICAgICAgJHNjb3BlLnJlc291cmNlID0gcmVzb3VyY2U7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS5yZXNvdXJjZS5wcmFjdGl0aW9uZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gelVzZXIuZ2V0KHsgaWQ6ICRzY29wZS5yZXNvdXJjZS5wcmFjdGl0aW9uZXIgfSkuJHByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHByYWN0aXRpb25lcikge1xuICAgICAgICAgICAgaWYgKHByYWN0aXRpb25lcikge1xuICAgICAgICAgICAgICAgICRzY29wZS5yZXNvdXJjZS5wcmFjdGl0aW9uZXIgPSBwcmFjdGl0aW9uZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkc2NvcGUuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignVW5hYmxlIHRvIGxvYWQgcmVjb3JkOiAnICsgZXJyLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvYXBwb2ludG1lbnRzL3NldHRpbmdzL3Jlc291cmNlcycpO1xuICAgICAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').controller('zResourceEditCtrl', ['$scope', '$routeParams', '$location', '$http', 'zResource', 'zUser', 'zNotifier', 'zIdentity', function($scope, $routeParams, $location, $http, zResource, zUser, zNotifier, zIdentity) {
    $scope.isChangingPic = false;
    $scope.imgChanged = 0;
    $scope.isLoading = true;
    $scope.isSaving = false;
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    
    (function loadData() {
        zResource
            .get({ id: $routeParams.id })
            .$promise
            .then(function(resource) {
                zNotifier.notify('Ready to edit ' + resource.name);
                $scope.resource = resource;
                $scope.picInfo = {
                    id: resource._id,
                    type: 'resource',
                    cb: function() {
                        $scope.resource.pic = 's3';
                        $scope.imgChanged++;
                        $scope.isChangingPic = false;
                    }
                };
            })
            .then(function() {
                return zUser.query({
                    notLinkedToResources: true,
                    'in[]': $scope.resource.practitioner ? [$scope.resource.practitioner] : undefined,
                    'roles[]': ['owner', 'manager', 'admin', 'service provider', 'scheduler'] // TODO: move to config
                }).$promise;
            })
            .then(function(users) {
                $scope.practitioners = users;
                $scope.isLoading = false;
            })
            .catch(function(err) {
                zNotifier.error('Unable to load record: ' + err.data.reason);
                $location.path('/appointments/settings/resources');
            });
    })();
    
    $scope.startChangingPic = function() {
        $scope.isChangingPic = true;
    };

    $scope.cancelChangingPic = function() {
        $scope.isChangingPic = false;
    };
    
    $scope.saveResource = function() {
        $scope.isSaving = true;
        $scope.resource
            .$save()
            .then(function() {
                var practitioner = _.find($scope.practitioners, { _id: $scope.resource.practitioner });
                if (practitioner && practitioner.pic) {
                    var url = '/api/uploads/copy?srcId=:srcId&srcType=user&dstId=:dstId&dstType=resource'
                        .replace(':srcId', $scope.resource.practitioner)
                        .replace(':dstId', $scope.resource._id);
                    return $http.post(url);
                }
            })
            .then(function() {
                zNotifier.notify('Resource updated');
                $location.path('/appointments/settings/resources');
            })
            .catch(function(err) {
                zNotifier.error('Unable to save record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvcmVzb3VyY2VzL3pSZXNvdXJjZUVkaXRDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcsc0hBQXFCLFNBQVMsUUFBUSxjQUFjLFdBQVcsT0FBTyxXQUFXLE9BQU8sV0FBVyxXQUFXO0lBQzNJLE9BQU8sZ0JBQWdCO0lBQ3ZCLE9BQU8sYUFBYTtJQUNwQixPQUFPLFlBQVk7SUFDbkIsT0FBTyxXQUFXO0lBQ2xCLE9BQU8sVUFBVSxVQUFVLGFBQWEsQ0FBQyxTQUFTOztJQUVsRCxDQUFDLFNBQVMsV0FBVztRQUNqQjthQUNLLElBQUksRUFBRSxJQUFJLGFBQWE7YUFDdkI7YUFDQSxLQUFLLFNBQVMsVUFBVTtnQkFDckIsVUFBVSxPQUFPLG1CQUFtQixTQUFTO2dCQUM3QyxPQUFPLFdBQVc7Z0JBQ2xCLE9BQU8sVUFBVTtvQkFDYixJQUFJLFNBQVM7b0JBQ2IsTUFBTTtvQkFDTixJQUFJLFdBQVc7d0JBQ1gsT0FBTyxTQUFTLE1BQU07d0JBQ3RCLE9BQU87d0JBQ1AsT0FBTyxnQkFBZ0I7Ozs7YUFJbEMsS0FBSyxXQUFXO2dCQUNiLE9BQU8sTUFBTSxNQUFNO29CQUNmLHNCQUFzQjtvQkFDdEIsUUFBUSxPQUFPLFNBQVMsZUFBZSxDQUFDLE9BQU8sU0FBUyxnQkFBZ0I7b0JBQ3hFLFdBQVcsQ0FBQyxTQUFTLFdBQVcsU0FBUyxvQkFBb0I7bUJBQzlEOzthQUVOLEtBQUssU0FBUyxPQUFPO2dCQUNsQixPQUFPLGdCQUFnQjtnQkFDdkIsT0FBTyxZQUFZOzthQUV0QixNQUFNLFNBQVMsS0FBSztnQkFDakIsVUFBVSxNQUFNLDRCQUE0QixJQUFJLEtBQUs7Z0JBQ3JELFVBQVUsS0FBSzs7OztJQUkzQixPQUFPLG1CQUFtQixXQUFXO1FBQ2pDLE9BQU8sZ0JBQWdCOzs7SUFHM0IsT0FBTyxvQkFBb0IsV0FBVztRQUNsQyxPQUFPLGdCQUFnQjs7O0lBRzNCLE9BQU8sZUFBZSxXQUFXO1FBQzdCLE9BQU8sV0FBVztRQUNsQixPQUFPO2FBQ0Y7YUFDQSxLQUFLLFdBQVc7Z0JBQ2IsSUFBSSxlQUFlLEVBQUUsS0FBSyxPQUFPLGVBQWUsRUFBRSxLQUFLLE9BQU8sU0FBUztnQkFDdkUsSUFBSSxnQkFBZ0IsYUFBYSxLQUFLO29CQUNsQyxJQUFJLE1BQU07eUJBQ0wsUUFBUSxVQUFVLE9BQU8sU0FBUzt5QkFDbEMsUUFBUSxVQUFVLE9BQU8sU0FBUztvQkFDdkMsT0FBTyxNQUFNLEtBQUs7OzthQUd6QixLQUFLLFdBQVc7Z0JBQ2IsVUFBVSxPQUFPO2dCQUNqQixVQUFVLEtBQUs7O2FBRWxCLE1BQU0sU0FBUyxLQUFLO2dCQUNqQixVQUFVLE1BQU0sNEJBQTRCLElBQUksS0FBSzs7YUFFeEQsUUFBUSxXQUFXO2dCQUNoQixPQUFPLFdBQVc7Ozs7QUFJbEMiLCJmaWxlIjoiY29udHJvbGxlcnMvZGFzaGJvYXJkL2FwcG9pbnRtZW50cy9yZXNvdXJjZXMvelJlc291cmNlRWRpdEN0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignelJlc291cmNlRWRpdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRyb3V0ZVBhcmFtcywgJGxvY2F0aW9uLCAkaHR0cCwgelJlc291cmNlLCB6VXNlciwgek5vdGlmaWVyLCB6SWRlbnRpdHkpIHtcbiAgICAkc2NvcGUuaXNDaGFuZ2luZ1BpYyA9IGZhbHNlO1xuICAgICRzY29wZS5pbWdDaGFuZ2VkID0gMDtcbiAgICAkc2NvcGUuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAkc2NvcGUuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAkc2NvcGUuY2FuRWRpdCA9IHpJZGVudGl0eS5pc0F1dGhvcml6ZWQoWydvd25lcicsICdtYW5hZ2VyJ10pO1xuICAgIFxuICAgIChmdW5jdGlvbiBsb2FkRGF0YSgpIHtcbiAgICAgICAgelJlc291cmNlXG4gICAgICAgICAgICAuZ2V0KHsgaWQ6ICRyb3V0ZVBhcmFtcy5pZCB9KVxuICAgICAgICAgICAgLiRwcm9taXNlXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5ub3RpZnkoJ1JlYWR5IHRvIGVkaXQgJyArIHJlc291cmNlLm5hbWUpO1xuICAgICAgICAgICAgICAgICRzY29wZS5yZXNvdXJjZSA9IHJlc291cmNlO1xuICAgICAgICAgICAgICAgICRzY29wZS5waWNJbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogcmVzb3VyY2UuX2lkLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncmVzb3VyY2UnLFxuICAgICAgICAgICAgICAgICAgICBjYjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUucmVzb3VyY2UucGljID0gJ3MzJztcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5pbWdDaGFuZ2VkKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaXNDaGFuZ2luZ1BpYyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gelVzZXIucXVlcnkoe1xuICAgICAgICAgICAgICAgICAgICBub3RMaW5rZWRUb1Jlc291cmNlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ2luW10nOiAkc2NvcGUucmVzb3VyY2UucHJhY3RpdGlvbmVyID8gWyRzY29wZS5yZXNvdXJjZS5wcmFjdGl0aW9uZXJdIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAncm9sZXNbXSc6IFsnb3duZXInLCAnbWFuYWdlcicsICdhZG1pbicsICdzZXJ2aWNlIHByb3ZpZGVyJywgJ3NjaGVkdWxlciddIC8vIFRPRE86IG1vdmUgdG8gY29uZmlnXG4gICAgICAgICAgICAgICAgfSkuJHByb21pc2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24odXNlcnMpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUucHJhY3RpdGlvbmVycyA9IHVzZXJzO1xuICAgICAgICAgICAgICAgICRzY29wZS5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdVbmFibGUgdG8gbG9hZCByZWNvcmQ6ICcgKyBlcnIuZGF0YS5yZWFzb24pO1xuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvYXBwb2ludG1lbnRzL3NldHRpbmdzL3Jlc291cmNlcycpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSkoKTtcbiAgICBcbiAgICAkc2NvcGUuc3RhcnRDaGFuZ2luZ1BpYyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuaXNDaGFuZ2luZ1BpYyA9IHRydWU7XG4gICAgfTtcblxuICAgICRzY29wZS5jYW5jZWxDaGFuZ2luZ1BpYyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuaXNDaGFuZ2luZ1BpYyA9IGZhbHNlO1xuICAgIH07XG4gICAgXG4gICAgJHNjb3BlLnNhdmVSZXNvdXJjZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuaXNTYXZpbmcgPSB0cnVlO1xuICAgICAgICAkc2NvcGUucmVzb3VyY2VcbiAgICAgICAgICAgIC4kc2F2ZSgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJhY3RpdGlvbmVyID0gXy5maW5kKCRzY29wZS5wcmFjdGl0aW9uZXJzLCB7IF9pZDogJHNjb3BlLnJlc291cmNlLnByYWN0aXRpb25lciB9KTtcbiAgICAgICAgICAgICAgICBpZiAocHJhY3RpdGlvbmVyICYmIHByYWN0aXRpb25lci5waWMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9ICcvYXBpL3VwbG9hZHMvY29weT9zcmNJZD06c3JjSWQmc3JjVHlwZT11c2VyJmRzdElkPTpkc3RJZCZkc3RUeXBlPXJlc291cmNlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJzpzcmNJZCcsICRzY29wZS5yZXNvdXJjZS5wcmFjdGl0aW9uZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgnOmRzdElkJywgJHNjb3BlLnJlc291cmNlLl9pZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KHVybCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5ub3RpZnkoJ1Jlc291cmNlIHVwZGF0ZWQnKTtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2FwcG9pbnRtZW50cy9zZXR0aW5ncy9yZXNvdXJjZXMnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdVbmFibGUgdG8gc2F2ZSByZWNvcmQ6ICcgKyBlcnIuZGF0YS5yZWFzb24pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pc1NhdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').controller('zResourceEditRegionDialogCtrl', ['$scope', '$modalInstance', '$modal', 'region', 'colorpickerOpts', function ($scope, $modalInstance, $modal, region, colorpickerOpts) {
    $scope.region = region;
    $scope.colorpickerOpts = colorpickerOpts;
    
    $scope.delete = function () {
        $modal.open({
            templateUrl: 'views/common/confirmation-dialog.html',
            controller: 'zModalCtrl',
            resolve: {
                items: function() {
                    return {
                        title: 'Delete ' + $scope.region.name + '?',
                        message: $scope.region.name + ' will be permanently deleted.'
                    };
                }
            }
        })
        .result
        .then(function() {
            $scope.region.isDeleted = true;
            $modalInstance.close($scope.region);
        });
    };
    
    $scope.save = function () {
        $modalInstance.close($scope.region);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvcmVzb3VyY2VzL3pSZXNvdXJjZUVkaXRSZWdpb25EaWFsb2dDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcscUdBQWlDLFVBQVUsUUFBUSxnQkFBZ0IsUUFBUSxRQUFRLGlCQUFpQjtJQUNqSSxPQUFPLFNBQVM7SUFDaEIsT0FBTyxrQkFBa0I7O0lBRXpCLE9BQU8sU0FBUyxZQUFZO1FBQ3hCLE9BQU8sS0FBSztZQUNSLGFBQWE7WUFDYixZQUFZO1lBQ1osU0FBUztnQkFDTCxPQUFPLFdBQVc7b0JBQ2QsT0FBTzt3QkFDSCxPQUFPLFlBQVksT0FBTyxPQUFPLE9BQU87d0JBQ3hDLFNBQVMsT0FBTyxPQUFPLE9BQU87Ozs7O1NBSzdDO1NBQ0EsS0FBSyxXQUFXO1lBQ2IsT0FBTyxPQUFPLFlBQVk7WUFDMUIsZUFBZSxNQUFNLE9BQU87Ozs7SUFJcEMsT0FBTyxPQUFPLFlBQVk7UUFDdEIsZUFBZSxNQUFNLE9BQU87OztJQUdoQyxPQUFPLFNBQVMsWUFBWTtRQUN4QixlQUFlLFFBQVE7OztBQUcvQiIsImZpbGUiOiJjb250cm9sbGVycy9kYXNoYm9hcmQvYXBwb2ludG1lbnRzL3Jlc291cmNlcy96UmVzb3VyY2VFZGl0UmVnaW9uRGlhbG9nQ3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCd6UmVzb3VyY2VFZGl0UmVnaW9uRGlhbG9nQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsICRtb2RhbEluc3RhbmNlLCAkbW9kYWwsIHJlZ2lvbiwgY29sb3JwaWNrZXJPcHRzKSB7XG4gICAgJHNjb3BlLnJlZ2lvbiA9IHJlZ2lvbjtcbiAgICAkc2NvcGUuY29sb3JwaWNrZXJPcHRzID0gY29sb3JwaWNrZXJPcHRzO1xuICAgIFxuICAgICRzY29wZS5kZWxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRtb2RhbC5vcGVuKHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvY29tbW9uL2NvbmZpcm1hdGlvbi1kaWFsb2cuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnek1vZGFsQ3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgaXRlbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdEZWxldGUgJyArICRzY29wZS5yZWdpb24ubmFtZSArICc/JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICRzY29wZS5yZWdpb24ubmFtZSArICcgd2lsbCBiZSBwZXJtYW5lbnRseSBkZWxldGVkLidcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5yZXN1bHRcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUucmVnaW9uLmlzRGVsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUucmVnaW9uKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBcbiAgICAkc2NvcGUuc2F2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJG1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLnJlZ2lvbik7XG4gICAgfTtcblxuICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRtb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xuICAgIH07XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').controller('zResourceListCtrl', ['$scope', 'zResource', 'zUser', 'zIdentity', function($scope, zResource, zUser, zIdentity) {
    zResource
        .query({ 'includes[]': ['practitioner'] })
        .$promise
        .then(function(resources) {
            _.each(resources, function(resource) {
                if (resource.practitioner) {
                    resource.practitionerName = zUser.getName(resource.practitioner);
                }
            });
            $scope.resources = resources;
        });
    
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvcmVzb3VyY2VzL3pSZXNvdXJjZUxpc3RDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcsbUVBQXFCLFNBQVMsUUFBUSxXQUFXLE9BQU8sV0FBVztJQUNoRztTQUNLLE1BQU0sRUFBRSxjQUFjLENBQUM7U0FDdkI7U0FDQSxLQUFLLFNBQVMsV0FBVztZQUN0QixFQUFFLEtBQUssV0FBVyxTQUFTLFVBQVU7Z0JBQ2pDLElBQUksU0FBUyxjQUFjO29CQUN2QixTQUFTLG1CQUFtQixNQUFNLFFBQVEsU0FBUzs7O1lBRzNELE9BQU8sWUFBWTs7O0lBRzNCLE9BQU8sVUFBVSxVQUFVLGFBQWEsQ0FBQyxTQUFTOztBQUV0RCIsImZpbGUiOiJjb250cm9sbGVycy9kYXNoYm9hcmQvYXBwb2ludG1lbnRzL3Jlc291cmNlcy96UmVzb3VyY2VMaXN0Q3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCd6UmVzb3VyY2VMaXN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgelJlc291cmNlLCB6VXNlciwgeklkZW50aXR5KSB7XG4gICAgelJlc291cmNlXG4gICAgICAgIC5xdWVyeSh7ICdpbmNsdWRlc1tdJzogWydwcmFjdGl0aW9uZXInXSB9KVxuICAgICAgICAuJHByb21pc2VcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzb3VyY2VzKSB7XG4gICAgICAgICAgICBfLmVhY2gocmVzb3VyY2VzLCBmdW5jdGlvbihyZXNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGlmIChyZXNvdXJjZS5wcmFjdGl0aW9uZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucHJhY3RpdGlvbmVyTmFtZSA9IHpVc2VyLmdldE5hbWUocmVzb3VyY2UucHJhY3RpdGlvbmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRzY29wZS5yZXNvdXJjZXMgPSByZXNvdXJjZXM7XG4gICAgICAgIH0pO1xuICAgIFxuICAgICRzY29wZS5jYW5FZGl0ID0geklkZW50aXR5LmlzQXV0aG9yaXplZChbJ293bmVyJywgJ21hbmFnZXInXSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').controller('zResourceNewCtrl', ['$scope', '$routeParams', '$location', '$http', 'zNotifier', 'zResource', 'zUser', function($scope, $routeParams, $location, $http, zNotifier, zResource, zUser) {
    $scope.isSaving = false;
    
    (function loadData() {
        /* jshint newcap: false */
        $scope.resource = new zResource({ status: 'active' });
        
        zUser
            .query({
              notLinkedToResources: true,
              'roles': ['owner', 'manager', 'admin', 'service provider', 'scheduler'] // TODO: move to config
            })
            .$promise
            .then(function(users) {
                $scope.practitioners = users;
            });
    })();
    
    $scope.createResource = function() {
        $scope.isSaving = true;
        $scope.resource
            .$save()
            .then(function() {
                var practitioner = _.find($scope.practitioners, { _id: $scope.resource.practitioner });
                if (practitioner && practitioner.pic) {
                    var url = '/api/uploads/copy?srcId=:srcId&srcType=user&dstId=:dstId&dstType=resource'
                        .replace(':srcId', $scope.resource.practitioner)
                        .replace(':dstId', $scope.resource._id);
                    return $http.post(url);
                }
            })
            .then(function() {
                zNotifier.notify('Resource record created');
                $location.path('/appointments/settings/resources');
            })
            .catch(function(err) {
                zNotifier.error('Unable to save changes: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvcmVzb3VyY2VzL3pSZXNvdXJjZU5ld0N0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sV0FBVyx3R0FBb0IsU0FBUyxRQUFRLGNBQWMsV0FBVyxPQUFPLFdBQVcsV0FBVyxPQUFPO0lBQy9ILE9BQU8sV0FBVzs7SUFFbEIsQ0FBQyxTQUFTLFdBQVc7O1FBRWpCLE9BQU8sV0FBVyxJQUFJLFVBQVUsRUFBRSxRQUFROztRQUUxQzthQUNLLE1BQU07Y0FDTCxzQkFBc0I7Y0FDdEIsU0FBUyxDQUFDLFNBQVMsV0FBVyxTQUFTLG9CQUFvQjs7YUFFNUQ7YUFDQSxLQUFLLFNBQVMsT0FBTztnQkFDbEIsT0FBTyxnQkFBZ0I7Ozs7SUFJbkMsT0FBTyxpQkFBaUIsV0FBVztRQUMvQixPQUFPLFdBQVc7UUFDbEIsT0FBTzthQUNGO2FBQ0EsS0FBSyxXQUFXO2dCQUNiLElBQUksZUFBZSxFQUFFLEtBQUssT0FBTyxlQUFlLEVBQUUsS0FBSyxPQUFPLFNBQVM7Z0JBQ3ZFLElBQUksZ0JBQWdCLGFBQWEsS0FBSztvQkFDbEMsSUFBSSxNQUFNO3lCQUNMLFFBQVEsVUFBVSxPQUFPLFNBQVM7eUJBQ2xDLFFBQVEsVUFBVSxPQUFPLFNBQVM7b0JBQ3ZDLE9BQU8sTUFBTSxLQUFLOzs7YUFHekIsS0FBSyxXQUFXO2dCQUNiLFVBQVUsT0FBTztnQkFDakIsVUFBVSxLQUFLOzthQUVsQixNQUFNLFNBQVMsS0FBSztnQkFDakIsVUFBVSxNQUFNLDZCQUE2QixJQUFJLEtBQUs7O2FBRXpELFFBQVEsV0FBVztnQkFDaEIsT0FBTyxXQUFXOzs7O0FBSWxDIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvcmVzb3VyY2VzL3pSZXNvdXJjZU5ld0N0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignelJlc291cmNlTmV3Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvdXRlUGFyYW1zLCAkbG9jYXRpb24sICRodHRwLCB6Tm90aWZpZXIsIHpSZXNvdXJjZSwgelVzZXIpIHtcbiAgICAkc2NvcGUuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICBcbiAgICAoZnVuY3Rpb24gbG9hZERhdGEoKSB7XG4gICAgICAgIC8qIGpzaGludCBuZXdjYXA6IGZhbHNlICovXG4gICAgICAgICRzY29wZS5yZXNvdXJjZSA9IG5ldyB6UmVzb3VyY2UoeyBzdGF0dXM6ICdhY3RpdmUnIH0pO1xuICAgICAgICBcbiAgICAgICAgelVzZXJcbiAgICAgICAgICAgIC5xdWVyeSh7XG4gICAgICAgICAgICAgIG5vdExpbmtlZFRvUmVzb3VyY2VzOiB0cnVlLFxuICAgICAgICAgICAgICAncm9sZXMnOiBbJ293bmVyJywgJ21hbmFnZXInLCAnYWRtaW4nLCAnc2VydmljZSBwcm92aWRlcicsICdzY2hlZHVsZXInXSAvLyBUT0RPOiBtb3ZlIHRvIGNvbmZpZ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC4kcHJvbWlzZVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24odXNlcnMpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUucHJhY3RpdGlvbmVycyA9IHVzZXJzO1xuICAgICAgICAgICAgfSk7XG4gICAgfSkoKTtcbiAgICBcbiAgICAkc2NvcGUuY3JlYXRlUmVzb3VyY2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLmlzU2F2aW5nID0gdHJ1ZTtcbiAgICAgICAgJHNjb3BlLnJlc291cmNlXG4gICAgICAgICAgICAuJHNhdmUoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByYWN0aXRpb25lciA9IF8uZmluZCgkc2NvcGUucHJhY3RpdGlvbmVycywgeyBfaWQ6ICRzY29wZS5yZXNvdXJjZS5wcmFjdGl0aW9uZXIgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHByYWN0aXRpb25lciAmJiBwcmFjdGl0aW9uZXIucGljKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPSAnL2FwaS91cGxvYWRzL2NvcHk/c3JjSWQ9OnNyY0lkJnNyY1R5cGU9dXNlciZkc3RJZD06ZHN0SWQmZHN0VHlwZT1yZXNvdXJjZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCc6c3JjSWQnLCAkc2NvcGUucmVzb3VyY2UucHJhY3RpdGlvbmVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJzpkc3RJZCcsICRzY29wZS5yZXNvdXJjZS5faWQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCh1cmwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIubm90aWZ5KCdSZXNvdXJjZSByZWNvcmQgY3JlYXRlZCcpO1xuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvYXBwb2ludG1lbnRzL3NldHRpbmdzL3Jlc291cmNlcycpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIuZXJyb3IoJ1VuYWJsZSB0byBzYXZlIGNoYW5nZXM6ICcgKyBlcnIuZGF0YS5yZWFzb24pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pc1NhdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').controller('zResourceWeekAvTimesCtrl', ['$scope', '$routeParams', '$location', '$modal', 'zNotifier', 'zIdentity', 'zResource', 'zAppointmentTemplate', 'zResourceWeekAvTimes', function(
    $scope, $routeParams, $location, $modal, zNotifier, zIdentity, zResource, zAppointmentTemplate, zResourceWeekAvTimes) {
    /* jshint maxstatements: false */
    
    var defaultDate = '2000-01-01';
    
    // TODO $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    $scope.isLoading = true;
    $scope.yearsFilter = _.range(2015, 2021);
    $scope.weeksFilter = _.range(1, 52);
    $scope.hoursFromFilter = _.range(0, 24);
    $scope.hoursToFilter = _.range(1, 25);
    $scope.year = 2015;
    $scope.weeknumber = 1;
    $scope.hourFrom = 0;
    $scope.hourTo = 24;
    $scope.colorpickerOpts = {
        showPalette: true,
        palette: ['rgb(255, 0, 0)',     'rgb(0, 255, 0)',     'rgb(0, 0, 255)',
                  'rgb(176, 255, 119)', 'rgb(198, 180, 247)', 'rgb(112, 244, 220)',
                  'rgb(196, 246, 255)', 'rgb(115, 123, 244)', 'rgb(252, 176, 230)',
                  'rgb(249, 127, 137)', 'rgb(249, 201, 152)', 'rgb(252, 190, 35)',
                  'rgb(102, 198, 131)', 'rgb(255, 0, 255)'
        ]
    };
    var weekdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var defaultRegions = [
        { id: 0, name: 'Avaliable', bgColor: 'rgb(0, 255, 0)', appointmentTemplates: [] },
        { id: 1, name: 'Not avaliable', bgColor: 'rgb(255, 0, 0)', appointmentTemplates: [] }
    ];
    
    $scope.isProcessing = function() {
        return $scope.isLoading || $scope.isSaving;
    };
    
    $scope.setCellRegion = function(selectedWeekday, selectedCell) {
        if (!$scope.currentRegion || $scope.isProcessing()) {
            return;
        }
        
        var cellColor = $scope.currentRegion.bgColor;
        var newBlocks = [];
        var currentBlock;
        var cellCount = (24 * 60) / $scope.resource.appointmentInterval;
        _.each(_.range(0, cellCount), function(i) {
            var cellTime = _addInterval(0, i);
            var isSelectedCell = cellTime === selectedCell.time;
            
            var foundBlock = _.find(selectedWeekday.blocks, function(block) {
                return cellTime >= block.start && cellTime < block.end;
            });
            
            if (foundBlock || isSelectedCell) {
                var newBlockRegionId = isSelectedCell ? $scope.currentRegion.id : foundBlock.regionId;
                if (isSelectedCell && foundBlock && foundBlock.regionId === newBlockRegionId) {
                    // Deselect already selected cell with the same block
                    currentBlock = null;
                    cellColor = 'white';
                } else if (currentBlock && currentBlock.regionId === newBlockRegionId) {
                    // Extend current block to one interval
                    currentBlock.end = _addInterval(cellTime, 1);
                } else {
                    // Create a new block
                    currentBlock = {
                        weekday: selectedWeekday.weekday,
                        regionId: newBlockRegionId,
                        start: cellTime,
                        end: _addInterval(cellTime, 1)
                    };
                    newBlocks.push(currentBlock);
                }
            } else if (currentBlock) {
                currentBlock = null;
            }
        });
        
        selectedCell.bgColor = cellColor;
        selectedWeekday.blocks = newBlocks;
    };
    
    $scope.changeYear = function() {
        _initWeeksFilter('first');
        _saveFiltersAndReloadData();
    };
    
    $scope.changeWeek = function() {
        _saveFiltersAndReloadData();
    };
    
    $scope.changeHour = function() {
        if ($scope.hourTo - $scope.hourFrom <= 0) {
            $scope.hourTo = $scope.hourFrom + 1;
        }
        _saveFiltersAndRefreshTable();
    };
    
    $scope.selectPrevWeek = function() {
        var weeknumber = $scope.weeknumber - 1;
        if (weeknumber >= 1) {
            $scope.weeknumber = weeknumber;
            _saveFiltersAndReloadData();
        } else if ($scope.year > 2015) {
            $scope.year--;
            _initWeeksFilter('last');
            _saveFiltersAndReloadData();
        }
    };
    
    $scope.selectNextWeek = function() {
        var weeknumber = $scope.weeknumber + 1;
        if (weeknumber <= $scope.weeksFilter[$scope.weeksFilter.length - 1].value) {
            $scope.weeknumber = weeknumber;
            _saveFiltersAndReloadData();
        } else if ($scope.year < 2020) {
            $scope.year++;
            _initWeeksFilter('first');
            _saveFiltersAndReloadData();
        }
    };
    
    $scope.selectCurrentWeek = function() {
        $scope.year = moment().year();
        _initWeeksFilter('current');
        _saveFiltersAndReloadData();
    };
    
    $scope.disablePrevWeek = function() {
        return ($scope.weeknumber === 1 && $scope.year === 2015);
    };
    
    $scope.disableNextWeek = function() {
        return ($scope.weeknumber === $scope.weeksFilter[$scope.weeksFilter.length - 1].value && $scope.year === 2020);
    };
    
    $scope.disableCurrentWeek = function() {
        var now = moment();
        return ($scope.year === now.year() && $scope.weeknumber === now.week());
    };
    
    $scope.addRegion = function() {
        var usedBgColors = _.pluck($scope.regions, 'bgColor');
        var avaliableBgColors = _.difference($scope.colorpickerOpts.palette, usedBgColors);
        var newId = _($scope.regions)
            .pluck('id')
            .max() + 1;
        var ats = _.clone($scope.appointmentTemplates, true);
        
        var newRegion = {
            isNew: true,
            id: newId,
            name: 'New Region' + newId,
            bgColor: avaliableBgColors[0] || 'rgb(255, 0, 0)',
            appointmentTemplates: ats
        };
        $scope.editRegion(newRegion);
    };
    
    $scope.editRegion = function(region) {
        var modalInstance = $modal.open({
            templateUrl: 'views/dashboard/appointments/resources/resource-edit-region-dialog.html',
            controller: 'zResourceEditRegionDialogCtrl',
            resolve: {
                region: function() {
                    return _.clone(region, true);
                },
                colorpickerOpts: function() {
                    return $scope.colorpickerOpts;
                }
            }
        });
        
        modalInstance.result
            .then(function(editedRegion) {
                if (editedRegion.isDeleted) {
                    _deleteRegion(region);
                } else {
                    region.name = editedRegion.name;
                    region.bgColor = editedRegion.bgColor;
                    region.appointmentTemplates = editedRegion.appointmentTemplates;
                    if (region.isNew) {
                        region.isNew = false;
                        $scope.regions.push(region);
                        $scope.currentRegion = region;
                    }
                }
                _refreshTable();
            });
    };
    
    $scope.save = function(skipNotify) {
        _updateResourceRegions();
        _updateResourceWeekAvTimesBlocks();
        
        $scope.isSaving = true;
        return $scope.resource
            .$updateRegions()
            .then(function() {
                return $scope.resourceWeekAvTimes.$save();
            })
            .then(function () {
                if (!skipNotify) {
                    zNotifier.notify('Resource saved');
                }
            })
            .catch(function (err) {
                if (!skipNotify) {
                    zNotifier.error('Unable to save: ' + err.data.reason);
                }
            })
            .finally(function() {
                if (!skipNotify) {
                    $scope.isSaving = false;
                }
            });
    };
    
    $scope.clone = function() {
        $modal.open({
            templateUrl: 'views/common/confirmation-dialog.html',
            controller: 'zModalCtrl',
            resolve: {
                items: function() {
                    return {
                        title: 'Apply Availability to following weeks',
                        message: 'This will apply this availability pattern to all subsequent weeks for ' + 
                                 $scope.resource.name +
                                 '\nAny existing availability patterns will be overwritten'
                    };
                }
            }
        })
        .result
        .then(function() {
            $scope.isSaving = true;
            return $scope.save(true);
        })
        .then(function() {
            /* jshint newcap: false */
            var resourceWeekAvTimes = new zResourceWeekAvTimes({
                resource: $scope.resource._id,
                year: $scope.year,
                weeknumber: $scope.weeknumber
            });
            return resourceWeekAvTimes.$clone();
        })
        .then(function() {
            zNotifier.notify('Availability pattern copied to all subsequent weeks');
        })
        .catch(function (err) {
            if (err !== 'cancel') {
                zNotifier.error('Unable to copy availability pattern: ' + err.data.reason);
            }
        })
        .finally(function() {
            $scope.isSaving = false;
        });
    };
    
    function _loadData() {
        zAppointmentTemplate
            .query()
            .$promise
            .then(function(ats) {
                $scope.appointmentTemplates = ats;
                return zResource.get({ id : $routeParams.id }).$promise;
            })
            .then(function(resource) {
                if (!resource.regions || resource.regions.length === 0) {
                    resource.regions = _.clone(defaultRegions, true);
                }
                var regions = [];
                _.each(resource.regions, function(region) {
                    var ats = _.clone($scope.appointmentTemplates, true);
                    _.each(ats, function(at) {
                        at.isSelected = _.indexOf(region.appointmentTemplates, at._id) !== -1;
                    });
                    var newRegion = _.clone(region, true);
                    newRegion.appointmentTemplates = ats;
                    regions.push(newRegion);
                });
                
                $scope.resource = resource;
                $scope.regions = regions;
                $scope.currentRegion = $scope.regions[0];
            })
            .then(function() {
                return _loadResourceWeekAvTimes(true);
            })
            .catch(function(err) {
                zNotifier.error('Unable to load record: ' + err.data.reason);
                $location.path('/appointments/settings/resources');
            })
            .finally(function() {
                $scope.isLoading = false;
            });
    }
    
    function _loadResourceWeekAvTimes(skipNotify) {
        $scope.isLoading = true;
        return zResourceWeekAvTimes
            .get({
                resource: $scope.resource._id,
                year: $scope.year,
                weeknumber: $scope.weeknumber
            })
            .$promise
            .then(function(resourceWeekAvTimes) {
                var blocks = [];
                var regionIds = _.pluck($scope.regions, 'id');
                for (var i = 0; i < 7; i++) {
                    /* jshint -W083 */
                    var dayBlocks = _.filter(resourceWeekAvTimes.blocks, function(block) {
                        return _.includes(regionIds, block.regionId) && block.weekday === i;
                    });
                    blocks.push({
                        weekday: i,
                        weekdayName: weekdayNames[i],
                        blocks: dayBlocks
                    });
                }
                
                $scope.resourceWeekAvTimes = resourceWeekAvTimes;
                if (!$scope.resourceWeekAvTimes.resource) {
                    /* jshint newcap: false */
                    $scope.resourceWeekAvTimes = new zResourceWeekAvTimes({
                        resource: $scope.resource._id,
                        year: $scope.year,
                        weeknumber: $scope.weeknumber
                    });
                }
                $scope.blocks = blocks;
                
                _refreshTable();
            })
            .catch(function(err) {
                if (!skipNotify) {
                    zNotifier.error('Unable to load record: ' + err.data.reason);
                }
            })
            .finally(function() {
                if (!skipNotify) {
                    $scope.isLoading = false;
                }
            });
    }
    
    function _applyFilters() {
        var resourceWeekAvTimes = $.cookie('resourceWeekAvTimes');
        if (resourceWeekAvTimes && resourceWeekAvTimes.filters) {
            var filters = resourceWeekAvTimes.filters;
            if (filters.hours) {
                $scope.hourFrom = filters.hours.from;
                $scope.hourTo = filters.hours.to;
            }
            if (filters.yearweek) {
                $scope.year = filters.yearweek.year;
                $scope.weeknumber = filters.yearweek.weeknumber;
            }
        } else {
            $scope.year = moment().year();
            $scope.weeknumber = moment().week();
        }
    }
    
    function _saveFilters() {
        var resourceWeekAvTimes = {
            filters: {
                hours: {
                    from: $scope.hourFrom,
                    to: $scope.hourTo
                },
                yearweek: {
                    year: $scope.year,
                    weeknumber: $scope.weeknumber
                }
            }
        };
        $.cookie('resourceWeekAvTimes', resourceWeekAvTimes, { expires: 365, path: '/' });
    }
    
    function _initWeeksFilter(selectWeek) {
        var startOfYear = moment($scope.year, 'YYYY').startOf('isoWeek');
        if (startOfYear.year() !== $scope.year) {
            startOfYear.add(1, 'week');
        }
        var weeks = [];
        var i = 0;
        while (true) {
            var startOfWeek = moment(startOfYear).add(i, 'week');
            var endOfWeek = moment(startOfYear).add(i + 1, 'week');
            if (startOfWeek.year() > $scope.year) {
                break;
            }
            var week = {
                value: i + 1,
                text: 'week ' + (i + 1) + ', (' + startOfWeek.format('MMM, DD') + ' - ' + endOfWeek.format('MMM, DD') + ')'
            };
            weeks.push(week);
            i++;
        }
        
        $scope.weeksFilter = weeks;
        switch (selectWeek) {
            case 'first':
                $scope.weeknumber = 1;
                break;
            case 'last':
                $scope.weeknumber = weeks[weeks.length - 1].value;
                break;
            case 'current':
                $scope.weeknumber = moment().week();
                break;
            default:
                if ($scope.weeknumber > weeks[weeks.length - 1].value) {
                    $scope.weeknumber = 1;
                }
                break;
        }
    }
    
    function _saveFiltersAndReloadData() {
        _saveFilters();
        _loadResourceWeekAvTimes();
    }
    
    function _saveFiltersAndRefreshTable() {
        _saveFilters();
        _refreshTable();
    }
    
    function _deleteRegion(region) {
        _.remove($scope.regions, region);
        _.each($scope.blocks, function(db) {
            _.remove(db.blocks, { regionId: region.id });
        });
        
        if ($scope.currentRegion === region) {
            if ($scope.regions.length > 0) {
                $scope.currentRegion = $scope.regions[0];
            } else {
                $scope.currentRegion = null;
            }
        }
        
        _refreshTable();
    }
    
    function _updateResourceRegions() {
        var allRegions = [];
        _.each($scope.regions, function(region) {
            var newRegion = _.clone(region, true);
            newRegion.appointmentTemplates = _(region.appointmentTemplates)
                .filter({ isSelected: true })
                .pluck('_id')
                .value();
            allRegions.push(newRegion);
        });
        $scope.resource.regions = allRegions;
    }
    
    function _updateResourceWeekAvTimesBlocks() {
        var allBlocks = [];
        _.each($scope.blocks, function(dayBlocks) {
            var newBlocks = _.clone(dayBlocks.blocks, true);
            allBlocks = allBlocks.concat(newBlocks);
        });
        $scope.resourceWeekAvTimes.blocks = allBlocks;
    }
    
    function _addInterval(start, index) {
        return start + index * $scope.resource.appointmentInterval;
    }
    
    function _createDateObj(mins) {
        return moment(defaultDate).add(mins, 'minute').toDate();
    }
    
    function _refreshTable() {
        if ($scope.invalidFilter) {
            return;
        }
        
        var interval = $scope.hourTo - $scope.hourFrom;
        $scope.cellCount = (interval * 60) / $scope.resource.appointmentInterval;
        
        $scope.timeCells = [];
        var timeCellCount;
        for (var i = 4; i < 10; i++) {
            if ($scope.cellCount % i === 0) {
                timeCellCount = i;
                break;
            }
        }
        var timeCellStep = interval * 60 / timeCellCount;
        for (i = 0; i < timeCellCount; i++) {
            var timeCell = {
                colspan: $scope.cellCount / timeCellCount,
                dt: _createDateObj($scope.hourFrom * 60 + timeCellStep * i)
            };
            $scope.timeCells.push(timeCell);
        }
        
        _.each($scope.blocks, function(db) {
            db.cells = [];
            _.each(_.range(0, $scope.cellCount), function(i) {
                var time = _addInterval($scope.hourFrom * 60, i);
                var cell = {
                    time: time,
                    dt: _createDateObj(time)
                };
                db.cells.push(cell);
                
                // TODO: ask Richard
                /*
                if (dayIndex >= 5) {
                    cell.bgColor = $scope.regions[1].bgColor;
                    return;
                }*/
                
                _.each(db.blocks, function(block) {
                    var isBeetwen = time >= block.start && time < block.end;
                    if (isBeetwen) {
                        var region = _.find($scope.regions, { id: block.regionId });
                        cell.bgColor = region.bgColor;
                        return false;
                    }
                });
            });
        });
    }
    
    _applyFilters();
    _initWeeksFilter();
    _loadData();
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvcmVzb3VyY2VzL3pSZXNvdXJjZVdlZWtBdlRpbWVzQ3RybC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxXQUFXLHFLQUE0QjtJQUN6RCxRQUFRLGNBQWMsV0FBVyxRQUFRLFdBQVcsV0FBVyxXQUFXLHNCQUFzQixzQkFBc0I7OztJQUd0SCxJQUFJLGNBQWM7OztJQUdsQixPQUFPLFlBQVk7SUFDbkIsT0FBTyxjQUFjLEVBQUUsTUFBTSxNQUFNO0lBQ25DLE9BQU8sY0FBYyxFQUFFLE1BQU0sR0FBRztJQUNoQyxPQUFPLGtCQUFrQixFQUFFLE1BQU0sR0FBRztJQUNwQyxPQUFPLGdCQUFnQixFQUFFLE1BQU0sR0FBRztJQUNsQyxPQUFPLE9BQU87SUFDZCxPQUFPLGFBQWE7SUFDcEIsT0FBTyxXQUFXO0lBQ2xCLE9BQU8sU0FBUztJQUNoQixPQUFPLGtCQUFrQjtRQUNyQixhQUFhO1FBQ2IsU0FBUyxDQUFDLHNCQUFzQixzQkFBc0I7a0JBQzVDLHNCQUFzQixzQkFBc0I7a0JBQzVDLHNCQUFzQixzQkFBc0I7a0JBQzVDLHNCQUFzQixzQkFBc0I7a0JBQzVDLHNCQUFzQjs7O0lBR3BDLElBQUksZUFBZSxDQUFDLFVBQVUsV0FBVyxhQUFhLFlBQVksVUFBVSxZQUFZO0lBQ3hGLElBQUksaUJBQWlCO1FBQ2pCLEVBQUUsSUFBSSxHQUFHLE1BQU0sYUFBYSxTQUFTLGtCQUFrQixzQkFBc0I7UUFDN0UsRUFBRSxJQUFJLEdBQUcsTUFBTSxpQkFBaUIsU0FBUyxrQkFBa0Isc0JBQXNCOzs7SUFHckYsT0FBTyxlQUFlLFdBQVc7UUFDN0IsT0FBTyxPQUFPLGFBQWEsT0FBTzs7O0lBR3RDLE9BQU8sZ0JBQWdCLFNBQVMsaUJBQWlCLGNBQWM7UUFDM0QsSUFBSSxDQUFDLE9BQU8saUJBQWlCLE9BQU8sZ0JBQWdCO1lBQ2hEOzs7UUFHSixJQUFJLFlBQVksT0FBTyxjQUFjO1FBQ3JDLElBQUksWUFBWTtRQUNoQixJQUFJO1FBQ0osSUFBSSxZQUFZLENBQUMsS0FBSyxNQUFNLE9BQU8sU0FBUztRQUM1QyxFQUFFLEtBQUssRUFBRSxNQUFNLEdBQUcsWUFBWSxTQUFTLEdBQUc7WUFDdEMsSUFBSSxXQUFXLGFBQWEsR0FBRztZQUMvQixJQUFJLGlCQUFpQixhQUFhLGFBQWE7O1lBRS9DLElBQUksYUFBYSxFQUFFLEtBQUssZ0JBQWdCLFFBQVEsU0FBUyxPQUFPO2dCQUM1RCxPQUFPLFlBQVksTUFBTSxTQUFTLFdBQVcsTUFBTTs7O1lBR3ZELElBQUksY0FBYyxnQkFBZ0I7Z0JBQzlCLElBQUksbUJBQW1CLGlCQUFpQixPQUFPLGNBQWMsS0FBSyxXQUFXO2dCQUM3RSxJQUFJLGtCQUFrQixjQUFjLFdBQVcsYUFBYSxrQkFBa0I7O29CQUUxRSxlQUFlO29CQUNmLFlBQVk7dUJBQ1QsSUFBSSxnQkFBZ0IsYUFBYSxhQUFhLGtCQUFrQjs7b0JBRW5FLGFBQWEsTUFBTSxhQUFhLFVBQVU7dUJBQ3ZDOztvQkFFSCxlQUFlO3dCQUNYLFNBQVMsZ0JBQWdCO3dCQUN6QixVQUFVO3dCQUNWLE9BQU87d0JBQ1AsS0FBSyxhQUFhLFVBQVU7O29CQUVoQyxVQUFVLEtBQUs7O21CQUVoQixJQUFJLGNBQWM7Z0JBQ3JCLGVBQWU7Ozs7UUFJdkIsYUFBYSxVQUFVO1FBQ3ZCLGdCQUFnQixTQUFTOzs7SUFHN0IsT0FBTyxhQUFhLFdBQVc7UUFDM0IsaUJBQWlCO1FBQ2pCOzs7SUFHSixPQUFPLGFBQWEsV0FBVztRQUMzQjs7O0lBR0osT0FBTyxhQUFhLFdBQVc7UUFDM0IsSUFBSSxPQUFPLFNBQVMsT0FBTyxZQUFZLEdBQUc7WUFDdEMsT0FBTyxTQUFTLE9BQU8sV0FBVzs7UUFFdEM7OztJQUdKLE9BQU8saUJBQWlCLFdBQVc7UUFDL0IsSUFBSSxhQUFhLE9BQU8sYUFBYTtRQUNyQyxJQUFJLGNBQWMsR0FBRztZQUNqQixPQUFPLGFBQWE7WUFDcEI7ZUFDRyxJQUFJLE9BQU8sT0FBTyxNQUFNO1lBQzNCLE9BQU87WUFDUCxpQkFBaUI7WUFDakI7Ozs7SUFJUixPQUFPLGlCQUFpQixXQUFXO1FBQy9CLElBQUksYUFBYSxPQUFPLGFBQWE7UUFDckMsSUFBSSxjQUFjLE9BQU8sWUFBWSxPQUFPLFlBQVksU0FBUyxHQUFHLE9BQU87WUFDdkUsT0FBTyxhQUFhO1lBQ3BCO2VBQ0csSUFBSSxPQUFPLE9BQU8sTUFBTTtZQUMzQixPQUFPO1lBQ1AsaUJBQWlCO1lBQ2pCOzs7O0lBSVIsT0FBTyxvQkFBb0IsV0FBVztRQUNsQyxPQUFPLE9BQU8sU0FBUztRQUN2QixpQkFBaUI7UUFDakI7OztJQUdKLE9BQU8sa0JBQWtCLFdBQVc7UUFDaEMsUUFBUSxPQUFPLGVBQWUsS0FBSyxPQUFPLFNBQVM7OztJQUd2RCxPQUFPLGtCQUFrQixXQUFXO1FBQ2hDLFFBQVEsT0FBTyxlQUFlLE9BQU8sWUFBWSxPQUFPLFlBQVksU0FBUyxHQUFHLFNBQVMsT0FBTyxTQUFTOzs7SUFHN0csT0FBTyxxQkFBcUIsV0FBVztRQUNuQyxJQUFJLE1BQU07UUFDVixRQUFRLE9BQU8sU0FBUyxJQUFJLFVBQVUsT0FBTyxlQUFlLElBQUk7OztJQUdwRSxPQUFPLFlBQVksV0FBVztRQUMxQixJQUFJLGVBQWUsRUFBRSxNQUFNLE9BQU8sU0FBUztRQUMzQyxJQUFJLG9CQUFvQixFQUFFLFdBQVcsT0FBTyxnQkFBZ0IsU0FBUztRQUNyRSxJQUFJLFFBQVEsRUFBRSxPQUFPO2FBQ2hCLE1BQU07YUFDTixRQUFRO1FBQ2IsSUFBSSxNQUFNLEVBQUUsTUFBTSxPQUFPLHNCQUFzQjs7UUFFL0MsSUFBSSxZQUFZO1lBQ1osT0FBTztZQUNQLElBQUk7WUFDSixNQUFNLGVBQWU7WUFDckIsU0FBUyxrQkFBa0IsTUFBTTtZQUNqQyxzQkFBc0I7O1FBRTFCLE9BQU8sV0FBVzs7O0lBR3RCLE9BQU8sYUFBYSxTQUFTLFFBQVE7UUFDakMsSUFBSSxnQkFBZ0IsT0FBTyxLQUFLO1lBQzVCLGFBQWE7WUFDYixZQUFZO1lBQ1osU0FBUztnQkFDTCxRQUFRLFdBQVc7b0JBQ2YsT0FBTyxFQUFFLE1BQU0sUUFBUTs7Z0JBRTNCLGlCQUFpQixXQUFXO29CQUN4QixPQUFPLE9BQU87Ozs7O1FBSzFCLGNBQWM7YUFDVCxLQUFLLFNBQVMsY0FBYztnQkFDekIsSUFBSSxhQUFhLFdBQVc7b0JBQ3hCLGNBQWM7dUJBQ1g7b0JBQ0gsT0FBTyxPQUFPLGFBQWE7b0JBQzNCLE9BQU8sVUFBVSxhQUFhO29CQUM5QixPQUFPLHVCQUF1QixhQUFhO29CQUMzQyxJQUFJLE9BQU8sT0FBTzt3QkFDZCxPQUFPLFFBQVE7d0JBQ2YsT0FBTyxRQUFRLEtBQUs7d0JBQ3BCLE9BQU8sZ0JBQWdCOzs7Z0JBRy9COzs7O0lBSVosT0FBTyxPQUFPLFNBQVMsWUFBWTtRQUMvQjtRQUNBOztRQUVBLE9BQU8sV0FBVztRQUNsQixPQUFPLE9BQU87YUFDVDthQUNBLEtBQUssV0FBVztnQkFDYixPQUFPLE9BQU8sb0JBQW9COzthQUVyQyxLQUFLLFlBQVk7Z0JBQ2QsSUFBSSxDQUFDLFlBQVk7b0JBQ2IsVUFBVSxPQUFPOzs7YUFHeEIsTUFBTSxVQUFVLEtBQUs7Z0JBQ2xCLElBQUksQ0FBQyxZQUFZO29CQUNiLFVBQVUsTUFBTSxxQkFBcUIsSUFBSSxLQUFLOzs7YUFHckQsUUFBUSxXQUFXO2dCQUNoQixJQUFJLENBQUMsWUFBWTtvQkFDYixPQUFPLFdBQVc7Ozs7O0lBS2xDLE9BQU8sUUFBUSxXQUFXO1FBQ3RCLE9BQU8sS0FBSztZQUNSLGFBQWE7WUFDYixZQUFZO1lBQ1osU0FBUztnQkFDTCxPQUFPLFdBQVc7b0JBQ2QsT0FBTzt3QkFDSCxPQUFPO3dCQUNQLFNBQVM7aUNBQ0EsT0FBTyxTQUFTO2lDQUNoQjs7Ozs7U0FLeEI7U0FDQSxLQUFLLFdBQVc7WUFDYixPQUFPLFdBQVc7WUFDbEIsT0FBTyxPQUFPLEtBQUs7O1NBRXRCLEtBQUssV0FBVzs7WUFFYixJQUFJLHNCQUFzQixJQUFJLHFCQUFxQjtnQkFDL0MsVUFBVSxPQUFPLFNBQVM7Z0JBQzFCLE1BQU0sT0FBTztnQkFDYixZQUFZLE9BQU87O1lBRXZCLE9BQU8sb0JBQW9COztTQUU5QixLQUFLLFdBQVc7WUFDYixVQUFVLE9BQU87O1NBRXBCLE1BQU0sVUFBVSxLQUFLO1lBQ2xCLElBQUksUUFBUSxVQUFVO2dCQUNsQixVQUFVLE1BQU0sMENBQTBDLElBQUksS0FBSzs7O1NBRzFFLFFBQVEsV0FBVztZQUNoQixPQUFPLFdBQVc7Ozs7SUFJMUIsU0FBUyxZQUFZO1FBQ2pCO2FBQ0s7YUFDQTthQUNBLEtBQUssU0FBUyxLQUFLO2dCQUNoQixPQUFPLHVCQUF1QjtnQkFDOUIsT0FBTyxVQUFVLElBQUksRUFBRSxLQUFLLGFBQWEsTUFBTTs7YUFFbEQsS0FBSyxTQUFTLFVBQVU7Z0JBQ3JCLElBQUksQ0FBQyxTQUFTLFdBQVcsU0FBUyxRQUFRLFdBQVcsR0FBRztvQkFDcEQsU0FBUyxVQUFVLEVBQUUsTUFBTSxnQkFBZ0I7O2dCQUUvQyxJQUFJLFVBQVU7Z0JBQ2QsRUFBRSxLQUFLLFNBQVMsU0FBUyxTQUFTLFFBQVE7b0JBQ3RDLElBQUksTUFBTSxFQUFFLE1BQU0sT0FBTyxzQkFBc0I7b0JBQy9DLEVBQUUsS0FBSyxLQUFLLFNBQVMsSUFBSTt3QkFDckIsR0FBRyxhQUFhLEVBQUUsUUFBUSxPQUFPLHNCQUFzQixHQUFHLFNBQVMsQ0FBQzs7b0JBRXhFLElBQUksWUFBWSxFQUFFLE1BQU0sUUFBUTtvQkFDaEMsVUFBVSx1QkFBdUI7b0JBQ2pDLFFBQVEsS0FBSzs7O2dCQUdqQixPQUFPLFdBQVc7Z0JBQ2xCLE9BQU8sVUFBVTtnQkFDakIsT0FBTyxnQkFBZ0IsT0FBTyxRQUFROzthQUV6QyxLQUFLLFdBQVc7Z0JBQ2IsT0FBTyx5QkFBeUI7O2FBRW5DLE1BQU0sU0FBUyxLQUFLO2dCQUNqQixVQUFVLE1BQU0sNEJBQTRCLElBQUksS0FBSztnQkFDckQsVUFBVSxLQUFLOzthQUVsQixRQUFRLFdBQVc7Z0JBQ2hCLE9BQU8sWUFBWTs7OztJQUkvQixTQUFTLHlCQUF5QixZQUFZO1FBQzFDLE9BQU8sWUFBWTtRQUNuQixPQUFPO2FBQ0YsSUFBSTtnQkFDRCxVQUFVLE9BQU8sU0FBUztnQkFDMUIsTUFBTSxPQUFPO2dCQUNiLFlBQVksT0FBTzs7YUFFdEI7YUFDQSxLQUFLLFNBQVMscUJBQXFCO2dCQUNoQyxJQUFJLFNBQVM7Z0JBQ2IsSUFBSSxZQUFZLEVBQUUsTUFBTSxPQUFPLFNBQVM7Z0JBQ3hDLEtBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUs7O29CQUV4QixJQUFJLFlBQVksRUFBRSxPQUFPLG9CQUFvQixRQUFRLFNBQVMsT0FBTzt3QkFDakUsT0FBTyxFQUFFLFNBQVMsV0FBVyxNQUFNLGFBQWEsTUFBTSxZQUFZOztvQkFFdEUsT0FBTyxLQUFLO3dCQUNSLFNBQVM7d0JBQ1QsYUFBYSxhQUFhO3dCQUMxQixRQUFROzs7O2dCQUloQixPQUFPLHNCQUFzQjtnQkFDN0IsSUFBSSxDQUFDLE9BQU8sb0JBQW9CLFVBQVU7O29CQUV0QyxPQUFPLHNCQUFzQixJQUFJLHFCQUFxQjt3QkFDbEQsVUFBVSxPQUFPLFNBQVM7d0JBQzFCLE1BQU0sT0FBTzt3QkFDYixZQUFZLE9BQU87OztnQkFHM0IsT0FBTyxTQUFTOztnQkFFaEI7O2FBRUgsTUFBTSxTQUFTLEtBQUs7Z0JBQ2pCLElBQUksQ0FBQyxZQUFZO29CQUNiLFVBQVUsTUFBTSw0QkFBNEIsSUFBSSxLQUFLOzs7YUFHNUQsUUFBUSxXQUFXO2dCQUNoQixJQUFJLENBQUMsWUFBWTtvQkFDYixPQUFPLFlBQVk7Ozs7O0lBS25DLFNBQVMsZ0JBQWdCO1FBQ3JCLElBQUksc0JBQXNCLEVBQUUsT0FBTztRQUNuQyxJQUFJLHVCQUF1QixvQkFBb0IsU0FBUztZQUNwRCxJQUFJLFVBQVUsb0JBQW9CO1lBQ2xDLElBQUksUUFBUSxPQUFPO2dCQUNmLE9BQU8sV0FBVyxRQUFRLE1BQU07Z0JBQ2hDLE9BQU8sU0FBUyxRQUFRLE1BQU07O1lBRWxDLElBQUksUUFBUSxVQUFVO2dCQUNsQixPQUFPLE9BQU8sUUFBUSxTQUFTO2dCQUMvQixPQUFPLGFBQWEsUUFBUSxTQUFTOztlQUV0QztZQUNILE9BQU8sT0FBTyxTQUFTO1lBQ3ZCLE9BQU8sYUFBYSxTQUFTOzs7O0lBSXJDLFNBQVMsZUFBZTtRQUNwQixJQUFJLHNCQUFzQjtZQUN0QixTQUFTO2dCQUNMLE9BQU87b0JBQ0gsTUFBTSxPQUFPO29CQUNiLElBQUksT0FBTzs7Z0JBRWYsVUFBVTtvQkFDTixNQUFNLE9BQU87b0JBQ2IsWUFBWSxPQUFPOzs7O1FBSS9CLEVBQUUsT0FBTyx1QkFBdUIscUJBQXFCLEVBQUUsU0FBUyxLQUFLLE1BQU07OztJQUcvRSxTQUFTLGlCQUFpQixZQUFZO1FBQ2xDLElBQUksY0FBYyxPQUFPLE9BQU8sTUFBTSxRQUFRLFFBQVE7UUFDdEQsSUFBSSxZQUFZLFdBQVcsT0FBTyxNQUFNO1lBQ3BDLFlBQVksSUFBSSxHQUFHOztRQUV2QixJQUFJLFFBQVE7UUFDWixJQUFJLElBQUk7UUFDUixPQUFPLE1BQU07WUFDVCxJQUFJLGNBQWMsT0FBTyxhQUFhLElBQUksR0FBRztZQUM3QyxJQUFJLFlBQVksT0FBTyxhQUFhLElBQUksSUFBSSxHQUFHO1lBQy9DLElBQUksWUFBWSxTQUFTLE9BQU8sTUFBTTtnQkFDbEM7O1lBRUosSUFBSSxPQUFPO2dCQUNQLE9BQU8sSUFBSTtnQkFDWCxNQUFNLFdBQVcsSUFBSSxLQUFLLFFBQVEsWUFBWSxPQUFPLGFBQWEsUUFBUSxVQUFVLE9BQU8sYUFBYTs7WUFFNUcsTUFBTSxLQUFLO1lBQ1g7OztRQUdKLE9BQU8sY0FBYztRQUNyQixRQUFRO1lBQ0osS0FBSztnQkFDRCxPQUFPLGFBQWE7Z0JBQ3BCO1lBQ0osS0FBSztnQkFDRCxPQUFPLGFBQWEsTUFBTSxNQUFNLFNBQVMsR0FBRztnQkFDNUM7WUFDSixLQUFLO2dCQUNELE9BQU8sYUFBYSxTQUFTO2dCQUM3QjtZQUNKO2dCQUNJLElBQUksT0FBTyxhQUFhLE1BQU0sTUFBTSxTQUFTLEdBQUcsT0FBTztvQkFDbkQsT0FBTyxhQUFhOztnQkFFeEI7Ozs7SUFJWixTQUFTLDRCQUE0QjtRQUNqQztRQUNBOzs7SUFHSixTQUFTLDhCQUE4QjtRQUNuQztRQUNBOzs7SUFHSixTQUFTLGNBQWMsUUFBUTtRQUMzQixFQUFFLE9BQU8sT0FBTyxTQUFTO1FBQ3pCLEVBQUUsS0FBSyxPQUFPLFFBQVEsU0FBUyxJQUFJO1lBQy9CLEVBQUUsT0FBTyxHQUFHLFFBQVEsRUFBRSxVQUFVLE9BQU87OztRQUczQyxJQUFJLE9BQU8sa0JBQWtCLFFBQVE7WUFDakMsSUFBSSxPQUFPLFFBQVEsU0FBUyxHQUFHO2dCQUMzQixPQUFPLGdCQUFnQixPQUFPLFFBQVE7bUJBQ25DO2dCQUNILE9BQU8sZ0JBQWdCOzs7O1FBSS9COzs7SUFHSixTQUFTLHlCQUF5QjtRQUM5QixJQUFJLGFBQWE7UUFDakIsRUFBRSxLQUFLLE9BQU8sU0FBUyxTQUFTLFFBQVE7WUFDcEMsSUFBSSxZQUFZLEVBQUUsTUFBTSxRQUFRO1lBQ2hDLFVBQVUsdUJBQXVCLEVBQUUsT0FBTztpQkFDckMsT0FBTyxFQUFFLFlBQVk7aUJBQ3JCLE1BQU07aUJBQ047WUFDTCxXQUFXLEtBQUs7O1FBRXBCLE9BQU8sU0FBUyxVQUFVOzs7SUFHOUIsU0FBUyxtQ0FBbUM7UUFDeEMsSUFBSSxZQUFZO1FBQ2hCLEVBQUUsS0FBSyxPQUFPLFFBQVEsU0FBUyxXQUFXO1lBQ3RDLElBQUksWUFBWSxFQUFFLE1BQU0sVUFBVSxRQUFRO1lBQzFDLFlBQVksVUFBVSxPQUFPOztRQUVqQyxPQUFPLG9CQUFvQixTQUFTOzs7SUFHeEMsU0FBUyxhQUFhLE9BQU8sT0FBTztRQUNoQyxPQUFPLFFBQVEsUUFBUSxPQUFPLFNBQVM7OztJQUczQyxTQUFTLGVBQWUsTUFBTTtRQUMxQixPQUFPLE9BQU8sYUFBYSxJQUFJLE1BQU0sVUFBVTs7O0lBR25ELFNBQVMsZ0JBQWdCO1FBQ3JCLElBQUksT0FBTyxlQUFlO1lBQ3RCOzs7UUFHSixJQUFJLFdBQVcsT0FBTyxTQUFTLE9BQU87UUFDdEMsT0FBTyxZQUFZLENBQUMsV0FBVyxNQUFNLE9BQU8sU0FBUzs7UUFFckQsT0FBTyxZQUFZO1FBQ25CLElBQUk7UUFDSixLQUFLLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLO1lBQ3pCLElBQUksT0FBTyxZQUFZLE1BQU0sR0FBRztnQkFDNUIsZ0JBQWdCO2dCQUNoQjs7O1FBR1IsSUFBSSxlQUFlLFdBQVcsS0FBSztRQUNuQyxLQUFLLElBQUksR0FBRyxJQUFJLGVBQWUsS0FBSztZQUNoQyxJQUFJLFdBQVc7Z0JBQ1gsU0FBUyxPQUFPLFlBQVk7Z0JBQzVCLElBQUksZUFBZSxPQUFPLFdBQVcsS0FBSyxlQUFlOztZQUU3RCxPQUFPLFVBQVUsS0FBSzs7O1FBRzFCLEVBQUUsS0FBSyxPQUFPLFFBQVEsU0FBUyxJQUFJO1lBQy9CLEdBQUcsUUFBUTtZQUNYLEVBQUUsS0FBSyxFQUFFLE1BQU0sR0FBRyxPQUFPLFlBQVksU0FBUyxHQUFHO2dCQUM3QyxJQUFJLE9BQU8sYUFBYSxPQUFPLFdBQVcsSUFBSTtnQkFDOUMsSUFBSSxPQUFPO29CQUNQLE1BQU07b0JBQ04sSUFBSSxlQUFlOztnQkFFdkIsR0FBRyxNQUFNLEtBQUs7Ozs7Ozs7OztnQkFTZCxFQUFFLEtBQUssR0FBRyxRQUFRLFNBQVMsT0FBTztvQkFDOUIsSUFBSSxZQUFZLFFBQVEsTUFBTSxTQUFTLE9BQU8sTUFBTTtvQkFDcEQsSUFBSSxXQUFXO3dCQUNYLElBQUksU0FBUyxFQUFFLEtBQUssT0FBTyxTQUFTLEVBQUUsSUFBSSxNQUFNO3dCQUNoRCxLQUFLLFVBQVUsT0FBTzt3QkFDdEIsT0FBTzs7Ozs7OztJQU8zQjtJQUNBO0lBQ0E7O0FBRUoiLCJmaWxlIjoiY29udHJvbGxlcnMvZGFzaGJvYXJkL2FwcG9pbnRtZW50cy9yZXNvdXJjZXMvelJlc291cmNlV2Vla0F2VGltZXNDdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ3pSZXNvdXJjZVdlZWtBdlRpbWVzQ3RybCcsIGZ1bmN0aW9uKFxuICAgICRzY29wZSwgJHJvdXRlUGFyYW1zLCAkbG9jYXRpb24sICRtb2RhbCwgek5vdGlmaWVyLCB6SWRlbnRpdHksIHpSZXNvdXJjZSwgekFwcG9pbnRtZW50VGVtcGxhdGUsIHpSZXNvdXJjZVdlZWtBdlRpbWVzKSB7XG4gICAgLyoganNoaW50IG1heHN0YXRlbWVudHM6IGZhbHNlICovXG4gICAgXG4gICAgdmFyIGRlZmF1bHREYXRlID0gJzIwMDAtMDEtMDEnO1xuICAgIFxuICAgIC8vIFRPRE8gJHNjb3BlLmNhbkVkaXQgPSB6SWRlbnRpdHkuaXNBdXRob3JpemVkKFsnb3duZXInLCAnbWFuYWdlciddKTtcbiAgICAkc2NvcGUuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAkc2NvcGUueWVhcnNGaWx0ZXIgPSBfLnJhbmdlKDIwMTUsIDIwMjEpO1xuICAgICRzY29wZS53ZWVrc0ZpbHRlciA9IF8ucmFuZ2UoMSwgNTIpO1xuICAgICRzY29wZS5ob3Vyc0Zyb21GaWx0ZXIgPSBfLnJhbmdlKDAsIDI0KTtcbiAgICAkc2NvcGUuaG91cnNUb0ZpbHRlciA9IF8ucmFuZ2UoMSwgMjUpO1xuICAgICRzY29wZS55ZWFyID0gMjAxNTtcbiAgICAkc2NvcGUud2Vla251bWJlciA9IDE7XG4gICAgJHNjb3BlLmhvdXJGcm9tID0gMDtcbiAgICAkc2NvcGUuaG91clRvID0gMjQ7XG4gICAgJHNjb3BlLmNvbG9ycGlja2VyT3B0cyA9IHtcbiAgICAgICAgc2hvd1BhbGV0dGU6IHRydWUsXG4gICAgICAgIHBhbGV0dGU6IFsncmdiKDI1NSwgMCwgMCknLCAgICAgJ3JnYigwLCAyNTUsIDApJywgICAgICdyZ2IoMCwgMCwgMjU1KScsXG4gICAgICAgICAgICAgICAgICAncmdiKDE3NiwgMjU1LCAxMTkpJywgJ3JnYigxOTgsIDE4MCwgMjQ3KScsICdyZ2IoMTEyLCAyNDQsIDIyMCknLFxuICAgICAgICAgICAgICAgICAgJ3JnYigxOTYsIDI0NiwgMjU1KScsICdyZ2IoMTE1LCAxMjMsIDI0NCknLCAncmdiKDI1MiwgMTc2LCAyMzApJyxcbiAgICAgICAgICAgICAgICAgICdyZ2IoMjQ5LCAxMjcsIDEzNyknLCAncmdiKDI0OSwgMjAxLCAxNTIpJywgJ3JnYigyNTIsIDE5MCwgMzUpJyxcbiAgICAgICAgICAgICAgICAgICdyZ2IoMTAyLCAxOTgsIDEzMSknLCAncmdiKDI1NSwgMCwgMjU1KSdcbiAgICAgICAgXVxuICAgIH07XG4gICAgdmFyIHdlZWtkYXlOYW1lcyA9IFsnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheScsICdTdW5kYXknXTtcbiAgICB2YXIgZGVmYXVsdFJlZ2lvbnMgPSBbXG4gICAgICAgIHsgaWQ6IDAsIG5hbWU6ICdBdmFsaWFibGUnLCBiZ0NvbG9yOiAncmdiKDAsIDI1NSwgMCknLCBhcHBvaW50bWVudFRlbXBsYXRlczogW10gfSxcbiAgICAgICAgeyBpZDogMSwgbmFtZTogJ05vdCBhdmFsaWFibGUnLCBiZ0NvbG9yOiAncmdiKDI1NSwgMCwgMCknLCBhcHBvaW50bWVudFRlbXBsYXRlczogW10gfVxuICAgIF07XG4gICAgXG4gICAgJHNjb3BlLmlzUHJvY2Vzc2luZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJHNjb3BlLmlzTG9hZGluZyB8fCAkc2NvcGUuaXNTYXZpbmc7XG4gICAgfTtcbiAgICBcbiAgICAkc2NvcGUuc2V0Q2VsbFJlZ2lvbiA9IGZ1bmN0aW9uKHNlbGVjdGVkV2Vla2RheSwgc2VsZWN0ZWRDZWxsKSB7XG4gICAgICAgIGlmICghJHNjb3BlLmN1cnJlbnRSZWdpb24gfHwgJHNjb3BlLmlzUHJvY2Vzc2luZygpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBjZWxsQ29sb3IgPSAkc2NvcGUuY3VycmVudFJlZ2lvbi5iZ0NvbG9yO1xuICAgICAgICB2YXIgbmV3QmxvY2tzID0gW107XG4gICAgICAgIHZhciBjdXJyZW50QmxvY2s7XG4gICAgICAgIHZhciBjZWxsQ291bnQgPSAoMjQgKiA2MCkgLyAkc2NvcGUucmVzb3VyY2UuYXBwb2ludG1lbnRJbnRlcnZhbDtcbiAgICAgICAgXy5lYWNoKF8ucmFuZ2UoMCwgY2VsbENvdW50KSwgZnVuY3Rpb24oaSkge1xuICAgICAgICAgICAgdmFyIGNlbGxUaW1lID0gX2FkZEludGVydmFsKDAsIGkpO1xuICAgICAgICAgICAgdmFyIGlzU2VsZWN0ZWRDZWxsID0gY2VsbFRpbWUgPT09IHNlbGVjdGVkQ2VsbC50aW1lO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgZm91bmRCbG9jayA9IF8uZmluZChzZWxlY3RlZFdlZWtkYXkuYmxvY2tzLCBmdW5jdGlvbihibG9jaykge1xuICAgICAgICAgICAgICAgIHJldHVybiBjZWxsVGltZSA+PSBibG9jay5zdGFydCAmJiBjZWxsVGltZSA8IGJsb2NrLmVuZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZm91bmRCbG9jayB8fCBpc1NlbGVjdGVkQ2VsbCkge1xuICAgICAgICAgICAgICAgIHZhciBuZXdCbG9ja1JlZ2lvbklkID0gaXNTZWxlY3RlZENlbGwgPyAkc2NvcGUuY3VycmVudFJlZ2lvbi5pZCA6IGZvdW5kQmxvY2sucmVnaW9uSWQ7XG4gICAgICAgICAgICAgICAgaWYgKGlzU2VsZWN0ZWRDZWxsICYmIGZvdW5kQmxvY2sgJiYgZm91bmRCbG9jay5yZWdpb25JZCA9PT0gbmV3QmxvY2tSZWdpb25JZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBEZXNlbGVjdCBhbHJlYWR5IHNlbGVjdGVkIGNlbGwgd2l0aCB0aGUgc2FtZSBibG9ja1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50QmxvY2sgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBjZWxsQ29sb3IgPSAnd2hpdGUnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEJsb2NrICYmIGN1cnJlbnRCbG9jay5yZWdpb25JZCA9PT0gbmV3QmxvY2tSZWdpb25JZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBFeHRlbmQgY3VycmVudCBibG9jayB0byBvbmUgaW50ZXJ2YWxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEJsb2NrLmVuZCA9IF9hZGRJbnRlcnZhbChjZWxsVGltZSwgMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRCbG9jayA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlZWtkYXk6IHNlbGVjdGVkV2Vla2RheS53ZWVrZGF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnaW9uSWQ6IG5ld0Jsb2NrUmVnaW9uSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogY2VsbFRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IF9hZGRJbnRlcnZhbChjZWxsVGltZSwgMSlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgbmV3QmxvY2tzLnB1c2goY3VycmVudEJsb2NrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRCbG9jaykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRCbG9jayA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgc2VsZWN0ZWRDZWxsLmJnQ29sb3IgPSBjZWxsQ29sb3I7XG4gICAgICAgIHNlbGVjdGVkV2Vla2RheS5ibG9ja3MgPSBuZXdCbG9ja3M7XG4gICAgfTtcbiAgICBcbiAgICAkc2NvcGUuY2hhbmdlWWVhciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBfaW5pdFdlZWtzRmlsdGVyKCdmaXJzdCcpO1xuICAgICAgICBfc2F2ZUZpbHRlcnNBbmRSZWxvYWREYXRhKCk7XG4gICAgfTtcbiAgICBcbiAgICAkc2NvcGUuY2hhbmdlV2VlayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBfc2F2ZUZpbHRlcnNBbmRSZWxvYWREYXRhKCk7XG4gICAgfTtcbiAgICBcbiAgICAkc2NvcGUuY2hhbmdlSG91ciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJHNjb3BlLmhvdXJUbyAtICRzY29wZS5ob3VyRnJvbSA8PSAwKSB7XG4gICAgICAgICAgICAkc2NvcGUuaG91clRvID0gJHNjb3BlLmhvdXJGcm9tICsgMTtcbiAgICAgICAgfVxuICAgICAgICBfc2F2ZUZpbHRlcnNBbmRSZWZyZXNoVGFibGUoKTtcbiAgICB9O1xuICAgIFxuICAgICRzY29wZS5zZWxlY3RQcmV2V2VlayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgd2Vla251bWJlciA9ICRzY29wZS53ZWVrbnVtYmVyIC0gMTtcbiAgICAgICAgaWYgKHdlZWtudW1iZXIgPj0gMSkge1xuICAgICAgICAgICAgJHNjb3BlLndlZWtudW1iZXIgPSB3ZWVrbnVtYmVyO1xuICAgICAgICAgICAgX3NhdmVGaWx0ZXJzQW5kUmVsb2FkRGF0YSgpO1xuICAgICAgICB9IGVsc2UgaWYgKCRzY29wZS55ZWFyID4gMjAxNSkge1xuICAgICAgICAgICAgJHNjb3BlLnllYXItLTtcbiAgICAgICAgICAgIF9pbml0V2Vla3NGaWx0ZXIoJ2xhc3QnKTtcbiAgICAgICAgICAgIF9zYXZlRmlsdGVyc0FuZFJlbG9hZERhdGEoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgJHNjb3BlLnNlbGVjdE5leHRXZWVrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB3ZWVrbnVtYmVyID0gJHNjb3BlLndlZWtudW1iZXIgKyAxO1xuICAgICAgICBpZiAod2Vla251bWJlciA8PSAkc2NvcGUud2Vla3NGaWx0ZXJbJHNjb3BlLndlZWtzRmlsdGVyLmxlbmd0aCAtIDFdLnZhbHVlKSB7XG4gICAgICAgICAgICAkc2NvcGUud2Vla251bWJlciA9IHdlZWtudW1iZXI7XG4gICAgICAgICAgICBfc2F2ZUZpbHRlcnNBbmRSZWxvYWREYXRhKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLnllYXIgPCAyMDIwKSB7XG4gICAgICAgICAgICAkc2NvcGUueWVhcisrO1xuICAgICAgICAgICAgX2luaXRXZWVrc0ZpbHRlcignZmlyc3QnKTtcbiAgICAgICAgICAgIF9zYXZlRmlsdGVyc0FuZFJlbG9hZERhdGEoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgJHNjb3BlLnNlbGVjdEN1cnJlbnRXZWVrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS55ZWFyID0gbW9tZW50KCkueWVhcigpO1xuICAgICAgICBfaW5pdFdlZWtzRmlsdGVyKCdjdXJyZW50Jyk7XG4gICAgICAgIF9zYXZlRmlsdGVyc0FuZFJlbG9hZERhdGEoKTtcbiAgICB9O1xuICAgIFxuICAgICRzY29wZS5kaXNhYmxlUHJldldlZWsgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICgkc2NvcGUud2Vla251bWJlciA9PT0gMSAmJiAkc2NvcGUueWVhciA9PT0gMjAxNSk7XG4gICAgfTtcbiAgICBcbiAgICAkc2NvcGUuZGlzYWJsZU5leHRXZWVrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoJHNjb3BlLndlZWtudW1iZXIgPT09ICRzY29wZS53ZWVrc0ZpbHRlclskc2NvcGUud2Vla3NGaWx0ZXIubGVuZ3RoIC0gMV0udmFsdWUgJiYgJHNjb3BlLnllYXIgPT09IDIwMjApO1xuICAgIH07XG4gICAgXG4gICAgJHNjb3BlLmRpc2FibGVDdXJyZW50V2VlayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbm93ID0gbW9tZW50KCk7XG4gICAgICAgIHJldHVybiAoJHNjb3BlLnllYXIgPT09IG5vdy55ZWFyKCkgJiYgJHNjb3BlLndlZWtudW1iZXIgPT09IG5vdy53ZWVrKCkpO1xuICAgIH07XG4gICAgXG4gICAgJHNjb3BlLmFkZFJlZ2lvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdXNlZEJnQ29sb3JzID0gXy5wbHVjaygkc2NvcGUucmVnaW9ucywgJ2JnQ29sb3InKTtcbiAgICAgICAgdmFyIGF2YWxpYWJsZUJnQ29sb3JzID0gXy5kaWZmZXJlbmNlKCRzY29wZS5jb2xvcnBpY2tlck9wdHMucGFsZXR0ZSwgdXNlZEJnQ29sb3JzKTtcbiAgICAgICAgdmFyIG5ld0lkID0gXygkc2NvcGUucmVnaW9ucylcbiAgICAgICAgICAgIC5wbHVjaygnaWQnKVxuICAgICAgICAgICAgLm1heCgpICsgMTtcbiAgICAgICAgdmFyIGF0cyA9IF8uY2xvbmUoJHNjb3BlLmFwcG9pbnRtZW50VGVtcGxhdGVzLCB0cnVlKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBuZXdSZWdpb24gPSB7XG4gICAgICAgICAgICBpc05ldzogdHJ1ZSxcbiAgICAgICAgICAgIGlkOiBuZXdJZCxcbiAgICAgICAgICAgIG5hbWU6ICdOZXcgUmVnaW9uJyArIG5ld0lkLFxuICAgICAgICAgICAgYmdDb2xvcjogYXZhbGlhYmxlQmdDb2xvcnNbMF0gfHwgJ3JnYigyNTUsIDAsIDApJyxcbiAgICAgICAgICAgIGFwcG9pbnRtZW50VGVtcGxhdGVzOiBhdHNcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmVkaXRSZWdpb24obmV3UmVnaW9uKTtcbiAgICB9O1xuICAgIFxuICAgICRzY29wZS5lZGl0UmVnaW9uID0gZnVuY3Rpb24ocmVnaW9uKSB7XG4gICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJG1vZGFsLm9wZW4oe1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9kYXNoYm9hcmQvYXBwb2ludG1lbnRzL3Jlc291cmNlcy9yZXNvdXJjZS1lZGl0LXJlZ2lvbi1kaWFsb2cuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnelJlc291cmNlRWRpdFJlZ2lvbkRpYWxvZ0N0cmwnLFxuICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgIHJlZ2lvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfLmNsb25lKHJlZ2lvbiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb2xvcnBpY2tlck9wdHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmNvbG9ycGlja2VyT3B0cztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHRcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGVkaXRlZFJlZ2lvbikge1xuICAgICAgICAgICAgICAgIGlmIChlZGl0ZWRSZWdpb24uaXNEZWxldGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIF9kZWxldGVSZWdpb24ocmVnaW9uKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWdpb24ubmFtZSA9IGVkaXRlZFJlZ2lvbi5uYW1lO1xuICAgICAgICAgICAgICAgICAgICByZWdpb24uYmdDb2xvciA9IGVkaXRlZFJlZ2lvbi5iZ0NvbG9yO1xuICAgICAgICAgICAgICAgICAgICByZWdpb24uYXBwb2ludG1lbnRUZW1wbGF0ZXMgPSBlZGl0ZWRSZWdpb24uYXBwb2ludG1lbnRUZW1wbGF0ZXM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWdpb24uaXNOZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2lvbi5pc05ldyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnJlZ2lvbnMucHVzaChyZWdpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmN1cnJlbnRSZWdpb24gPSByZWdpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3JlZnJlc2hUYWJsZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcbiAgICBcbiAgICAkc2NvcGUuc2F2ZSA9IGZ1bmN0aW9uKHNraXBOb3RpZnkpIHtcbiAgICAgICAgX3VwZGF0ZVJlc291cmNlUmVnaW9ucygpO1xuICAgICAgICBfdXBkYXRlUmVzb3VyY2VXZWVrQXZUaW1lc0Jsb2NrcygpO1xuICAgICAgICBcbiAgICAgICAgJHNjb3BlLmlzU2F2aW5nID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuICRzY29wZS5yZXNvdXJjZVxuICAgICAgICAgICAgLiR1cGRhdGVSZWdpb25zKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUucmVzb3VyY2VXZWVrQXZUaW1lcy4kc2F2ZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNraXBOb3RpZnkpIHtcbiAgICAgICAgICAgICAgICAgICAgek5vdGlmaWVyLm5vdGlmeSgnUmVzb3VyY2Ugc2F2ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNraXBOb3RpZnkpIHtcbiAgICAgICAgICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdVbmFibGUgdG8gc2F2ZTogJyArIGVyci5kYXRhLnJlYXNvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICghc2tpcE5vdGlmeSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuICAgIFxuICAgICRzY29wZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkbW9kYWwub3Blbih7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2NvbW1vbi9jb25maXJtYXRpb24tZGlhbG9nLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3pNb2RhbEN0cmwnLFxuICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQXBwbHkgQXZhaWxhYmlsaXR5IHRvIGZvbGxvd2luZyB3ZWVrcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVGhpcyB3aWxsIGFwcGx5IHRoaXMgYXZhaWxhYmlsaXR5IHBhdHRlcm4gdG8gYWxsIHN1YnNlcXVlbnQgd2Vla3MgZm9yICcgKyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5yZXNvdXJjZS5uYW1lICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcXG5BbnkgZXhpc3RpbmcgYXZhaWxhYmlsaXR5IHBhdHRlcm5zIHdpbGwgYmUgb3ZlcndyaXR0ZW4nXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAucmVzdWx0XG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmlzU2F2aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuc2F2ZSh0cnVlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvKiBqc2hpbnQgbmV3Y2FwOiBmYWxzZSAqL1xuICAgICAgICAgICAgdmFyIHJlc291cmNlV2Vla0F2VGltZXMgPSBuZXcgelJlc291cmNlV2Vla0F2VGltZXMoe1xuICAgICAgICAgICAgICAgIHJlc291cmNlOiAkc2NvcGUucmVzb3VyY2UuX2lkLFxuICAgICAgICAgICAgICAgIHllYXI6ICRzY29wZS55ZWFyLFxuICAgICAgICAgICAgICAgIHdlZWtudW1iZXI6ICRzY29wZS53ZWVrbnVtYmVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXNvdXJjZVdlZWtBdlRpbWVzLiRjbG9uZSgpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHpOb3RpZmllci5ub3RpZnkoJ0F2YWlsYWJpbGl0eSBwYXR0ZXJuIGNvcGllZCB0byBhbGwgc3Vic2VxdWVudCB3ZWVrcycpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaWYgKGVyciAhPT0gJ2NhbmNlbCcpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIuZXJyb3IoJ1VuYWJsZSB0byBjb3B5IGF2YWlsYWJpbGl0eSBwYXR0ZXJuOiAnICsgZXJyLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBcbiAgICBmdW5jdGlvbiBfbG9hZERhdGEoKSB7XG4gICAgICAgIHpBcHBvaW50bWVudFRlbXBsYXRlXG4gICAgICAgICAgICAucXVlcnkoKVxuICAgICAgICAgICAgLiRwcm9taXNlXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihhdHMpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuYXBwb2ludG1lbnRUZW1wbGF0ZXMgPSBhdHM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHpSZXNvdXJjZS5nZXQoeyBpZCA6ICRyb3V0ZVBhcmFtcy5pZCB9KS4kcHJvbWlzZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGlmICghcmVzb3VyY2UucmVnaW9ucyB8fCByZXNvdXJjZS5yZWdpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZS5yZWdpb25zID0gXy5jbG9uZShkZWZhdWx0UmVnaW9ucywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciByZWdpb25zID0gW107XG4gICAgICAgICAgICAgICAgXy5lYWNoKHJlc291cmNlLnJlZ2lvbnMsIGZ1bmN0aW9uKHJlZ2lvbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXRzID0gXy5jbG9uZSgkc2NvcGUuYXBwb2ludG1lbnRUZW1wbGF0ZXMsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBfLmVhY2goYXRzLCBmdW5jdGlvbihhdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXQuaXNTZWxlY3RlZCA9IF8uaW5kZXhPZihyZWdpb24uYXBwb2ludG1lbnRUZW1wbGF0ZXMsIGF0Ll9pZCkgIT09IC0xO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1JlZ2lvbiA9IF8uY2xvbmUocmVnaW9uLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UmVnaW9uLmFwcG9pbnRtZW50VGVtcGxhdGVzID0gYXRzO1xuICAgICAgICAgICAgICAgICAgICByZWdpb25zLnB1c2gobmV3UmVnaW9uKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAkc2NvcGUucmVzb3VyY2UgPSByZXNvdXJjZTtcbiAgICAgICAgICAgICAgICAkc2NvcGUucmVnaW9ucyA9IHJlZ2lvbnM7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmN1cnJlbnRSZWdpb24gPSAkc2NvcGUucmVnaW9uc1swXTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2xvYWRSZXNvdXJjZVdlZWtBdlRpbWVzKHRydWUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIuZXJyb3IoJ1VuYWJsZSB0byBsb2FkIHJlY29yZDogJyArIGVyci5kYXRhLnJlYXNvbik7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9hcHBvaW50bWVudHMvc2V0dGluZ3MvcmVzb3VyY2VzJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIF9sb2FkUmVzb3VyY2VXZWVrQXZUaW1lcyhza2lwTm90aWZ5KSB7XG4gICAgICAgICRzY29wZS5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICByZXR1cm4gelJlc291cmNlV2Vla0F2VGltZXNcbiAgICAgICAgICAgIC5nZXQoe1xuICAgICAgICAgICAgICAgIHJlc291cmNlOiAkc2NvcGUucmVzb3VyY2UuX2lkLFxuICAgICAgICAgICAgICAgIHllYXI6ICRzY29wZS55ZWFyLFxuICAgICAgICAgICAgICAgIHdlZWtudW1iZXI6ICRzY29wZS53ZWVrbnVtYmVyXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLiRwcm9taXNlXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNvdXJjZVdlZWtBdlRpbWVzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJsb2NrcyA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciByZWdpb25JZHMgPSBfLnBsdWNrKCRzY29wZS5yZWdpb25zLCAnaWQnKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAvKiBqc2hpbnQgLVcwODMgKi9cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRheUJsb2NrcyA9IF8uZmlsdGVyKHJlc291cmNlV2Vla0F2VGltZXMuYmxvY2tzLCBmdW5jdGlvbihibG9jaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF8uaW5jbHVkZXMocmVnaW9uSWRzLCBibG9jay5yZWdpb25JZCkgJiYgYmxvY2sud2Vla2RheSA9PT0gaTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJsb2Nrcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlZWtkYXk6IGksXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWVrZGF5TmFtZTogd2Vla2RheU5hbWVzW2ldLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tzOiBkYXlCbG9ja3NcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICRzY29wZS5yZXNvdXJjZVdlZWtBdlRpbWVzID0gcmVzb3VyY2VXZWVrQXZUaW1lcztcbiAgICAgICAgICAgICAgICBpZiAoISRzY29wZS5yZXNvdXJjZVdlZWtBdlRpbWVzLnJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qIGpzaGludCBuZXdjYXA6IGZhbHNlICovXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5yZXNvdXJjZVdlZWtBdlRpbWVzID0gbmV3IHpSZXNvdXJjZVdlZWtBdlRpbWVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlOiAkc2NvcGUucmVzb3VyY2UuX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhcjogJHNjb3BlLnllYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWVrbnVtYmVyOiAkc2NvcGUud2Vla251bWJlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJHNjb3BlLmJsb2NrcyA9IGJsb2NrcztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBfcmVmcmVzaFRhYmxlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIGlmICghc2tpcE5vdGlmeSkge1xuICAgICAgICAgICAgICAgICAgICB6Tm90aWZpZXIuZXJyb3IoJ1VuYWJsZSB0byBsb2FkIHJlY29yZDogJyArIGVyci5kYXRhLnJlYXNvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICghc2tpcE5vdGlmeSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIF9hcHBseUZpbHRlcnMoKSB7XG4gICAgICAgIHZhciByZXNvdXJjZVdlZWtBdlRpbWVzID0gJC5jb29raWUoJ3Jlc291cmNlV2Vla0F2VGltZXMnKTtcbiAgICAgICAgaWYgKHJlc291cmNlV2Vla0F2VGltZXMgJiYgcmVzb3VyY2VXZWVrQXZUaW1lcy5maWx0ZXJzKSB7XG4gICAgICAgICAgICB2YXIgZmlsdGVycyA9IHJlc291cmNlV2Vla0F2VGltZXMuZmlsdGVycztcbiAgICAgICAgICAgIGlmIChmaWx0ZXJzLmhvdXJzKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmhvdXJGcm9tID0gZmlsdGVycy5ob3Vycy5mcm9tO1xuICAgICAgICAgICAgICAgICRzY29wZS5ob3VyVG8gPSBmaWx0ZXJzLmhvdXJzLnRvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpbHRlcnMueWVhcndlZWspIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUueWVhciA9IGZpbHRlcnMueWVhcndlZWsueWVhcjtcbiAgICAgICAgICAgICAgICAkc2NvcGUud2Vla251bWJlciA9IGZpbHRlcnMueWVhcndlZWsud2Vla251bWJlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRzY29wZS55ZWFyID0gbW9tZW50KCkueWVhcigpO1xuICAgICAgICAgICAgJHNjb3BlLndlZWtudW1iZXIgPSBtb21lbnQoKS53ZWVrKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gX3NhdmVGaWx0ZXJzKCkge1xuICAgICAgICB2YXIgcmVzb3VyY2VXZWVrQXZUaW1lcyA9IHtcbiAgICAgICAgICAgIGZpbHRlcnM6IHtcbiAgICAgICAgICAgICAgICBob3Vyczoge1xuICAgICAgICAgICAgICAgICAgICBmcm9tOiAkc2NvcGUuaG91ckZyb20sXG4gICAgICAgICAgICAgICAgICAgIHRvOiAkc2NvcGUuaG91clRvXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB5ZWFyd2Vlazoge1xuICAgICAgICAgICAgICAgICAgICB5ZWFyOiAkc2NvcGUueWVhcixcbiAgICAgICAgICAgICAgICAgICAgd2Vla251bWJlcjogJHNjb3BlLndlZWtudW1iZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICQuY29va2llKCdyZXNvdXJjZVdlZWtBdlRpbWVzJywgcmVzb3VyY2VXZWVrQXZUaW1lcywgeyBleHBpcmVzOiAzNjUsIHBhdGg6ICcvJyB9KTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gX2luaXRXZWVrc0ZpbHRlcihzZWxlY3RXZWVrKSB7XG4gICAgICAgIHZhciBzdGFydE9mWWVhciA9IG1vbWVudCgkc2NvcGUueWVhciwgJ1lZWVknKS5zdGFydE9mKCdpc29XZWVrJyk7XG4gICAgICAgIGlmIChzdGFydE9mWWVhci55ZWFyKCkgIT09ICRzY29wZS55ZWFyKSB7XG4gICAgICAgICAgICBzdGFydE9mWWVhci5hZGQoMSwgJ3dlZWsnKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgd2Vla3MgPSBbXTtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgdmFyIHN0YXJ0T2ZXZWVrID0gbW9tZW50KHN0YXJ0T2ZZZWFyKS5hZGQoaSwgJ3dlZWsnKTtcbiAgICAgICAgICAgIHZhciBlbmRPZldlZWsgPSBtb21lbnQoc3RhcnRPZlllYXIpLmFkZChpICsgMSwgJ3dlZWsnKTtcbiAgICAgICAgICAgIGlmIChzdGFydE9mV2Vlay55ZWFyKCkgPiAkc2NvcGUueWVhcikge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHdlZWsgPSB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGkgKyAxLFxuICAgICAgICAgICAgICAgIHRleHQ6ICd3ZWVrICcgKyAoaSArIDEpICsgJywgKCcgKyBzdGFydE9mV2Vlay5mb3JtYXQoJ01NTSwgREQnKSArICcgLSAnICsgZW5kT2ZXZWVrLmZvcm1hdCgnTU1NLCBERCcpICsgJyknXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2Vla3MucHVzaCh3ZWVrKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgJHNjb3BlLndlZWtzRmlsdGVyID0gd2Vla3M7XG4gICAgICAgIHN3aXRjaCAoc2VsZWN0V2Vlaykge1xuICAgICAgICAgICAgY2FzZSAnZmlyc3QnOlxuICAgICAgICAgICAgICAgICRzY29wZS53ZWVrbnVtYmVyID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xhc3QnOlxuICAgICAgICAgICAgICAgICRzY29wZS53ZWVrbnVtYmVyID0gd2Vla3Nbd2Vla3MubGVuZ3RoIC0gMV0udmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjdXJyZW50JzpcbiAgICAgICAgICAgICAgICAkc2NvcGUud2Vla251bWJlciA9IG1vbWVudCgpLndlZWsoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS53ZWVrbnVtYmVyID4gd2Vla3Nbd2Vla3MubGVuZ3RoIC0gMV0udmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLndlZWtudW1iZXIgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBfc2F2ZUZpbHRlcnNBbmRSZWxvYWREYXRhKCkge1xuICAgICAgICBfc2F2ZUZpbHRlcnMoKTtcbiAgICAgICAgX2xvYWRSZXNvdXJjZVdlZWtBdlRpbWVzKCk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIF9zYXZlRmlsdGVyc0FuZFJlZnJlc2hUYWJsZSgpIHtcbiAgICAgICAgX3NhdmVGaWx0ZXJzKCk7XG4gICAgICAgIF9yZWZyZXNoVGFibGUoKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gX2RlbGV0ZVJlZ2lvbihyZWdpb24pIHtcbiAgICAgICAgXy5yZW1vdmUoJHNjb3BlLnJlZ2lvbnMsIHJlZ2lvbik7XG4gICAgICAgIF8uZWFjaCgkc2NvcGUuYmxvY2tzLCBmdW5jdGlvbihkYikge1xuICAgICAgICAgICAgXy5yZW1vdmUoZGIuYmxvY2tzLCB7IHJlZ2lvbklkOiByZWdpb24uaWQgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaWYgKCRzY29wZS5jdXJyZW50UmVnaW9uID09PSByZWdpb24pIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUucmVnaW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmN1cnJlbnRSZWdpb24gPSAkc2NvcGUucmVnaW9uc1swXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmN1cnJlbnRSZWdpb24gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBfcmVmcmVzaFRhYmxlKCk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIF91cGRhdGVSZXNvdXJjZVJlZ2lvbnMoKSB7XG4gICAgICAgIHZhciBhbGxSZWdpb25zID0gW107XG4gICAgICAgIF8uZWFjaCgkc2NvcGUucmVnaW9ucywgZnVuY3Rpb24ocmVnaW9uKSB7XG4gICAgICAgICAgICB2YXIgbmV3UmVnaW9uID0gXy5jbG9uZShyZWdpb24sIHRydWUpO1xuICAgICAgICAgICAgbmV3UmVnaW9uLmFwcG9pbnRtZW50VGVtcGxhdGVzID0gXyhyZWdpb24uYXBwb2ludG1lbnRUZW1wbGF0ZXMpXG4gICAgICAgICAgICAgICAgLmZpbHRlcih7IGlzU2VsZWN0ZWQ6IHRydWUgfSlcbiAgICAgICAgICAgICAgICAucGx1Y2soJ19pZCcpXG4gICAgICAgICAgICAgICAgLnZhbHVlKCk7XG4gICAgICAgICAgICBhbGxSZWdpb25zLnB1c2gobmV3UmVnaW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS5yZXNvdXJjZS5yZWdpb25zID0gYWxsUmVnaW9ucztcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gX3VwZGF0ZVJlc291cmNlV2Vla0F2VGltZXNCbG9ja3MoKSB7XG4gICAgICAgIHZhciBhbGxCbG9ja3MgPSBbXTtcbiAgICAgICAgXy5lYWNoKCRzY29wZS5ibG9ja3MsIGZ1bmN0aW9uKGRheUJsb2Nrcykge1xuICAgICAgICAgICAgdmFyIG5ld0Jsb2NrcyA9IF8uY2xvbmUoZGF5QmxvY2tzLmJsb2NrcywgdHJ1ZSk7XG4gICAgICAgICAgICBhbGxCbG9ja3MgPSBhbGxCbG9ja3MuY29uY2F0KG5ld0Jsb2Nrcyk7XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUucmVzb3VyY2VXZWVrQXZUaW1lcy5ibG9ja3MgPSBhbGxCbG9ja3M7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIF9hZGRJbnRlcnZhbChzdGFydCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHN0YXJ0ICsgaW5kZXggKiAkc2NvcGUucmVzb3VyY2UuYXBwb2ludG1lbnRJbnRlcnZhbDtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gX2NyZWF0ZURhdGVPYmoobWlucykge1xuICAgICAgICByZXR1cm4gbW9tZW50KGRlZmF1bHREYXRlKS5hZGQobWlucywgJ21pbnV0ZScpLnRvRGF0ZSgpO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBfcmVmcmVzaFRhYmxlKCkge1xuICAgICAgICBpZiAoJHNjb3BlLmludmFsaWRGaWx0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIGludGVydmFsID0gJHNjb3BlLmhvdXJUbyAtICRzY29wZS5ob3VyRnJvbTtcbiAgICAgICAgJHNjb3BlLmNlbGxDb3VudCA9IChpbnRlcnZhbCAqIDYwKSAvICRzY29wZS5yZXNvdXJjZS5hcHBvaW50bWVudEludGVydmFsO1xuICAgICAgICBcbiAgICAgICAgJHNjb3BlLnRpbWVDZWxscyA9IFtdO1xuICAgICAgICB2YXIgdGltZUNlbGxDb3VudDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDQ7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLmNlbGxDb3VudCAlIGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aW1lQ2VsbENvdW50ID0gaTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgdGltZUNlbGxTdGVwID0gaW50ZXJ2YWwgKiA2MCAvIHRpbWVDZWxsQ291bnQ7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aW1lQ2VsbENvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0aW1lQ2VsbCA9IHtcbiAgICAgICAgICAgICAgICBjb2xzcGFuOiAkc2NvcGUuY2VsbENvdW50IC8gdGltZUNlbGxDb3VudCxcbiAgICAgICAgICAgICAgICBkdDogX2NyZWF0ZURhdGVPYmooJHNjb3BlLmhvdXJGcm9tICogNjAgKyB0aW1lQ2VsbFN0ZXAgKiBpKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRzY29wZS50aW1lQ2VsbHMucHVzaCh0aW1lQ2VsbCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIF8uZWFjaCgkc2NvcGUuYmxvY2tzLCBmdW5jdGlvbihkYikge1xuICAgICAgICAgICAgZGIuY2VsbHMgPSBbXTtcbiAgICAgICAgICAgIF8uZWFjaChfLnJhbmdlKDAsICRzY29wZS5jZWxsQ291bnQpLCBmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRpbWUgPSBfYWRkSW50ZXJ2YWwoJHNjb3BlLmhvdXJGcm9tICogNjAsIGkpO1xuICAgICAgICAgICAgICAgIHZhciBjZWxsID0ge1xuICAgICAgICAgICAgICAgICAgICB0aW1lOiB0aW1lLFxuICAgICAgICAgICAgICAgICAgICBkdDogX2NyZWF0ZURhdGVPYmoodGltZSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGRiLmNlbGxzLnB1c2goY2VsbCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogYXNrIFJpY2hhcmRcbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIGlmIChkYXlJbmRleCA+PSA1KSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuYmdDb2xvciA9ICRzY29wZS5yZWdpb25zWzFdLmJnQ29sb3I7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBfLmVhY2goZGIuYmxvY2tzLCBmdW5jdGlvbihibG9jaykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXNCZWV0d2VuID0gdGltZSA+PSBibG9jay5zdGFydCAmJiB0aW1lIDwgYmxvY2suZW5kO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNCZWV0d2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVnaW9uID0gXy5maW5kKCRzY29wZS5yZWdpb25zLCB7IGlkOiBibG9jay5yZWdpb25JZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuYmdDb2xvciA9IHJlZ2lvbi5iZ0NvbG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIF9hcHBseUZpbHRlcnMoKTtcbiAgICBfaW5pdFdlZWtzRmlsdGVyKCk7XG4gICAgX2xvYWREYXRhKCk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').controller('zAppointmentTemplateDetailsCtrl', ['$scope', '$location', '$routeParams', 'zNotifier', 'zIdentity', 'zAppointmentTemplate', function(
    $scope, $location, $routeParams, zNotifier, zIdentity, zAppointmentTemplate) {
    
    $scope.isLoading = true;
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    
    zAppointmentTemplate
        .get({
            id : $routeParams.id,
            'includes[]': ['resources']
        })
        .$promise
        .then(function(at) {
            at.resources = _.pluck(at.resources, 'name').join(', ');
            $scope.appointmentTemplate = at;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load record: ' + err.data.reason);
            $location.path('/appointments/settings/appointmentTemplates');
        })
        .finally(function() {
            $scope.isLoading = false;
        });
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvdGVtcGxhdGVzL3pBcHBvaW50bWVudFRlbXBsYXRlRGV0YWlsc0N0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sV0FBVyw2SEFBbUM7SUFDaEUsUUFBUSxXQUFXLGNBQWMsV0FBVyxXQUFXLHNCQUFzQjs7SUFFN0UsT0FBTyxZQUFZO0lBQ25CLE9BQU8sVUFBVSxVQUFVLGFBQWEsQ0FBQyxTQUFTOztJQUVsRDtTQUNLLElBQUk7WUFDRCxLQUFLLGFBQWE7WUFDbEIsY0FBYyxDQUFDOztTQUVsQjtTQUNBLEtBQUssU0FBUyxJQUFJO1lBQ2YsR0FBRyxZQUFZLEVBQUUsTUFBTSxHQUFHLFdBQVcsUUFBUSxLQUFLO1lBQ2xELE9BQU8sc0JBQXNCOztTQUVoQyxNQUFNLFNBQVMsS0FBSztZQUNqQixVQUFVLE1BQU0sNEJBQTRCLElBQUksS0FBSztZQUNyRCxVQUFVLEtBQUs7O1NBRWxCLFFBQVEsV0FBVztZQUNoQixPQUFPLFlBQVk7OztBQUcvQiIsImZpbGUiOiJjb250cm9sbGVycy9kYXNoYm9hcmQvYXBwb2ludG1lbnRzL3RlbXBsYXRlcy96QXBwb2ludG1lbnRUZW1wbGF0ZURldGFpbHNDdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ3pBcHBvaW50bWVudFRlbXBsYXRlRGV0YWlsc0N0cmwnLCBmdW5jdGlvbihcbiAgICAkc2NvcGUsICRsb2NhdGlvbiwgJHJvdXRlUGFyYW1zLCB6Tm90aWZpZXIsIHpJZGVudGl0eSwgekFwcG9pbnRtZW50VGVtcGxhdGUpIHtcbiAgICBcbiAgICAkc2NvcGUuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAkc2NvcGUuY2FuRWRpdCA9IHpJZGVudGl0eS5pc0F1dGhvcml6ZWQoWydvd25lcicsICdtYW5hZ2VyJ10pO1xuICAgIFxuICAgIHpBcHBvaW50bWVudFRlbXBsYXRlXG4gICAgICAgIC5nZXQoe1xuICAgICAgICAgICAgaWQgOiAkcm91dGVQYXJhbXMuaWQsXG4gICAgICAgICAgICAnaW5jbHVkZXNbXSc6IFsncmVzb3VyY2VzJ11cbiAgICAgICAgfSlcbiAgICAgICAgLiRwcm9taXNlXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGF0KSB7XG4gICAgICAgICAgICBhdC5yZXNvdXJjZXMgPSBfLnBsdWNrKGF0LnJlc291cmNlcywgJ25hbWUnKS5qb2luKCcsICcpO1xuICAgICAgICAgICAgJHNjb3BlLmFwcG9pbnRtZW50VGVtcGxhdGUgPSBhdDtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdVbmFibGUgdG8gbG9hZCByZWNvcmQ6ICcgKyBlcnIuZGF0YS5yZWFzb24pO1xuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9hcHBvaW50bWVudHMvc2V0dGluZ3MvYXBwb2ludG1lbnRUZW1wbGF0ZXMnKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').controller('zAppointmentTemplateEditCtrl', ['$scope', '$routeParams', '$location', 'zNotifier', 'zAppointmentTemplateUtil', 'zAppointmentTemplate', 'zResource', 'zIdentity', function(
    $scope, $routeParams, $location, zNotifier, zAppointmentTemplateUtil, zAppointmentTemplate, zResource, zIdentity) {
    
    $scope.isLoading = true;
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    $scope.colorpickerOpts = zAppointmentTemplateUtil.colorpickerOpts;
    
    $scope.appointmentTemplate = {};
    $scope.appointmentTemplate.resources = [];

    zAppointmentTemplate
        .get({ id: $routeParams.id })
        .$promise
        .then(function(appointmentTemplate) {
            $scope.appointmentTemplate = appointmentTemplate;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load record: ' + err.data.reason);
            $location.path('/appointments/settings/templates');
        })
        .finally(function() {
            $scope.isLoading = false;
        });
    
    $scope.saveAppointmentTemplate = function() {
        $scope.isSaving = true;
        $scope.appointmentTemplate
            .$save()
            .then(function() {
                zNotifier.notify('Appointment template updated');
                $location.path('/appointments/settings/templates');
            })
            .catch(function(err) {
                zNotifier.error('Unable to save record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };

//    function applyTemplateToScope(appointmentTemplate) {
//        zResource.query(function(resources) {
//            extendTemplate(appointmentTemplate, resources);
//            $scope.appointmentTemplate = appointmentTemplate;
//            $scope.resources = resources;
//        });
//    }

//    function extendTemplate(appointmentTemplate, resources) {
//        var lookup = {};
//        for (var i = 0, len = resources.length; i < len; i++) {
//            lookup[resources[i]._id] = resources[i];
//        }
//
//        var resourceIds = angular.copy(appointmentTemplate.resources);
//        appointmentTemplate.resources = [];
//        for (var i=0; i<resourceIds.length; i++) {
//            appointmentTemplate.resources.push(lookup[resourceIds[i]]);
//        }
//    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvdGVtcGxhdGVzL3pBcHBvaW50bWVudFRlbXBsYXRlRWRpdEN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sV0FBVyxtS0FBZ0M7SUFDN0QsUUFBUSxjQUFjLFdBQVcsV0FBVywwQkFBMEIsc0JBQXNCLFdBQVcsV0FBVzs7SUFFbEgsT0FBTyxZQUFZO0lBQ25CLE9BQU8sVUFBVSxVQUFVLGFBQWEsQ0FBQyxTQUFTO0lBQ2xELE9BQU8sa0JBQWtCLHlCQUF5Qjs7SUFFbEQsT0FBTyxzQkFBc0I7SUFDN0IsT0FBTyxvQkFBb0IsWUFBWTs7SUFFdkM7U0FDSyxJQUFJLEVBQUUsSUFBSSxhQUFhO1NBQ3ZCO1NBQ0EsS0FBSyxTQUFTLHFCQUFxQjtZQUNoQyxPQUFPLHNCQUFzQjs7U0FFaEMsTUFBTSxTQUFTLEtBQUs7WUFDakIsVUFBVSxNQUFNLDRCQUE0QixJQUFJLEtBQUs7WUFDckQsVUFBVSxLQUFLOztTQUVsQixRQUFRLFdBQVc7WUFDaEIsT0FBTyxZQUFZOzs7SUFHM0IsT0FBTywwQkFBMEIsV0FBVztRQUN4QyxPQUFPLFdBQVc7UUFDbEIsT0FBTzthQUNGO2FBQ0EsS0FBSyxXQUFXO2dCQUNiLFVBQVUsT0FBTztnQkFDakIsVUFBVSxLQUFLOzthQUVsQixNQUFNLFNBQVMsS0FBSztnQkFDakIsVUFBVSxNQUFNLDRCQUE0QixJQUFJLEtBQUs7O2FBRXhELFFBQVEsV0FBVztnQkFDaEIsT0FBTyxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJsQyIsImZpbGUiOiJjb250cm9sbGVycy9kYXNoYm9hcmQvYXBwb2ludG1lbnRzL3RlbXBsYXRlcy96QXBwb2ludG1lbnRUZW1wbGF0ZUVkaXRDdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ3pBcHBvaW50bWVudFRlbXBsYXRlRWRpdEN0cmwnLCBmdW5jdGlvbihcbiAgICAkc2NvcGUsICRyb3V0ZVBhcmFtcywgJGxvY2F0aW9uLCB6Tm90aWZpZXIsIHpBcHBvaW50bWVudFRlbXBsYXRlVXRpbCwgekFwcG9pbnRtZW50VGVtcGxhdGUsIHpSZXNvdXJjZSwgeklkZW50aXR5KSB7XG4gICAgXG4gICAgJHNjb3BlLmlzTG9hZGluZyA9IHRydWU7XG4gICAgJHNjb3BlLmNhbkVkaXQgPSB6SWRlbnRpdHkuaXNBdXRob3JpemVkKFsnb3duZXInLCAnbWFuYWdlciddKTtcbiAgICAkc2NvcGUuY29sb3JwaWNrZXJPcHRzID0gekFwcG9pbnRtZW50VGVtcGxhdGVVdGlsLmNvbG9ycGlja2VyT3B0cztcbiAgICBcbiAgICAkc2NvcGUuYXBwb2ludG1lbnRUZW1wbGF0ZSA9IHt9O1xuICAgICRzY29wZS5hcHBvaW50bWVudFRlbXBsYXRlLnJlc291cmNlcyA9IFtdO1xuXG4gICAgekFwcG9pbnRtZW50VGVtcGxhdGVcbiAgICAgICAgLmdldCh7IGlkOiAkcm91dGVQYXJhbXMuaWQgfSlcbiAgICAgICAgLiRwcm9taXNlXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGFwcG9pbnRtZW50VGVtcGxhdGUpIHtcbiAgICAgICAgICAgICRzY29wZS5hcHBvaW50bWVudFRlbXBsYXRlID0gYXBwb2ludG1lbnRUZW1wbGF0ZTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdVbmFibGUgdG8gbG9hZCByZWNvcmQ6ICcgKyBlcnIuZGF0YS5yZWFzb24pO1xuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9hcHBvaW50bWVudHMvc2V0dGluZ3MvdGVtcGxhdGVzJyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICBcbiAgICAkc2NvcGUuc2F2ZUFwcG9pbnRtZW50VGVtcGxhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLmlzU2F2aW5nID0gdHJ1ZTtcbiAgICAgICAgJHNjb3BlLmFwcG9pbnRtZW50VGVtcGxhdGVcbiAgICAgICAgICAgIC4kc2F2ZSgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIubm90aWZ5KCdBcHBvaW50bWVudCB0ZW1wbGF0ZSB1cGRhdGVkJyk7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9hcHBvaW50bWVudHMvc2V0dGluZ3MvdGVtcGxhdGVzJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignVW5hYmxlIHRvIHNhdmUgcmVjb3JkOiAnICsgZXJyLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbi8vICAgIGZ1bmN0aW9uIGFwcGx5VGVtcGxhdGVUb1Njb3BlKGFwcG9pbnRtZW50VGVtcGxhdGUpIHtcbi8vICAgICAgICB6UmVzb3VyY2UucXVlcnkoZnVuY3Rpb24ocmVzb3VyY2VzKSB7XG4vLyAgICAgICAgICAgIGV4dGVuZFRlbXBsYXRlKGFwcG9pbnRtZW50VGVtcGxhdGUsIHJlc291cmNlcyk7XG4vLyAgICAgICAgICAgICRzY29wZS5hcHBvaW50bWVudFRlbXBsYXRlID0gYXBwb2ludG1lbnRUZW1wbGF0ZTtcbi8vICAgICAgICAgICAgJHNjb3BlLnJlc291cmNlcyA9IHJlc291cmNlcztcbi8vICAgICAgICB9KTtcbi8vICAgIH1cblxuLy8gICAgZnVuY3Rpb24gZXh0ZW5kVGVtcGxhdGUoYXBwb2ludG1lbnRUZW1wbGF0ZSwgcmVzb3VyY2VzKSB7XG4vLyAgICAgICAgdmFyIGxvb2t1cCA9IHt9O1xuLy8gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSByZXNvdXJjZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbi8vICAgICAgICAgICAgbG9va3VwW3Jlc291cmNlc1tpXS5faWRdID0gcmVzb3VyY2VzW2ldO1xuLy8gICAgICAgIH1cbi8vXG4vLyAgICAgICAgdmFyIHJlc291cmNlSWRzID0gYW5ndWxhci5jb3B5KGFwcG9pbnRtZW50VGVtcGxhdGUucmVzb3VyY2VzKTtcbi8vICAgICAgICBhcHBvaW50bWVudFRlbXBsYXRlLnJlc291cmNlcyA9IFtdO1xuLy8gICAgICAgIGZvciAodmFyIGk9MDsgaTxyZXNvdXJjZUlkcy5sZW5ndGg7IGkrKykge1xuLy8gICAgICAgICAgICBhcHBvaW50bWVudFRlbXBsYXRlLnJlc291cmNlcy5wdXNoKGxvb2t1cFtyZXNvdXJjZUlkc1tpXV0pO1xuLy8gICAgICAgIH1cbi8vICAgIH07XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').controller('zAppointmentTemplateListCtrl', ['$scope', 'zNotifier', 'zIdentity', 'zAppointmentTemplate', function(
    $scope, zNotifier, zIdentity, zAppointmentTemplate) {
    
    $scope.isLoading = true;
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    
    zAppointmentTemplate
        .query({
            'includes[]': ['resources']
        })
        .$promise
        .then(function(ats) {
            _.each(ats, function(at) {
                at.resources = _.pluck(at.resources, 'name').join(', ');
            });
            $scope.appointmentTemplates = ats;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load items: ' + err.data.reason);
        })
        .finally(function() {
            $scope.isLoading = false;
        });
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvdGVtcGxhdGVzL3pBcHBvaW50bWVudFRlbXBsYXRlTGlzdEN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sV0FBVyw2RkFBZ0M7SUFDN0QsUUFBUSxXQUFXLFdBQVcsc0JBQXNCOztJQUVwRCxPQUFPLFlBQVk7SUFDbkIsT0FBTyxVQUFVLFVBQVUsYUFBYSxDQUFDLFNBQVM7O0lBRWxEO1NBQ0ssTUFBTTtZQUNILGNBQWMsQ0FBQzs7U0FFbEI7U0FDQSxLQUFLLFNBQVMsS0FBSztZQUNoQixFQUFFLEtBQUssS0FBSyxTQUFTLElBQUk7Z0JBQ3JCLEdBQUcsWUFBWSxFQUFFLE1BQU0sR0FBRyxXQUFXLFFBQVEsS0FBSzs7WUFFdEQsT0FBTyx1QkFBdUI7O1NBRWpDLE1BQU0sU0FBUyxLQUFLO1lBQ2pCLFVBQVUsTUFBTSwyQkFBMkIsSUFBSSxLQUFLOztTQUV2RCxRQUFRLFdBQVc7WUFDaEIsT0FBTyxZQUFZOzs7QUFHL0IiLCJmaWxlIjoiY29udHJvbGxlcnMvZGFzaGJvYXJkL2FwcG9pbnRtZW50cy90ZW1wbGF0ZXMvekFwcG9pbnRtZW50VGVtcGxhdGVMaXN0Q3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCd6QXBwb2ludG1lbnRUZW1wbGF0ZUxpc3RDdHJsJywgZnVuY3Rpb24oXG4gICAgJHNjb3BlLCB6Tm90aWZpZXIsIHpJZGVudGl0eSwgekFwcG9pbnRtZW50VGVtcGxhdGUpIHtcbiAgICBcbiAgICAkc2NvcGUuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAkc2NvcGUuY2FuRWRpdCA9IHpJZGVudGl0eS5pc0F1dGhvcml6ZWQoWydvd25lcicsICdtYW5hZ2VyJ10pO1xuICAgIFxuICAgIHpBcHBvaW50bWVudFRlbXBsYXRlXG4gICAgICAgIC5xdWVyeSh7XG4gICAgICAgICAgICAnaW5jbHVkZXNbXSc6IFsncmVzb3VyY2VzJ11cbiAgICAgICAgfSlcbiAgICAgICAgLiRwcm9taXNlXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGF0cykge1xuICAgICAgICAgICAgXy5lYWNoKGF0cywgZnVuY3Rpb24oYXQpIHtcbiAgICAgICAgICAgICAgICBhdC5yZXNvdXJjZXMgPSBfLnBsdWNrKGF0LnJlc291cmNlcywgJ25hbWUnKS5qb2luKCcsICcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkc2NvcGUuYXBwb2ludG1lbnRUZW1wbGF0ZXMgPSBhdHM7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignVW5hYmxlIHRvIGxvYWQgaXRlbXM6ICcgKyBlcnIuZGF0YS5yZWFzb24pO1xuICAgICAgICB9KVxuICAgICAgICAuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').controller('zAppointmentTemplateNewCtrl', ['$scope', '$location', 'zNotifier', 'zIdentity', 'zAppointmentTemplateUtil', 'zAppointmentTemplate', function(
    $scope, $location, zNotifier, zIdentity, zAppointmentTemplateUtil, zAppointmentTemplate) {
    
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    $scope.colorpickerOpts = zAppointmentTemplateUtil.colorpickerOpts;
    /* jshint newcap: false */
    $scope.appointmentTemplate = new zAppointmentTemplate({
        resources: [],
        duration: 10,
        color: '#39CCCC'
    });
    
    $scope.createAppointmentTemplate = function() {
        $scope.isSaving = true;
        $scope.appointmentTemplate
            .$save()
            .then(function() {
                zNotifier.notify('Appointment template record created');
                $location.path('/appointments/settings/templates');
            })
            .catch(function(err) {
                zNotifier.error('Unable to save changes: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvdGVtcGxhdGVzL3pBcHBvaW50bWVudFRlbXBsYXRlTmV3Q3RybC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxXQUFXLHFJQUErQjtJQUM1RCxRQUFRLFdBQVcsV0FBVyxXQUFXLDBCQUEwQixzQkFBc0I7O0lBRXpGLE9BQU8sVUFBVSxVQUFVLGFBQWEsQ0FBQyxTQUFTO0lBQ2xELE9BQU8sa0JBQWtCLHlCQUF5Qjs7SUFFbEQsT0FBTyxzQkFBc0IsSUFBSSxxQkFBcUI7UUFDbEQsV0FBVztRQUNYLFVBQVU7UUFDVixPQUFPOzs7SUFHWCxPQUFPLDRCQUE0QixXQUFXO1FBQzFDLE9BQU8sV0FBVztRQUNsQixPQUFPO2FBQ0Y7YUFDQSxLQUFLLFdBQVc7Z0JBQ2IsVUFBVSxPQUFPO2dCQUNqQixVQUFVLEtBQUs7O2FBRWxCLE1BQU0sU0FBUyxLQUFLO2dCQUNqQixVQUFVLE1BQU0sNkJBQTZCLElBQUksS0FBSzs7YUFFekQsUUFBUSxXQUFXO2dCQUNoQixPQUFPLFdBQVc7Ozs7QUFJbEMiLCJmaWxlIjoiY29udHJvbGxlcnMvZGFzaGJvYXJkL2FwcG9pbnRtZW50cy90ZW1wbGF0ZXMvekFwcG9pbnRtZW50VGVtcGxhdGVOZXdDdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ3pBcHBvaW50bWVudFRlbXBsYXRlTmV3Q3RybCcsIGZ1bmN0aW9uKFxuICAgICRzY29wZSwgJGxvY2F0aW9uLCB6Tm90aWZpZXIsIHpJZGVudGl0eSwgekFwcG9pbnRtZW50VGVtcGxhdGVVdGlsLCB6QXBwb2ludG1lbnRUZW1wbGF0ZSkge1xuICAgIFxuICAgICRzY29wZS5jYW5FZGl0ID0geklkZW50aXR5LmlzQXV0aG9yaXplZChbJ293bmVyJywgJ21hbmFnZXInXSk7XG4gICAgJHNjb3BlLmNvbG9ycGlja2VyT3B0cyA9IHpBcHBvaW50bWVudFRlbXBsYXRlVXRpbC5jb2xvcnBpY2tlck9wdHM7XG4gICAgLyoganNoaW50IG5ld2NhcDogZmFsc2UgKi9cbiAgICAkc2NvcGUuYXBwb2ludG1lbnRUZW1wbGF0ZSA9IG5ldyB6QXBwb2ludG1lbnRUZW1wbGF0ZSh7XG4gICAgICAgIHJlc291cmNlczogW10sXG4gICAgICAgIGR1cmF0aW9uOiAxMCxcbiAgICAgICAgY29sb3I6ICcjMzlDQ0NDJ1xuICAgIH0pO1xuICAgIFxuICAgICRzY29wZS5jcmVhdGVBcHBvaW50bWVudFRlbXBsYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5pc1NhdmluZyA9IHRydWU7XG4gICAgICAgICRzY29wZS5hcHBvaW50bWVudFRlbXBsYXRlXG4gICAgICAgICAgICAuJHNhdmUoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgek5vdGlmaWVyLm5vdGlmeSgnQXBwb2ludG1lbnQgdGVtcGxhdGUgcmVjb3JkIGNyZWF0ZWQnKTtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2FwcG9pbnRtZW50cy9zZXR0aW5ncy90ZW1wbGF0ZXMnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdVbmFibGUgdG8gc2F2ZSBjaGFuZ2VzOiAnICsgZXJyLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').factory('zAppointmentTemplateUtil', function() {
    return {
        colorpickerOpts: {
            showPalette: true,
            palette: ['rgb(255, 0, 0)',     'rgb(0, 255, 0)',     'rgb(0, 0, 255)',
                      'rgb(176, 255, 119)', 'rgb(198, 180, 247)', 'rgb(112, 244, 220)',
                      'rgb(196, 246, 255)', 'rgb(115, 123, 244)', 'rgb(252, 176, 230)',
                      'rgb(249, 127, 137)', 'rgb(249, 201, 152)', 'rgb(252, 190, 35)',
                      'rgb(102, 198, 131)', 'rgb(255, 0, 255)'
            ]
        }
    };
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvdGVtcGxhdGVzL3pBcHBvaW50bWVudFRlbXBsYXRlVXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxRQUFRLDRCQUE0QixXQUFXO0lBQ2pFLE9BQU87UUFDSCxpQkFBaUI7WUFDYixhQUFhO1lBQ2IsU0FBUyxDQUFDLHNCQUFzQixzQkFBc0I7c0JBQzVDLHNCQUFzQixzQkFBc0I7c0JBQzVDLHNCQUFzQixzQkFBc0I7c0JBQzVDLHNCQUFzQixzQkFBc0I7c0JBQzVDLHNCQUFzQjs7Ozs7QUFLNUMiLCJmaWxlIjoiY29udHJvbGxlcnMvZGFzaGJvYXJkL2FwcG9pbnRtZW50cy90ZW1wbGF0ZXMvekFwcG9pbnRtZW50VGVtcGxhdGVVdGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ3pBcHBvaW50bWVudFRlbXBsYXRlVXRpbCcsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvbG9ycGlja2VyT3B0czoge1xuICAgICAgICAgICAgc2hvd1BhbGV0dGU6IHRydWUsXG4gICAgICAgICAgICBwYWxldHRlOiBbJ3JnYigyNTUsIDAsIDApJywgICAgICdyZ2IoMCwgMjU1LCAwKScsICAgICAncmdiKDAsIDAsIDI1NSknLFxuICAgICAgICAgICAgICAgICAgICAgICdyZ2IoMTc2LCAyNTUsIDExOSknLCAncmdiKDE5OCwgMTgwLCAyNDcpJywgJ3JnYigxMTIsIDI0NCwgMjIwKScsXG4gICAgICAgICAgICAgICAgICAgICAgJ3JnYigxOTYsIDI0NiwgMjU1KScsICdyZ2IoMTE1LCAxMjMsIDI0NCknLCAncmdiKDI1MiwgMTc2LCAyMzApJyxcbiAgICAgICAgICAgICAgICAgICAgICAncmdiKDI0OSwgMTI3LCAxMzcpJywgJ3JnYigyNDksIDIwMSwgMTUyKScsICdyZ2IoMjUyLCAxOTAsIDM1KScsXG4gICAgICAgICAgICAgICAgICAgICAgJ3JnYigxMDIsIDE5OCwgMTMxKScsICdyZ2IoMjU1LCAwLCAyNTUpJ1xuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').controller('zAppointmentDetailsDialogCtrl', ['$scope', '$modalInstance', '$location', 'zIdentity', 'zNotifier', 'zAppointment', 'zClient', 'params', function(
    $scope, $modalInstance, $location, zIdentity, zNotifier, zAppointment, zClient, params) {

    $scope.canEdit = true; // TODO: check roles
    $scope.isLoading = true;
    
    $scope.openClientView = function(client) {
        $modalInstance.dismiss('cancel');
        $location.url('/clients/' + client._id);
    };
    
    $scope.edit = function () {
        $modalInstance.close();
    };

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

    (function _loadData() {
        zAppointment
            .get({
                id: params._id, 
                'includes[]': ['clients', 'resources']
            })
            .$promise
            .then(function(appointment) {
                $scope.appointment = appointment;
            })
            .catch(function(err) {
                zNotifier.error('Unable to load record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isLoading = false;
            });
    })();
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvekFwcG9pbnRtZW50RGV0YWlsc0RpYWxvZ0N0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sV0FBVywwSUFBaUM7SUFDOUQsUUFBUSxnQkFBZ0IsV0FBVyxXQUFXLFdBQVcsY0FBYyxTQUFTLFFBQVE7O0lBRXhGLE9BQU8sVUFBVTtJQUNqQixPQUFPLFlBQVk7O0lBRW5CLE9BQU8saUJBQWlCLFNBQVMsUUFBUTtRQUNyQyxlQUFlLFFBQVE7UUFDdkIsVUFBVSxJQUFJLGNBQWMsT0FBTzs7O0lBR3ZDLE9BQU8sT0FBTyxZQUFZO1FBQ3RCLGVBQWU7OztJQUduQixPQUFPLFFBQVEsWUFBWTtRQUN2QixlQUFlLFFBQVE7OztJQUczQixDQUFDLFNBQVMsWUFBWTtRQUNsQjthQUNLLElBQUk7Z0JBQ0QsSUFBSSxPQUFPO2dCQUNYLGNBQWMsQ0FBQyxXQUFXOzthQUU3QjthQUNBLEtBQUssU0FBUyxhQUFhO2dCQUN4QixPQUFPLGNBQWM7O2FBRXhCLE1BQU0sU0FBUyxLQUFLO2dCQUNqQixVQUFVLE1BQU0sNEJBQTRCLElBQUksS0FBSzs7YUFFeEQsUUFBUSxXQUFXO2dCQUNoQixPQUFPLFlBQVk7Ozs7QUFJbkMiLCJmaWxlIjoiY29udHJvbGxlcnMvZGFzaGJvYXJkL2FwcG9pbnRtZW50cy96QXBwb2ludG1lbnREZXRhaWxzRGlhbG9nQ3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCd6QXBwb2ludG1lbnREZXRhaWxzRGlhbG9nQ3RybCcsIGZ1bmN0aW9uKFxuICAgICRzY29wZSwgJG1vZGFsSW5zdGFuY2UsICRsb2NhdGlvbiwgeklkZW50aXR5LCB6Tm90aWZpZXIsIHpBcHBvaW50bWVudCwgekNsaWVudCwgcGFyYW1zKSB7XG5cbiAgICAkc2NvcGUuY2FuRWRpdCA9IHRydWU7IC8vIFRPRE86IGNoZWNrIHJvbGVzXG4gICAgJHNjb3BlLmlzTG9hZGluZyA9IHRydWU7XG4gICAgXG4gICAgJHNjb3BlLm9wZW5DbGllbnRWaWV3ID0gZnVuY3Rpb24oY2xpZW50KSB7XG4gICAgICAgICRtb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xuICAgICAgICAkbG9jYXRpb24udXJsKCcvY2xpZW50cy8nICsgY2xpZW50Ll9pZCk7XG4gICAgfTtcbiAgICBcbiAgICAkc2NvcGUuZWRpdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJG1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkbW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcbiAgICB9O1xuXG4gICAgKGZ1bmN0aW9uIF9sb2FkRGF0YSgpIHtcbiAgICAgICAgekFwcG9pbnRtZW50XG4gICAgICAgICAgICAuZ2V0KHtcbiAgICAgICAgICAgICAgICBpZDogcGFyYW1zLl9pZCwgXG4gICAgICAgICAgICAgICAgJ2luY2x1ZGVzW10nOiBbJ2NsaWVudHMnLCAncmVzb3VyY2VzJ11cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuJHByb21pc2VcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGFwcG9pbnRtZW50KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmFwcG9pbnRtZW50ID0gYXBwb2ludG1lbnQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignVW5hYmxlIHRvIGxvYWQgcmVjb3JkOiAnICsgZXJyLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICB9KSgpO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').controller('zAppointmentEditDialogCtrl', ['$scope', '$modalInstance', 'zIdentity', 'zNotifier', 'zCommonUtil', 'zAppointmentUtil', 'zAppointmentTemplate', 'zAppointment', 'params', function(
    $scope, $modalInstance, zIdentity, zNotifier, zCommonUtil, zAppointmentUtil, zAppointmentTemplate, zAppointment, params) {
    /* jshint maxstatements: 17 */
    
    $scope.canEdit = true; // TODO: check roles
    $scope.canEditTemplate = zIdentity.isAuthorized(['manager']);
    $scope.dateOptions = zAppointmentUtil.dateOptions;
    $scope.tpOptions = zAppointmentUtil.tpOptions;
    $scope.colorpickerOpts = zAppointmentUtil.colorpickerOpts;
    $scope.isTemplateEdited = false;
    $scope.isLoading = true;
    
    $scope.createClient = function() {
        zAppointmentUtil
            .createClient()
            .then(function(client) {
                $scope.appointment.clients.push(client);
            });
    };
    
    $scope.saveAsTemplate = function() {
        alert('Not implemented');
    };
    
    $scope.replaceTemplate = function() {
        alert('Not implemented');
    };
    
    $scope.save = function () {
        _saveAppointment()
            .then($modalInstance.close)
            .catch(function(err) {
                var msg = zCommonUtil.getErrorMessage(err);
                zNotifier.error('Unable to save record: ' + msg);
            });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.openDatePicker = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    
    $scope.$watch('appointment.appointmentTemplate', function(newTemplate) {
        if ($scope.isTemplateEdited && newTemplate && newTemplate._id) {
            $scope.isTemplateEdited = false;
            zAppointmentUtil.applyAppointmentTemplate($scope.appointment, $scope.resources, newTemplate);
        }
    });
    
    $scope.templateChanged = function() {
        $scope.isTemplateEdited = true;
    };

    (function _loadData() {
        zAppointmentUtil
            .loadCollections()
            .then(function(data) {
                $scope.resources = data.resources;
                $scope.clients = data.clients;
            })
            .then(function() {
                return zAppointment
                    .get({
                        id: params._id,
                        'includes[]': ['appointmentTemplate']
                    })
                    .$promise;
            })
            .then(function(appointment) {
                // TODO: improve
                $scope.appointment = appointment;
                $scope.appointment.selectedResources = [];
                $scope.appointment.selectedClients = [];
                zAppointmentUtil.selectItems($scope.appointment.resources, $scope.resources);
                zAppointmentUtil.selectItems($scope.appointment.clients, $scope.clients);
            })
            .then(function() {
                return zAppointmentTemplate
                    .query({ 'includes[]': ['resources'] })
                    .$promise;
            })
            .then(function(templates) {
                $scope.templates = zAppointmentUtil.prepareAppointmentTemplates(templates);
                if ($scope.appointment.appointmentTemplate) {
                    var templateId = $scope.appointment.appointmentTemplate._id;
                    $scope.appointment.appointmentTemplate = _.find(templates, { _id: templateId }) || null;
                }
            })
            .catch(function(err) {
                zNotifier.error('Unable to load record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isLoading = false;
            });
    })();
    
    function _saveAppointment() {
        if ($scope.appointment.start < moment().toDate()) {
            return $q.reject(new Error('Can\'t create appointment in the past'));
        }
        
        $scope.isSaving = true;
        var appointmentForSave = zAppointmentUtil.prepareAppointmentForSave($scope.appointment);
        return appointmentForSave
            .$save()
            .then(function() {
                zNotifier.notify('Appointment record updated');
                return zAppointmentUtil.prepareAppointment(appointmentForSave);
            })
            .catch(function(err) {
                zNotifier.error('Unable to save appointment: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    }
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvekFwcG9pbnRtZW50RWRpdERpYWxvZ0N0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sV0FBVywwS0FBOEI7SUFDM0QsUUFBUSxnQkFBZ0IsV0FBVyxXQUFXLGFBQWEsa0JBQWtCLHNCQUFzQixjQUFjLFFBQVE7OztJQUd6SCxPQUFPLFVBQVU7SUFDakIsT0FBTyxrQkFBa0IsVUFBVSxhQUFhLENBQUM7SUFDakQsT0FBTyxjQUFjLGlCQUFpQjtJQUN0QyxPQUFPLFlBQVksaUJBQWlCO0lBQ3BDLE9BQU8sa0JBQWtCLGlCQUFpQjtJQUMxQyxPQUFPLG1CQUFtQjtJQUMxQixPQUFPLFlBQVk7O0lBRW5CLE9BQU8sZUFBZSxXQUFXO1FBQzdCO2FBQ0s7YUFDQSxLQUFLLFNBQVMsUUFBUTtnQkFDbkIsT0FBTyxZQUFZLFFBQVEsS0FBSzs7OztJQUk1QyxPQUFPLGlCQUFpQixXQUFXO1FBQy9CLE1BQU07OztJQUdWLE9BQU8sa0JBQWtCLFdBQVc7UUFDaEMsTUFBTTs7O0lBR1YsT0FBTyxPQUFPLFlBQVk7UUFDdEI7YUFDSyxLQUFLLGVBQWU7YUFDcEIsTUFBTSxTQUFTLEtBQUs7Z0JBQ2pCLElBQUksTUFBTSxZQUFZLGdCQUFnQjtnQkFDdEMsVUFBVSxNQUFNLDRCQUE0Qjs7OztJQUl4RCxPQUFPLFNBQVMsWUFBWTtRQUN4QixlQUFlLFFBQVE7OztJQUczQixPQUFPLGlCQUFpQixTQUFTLFFBQVE7UUFDckMsT0FBTztRQUNQLE9BQU87UUFDUCxPQUFPLFNBQVM7OztJQUdwQixPQUFPLE9BQU8sbUNBQW1DLFNBQVMsYUFBYTtRQUNuRSxJQUFJLE9BQU8sb0JBQW9CLGVBQWUsWUFBWSxLQUFLO1lBQzNELE9BQU8sbUJBQW1CO1lBQzFCLGlCQUFpQix5QkFBeUIsT0FBTyxhQUFhLE9BQU8sV0FBVzs7OztJQUl4RixPQUFPLGtCQUFrQixXQUFXO1FBQ2hDLE9BQU8sbUJBQW1COzs7SUFHOUIsQ0FBQyxTQUFTLFlBQVk7UUFDbEI7YUFDSzthQUNBLEtBQUssU0FBUyxNQUFNO2dCQUNqQixPQUFPLFlBQVksS0FBSztnQkFDeEIsT0FBTyxVQUFVLEtBQUs7O2FBRXpCLEtBQUssV0FBVztnQkFDYixPQUFPO3FCQUNGLElBQUk7d0JBQ0QsSUFBSSxPQUFPO3dCQUNYLGNBQWMsQ0FBQzs7cUJBRWxCOzthQUVSLEtBQUssU0FBUyxhQUFhOztnQkFFeEIsT0FBTyxjQUFjO2dCQUNyQixPQUFPLFlBQVksb0JBQW9CO2dCQUN2QyxPQUFPLFlBQVksa0JBQWtCO2dCQUNyQyxpQkFBaUIsWUFBWSxPQUFPLFlBQVksV0FBVyxPQUFPO2dCQUNsRSxpQkFBaUIsWUFBWSxPQUFPLFlBQVksU0FBUyxPQUFPOzthQUVuRSxLQUFLLFdBQVc7Z0JBQ2IsT0FBTztxQkFDRixNQUFNLEVBQUUsY0FBYyxDQUFDO3FCQUN2Qjs7YUFFUixLQUFLLFNBQVMsV0FBVztnQkFDdEIsT0FBTyxZQUFZLGlCQUFpQiw0QkFBNEI7Z0JBQ2hFLElBQUksT0FBTyxZQUFZLHFCQUFxQjtvQkFDeEMsSUFBSSxhQUFhLE9BQU8sWUFBWSxvQkFBb0I7b0JBQ3hELE9BQU8sWUFBWSxzQkFBc0IsRUFBRSxLQUFLLFdBQVcsRUFBRSxLQUFLLGlCQUFpQjs7O2FBRzFGLE1BQU0sU0FBUyxLQUFLO2dCQUNqQixVQUFVLE1BQU0sNEJBQTRCLElBQUksS0FBSzs7YUFFeEQsUUFBUSxXQUFXO2dCQUNoQixPQUFPLFlBQVk7Ozs7SUFJL0IsU0FBUyxtQkFBbUI7UUFDeEIsSUFBSSxPQUFPLFlBQVksUUFBUSxTQUFTLFVBQVU7WUFDOUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxNQUFNOzs7UUFHL0IsT0FBTyxXQUFXO1FBQ2xCLElBQUkscUJBQXFCLGlCQUFpQiwwQkFBMEIsT0FBTztRQUMzRSxPQUFPO2FBQ0Y7YUFDQSxLQUFLLFdBQVc7Z0JBQ2IsVUFBVSxPQUFPO2dCQUNqQixPQUFPLGlCQUFpQixtQkFBbUI7O2FBRTlDLE1BQU0sU0FBUyxLQUFLO2dCQUNqQixVQUFVLE1BQU0saUNBQWlDLElBQUksS0FBSzs7YUFFN0QsUUFBUSxXQUFXO2dCQUNoQixPQUFPLFdBQVc7Ozs7QUFJbEMiLCJmaWxlIjoiY29udHJvbGxlcnMvZGFzaGJvYXJkL2FwcG9pbnRtZW50cy96QXBwb2ludG1lbnRFZGl0RGlhbG9nQ3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCd6QXBwb2ludG1lbnRFZGl0RGlhbG9nQ3RybCcsIGZ1bmN0aW9uKFxuICAgICRzY29wZSwgJG1vZGFsSW5zdGFuY2UsIHpJZGVudGl0eSwgek5vdGlmaWVyLCB6Q29tbW9uVXRpbCwgekFwcG9pbnRtZW50VXRpbCwgekFwcG9pbnRtZW50VGVtcGxhdGUsIHpBcHBvaW50bWVudCwgcGFyYW1zKSB7XG4gICAgLyoganNoaW50IG1heHN0YXRlbWVudHM6IDE3ICovXG4gICAgXG4gICAgJHNjb3BlLmNhbkVkaXQgPSB0cnVlOyAvLyBUT0RPOiBjaGVjayByb2xlc1xuICAgICRzY29wZS5jYW5FZGl0VGVtcGxhdGUgPSB6SWRlbnRpdHkuaXNBdXRob3JpemVkKFsnbWFuYWdlciddKTtcbiAgICAkc2NvcGUuZGF0ZU9wdGlvbnMgPSB6QXBwb2ludG1lbnRVdGlsLmRhdGVPcHRpb25zO1xuICAgICRzY29wZS50cE9wdGlvbnMgPSB6QXBwb2ludG1lbnRVdGlsLnRwT3B0aW9ucztcbiAgICAkc2NvcGUuY29sb3JwaWNrZXJPcHRzID0gekFwcG9pbnRtZW50VXRpbC5jb2xvcnBpY2tlck9wdHM7XG4gICAgJHNjb3BlLmlzVGVtcGxhdGVFZGl0ZWQgPSBmYWxzZTtcbiAgICAkc2NvcGUuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICBcbiAgICAkc2NvcGUuY3JlYXRlQ2xpZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHpBcHBvaW50bWVudFV0aWxcbiAgICAgICAgICAgIC5jcmVhdGVDbGllbnQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY2xpZW50KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmFwcG9pbnRtZW50LmNsaWVudHMucHVzaChjbGllbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcbiAgICBcbiAgICAkc2NvcGUuc2F2ZUFzVGVtcGxhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgYWxlcnQoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICAgIH07XG4gICAgXG4gICAgJHNjb3BlLnJlcGxhY2VUZW1wbGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBhbGVydCgnTm90IGltcGxlbWVudGVkJyk7XG4gICAgfTtcbiAgICBcbiAgICAkc2NvcGUuc2F2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3NhdmVBcHBvaW50bWVudCgpXG4gICAgICAgICAgICAudGhlbigkbW9kYWxJbnN0YW5jZS5jbG9zZSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gekNvbW1vblV0aWwuZ2V0RXJyb3JNZXNzYWdlKGVycik7XG4gICAgICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdVbmFibGUgdG8gc2F2ZSByZWNvcmQ6ICcgKyBtc2cpO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRtb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xuICAgIH07XG5cbiAgICAkc2NvcGUub3BlbkRhdGVQaWNrZXIgPSBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgJHNjb3BlLm9wZW5lZCA9IHRydWU7XG4gICAgfTtcbiAgICBcbiAgICAkc2NvcGUuJHdhdGNoKCdhcHBvaW50bWVudC5hcHBvaW50bWVudFRlbXBsYXRlJywgZnVuY3Rpb24obmV3VGVtcGxhdGUpIHtcbiAgICAgICAgaWYgKCRzY29wZS5pc1RlbXBsYXRlRWRpdGVkICYmIG5ld1RlbXBsYXRlICYmIG5ld1RlbXBsYXRlLl9pZCkge1xuICAgICAgICAgICAgJHNjb3BlLmlzVGVtcGxhdGVFZGl0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHpBcHBvaW50bWVudFV0aWwuYXBwbHlBcHBvaW50bWVudFRlbXBsYXRlKCRzY29wZS5hcHBvaW50bWVudCwgJHNjb3BlLnJlc291cmNlcywgbmV3VGVtcGxhdGUpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgJHNjb3BlLnRlbXBsYXRlQ2hhbmdlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuaXNUZW1wbGF0ZUVkaXRlZCA9IHRydWU7XG4gICAgfTtcblxuICAgIChmdW5jdGlvbiBfbG9hZERhdGEoKSB7XG4gICAgICAgIHpBcHBvaW50bWVudFV0aWxcbiAgICAgICAgICAgIC5sb2FkQ29sbGVjdGlvbnMoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5yZXNvdXJjZXMgPSBkYXRhLnJlc291cmNlcztcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2xpZW50cyA9IGRhdGEuY2xpZW50cztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gekFwcG9pbnRtZW50XG4gICAgICAgICAgICAgICAgICAgIC5nZXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHBhcmFtcy5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaW5jbHVkZXNbXSc6IFsnYXBwb2ludG1lbnRUZW1wbGF0ZSddXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC4kcHJvbWlzZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihhcHBvaW50bWVudCkge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IGltcHJvdmVcbiAgICAgICAgICAgICAgICAkc2NvcGUuYXBwb2ludG1lbnQgPSBhcHBvaW50bWVudDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuYXBwb2ludG1lbnQuc2VsZWN0ZWRSZXNvdXJjZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuYXBwb2ludG1lbnQuc2VsZWN0ZWRDbGllbnRzID0gW107XG4gICAgICAgICAgICAgICAgekFwcG9pbnRtZW50VXRpbC5zZWxlY3RJdGVtcygkc2NvcGUuYXBwb2ludG1lbnQucmVzb3VyY2VzLCAkc2NvcGUucmVzb3VyY2VzKTtcbiAgICAgICAgICAgICAgICB6QXBwb2ludG1lbnRVdGlsLnNlbGVjdEl0ZW1zKCRzY29wZS5hcHBvaW50bWVudC5jbGllbnRzLCAkc2NvcGUuY2xpZW50cyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHpBcHBvaW50bWVudFRlbXBsYXRlXG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeSh7ICdpbmNsdWRlc1tdJzogWydyZXNvdXJjZXMnXSB9KVxuICAgICAgICAgICAgICAgICAgICAuJHByb21pc2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24odGVtcGxhdGVzKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnRlbXBsYXRlcyA9IHpBcHBvaW50bWVudFV0aWwucHJlcGFyZUFwcG9pbnRtZW50VGVtcGxhdGVzKHRlbXBsYXRlcyk7XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5hcHBvaW50bWVudC5hcHBvaW50bWVudFRlbXBsYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZUlkID0gJHNjb3BlLmFwcG9pbnRtZW50LmFwcG9pbnRtZW50VGVtcGxhdGUuX2lkO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYXBwb2ludG1lbnQuYXBwb2ludG1lbnRUZW1wbGF0ZSA9IF8uZmluZCh0ZW1wbGF0ZXMsIHsgX2lkOiB0ZW1wbGF0ZUlkIH0pIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIuZXJyb3IoJ1VuYWJsZSB0byBsb2FkIHJlY29yZDogJyArIGVyci5kYXRhLnJlYXNvbik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfSkoKTtcbiAgICBcbiAgICBmdW5jdGlvbiBfc2F2ZUFwcG9pbnRtZW50KCkge1xuICAgICAgICBpZiAoJHNjb3BlLmFwcG9pbnRtZW50LnN0YXJ0IDwgbW9tZW50KCkudG9EYXRlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QobmV3IEVycm9yKCdDYW5cXCd0IGNyZWF0ZSBhcHBvaW50bWVudCBpbiB0aGUgcGFzdCcpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgJHNjb3BlLmlzU2F2aW5nID0gdHJ1ZTtcbiAgICAgICAgdmFyIGFwcG9pbnRtZW50Rm9yU2F2ZSA9IHpBcHBvaW50bWVudFV0aWwucHJlcGFyZUFwcG9pbnRtZW50Rm9yU2F2ZSgkc2NvcGUuYXBwb2ludG1lbnQpO1xuICAgICAgICByZXR1cm4gYXBwb2ludG1lbnRGb3JTYXZlXG4gICAgICAgICAgICAuJHNhdmUoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgek5vdGlmaWVyLm5vdGlmeSgnQXBwb2ludG1lbnQgcmVjb3JkIHVwZGF0ZWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gekFwcG9pbnRtZW50VXRpbC5wcmVwYXJlQXBwb2ludG1lbnQoYXBwb2ludG1lbnRGb3JTYXZlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdVbmFibGUgdG8gc2F2ZSBhcHBvaW50bWVudDogJyArIGVyci5kYXRhLnJlYXNvbik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzU2F2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').controller('zAppointmentNewDialogCtrl', ['$scope', '$modalInstance', '$q', 'zIdentity', 'zNotifier', 'zCommonUtil', 'zAppointmentUtil', 'zAppointmentTemplate', 'zAppointment', 'params', function(
    $scope, $modalInstance, $q, zIdentity, zNotifier, zCommonUtil, zAppointmentUtil, zAppointmentTemplate, zAppointment, params) {
    /* jshint maxstatements: 17 */
    
    $scope.canEdit = true; // TODO: check roles
    $scope.canEditTemplate = zIdentity.isAuthorized(['manager']);
    $scope.dateOptions = zAppointmentUtil.dateOptions;
    $scope.tpOptions = zAppointmentUtil.tpOptions;
    $scope.colorpickerOpts = zAppointmentUtil.colorpickerOpts;
    $scope.isTemplateEdited = true;
    $scope.isLoading = true;
    
    $scope.createClient = function() {
        zAppointmentUtil
            .createClient()
            .then(function(client) {
                $scope.appointment.clients.push(client);
            });
    };
    
    $scope.saveAsTemplate = function() {
        alert('Not implemented');
    };
    
    $scope.replaceTemplate = function() {
        alert('Not implemented');
    };
    
    $scope.save = function () {
        _saveAppointment()
            .then($modalInstance.close)
            .catch(function(err) {
                var msg = zCommonUtil.getErrorMessage(err);
                zNotifier.error('Unable to save record: ' + msg);
            });
    };
    
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    
    $scope.openDatePicker = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    
    $scope.$watch('appointment.appointmentTemplate', function(newTemplate) {
        if ($scope.isTemplateEdited && newTemplate && newTemplate._id) {
            $scope.isTemplateEdited = false;
            zAppointmentUtil.applyAppointmentTemplate($scope.appointment, $scope.resources, newTemplate);
        }
    });
    
    $scope.templateChanged = function() {
        $scope.isTemplateEdited = true;
    };

    (function _loadData() {
        var startDate = params.startDate.local();
        
        /* jshint newcap: false */
        $scope.appointment = new zAppointment({
            color: '#39CCCC',
            start: startDate.toDate(),
            duration: 0,
            resources: params.resources,
            clients: params.clients
        });
        
        zAppointmentUtil
            .loadCollections()
            .then(function(data) {
                $scope.resources = data.resources;
                $scope.clients = data.clients;
            })
            .then(function() {
                return zAppointmentTemplate
                .query({ 'includes[]': ['resources'] })
                .$promise;
            })
            .then(function(templates) {
                $scope.templates = zAppointmentUtil.prepareAppointmentTemplates(templates);
            })
            .catch(function(err) {
                zNotifier.error('Unable to load record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isLoading = false;
            });
    })();
    
    function _saveAppointment() {
        if ($scope.appointment.start < moment().toDate()) {
            return $q.reject(new Error('Can\'t create appointment in the past'));
        }
        
        $scope.isSaving = true;
        var appointmentForSave = zAppointmentUtil.prepareAppointmentForSave($scope.appointment);
        return appointmentForSave
            .$save()
            .then(function() {
                zNotifier.notify('Appointment record created');
                return zAppointmentUtil.prepareAppointment(appointmentForSave);
            })
            .catch(function(err) {
                zNotifier.error('Unable to save appointment: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    }
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvekFwcG9pbnRtZW50TmV3RGlhbG9nQ3RybC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxXQUFXLCtLQUE2QjtJQUMxRCxRQUFRLGdCQUFnQixJQUFJLFdBQVcsV0FBVyxhQUFhLGtCQUFrQixzQkFBc0IsY0FBYyxRQUFROzs7SUFHN0gsT0FBTyxVQUFVO0lBQ2pCLE9BQU8sa0JBQWtCLFVBQVUsYUFBYSxDQUFDO0lBQ2pELE9BQU8sY0FBYyxpQkFBaUI7SUFDdEMsT0FBTyxZQUFZLGlCQUFpQjtJQUNwQyxPQUFPLGtCQUFrQixpQkFBaUI7SUFDMUMsT0FBTyxtQkFBbUI7SUFDMUIsT0FBTyxZQUFZOztJQUVuQixPQUFPLGVBQWUsV0FBVztRQUM3QjthQUNLO2FBQ0EsS0FBSyxTQUFTLFFBQVE7Z0JBQ25CLE9BQU8sWUFBWSxRQUFRLEtBQUs7Ozs7SUFJNUMsT0FBTyxpQkFBaUIsV0FBVztRQUMvQixNQUFNOzs7SUFHVixPQUFPLGtCQUFrQixXQUFXO1FBQ2hDLE1BQU07OztJQUdWLE9BQU8sT0FBTyxZQUFZO1FBQ3RCO2FBQ0ssS0FBSyxlQUFlO2FBQ3BCLE1BQU0sU0FBUyxLQUFLO2dCQUNqQixJQUFJLE1BQU0sWUFBWSxnQkFBZ0I7Z0JBQ3RDLFVBQVUsTUFBTSw0QkFBNEI7Ozs7SUFJeEQsT0FBTyxTQUFTLFlBQVk7UUFDeEIsZUFBZSxRQUFROzs7SUFHM0IsT0FBTyxpQkFBaUIsU0FBUyxRQUFRO1FBQ3JDLE9BQU87UUFDUCxPQUFPO1FBQ1AsT0FBTyxTQUFTOzs7SUFHcEIsT0FBTyxPQUFPLG1DQUFtQyxTQUFTLGFBQWE7UUFDbkUsSUFBSSxPQUFPLG9CQUFvQixlQUFlLFlBQVksS0FBSztZQUMzRCxPQUFPLG1CQUFtQjtZQUMxQixpQkFBaUIseUJBQXlCLE9BQU8sYUFBYSxPQUFPLFdBQVc7Ozs7SUFJeEYsT0FBTyxrQkFBa0IsV0FBVztRQUNoQyxPQUFPLG1CQUFtQjs7O0lBRzlCLENBQUMsU0FBUyxZQUFZO1FBQ2xCLElBQUksWUFBWSxPQUFPLFVBQVU7OztRQUdqQyxPQUFPLGNBQWMsSUFBSSxhQUFhO1lBQ2xDLE9BQU87WUFDUCxPQUFPLFVBQVU7WUFDakIsVUFBVTtZQUNWLFdBQVcsT0FBTztZQUNsQixTQUFTLE9BQU87OztRQUdwQjthQUNLO2FBQ0EsS0FBSyxTQUFTLE1BQU07Z0JBQ2pCLE9BQU8sWUFBWSxLQUFLO2dCQUN4QixPQUFPLFVBQVUsS0FBSzs7YUFFekIsS0FBSyxXQUFXO2dCQUNiLE9BQU87aUJBQ04sTUFBTSxFQUFFLGNBQWMsQ0FBQztpQkFDdkI7O2FBRUosS0FBSyxTQUFTLFdBQVc7Z0JBQ3RCLE9BQU8sWUFBWSxpQkFBaUIsNEJBQTRCOzthQUVuRSxNQUFNLFNBQVMsS0FBSztnQkFDakIsVUFBVSxNQUFNLDRCQUE0QixJQUFJLEtBQUs7O2FBRXhELFFBQVEsV0FBVztnQkFDaEIsT0FBTyxZQUFZOzs7O0lBSS9CLFNBQVMsbUJBQW1CO1FBQ3hCLElBQUksT0FBTyxZQUFZLFFBQVEsU0FBUyxVQUFVO1lBQzlDLE9BQU8sR0FBRyxPQUFPLElBQUksTUFBTTs7O1FBRy9CLE9BQU8sV0FBVztRQUNsQixJQUFJLHFCQUFxQixpQkFBaUIsMEJBQTBCLE9BQU87UUFDM0UsT0FBTzthQUNGO2FBQ0EsS0FBSyxXQUFXO2dCQUNiLFVBQVUsT0FBTztnQkFDakIsT0FBTyxpQkFBaUIsbUJBQW1COzthQUU5QyxNQUFNLFNBQVMsS0FBSztnQkFDakIsVUFBVSxNQUFNLGlDQUFpQyxJQUFJLEtBQUs7O2FBRTdELFFBQVEsV0FBVztnQkFDaEIsT0FBTyxXQUFXOzs7O0FBSWxDIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvekFwcG9pbnRtZW50TmV3RGlhbG9nQ3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCd6QXBwb2ludG1lbnROZXdEaWFsb2dDdHJsJywgZnVuY3Rpb24oXG4gICAgJHNjb3BlLCAkbW9kYWxJbnN0YW5jZSwgJHEsIHpJZGVudGl0eSwgek5vdGlmaWVyLCB6Q29tbW9uVXRpbCwgekFwcG9pbnRtZW50VXRpbCwgekFwcG9pbnRtZW50VGVtcGxhdGUsIHpBcHBvaW50bWVudCwgcGFyYW1zKSB7XG4gICAgLyoganNoaW50IG1heHN0YXRlbWVudHM6IDE3ICovXG4gICAgXG4gICAgJHNjb3BlLmNhbkVkaXQgPSB0cnVlOyAvLyBUT0RPOiBjaGVjayByb2xlc1xuICAgICRzY29wZS5jYW5FZGl0VGVtcGxhdGUgPSB6SWRlbnRpdHkuaXNBdXRob3JpemVkKFsnbWFuYWdlciddKTtcbiAgICAkc2NvcGUuZGF0ZU9wdGlvbnMgPSB6QXBwb2ludG1lbnRVdGlsLmRhdGVPcHRpb25zO1xuICAgICRzY29wZS50cE9wdGlvbnMgPSB6QXBwb2ludG1lbnRVdGlsLnRwT3B0aW9ucztcbiAgICAkc2NvcGUuY29sb3JwaWNrZXJPcHRzID0gekFwcG9pbnRtZW50VXRpbC5jb2xvcnBpY2tlck9wdHM7XG4gICAgJHNjb3BlLmlzVGVtcGxhdGVFZGl0ZWQgPSB0cnVlO1xuICAgICRzY29wZS5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIFxuICAgICRzY29wZS5jcmVhdGVDbGllbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgekFwcG9pbnRtZW50VXRpbFxuICAgICAgICAgICAgLmNyZWF0ZUNsaWVudCgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjbGllbnQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuYXBwb2ludG1lbnQuY2xpZW50cy5wdXNoKGNsaWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuICAgIFxuICAgICRzY29wZS5zYXZlQXNUZW1wbGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBhbGVydCgnTm90IGltcGxlbWVudGVkJyk7XG4gICAgfTtcbiAgICBcbiAgICAkc2NvcGUucmVwbGFjZVRlbXBsYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGFsZXJ0KCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgICB9O1xuICAgIFxuICAgICRzY29wZS5zYXZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBfc2F2ZUFwcG9pbnRtZW50KClcbiAgICAgICAgICAgIC50aGVuKCRtb2RhbEluc3RhbmNlLmNsb3NlKVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSB6Q29tbW9uVXRpbC5nZXRFcnJvck1lc3NhZ2UoZXJyKTtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIuZXJyb3IoJ1VuYWJsZSB0byBzYXZlIHJlY29yZDogJyArIG1zZyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuICAgIFxuICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRtb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xuICAgIH07XG4gICAgXG4gICAgJHNjb3BlLm9wZW5EYXRlUGlja2VyID0gZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICRzY29wZS5vcGVuZWQgPSB0cnVlO1xuICAgIH07XG4gICAgXG4gICAgJHNjb3BlLiR3YXRjaCgnYXBwb2ludG1lbnQuYXBwb2ludG1lbnRUZW1wbGF0ZScsIGZ1bmN0aW9uKG5ld1RlbXBsYXRlKSB7XG4gICAgICAgIGlmICgkc2NvcGUuaXNUZW1wbGF0ZUVkaXRlZCAmJiBuZXdUZW1wbGF0ZSAmJiBuZXdUZW1wbGF0ZS5faWQpIHtcbiAgICAgICAgICAgICRzY29wZS5pc1RlbXBsYXRlRWRpdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB6QXBwb2ludG1lbnRVdGlsLmFwcGx5QXBwb2ludG1lbnRUZW1wbGF0ZSgkc2NvcGUuYXBwb2ludG1lbnQsICRzY29wZS5yZXNvdXJjZXMsIG5ld1RlbXBsYXRlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgICRzY29wZS50ZW1wbGF0ZUNoYW5nZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLmlzVGVtcGxhdGVFZGl0ZWQgPSB0cnVlO1xuICAgIH07XG5cbiAgICAoZnVuY3Rpb24gX2xvYWREYXRhKCkge1xuICAgICAgICB2YXIgc3RhcnREYXRlID0gcGFyYW1zLnN0YXJ0RGF0ZS5sb2NhbCgpO1xuICAgICAgICBcbiAgICAgICAgLyoganNoaW50IG5ld2NhcDogZmFsc2UgKi9cbiAgICAgICAgJHNjb3BlLmFwcG9pbnRtZW50ID0gbmV3IHpBcHBvaW50bWVudCh7XG4gICAgICAgICAgICBjb2xvcjogJyMzOUNDQ0MnLFxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0RGF0ZS50b0RhdGUoKSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgICAgICAgcmVzb3VyY2VzOiBwYXJhbXMucmVzb3VyY2VzLFxuICAgICAgICAgICAgY2xpZW50czogcGFyYW1zLmNsaWVudHNcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB6QXBwb2ludG1lbnRVdGlsXG4gICAgICAgICAgICAubG9hZENvbGxlY3Rpb25zKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUucmVzb3VyY2VzID0gZGF0YS5yZXNvdXJjZXM7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNsaWVudHMgPSBkYXRhLmNsaWVudHM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHpBcHBvaW50bWVudFRlbXBsYXRlXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KHsgJ2luY2x1ZGVzW10nOiBbJ3Jlc291cmNlcyddIH0pXG4gICAgICAgICAgICAgICAgLiRwcm9taXNlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHRlbXBsYXRlcykge1xuICAgICAgICAgICAgICAgICRzY29wZS50ZW1wbGF0ZXMgPSB6QXBwb2ludG1lbnRVdGlsLnByZXBhcmVBcHBvaW50bWVudFRlbXBsYXRlcyh0ZW1wbGF0ZXMpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIuZXJyb3IoJ1VuYWJsZSB0byBsb2FkIHJlY29yZDogJyArIGVyci5kYXRhLnJlYXNvbik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfSkoKTtcbiAgICBcbiAgICBmdW5jdGlvbiBfc2F2ZUFwcG9pbnRtZW50KCkge1xuICAgICAgICBpZiAoJHNjb3BlLmFwcG9pbnRtZW50LnN0YXJ0IDwgbW9tZW50KCkudG9EYXRlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QobmV3IEVycm9yKCdDYW5cXCd0IGNyZWF0ZSBhcHBvaW50bWVudCBpbiB0aGUgcGFzdCcpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgJHNjb3BlLmlzU2F2aW5nID0gdHJ1ZTtcbiAgICAgICAgdmFyIGFwcG9pbnRtZW50Rm9yU2F2ZSA9IHpBcHBvaW50bWVudFV0aWwucHJlcGFyZUFwcG9pbnRtZW50Rm9yU2F2ZSgkc2NvcGUuYXBwb2ludG1lbnQpO1xuICAgICAgICByZXR1cm4gYXBwb2ludG1lbnRGb3JTYXZlXG4gICAgICAgICAgICAuJHNhdmUoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgek5vdGlmaWVyLm5vdGlmeSgnQXBwb2ludG1lbnQgcmVjb3JkIGNyZWF0ZWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gekFwcG9pbnRtZW50VXRpbC5wcmVwYXJlQXBwb2ludG1lbnQoYXBwb2ludG1lbnRGb3JTYXZlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdVbmFibGUgdG8gc2F2ZSBhcHBvaW50bWVudDogJyArIGVyci5kYXRhLnJlYXNvbik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzU2F2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').factory('zAppointmentUtil', ['$modal', '$q', 'zProfileImgGet', 'zClient', 'zResource', 'zAppointment', function($modal, $q, zProfileImgGet, zClient, zResource, zAppointment) {
    return {
        dateOptions: {
            formatYear: 'yy',
            startingDate: 1
        },
        tpOptions: {
            mstep: 10,
            hstep: 1,
            ismeridian: true
        },
        colorpickerOpts: {
            showPalette: true,
            palette: ['rgb(255, 0, 0)',     'rgb(0, 255, 0)',     'rgb(0, 0, 255)',
                      'rgb(176, 255, 119)', 'rgb(198, 180, 247)', 'rgb(112, 244, 220)',
                      'rgb(196, 246, 255)', 'rgb(115, 123, 244)', 'rgb(252, 176, 230)',
                      'rgb(249, 127, 137)', 'rgb(249, 201, 152)', 'rgb(252, 190, 35)',
                      'rgb(102, 198, 131)', 'rgb(255, 0, 255)'
            ]
        },
        
        // TODO: muliti-select start
        loadCollections: function() {
            var self = this;
            return $q(function(resolve, reject) {
                async.parallel([
                    function(cb) {
                        zResource.query(function(resources) {
                            cb(null, resources);
                        });
                    },
                    function(cb) {
                        zClient.query(function(clients) {
                            cb(null, clients);
                        });
                    }
                ], function(err, results) {
                    if (err) {
                        reject(err);
                    } else {
                        var resources = results[0];
                        var clients = results[1];
                        self.downloadItemPics(resources, 'resource');
                        self.downloadItemPics(clients, 'client');
                        resolve({
                            resources: resources,
                            clients: clients
                        });
                    }
                });
            });
        },
        
        selectItems: function(srcItemIds, dstItems) {
            _(dstItems)
                .filter(function(item) {
                    return _.indexOf(srcItemIds, item._id) !== -1;
                })
                .each(function(item) {
                    item.selected = true;
                })
                .value();
        },
        
        downloadItemPics: function(items, itemType) {
            _.each(items, function(item) {
                var opts = { type: itemType, size: 'small', cssClass: 'profile-small' };
                zProfileImgGet.getPicElement(item, opts, function(imgElement) {
                    item.picElem = imgElement;
                });
            });
        },
        // TODO: muliti-select end
        
        prepareAppointmentTemplates: function(templates) {
            _.each(templates, function(at) {
                at.resourceNames = _.pluck(at.resources, 'name').join(', ');
            });
            return templates;
        },
        
        prepareResources: function(resources) {
            return _.pluck(resources, '_id');
        },
        
        prepareClients: function(clients) {
            return _.pluck(clients, '_id');
        },
        
        prepareAppointment: function(appointment) {
            appointment.id = appointment._id;
            appointment.title = appointment.appointmentTypeName;
            _.each(appointment.clients, function(client) {
                client.name = zClient.getName(client);
            });
            return appointment;
        },
        
        prepareAppointmentForSave: function(orgiAppointment) {
            /* jshint newcap: false */
            var appointment = new zAppointment(orgiAppointment);
            if (appointment.appointmentTemplate) {
                appointment.appointmentTemplate = appointment.appointmentTemplate._id;
            }
            appointment.resources = _.pluck(orgiAppointment.selectedResources, '_id');
            appointment.clients = _.pluck(orgiAppointment.selectedClients, '_id');
            return appointment;
        },
        
        prepareAppointmentForSaveDates: function(orgiAppointment) {
            /* jshint newcap: false */
            var appointment = new zAppointment(orgiAppointment);
            if (!appointment.end) {
                appointment.end = moment(appointment.start).add(appointment.duration, 'minutes');
            }
            appointment.start = appointment.start.local();
            appointment.end = appointment.end.local();
            return appointment;
        },
        
        applyAppointmentTemplate: function(appointment, resources, template) {
            appointment.appointmentTypeName = template.name;
            appointment.color = template.color;
            appointment.textColor = template.textColor;
            appointment.duration = template.duration;
            this.selectItems(_.pluck(template.resources, '_id'), resources);
        },
        
        createClient: function() {
            return $modal.open({
                templateUrl: 'views/dashboard/clients/client-new-dialog.html',
                controller: 'zClientNewDialogCtrl'
            })
            .result;
        }
    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvekFwcG9pbnRtZW50VXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxRQUFRLCtGQUFvQixTQUFTLFFBQVEsSUFBSSxnQkFBZ0IsU0FBUyxXQUFXLGNBQWM7SUFDckgsT0FBTztRQUNILGFBQWE7WUFDVCxZQUFZO1lBQ1osY0FBYzs7UUFFbEIsV0FBVztZQUNQLE9BQU87WUFDUCxPQUFPO1lBQ1AsWUFBWTs7UUFFaEIsaUJBQWlCO1lBQ2IsYUFBYTtZQUNiLFNBQVMsQ0FBQyxzQkFBc0Isc0JBQXNCO3NCQUM1QyxzQkFBc0Isc0JBQXNCO3NCQUM1QyxzQkFBc0Isc0JBQXNCO3NCQUM1QyxzQkFBc0Isc0JBQXNCO3NCQUM1QyxzQkFBc0I7Ozs7O1FBS3BDLGlCQUFpQixXQUFXO1lBQ3hCLElBQUksT0FBTztZQUNYLE9BQU8sR0FBRyxTQUFTLFNBQVMsUUFBUTtnQkFDaEMsTUFBTSxTQUFTO29CQUNYLFNBQVMsSUFBSTt3QkFDVCxVQUFVLE1BQU0sU0FBUyxXQUFXOzRCQUNoQyxHQUFHLE1BQU07OztvQkFHakIsU0FBUyxJQUFJO3dCQUNULFFBQVEsTUFBTSxTQUFTLFNBQVM7NEJBQzVCLEdBQUcsTUFBTTs7O21CQUdsQixTQUFTLEtBQUssU0FBUztvQkFDdEIsSUFBSSxLQUFLO3dCQUNMLE9BQU87MkJBQ0o7d0JBQ0gsSUFBSSxZQUFZLFFBQVE7d0JBQ3hCLElBQUksVUFBVSxRQUFRO3dCQUN0QixLQUFLLGlCQUFpQixXQUFXO3dCQUNqQyxLQUFLLGlCQUFpQixTQUFTO3dCQUMvQixRQUFROzRCQUNKLFdBQVc7NEJBQ1gsU0FBUzs7Ozs7OztRQU83QixhQUFhLFNBQVMsWUFBWSxVQUFVO1lBQ3hDLEVBQUU7aUJBQ0csT0FBTyxTQUFTLE1BQU07b0JBQ25CLE9BQU8sRUFBRSxRQUFRLFlBQVksS0FBSyxTQUFTLENBQUM7O2lCQUUvQyxLQUFLLFNBQVMsTUFBTTtvQkFDakIsS0FBSyxXQUFXOztpQkFFbkI7OztRQUdULGtCQUFrQixTQUFTLE9BQU8sVUFBVTtZQUN4QyxFQUFFLEtBQUssT0FBTyxTQUFTLE1BQU07Z0JBQ3pCLElBQUksT0FBTyxFQUFFLE1BQU0sVUFBVSxNQUFNLFNBQVMsVUFBVTtnQkFDdEQsZUFBZSxjQUFjLE1BQU0sTUFBTSxTQUFTLFlBQVk7b0JBQzFELEtBQUssVUFBVTs7Ozs7O1FBTTNCLDZCQUE2QixTQUFTLFdBQVc7WUFDN0MsRUFBRSxLQUFLLFdBQVcsU0FBUyxJQUFJO2dCQUMzQixHQUFHLGdCQUFnQixFQUFFLE1BQU0sR0FBRyxXQUFXLFFBQVEsS0FBSzs7WUFFMUQsT0FBTzs7O1FBR1gsa0JBQWtCLFNBQVMsV0FBVztZQUNsQyxPQUFPLEVBQUUsTUFBTSxXQUFXOzs7UUFHOUIsZ0JBQWdCLFNBQVMsU0FBUztZQUM5QixPQUFPLEVBQUUsTUFBTSxTQUFTOzs7UUFHNUIsb0JBQW9CLFNBQVMsYUFBYTtZQUN0QyxZQUFZLEtBQUssWUFBWTtZQUM3QixZQUFZLFFBQVEsWUFBWTtZQUNoQyxFQUFFLEtBQUssWUFBWSxTQUFTLFNBQVMsUUFBUTtnQkFDekMsT0FBTyxPQUFPLFFBQVEsUUFBUTs7WUFFbEMsT0FBTzs7O1FBR1gsMkJBQTJCLFNBQVMsaUJBQWlCOztZQUVqRCxJQUFJLGNBQWMsSUFBSSxhQUFhO1lBQ25DLElBQUksWUFBWSxxQkFBcUI7Z0JBQ2pDLFlBQVksc0JBQXNCLFlBQVksb0JBQW9COztZQUV0RSxZQUFZLFlBQVksRUFBRSxNQUFNLGdCQUFnQixtQkFBbUI7WUFDbkUsWUFBWSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsaUJBQWlCO1lBQy9ELE9BQU87OztRQUdYLGdDQUFnQyxTQUFTLGlCQUFpQjs7WUFFdEQsSUFBSSxjQUFjLElBQUksYUFBYTtZQUNuQyxJQUFJLENBQUMsWUFBWSxLQUFLO2dCQUNsQixZQUFZLE1BQU0sT0FBTyxZQUFZLE9BQU8sSUFBSSxZQUFZLFVBQVU7O1lBRTFFLFlBQVksUUFBUSxZQUFZLE1BQU07WUFDdEMsWUFBWSxNQUFNLFlBQVksSUFBSTtZQUNsQyxPQUFPOzs7UUFHWCwwQkFBMEIsU0FBUyxhQUFhLFdBQVcsVUFBVTtZQUNqRSxZQUFZLHNCQUFzQixTQUFTO1lBQzNDLFlBQVksUUFBUSxTQUFTO1lBQzdCLFlBQVksWUFBWSxTQUFTO1lBQ2pDLFlBQVksV0FBVyxTQUFTO1lBQ2hDLEtBQUssWUFBWSxFQUFFLE1BQU0sU0FBUyxXQUFXLFFBQVE7OztRQUd6RCxjQUFjLFdBQVc7WUFDckIsT0FBTyxPQUFPLEtBQUs7Z0JBQ2YsYUFBYTtnQkFDYixZQUFZOzthQUVmOzs7O0FBSWIiLCJmaWxlIjoiY29udHJvbGxlcnMvZGFzaGJvYXJkL2FwcG9pbnRtZW50cy96QXBwb2ludG1lbnRVdGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ3pBcHBvaW50bWVudFV0aWwnLCBmdW5jdGlvbigkbW9kYWwsICRxLCB6UHJvZmlsZUltZ0dldCwgekNsaWVudCwgelJlc291cmNlLCB6QXBwb2ludG1lbnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBkYXRlT3B0aW9uczoge1xuICAgICAgICAgICAgZm9ybWF0WWVhcjogJ3l5JyxcbiAgICAgICAgICAgIHN0YXJ0aW5nRGF0ZTogMVxuICAgICAgICB9LFxuICAgICAgICB0cE9wdGlvbnM6IHtcbiAgICAgICAgICAgIG1zdGVwOiAxMCxcbiAgICAgICAgICAgIGhzdGVwOiAxLFxuICAgICAgICAgICAgaXNtZXJpZGlhbjogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBjb2xvcnBpY2tlck9wdHM6IHtcbiAgICAgICAgICAgIHNob3dQYWxldHRlOiB0cnVlLFxuICAgICAgICAgICAgcGFsZXR0ZTogWydyZ2IoMjU1LCAwLCAwKScsICAgICAncmdiKDAsIDI1NSwgMCknLCAgICAgJ3JnYigwLCAwLCAyNTUpJyxcbiAgICAgICAgICAgICAgICAgICAgICAncmdiKDE3NiwgMjU1LCAxMTkpJywgJ3JnYigxOTgsIDE4MCwgMjQ3KScsICdyZ2IoMTEyLCAyNDQsIDIyMCknLFxuICAgICAgICAgICAgICAgICAgICAgICdyZ2IoMTk2LCAyNDYsIDI1NSknLCAncmdiKDExNSwgMTIzLCAyNDQpJywgJ3JnYigyNTIsIDE3NiwgMjMwKScsXG4gICAgICAgICAgICAgICAgICAgICAgJ3JnYigyNDksIDEyNywgMTM3KScsICdyZ2IoMjQ5LCAyMDEsIDE1MiknLCAncmdiKDI1MiwgMTkwLCAzNSknLFxuICAgICAgICAgICAgICAgICAgICAgICdyZ2IoMTAyLCAxOTgsIDEzMSknLCAncmdiKDI1NSwgMCwgMjU1KSdcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIC8vIFRPRE86IG11bGl0aS1zZWxlY3Qgc3RhcnRcbiAgICAgICAgbG9hZENvbGxlY3Rpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiAkcShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBhc3luYy5wYXJhbGxlbChbXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB6UmVzb3VyY2UucXVlcnkoZnVuY3Rpb24ocmVzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IobnVsbCwgcmVzb3VyY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihjYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgekNsaWVudC5xdWVyeShmdW5jdGlvbihjbGllbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IobnVsbCwgY2xpZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXNvdXJjZXMgPSByZXN1bHRzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsaWVudHMgPSByZXN1bHRzWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kb3dubG9hZEl0ZW1QaWNzKHJlc291cmNlcywgJ3Jlc291cmNlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRvd25sb2FkSXRlbVBpY3MoY2xpZW50cywgJ2NsaWVudCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VzOiByZXNvdXJjZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50czogY2xpZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgc2VsZWN0SXRlbXM6IGZ1bmN0aW9uKHNyY0l0ZW1JZHMsIGRzdEl0ZW1zKSB7XG4gICAgICAgICAgICBfKGRzdEl0ZW1zKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXy5pbmRleE9mKHNyY0l0ZW1JZHMsIGl0ZW0uX2lkKSAhPT0gLTE7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnZhbHVlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBkb3dubG9hZEl0ZW1QaWNzOiBmdW5jdGlvbihpdGVtcywgaXRlbVR5cGUpIHtcbiAgICAgICAgICAgIF8uZWFjaChpdGVtcywgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIHZhciBvcHRzID0geyB0eXBlOiBpdGVtVHlwZSwgc2l6ZTogJ3NtYWxsJywgY3NzQ2xhc3M6ICdwcm9maWxlLXNtYWxsJyB9O1xuICAgICAgICAgICAgICAgIHpQcm9maWxlSW1nR2V0LmdldFBpY0VsZW1lbnQoaXRlbSwgb3B0cywgZnVuY3Rpb24oaW1nRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnBpY0VsZW0gPSBpbWdFbGVtZW50O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIC8vIFRPRE86IG11bGl0aS1zZWxlY3QgZW5kXG4gICAgICAgIFxuICAgICAgICBwcmVwYXJlQXBwb2ludG1lbnRUZW1wbGF0ZXM6IGZ1bmN0aW9uKHRlbXBsYXRlcykge1xuICAgICAgICAgICAgXy5lYWNoKHRlbXBsYXRlcywgZnVuY3Rpb24oYXQpIHtcbiAgICAgICAgICAgICAgICBhdC5yZXNvdXJjZU5hbWVzID0gXy5wbHVjayhhdC5yZXNvdXJjZXMsICduYW1lJykuam9pbignLCAnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlcztcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIHByZXBhcmVSZXNvdXJjZXM6IGZ1bmN0aW9uKHJlc291cmNlcykge1xuICAgICAgICAgICAgcmV0dXJuIF8ucGx1Y2socmVzb3VyY2VzLCAnX2lkJyk7XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBwcmVwYXJlQ2xpZW50czogZnVuY3Rpb24oY2xpZW50cykge1xuICAgICAgICAgICAgcmV0dXJuIF8ucGx1Y2soY2xpZW50cywgJ19pZCcpO1xuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgcHJlcGFyZUFwcG9pbnRtZW50OiBmdW5jdGlvbihhcHBvaW50bWVudCkge1xuICAgICAgICAgICAgYXBwb2ludG1lbnQuaWQgPSBhcHBvaW50bWVudC5faWQ7XG4gICAgICAgICAgICBhcHBvaW50bWVudC50aXRsZSA9IGFwcG9pbnRtZW50LmFwcG9pbnRtZW50VHlwZU5hbWU7XG4gICAgICAgICAgICBfLmVhY2goYXBwb2ludG1lbnQuY2xpZW50cywgZnVuY3Rpb24oY2xpZW50KSB7XG4gICAgICAgICAgICAgICAgY2xpZW50Lm5hbWUgPSB6Q2xpZW50LmdldE5hbWUoY2xpZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGFwcG9pbnRtZW50O1xuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgcHJlcGFyZUFwcG9pbnRtZW50Rm9yU2F2ZTogZnVuY3Rpb24ob3JnaUFwcG9pbnRtZW50KSB7XG4gICAgICAgICAgICAvKiBqc2hpbnQgbmV3Y2FwOiBmYWxzZSAqL1xuICAgICAgICAgICAgdmFyIGFwcG9pbnRtZW50ID0gbmV3IHpBcHBvaW50bWVudChvcmdpQXBwb2ludG1lbnQpO1xuICAgICAgICAgICAgaWYgKGFwcG9pbnRtZW50LmFwcG9pbnRtZW50VGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICBhcHBvaW50bWVudC5hcHBvaW50bWVudFRlbXBsYXRlID0gYXBwb2ludG1lbnQuYXBwb2ludG1lbnRUZW1wbGF0ZS5faWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhcHBvaW50bWVudC5yZXNvdXJjZXMgPSBfLnBsdWNrKG9yZ2lBcHBvaW50bWVudC5zZWxlY3RlZFJlc291cmNlcywgJ19pZCcpO1xuICAgICAgICAgICAgYXBwb2ludG1lbnQuY2xpZW50cyA9IF8ucGx1Y2sob3JnaUFwcG9pbnRtZW50LnNlbGVjdGVkQ2xpZW50cywgJ19pZCcpO1xuICAgICAgICAgICAgcmV0dXJuIGFwcG9pbnRtZW50O1xuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgcHJlcGFyZUFwcG9pbnRtZW50Rm9yU2F2ZURhdGVzOiBmdW5jdGlvbihvcmdpQXBwb2ludG1lbnQpIHtcbiAgICAgICAgICAgIC8qIGpzaGludCBuZXdjYXA6IGZhbHNlICovXG4gICAgICAgICAgICB2YXIgYXBwb2ludG1lbnQgPSBuZXcgekFwcG9pbnRtZW50KG9yZ2lBcHBvaW50bWVudCk7XG4gICAgICAgICAgICBpZiAoIWFwcG9pbnRtZW50LmVuZCkge1xuICAgICAgICAgICAgICAgIGFwcG9pbnRtZW50LmVuZCA9IG1vbWVudChhcHBvaW50bWVudC5zdGFydCkuYWRkKGFwcG9pbnRtZW50LmR1cmF0aW9uLCAnbWludXRlcycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXBwb2ludG1lbnQuc3RhcnQgPSBhcHBvaW50bWVudC5zdGFydC5sb2NhbCgpO1xuICAgICAgICAgICAgYXBwb2ludG1lbnQuZW5kID0gYXBwb2ludG1lbnQuZW5kLmxvY2FsKCk7XG4gICAgICAgICAgICByZXR1cm4gYXBwb2ludG1lbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBhcHBseUFwcG9pbnRtZW50VGVtcGxhdGU6IGZ1bmN0aW9uKGFwcG9pbnRtZW50LCByZXNvdXJjZXMsIHRlbXBsYXRlKSB7XG4gICAgICAgICAgICBhcHBvaW50bWVudC5hcHBvaW50bWVudFR5cGVOYW1lID0gdGVtcGxhdGUubmFtZTtcbiAgICAgICAgICAgIGFwcG9pbnRtZW50LmNvbG9yID0gdGVtcGxhdGUuY29sb3I7XG4gICAgICAgICAgICBhcHBvaW50bWVudC50ZXh0Q29sb3IgPSB0ZW1wbGF0ZS50ZXh0Q29sb3I7XG4gICAgICAgICAgICBhcHBvaW50bWVudC5kdXJhdGlvbiA9IHRlbXBsYXRlLmR1cmF0aW9uO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtcyhfLnBsdWNrKHRlbXBsYXRlLnJlc291cmNlcywgJ19pZCcpLCByZXNvdXJjZXMpO1xuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgY3JlYXRlQ2xpZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkbW9kYWwub3Blbih7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9kYXNoYm9hcmQvY2xpZW50cy9jbGllbnQtbmV3LWRpYWxvZy5odG1sJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnekNsaWVudE5ld0RpYWxvZ0N0cmwnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnJlc3VsdDtcbiAgICAgICAgfVxuICAgIH07XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').controller('zAppointmentsCtrl', ['$scope', '$http', '$routeParams', '$location', '$interval', '$modal', 'zProfileImgGet', 'uiCalendarConfig', 'zAppointmentUtil', 'zNotifier', 'zClient', 'zResource', 'zAppointment', function(
    $scope, $http, $routeParams, $location, $interval, $modal, zProfileImgGet,
    uiCalendarConfig, zAppointmentUtil, zNotifier, zClient, zResource, zAppointment) {
    /* jshint maxstatements: false */
    
    var _lastQuery;
    var _lastLoadedEvents;
    var _currentScrolY;
    var _preselectedResources;
    var _preselectedClients;
    
    var states = {
        ready: 0,
        loading: 1,
        error: 2
    };
    $scope.currentState = states.loading;
    $scope.clients = [];
    $scope.resources = [];
    $scope.filter = {
        clients: [],
        resources: []
    };
    $scope.uiConfig = {
        calendar: {
            header: {
                left: 'month,agendaWeek,agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            editable: true,
            eventLimit: true,
            slotDuration: '00:30:00',
            slotEventOverlap: false,
            eventRender: _eventRender,
            eventClick: _previewAppointment,
            dayClick: _createAppointment,
            eventDrop: function(event, delta, revertFunc) {
                _saveEdit(event, revertFunc);
            },
            eventResize: function(event, delta, revertFunc) {
                _saveEdit(event, revertFunc);
            }
        }
    };
    
    $scope.changeResourcesFilter = function() {
        setTimeout(function() {
            uiCalendarConfig.calendars.myCalendar.fullCalendar('refetchEvents');
        }, 0);
    };
    
    $scope.changeClientsFilter = function() {
        setTimeout(function() {
            uiCalendarConfig.calendars.myCalendar.fullCalendar('refetchEvents');
        }, 0);
    };
    
    $scope.saveAsDefault = function() {
        $modal.open({
            templateUrl: 'views/common/confirmation-dialog.html',
            controller: 'zModalCtrl',
            resolve: {
                items: function() {
                    return {
                        title: 'Save as default',
                        message: 'Save current appointments settings as default?'
                    };
                }
            }
        })
        .result
        .then(function() {
            _saveFilters();
        });
    };
    
    function _loadCollections() {
        zAppointmentUtil
            .loadCollections()
            .then(function(data) {
                $scope.resources = data.resources;
                $scope.clients = data.clients;
                _initFiltersCollection(data.resources, _preselectedResources);
                _initFiltersCollection(data.clients, _preselectedClients);
                setTimeout(function() {
                    $scope.currentState = states.ready;
                    uiCalendarConfig.calendars.myCalendar.fullCalendar('refetchEvents');
                }, 0);
            });
            // TODO: error
    }
    
    var eventsF = function(start, end, timezone, callback) {
        console.log('AAA', $scope.currentState)
        if ($scope.currentState !== states.ready) {
            return;
        }
        
        var query = {
            start: start.toISOString(),
            end: end.toISOString()
        };
        if ($scope.filter.resources.length > 0) {
            query['resources[]'] = _.pluck($scope.filter.resources, '_id');
        }
        if ($scope.filter.clients.length > 0) {
            query['clients[]'] = _.pluck($scope.filter.clients, '_id');
        }
        // TODO: why?
        query['includes[]'] = ['resources'];
        
        if (_.isEqual(query, _lastQuery)) {
            return callback(_lastLoadedEvents);
        }
        _lastQuery = query;
        
        $scope.currentState = states.loading;
        zAppointment
            .query(query)
            .$promise
            .then(function(appointments) {
                _lastLoadedEvents = _.map(appointments, zAppointmentUtil.prepareAppointment);
                return appointments;
            })
            .then(function(appointments) {
                /*var minDuration = _getMinResourceAppointmentInterval(appointments);
                if (minDuration >= 10) {
                    // TODO: improve
                    var currentView = _getCurrentView();
                    $scope.uiConfig.calendar.slotDuration = moment.duration(minDuration, 'm');
                    setTimeout(function() {
                        _setCurrentView(currentView);
                    }, 0);
                }*/
                return appointments;
            })
            .then(function() {
                callback(_lastLoadedEvents);
                $scope.currentState = states.ready;
            })
            .catch(function(err) {
                zNotifier.error('Unable to load appointments: ' + err.data.reason);
                // TODO $scope.states.isReady = false;
                $scope.currentState = states.error;
            });
    };
    $scope.eventSources = [eventsF];
    
    function _eventRender(event, element) {
        // TODO: use $scope.clients.pics
        function downloadClientPic(clientId, cb) {
            var client = _.find($scope.clients, { _id: clientId });
            client = client || { name: 'unknown' };
            
            var opts = { type: 'client', size: 'small', cssClass: 'profile-small' };
            zProfileImgGet.getPicElement(client, opts, function(imgElement) {
                cb(client, imgElement);
            });
        }
        
        function showAllClients() {
            _.each(event.clients, function(clientId) {
                downloadClientPic(clientId, function(foundClinet, imgElement) {
                    element.find('.fc-content').append(imgElement + '<span>' + foundClinet.name + '</span>');
                });
            });
        }
        
        function showFirstClient() {
            var eventHtml = '<div class="pic" /><div class="title" />';
            var $eventEl = element.find('.fc-content').html(eventHtml);
            $eventEl.find('.title').html('<p><span class="time">' + event.start.format('h:mm a') + ' <span>' + event.title + '</span></p>');
            
            var firstClientId = event.clients[0];
            if (firstClientId) {
                downloadClientPic(firstClientId, function(foundClinet, imgElement) {
                    var clientHtml = foundClinet.name;
                    var otherClientsCount = event.clients.length - 1;
                    if (otherClientsCount === 1) {
                        clientHtml += ' + ' + otherClientsCount + ' other';
                    } else if (otherClientsCount > 1) {
                        clientHtml += ' + ' + otherClientsCount + ' others';
                    }
                    $eventEl.find('.pic').append(imgElement);
                    $eventEl.find('.title').append('<p>' + clientHtml + '</p>');
                });
            }
        }
        
        if (_getCurrentView() === 'agendaDay') {
            showAllClients();
        } else {
            showFirstClient();
        }
    }
    
    function _getCurrentView() {
        return uiCalendarConfig.calendars.myCalendar.fullCalendar('getView').name;
    }
    
    function _setCurrentView(viewName) {
        uiCalendarConfig.calendars.myCalendar.fullCalendar('changeView', viewName);
    }
    
    function _rememberScrollYPos() {
        _currentScrolY = $(window).scrollTop();
    }
    
    function _restoreScrollYPos() {
        $(window).scrollTop(_currentScrolY);
    }
    
    function _getMinResourceAppointmentInterval(appointments) {
        return _(appointments).pluck('resources').flatten().pluck('appointmentInterval').min();
    }
    
    function _initFiltersCollection(collection, preselected) {
        _(collection)
            .filter(function(obj) {
                return _.indexOf(preselected, obj._id) !== -1;
            })
            .each(function(obj) {
                obj.selected = true;
            })
            .value();
    }
    
    function _loadFilters() {
        if ($routeParams.clientId) {
            _preselectedClients = [$routeParams.clientId];
        }
        
        var appointments = $.cookie('appointments');
        if (appointments) {
            if (appointments.filters) {
                _preselectedResources = appointments.filters.resources;
                _preselectedClients = appointments.filters.clients;
            }
            if (appointments.currentView) {
                setTimeout(function() {
                    _setCurrentView(appointments.currentView);
                }, 0);
            }
        }
    }
    
    function _saveFilters() {
        var appointments = {
            filters: {
                resources: _.pluck($scope.filter.resources, '_id'),
                clients: _.pluck($scope.filter.clients, '_id')
            },
            currentView: uiCalendarConfig.calendars.myCalendar.fullCalendar('getView').name
        };
        $.cookie('appointments', appointments, { expires: 365, path: '/' });
    }
    
    function _downloadNewClients(clients) {
        var newClients = _.difference($scope.clients, clients);
        //if (newClients.length === 0) { TODO
            return;
        //}
        
        return zClient
            .query({ 'in[]': newClients }).$promise
            .then(function(clients) {
                $scope.clients = $scope.clients.concat(clients);
            });
    }
    
    function _previewAppointment(appointment) {
        _rememberScrollYPos();
        
        $modal.open({
            templateUrl: 'views/dashboard/appointments/appointment-details-dialog.html',
            controller: 'zAppointmentDetailsDialogCtrl',
            resolve: {
                params: function() {
                    return appointment;
                }
            }
        })
        .result
        .then(function(ret) {
            if (ret && ret.filter) {
                if (ret.filter.resource) {
                    $scope.filter.resources = [ret.filter.resource._id];
                }
                if (ret.filter.client) {
                    $scope.filter.clients = [ret.filter.client._id];
                }
            } else {
                return _editAppointment(appointment);
            }
        })
        .finally(_restoreScrollYPos);
    }
    
    function _createAppointment(date) {
        _rememberScrollYPos();
        
        var createdAppointment;
        $modal.open({
            templateUrl: 'views/dashboard/appointments/appointment-new-dialog.html',
            controller: 'zAppointmentNewDialogCtrl',
            resolve: {
                params: function() {
                    return {
                        startDate: date,
                        resources: $scope.filter.resources,
                        clients: $scope.filter.clients
                    };
                }
            }
        })
        .result
        .then(function(app) {
            createdAppointment = app;
            return _downloadNewClients(createdAppointment.clients);
        })
        .then(function() {
            uiCalendarConfig.calendars.myCalendar.fullCalendar('renderEvent', createdAppointment);
        })
        .finally(_restoreScrollYPos);
    }
    
    function _editAppointment(appointment) {
        var updatedAppointment;
        return $modal.open({
            templateUrl: 'views/dashboard/appointments/appointment-edit-dialog.html',
            controller: 'zAppointmentEditDialogCtrl',
            resolve: {
                params: function() {
                    return appointment;
                }
            }
        })
        .result
        .then(function(app) {
            updatedAppointment = app;
            return _downloadNewClients(updatedAppointment.clients);
        })
        .then(function() {
            appointment.title = updatedAppointment.title;
            appointment.start = moment(updatedAppointment.start);
            appointment.end = moment(updatedAppointment.end);
            appointment.color = updatedAppointment.color;
            appointment.clients = updatedAppointment.clients;
            appointment.resources = updatedAppointment.resources;
            uiCalendarConfig.calendars.myCalendar.fullCalendar('updateEvent', appointment);
        });
    }
    
    function _saveEdit(appointment, revertFunc) {
        var appointmentForSave = zAppointmentUtil.prepareAppointmentForSaveDates(appointment);
        appointmentForSave
            .$updateDates()
            .then(function() {
                zNotifier.notify('Appointment record updated');
            })
            .catch(function(err) {
                zNotifier.error('Unable to save appointment: ' + err.data.reason);
                revertFunc();
            });
    }
    
    _loadCollections();
    _loadFilters();
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvekFwcG9pbnRtZW50c0N0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sV0FBVyw0TUFBcUI7SUFDbEQsUUFBUSxPQUFPLGNBQWMsV0FBVyxXQUFXLFFBQVE7SUFDM0Qsa0JBQWtCLGtCQUFrQixXQUFXLFNBQVMsV0FBVyxjQUFjOzs7SUFHakYsSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7O0lBRUosSUFBSSxTQUFTO1FBQ1QsT0FBTztRQUNQLFNBQVM7UUFDVCxPQUFPOztJQUVYLE9BQU8sZUFBZSxPQUFPO0lBQzdCLE9BQU8sVUFBVTtJQUNqQixPQUFPLFlBQVk7SUFDbkIsT0FBTyxTQUFTO1FBQ1osU0FBUztRQUNULFdBQVc7O0lBRWYsT0FBTyxXQUFXO1FBQ2QsVUFBVTtZQUNOLFFBQVE7Z0JBQ0osTUFBTTtnQkFDTixRQUFRO2dCQUNSLE9BQU87O1lBRVgsVUFBVTtZQUNWLFlBQVk7WUFDWixjQUFjO1lBQ2Qsa0JBQWtCO1lBQ2xCLGFBQWE7WUFDYixZQUFZO1lBQ1osVUFBVTtZQUNWLFdBQVcsU0FBUyxPQUFPLE9BQU8sWUFBWTtnQkFDMUMsVUFBVSxPQUFPOztZQUVyQixhQUFhLFNBQVMsT0FBTyxPQUFPLFlBQVk7Z0JBQzVDLFVBQVUsT0FBTzs7Ozs7SUFLN0IsT0FBTyx3QkFBd0IsV0FBVztRQUN0QyxXQUFXLFdBQVc7WUFDbEIsaUJBQWlCLFVBQVUsV0FBVyxhQUFhO1dBQ3BEOzs7SUFHUCxPQUFPLHNCQUFzQixXQUFXO1FBQ3BDLFdBQVcsV0FBVztZQUNsQixpQkFBaUIsVUFBVSxXQUFXLGFBQWE7V0FDcEQ7OztJQUdQLE9BQU8sZ0JBQWdCLFdBQVc7UUFDOUIsT0FBTyxLQUFLO1lBQ1IsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTO2dCQUNMLE9BQU8sV0FBVztvQkFDZCxPQUFPO3dCQUNILE9BQU87d0JBQ1AsU0FBUzs7Ozs7U0FLeEI7U0FDQSxLQUFLLFdBQVc7WUFDYjs7OztJQUlSLFNBQVMsbUJBQW1CO1FBQ3hCO2FBQ0s7YUFDQSxLQUFLLFNBQVMsTUFBTTtnQkFDakIsT0FBTyxZQUFZLEtBQUs7Z0JBQ3hCLE9BQU8sVUFBVSxLQUFLO2dCQUN0Qix1QkFBdUIsS0FBSyxXQUFXO2dCQUN2Qyx1QkFBdUIsS0FBSyxTQUFTO2dCQUNyQyxXQUFXLFdBQVc7b0JBQ2xCLE9BQU8sZUFBZSxPQUFPO29CQUM3QixpQkFBaUIsVUFBVSxXQUFXLGFBQWE7bUJBQ3BEOzs7OztJQUtmLElBQUksVUFBVSxTQUFTLE9BQU8sS0FBSyxVQUFVLFVBQVU7UUFDbkQsUUFBUSxJQUFJLE9BQU8sT0FBTztRQUMxQixJQUFJLE9BQU8saUJBQWlCLE9BQU8sT0FBTztZQUN0Qzs7O1FBR0osSUFBSSxRQUFRO1lBQ1IsT0FBTyxNQUFNO1lBQ2IsS0FBSyxJQUFJOztRQUViLElBQUksT0FBTyxPQUFPLFVBQVUsU0FBUyxHQUFHO1lBQ3BDLE1BQU0saUJBQWlCLEVBQUUsTUFBTSxPQUFPLE9BQU8sV0FBVzs7UUFFNUQsSUFBSSxPQUFPLE9BQU8sUUFBUSxTQUFTLEdBQUc7WUFDbEMsTUFBTSxlQUFlLEVBQUUsTUFBTSxPQUFPLE9BQU8sU0FBUzs7O1FBR3hELE1BQU0sZ0JBQWdCLENBQUM7O1FBRXZCLElBQUksRUFBRSxRQUFRLE9BQU8sYUFBYTtZQUM5QixPQUFPLFNBQVM7O1FBRXBCLGFBQWE7O1FBRWIsT0FBTyxlQUFlLE9BQU87UUFDN0I7YUFDSyxNQUFNO2FBQ047YUFDQSxLQUFLLFNBQVMsY0FBYztnQkFDekIsb0JBQW9CLEVBQUUsSUFBSSxjQUFjLGlCQUFpQjtnQkFDekQsT0FBTzs7YUFFVixLQUFLLFNBQVMsY0FBYzs7Ozs7Ozs7OztnQkFVekIsT0FBTzs7YUFFVixLQUFLLFdBQVc7Z0JBQ2IsU0FBUztnQkFDVCxPQUFPLGVBQWUsT0FBTzs7YUFFaEMsTUFBTSxTQUFTLEtBQUs7Z0JBQ2pCLFVBQVUsTUFBTSxrQ0FBa0MsSUFBSSxLQUFLOztnQkFFM0QsT0FBTyxlQUFlLE9BQU87OztJQUd6QyxPQUFPLGVBQWUsQ0FBQzs7SUFFdkIsU0FBUyxhQUFhLE9BQU8sU0FBUzs7UUFFbEMsU0FBUyxrQkFBa0IsVUFBVSxJQUFJO1lBQ3JDLElBQUksU0FBUyxFQUFFLEtBQUssT0FBTyxTQUFTLEVBQUUsS0FBSztZQUMzQyxTQUFTLFVBQVUsRUFBRSxNQUFNOztZQUUzQixJQUFJLE9BQU8sRUFBRSxNQUFNLFVBQVUsTUFBTSxTQUFTLFVBQVU7WUFDdEQsZUFBZSxjQUFjLFFBQVEsTUFBTSxTQUFTLFlBQVk7Z0JBQzVELEdBQUcsUUFBUTs7OztRQUluQixTQUFTLGlCQUFpQjtZQUN0QixFQUFFLEtBQUssTUFBTSxTQUFTLFNBQVMsVUFBVTtnQkFDckMsa0JBQWtCLFVBQVUsU0FBUyxhQUFhLFlBQVk7b0JBQzFELFFBQVEsS0FBSyxlQUFlLE9BQU8sYUFBYSxXQUFXLFlBQVksT0FBTzs7Ozs7UUFLMUYsU0FBUyxrQkFBa0I7WUFDdkIsSUFBSSxZQUFZO1lBQ2hCLElBQUksV0FBVyxRQUFRLEtBQUssZUFBZSxLQUFLO1lBQ2hELFNBQVMsS0FBSyxVQUFVLEtBQUssMkJBQTJCLE1BQU0sTUFBTSxPQUFPLFlBQVksWUFBWSxNQUFNLFFBQVE7O1lBRWpILElBQUksZ0JBQWdCLE1BQU0sUUFBUTtZQUNsQyxJQUFJLGVBQWU7Z0JBQ2Ysa0JBQWtCLGVBQWUsU0FBUyxhQUFhLFlBQVk7b0JBQy9ELElBQUksYUFBYSxZQUFZO29CQUM3QixJQUFJLG9CQUFvQixNQUFNLFFBQVEsU0FBUztvQkFDL0MsSUFBSSxzQkFBc0IsR0FBRzt3QkFDekIsY0FBYyxRQUFRLG9CQUFvQjsyQkFDdkMsSUFBSSxvQkFBb0IsR0FBRzt3QkFDOUIsY0FBYyxRQUFRLG9CQUFvQjs7b0JBRTlDLFNBQVMsS0FBSyxRQUFRLE9BQU87b0JBQzdCLFNBQVMsS0FBSyxVQUFVLE9BQU8sUUFBUSxhQUFhOzs7OztRQUtoRSxJQUFJLHNCQUFzQixhQUFhO1lBQ25DO2VBQ0c7WUFDSDs7OztJQUlSLFNBQVMsa0JBQWtCO1FBQ3ZCLE9BQU8saUJBQWlCLFVBQVUsV0FBVyxhQUFhLFdBQVc7OztJQUd6RSxTQUFTLGdCQUFnQixVQUFVO1FBQy9CLGlCQUFpQixVQUFVLFdBQVcsYUFBYSxjQUFjOzs7SUFHckUsU0FBUyxzQkFBc0I7UUFDM0IsaUJBQWlCLEVBQUUsUUFBUTs7O0lBRy9CLFNBQVMscUJBQXFCO1FBQzFCLEVBQUUsUUFBUSxVQUFVOzs7SUFHeEIsU0FBUyxtQ0FBbUMsY0FBYztRQUN0RCxPQUFPLEVBQUUsY0FBYyxNQUFNLGFBQWEsVUFBVSxNQUFNLHVCQUF1Qjs7O0lBR3JGLFNBQVMsdUJBQXVCLFlBQVksYUFBYTtRQUNyRCxFQUFFO2FBQ0csT0FBTyxTQUFTLEtBQUs7Z0JBQ2xCLE9BQU8sRUFBRSxRQUFRLGFBQWEsSUFBSSxTQUFTLENBQUM7O2FBRS9DLEtBQUssU0FBUyxLQUFLO2dCQUNoQixJQUFJLFdBQVc7O2FBRWxCOzs7SUFHVCxTQUFTLGVBQWU7UUFDcEIsSUFBSSxhQUFhLFVBQVU7WUFDdkIsc0JBQXNCLENBQUMsYUFBYTs7O1FBR3hDLElBQUksZUFBZSxFQUFFLE9BQU87UUFDNUIsSUFBSSxjQUFjO1lBQ2QsSUFBSSxhQUFhLFNBQVM7Z0JBQ3RCLHdCQUF3QixhQUFhLFFBQVE7Z0JBQzdDLHNCQUFzQixhQUFhLFFBQVE7O1lBRS9DLElBQUksYUFBYSxhQUFhO2dCQUMxQixXQUFXLFdBQVc7b0JBQ2xCLGdCQUFnQixhQUFhO21CQUM5Qjs7Ozs7SUFLZixTQUFTLGVBQWU7UUFDcEIsSUFBSSxlQUFlO1lBQ2YsU0FBUztnQkFDTCxXQUFXLEVBQUUsTUFBTSxPQUFPLE9BQU8sV0FBVztnQkFDNUMsU0FBUyxFQUFFLE1BQU0sT0FBTyxPQUFPLFNBQVM7O1lBRTVDLGFBQWEsaUJBQWlCLFVBQVUsV0FBVyxhQUFhLFdBQVc7O1FBRS9FLEVBQUUsT0FBTyxnQkFBZ0IsY0FBYyxFQUFFLFNBQVMsS0FBSyxNQUFNOzs7SUFHakUsU0FBUyxvQkFBb0IsU0FBUztRQUNsQyxJQUFJLGFBQWEsRUFBRSxXQUFXLE9BQU8sU0FBUzs7WUFFMUM7OztRQUdKLE9BQU87YUFDRixNQUFNLEVBQUUsUUFBUSxjQUFjO2FBQzlCLEtBQUssU0FBUyxTQUFTO2dCQUNwQixPQUFPLFVBQVUsT0FBTyxRQUFRLE9BQU87Ozs7SUFJbkQsU0FBUyxvQkFBb0IsYUFBYTtRQUN0Qzs7UUFFQSxPQUFPLEtBQUs7WUFDUixhQUFhO1lBQ2IsWUFBWTtZQUNaLFNBQVM7Z0JBQ0wsUUFBUSxXQUFXO29CQUNmLE9BQU87Ozs7U0FJbEI7U0FDQSxLQUFLLFNBQVMsS0FBSztZQUNoQixJQUFJLE9BQU8sSUFBSSxRQUFRO2dCQUNuQixJQUFJLElBQUksT0FBTyxVQUFVO29CQUNyQixPQUFPLE9BQU8sWUFBWSxDQUFDLElBQUksT0FBTyxTQUFTOztnQkFFbkQsSUFBSSxJQUFJLE9BQU8sUUFBUTtvQkFDbkIsT0FBTyxPQUFPLFVBQVUsQ0FBQyxJQUFJLE9BQU8sT0FBTzs7bUJBRTVDO2dCQUNILE9BQU8saUJBQWlCOzs7U0FHL0IsUUFBUTs7O0lBR2IsU0FBUyxtQkFBbUIsTUFBTTtRQUM5Qjs7UUFFQSxJQUFJO1FBQ0osT0FBTyxLQUFLO1lBQ1IsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTO2dCQUNMLFFBQVEsV0FBVztvQkFDZixPQUFPO3dCQUNILFdBQVc7d0JBQ1gsV0FBVyxPQUFPLE9BQU87d0JBQ3pCLFNBQVMsT0FBTyxPQUFPOzs7OztTQUt0QztTQUNBLEtBQUssU0FBUyxLQUFLO1lBQ2hCLHFCQUFxQjtZQUNyQixPQUFPLG9CQUFvQixtQkFBbUI7O1NBRWpELEtBQUssV0FBVztZQUNiLGlCQUFpQixVQUFVLFdBQVcsYUFBYSxlQUFlOztTQUVyRSxRQUFROzs7SUFHYixTQUFTLGlCQUFpQixhQUFhO1FBQ25DLElBQUk7UUFDSixPQUFPLE9BQU8sS0FBSztZQUNmLGFBQWE7WUFDYixZQUFZO1lBQ1osU0FBUztnQkFDTCxRQUFRLFdBQVc7b0JBQ2YsT0FBTzs7OztTQUlsQjtTQUNBLEtBQUssU0FBUyxLQUFLO1lBQ2hCLHFCQUFxQjtZQUNyQixPQUFPLG9CQUFvQixtQkFBbUI7O1NBRWpELEtBQUssV0FBVztZQUNiLFlBQVksUUFBUSxtQkFBbUI7WUFDdkMsWUFBWSxRQUFRLE9BQU8sbUJBQW1CO1lBQzlDLFlBQVksTUFBTSxPQUFPLG1CQUFtQjtZQUM1QyxZQUFZLFFBQVEsbUJBQW1CO1lBQ3ZDLFlBQVksVUFBVSxtQkFBbUI7WUFDekMsWUFBWSxZQUFZLG1CQUFtQjtZQUMzQyxpQkFBaUIsVUFBVSxXQUFXLGFBQWEsZUFBZTs7OztJQUkxRSxTQUFTLFVBQVUsYUFBYSxZQUFZO1FBQ3hDLElBQUkscUJBQXFCLGlCQUFpQiwrQkFBK0I7UUFDekU7YUFDSzthQUNBLEtBQUssV0FBVztnQkFDYixVQUFVLE9BQU87O2FBRXBCLE1BQU0sU0FBUyxLQUFLO2dCQUNqQixVQUFVLE1BQU0saUNBQWlDLElBQUksS0FBSztnQkFDMUQ7Ozs7SUFJWjtJQUNBOztBQUVKIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvekFwcG9pbnRtZW50c0N0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignekFwcG9pbnRtZW50c0N0cmwnLCBmdW5jdGlvbihcbiAgICAkc2NvcGUsICRodHRwLCAkcm91dGVQYXJhbXMsICRsb2NhdGlvbiwgJGludGVydmFsLCAkbW9kYWwsIHpQcm9maWxlSW1nR2V0LFxuICAgIHVpQ2FsZW5kYXJDb25maWcsIHpBcHBvaW50bWVudFV0aWwsIHpOb3RpZmllciwgekNsaWVudCwgelJlc291cmNlLCB6QXBwb2ludG1lbnQpIHtcbiAgICAvKiBqc2hpbnQgbWF4c3RhdGVtZW50czogZmFsc2UgKi9cbiAgICBcbiAgICB2YXIgX2xhc3RRdWVyeTtcbiAgICB2YXIgX2xhc3RMb2FkZWRFdmVudHM7XG4gICAgdmFyIF9jdXJyZW50U2Nyb2xZO1xuICAgIHZhciBfcHJlc2VsZWN0ZWRSZXNvdXJjZXM7XG4gICAgdmFyIF9wcmVzZWxlY3RlZENsaWVudHM7XG4gICAgXG4gICAgdmFyIHN0YXRlcyA9IHtcbiAgICAgICAgcmVhZHk6IDAsXG4gICAgICAgIGxvYWRpbmc6IDEsXG4gICAgICAgIGVycm9yOiAyXG4gICAgfTtcbiAgICAkc2NvcGUuY3VycmVudFN0YXRlID0gc3RhdGVzLmxvYWRpbmc7XG4gICAgJHNjb3BlLmNsaWVudHMgPSBbXTtcbiAgICAkc2NvcGUucmVzb3VyY2VzID0gW107XG4gICAgJHNjb3BlLmZpbHRlciA9IHtcbiAgICAgICAgY2xpZW50czogW10sXG4gICAgICAgIHJlc291cmNlczogW11cbiAgICB9O1xuICAgICRzY29wZS51aUNvbmZpZyA9IHtcbiAgICAgICAgY2FsZW5kYXI6IHtcbiAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgIGxlZnQ6ICdtb250aCxhZ2VuZGFXZWVrLGFnZW5kYURheScsXG4gICAgICAgICAgICAgICAgY2VudGVyOiAndGl0bGUnLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAndG9kYXkgcHJldixuZXh0J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVkaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZXZlbnRMaW1pdDogdHJ1ZSxcbiAgICAgICAgICAgIHNsb3REdXJhdGlvbjogJzAwOjMwOjAwJyxcbiAgICAgICAgICAgIHNsb3RFdmVudE92ZXJsYXA6IGZhbHNlLFxuICAgICAgICAgICAgZXZlbnRSZW5kZXI6IF9ldmVudFJlbmRlcixcbiAgICAgICAgICAgIGV2ZW50Q2xpY2s6IF9wcmV2aWV3QXBwb2ludG1lbnQsXG4gICAgICAgICAgICBkYXlDbGljazogX2NyZWF0ZUFwcG9pbnRtZW50LFxuICAgICAgICAgICAgZXZlbnREcm9wOiBmdW5jdGlvbihldmVudCwgZGVsdGEsIHJldmVydEZ1bmMpIHtcbiAgICAgICAgICAgICAgICBfc2F2ZUVkaXQoZXZlbnQsIHJldmVydEZ1bmMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2ZW50UmVzaXplOiBmdW5jdGlvbihldmVudCwgZGVsdGEsIHJldmVydEZ1bmMpIHtcbiAgICAgICAgICAgICAgICBfc2F2ZUVkaXQoZXZlbnQsIHJldmVydEZ1bmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICAkc2NvcGUuY2hhbmdlUmVzb3VyY2VzRmlsdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB1aUNhbGVuZGFyQ29uZmlnLmNhbGVuZGFycy5teUNhbGVuZGFyLmZ1bGxDYWxlbmRhcigncmVmZXRjaEV2ZW50cycpO1xuICAgICAgICB9LCAwKTtcbiAgICB9O1xuICAgIFxuICAgICRzY29wZS5jaGFuZ2VDbGllbnRzRmlsdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB1aUNhbGVuZGFyQ29uZmlnLmNhbGVuZGFycy5teUNhbGVuZGFyLmZ1bGxDYWxlbmRhcigncmVmZXRjaEV2ZW50cycpO1xuICAgICAgICB9LCAwKTtcbiAgICB9O1xuICAgIFxuICAgICRzY29wZS5zYXZlQXNEZWZhdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRtb2RhbC5vcGVuKHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvY29tbW9uL2NvbmZpcm1hdGlvbi1kaWFsb2cuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnek1vZGFsQ3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgaXRlbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdTYXZlIGFzIGRlZmF1bHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ1NhdmUgY3VycmVudCBhcHBvaW50bWVudHMgc2V0dGluZ3MgYXMgZGVmYXVsdD8nXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAucmVzdWx0XG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3NhdmVGaWx0ZXJzKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgXG4gICAgZnVuY3Rpb24gX2xvYWRDb2xsZWN0aW9ucygpIHtcbiAgICAgICAgekFwcG9pbnRtZW50VXRpbFxuICAgICAgICAgICAgLmxvYWRDb2xsZWN0aW9ucygpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnJlc291cmNlcyA9IGRhdGEucmVzb3VyY2VzO1xuICAgICAgICAgICAgICAgICRzY29wZS5jbGllbnRzID0gZGF0YS5jbGllbnRzO1xuICAgICAgICAgICAgICAgIF9pbml0RmlsdGVyc0NvbGxlY3Rpb24oZGF0YS5yZXNvdXJjZXMsIF9wcmVzZWxlY3RlZFJlc291cmNlcyk7XG4gICAgICAgICAgICAgICAgX2luaXRGaWx0ZXJzQ29sbGVjdGlvbihkYXRhLmNsaWVudHMsIF9wcmVzZWxlY3RlZENsaWVudHMpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jdXJyZW50U3RhdGUgPSBzdGF0ZXMucmVhZHk7XG4gICAgICAgICAgICAgICAgICAgIHVpQ2FsZW5kYXJDb25maWcuY2FsZW5kYXJzLm15Q2FsZW5kYXIuZnVsbENhbGVuZGFyKCdyZWZldGNoRXZlbnRzJyk7XG4gICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIFRPRE86IGVycm9yXG4gICAgfVxuICAgIFxuICAgIHZhciBldmVudHNGID0gZnVuY3Rpb24oc3RhcnQsIGVuZCwgdGltZXpvbmUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdBQUEnLCAkc2NvcGUuY3VycmVudFN0YXRlKVxuICAgICAgICBpZiAoJHNjb3BlLmN1cnJlbnRTdGF0ZSAhPT0gc3RhdGVzLnJlYWR5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBxdWVyeSA9IHtcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydC50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgZW5kOiBlbmQudG9JU09TdHJpbmcoKVxuICAgICAgICB9O1xuICAgICAgICBpZiAoJHNjb3BlLmZpbHRlci5yZXNvdXJjZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcXVlcnlbJ3Jlc291cmNlc1tdJ10gPSBfLnBsdWNrKCRzY29wZS5maWx0ZXIucmVzb3VyY2VzLCAnX2lkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCRzY29wZS5maWx0ZXIuY2xpZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBxdWVyeVsnY2xpZW50c1tdJ10gPSBfLnBsdWNrKCRzY29wZS5maWx0ZXIuY2xpZW50cywgJ19pZCcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE86IHdoeT9cbiAgICAgICAgcXVlcnlbJ2luY2x1ZGVzW10nXSA9IFsncmVzb3VyY2VzJ107XG4gICAgICAgIFxuICAgICAgICBpZiAoXy5pc0VxdWFsKHF1ZXJ5LCBfbGFzdFF1ZXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKF9sYXN0TG9hZGVkRXZlbnRzKTtcbiAgICAgICAgfVxuICAgICAgICBfbGFzdFF1ZXJ5ID0gcXVlcnk7XG4gICAgICAgIFxuICAgICAgICAkc2NvcGUuY3VycmVudFN0YXRlID0gc3RhdGVzLmxvYWRpbmc7XG4gICAgICAgIHpBcHBvaW50bWVudFxuICAgICAgICAgICAgLnF1ZXJ5KHF1ZXJ5KVxuICAgICAgICAgICAgLiRwcm9taXNlXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihhcHBvaW50bWVudHMpIHtcbiAgICAgICAgICAgICAgICBfbGFzdExvYWRlZEV2ZW50cyA9IF8ubWFwKGFwcG9pbnRtZW50cywgekFwcG9pbnRtZW50VXRpbC5wcmVwYXJlQXBwb2ludG1lbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhcHBvaW50bWVudHM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oYXBwb2ludG1lbnRzKSB7XG4gICAgICAgICAgICAgICAgLyp2YXIgbWluRHVyYXRpb24gPSBfZ2V0TWluUmVzb3VyY2VBcHBvaW50bWVudEludGVydmFsKGFwcG9pbnRtZW50cyk7XG4gICAgICAgICAgICAgICAgaWYgKG1pbkR1cmF0aW9uID49IDEwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGltcHJvdmVcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRWaWV3ID0gX2dldEN1cnJlbnRWaWV3KCk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS51aUNvbmZpZy5jYWxlbmRhci5zbG90RHVyYXRpb24gPSBtb21lbnQuZHVyYXRpb24obWluRHVyYXRpb24sICdtJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfc2V0Q3VycmVudFZpZXcoY3VycmVudFZpZXcpO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgICAgICByZXR1cm4gYXBwb2ludG1lbnRzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKF9sYXN0TG9hZGVkRXZlbnRzKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY3VycmVudFN0YXRlID0gc3RhdGVzLnJlYWR5O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIuZXJyb3IoJ1VuYWJsZSB0byBsb2FkIGFwcG9pbnRtZW50czogJyArIGVyci5kYXRhLnJlYXNvbik7XG4gICAgICAgICAgICAgICAgLy8gVE9ETyAkc2NvcGUuc3RhdGVzLmlzUmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY3VycmVudFN0YXRlID0gc3RhdGVzLmVycm9yO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcbiAgICAkc2NvcGUuZXZlbnRTb3VyY2VzID0gW2V2ZW50c0ZdO1xuICAgIFxuICAgIGZ1bmN0aW9uIF9ldmVudFJlbmRlcihldmVudCwgZWxlbWVudCkge1xuICAgICAgICAvLyBUT0RPOiB1c2UgJHNjb3BlLmNsaWVudHMucGljc1xuICAgICAgICBmdW5jdGlvbiBkb3dubG9hZENsaWVudFBpYyhjbGllbnRJZCwgY2IpIHtcbiAgICAgICAgICAgIHZhciBjbGllbnQgPSBfLmZpbmQoJHNjb3BlLmNsaWVudHMsIHsgX2lkOiBjbGllbnRJZCB9KTtcbiAgICAgICAgICAgIGNsaWVudCA9IGNsaWVudCB8fCB7IG5hbWU6ICd1bmtub3duJyB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgb3B0cyA9IHsgdHlwZTogJ2NsaWVudCcsIHNpemU6ICdzbWFsbCcsIGNzc0NsYXNzOiAncHJvZmlsZS1zbWFsbCcgfTtcbiAgICAgICAgICAgIHpQcm9maWxlSW1nR2V0LmdldFBpY0VsZW1lbnQoY2xpZW50LCBvcHRzLCBmdW5jdGlvbihpbWdFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgY2IoY2xpZW50LCBpbWdFbGVtZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiBzaG93QWxsQ2xpZW50cygpIHtcbiAgICAgICAgICAgIF8uZWFjaChldmVudC5jbGllbnRzLCBmdW5jdGlvbihjbGllbnRJZCkge1xuICAgICAgICAgICAgICAgIGRvd25sb2FkQ2xpZW50UGljKGNsaWVudElkLCBmdW5jdGlvbihmb3VuZENsaW5ldCwgaW1nRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmZpbmQoJy5mYy1jb250ZW50JykuYXBwZW5kKGltZ0VsZW1lbnQgKyAnPHNwYW4+JyArIGZvdW5kQ2xpbmV0Lm5hbWUgKyAnPC9zcGFuPicpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIHNob3dGaXJzdENsaWVudCgpIHtcbiAgICAgICAgICAgIHZhciBldmVudEh0bWwgPSAnPGRpdiBjbGFzcz1cInBpY1wiIC8+PGRpdiBjbGFzcz1cInRpdGxlXCIgLz4nO1xuICAgICAgICAgICAgdmFyICRldmVudEVsID0gZWxlbWVudC5maW5kKCcuZmMtY29udGVudCcpLmh0bWwoZXZlbnRIdG1sKTtcbiAgICAgICAgICAgICRldmVudEVsLmZpbmQoJy50aXRsZScpLmh0bWwoJzxwPjxzcGFuIGNsYXNzPVwidGltZVwiPicgKyBldmVudC5zdGFydC5mb3JtYXQoJ2g6bW0gYScpICsgJyA8c3Bhbj4nICsgZXZlbnQudGl0bGUgKyAnPC9zcGFuPjwvcD4nKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGZpcnN0Q2xpZW50SWQgPSBldmVudC5jbGllbnRzWzBdO1xuICAgICAgICAgICAgaWYgKGZpcnN0Q2xpZW50SWQpIHtcbiAgICAgICAgICAgICAgICBkb3dubG9hZENsaWVudFBpYyhmaXJzdENsaWVudElkLCBmdW5jdGlvbihmb3VuZENsaW5ldCwgaW1nRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2xpZW50SHRtbCA9IGZvdW5kQ2xpbmV0Lm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvdGhlckNsaWVudHNDb3VudCA9IGV2ZW50LmNsaWVudHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyQ2xpZW50c0NvdW50ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGllbnRIdG1sICs9ICcgKyAnICsgb3RoZXJDbGllbnRzQ291bnQgKyAnIG90aGVyJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvdGhlckNsaWVudHNDb3VudCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudEh0bWwgKz0gJyArICcgKyBvdGhlckNsaWVudHNDb3VudCArICcgb3RoZXJzJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAkZXZlbnRFbC5maW5kKCcucGljJykuYXBwZW5kKGltZ0VsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAkZXZlbnRFbC5maW5kKCcudGl0bGUnKS5hcHBlbmQoJzxwPicgKyBjbGllbnRIdG1sICsgJzwvcD4nKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKF9nZXRDdXJyZW50VmlldygpID09PSAnYWdlbmRhRGF5Jykge1xuICAgICAgICAgICAgc2hvd0FsbENsaWVudHMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNob3dGaXJzdENsaWVudCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIF9nZXRDdXJyZW50VmlldygpIHtcbiAgICAgICAgcmV0dXJuIHVpQ2FsZW5kYXJDb25maWcuY2FsZW5kYXJzLm15Q2FsZW5kYXIuZnVsbENhbGVuZGFyKCdnZXRWaWV3JykubmFtZTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gX3NldEN1cnJlbnRWaWV3KHZpZXdOYW1lKSB7XG4gICAgICAgIHVpQ2FsZW5kYXJDb25maWcuY2FsZW5kYXJzLm15Q2FsZW5kYXIuZnVsbENhbGVuZGFyKCdjaGFuZ2VWaWV3Jywgdmlld05hbWUpO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBfcmVtZW1iZXJTY3JvbGxZUG9zKCkge1xuICAgICAgICBfY3VycmVudFNjcm9sWSA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gX3Jlc3RvcmVTY3JvbGxZUG9zKCkge1xuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKF9jdXJyZW50U2Nyb2xZKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gX2dldE1pblJlc291cmNlQXBwb2ludG1lbnRJbnRlcnZhbChhcHBvaW50bWVudHMpIHtcbiAgICAgICAgcmV0dXJuIF8oYXBwb2ludG1lbnRzKS5wbHVjaygncmVzb3VyY2VzJykuZmxhdHRlbigpLnBsdWNrKCdhcHBvaW50bWVudEludGVydmFsJykubWluKCk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIF9pbml0RmlsdGVyc0NvbGxlY3Rpb24oY29sbGVjdGlvbiwgcHJlc2VsZWN0ZWQpIHtcbiAgICAgICAgXyhjb2xsZWN0aW9uKVxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pbmRleE9mKHByZXNlbGVjdGVkLCBvYmouX2lkKSAhPT0gLTE7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgb2JqLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudmFsdWUoKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gX2xvYWRGaWx0ZXJzKCkge1xuICAgICAgICBpZiAoJHJvdXRlUGFyYW1zLmNsaWVudElkKSB7XG4gICAgICAgICAgICBfcHJlc2VsZWN0ZWRDbGllbnRzID0gWyRyb3V0ZVBhcmFtcy5jbGllbnRJZF07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBhcHBvaW50bWVudHMgPSAkLmNvb2tpZSgnYXBwb2ludG1lbnRzJyk7XG4gICAgICAgIGlmIChhcHBvaW50bWVudHMpIHtcbiAgICAgICAgICAgIGlmIChhcHBvaW50bWVudHMuZmlsdGVycykge1xuICAgICAgICAgICAgICAgIF9wcmVzZWxlY3RlZFJlc291cmNlcyA9IGFwcG9pbnRtZW50cy5maWx0ZXJzLnJlc291cmNlcztcbiAgICAgICAgICAgICAgICBfcHJlc2VsZWN0ZWRDbGllbnRzID0gYXBwb2ludG1lbnRzLmZpbHRlcnMuY2xpZW50cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhcHBvaW50bWVudHMuY3VycmVudFZpZXcpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBfc2V0Q3VycmVudFZpZXcoYXBwb2ludG1lbnRzLmN1cnJlbnRWaWV3KTtcbiAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBfc2F2ZUZpbHRlcnMoKSB7XG4gICAgICAgIHZhciBhcHBvaW50bWVudHMgPSB7XG4gICAgICAgICAgICBmaWx0ZXJzOiB7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzOiBfLnBsdWNrKCRzY29wZS5maWx0ZXIucmVzb3VyY2VzLCAnX2lkJyksXG4gICAgICAgICAgICAgICAgY2xpZW50czogXy5wbHVjaygkc2NvcGUuZmlsdGVyLmNsaWVudHMsICdfaWQnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGN1cnJlbnRWaWV3OiB1aUNhbGVuZGFyQ29uZmlnLmNhbGVuZGFycy5teUNhbGVuZGFyLmZ1bGxDYWxlbmRhcignZ2V0VmlldycpLm5hbWVcbiAgICAgICAgfTtcbiAgICAgICAgJC5jb29raWUoJ2FwcG9pbnRtZW50cycsIGFwcG9pbnRtZW50cywgeyBleHBpcmVzOiAzNjUsIHBhdGg6ICcvJyB9KTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gX2Rvd25sb2FkTmV3Q2xpZW50cyhjbGllbnRzKSB7XG4gICAgICAgIHZhciBuZXdDbGllbnRzID0gXy5kaWZmZXJlbmNlKCRzY29wZS5jbGllbnRzLCBjbGllbnRzKTtcbiAgICAgICAgLy9pZiAobmV3Q2xpZW50cy5sZW5ndGggPT09IDApIHsgVE9ET1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvL31cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB6Q2xpZW50XG4gICAgICAgICAgICAucXVlcnkoeyAnaW5bXSc6IG5ld0NsaWVudHMgfSkuJHByb21pc2VcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNsaWVudHMpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2xpZW50cyA9ICRzY29wZS5jbGllbnRzLmNvbmNhdChjbGllbnRzKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBfcHJldmlld0FwcG9pbnRtZW50KGFwcG9pbnRtZW50KSB7XG4gICAgICAgIF9yZW1lbWJlclNjcm9sbFlQb3MoKTtcbiAgICAgICAgXG4gICAgICAgICRtb2RhbC5vcGVuKHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZGFzaGJvYXJkL2FwcG9pbnRtZW50cy9hcHBvaW50bWVudC1kZXRhaWxzLWRpYWxvZy5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6QXBwb2ludG1lbnREZXRhaWxzRGlhbG9nQ3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgcGFyYW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFwcG9pbnRtZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnJlc3VsdFxuICAgICAgICAudGhlbihmdW5jdGlvbihyZXQpIHtcbiAgICAgICAgICAgIGlmIChyZXQgJiYgcmV0LmZpbHRlcikge1xuICAgICAgICAgICAgICAgIGlmIChyZXQuZmlsdGVyLnJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5maWx0ZXIucmVzb3VyY2VzID0gW3JldC5maWx0ZXIucmVzb3VyY2UuX2lkXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJldC5maWx0ZXIuY2xpZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5maWx0ZXIuY2xpZW50cyA9IFtyZXQuZmlsdGVyLmNsaWVudC5faWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9lZGl0QXBwb2ludG1lbnQoYXBwb2ludG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuZmluYWxseShfcmVzdG9yZVNjcm9sbFlQb3MpO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBfY3JlYXRlQXBwb2ludG1lbnQoZGF0ZSkge1xuICAgICAgICBfcmVtZW1iZXJTY3JvbGxZUG9zKCk7XG4gICAgICAgIFxuICAgICAgICB2YXIgY3JlYXRlZEFwcG9pbnRtZW50O1xuICAgICAgICAkbW9kYWwub3Blbih7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvYXBwb2ludG1lbnQtbmV3LWRpYWxvZy5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6QXBwb2ludG1lbnROZXdEaWFsb2dDdHJsJyxcbiAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICBwYXJhbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlOiBkYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VzOiAkc2NvcGUuZmlsdGVyLnJlc291cmNlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudHM6ICRzY29wZS5maWx0ZXIuY2xpZW50c1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnJlc3VsdFxuICAgICAgICAudGhlbihmdW5jdGlvbihhcHApIHtcbiAgICAgICAgICAgIGNyZWF0ZWRBcHBvaW50bWVudCA9IGFwcDtcbiAgICAgICAgICAgIHJldHVybiBfZG93bmxvYWROZXdDbGllbnRzKGNyZWF0ZWRBcHBvaW50bWVudC5jbGllbnRzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB1aUNhbGVuZGFyQ29uZmlnLmNhbGVuZGFycy5teUNhbGVuZGFyLmZ1bGxDYWxlbmRhcigncmVuZGVyRXZlbnQnLCBjcmVhdGVkQXBwb2ludG1lbnQpO1xuICAgICAgICB9KVxuICAgICAgICAuZmluYWxseShfcmVzdG9yZVNjcm9sbFlQb3MpO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBfZWRpdEFwcG9pbnRtZW50KGFwcG9pbnRtZW50KSB7XG4gICAgICAgIHZhciB1cGRhdGVkQXBwb2ludG1lbnQ7XG4gICAgICAgIHJldHVybiAkbW9kYWwub3Blbih7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9hcHBvaW50bWVudHMvYXBwb2ludG1lbnQtZWRpdC1kaWFsb2cuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnekFwcG9pbnRtZW50RWRpdERpYWxvZ0N0cmwnLFxuICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgIHBhcmFtczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcHBvaW50bWVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5yZXN1bHRcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oYXBwKSB7XG4gICAgICAgICAgICB1cGRhdGVkQXBwb2ludG1lbnQgPSBhcHA7XG4gICAgICAgICAgICByZXR1cm4gX2Rvd25sb2FkTmV3Q2xpZW50cyh1cGRhdGVkQXBwb2ludG1lbnQuY2xpZW50cyk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXBwb2ludG1lbnQudGl0bGUgPSB1cGRhdGVkQXBwb2ludG1lbnQudGl0bGU7XG4gICAgICAgICAgICBhcHBvaW50bWVudC5zdGFydCA9IG1vbWVudCh1cGRhdGVkQXBwb2ludG1lbnQuc3RhcnQpO1xuICAgICAgICAgICAgYXBwb2ludG1lbnQuZW5kID0gbW9tZW50KHVwZGF0ZWRBcHBvaW50bWVudC5lbmQpO1xuICAgICAgICAgICAgYXBwb2ludG1lbnQuY29sb3IgPSB1cGRhdGVkQXBwb2ludG1lbnQuY29sb3I7XG4gICAgICAgICAgICBhcHBvaW50bWVudC5jbGllbnRzID0gdXBkYXRlZEFwcG9pbnRtZW50LmNsaWVudHM7XG4gICAgICAgICAgICBhcHBvaW50bWVudC5yZXNvdXJjZXMgPSB1cGRhdGVkQXBwb2ludG1lbnQucmVzb3VyY2VzO1xuICAgICAgICAgICAgdWlDYWxlbmRhckNvbmZpZy5jYWxlbmRhcnMubXlDYWxlbmRhci5mdWxsQ2FsZW5kYXIoJ3VwZGF0ZUV2ZW50JywgYXBwb2ludG1lbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gX3NhdmVFZGl0KGFwcG9pbnRtZW50LCByZXZlcnRGdW5jKSB7XG4gICAgICAgIHZhciBhcHBvaW50bWVudEZvclNhdmUgPSB6QXBwb2ludG1lbnRVdGlsLnByZXBhcmVBcHBvaW50bWVudEZvclNhdmVEYXRlcyhhcHBvaW50bWVudCk7XG4gICAgICAgIGFwcG9pbnRtZW50Rm9yU2F2ZVxuICAgICAgICAgICAgLiR1cGRhdGVEYXRlcygpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIubm90aWZ5KCdBcHBvaW50bWVudCByZWNvcmQgdXBkYXRlZCcpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIuZXJyb3IoJ1VuYWJsZSB0byBzYXZlIGFwcG9pbnRtZW50OiAnICsgZXJyLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgICAgICByZXZlcnRGdW5jKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgX2xvYWRDb2xsZWN0aW9ucygpO1xuICAgIF9sb2FkRmlsdGVycygpO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').controller('zClientCtrl', ['$scope', 'zClient', '$http', '$location', '$routeParams', 'zNotifier', function($scope, zClient, $http, $location, $routeParams, zNotifier) {
    $scope.focusClientSearchbox = true;
    
    $scope.searchClients = function(q) {
        if (!q || q.length === 0) {
            return;
        }
        return $http
            .get('/api/clients/search', {
                params: {
                    q: q
                }
            })
            .then(function(response) {
                return zClient.mapObjectsToResources(response.data);
            });
    };
    
    $scope.$watch('selectedClient', function(newValue) {
        if (newValue && newValue._id && newValue !== $scope.client) {
            $location.path('/clients/' + newValue._id);
        }
    });
    
    $scope.clearSearch = function() {
        $scope.selectedClient = null;
        $scope.focusClientSearchbox = true;
    };
    
    $scope.showMore = function() {
        $scope.isDisplayAdditional = true;
    };
    
    $scope.smsIcal = function() {
        // TODO: test
        $http
            .post('/api/messages/smsical/client/' + $scope.client._id)
            .then(function() {
                zNotifier.notify('Calendar sent in sms to ' + $scope.client.mobile);
            })
            .catch(function(err) {
                zNotifier.error('Umm... can\'t send sms: ' + err.data.reason);
            });
    };
    
    if ($routeParams._id) {
        loadClient($routeParams._id);
    }
    
    function loadClient(_id) {
        zClient
            .get({
                id: _id
            })
            .$promise
            .then(function(client) {
                zNotifier.notify('Record loaded for ' + client.name);
                $scope.client = client;
                $scope.selectedClient = client;
            })
            .catch(function(err) {
                zNotifier.error('Unable to load record: ' + err.data.reason);
                $location.path('/clients');
            });
    }
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jbGllbnRzL3pDbGllbnRDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcsd0ZBQWUsU0FBUyxRQUFRLFNBQVMsT0FBTyxXQUFXLGNBQWMsV0FBVztJQUNqSCxPQUFPLHVCQUF1Qjs7SUFFOUIsT0FBTyxnQkFBZ0IsU0FBUyxHQUFHO1FBQy9CLElBQUksQ0FBQyxLQUFLLEVBQUUsV0FBVyxHQUFHO1lBQ3RCOztRQUVKLE9BQU87YUFDRixJQUFJLHVCQUF1QjtnQkFDeEIsUUFBUTtvQkFDSixHQUFHOzs7YUFHVixLQUFLLFNBQVMsVUFBVTtnQkFDckIsT0FBTyxRQUFRLHNCQUFzQixTQUFTOzs7O0lBSTFELE9BQU8sT0FBTyxrQkFBa0IsU0FBUyxVQUFVO1FBQy9DLElBQUksWUFBWSxTQUFTLE9BQU8sYUFBYSxPQUFPLFFBQVE7WUFDeEQsVUFBVSxLQUFLLGNBQWMsU0FBUzs7OztJQUk5QyxPQUFPLGNBQWMsV0FBVztRQUM1QixPQUFPLGlCQUFpQjtRQUN4QixPQUFPLHVCQUF1Qjs7O0lBR2xDLE9BQU8sV0FBVyxXQUFXO1FBQ3pCLE9BQU8sc0JBQXNCOzs7SUFHakMsT0FBTyxVQUFVLFdBQVc7O1FBRXhCO2FBQ0ssS0FBSyxrQ0FBa0MsT0FBTyxPQUFPO2FBQ3JELEtBQUssV0FBVztnQkFDYixVQUFVLE9BQU8sNkJBQTZCLE9BQU8sT0FBTzs7YUFFL0QsTUFBTSxTQUFTLEtBQUs7Z0JBQ2pCLFVBQVUsTUFBTSw2QkFBNkIsSUFBSSxLQUFLOzs7O0lBSWxFLElBQUksYUFBYSxLQUFLO1FBQ2xCLFdBQVcsYUFBYTs7O0lBRzVCLFNBQVMsV0FBVyxLQUFLO1FBQ3JCO2FBQ0ssSUFBSTtnQkFDRCxJQUFJOzthQUVQO2FBQ0EsS0FBSyxTQUFTLFFBQVE7Z0JBQ25CLFVBQVUsT0FBTyx1QkFBdUIsT0FBTztnQkFDL0MsT0FBTyxTQUFTO2dCQUNoQixPQUFPLGlCQUFpQjs7YUFFM0IsTUFBTSxTQUFTLEtBQUs7Z0JBQ2pCLFVBQVUsTUFBTSw0QkFBNEIsSUFBSSxLQUFLO2dCQUNyRCxVQUFVLEtBQUs7Ozs7QUFJL0IiLCJmaWxlIjoiY29udHJvbGxlcnMvZGFzaGJvYXJkL2NsaWVudHMvekNsaWVudEN0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignekNsaWVudEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIHpDbGllbnQsICRodHRwLCAkbG9jYXRpb24sICRyb3V0ZVBhcmFtcywgek5vdGlmaWVyKSB7XG4gICAgJHNjb3BlLmZvY3VzQ2xpZW50U2VhcmNoYm94ID0gdHJ1ZTtcbiAgICBcbiAgICAkc2NvcGUuc2VhcmNoQ2xpZW50cyA9IGZ1bmN0aW9uKHEpIHtcbiAgICAgICAgaWYgKCFxIHx8IHEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAuZ2V0KCcvYXBpL2NsaWVudHMvc2VhcmNoJywge1xuICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICBxOiBxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHpDbGllbnQubWFwT2JqZWN0c1RvUmVzb3VyY2VzKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcbiAgICBcbiAgICAkc2NvcGUuJHdhdGNoKCdzZWxlY3RlZENsaWVudCcsIGZ1bmN0aW9uKG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSAmJiBuZXdWYWx1ZS5faWQgJiYgbmV3VmFsdWUgIT09ICRzY29wZS5jbGllbnQpIHtcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvY2xpZW50cy8nICsgbmV3VmFsdWUuX2lkKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgICRzY29wZS5jbGVhclNlYXJjaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDbGllbnQgPSBudWxsO1xuICAgICAgICAkc2NvcGUuZm9jdXNDbGllbnRTZWFyY2hib3ggPSB0cnVlO1xuICAgIH07XG4gICAgXG4gICAgJHNjb3BlLnNob3dNb3JlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5pc0Rpc3BsYXlBZGRpdGlvbmFsID0gdHJ1ZTtcbiAgICB9O1xuICAgIFxuICAgICRzY29wZS5zbXNJY2FsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFRPRE86IHRlc3RcbiAgICAgICAgJGh0dHBcbiAgICAgICAgICAgIC5wb3N0KCcvYXBpL21lc3NhZ2VzL3Ntc2ljYWwvY2xpZW50LycgKyAkc2NvcGUuY2xpZW50Ll9pZClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5ub3RpZnkoJ0NhbGVuZGFyIHNlbnQgaW4gc21zIHRvICcgKyAkc2NvcGUuY2xpZW50Lm1vYmlsZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignVW1tLi4uIGNhblxcJ3Qgc2VuZCBzbXM6ICcgKyBlcnIuZGF0YS5yZWFzb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcbiAgICBcbiAgICBpZiAoJHJvdXRlUGFyYW1zLl9pZCkge1xuICAgICAgICBsb2FkQ2xpZW50KCRyb3V0ZVBhcmFtcy5faWQpO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBsb2FkQ2xpZW50KF9pZCkge1xuICAgICAgICB6Q2xpZW50XG4gICAgICAgICAgICAuZ2V0KHtcbiAgICAgICAgICAgICAgICBpZDogX2lkXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLiRwcm9taXNlXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjbGllbnQpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIubm90aWZ5KCdSZWNvcmQgbG9hZGVkIGZvciAnICsgY2xpZW50Lm5hbWUpO1xuICAgICAgICAgICAgICAgICRzY29wZS5jbGllbnQgPSBjbGllbnQ7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ2xpZW50ID0gY2xpZW50O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIuZXJyb3IoJ1VuYWJsZSB0byBsb2FkIHJlY29yZDogJyArIGVyci5kYXRhLnJlYXNvbik7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9jbGllbnRzJyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').controller('zClientEditCtrl', ['$scope', '$routeParams', '$location', 'zNotifier', 'zClientUtil', 'zClient', function($scope, $routeParams, $location, zNotifier, zClientUtil, zClient) {
    /* jshint maxstatements: 20 */
    
    $scope.isChangingPic = false;
    $scope.imgChanged = 0;
    $scope.isLoading = true;
    $scope.isSaving = false;
    $scope.dateOptions = zClientUtil.dateOptions;
    
    zClient
        .get({id: $routeParams._id})
        .$promise
        .then(function(client) {
            zNotifier.notify('Ready to edit ' + client.name);
            $scope.client = client;
            $scope.picInfo = {
                id: client._id,
                type: 'client',
                cb: function() {
                    $scope.client.pic = 's3';
                    $scope.imgChanged++;
                    $scope.isChangingPic = false;
                }
            };
            $scope.isLoading = false;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load record: ' + err.data.reason);
            $location.path('/clients');
        });
        
    $scope.updateKnownAs = function() {
        zClientUtil.updateKnownAs($scope.client);
    };
    
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    
    $scope.startChangingPic = function() {
        $scope.isChangingPic = true;
    };
    
    $scope.cancelChangingPic = function() {
        $scope.isChangingPic = false;
    };
    
    $scope.saveClient = function() {
        $scope.isSaving = true;
        $scope.client
            .$save()
            .then(function() {
                zNotifier.notify('Client is updated');
                $location.path('/clients/' + $scope.client._id);
            })
            .catch(function(err) {
                zNotifier.error('Unable to save record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jbGllbnRzL3pDbGllbnRFZGl0Q3RybC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxXQUFXLGtHQUFtQixTQUFTLFFBQVEsY0FBYyxXQUFXLFdBQVcsYUFBYSxTQUFTOzs7SUFHM0gsT0FBTyxnQkFBZ0I7SUFDdkIsT0FBTyxhQUFhO0lBQ3BCLE9BQU8sWUFBWTtJQUNuQixPQUFPLFdBQVc7SUFDbEIsT0FBTyxjQUFjLFlBQVk7O0lBRWpDO1NBQ0ssSUFBSSxDQUFDLElBQUksYUFBYTtTQUN0QjtTQUNBLEtBQUssU0FBUyxRQUFRO1lBQ25CLFVBQVUsT0FBTyxtQkFBbUIsT0FBTztZQUMzQyxPQUFPLFNBQVM7WUFDaEIsT0FBTyxVQUFVO2dCQUNiLElBQUksT0FBTztnQkFDWCxNQUFNO2dCQUNOLElBQUksV0FBVztvQkFDWCxPQUFPLE9BQU8sTUFBTTtvQkFDcEIsT0FBTztvQkFDUCxPQUFPLGdCQUFnQjs7O1lBRy9CLE9BQU8sWUFBWTs7U0FFdEIsTUFBTSxTQUFTLEtBQUs7WUFDakIsVUFBVSxNQUFNLDRCQUE0QixJQUFJLEtBQUs7WUFDckQsVUFBVSxLQUFLOzs7SUFHdkIsT0FBTyxnQkFBZ0IsV0FBVztRQUM5QixZQUFZLGNBQWMsT0FBTzs7O0lBR3JDLE9BQU8sT0FBTyxTQUFTLFFBQVE7UUFDM0IsT0FBTztRQUNQLE9BQU87UUFDUCxPQUFPLFNBQVM7OztJQUdwQixPQUFPLG1CQUFtQixXQUFXO1FBQ2pDLE9BQU8sZ0JBQWdCOzs7SUFHM0IsT0FBTyxvQkFBb0IsV0FBVztRQUNsQyxPQUFPLGdCQUFnQjs7O0lBRzNCLE9BQU8sYUFBYSxXQUFXO1FBQzNCLE9BQU8sV0FBVztRQUNsQixPQUFPO2FBQ0Y7YUFDQSxLQUFLLFdBQVc7Z0JBQ2IsVUFBVSxPQUFPO2dCQUNqQixVQUFVLEtBQUssY0FBYyxPQUFPLE9BQU87O2FBRTlDLE1BQU0sU0FBUyxLQUFLO2dCQUNqQixVQUFVLE1BQU0sNEJBQTRCLElBQUksS0FBSzs7YUFFeEQsUUFBUSxXQUFXO2dCQUNoQixPQUFPLFdBQVc7Ozs7QUFJbEMiLCJmaWxlIjoiY29udHJvbGxlcnMvZGFzaGJvYXJkL2NsaWVudHMvekNsaWVudEVkaXRDdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ3pDbGllbnRFZGl0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvdXRlUGFyYW1zLCAkbG9jYXRpb24sIHpOb3RpZmllciwgekNsaWVudFV0aWwsIHpDbGllbnQpIHtcbiAgICAvKiBqc2hpbnQgbWF4c3RhdGVtZW50czogMjAgKi9cbiAgICBcbiAgICAkc2NvcGUuaXNDaGFuZ2luZ1BpYyA9IGZhbHNlO1xuICAgICRzY29wZS5pbWdDaGFuZ2VkID0gMDtcbiAgICAkc2NvcGUuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAkc2NvcGUuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAkc2NvcGUuZGF0ZU9wdGlvbnMgPSB6Q2xpZW50VXRpbC5kYXRlT3B0aW9ucztcbiAgICBcbiAgICB6Q2xpZW50XG4gICAgICAgIC5nZXQoe2lkOiAkcm91dGVQYXJhbXMuX2lkfSlcbiAgICAgICAgLiRwcm9taXNlXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGNsaWVudCkge1xuICAgICAgICAgICAgek5vdGlmaWVyLm5vdGlmeSgnUmVhZHkgdG8gZWRpdCAnICsgY2xpZW50Lm5hbWUpO1xuICAgICAgICAgICAgJHNjb3BlLmNsaWVudCA9IGNsaWVudDtcbiAgICAgICAgICAgICRzY29wZS5waWNJbmZvID0ge1xuICAgICAgICAgICAgICAgIGlkOiBjbGllbnQuX2lkLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdjbGllbnQnLFxuICAgICAgICAgICAgICAgIGNiOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmNsaWVudC5waWMgPSAnczMnO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaW1nQ2hhbmdlZCsrO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaXNDaGFuZ2luZ1BpYyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2NvcGUuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignVW5hYmxlIHRvIGxvYWQgcmVjb3JkOiAnICsgZXJyLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvY2xpZW50cycpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgJHNjb3BlLnVwZGF0ZUtub3duQXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgekNsaWVudFV0aWwudXBkYXRlS25vd25Bcygkc2NvcGUuY2xpZW50KTtcbiAgICB9O1xuICAgIFxuICAgICRzY29wZS5vcGVuID0gZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICRzY29wZS5vcGVuZWQgPSB0cnVlO1xuICAgIH07XG4gICAgXG4gICAgJHNjb3BlLnN0YXJ0Q2hhbmdpbmdQaWMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLmlzQ2hhbmdpbmdQaWMgPSB0cnVlO1xuICAgIH07XG4gICAgXG4gICAgJHNjb3BlLmNhbmNlbENoYW5naW5nUGljID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5pc0NoYW5naW5nUGljID0gZmFsc2U7XG4gICAgfTtcbiAgICBcbiAgICAkc2NvcGUuc2F2ZUNsaWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuaXNTYXZpbmcgPSB0cnVlO1xuICAgICAgICAkc2NvcGUuY2xpZW50XG4gICAgICAgICAgICAuJHNhdmUoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgek5vdGlmaWVyLm5vdGlmeSgnQ2xpZW50IGlzIHVwZGF0ZWQnKTtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2NsaWVudHMvJyArICRzY29wZS5jbGllbnQuX2lkKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdVbmFibGUgdG8gc2F2ZSByZWNvcmQ6ICcgKyBlcnIuZGF0YS5yZWFzb24pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pc1NhdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').controller('zClientNewCtrl', ['$scope', '$location', 'zNotifier', 'zClientUtil', 'zClient', function($scope, $location, zNotifier, zClientUtil, zClient) {
    /* jshint newcap: false */
    $scope.client = new zClient({ status: 'active' });
    $scope.isSaving = false;
    $scope.dateOptions = zClientUtil.dateOptions;
    
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    
    $scope.updateKnownAs = function() {
        zClientUtil.updateKnownAs($scope.client);
    };
    
    $scope.createClient = function() {
        $scope.isSaving = true;
        $scope.client
            .$save()
            .then(function(client) {
                zNotifier.notify('Client is created');
                $location.path('/clients/' + client._id);
            })
            .catch(function(err) {
                zNotifier.error('Unable to create new record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jbGllbnRzL3pDbGllbnROZXdDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcsaUZBQWtCLFNBQVMsUUFBUSxXQUFXLFdBQVcsYUFBYSxTQUFTOztJQUU1RyxPQUFPLFNBQVMsSUFBSSxRQUFRLEVBQUUsUUFBUTtJQUN0QyxPQUFPLFdBQVc7SUFDbEIsT0FBTyxjQUFjLFlBQVk7O0lBRWpDLE9BQU8sT0FBTyxTQUFTLFFBQVE7UUFDM0IsT0FBTztRQUNQLE9BQU87UUFDUCxPQUFPLFNBQVM7OztJQUdwQixPQUFPLGdCQUFnQixXQUFXO1FBQzlCLFlBQVksY0FBYyxPQUFPOzs7SUFHckMsT0FBTyxlQUFlLFdBQVc7UUFDN0IsT0FBTyxXQUFXO1FBQ2xCLE9BQU87YUFDRjthQUNBLEtBQUssU0FBUyxRQUFRO2dCQUNuQixVQUFVLE9BQU87Z0JBQ2pCLFVBQVUsS0FBSyxjQUFjLE9BQU87O2FBRXZDLE1BQU0sU0FBUyxLQUFLO2dCQUNqQixVQUFVLE1BQU0sa0NBQWtDLElBQUksS0FBSzs7YUFFOUQsUUFBUSxXQUFXO2dCQUNoQixPQUFPLFdBQVc7Ozs7QUFJbEMiLCJmaWxlIjoiY29udHJvbGxlcnMvZGFzaGJvYXJkL2NsaWVudHMvekNsaWVudE5ld0N0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignekNsaWVudE5ld0N0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRsb2NhdGlvbiwgek5vdGlmaWVyLCB6Q2xpZW50VXRpbCwgekNsaWVudCkge1xuICAgIC8qIGpzaGludCBuZXdjYXA6IGZhbHNlICovXG4gICAgJHNjb3BlLmNsaWVudCA9IG5ldyB6Q2xpZW50KHsgc3RhdHVzOiAnYWN0aXZlJyB9KTtcbiAgICAkc2NvcGUuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAkc2NvcGUuZGF0ZU9wdGlvbnMgPSB6Q2xpZW50VXRpbC5kYXRlT3B0aW9ucztcbiAgICBcbiAgICAkc2NvcGUub3BlbiA9IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAkc2NvcGUub3BlbmVkID0gdHJ1ZTtcbiAgICB9O1xuICAgIFxuICAgICRzY29wZS51cGRhdGVLbm93bkFzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHpDbGllbnRVdGlsLnVwZGF0ZUtub3duQXMoJHNjb3BlLmNsaWVudCk7XG4gICAgfTtcbiAgICBcbiAgICAkc2NvcGUuY3JlYXRlQ2xpZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5pc1NhdmluZyA9IHRydWU7XG4gICAgICAgICRzY29wZS5jbGllbnRcbiAgICAgICAgICAgIC4kc2F2ZSgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjbGllbnQpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIubm90aWZ5KCdDbGllbnQgaXMgY3JlYXRlZCcpO1xuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvY2xpZW50cy8nICsgY2xpZW50Ll9pZCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignVW5hYmxlIHRvIGNyZWF0ZSBuZXcgcmVjb3JkOiAnICsgZXJyLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').controller('zClientNewDialogCtrl', ['$scope', '$modalInstance', '$modal', 'zNotifier', 'zClientUtil', 'zClient', function ($scope, $modalInstance, $modal, zNotifier, zClientUtil, zClient) {
    /* jshint newcap: false */
    $scope.client = new zClient({ status: 'active' });
    $scope.isSaving = false;
    $scope.dateOptions = zClientUtil.dateOptions;
    
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.updateKnownAs = function() {
        zClientUtil.updateKnownAs($scope.client);
    };
    
    $scope.createClient = function() {
        $scope.isSaving = true;
        $scope.client
            .$save()
            .then(function(client) {
                zNotifier.notify('Client is created');
                $modalInstance.close(client);
            })
            .catch(function(err) {
                zNotifier.error('Unable to create new record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
    
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jbGllbnRzL3pDbGllbnROZXdEaWFsb2dDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcsc0dBQXdCLFVBQVUsUUFBUSxnQkFBZ0IsUUFBUSxXQUFXLGFBQWEsU0FBUzs7SUFFaEksT0FBTyxTQUFTLElBQUksUUFBUSxFQUFFLFFBQVE7SUFDdEMsT0FBTyxXQUFXO0lBQ2xCLE9BQU8sY0FBYyxZQUFZOztJQUVqQyxPQUFPLE9BQU8sU0FBUyxRQUFRO1FBQzNCLE9BQU87UUFDUCxPQUFPO1FBQ1AsT0FBTyxTQUFTOzs7SUFHcEIsT0FBTyxnQkFBZ0IsV0FBVztRQUM5QixZQUFZLGNBQWMsT0FBTzs7O0lBR3JDLE9BQU8sZUFBZSxXQUFXO1FBQzdCLE9BQU8sV0FBVztRQUNsQixPQUFPO2FBQ0Y7YUFDQSxLQUFLLFNBQVMsUUFBUTtnQkFDbkIsVUFBVSxPQUFPO2dCQUNqQixlQUFlLE1BQU07O2FBRXhCLE1BQU0sU0FBUyxLQUFLO2dCQUNqQixVQUFVLE1BQU0sa0NBQWtDLElBQUksS0FBSzs7YUFFOUQsUUFBUSxXQUFXO2dCQUNoQixPQUFPLFdBQVc7Ozs7SUFJOUIsT0FBTyxTQUFTLFlBQVk7UUFDeEIsZUFBZSxRQUFROzs7QUFHL0IiLCJmaWxlIjoiY29udHJvbGxlcnMvZGFzaGJvYXJkL2NsaWVudHMvekNsaWVudE5ld0RpYWxvZ0N0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignekNsaWVudE5ld0RpYWxvZ0N0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCAkbW9kYWxJbnN0YW5jZSwgJG1vZGFsLCB6Tm90aWZpZXIsIHpDbGllbnRVdGlsLCB6Q2xpZW50KSB7XG4gICAgLyoganNoaW50IG5ld2NhcDogZmFsc2UgKi9cbiAgICAkc2NvcGUuY2xpZW50ID0gbmV3IHpDbGllbnQoeyBzdGF0dXM6ICdhY3RpdmUnIH0pO1xuICAgICRzY29wZS5pc1NhdmluZyA9IGZhbHNlO1xuICAgICRzY29wZS5kYXRlT3B0aW9ucyA9IHpDbGllbnRVdGlsLmRhdGVPcHRpb25zO1xuICAgIFxuICAgICRzY29wZS5vcGVuID0gZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICRzY29wZS5vcGVuZWQgPSB0cnVlO1xuICAgIH07XG5cbiAgICAkc2NvcGUudXBkYXRlS25vd25BcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB6Q2xpZW50VXRpbC51cGRhdGVLbm93bkFzKCRzY29wZS5jbGllbnQpO1xuICAgIH07XG4gICAgXG4gICAgJHNjb3BlLmNyZWF0ZUNsaWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuaXNTYXZpbmcgPSB0cnVlO1xuICAgICAgICAkc2NvcGUuY2xpZW50XG4gICAgICAgICAgICAuJHNhdmUoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oY2xpZW50KSB7XG4gICAgICAgICAgICAgICAgek5vdGlmaWVyLm5vdGlmeSgnQ2xpZW50IGlzIGNyZWF0ZWQnKTtcbiAgICAgICAgICAgICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZShjbGllbnQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIuZXJyb3IoJ1VuYWJsZSB0byBjcmVhdGUgbmV3IHJlY29yZDogJyArIGVyci5kYXRhLnJlYXNvbik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzU2F2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuICAgIFxuICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRtb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xuICAgIH07XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').factory('zClientUtil', function() {
    return {
        dateOptions: {
            formatYear: 'yy',
            startingDate: 1
        },
        
        updateKnownAs: function(client) {
            if (!client.knownAs && client.firstName) {
                client.knownAs = client.firstName;
            }
        }
    };
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jbGllbnRzL3pDbGllbnRVdGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFFBQVEsZUFBZSxXQUFXO0lBQ3BELE9BQU87UUFDSCxhQUFhO1lBQ1QsWUFBWTtZQUNaLGNBQWM7OztRQUdsQixlQUFlLFNBQVMsUUFBUTtZQUM1QixJQUFJLENBQUMsT0FBTyxXQUFXLE9BQU8sV0FBVztnQkFDckMsT0FBTyxVQUFVLE9BQU87Ozs7O0FBS3hDIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jbGllbnRzL3pDbGllbnRVdGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ3pDbGllbnRVdGlsJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGF0ZU9wdGlvbnM6IHtcbiAgICAgICAgICAgIGZvcm1hdFllYXI6ICd5eScsXG4gICAgICAgICAgICBzdGFydGluZ0RhdGU6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIHVwZGF0ZUtub3duQXM6IGZ1bmN0aW9uKGNsaWVudCkge1xuICAgICAgICAgICAgaWYgKCFjbGllbnQua25vd25BcyAmJiBjbGllbnQuZmlyc3ROYW1lKSB7XG4gICAgICAgICAgICAgICAgY2xpZW50Lmtub3duQXMgPSBjbGllbnQuZmlyc3ROYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').controller('zCallEditCtrl', ['$scope', function($scope) {
    $scope.event = {
        Id: 123456,
        eventDate: new Date('2014/06/28 10:00'),
        eventType: 'Admin call',
        eventStatus: 'Unread',
        eventSummary: '',
        clientId: 987654,
        clientName: 'Fiona Sawyer',
        createdById: '123456',
        createdByName: 'Dr Richard',
        relatedToSps: ['123456'],
        subject: '',
        body: '',
        numbers: [{
            number: '123456',
            state: 'ready'
        }, {
            number: '987654',
            state: 'ready'
        }]
    };

    $scope.callNumber = function(number) {
        if (number.state === 'ready')
        {
            number.state = 'calling';
            $scope.callStatus='Calling '+ number.number + '...';
        }
        else{
            number.state = 'ready';
            $scope.callStatus='';
        }
    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jb21tdW5pY2F0aW9uL3pDYWxsRWRpdEN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sV0FBVyw0QkFBaUIsU0FBUyxRQUFRO0lBQy9ELE9BQU8sUUFBUTtRQUNYLElBQUk7UUFDSixXQUFXLElBQUksS0FBSztRQUNwQixXQUFXO1FBQ1gsYUFBYTtRQUNiLGNBQWM7UUFDZCxVQUFVO1FBQ1YsWUFBWTtRQUNaLGFBQWE7UUFDYixlQUFlO1FBQ2YsY0FBYyxDQUFDO1FBQ2YsU0FBUztRQUNULE1BQU07UUFDTixTQUFTLENBQUM7WUFDTixRQUFRO1lBQ1IsT0FBTztXQUNSO1lBQ0MsUUFBUTtZQUNSLE9BQU87Ozs7SUFJZixPQUFPLGFBQWEsU0FBUyxRQUFRO1FBQ2pDLElBQUksT0FBTyxVQUFVO1FBQ3JCO1lBQ0ksT0FBTyxRQUFRO1lBQ2YsT0FBTyxXQUFXLFlBQVksT0FBTyxTQUFTOztZQUU5QztZQUNBLE9BQU8sUUFBUTtZQUNmLE9BQU8sV0FBVzs7O0lBRzNCIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jb21tdW5pY2F0aW9uL3pDYWxsRWRpdEN0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignekNhbGxFZGl0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICRzY29wZS5ldmVudCA9IHtcbiAgICAgICAgSWQ6IDEyMzQ1NixcbiAgICAgICAgZXZlbnREYXRlOiBuZXcgRGF0ZSgnMjAxNC8wNi8yOCAxMDowMCcpLFxuICAgICAgICBldmVudFR5cGU6ICdBZG1pbiBjYWxsJyxcbiAgICAgICAgZXZlbnRTdGF0dXM6ICdVbnJlYWQnLFxuICAgICAgICBldmVudFN1bW1hcnk6ICcnLFxuICAgICAgICBjbGllbnRJZDogOTg3NjU0LFxuICAgICAgICBjbGllbnROYW1lOiAnRmlvbmEgU2F3eWVyJyxcbiAgICAgICAgY3JlYXRlZEJ5SWQ6ICcxMjM0NTYnLFxuICAgICAgICBjcmVhdGVkQnlOYW1lOiAnRHIgUmljaGFyZCcsXG4gICAgICAgIHJlbGF0ZWRUb1NwczogWycxMjM0NTYnXSxcbiAgICAgICAgc3ViamVjdDogJycsXG4gICAgICAgIGJvZHk6ICcnLFxuICAgICAgICBudW1iZXJzOiBbe1xuICAgICAgICAgICAgbnVtYmVyOiAnMTIzNDU2JyxcbiAgICAgICAgICAgIHN0YXRlOiAncmVhZHknXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG51bWJlcjogJzk4NzY1NCcsXG4gICAgICAgICAgICBzdGF0ZTogJ3JlYWR5J1xuICAgICAgICB9XVxuICAgIH07XG5cbiAgICAkc2NvcGUuY2FsbE51bWJlciA9IGZ1bmN0aW9uKG51bWJlcikge1xuICAgICAgICBpZiAobnVtYmVyLnN0YXRlID09PSAncmVhZHknKVxuICAgICAgICB7XG4gICAgICAgICAgICBudW1iZXIuc3RhdGUgPSAnY2FsbGluZyc7XG4gICAgICAgICAgICAkc2NvcGUuY2FsbFN0YXR1cz0nQ2FsbGluZyAnKyBudW1iZXIubnVtYmVyICsgJy4uLic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIG51bWJlci5zdGF0ZSA9ICdyZWFkeSc7XG4gICAgICAgICAgICAkc2NvcGUuY2FsbFN0YXR1cz0nJztcbiAgICAgICAgfVxuICAgIH07XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').controller('zEventDetailCtrl', ['$scope', function($scope) {
    $scope.event = {
        Id: 123456,
        eventDate: new Date(),
        eventType: 'Email sent',
        eventStatus: 'Unread',
        eventSummary: 'email subject',
        clientId: 987654,
        clientName: 'Fiona Sawyer',
        spId: 123456,
        spName: 'Admin',
        subject:'email subject',
        body:'email body'
    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jb21tdW5pY2F0aW9uL3pFdmVudERldGFpbEN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sV0FBVywrQkFBb0IsU0FBUyxRQUFRO0lBQ2xFLE9BQU8sUUFBUTtRQUNYLElBQUk7UUFDSixXQUFXLElBQUk7UUFDZixXQUFXO1FBQ1gsYUFBYTtRQUNiLGNBQWM7UUFDZCxVQUFVO1FBQ1YsWUFBWTtRQUNaLE1BQU07UUFDTixRQUFRO1FBQ1IsUUFBUTtRQUNSLEtBQUs7O0lBRVYiLCJmaWxlIjoiY29udHJvbGxlcnMvZGFzaGJvYXJkL2NvbW11bmljYXRpb24vekV2ZW50RGV0YWlsQ3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCd6RXZlbnREZXRhaWxDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgJHNjb3BlLmV2ZW50ID0ge1xuICAgICAgICBJZDogMTIzNDU2LFxuICAgICAgICBldmVudERhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgIGV2ZW50VHlwZTogJ0VtYWlsIHNlbnQnLFxuICAgICAgICBldmVudFN0YXR1czogJ1VucmVhZCcsXG4gICAgICAgIGV2ZW50U3VtbWFyeTogJ2VtYWlsIHN1YmplY3QnLFxuICAgICAgICBjbGllbnRJZDogOTg3NjU0LFxuICAgICAgICBjbGllbnROYW1lOiAnRmlvbmEgU2F3eWVyJyxcbiAgICAgICAgc3BJZDogMTIzNDU2LFxuICAgICAgICBzcE5hbWU6ICdBZG1pbicsXG4gICAgICAgIHN1YmplY3Q6J2VtYWlsIHN1YmplY3QnLFxuICAgICAgICBib2R5OidlbWFpbCBib2R5J1xuICAgIH07XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').controller('zEventEditCtrl', ['$scope', function($scope) {
    $scope.event = {
        Id: 123456,
        eventDate: new Date('2014/06/28 10:00'),
        eventType: 'Admin note',
        eventStatus: 'Unread',
        eventSummary: '',
        clientId: 987654,
        clientName: 'Fiona Sawyer',
        createdById: '123456',
        createdByName: 'Dr Richard',
        relatedToSps: ['123456'],
        subject:'',
        body:''
    };

    // $scope.$watch('files', function () {
 //        $scope.upload($scope.files);
 //    });

 //    $scope.upload = function (files) {
 //        if (files && files.length) {
 //            for (var i = 0; i < files.length; i++) {
 //                var file = files[i];
 //                Upload.upload({
 //                    url: 'upload/url',
 //                    fields: {'username': $scope.username},
 //                    file: file
 //                }).progress(function (evt) {
 //                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
 //                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
 //                }).success(function (data, status, headers, config) {
 //                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
 //                });
 //            }
 //        }
 //    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jb21tdW5pY2F0aW9uL3pFdmVudEVkaXRDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcsNkJBQWtCLFNBQVMsUUFBUTtJQUNoRSxPQUFPLFFBQVE7UUFDWCxJQUFJO1FBQ0osV0FBVyxJQUFJLEtBQUs7UUFDcEIsV0FBVztRQUNYLGFBQWE7UUFDYixjQUFjO1FBQ2QsVUFBVTtRQUNWLFlBQVk7UUFDWixhQUFhO1FBQ2IsZUFBZTtRQUNmLGNBQWMsQ0FBQztRQUNmLFFBQVE7UUFDUixLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF3QlYiLCJmaWxlIjoiY29udHJvbGxlcnMvZGFzaGJvYXJkL2NvbW11bmljYXRpb24vekV2ZW50RWRpdEN0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignekV2ZW50RWRpdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAkc2NvcGUuZXZlbnQgPSB7XG4gICAgICAgIElkOiAxMjM0NTYsXG4gICAgICAgIGV2ZW50RGF0ZTogbmV3IERhdGUoJzIwMTQvMDYvMjggMTA6MDAnKSxcbiAgICAgICAgZXZlbnRUeXBlOiAnQWRtaW4gbm90ZScsXG4gICAgICAgIGV2ZW50U3RhdHVzOiAnVW5yZWFkJyxcbiAgICAgICAgZXZlbnRTdW1tYXJ5OiAnJyxcbiAgICAgICAgY2xpZW50SWQ6IDk4NzY1NCxcbiAgICAgICAgY2xpZW50TmFtZTogJ0Zpb25hIFNhd3llcicsXG4gICAgICAgIGNyZWF0ZWRCeUlkOiAnMTIzNDU2JyxcbiAgICAgICAgY3JlYXRlZEJ5TmFtZTogJ0RyIFJpY2hhcmQnLFxuICAgICAgICByZWxhdGVkVG9TcHM6IFsnMTIzNDU2J10sXG4gICAgICAgIHN1YmplY3Q6JycsXG4gICAgICAgIGJvZHk6JydcbiAgICB9O1xuXG4gICAgLy8gJHNjb3BlLiR3YXRjaCgnZmlsZXMnLCBmdW5jdGlvbiAoKSB7XG4gLy8gICAgICAgICRzY29wZS51cGxvYWQoJHNjb3BlLmZpbGVzKTtcbiAvLyAgICB9KTtcblxuIC8vICAgICRzY29wZS51cGxvYWQgPSBmdW5jdGlvbiAoZmlsZXMpIHtcbiAvLyAgICAgICAgaWYgKGZpbGVzICYmIGZpbGVzLmxlbmd0aCkge1xuIC8vICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuIC8vICAgICAgICAgICAgICAgIHZhciBmaWxlID0gZmlsZXNbaV07XG4gLy8gICAgICAgICAgICAgICAgVXBsb2FkLnVwbG9hZCh7XG4gLy8gICAgICAgICAgICAgICAgICAgIHVybDogJ3VwbG9hZC91cmwnLFxuIC8vICAgICAgICAgICAgICAgICAgICBmaWVsZHM6IHsndXNlcm5hbWUnOiAkc2NvcGUudXNlcm5hbWV9LFxuIC8vICAgICAgICAgICAgICAgICAgICBmaWxlOiBmaWxlXG4gLy8gICAgICAgICAgICAgICAgfSkucHJvZ3Jlc3MoZnVuY3Rpb24gKGV2dCkge1xuIC8vICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3NQZXJjZW50YWdlID0gcGFyc2VJbnQoMTAwLjAgKiBldnQubG9hZGVkIC8gZXZ0LnRvdGFsKTtcbiAvLyAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Byb2dyZXNzOiAnICsgcHJvZ3Jlc3NQZXJjZW50YWdlICsgJyUgJyArIGV2dC5jb25maWcuZmlsZS5uYW1lKTtcbiAvLyAgICAgICAgICAgICAgICB9KS5zdWNjZXNzKGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuIC8vICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmlsZSAnICsgY29uZmlnLmZpbGUubmFtZSArICd1cGxvYWRlZC4gUmVzcG9uc2U6ICcgKyBkYXRhKTtcbiAvLyAgICAgICAgICAgICAgICB9KTtcbiAvLyAgICAgICAgICAgIH1cbiAvLyAgICAgICAgfVxuIC8vICAgIH07XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').controller('zEventEditUserMessageCtrl', ['$scope', function($scope) {

    $scope.event = {
        id: 123456,
        to: {
            id: 12346,
            name: 'Sian'
        },
        eventDate: new Date(),
        eventType: 'User message',
        eventStatus: 'Unread',
        eventSummary: '',
        clientId: '',
        clientName: '',
        createdById: '123456',
        createdByName: 'Dr Richard',
        relatedToSps: [],
        note: '',
        extendedNote: ''
    };



}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jb21tdW5pY2F0aW9uL3pFdmVudEVkaXRVc2VyTWVzc2FnZUN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sV0FBVyx3Q0FBNkIsU0FBUyxRQUFROztJQUUzRSxPQUFPLFFBQVE7UUFDWCxJQUFJO1FBQ0osSUFBSTtZQUNBLElBQUk7WUFDSixNQUFNOztRQUVWLFdBQVcsSUFBSTtRQUNmLFdBQVc7UUFDWCxhQUFhO1FBQ2IsY0FBYztRQUNkLFVBQVU7UUFDVixZQUFZO1FBQ1osYUFBYTtRQUNiLGVBQWU7UUFDZixjQUFjO1FBQ2QsTUFBTTtRQUNOLGNBQWM7Ozs7O0lBS25CIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jb21tdW5pY2F0aW9uL3pFdmVudEVkaXRVc2VyTWVzc2FnZUN0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignekV2ZW50RWRpdFVzZXJNZXNzYWdlQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSkge1xuXG4gICAgJHNjb3BlLmV2ZW50ID0ge1xuICAgICAgICBpZDogMTIzNDU2LFxuICAgICAgICB0bzoge1xuICAgICAgICAgICAgaWQ6IDEyMzQ2LFxuICAgICAgICAgICAgbmFtZTogJ1NpYW4nXG4gICAgICAgIH0sXG4gICAgICAgIGV2ZW50RGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgZXZlbnRUeXBlOiAnVXNlciBtZXNzYWdlJyxcbiAgICAgICAgZXZlbnRTdGF0dXM6ICdVbnJlYWQnLFxuICAgICAgICBldmVudFN1bW1hcnk6ICcnLFxuICAgICAgICBjbGllbnRJZDogJycsXG4gICAgICAgIGNsaWVudE5hbWU6ICcnLFxuICAgICAgICBjcmVhdGVkQnlJZDogJzEyMzQ1NicsXG4gICAgICAgIGNyZWF0ZWRCeU5hbWU6ICdEciBSaWNoYXJkJyxcbiAgICAgICAgcmVsYXRlZFRvU3BzOiBbXSxcbiAgICAgICAgbm90ZTogJycsXG4gICAgICAgIGV4dGVuZGVkTm90ZTogJydcbiAgICB9O1xuXG5cblxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
/// <reference path="../../../../../typings/angularjs/angular.d.ts"/>
angular.module('app').controller('zEventListCtrl', ['$scope', function($scope) {
    /* jshint maxlen: 160 */
    $scope.btnLabel = 'Show Unread';
    $scope.btnUnreadClick = function(){
//        console.log($scope.unreadFilter);
        if ($scope.btnLabel === 'Show Unread'){
            $scope.btnLabel = 'Show All';
            if (! $scope.searchClient) {
                $scope.searchClient = {};
            }
            $scope.searchClient.eventStatus='unread';
        } else {
            $scope.btnLabel = 'Show Unread';
            $scope.searchClient.eventStatus='';
        }
    };
    
    $scope.clearFilters = function(){
        $scope.searchClient={};
        $scope.btnLabel = 'Show Unread';
    };
    
    $scope.searchByClient = function(clientName){
        if (!$scope.searchClient) {
            $scope.searchClient = {};
        }
        $scope.searchClient.clientName = clientName;
    };

    $scope.searchByType = function(eventType){
        if (! $scope.searchClient) {
            $scope.searchClient = {};
        }
        $scope.searchClient.eventType = eventType;
    };

    $scope.events = [
        {
            id: 123456,
            eventDate: new Date('2014/06/28 10:00'), 
            eventType: 'Email received', 
            eventStatus: 'Unread',
            eventSummary: 'Can you change that appointment to 6pm?',
            clientId: 987654, 
            clientName: 'Fiona Sawyer', 
            spId: 123456,
            spName: 'Admin'
        },
        {
            id: 123456,
            eventDate: new Date('2014/06/28 10:00'), 
            eventType: 'Email sent', 
            eventStatus: 'Sending',
            eventSummary: 'Have you got that diet diary for me?',
            clientId: 987654, 
            clientName: 'John Doe', 
            spName: 'Sian'
        },
        {
            id: 123456,
            eventDate: new Date('2014/06/28 10:00'), 
            eventType: 'Email sent', 
            eventStatus: 'Failed',
            eventSummary: 'Some other message',
            clientId: 987654, 
            clientName: 'John Doe', 
            spName: 'Sian'
        },
        {
            id: 123456,
            eventDate: new Date('2014/06/28 10:00'), 
            eventType: 'SMS received', 
            eventStatus: 'Read',
            eventSummary: 'Sure. All done.',
            clientId: 987654, 
            clientName: 'Fiona Sawyer', 
            spName: 'Admin'
        },
        {
            id: 123456,
            eventDate: new Date('2014/06/28 10:00'), 
            eventType: 'Call received', 
            eventStatus: '',
            eventSummary: 'Made appointment for son Peter',
            clientId: 987654, 
            clientName: 'Jane Doe', 
            spName: 'Admin'
        },
        {
            id: 123456,
            eventDate: new Date('2014/06/28 10:00'), 
            eventType: 'Document', 
            eventStatus: 'Unread',
            eventSummary: 'Exam adult',
            clientId: 987654, 
            clientName: 'Peter Doe', 
            spName: 'Dr Richard'
        },
        {
            id: 123456,
            eventDate: new Date('2014/06/28 10:00'), 
            eventType: 'Service note', 
            eventStatus: '',
            eventSummary: 'Presented for weightloss. Gave IP program.',
            clientId: 987654, 
            clientName: 'Jess Smith', 
            spName: 'Sian'
        }        
    ];
    
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jb21tdW5pY2F0aW9uL3pFdmVudExpc3RDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsUUFBUSxPQUFPLE9BQU8sV0FBVyw2QkFBa0IsU0FBUyxRQUFROztJQUVoRSxPQUFPLFdBQVc7SUFDbEIsT0FBTyxpQkFBaUIsVUFBVTs7UUFFOUIsSUFBSSxPQUFPLGFBQWEsY0FBYztZQUNsQyxPQUFPLFdBQVc7WUFDbEIsSUFBSSxFQUFFLE9BQU8sY0FBYztnQkFDdkIsT0FBTyxlQUFlOztZQUUxQixPQUFPLGFBQWEsWUFBWTtlQUM3QjtZQUNILE9BQU8sV0FBVztZQUNsQixPQUFPLGFBQWEsWUFBWTs7OztJQUl4QyxPQUFPLGVBQWUsVUFBVTtRQUM1QixPQUFPLGFBQWE7UUFDcEIsT0FBTyxXQUFXOzs7SUFHdEIsT0FBTyxpQkFBaUIsU0FBUyxXQUFXO1FBQ3hDLElBQUksQ0FBQyxPQUFPLGNBQWM7WUFDdEIsT0FBTyxlQUFlOztRQUUxQixPQUFPLGFBQWEsYUFBYTs7O0lBR3JDLE9BQU8sZUFBZSxTQUFTLFVBQVU7UUFDckMsSUFBSSxFQUFFLE9BQU8sY0FBYztZQUN2QixPQUFPLGVBQWU7O1FBRTFCLE9BQU8sYUFBYSxZQUFZOzs7SUFHcEMsT0FBTyxTQUFTO1FBQ1o7WUFDSSxJQUFJO1lBQ0osV0FBVyxJQUFJLEtBQUs7WUFDcEIsV0FBVztZQUNYLGFBQWE7WUFDYixjQUFjO1lBQ2QsVUFBVTtZQUNWLFlBQVk7WUFDWixNQUFNO1lBQ04sUUFBUTs7UUFFWjtZQUNJLElBQUk7WUFDSixXQUFXLElBQUksS0FBSztZQUNwQixXQUFXO1lBQ1gsYUFBYTtZQUNiLGNBQWM7WUFDZCxVQUFVO1lBQ1YsWUFBWTtZQUNaLFFBQVE7O1FBRVo7WUFDSSxJQUFJO1lBQ0osV0FBVyxJQUFJLEtBQUs7WUFDcEIsV0FBVztZQUNYLGFBQWE7WUFDYixjQUFjO1lBQ2QsVUFBVTtZQUNWLFlBQVk7WUFDWixRQUFROztRQUVaO1lBQ0ksSUFBSTtZQUNKLFdBQVcsSUFBSSxLQUFLO1lBQ3BCLFdBQVc7WUFDWCxhQUFhO1lBQ2IsY0FBYztZQUNkLFVBQVU7WUFDVixZQUFZO1lBQ1osUUFBUTs7UUFFWjtZQUNJLElBQUk7WUFDSixXQUFXLElBQUksS0FBSztZQUNwQixXQUFXO1lBQ1gsYUFBYTtZQUNiLGNBQWM7WUFDZCxVQUFVO1lBQ1YsWUFBWTtZQUNaLFFBQVE7O1FBRVo7WUFDSSxJQUFJO1lBQ0osV0FBVyxJQUFJLEtBQUs7WUFDcEIsV0FBVztZQUNYLGFBQWE7WUFDYixjQUFjO1lBQ2QsVUFBVTtZQUNWLFlBQVk7WUFDWixRQUFROztRQUVaO1lBQ0ksSUFBSTtZQUNKLFdBQVcsSUFBSSxLQUFLO1lBQ3BCLFdBQVc7WUFDWCxhQUFhO1lBQ2IsY0FBYztZQUNkLFVBQVU7WUFDVixZQUFZO1lBQ1osUUFBUTs7OztJQUlqQiIsImZpbGUiOiJjb250cm9sbGVycy9kYXNoYm9hcmQvY29tbXVuaWNhdGlvbi96RXZlbnRMaXN0Q3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJqcy9hbmd1bGFyLmQudHNcIi8+XG5hbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignekV2ZW50TGlzdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAvKiBqc2hpbnQgbWF4bGVuOiAxNjAgKi9cbiAgICAkc2NvcGUuYnRuTGFiZWwgPSAnU2hvdyBVbnJlYWQnO1xuICAgICRzY29wZS5idG5VbnJlYWRDbGljayA9IGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnVucmVhZEZpbHRlcik7XG4gICAgICAgIGlmICgkc2NvcGUuYnRuTGFiZWwgPT09ICdTaG93IFVucmVhZCcpe1xuICAgICAgICAgICAgJHNjb3BlLmJ0bkxhYmVsID0gJ1Nob3cgQWxsJztcbiAgICAgICAgICAgIGlmICghICRzY29wZS5zZWFyY2hDbGllbnQpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VhcmNoQ2xpZW50ID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkc2NvcGUuc2VhcmNoQ2xpZW50LmV2ZW50U3RhdHVzPSd1bnJlYWQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHNjb3BlLmJ0bkxhYmVsID0gJ1Nob3cgVW5yZWFkJztcbiAgICAgICAgICAgICRzY29wZS5zZWFyY2hDbGllbnQuZXZlbnRTdGF0dXM9Jyc7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgICRzY29wZS5jbGVhckZpbHRlcnMgPSBmdW5jdGlvbigpe1xuICAgICAgICAkc2NvcGUuc2VhcmNoQ2xpZW50PXt9O1xuICAgICAgICAkc2NvcGUuYnRuTGFiZWwgPSAnU2hvdyBVbnJlYWQnO1xuICAgIH07XG4gICAgXG4gICAgJHNjb3BlLnNlYXJjaEJ5Q2xpZW50ID0gZnVuY3Rpb24oY2xpZW50TmFtZSl7XG4gICAgICAgIGlmICghJHNjb3BlLnNlYXJjaENsaWVudCkge1xuICAgICAgICAgICAgJHNjb3BlLnNlYXJjaENsaWVudCA9IHt9O1xuICAgICAgICB9XG4gICAgICAgICRzY29wZS5zZWFyY2hDbGllbnQuY2xpZW50TmFtZSA9IGNsaWVudE5hbWU7XG4gICAgfTtcblxuICAgICRzY29wZS5zZWFyY2hCeVR5cGUgPSBmdW5jdGlvbihldmVudFR5cGUpe1xuICAgICAgICBpZiAoISAkc2NvcGUuc2VhcmNoQ2xpZW50KSB7XG4gICAgICAgICAgICAkc2NvcGUuc2VhcmNoQ2xpZW50ID0ge307XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLnNlYXJjaENsaWVudC5ldmVudFR5cGUgPSBldmVudFR5cGU7XG4gICAgfTtcblxuICAgICRzY29wZS5ldmVudHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAxMjM0NTYsXG4gICAgICAgICAgICBldmVudERhdGU6IG5ldyBEYXRlKCcyMDE0LzA2LzI4IDEwOjAwJyksIFxuICAgICAgICAgICAgZXZlbnRUeXBlOiAnRW1haWwgcmVjZWl2ZWQnLCBcbiAgICAgICAgICAgIGV2ZW50U3RhdHVzOiAnVW5yZWFkJyxcbiAgICAgICAgICAgIGV2ZW50U3VtbWFyeTogJ0NhbiB5b3UgY2hhbmdlIHRoYXQgYXBwb2ludG1lbnQgdG8gNnBtPycsXG4gICAgICAgICAgICBjbGllbnRJZDogOTg3NjU0LCBcbiAgICAgICAgICAgIGNsaWVudE5hbWU6ICdGaW9uYSBTYXd5ZXInLCBcbiAgICAgICAgICAgIHNwSWQ6IDEyMzQ1NixcbiAgICAgICAgICAgIHNwTmFtZTogJ0FkbWluJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogMTIzNDU2LFxuICAgICAgICAgICAgZXZlbnREYXRlOiBuZXcgRGF0ZSgnMjAxNC8wNi8yOCAxMDowMCcpLCBcbiAgICAgICAgICAgIGV2ZW50VHlwZTogJ0VtYWlsIHNlbnQnLCBcbiAgICAgICAgICAgIGV2ZW50U3RhdHVzOiAnU2VuZGluZycsXG4gICAgICAgICAgICBldmVudFN1bW1hcnk6ICdIYXZlIHlvdSBnb3QgdGhhdCBkaWV0IGRpYXJ5IGZvciBtZT8nLFxuICAgICAgICAgICAgY2xpZW50SWQ6IDk4NzY1NCwgXG4gICAgICAgICAgICBjbGllbnROYW1lOiAnSm9obiBEb2UnLCBcbiAgICAgICAgICAgIHNwTmFtZTogJ1NpYW4nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAxMjM0NTYsXG4gICAgICAgICAgICBldmVudERhdGU6IG5ldyBEYXRlKCcyMDE0LzA2LzI4IDEwOjAwJyksIFxuICAgICAgICAgICAgZXZlbnRUeXBlOiAnRW1haWwgc2VudCcsIFxuICAgICAgICAgICAgZXZlbnRTdGF0dXM6ICdGYWlsZWQnLFxuICAgICAgICAgICAgZXZlbnRTdW1tYXJ5OiAnU29tZSBvdGhlciBtZXNzYWdlJyxcbiAgICAgICAgICAgIGNsaWVudElkOiA5ODc2NTQsIFxuICAgICAgICAgICAgY2xpZW50TmFtZTogJ0pvaG4gRG9lJywgXG4gICAgICAgICAgICBzcE5hbWU6ICdTaWFuJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogMTIzNDU2LFxuICAgICAgICAgICAgZXZlbnREYXRlOiBuZXcgRGF0ZSgnMjAxNC8wNi8yOCAxMDowMCcpLCBcbiAgICAgICAgICAgIGV2ZW50VHlwZTogJ1NNUyByZWNlaXZlZCcsIFxuICAgICAgICAgICAgZXZlbnRTdGF0dXM6ICdSZWFkJyxcbiAgICAgICAgICAgIGV2ZW50U3VtbWFyeTogJ1N1cmUuIEFsbCBkb25lLicsXG4gICAgICAgICAgICBjbGllbnRJZDogOTg3NjU0LCBcbiAgICAgICAgICAgIGNsaWVudE5hbWU6ICdGaW9uYSBTYXd5ZXInLCBcbiAgICAgICAgICAgIHNwTmFtZTogJ0FkbWluJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogMTIzNDU2LFxuICAgICAgICAgICAgZXZlbnREYXRlOiBuZXcgRGF0ZSgnMjAxNC8wNi8yOCAxMDowMCcpLCBcbiAgICAgICAgICAgIGV2ZW50VHlwZTogJ0NhbGwgcmVjZWl2ZWQnLCBcbiAgICAgICAgICAgIGV2ZW50U3RhdHVzOiAnJyxcbiAgICAgICAgICAgIGV2ZW50U3VtbWFyeTogJ01hZGUgYXBwb2ludG1lbnQgZm9yIHNvbiBQZXRlcicsXG4gICAgICAgICAgICBjbGllbnRJZDogOTg3NjU0LCBcbiAgICAgICAgICAgIGNsaWVudE5hbWU6ICdKYW5lIERvZScsIFxuICAgICAgICAgICAgc3BOYW1lOiAnQWRtaW4nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAxMjM0NTYsXG4gICAgICAgICAgICBldmVudERhdGU6IG5ldyBEYXRlKCcyMDE0LzA2LzI4IDEwOjAwJyksIFxuICAgICAgICAgICAgZXZlbnRUeXBlOiAnRG9jdW1lbnQnLCBcbiAgICAgICAgICAgIGV2ZW50U3RhdHVzOiAnVW5yZWFkJyxcbiAgICAgICAgICAgIGV2ZW50U3VtbWFyeTogJ0V4YW0gYWR1bHQnLFxuICAgICAgICAgICAgY2xpZW50SWQ6IDk4NzY1NCwgXG4gICAgICAgICAgICBjbGllbnROYW1lOiAnUGV0ZXIgRG9lJywgXG4gICAgICAgICAgICBzcE5hbWU6ICdEciBSaWNoYXJkJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogMTIzNDU2LFxuICAgICAgICAgICAgZXZlbnREYXRlOiBuZXcgRGF0ZSgnMjAxNC8wNi8yOCAxMDowMCcpLCBcbiAgICAgICAgICAgIGV2ZW50VHlwZTogJ1NlcnZpY2Ugbm90ZScsIFxuICAgICAgICAgICAgZXZlbnRTdGF0dXM6ICcnLFxuICAgICAgICAgICAgZXZlbnRTdW1tYXJ5OiAnUHJlc2VudGVkIGZvciB3ZWlnaHRsb3NzLiBHYXZlIElQIHByb2dyYW0uJyxcbiAgICAgICAgICAgIGNsaWVudElkOiA5ODc2NTQsIFxuICAgICAgICAgICAgY2xpZW50TmFtZTogJ0plc3MgU21pdGgnLCBcbiAgICAgICAgICAgIHNwTmFtZTogJ1NpYW4nXG4gICAgICAgIH0gICAgICAgIFxuICAgIF07XG4gICAgXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').controller('zListDetailCtrl', ['$scope', function($scope) {
    $scope.list = {
        id: '123456',
        name: 'Sian\'s active patients SMS',
        created: new Date('2001-01-01'),
        lastUsed: new Date('2001-01-01'),
        description: 'Active patients with Sian as practitioner for SMS',
        ageFrom: 16,
        ageTo: 'any',
        visitCountFrom: 1,
        visitCountTo: 'any',
        lastAppointment: 'custom',
        lastAppointmentFrom: 'any',
        lastAppointmentTo: 'any',
        pendingAppointment: 'today',
        pendingAppointmentFrom: 'any',
        pendingAppointmentTo: 'any',
        status: 'active',
        onePerEmail: false,
        onePerMobile: true,
        validMobile: true,
        validEmail: 'any'
    };

    $scope.clients = [{
        id: '123456',
        name: 'Joe Blow'
    }];
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jb21tdW5pY2F0aW9uL3pMaXN0RGV0YWlsQ3RybC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxXQUFXLDhCQUFtQixTQUFTLFFBQVE7SUFDakUsT0FBTyxPQUFPO1FBQ1YsSUFBSTtRQUNKLE1BQU07UUFDTixTQUFTLElBQUksS0FBSztRQUNsQixVQUFVLElBQUksS0FBSztRQUNuQixhQUFhO1FBQ2IsU0FBUztRQUNULE9BQU87UUFDUCxnQkFBZ0I7UUFDaEIsY0FBYztRQUNkLGlCQUFpQjtRQUNqQixxQkFBcUI7UUFDckIsbUJBQW1CO1FBQ25CLG9CQUFvQjtRQUNwQix3QkFBd0I7UUFDeEIsc0JBQXNCO1FBQ3RCLFFBQVE7UUFDUixhQUFhO1FBQ2IsY0FBYztRQUNkLGFBQWE7UUFDYixZQUFZOzs7SUFHaEIsT0FBTyxVQUFVLENBQUM7UUFDZCxJQUFJO1FBQ0osTUFBTTs7SUFFWCIsImZpbGUiOiJjb250cm9sbGVycy9kYXNoYm9hcmQvY29tbXVuaWNhdGlvbi96TGlzdERldGFpbEN0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignekxpc3REZXRhaWxDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgJHNjb3BlLmxpc3QgPSB7XG4gICAgICAgIGlkOiAnMTIzNDU2JyxcbiAgICAgICAgbmFtZTogJ1NpYW5cXCdzIGFjdGl2ZSBwYXRpZW50cyBTTVMnLFxuICAgICAgICBjcmVhdGVkOiBuZXcgRGF0ZSgnMjAwMS0wMS0wMScpLFxuICAgICAgICBsYXN0VXNlZDogbmV3IERhdGUoJzIwMDEtMDEtMDEnKSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdBY3RpdmUgcGF0aWVudHMgd2l0aCBTaWFuIGFzIHByYWN0aXRpb25lciBmb3IgU01TJyxcbiAgICAgICAgYWdlRnJvbTogMTYsXG4gICAgICAgIGFnZVRvOiAnYW55JyxcbiAgICAgICAgdmlzaXRDb3VudEZyb206IDEsXG4gICAgICAgIHZpc2l0Q291bnRUbzogJ2FueScsXG4gICAgICAgIGxhc3RBcHBvaW50bWVudDogJ2N1c3RvbScsXG4gICAgICAgIGxhc3RBcHBvaW50bWVudEZyb206ICdhbnknLFxuICAgICAgICBsYXN0QXBwb2ludG1lbnRUbzogJ2FueScsXG4gICAgICAgIHBlbmRpbmdBcHBvaW50bWVudDogJ3RvZGF5JyxcbiAgICAgICAgcGVuZGluZ0FwcG9pbnRtZW50RnJvbTogJ2FueScsXG4gICAgICAgIHBlbmRpbmdBcHBvaW50bWVudFRvOiAnYW55JyxcbiAgICAgICAgc3RhdHVzOiAnYWN0aXZlJyxcbiAgICAgICAgb25lUGVyRW1haWw6IGZhbHNlLFxuICAgICAgICBvbmVQZXJNb2JpbGU6IHRydWUsXG4gICAgICAgIHZhbGlkTW9iaWxlOiB0cnVlLFxuICAgICAgICB2YWxpZEVtYWlsOiAnYW55J1xuICAgIH07XG5cbiAgICAkc2NvcGUuY2xpZW50cyA9IFt7XG4gICAgICAgIGlkOiAnMTIzNDU2JyxcbiAgICAgICAgbmFtZTogJ0pvZSBCbG93J1xuICAgIH1dO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
/// <reference path="../../../../../typings/angularjs/angular.d.ts"/>
angular.module('app').controller('zListListCtrl', ['$scope', function($scope) {
    $scope.lists=[{
        id: '123456',
        created: new Date('2001-01-01'),
        lastUsed: new Date('2001-01-01'),
        type: 'Client',
        description: 'Sian\'s active patients SMS'
    }];
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jb21tdW5pY2F0aW9uL3pMaXN0TGlzdEN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxRQUFRLE9BQU8sT0FBTyxXQUFXLDRCQUFpQixTQUFTLFFBQVE7SUFDL0QsT0FBTyxNQUFNLENBQUM7UUFDVixJQUFJO1FBQ0osU0FBUyxJQUFJLEtBQUs7UUFDbEIsVUFBVSxJQUFJLEtBQUs7UUFDbkIsTUFBTTtRQUNOLGFBQWE7O0lBRWxCIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jb21tdW5pY2F0aW9uL3pMaXN0TGlzdEN0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vLi4vLi4vdHlwaW5ncy9hbmd1bGFyanMvYW5ndWxhci5kLnRzXCIvPlxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ3pMaXN0TGlzdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAkc2NvcGUubGlzdHM9W3tcbiAgICAgICAgaWQ6ICcxMjM0NTYnLFxuICAgICAgICBjcmVhdGVkOiBuZXcgRGF0ZSgnMjAwMS0wMS0wMScpLFxuICAgICAgICBsYXN0VXNlZDogbmV3IERhdGUoJzIwMDEtMDEtMDEnKSxcbiAgICAgICAgdHlwZTogJ0NsaWVudCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2lhblxcJ3MgYWN0aXZlIHBhdGllbnRzIFNNUydcbiAgICB9XTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
/// <reference path="../../../../../typings/angularjs/angular.d.ts"/>
angular.module('app').controller('zMessageSendCtrl', ['$scope', '$sce', function($scope, $sce) {
    $scope.messageType = 'Email';
    $scope.sendMode = 'Single';
    $scope.listCounter = '1 of 50';

    $scope.template = {
        id: 123456,
        created: new Date('2015/1/3'),
        lastUsed: new Date('2015/3/12'),
        templateType: 'SMS',
        description: 'Appointment reminder',
        subject: 'Email for client.firstName',
        body: 'Reminder from site.name. ' +
            'Your appointment.type is appointment.friendlyTimespan at appointment.start. ' +
            'Text "yes" to confirm. Call to reschedule.',
        attachment: ''
    };

    $scope.clients = [];
    $scope.client = function() {
        if ($scope.clients.length !== undefined) {
            return $scope.clients[0];
        }
    };

    $scope.templateType = {};
    $scope.templateTypes = [{
        name: 'SMS'
    }, {
        name: 'Email'
    }];

    $scope.smsCount = function() {
        if ($scope.template.body.length === 0) {
            return 0;
        }
        var count = Math.floor($scope.template.body.length / 159) + 1;
        return count;
    };


    $scope.trustAsHtml = function(value) {
        return $sce.trustAsHtml(value);
    };

    $scope.areaConfig = {
        autocomplete: [{
            words: [
                'site.name',
                'client.title',
                'client.knownAs',
                'client.firstName',
                'client.lastName',
                'client.dob',
                'client.address',
                'client.email',
                'client.mobile',
                'client.phone',
                'client.occupation',
                'client.hobbies'
            ],
            cssClass: 'text-success font-italic',
            autocompleteOnSpace: false
        }, {
            words: [
                'site.name'
            ],
            cssClass: 'text-danger font-italic',
            autocompleteOnSpace: false
        }, {
            words: [
                'appointment.type',
                'appointment.resources',
                'appointment.status',
                'appointment.start',
                'appointment.friendlyTimespan',
                'appointment.duration'
            ],
            cssClass: 'text-warning font-italic',
            autocompleteOnSpace: false
        }]
    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jb21tdW5pY2F0aW9uL3pNZXNzYWdlU2VuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBLFFBQVEsT0FBTyxPQUFPLFdBQVcsdUNBQW9CLFNBQVMsUUFBUSxNQUFNO0lBQ3hFLE9BQU8sY0FBYztJQUNyQixPQUFPLFdBQVc7SUFDbEIsT0FBTyxjQUFjOztJQUVyQixPQUFPLFdBQVc7UUFDZCxJQUFJO1FBQ0osU0FBUyxJQUFJLEtBQUs7UUFDbEIsVUFBVSxJQUFJLEtBQUs7UUFDbkIsY0FBYztRQUNkLGFBQWE7UUFDYixTQUFTO1FBQ1QsTUFBTTtZQUNGO1lBQ0E7UUFDSixZQUFZOzs7SUFHaEIsT0FBTyxVQUFVO0lBQ2pCLE9BQU8sU0FBUyxXQUFXO1FBQ3ZCLElBQUksT0FBTyxRQUFRLFdBQVcsV0FBVztZQUNyQyxPQUFPLE9BQU8sUUFBUTs7OztJQUk5QixPQUFPLGVBQWU7SUFDdEIsT0FBTyxnQkFBZ0IsQ0FBQztRQUNwQixNQUFNO09BQ1A7UUFDQyxNQUFNOzs7SUFHVixPQUFPLFdBQVcsV0FBVztRQUN6QixJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsR0FBRztZQUNuQyxPQUFPOztRQUVYLElBQUksUUFBUSxLQUFLLE1BQU0sT0FBTyxTQUFTLEtBQUssU0FBUyxPQUFPO1FBQzVELE9BQU87Ozs7SUFJWCxPQUFPLGNBQWMsU0FBUyxPQUFPO1FBQ2pDLE9BQU8sS0FBSyxZQUFZOzs7SUFHNUIsT0FBTyxhQUFhO1FBQ2hCLGNBQWMsQ0FBQztZQUNYLE9BQU87Z0JBQ0g7Z0JBQ0E7Z0JBQ0E7Z0JBQ0E7Z0JBQ0E7Z0JBQ0E7Z0JBQ0E7Z0JBQ0E7Z0JBQ0E7Z0JBQ0E7Z0JBQ0E7Z0JBQ0E7O1lBRUosVUFBVTtZQUNWLHFCQUFxQjtXQUN0QjtZQUNDLE9BQU87Z0JBQ0g7O1lBRUosVUFBVTtZQUNWLHFCQUFxQjtXQUN0QjtZQUNDLE9BQU87Z0JBQ0g7Z0JBQ0E7Z0JBQ0E7Z0JBQ0E7Z0JBQ0E7Z0JBQ0E7O1lBRUosVUFBVTtZQUNWLHFCQUFxQjs7O0lBRzlCIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jb21tdW5pY2F0aW9uL3pNZXNzYWdlU2VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJqcy9hbmd1bGFyLmQudHNcIi8+XG5hbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignek1lc3NhZ2VTZW5kQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHNjZSkge1xuICAgICRzY29wZS5tZXNzYWdlVHlwZSA9ICdFbWFpbCc7XG4gICAgJHNjb3BlLnNlbmRNb2RlID0gJ1NpbmdsZSc7XG4gICAgJHNjb3BlLmxpc3RDb3VudGVyID0gJzEgb2YgNTAnO1xuXG4gICAgJHNjb3BlLnRlbXBsYXRlID0ge1xuICAgICAgICBpZDogMTIzNDU2LFxuICAgICAgICBjcmVhdGVkOiBuZXcgRGF0ZSgnMjAxNS8xLzMnKSxcbiAgICAgICAgbGFzdFVzZWQ6IG5ldyBEYXRlKCcyMDE1LzMvMTInKSxcbiAgICAgICAgdGVtcGxhdGVUeXBlOiAnU01TJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdBcHBvaW50bWVudCByZW1pbmRlcicsXG4gICAgICAgIHN1YmplY3Q6ICdFbWFpbCBmb3IgY2xpZW50LmZpcnN0TmFtZScsXG4gICAgICAgIGJvZHk6ICdSZW1pbmRlciBmcm9tIHNpdGUubmFtZS4gJyArXG4gICAgICAgICAgICAnWW91ciBhcHBvaW50bWVudC50eXBlIGlzIGFwcG9pbnRtZW50LmZyaWVuZGx5VGltZXNwYW4gYXQgYXBwb2ludG1lbnQuc3RhcnQuICcgK1xuICAgICAgICAgICAgJ1RleHQgXCJ5ZXNcIiB0byBjb25maXJtLiBDYWxsIHRvIHJlc2NoZWR1bGUuJyxcbiAgICAgICAgYXR0YWNobWVudDogJydcbiAgICB9O1xuXG4gICAgJHNjb3BlLmNsaWVudHMgPSBbXTtcbiAgICAkc2NvcGUuY2xpZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkc2NvcGUuY2xpZW50cy5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5jbGllbnRzWzBdO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS50ZW1wbGF0ZVR5cGUgPSB7fTtcbiAgICAkc2NvcGUudGVtcGxhdGVUeXBlcyA9IFt7XG4gICAgICAgIG5hbWU6ICdTTVMnXG4gICAgfSwge1xuICAgICAgICBuYW1lOiAnRW1haWwnXG4gICAgfV07XG5cbiAgICAkc2NvcGUuc21zQ291bnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCRzY29wZS50ZW1wbGF0ZS5ib2R5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvdW50ID0gTWF0aC5mbG9vcigkc2NvcGUudGVtcGxhdGUuYm9keS5sZW5ndGggLyAxNTkpICsgMTtcbiAgICAgICAgcmV0dXJuIGNvdW50O1xuICAgIH07XG5cblxuICAgICRzY29wZS50cnVzdEFzSHRtbCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKHZhbHVlKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmFyZWFDb25maWcgPSB7XG4gICAgICAgIGF1dG9jb21wbGV0ZTogW3tcbiAgICAgICAgICAgIHdvcmRzOiBbXG4gICAgICAgICAgICAgICAgJ3NpdGUubmFtZScsXG4gICAgICAgICAgICAgICAgJ2NsaWVudC50aXRsZScsXG4gICAgICAgICAgICAgICAgJ2NsaWVudC5rbm93bkFzJyxcbiAgICAgICAgICAgICAgICAnY2xpZW50LmZpcnN0TmFtZScsXG4gICAgICAgICAgICAgICAgJ2NsaWVudC5sYXN0TmFtZScsXG4gICAgICAgICAgICAgICAgJ2NsaWVudC5kb2InLFxuICAgICAgICAgICAgICAgICdjbGllbnQuYWRkcmVzcycsXG4gICAgICAgICAgICAgICAgJ2NsaWVudC5lbWFpbCcsXG4gICAgICAgICAgICAgICAgJ2NsaWVudC5tb2JpbGUnLFxuICAgICAgICAgICAgICAgICdjbGllbnQucGhvbmUnLFxuICAgICAgICAgICAgICAgICdjbGllbnQub2NjdXBhdGlvbicsXG4gICAgICAgICAgICAgICAgJ2NsaWVudC5ob2JiaWVzJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndGV4dC1zdWNjZXNzIGZvbnQtaXRhbGljJyxcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZU9uU3BhY2U6IGZhbHNlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHdvcmRzOiBbXG4gICAgICAgICAgICAgICAgJ3NpdGUubmFtZSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBjc3NDbGFzczogJ3RleHQtZGFuZ2VyIGZvbnQtaXRhbGljJyxcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZU9uU3BhY2U6IGZhbHNlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHdvcmRzOiBbXG4gICAgICAgICAgICAgICAgJ2FwcG9pbnRtZW50LnR5cGUnLFxuICAgICAgICAgICAgICAgICdhcHBvaW50bWVudC5yZXNvdXJjZXMnLFxuICAgICAgICAgICAgICAgICdhcHBvaW50bWVudC5zdGF0dXMnLFxuICAgICAgICAgICAgICAgICdhcHBvaW50bWVudC5zdGFydCcsXG4gICAgICAgICAgICAgICAgJ2FwcG9pbnRtZW50LmZyaWVuZGx5VGltZXNwYW4nLFxuICAgICAgICAgICAgICAgICdhcHBvaW50bWVudC5kdXJhdGlvbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBjc3NDbGFzczogJ3RleHQtd2FybmluZyBmb250LWl0YWxpYycsXG4gICAgICAgICAgICBhdXRvY29tcGxldGVPblNwYWNlOiBmYWxzZVxuICAgICAgICB9XVxuICAgIH07XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
/// <reference path="../../../../../typings/angularjs/angular.d.ts"/>
angular.module('app').controller('zTemplateDetailCtrl', ['$scope', function($scope) {
    $scope.template={
        id:123456,
        created: new Date('2015/1/3'),
        lastUsed: new Date('2015/3/12'),
        templateType: 'SMS',
        description: 'Appointment reminder',
        subject: 'Test subject',
        body: 'Reminder from {siteName}. Your {appointmentType} is {friendlyTimespan} at {startTime}. Text "yes" to confirm. Call to reschedule.',
        attachment: ''
    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jb21tdW5pY2F0aW9uL3pUZW1wbGF0ZURldGFpbEN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxRQUFRLE9BQU8sT0FBTyxXQUFXLGtDQUF1QixTQUFTLFFBQVE7SUFDckUsT0FBTyxTQUFTO1FBQ1osR0FBRztRQUNILFNBQVMsSUFBSSxLQUFLO1FBQ2xCLFVBQVUsSUFBSSxLQUFLO1FBQ25CLGNBQWM7UUFDZCxhQUFhO1FBQ2IsU0FBUztRQUNULE1BQU07UUFDTixZQUFZOztJQUVqQiIsImZpbGUiOiJjb250cm9sbGVycy9kYXNoYm9hcmQvY29tbXVuaWNhdGlvbi96VGVtcGxhdGVEZXRhaWxDdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhcmpzL2FuZ3VsYXIuZC50c1wiLz5cbmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCd6VGVtcGxhdGVEZXRhaWxDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgJHNjb3BlLnRlbXBsYXRlPXtcbiAgICAgICAgaWQ6MTIzNDU2LFxuICAgICAgICBjcmVhdGVkOiBuZXcgRGF0ZSgnMjAxNS8xLzMnKSxcbiAgICAgICAgbGFzdFVzZWQ6IG5ldyBEYXRlKCcyMDE1LzMvMTInKSxcbiAgICAgICAgdGVtcGxhdGVUeXBlOiAnU01TJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdBcHBvaW50bWVudCByZW1pbmRlcicsXG4gICAgICAgIHN1YmplY3Q6ICdUZXN0IHN1YmplY3QnLFxuICAgICAgICBib2R5OiAnUmVtaW5kZXIgZnJvbSB7c2l0ZU5hbWV9LiBZb3VyIHthcHBvaW50bWVudFR5cGV9IGlzIHtmcmllbmRseVRpbWVzcGFufSBhdCB7c3RhcnRUaW1lfS4gVGV4dCBcInllc1wiIHRvIGNvbmZpcm0uIENhbGwgdG8gcmVzY2hlZHVsZS4nLFxuICAgICAgICBhdHRhY2htZW50OiAnJ1xuICAgIH07XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
/// <reference path="../../../../../typings/angularjs/angular.d.ts"/>
angular.module('app').controller('zTemplateEditCtrl', ['$scope', '$sce', function($scope, $sce) {
    $scope.template = {
        id: 123456,
        created: new Date('2015/1/3'),
        lastUsed: new Date('2015/3/12'),
        templateType: 'SMS',
        description: 'Appointment reminder',
        subject: 'Email for client.firstName',
        body: 'Reminder from site.name. ' +
            'Your appointment.type is appointment.friendlyTimespan at appointment.start. Text "yes" to confirm. ' +
            'Call to reschedule.',
        attachment: ''
    };

    $scope.templateType = {};
    $scope.templateTypes = [{
        name: 'SMS'
    }, {
        name: 'Email'
    }];

    $scope.smsCount = function() {
        if ($scope.template.body.length === 0) {
            return 0;
        }
        var count = Math.floor($scope.template.body.length / 159) + 1;
        return count;
    };


    $scope.trustAsHtml = function(value) {
        return $sce.trustAsHtml(value);
    };

    $scope.areaConfig = {
        autocomplete: [{
            words: [
                'site.name',
                'client.title',
                'client.knownAs',
                'client.firstName',
                'client.lastName',
                'client.dob',
                'client.address',
                'client.email',
                'client.mobile',
                'client.phone',
                'client.occupation',
                'client.hobbies'
            ],
            cssClass: 'text-success font-italic',
            autocompleteOnSpace: false
        }, {
            words: [
                'site.name'
            ],
            cssClass: 'text-danger font-italic',
            autocompleteOnSpace: false
        }, {
            words: [
                'appointment.type',
                'appointment.resources',
                'appointment.status',
                'appointment.start',
                'appointment.friendlyTimespan',
                'appointment.duration'
            ],
            cssClass: 'text-warning font-italic',
            autocompleteOnSpace: false
        }]
    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jb21tdW5pY2F0aW9uL3pUZW1wbGF0ZUVkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxRQUFRLE9BQU8sT0FBTyxXQUFXLHdDQUFxQixTQUFTLFFBQVEsTUFBTTtJQUN6RSxPQUFPLFdBQVc7UUFDZCxJQUFJO1FBQ0osU0FBUyxJQUFJLEtBQUs7UUFDbEIsVUFBVSxJQUFJLEtBQUs7UUFDbkIsY0FBYztRQUNkLGFBQWE7UUFDYixTQUFTO1FBQ1QsTUFBTTtZQUNGO1lBQ0E7UUFDSixZQUFZOzs7SUFHaEIsT0FBTyxlQUFlO0lBQ3RCLE9BQU8sZ0JBQWdCLENBQUM7UUFDcEIsTUFBTTtPQUNQO1FBQ0MsTUFBTTs7O0lBR1YsT0FBTyxXQUFXLFdBQVc7UUFDekIsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLEdBQUc7WUFDbkMsT0FBTzs7UUFFWCxJQUFJLFFBQVEsS0FBSyxNQUFNLE9BQU8sU0FBUyxLQUFLLFNBQVMsT0FBTztRQUM1RCxPQUFPOzs7O0lBSVgsT0FBTyxjQUFjLFNBQVMsT0FBTztRQUNqQyxPQUFPLEtBQUssWUFBWTs7O0lBRzVCLE9BQU8sYUFBYTtRQUNoQixjQUFjLENBQUM7WUFDWCxPQUFPO2dCQUNIO2dCQUNBO2dCQUNBO2dCQUNBO2dCQUNBO2dCQUNBO2dCQUNBO2dCQUNBO2dCQUNBO2dCQUNBO2dCQUNBO2dCQUNBOztZQUVKLFVBQVU7WUFDVixxQkFBcUI7V0FDdEI7WUFDQyxPQUFPO2dCQUNIOztZQUVKLFVBQVU7WUFDVixxQkFBcUI7V0FDdEI7WUFDQyxPQUFPO2dCQUNIO2dCQUNBO2dCQUNBO2dCQUNBO2dCQUNBO2dCQUNBOztZQUVKLFVBQVU7WUFDVixxQkFBcUI7OztJQUc5QiIsImZpbGUiOiJjb250cm9sbGVycy9kYXNoYm9hcmQvY29tbXVuaWNhdGlvbi96VGVtcGxhdGVFZGl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uLy4uLy4uL3R5cGluZ3MvYW5ndWxhcmpzL2FuZ3VsYXIuZC50c1wiLz5cbmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCd6VGVtcGxhdGVFZGl0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHNjZSkge1xuICAgICRzY29wZS50ZW1wbGF0ZSA9IHtcbiAgICAgICAgaWQ6IDEyMzQ1NixcbiAgICAgICAgY3JlYXRlZDogbmV3IERhdGUoJzIwMTUvMS8zJyksXG4gICAgICAgIGxhc3RVc2VkOiBuZXcgRGF0ZSgnMjAxNS8zLzEyJyksXG4gICAgICAgIHRlbXBsYXRlVHlwZTogJ1NNUycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnQXBwb2ludG1lbnQgcmVtaW5kZXInLFxuICAgICAgICBzdWJqZWN0OiAnRW1haWwgZm9yIGNsaWVudC5maXJzdE5hbWUnLFxuICAgICAgICBib2R5OiAnUmVtaW5kZXIgZnJvbSBzaXRlLm5hbWUuICcgK1xuICAgICAgICAgICAgJ1lvdXIgYXBwb2ludG1lbnQudHlwZSBpcyBhcHBvaW50bWVudC5mcmllbmRseVRpbWVzcGFuIGF0IGFwcG9pbnRtZW50LnN0YXJ0LiBUZXh0IFwieWVzXCIgdG8gY29uZmlybS4gJyArXG4gICAgICAgICAgICAnQ2FsbCB0byByZXNjaGVkdWxlLicsXG4gICAgICAgIGF0dGFjaG1lbnQ6ICcnXG4gICAgfTtcblxuICAgICRzY29wZS50ZW1wbGF0ZVR5cGUgPSB7fTtcbiAgICAkc2NvcGUudGVtcGxhdGVUeXBlcyA9IFt7XG4gICAgICAgIG5hbWU6ICdTTVMnXG4gICAgfSwge1xuICAgICAgICBuYW1lOiAnRW1haWwnXG4gICAgfV07XG5cbiAgICAkc2NvcGUuc21zQ291bnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCRzY29wZS50ZW1wbGF0ZS5ib2R5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvdW50ID0gTWF0aC5mbG9vcigkc2NvcGUudGVtcGxhdGUuYm9keS5sZW5ndGggLyAxNTkpICsgMTtcbiAgICAgICAgcmV0dXJuIGNvdW50O1xuICAgIH07XG5cblxuICAgICRzY29wZS50cnVzdEFzSHRtbCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKHZhbHVlKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmFyZWFDb25maWcgPSB7XG4gICAgICAgIGF1dG9jb21wbGV0ZTogW3tcbiAgICAgICAgICAgIHdvcmRzOiBbXG4gICAgICAgICAgICAgICAgJ3NpdGUubmFtZScsXG4gICAgICAgICAgICAgICAgJ2NsaWVudC50aXRsZScsXG4gICAgICAgICAgICAgICAgJ2NsaWVudC5rbm93bkFzJyxcbiAgICAgICAgICAgICAgICAnY2xpZW50LmZpcnN0TmFtZScsXG4gICAgICAgICAgICAgICAgJ2NsaWVudC5sYXN0TmFtZScsXG4gICAgICAgICAgICAgICAgJ2NsaWVudC5kb2InLFxuICAgICAgICAgICAgICAgICdjbGllbnQuYWRkcmVzcycsXG4gICAgICAgICAgICAgICAgJ2NsaWVudC5lbWFpbCcsXG4gICAgICAgICAgICAgICAgJ2NsaWVudC5tb2JpbGUnLFxuICAgICAgICAgICAgICAgICdjbGllbnQucGhvbmUnLFxuICAgICAgICAgICAgICAgICdjbGllbnQub2NjdXBhdGlvbicsXG4gICAgICAgICAgICAgICAgJ2NsaWVudC5ob2JiaWVzJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndGV4dC1zdWNjZXNzIGZvbnQtaXRhbGljJyxcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZU9uU3BhY2U6IGZhbHNlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHdvcmRzOiBbXG4gICAgICAgICAgICAgICAgJ3NpdGUubmFtZSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBjc3NDbGFzczogJ3RleHQtZGFuZ2VyIGZvbnQtaXRhbGljJyxcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZU9uU3BhY2U6IGZhbHNlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHdvcmRzOiBbXG4gICAgICAgICAgICAgICAgJ2FwcG9pbnRtZW50LnR5cGUnLFxuICAgICAgICAgICAgICAgICdhcHBvaW50bWVudC5yZXNvdXJjZXMnLFxuICAgICAgICAgICAgICAgICdhcHBvaW50bWVudC5zdGF0dXMnLFxuICAgICAgICAgICAgICAgICdhcHBvaW50bWVudC5zdGFydCcsXG4gICAgICAgICAgICAgICAgJ2FwcG9pbnRtZW50LmZyaWVuZGx5VGltZXNwYW4nLFxuICAgICAgICAgICAgICAgICdhcHBvaW50bWVudC5kdXJhdGlvbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBjc3NDbGFzczogJ3RleHQtd2FybmluZyBmb250LWl0YWxpYycsXG4gICAgICAgICAgICBhdXRvY29tcGxldGVPblNwYWNlOiBmYWxzZVxuICAgICAgICB9XVxuICAgIH07XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
/// <reference path="../../../../../typings/angularjs/angular.d.ts"/>
angular.module('app').controller('zTemplateListCtrl', ['$scope', function($scope) {
    $scope.templates=[{
        id:123456,
        created: new Date('2015/1/3'),
        lastUsed: new Date('2015/3/12'),
        templateType: 'SMS',
        description: 'Appointment reminder',
        subject: '',
        body: 'Reminder from {practice}. Your {appointmentType} is {friendlyTimespan} at {startTime}. Text "yes" to confirm. Call to reschedule.',
        attachment: ''
    }];
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9jb21tdW5pY2F0aW9uL3pUZW1wbGF0ZUxpc3RDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsUUFBUSxPQUFPLE9BQU8sV0FBVyxnQ0FBcUIsU0FBUyxRQUFRO0lBQ25FLE9BQU8sVUFBVSxDQUFDO1FBQ2QsR0FBRztRQUNILFNBQVMsSUFBSSxLQUFLO1FBQ2xCLFVBQVUsSUFBSSxLQUFLO1FBQ25CLGNBQWM7UUFDZCxhQUFhO1FBQ2IsU0FBUztRQUNULE1BQU07UUFDTixZQUFZOztJQUVqQiIsImZpbGUiOiJjb250cm9sbGVycy9kYXNoYm9hcmQvY29tbXVuaWNhdGlvbi96VGVtcGxhdGVMaXN0Q3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi8uLi90eXBpbmdzL2FuZ3VsYXJqcy9hbmd1bGFyLmQudHNcIi8+XG5hbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignelRlbXBsYXRlTGlzdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAkc2NvcGUudGVtcGxhdGVzPVt7XG4gICAgICAgIGlkOjEyMzQ1NixcbiAgICAgICAgY3JlYXRlZDogbmV3IERhdGUoJzIwMTUvMS8zJyksXG4gICAgICAgIGxhc3RVc2VkOiBuZXcgRGF0ZSgnMjAxNS8zLzEyJyksXG4gICAgICAgIHRlbXBsYXRlVHlwZTogJ1NNUycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnQXBwb2ludG1lbnQgcmVtaW5kZXInLFxuICAgICAgICBzdWJqZWN0OiAnJyxcbiAgICAgICAgYm9keTogJ1JlbWluZGVyIGZyb20ge3ByYWN0aWNlfS4gWW91ciB7YXBwb2ludG1lbnRUeXBlfSBpcyB7ZnJpZW5kbHlUaW1lc3Bhbn0gYXQge3N0YXJ0VGltZX0uIFRleHQgXCJ5ZXNcIiB0byBjb25maXJtLiBDYWxsIHRvIHJlc2NoZWR1bGUuJyxcbiAgICAgICAgYXR0YWNobWVudDogJydcbiAgICB9XTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').controller('zDashboardCtrl', ['$scope', '$window', 'zResource', 'zDashboard', 'zIdentity', 'zTheme', 'zNotifier', function($scope, $window, zResource, zDashboard, zIdentity, zTheme, zNotifier) {
    /* jshint maxlen: 160 */
    $scope.appointments = [
        {clientName: 'Fiona Sawyer', appointmentName: 'Adjustment', appointmentDate: new Date('2014-06-28T10:00'), duration: 5, doctorName: 'Dr Richard'},
        {clientName: 'Xavier Sawyer', appointmentName: 'Adjustment', appointmentDate: new Date('2014-06-28T10:10'), duration: 5, doctorName: 'Dr Richard'},
        {clientName: 'Max Sawyer', appointmentName: 'Adjustment', appointmentDate: new Date('2014-06-28T10:20'), duration: 5, doctorName: 'Dr Richard'},
        {clientName: 'Oscar Sawyer', appointmentName: 'Adjustment', appointmentDate: new Date('2014-06-28T10:30'), duration: 5, doctorName: 'Dr Richard'}
    ];

    zResource
        .query()
        .$promise
        .then(function(resources) {
            $scope.resources = resources;
        });

    var storage = $window.localStorage.dashboard;

    var dashboardName = storage ? storage : zIdentity.getCurrentUser().activeRole;

    zDashboard.getDashboards()
        .then(function(dashboards) {
            var dashboard = _.find(dashboards, 'name', dashboardName);
            
            if(!dashboards.length) {
                dashboard = zDashboard.getDefaultDashboard(zIdentity.getCurrentUser().activeRole);
                zDashboard.createDashboard(dashboard);

            } else if(!dashboard) {
                dashboard = dashboards[0];
            }

            zTheme.setCurrentTheme(dashboard.theme);
            zDashboard.setActiveDashboard(dashboard);

            $scope.dashboard = dashboard;
            $scope.leftWidgets = dashboard['widgets'].left;
            $scope.rightWidgets = dashboard['widgets'].right;

            $scope.leftWidgets.forEach(function(widget) {
                var name = widget.name.toLowerCase().split(' ').join('-');
                widget.url = 'views/dashboard/dashboard/'+ name +'-widget.html';
            });

            $scope.rightWidgets.forEach(function(widget) {
                var name = widget.name.toLowerCase().split(' ').join('-');
                widget.url = 'views/dashboard/dashboard/'+ name +'-widget.html';
            });
        })
        .catch(function(err) {
            zNotifier.error('Can\'t load dashboards: ' + err);
        });

    
    // $scope.$watch(function() {
    //     return zDashboard.getActiveDashboard();
    // }, function(newVal, oldVal) {
        // $scope.dashboard = zDashboard.getActiveDashboard();
        // $scope.leftWidgets = $scope.dashboard['widgets'].left;
        // $scope.rightWidgets = $scope.dashboard['widgets'].right;
        
        // $scope.leftWidgets.forEach(function(widget) {
        //     var name = widget.name.toLowerCase().split(' ').join('-');
        //     widget.url = 'views/dashboard/dashboard/'+ name +'-widget.html';
        // })
        // $scope.rightWidgets.forEach(function(widget) {
        //     var name = widget.name.toLowerCase().split(' ').join('-');
        //     widget.url = 'views/dashboard/dashboard/'+ name +'-widget.html';
        // })
    // });

}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9kYXNoYm9hcmQvekRhc2hib2FyZEN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sV0FBVyx1R0FBa0IsU0FBUyxRQUFRLFNBQVMsV0FBVyxZQUFZLFdBQVcsUUFBUSxXQUFXOztJQUU5SCxPQUFPLGVBQWU7UUFDbEIsQ0FBQyxZQUFZLGdCQUFnQixpQkFBaUIsY0FBYyxpQkFBaUIsSUFBSSxLQUFLLHFCQUFxQixVQUFVLEdBQUcsWUFBWTtRQUNwSSxDQUFDLFlBQVksaUJBQWlCLGlCQUFpQixjQUFjLGlCQUFpQixJQUFJLEtBQUsscUJBQXFCLFVBQVUsR0FBRyxZQUFZO1FBQ3JJLENBQUMsWUFBWSxjQUFjLGlCQUFpQixjQUFjLGlCQUFpQixJQUFJLEtBQUsscUJBQXFCLFVBQVUsR0FBRyxZQUFZO1FBQ2xJLENBQUMsWUFBWSxnQkFBZ0IsaUJBQWlCLGNBQWMsaUJBQWlCLElBQUksS0FBSyxxQkFBcUIsVUFBVSxHQUFHLFlBQVk7OztJQUd4STtTQUNLO1NBQ0E7U0FDQSxLQUFLLFNBQVMsV0FBVztZQUN0QixPQUFPLFlBQVk7OztJQUczQixJQUFJLFVBQVUsUUFBUSxhQUFhOztJQUVuQyxJQUFJLGdCQUFnQixVQUFVLFVBQVUsVUFBVSxpQkFBaUI7O0lBRW5FLFdBQVc7U0FDTixLQUFLLFNBQVMsWUFBWTtZQUN2QixJQUFJLFlBQVksRUFBRSxLQUFLLFlBQVksUUFBUTs7WUFFM0MsR0FBRyxDQUFDLFdBQVcsUUFBUTtnQkFDbkIsWUFBWSxXQUFXLG9CQUFvQixVQUFVLGlCQUFpQjtnQkFDdEUsV0FBVyxnQkFBZ0I7O21CQUV4QixHQUFHLENBQUMsV0FBVztnQkFDbEIsWUFBWSxXQUFXOzs7WUFHM0IsT0FBTyxnQkFBZ0IsVUFBVTtZQUNqQyxXQUFXLG1CQUFtQjs7WUFFOUIsT0FBTyxZQUFZO1lBQ25CLE9BQU8sY0FBYyxVQUFVLFdBQVc7WUFDMUMsT0FBTyxlQUFlLFVBQVUsV0FBVzs7WUFFM0MsT0FBTyxZQUFZLFFBQVEsU0FBUyxRQUFRO2dCQUN4QyxJQUFJLE9BQU8sT0FBTyxLQUFLLGNBQWMsTUFBTSxLQUFLLEtBQUs7Z0JBQ3JELE9BQU8sTUFBTSw4QkFBOEIsTUFBTTs7O1lBR3JELE9BQU8sYUFBYSxRQUFRLFNBQVMsUUFBUTtnQkFDekMsSUFBSSxPQUFPLE9BQU8sS0FBSyxjQUFjLE1BQU0sS0FBSyxLQUFLO2dCQUNyRCxPQUFPLE1BQU0sOEJBQThCLE1BQU07OztTQUd4RCxNQUFNLFNBQVMsS0FBSztZQUNqQixVQUFVLE1BQU0sNkJBQTZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFxQnREIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9kYXNoYm9hcmQvekRhc2hib2FyZEN0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignekRhc2hib2FyZEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICR3aW5kb3csIHpSZXNvdXJjZSwgekRhc2hib2FyZCwgeklkZW50aXR5LCB6VGhlbWUsIHpOb3RpZmllcikge1xuICAgIC8qIGpzaGludCBtYXhsZW46IDE2MCAqL1xuICAgICRzY29wZS5hcHBvaW50bWVudHMgPSBbXG4gICAgICAgIHtjbGllbnROYW1lOiAnRmlvbmEgU2F3eWVyJywgYXBwb2ludG1lbnROYW1lOiAnQWRqdXN0bWVudCcsIGFwcG9pbnRtZW50RGF0ZTogbmV3IERhdGUoJzIwMTQtMDYtMjhUMTA6MDAnKSwgZHVyYXRpb246IDUsIGRvY3Rvck5hbWU6ICdEciBSaWNoYXJkJ30sXG4gICAgICAgIHtjbGllbnROYW1lOiAnWGF2aWVyIFNhd3llcicsIGFwcG9pbnRtZW50TmFtZTogJ0FkanVzdG1lbnQnLCBhcHBvaW50bWVudERhdGU6IG5ldyBEYXRlKCcyMDE0LTA2LTI4VDEwOjEwJyksIGR1cmF0aW9uOiA1LCBkb2N0b3JOYW1lOiAnRHIgUmljaGFyZCd9LFxuICAgICAgICB7Y2xpZW50TmFtZTogJ01heCBTYXd5ZXInLCBhcHBvaW50bWVudE5hbWU6ICdBZGp1c3RtZW50JywgYXBwb2ludG1lbnREYXRlOiBuZXcgRGF0ZSgnMjAxNC0wNi0yOFQxMDoyMCcpLCBkdXJhdGlvbjogNSwgZG9jdG9yTmFtZTogJ0RyIFJpY2hhcmQnfSxcbiAgICAgICAge2NsaWVudE5hbWU6ICdPc2NhciBTYXd5ZXInLCBhcHBvaW50bWVudE5hbWU6ICdBZGp1c3RtZW50JywgYXBwb2ludG1lbnREYXRlOiBuZXcgRGF0ZSgnMjAxNC0wNi0yOFQxMDozMCcpLCBkdXJhdGlvbjogNSwgZG9jdG9yTmFtZTogJ0RyIFJpY2hhcmQnfVxuICAgIF07XG5cbiAgICB6UmVzb3VyY2VcbiAgICAgICAgLnF1ZXJ5KClcbiAgICAgICAgLiRwcm9taXNlXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc291cmNlcykge1xuICAgICAgICAgICAgJHNjb3BlLnJlc291cmNlcyA9IHJlc291cmNlcztcbiAgICAgICAgfSk7XG5cbiAgICB2YXIgc3RvcmFnZSA9ICR3aW5kb3cubG9jYWxTdG9yYWdlLmRhc2hib2FyZDtcblxuICAgIHZhciBkYXNoYm9hcmROYW1lID0gc3RvcmFnZSA/IHN0b3JhZ2UgOiB6SWRlbnRpdHkuZ2V0Q3VycmVudFVzZXIoKS5hY3RpdmVSb2xlO1xuXG4gICAgekRhc2hib2FyZC5nZXREYXNoYm9hcmRzKClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGFzaGJvYXJkcykge1xuICAgICAgICAgICAgdmFyIGRhc2hib2FyZCA9IF8uZmluZChkYXNoYm9hcmRzLCAnbmFtZScsIGRhc2hib2FyZE5hbWUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZighZGFzaGJvYXJkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBkYXNoYm9hcmQgPSB6RGFzaGJvYXJkLmdldERlZmF1bHREYXNoYm9hcmQoeklkZW50aXR5LmdldEN1cnJlbnRVc2VyKCkuYWN0aXZlUm9sZSk7XG4gICAgICAgICAgICAgICAgekRhc2hib2FyZC5jcmVhdGVEYXNoYm9hcmQoZGFzaGJvYXJkKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmKCFkYXNoYm9hcmQpIHtcbiAgICAgICAgICAgICAgICBkYXNoYm9hcmQgPSBkYXNoYm9hcmRzWzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB6VGhlbWUuc2V0Q3VycmVudFRoZW1lKGRhc2hib2FyZC50aGVtZSk7XG4gICAgICAgICAgICB6RGFzaGJvYXJkLnNldEFjdGl2ZURhc2hib2FyZChkYXNoYm9hcmQpO1xuXG4gICAgICAgICAgICAkc2NvcGUuZGFzaGJvYXJkID0gZGFzaGJvYXJkO1xuICAgICAgICAgICAgJHNjb3BlLmxlZnRXaWRnZXRzID0gZGFzaGJvYXJkWyd3aWRnZXRzJ10ubGVmdDtcbiAgICAgICAgICAgICRzY29wZS5yaWdodFdpZGdldHMgPSBkYXNoYm9hcmRbJ3dpZGdldHMnXS5yaWdodDtcblxuICAgICAgICAgICAgJHNjb3BlLmxlZnRXaWRnZXRzLmZvckVhY2goZnVuY3Rpb24od2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSB3aWRnZXQubmFtZS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJykuam9pbignLScpO1xuICAgICAgICAgICAgICAgIHdpZGdldC51cmwgPSAndmlld3MvZGFzaGJvYXJkL2Rhc2hib2FyZC8nKyBuYW1lICsnLXdpZGdldC5odG1sJztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkc2NvcGUucmlnaHRXaWRnZXRzLmZvckVhY2goZnVuY3Rpb24od2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSB3aWRnZXQubmFtZS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJykuam9pbignLScpO1xuICAgICAgICAgICAgICAgIHdpZGdldC51cmwgPSAndmlld3MvZGFzaGJvYXJkL2Rhc2hib2FyZC8nKyBuYW1lICsnLXdpZGdldC5odG1sJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICB6Tm90aWZpZXIuZXJyb3IoJ0NhblxcJ3QgbG9hZCBkYXNoYm9hcmRzOiAnICsgZXJyKTtcbiAgICAgICAgfSk7XG5cbiAgICBcbiAgICAvLyAkc2NvcGUuJHdhdGNoKGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICByZXR1cm4gekRhc2hib2FyZC5nZXRBY3RpdmVEYXNoYm9hcmQoKTtcbiAgICAvLyB9LCBmdW5jdGlvbihuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgICAvLyAkc2NvcGUuZGFzaGJvYXJkID0gekRhc2hib2FyZC5nZXRBY3RpdmVEYXNoYm9hcmQoKTtcbiAgICAgICAgLy8gJHNjb3BlLmxlZnRXaWRnZXRzID0gJHNjb3BlLmRhc2hib2FyZFsnd2lkZ2V0cyddLmxlZnQ7XG4gICAgICAgIC8vICRzY29wZS5yaWdodFdpZGdldHMgPSAkc2NvcGUuZGFzaGJvYXJkWyd3aWRnZXRzJ10ucmlnaHQ7XG4gICAgICAgIFxuICAgICAgICAvLyAkc2NvcGUubGVmdFdpZGdldHMuZm9yRWFjaChmdW5jdGlvbih3aWRnZXQpIHtcbiAgICAgICAgLy8gICAgIHZhciBuYW1lID0gd2lkZ2V0Lm5hbWUudG9Mb3dlckNhc2UoKS5zcGxpdCgnICcpLmpvaW4oJy0nKTtcbiAgICAgICAgLy8gICAgIHdpZGdldC51cmwgPSAndmlld3MvZGFzaGJvYXJkL2Rhc2hib2FyZC8nKyBuYW1lICsnLXdpZGdldC5odG1sJztcbiAgICAgICAgLy8gfSlcbiAgICAgICAgLy8gJHNjb3BlLnJpZ2h0V2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uKHdpZGdldCkge1xuICAgICAgICAvLyAgICAgdmFyIG5hbWUgPSB3aWRnZXQubmFtZS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJykuam9pbignLScpO1xuICAgICAgICAvLyAgICAgd2lkZ2V0LnVybCA9ICd2aWV3cy9kYXNoYm9hcmQvZGFzaGJvYXJkLycrIG5hbWUgKyctd2lkZ2V0Lmh0bWwnO1xuICAgICAgICAvLyB9KVxuICAgIC8vIH0pO1xuXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').controller('zDashboardListCtrl', ['$scope', '$location', '$modal', 'zNotifier', 'zTheme', 'zDashboard', 'zIdentity', function($scope, $location, $modal, zNotifier, zTheme, zDashboard, zIdentity) { // jshint ignore:line
    $scope.dashboards = zDashboard.getActiveDashboards();
    
    if(!$scope.dashboards) {
        zDashboard.getDashboards()
        .then(function(data) {
            $scope.dashboards = data;
            $scope.dashboard = _.find(data, 'name', zIdentity.getCurrentUser().activeRole);
        })
        .catch(function(err) {
            zNotifier.error('Can\'t load dashboards: ' + err);
        });
    } else {
        $scope.dashboard = _.find($scope.dashboards, 'name', zIdentity.getCurrentUser().activeRole);
    }


    // dropdown themes
    $scope.themes = zTheme.getThemes();

    $scope.changeDashboard = function(dashboard) {
    	zDashboard.setActiveDashboard(dashboard);
    	$scope.dashboard = zDashboard.getActiveDashboard();
    };

    $scope.setTheme = function(dashboard, theme) {
        $scope.selectedTheme = theme;
        dashboard.theme = theme;
        zTheme.setCurrentTheme(theme);
    };


    $scope.addWidget = function(dashboard, widget) {
        var left  = _.find(dashboard.widgets.left, 'name', widget.name);
        var right = _.find(dashboard.widgets.right, 'name', widget.name);
        
        if(!left && !right) {
            dashboard.widgets.left.push(widget);
        }        
    };

    $scope.removeLeftWidget = function(dashboard, index) {
        _.pullAt(dashboard.widgets.left, index);
    };

    $scope.removeRightWidget = function(dashboard, index) {
        _.pullAt(dashboard.widgets.right, index);
    };

    $scope.save = function(dashboard) {
        zDashboard.updateDashboard(dashboard)
            .then(function(data) {
                zNotifier.notify(data.message);
                zDashboard.setActiveDashboard(dashboard);
                $location.path('/dashboard');
            })
            .catch(function(err) {
                zNotifier.error('Error Occured While Saving Theme: ' + err);
            });
    };

    $scope.cancel =  function(dashboard) {
        zDashboard.getDashboard(dashboard.name)
            .then(function(dashboard) {
                $scope.selectedTheme = dashboard.theme;
                dashboard.theme = dashboard.theme;
                zTheme.setCurrentTheme(dashboard.theme);
                $location.path('/dashboard');
            })
            .catch(function(err) {
                zNotifier.error('Error Ocured While Loading Theme: ' + err);
            });
    };

    $scope.delete = function(dashboardName) {
    	if($scope.dashboards.length === 1) {
    		$modal.open({
				templateUrl: 'delete_dashboard_warning',
				controller: 'zModalCtrl',
				resolve: {
					items: function () {
						return 'no items';
					}
				}
			});
            return;
        }
        var result = $modal.open({
            templateUrl: 'delete_dashboard',
            controller: 'zModalCtrl',
            resolve: {
                items: function () {
                    return true;
                }
            }
        });

        result.result.then(function () {
            zDashboard.deleteDashboard(dashboardName)
                .then(function() {
                    _.remove($scope.dashboards, 'name', dashboardName);

                    zDashboard.setActiveDashboard($scope.dashboards[0]);
                    zDashboard.setActiveDashboards($scope.dashboards);

                    zNotifier.notify('Dashboard has removed successfully');
                    $location.path('/dashboard');
                })
                .catch(function(err) {
                    zNotifier.error('Can\'t remove dashboard '+ err);
                });
        });
    };
    
    $scope.widgets = [{
        name: 'Appointments'
    }, {
        name: 'Site info'
    }, {
        name: 'Performance'
    }, {
        name: 'ToDos'
    }, {
        name: 'Messages'
    }, {
        name: 'Client'
    }];

    $scope.selectedWidget = {};


    // Model to JSON for demo purpose
    // $scope.$watch('dashboards', function(model) {
    //     $scope.modelAsJson = angular.toJson(model, true);
    // }, true);
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9kYXNoYm9hcmRzL3pEYXNoYm9hcmRMaXN0Q3RybC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxXQUFXLDBHQUFzQixTQUFTLFFBQVEsV0FBVyxRQUFRLFdBQVcsUUFBUSxZQUFZLFdBQVc7SUFDakksT0FBTyxhQUFhLFdBQVc7O0lBRS9CLEdBQUcsQ0FBQyxPQUFPLFlBQVk7UUFDbkIsV0FBVztTQUNWLEtBQUssU0FBUyxNQUFNO1lBQ2pCLE9BQU8sYUFBYTtZQUNwQixPQUFPLFlBQVksRUFBRSxLQUFLLE1BQU0sUUFBUSxVQUFVLGlCQUFpQjs7U0FFdEUsTUFBTSxTQUFTLEtBQUs7WUFDakIsVUFBVSxNQUFNLDZCQUE2Qjs7V0FFOUM7UUFDSCxPQUFPLFlBQVksRUFBRSxLQUFLLE9BQU8sWUFBWSxRQUFRLFVBQVUsaUJBQWlCOzs7OztJQUtwRixPQUFPLFNBQVMsT0FBTzs7SUFFdkIsT0FBTyxrQkFBa0IsU0FBUyxXQUFXO0tBQzVDLFdBQVcsbUJBQW1CO0tBQzlCLE9BQU8sWUFBWSxXQUFXOzs7SUFHL0IsT0FBTyxXQUFXLFNBQVMsV0FBVyxPQUFPO1FBQ3pDLE9BQU8sZ0JBQWdCO1FBQ3ZCLFVBQVUsUUFBUTtRQUNsQixPQUFPLGdCQUFnQjs7OztJQUkzQixPQUFPLFlBQVksU0FBUyxXQUFXLFFBQVE7UUFDM0MsSUFBSSxRQUFRLEVBQUUsS0FBSyxVQUFVLFFBQVEsTUFBTSxRQUFRLE9BQU87UUFDMUQsSUFBSSxRQUFRLEVBQUUsS0FBSyxVQUFVLFFBQVEsT0FBTyxRQUFRLE9BQU87O1FBRTNELEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTztZQUNoQixVQUFVLFFBQVEsS0FBSyxLQUFLOzs7O0lBSXBDLE9BQU8sbUJBQW1CLFNBQVMsV0FBVyxPQUFPO1FBQ2pELEVBQUUsT0FBTyxVQUFVLFFBQVEsTUFBTTs7O0lBR3JDLE9BQU8sb0JBQW9CLFNBQVMsV0FBVyxPQUFPO1FBQ2xELEVBQUUsT0FBTyxVQUFVLFFBQVEsT0FBTzs7O0lBR3RDLE9BQU8sT0FBTyxTQUFTLFdBQVc7UUFDOUIsV0FBVyxnQkFBZ0I7YUFDdEIsS0FBSyxTQUFTLE1BQU07Z0JBQ2pCLFVBQVUsT0FBTyxLQUFLO2dCQUN0QixXQUFXLG1CQUFtQjtnQkFDOUIsVUFBVSxLQUFLOzthQUVsQixNQUFNLFNBQVMsS0FBSztnQkFDakIsVUFBVSxNQUFNLHVDQUF1Qzs7OztJQUluRSxPQUFPLFVBQVUsU0FBUyxXQUFXO1FBQ2pDLFdBQVcsYUFBYSxVQUFVO2FBQzdCLEtBQUssU0FBUyxXQUFXO2dCQUN0QixPQUFPLGdCQUFnQixVQUFVO2dCQUNqQyxVQUFVLFFBQVEsVUFBVTtnQkFDNUIsT0FBTyxnQkFBZ0IsVUFBVTtnQkFDakMsVUFBVSxLQUFLOzthQUVsQixNQUFNLFNBQVMsS0FBSztnQkFDakIsVUFBVSxNQUFNLHVDQUF1Qzs7OztJQUluRSxPQUFPLFNBQVMsU0FBUyxlQUFlO0tBQ3ZDLEdBQUcsT0FBTyxXQUFXLFdBQVcsR0FBRztNQUNsQyxPQUFPLEtBQUs7SUFDZCxhQUFhO0lBQ2IsWUFBWTtJQUNaLFNBQVM7S0FDUixPQUFPLFlBQVk7TUFDbEIsT0FBTzs7OztZQUlEOztRQUVKLElBQUksU0FBUyxPQUFPLEtBQUs7WUFDckIsYUFBYTtZQUNiLFlBQVk7WUFDWixTQUFTO2dCQUNMLE9BQU8sWUFBWTtvQkFDZixPQUFPOzs7OztRQUtuQixPQUFPLE9BQU8sS0FBSyxZQUFZO1lBQzNCLFdBQVcsZ0JBQWdCO2lCQUN0QixLQUFLLFdBQVc7b0JBQ2IsRUFBRSxPQUFPLE9BQU8sWUFBWSxRQUFROztvQkFFcEMsV0FBVyxtQkFBbUIsT0FBTyxXQUFXO29CQUNoRCxXQUFXLG9CQUFvQixPQUFPOztvQkFFdEMsVUFBVSxPQUFPO29CQUNqQixVQUFVLEtBQUs7O2lCQUVsQixNQUFNLFNBQVMsS0FBSztvQkFDakIsVUFBVSxNQUFNLDRCQUE0Qjs7Ozs7SUFLNUQsT0FBTyxVQUFVLENBQUM7UUFDZCxNQUFNO09BQ1A7UUFDQyxNQUFNO09BQ1A7UUFDQyxNQUFNO09BQ1A7UUFDQyxNQUFNO09BQ1A7UUFDQyxNQUFNO09BQ1A7UUFDQyxNQUFNOzs7SUFHVixPQUFPLGlCQUFpQjs7Ozs7OztJQU96QiIsImZpbGUiOiJjb250cm9sbGVycy9kYXNoYm9hcmQvZGFzaGJvYXJkcy96RGFzaGJvYXJkTGlzdEN0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignekRhc2hib2FyZExpc3RDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24sICRtb2RhbCwgek5vdGlmaWVyLCB6VGhlbWUsIHpEYXNoYm9hcmQsIHpJZGVudGl0eSkgeyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbiAgICAkc2NvcGUuZGFzaGJvYXJkcyA9IHpEYXNoYm9hcmQuZ2V0QWN0aXZlRGFzaGJvYXJkcygpO1xuICAgIFxuICAgIGlmKCEkc2NvcGUuZGFzaGJvYXJkcykge1xuICAgICAgICB6RGFzaGJvYXJkLmdldERhc2hib2FyZHMoKVxuICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAkc2NvcGUuZGFzaGJvYXJkcyA9IGRhdGE7XG4gICAgICAgICAgICAkc2NvcGUuZGFzaGJvYXJkID0gXy5maW5kKGRhdGEsICduYW1lJywgeklkZW50aXR5LmdldEN1cnJlbnRVc2VyKCkuYWN0aXZlUm9sZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignQ2FuXFwndCBsb2FkIGRhc2hib2FyZHM6ICcgKyBlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkc2NvcGUuZGFzaGJvYXJkID0gXy5maW5kKCRzY29wZS5kYXNoYm9hcmRzLCAnbmFtZScsIHpJZGVudGl0eS5nZXRDdXJyZW50VXNlcigpLmFjdGl2ZVJvbGUpO1xuICAgIH1cblxuXG4gICAgLy8gZHJvcGRvd24gdGhlbWVzXG4gICAgJHNjb3BlLnRoZW1lcyA9IHpUaGVtZS5nZXRUaGVtZXMoKTtcblxuICAgICRzY29wZS5jaGFuZ2VEYXNoYm9hcmQgPSBmdW5jdGlvbihkYXNoYm9hcmQpIHtcbiAgICBcdHpEYXNoYm9hcmQuc2V0QWN0aXZlRGFzaGJvYXJkKGRhc2hib2FyZCk7XG4gICAgXHQkc2NvcGUuZGFzaGJvYXJkID0gekRhc2hib2FyZC5nZXRBY3RpdmVEYXNoYm9hcmQoKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnNldFRoZW1lID0gZnVuY3Rpb24oZGFzaGJvYXJkLCB0aGVtZSkge1xuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRUaGVtZSA9IHRoZW1lO1xuICAgICAgICBkYXNoYm9hcmQudGhlbWUgPSB0aGVtZTtcbiAgICAgICAgelRoZW1lLnNldEN1cnJlbnRUaGVtZSh0aGVtZSk7XG4gICAgfTtcblxuXG4gICAgJHNjb3BlLmFkZFdpZGdldCA9IGZ1bmN0aW9uKGRhc2hib2FyZCwgd2lkZ2V0KSB7XG4gICAgICAgIHZhciBsZWZ0ICA9IF8uZmluZChkYXNoYm9hcmQud2lkZ2V0cy5sZWZ0LCAnbmFtZScsIHdpZGdldC5uYW1lKTtcbiAgICAgICAgdmFyIHJpZ2h0ID0gXy5maW5kKGRhc2hib2FyZC53aWRnZXRzLnJpZ2h0LCAnbmFtZScsIHdpZGdldC5uYW1lKTtcbiAgICAgICAgXG4gICAgICAgIGlmKCFsZWZ0ICYmICFyaWdodCkge1xuICAgICAgICAgICAgZGFzaGJvYXJkLndpZGdldHMubGVmdC5wdXNoKHdpZGdldCk7XG4gICAgICAgIH0gICAgICAgIFxuICAgIH07XG5cbiAgICAkc2NvcGUucmVtb3ZlTGVmdFdpZGdldCA9IGZ1bmN0aW9uKGRhc2hib2FyZCwgaW5kZXgpIHtcbiAgICAgICAgXy5wdWxsQXQoZGFzaGJvYXJkLndpZGdldHMubGVmdCwgaW5kZXgpO1xuICAgIH07XG5cbiAgICAkc2NvcGUucmVtb3ZlUmlnaHRXaWRnZXQgPSBmdW5jdGlvbihkYXNoYm9hcmQsIGluZGV4KSB7XG4gICAgICAgIF8ucHVsbEF0KGRhc2hib2FyZC53aWRnZXRzLnJpZ2h0LCBpbmRleCk7XG4gICAgfTtcblxuICAgICRzY29wZS5zYXZlID0gZnVuY3Rpb24oZGFzaGJvYXJkKSB7XG4gICAgICAgIHpEYXNoYm9hcmQudXBkYXRlRGFzaGJvYXJkKGRhc2hib2FyZClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIubm90aWZ5KGRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgekRhc2hib2FyZC5zZXRBY3RpdmVEYXNoYm9hcmQoZGFzaGJvYXJkKTtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2Rhc2hib2FyZCcpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIuZXJyb3IoJ0Vycm9yIE9jY3VyZWQgV2hpbGUgU2F2aW5nIFRoZW1lOiAnICsgZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUuY2FuY2VsID0gIGZ1bmN0aW9uKGRhc2hib2FyZCkge1xuICAgICAgICB6RGFzaGJvYXJkLmdldERhc2hib2FyZChkYXNoYm9hcmQubmFtZSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRhc2hib2FyZCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFRoZW1lID0gZGFzaGJvYXJkLnRoZW1lO1xuICAgICAgICAgICAgICAgIGRhc2hib2FyZC50aGVtZSA9IGRhc2hib2FyZC50aGVtZTtcbiAgICAgICAgICAgICAgICB6VGhlbWUuc2V0Q3VycmVudFRoZW1lKGRhc2hib2FyZC50aGVtZSk7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdFcnJvciBPY3VyZWQgV2hpbGUgTG9hZGluZyBUaGVtZTogJyArIGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmRlbGV0ZSA9IGZ1bmN0aW9uKGRhc2hib2FyZE5hbWUpIHtcbiAgICBcdGlmKCRzY29wZS5kYXNoYm9hcmRzLmxlbmd0aCA9PT0gMSkge1xuICAgIFx0XHQkbW9kYWwub3Blbih7XG5cdFx0XHRcdHRlbXBsYXRlVXJsOiAnZGVsZXRlX2Rhc2hib2FyZF93YXJuaW5nJyxcblx0XHRcdFx0Y29udHJvbGxlcjogJ3pNb2RhbEN0cmwnLFxuXHRcdFx0XHRyZXNvbHZlOiB7XG5cdFx0XHRcdFx0aXRlbXM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnbm8gaXRlbXMnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9ICRtb2RhbC5vcGVuKHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZGVsZXRlX2Rhc2hib2FyZCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnek1vZGFsQ3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgaXRlbXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXN1bHQucmVzdWx0LnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgekRhc2hib2FyZC5kZWxldGVEYXNoYm9hcmQoZGFzaGJvYXJkTmFtZSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5yZW1vdmUoJHNjb3BlLmRhc2hib2FyZHMsICduYW1lJywgZGFzaGJvYXJkTmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgekRhc2hib2FyZC5zZXRBY3RpdmVEYXNoYm9hcmQoJHNjb3BlLmRhc2hib2FyZHNbMF0pO1xuICAgICAgICAgICAgICAgICAgICB6RGFzaGJvYXJkLnNldEFjdGl2ZURhc2hib2FyZHMoJHNjb3BlLmRhc2hib2FyZHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHpOb3RpZmllci5ub3RpZnkoJ0Rhc2hib2FyZCBoYXMgcmVtb3ZlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9kYXNoYm9hcmQnKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdDYW5cXCd0IHJlbW92ZSBkYXNoYm9hcmQgJysgZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBcbiAgICAkc2NvcGUud2lkZ2V0cyA9IFt7XG4gICAgICAgIG5hbWU6ICdBcHBvaW50bWVudHMnXG4gICAgfSwge1xuICAgICAgICBuYW1lOiAnU2l0ZSBpbmZvJ1xuICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ1BlcmZvcm1hbmNlJ1xuICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ1RvRG9zJ1xuICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ01lc3NhZ2VzJ1xuICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ0NsaWVudCdcbiAgICB9XTtcblxuICAgICRzY29wZS5zZWxlY3RlZFdpZGdldCA9IHt9O1xuXG5cbiAgICAvLyBNb2RlbCB0byBKU09OIGZvciBkZW1vIHB1cnBvc2VcbiAgICAvLyAkc2NvcGUuJHdhdGNoKCdkYXNoYm9hcmRzJywgZnVuY3Rpb24obW9kZWwpIHtcbiAgICAvLyAgICAgJHNjb3BlLm1vZGVsQXNKc29uID0gYW5ndWxhci50b0pzb24obW9kZWwsIHRydWUpO1xuICAgIC8vIH0sIHRydWUpO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').controller('zDashboardNewCtrl', ['$scope', '$location', 'zNotifier', 'zTheme', 'zDashboard', function($scope, $location, zNotifier, zTheme, zDashboard) {
    
    $scope.themes = zTheme.getThemes();
    $scope.dashboard = zDashboard.getDefaultDashboard('owner');
    $scope.dashboards = zDashboard.getActiveDashboards();
    $scope.dashboard.name = '';

    if(!$scope.dashboards) {
        zDashboard.getDashboards()
            .then(function(data) {
                $scope.dashboards = data;
            })
            .catch(function(err) {
                zNotifier.error('Can\'t load dashboards: ' + err);
            });
    }

    $scope.createDashboard = function() {
        zDashboard.createDashboard($scope.dashboard)
            .then(function(data) {
                $scope.dashboard._id = data._id;
                $scope.dashboards.push($scope.dashboard);

                zDashboard.setActiveDashboard($scope.dashboard);
                zDashboard.setActiveDashboards($scope.dashboards);

                zNotifier.notify(data.message);

                $location.path('/dashboard/dashboards');
            })
            .catch(function(err) {
                zNotifier.error('Can\'t save new Dashboard, \n'+ err.data.reason);
            });
    };
    
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9kYXNoYm9hcmRzL3pEYXNoYm9hcmROZXdDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcsa0ZBQXFCLFNBQVMsUUFBUSxXQUFXLFdBQVcsUUFBUSxZQUFZOztJQUU3RyxPQUFPLFNBQVMsT0FBTztJQUN2QixPQUFPLFlBQVksV0FBVyxvQkFBb0I7SUFDbEQsT0FBTyxhQUFhLFdBQVc7SUFDL0IsT0FBTyxVQUFVLE9BQU87O0lBRXhCLEdBQUcsQ0FBQyxPQUFPLFlBQVk7UUFDbkIsV0FBVzthQUNOLEtBQUssU0FBUyxNQUFNO2dCQUNqQixPQUFPLGFBQWE7O2FBRXZCLE1BQU0sU0FBUyxLQUFLO2dCQUNqQixVQUFVLE1BQU0sNkJBQTZCOzs7O0lBSXpELE9BQU8sa0JBQWtCLFdBQVc7UUFDaEMsV0FBVyxnQkFBZ0IsT0FBTzthQUM3QixLQUFLLFNBQVMsTUFBTTtnQkFDakIsT0FBTyxVQUFVLE1BQU0sS0FBSztnQkFDNUIsT0FBTyxXQUFXLEtBQUssT0FBTzs7Z0JBRTlCLFdBQVcsbUJBQW1CLE9BQU87Z0JBQ3JDLFdBQVcsb0JBQW9CLE9BQU87O2dCQUV0QyxVQUFVLE9BQU8sS0FBSzs7Z0JBRXRCLFVBQVUsS0FBSzs7YUFFbEIsTUFBTSxTQUFTLEtBQUs7Z0JBQ2pCLFVBQVUsTUFBTSxpQ0FBaUMsSUFBSSxLQUFLOzs7O0lBSXZFIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9kYXNoYm9hcmRzL3pEYXNoYm9hcmROZXdDdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ3pEYXNoYm9hcmROZXdDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24sIHpOb3RpZmllciwgelRoZW1lLCB6RGFzaGJvYXJkKSB7XG4gICAgXG4gICAgJHNjb3BlLnRoZW1lcyA9IHpUaGVtZS5nZXRUaGVtZXMoKTtcbiAgICAkc2NvcGUuZGFzaGJvYXJkID0gekRhc2hib2FyZC5nZXREZWZhdWx0RGFzaGJvYXJkKCdvd25lcicpO1xuICAgICRzY29wZS5kYXNoYm9hcmRzID0gekRhc2hib2FyZC5nZXRBY3RpdmVEYXNoYm9hcmRzKCk7XG4gICAgJHNjb3BlLmRhc2hib2FyZC5uYW1lID0gJyc7XG5cbiAgICBpZighJHNjb3BlLmRhc2hib2FyZHMpIHtcbiAgICAgICAgekRhc2hib2FyZC5nZXREYXNoYm9hcmRzKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGFzaGJvYXJkcyA9IGRhdGE7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignQ2FuXFwndCBsb2FkIGRhc2hib2FyZHM6ICcgKyBlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgJHNjb3BlLmNyZWF0ZURhc2hib2FyZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB6RGFzaGJvYXJkLmNyZWF0ZURhc2hib2FyZCgkc2NvcGUuZGFzaGJvYXJkKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXNoYm9hcmQuX2lkID0gZGF0YS5faWQ7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhc2hib2FyZHMucHVzaCgkc2NvcGUuZGFzaGJvYXJkKTtcblxuICAgICAgICAgICAgICAgIHpEYXNoYm9hcmQuc2V0QWN0aXZlRGFzaGJvYXJkKCRzY29wZS5kYXNoYm9hcmQpO1xuICAgICAgICAgICAgICAgIHpEYXNoYm9hcmQuc2V0QWN0aXZlRGFzaGJvYXJkcygkc2NvcGUuZGFzaGJvYXJkcyk7XG5cbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIubm90aWZ5KGRhdGEubWVzc2FnZSk7XG5cbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2Rhc2hib2FyZC9kYXNoYm9hcmRzJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignQ2FuXFwndCBzYXZlIG5ldyBEYXNoYm9hcmQsIFxcbicrIGVyci5kYXRhLnJlYXNvbik7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuICAgIFxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').controller('zSiteAccountDetails', function(){
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9zZXR0aW5ncy9hY2NvdW50L3pTaXRlQWNjb3VudERldGFpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sV0FBVyx1QkFBdUIsVUFBVTtHQUMvRCIsImZpbGUiOiJjb250cm9sbGVycy9kYXNoYm9hcmQvc2V0dGluZ3MvYWNjb3VudC96U2l0ZUFjY291bnREZXRhaWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ3pTaXRlQWNjb3VudERldGFpbHMnLCBmdW5jdGlvbigpe1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').controller('zApiDetailsCtrl', ['$scope', 'zUser', 'zNotifier', 'zIdentity', '$routeParams', '$location', function ($scope, zUser, zNotifier, zIdentity, $routeParams, $location) {
    $scope.isLoading = true;
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    
    zUser
        .get({ id: $routeParams.id })
        .$promise
        .then(function (user) {
            $scope.user = user;
            $scope.isLoading = false;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load record: ' + err.data.reason);
            $location.path('/settings/api');
        });

    // flash copy API Key
    var copyBtn = document.getElementById('copy-api');
    var copyAPI = new ZeroClipboard(copyBtn); // jshint ignore:line

    copyAPI.on('copy', function () {
        zNotifier.notify('API Key Copied!');
    });
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9zZXR0aW5ncy9hcGlzL3pBcGlEZXRhaWxzQ3RybC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxXQUFXLDhGQUFtQixVQUFVLFFBQVEsT0FBTyxXQUFXLFdBQVcsY0FBYyxXQUFXO0lBQ3hILE9BQU8sWUFBWTtJQUNuQixPQUFPLFVBQVUsVUFBVSxhQUFhLENBQUMsU0FBUzs7SUFFbEQ7U0FDSyxJQUFJLEVBQUUsSUFBSSxhQUFhO1NBQ3ZCO1NBQ0EsS0FBSyxVQUFVLE1BQU07WUFDbEIsT0FBTyxPQUFPO1lBQ2QsT0FBTyxZQUFZOztTQUV0QixNQUFNLFNBQVMsS0FBSztZQUNqQixVQUFVLE1BQU0sNEJBQTRCLElBQUksS0FBSztZQUNyRCxVQUFVLEtBQUs7Ozs7SUFJdkIsSUFBSSxVQUFVLFNBQVMsZUFBZTtJQUN0QyxJQUFJLFVBQVUsSUFBSSxjQUFjOztJQUVoQyxRQUFRLEdBQUcsUUFBUSxZQUFZO1FBQzNCLFVBQVUsT0FBTzs7O0FBR3pCIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9zZXR0aW5ncy9hcGlzL3pBcGlEZXRhaWxzQ3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCd6QXBpRGV0YWlsc0N0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCB6VXNlciwgek5vdGlmaWVyLCB6SWRlbnRpdHksICRyb3V0ZVBhcmFtcywgJGxvY2F0aW9uKSB7XG4gICAgJHNjb3BlLmlzTG9hZGluZyA9IHRydWU7XG4gICAgJHNjb3BlLmNhbkVkaXQgPSB6SWRlbnRpdHkuaXNBdXRob3JpemVkKFsnb3duZXInLCAnbWFuYWdlciddKTtcbiAgICBcbiAgICB6VXNlclxuICAgICAgICAuZ2V0KHsgaWQ6ICRyb3V0ZVBhcmFtcy5pZCB9KVxuICAgICAgICAuJHByb21pc2VcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgICRzY29wZS51c2VyID0gdXNlcjtcbiAgICAgICAgICAgICRzY29wZS5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdVbmFibGUgdG8gbG9hZCByZWNvcmQ6ICcgKyBlcnIuZGF0YS5yZWFzb24pO1xuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9zZXR0aW5ncy9hcGknKTtcbiAgICAgICAgfSk7XG5cbiAgICAvLyBmbGFzaCBjb3B5IEFQSSBLZXlcbiAgICB2YXIgY29weUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3B5LWFwaScpO1xuICAgIHZhciBjb3B5QVBJID0gbmV3IFplcm9DbGlwYm9hcmQoY29weUJ0bik7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuXG4gICAgY29weUFQSS5vbignY29weScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgek5vdGlmaWVyLm5vdGlmeSgnQVBJIEtleSBDb3BpZWQhJyk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').controller('zApiEditCtrl', ['$scope', 'zUser', '$routeParams', 'zNotifier', '$location', 'zIdentity', 'zCommonUtil', '$modal', function ($scope, zUser, $routeParams, zNotifier, $location, zIdentity, zCommonUtil, $modal) {
    $scope.isLoading = true;
    $scope.isSaving = false;
    $scope.canEdit = zIdentity.isAuthorized('owner', 'manager');
    
    (function loadData() {
        zUser
            .get({ id: $routeParams.id })
            .$promise
            .then(function(user) {
                $scope.user = user;
                $scope.isLoading = false;
            })
            .catch(function (err) {
                zNotifier.error('Unable to load record: ' + err.data.reason);
                $location.path('/settings/api');
            });
    })();
    
    $scope.saveUser = function() {
        $scope.isSaving = true;
        $scope.user
            .$update()
            .then(function () {
                zNotifier.notify('API Key updated successfully');
                $location.path('/settings/api');
            })
            .catch(function(err) {
                zNotifier.error('Unable to save record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
    
    $scope.deleteUser = function() {
        var modalInstance = $modal.open({
            templateUrl: 'views/dashboard/settings/users/delete-user-dialog.html',
            controller: 'zModalCtrl',
            resolve: {
                items: function () {
                    return $scope.user;
                }
            }
        });
        
        $scope.isSaving = true;
        modalInstance.result
            .then(function () {
                return $scope.user.$remove({ id: $scope.user._id });
            })
            .then(function () {
                zNotifier.notify('API Key deleted successfully');
                $location.path('/settings/api');
            })
            .catch(function (err) {
                if (err !== 'cancel') {
                    zNotifier.error('Unable to delete: ' + err.data.reason);
                }
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
    
    $scope.regenerateKey = function() {
        var modalInstance = $modal.open({
            templateUrl: 'views/dashboard/settings/apis/api-regenerate-dialog.html',
            controller: 'zModalCtrl',
            resolve: {
                items: function () {
                    return $scope.user;
                }
            }
        });
        
        $scope.isSaving = true;
        modalInstance.result
            .then(function () {
                $scope.user.password = zCommonUtil.randomPw();
                return $scope.user.$update();
            })
            .then(function() {
                zNotifier.notify('API Key regenerated successfully');
                $location.path('/settings/api/' + $routeParams.id);
            })
            .catch(function (err) {
                if (err !== 'cancel') {
                    zNotifier.error('Regeneration failed: ' + err.data.reason);
                }
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9zZXR0aW5ncy9hcGlzL3pBcGlFZGl0Q3RybC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxXQUFXLG9IQUFnQixVQUFVLFFBQVEsT0FBTyxjQUFjLFdBQVcsV0FBVyxXQUFXLGFBQWEsUUFBUTtJQUMxSSxPQUFPLFlBQVk7SUFDbkIsT0FBTyxXQUFXO0lBQ2xCLE9BQU8sVUFBVSxVQUFVLGFBQWEsU0FBUzs7SUFFakQsQ0FBQyxTQUFTLFdBQVc7UUFDakI7YUFDSyxJQUFJLEVBQUUsSUFBSSxhQUFhO2FBQ3ZCO2FBQ0EsS0FBSyxTQUFTLE1BQU07Z0JBQ2pCLE9BQU8sT0FBTztnQkFDZCxPQUFPLFlBQVk7O2FBRXRCLE1BQU0sVUFBVSxLQUFLO2dCQUNsQixVQUFVLE1BQU0sNEJBQTRCLElBQUksS0FBSztnQkFDckQsVUFBVSxLQUFLOzs7O0lBSTNCLE9BQU8sV0FBVyxXQUFXO1FBQ3pCLE9BQU8sV0FBVztRQUNsQixPQUFPO2FBQ0Y7YUFDQSxLQUFLLFlBQVk7Z0JBQ2QsVUFBVSxPQUFPO2dCQUNqQixVQUFVLEtBQUs7O2FBRWxCLE1BQU0sU0FBUyxLQUFLO2dCQUNqQixVQUFVLE1BQU0sNEJBQTRCLElBQUksS0FBSzs7YUFFeEQsUUFBUSxXQUFXO2dCQUNoQixPQUFPLFdBQVc7Ozs7SUFJOUIsT0FBTyxhQUFhLFdBQVc7UUFDM0IsSUFBSSxnQkFBZ0IsT0FBTyxLQUFLO1lBQzVCLGFBQWE7WUFDYixZQUFZO1lBQ1osU0FBUztnQkFDTCxPQUFPLFlBQVk7b0JBQ2YsT0FBTyxPQUFPOzs7OztRQUsxQixPQUFPLFdBQVc7UUFDbEIsY0FBYzthQUNULEtBQUssWUFBWTtnQkFDZCxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUUsSUFBSSxPQUFPLEtBQUs7O2FBRWhELEtBQUssWUFBWTtnQkFDZCxVQUFVLE9BQU87Z0JBQ2pCLFVBQVUsS0FBSzs7YUFFbEIsTUFBTSxVQUFVLEtBQUs7Z0JBQ2xCLElBQUksUUFBUSxVQUFVO29CQUNsQixVQUFVLE1BQU0sdUJBQXVCLElBQUksS0FBSzs7O2FBR3ZELFFBQVEsV0FBVztnQkFDaEIsT0FBTyxXQUFXOzs7O0lBSTlCLE9BQU8sZ0JBQWdCLFdBQVc7UUFDOUIsSUFBSSxnQkFBZ0IsT0FBTyxLQUFLO1lBQzVCLGFBQWE7WUFDYixZQUFZO1lBQ1osU0FBUztnQkFDTCxPQUFPLFlBQVk7b0JBQ2YsT0FBTyxPQUFPOzs7OztRQUsxQixPQUFPLFdBQVc7UUFDbEIsY0FBYzthQUNULEtBQUssWUFBWTtnQkFDZCxPQUFPLEtBQUssV0FBVyxZQUFZO2dCQUNuQyxPQUFPLE9BQU8sS0FBSzs7YUFFdEIsS0FBSyxXQUFXO2dCQUNiLFVBQVUsT0FBTztnQkFDakIsVUFBVSxLQUFLLG1CQUFtQixhQUFhOzthQUVsRCxNQUFNLFVBQVUsS0FBSztnQkFDbEIsSUFBSSxRQUFRLFVBQVU7b0JBQ2xCLFVBQVUsTUFBTSwwQkFBMEIsSUFBSSxLQUFLOzs7YUFHMUQsUUFBUSxXQUFXO2dCQUNoQixPQUFPLFdBQVc7Ozs7QUFJbEMiLCJmaWxlIjoiY29udHJvbGxlcnMvZGFzaGJvYXJkL3NldHRpbmdzL2FwaXMvekFwaUVkaXRDdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ3pBcGlFZGl0Q3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIHpVc2VyLCAkcm91dGVQYXJhbXMsIHpOb3RpZmllciwgJGxvY2F0aW9uLCB6SWRlbnRpdHksIHpDb21tb25VdGlsLCAkbW9kYWwpIHtcbiAgICAkc2NvcGUuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAkc2NvcGUuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAkc2NvcGUuY2FuRWRpdCA9IHpJZGVudGl0eS5pc0F1dGhvcml6ZWQoJ293bmVyJywgJ21hbmFnZXInKTtcbiAgICBcbiAgICAoZnVuY3Rpb24gbG9hZERhdGEoKSB7XG4gICAgICAgIHpVc2VyXG4gICAgICAgICAgICAuZ2V0KHsgaWQ6ICRyb3V0ZVBhcmFtcy5pZCB9KVxuICAgICAgICAgICAgLiRwcm9taXNlXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnVzZXIgPSB1c2VyO1xuICAgICAgICAgICAgICAgICRzY29wZS5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignVW5hYmxlIHRvIGxvYWQgcmVjb3JkOiAnICsgZXJyLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3NldHRpbmdzL2FwaScpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSkoKTtcbiAgICBcbiAgICAkc2NvcGUuc2F2ZVVzZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLmlzU2F2aW5nID0gdHJ1ZTtcbiAgICAgICAgJHNjb3BlLnVzZXJcbiAgICAgICAgICAgIC4kdXBkYXRlKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIubm90aWZ5KCdBUEkgS2V5IHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9zZXR0aW5ncy9hcGknKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdVbmFibGUgdG8gc2F2ZSByZWNvcmQ6ICcgKyBlcnIuZGF0YS5yZWFzb24pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pc1NhdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcbiAgICBcbiAgICAkc2NvcGUuZGVsZXRlVXNlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICRtb2RhbC5vcGVuKHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZGFzaGJvYXJkL3NldHRpbmdzL3VzZXJzL2RlbGV0ZS11c2VyLWRpYWxvZy5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd6TW9kYWxDdHJsJyxcbiAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICBpdGVtczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLnVzZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICRzY29wZS5pc1NhdmluZyA9IHRydWU7XG4gICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0XG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS51c2VyLiRyZW1vdmUoeyBpZDogJHNjb3BlLnVzZXIuX2lkIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIubm90aWZ5KCdBUEkgS2V5IGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9zZXR0aW5ncy9hcGknKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIgIT09ICdjYW5jZWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignVW5hYmxlIHRvIGRlbGV0ZTogJyArIGVyci5kYXRhLnJlYXNvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pc1NhdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcbiAgICBcbiAgICAkc2NvcGUucmVnZW5lcmF0ZUtleSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICRtb2RhbC5vcGVuKHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvZGFzaGJvYXJkL3NldHRpbmdzL2FwaXMvYXBpLXJlZ2VuZXJhdGUtZGlhbG9nLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3pNb2RhbEN0cmwnLFxuICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUudXNlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgJHNjb3BlLmlzU2F2aW5nID0gdHJ1ZTtcbiAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHRcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUudXNlci5wYXNzd29yZCA9IHpDb21tb25VdGlsLnJhbmRvbVB3KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS51c2VyLiR1cGRhdGUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIubm90aWZ5KCdBUEkgS2V5IHJlZ2VuZXJhdGVkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvc2V0dGluZ3MvYXBpLycgKyAkcm91dGVQYXJhbXMuaWQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVyciAhPT0gJ2NhbmNlbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdSZWdlbmVyYXRpb24gZmFpbGVkOiAnICsgZXJyLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzU2F2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').controller('zApiListCtrl', ['$scope', 'zUser', 'zIdentity', function($scope, zUser, zIdentity) {
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    
    (function loadData() {
        zUser
            .query()
            .$promise
            .then(function(users) {
                $scope.users = users;
                _.each(users, function(user) {
                    if (user.siteRoles && user.siteRoles.length > 0) {
                        user.roles = user.siteRoles[0].roles;
                    }
                });
            });
    })();
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9zZXR0aW5ncy9hcGlzL3pBcGlMaXN0Q3RybC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxXQUFXLGlEQUFnQixTQUFTLFFBQVEsT0FBTyxXQUFXO0lBQ2hGLE9BQU8sVUFBVSxVQUFVLGFBQWEsQ0FBQyxTQUFTOztJQUVsRCxDQUFDLFNBQVMsV0FBVztRQUNqQjthQUNLO2FBQ0E7YUFDQSxLQUFLLFNBQVMsT0FBTztnQkFDbEIsT0FBTyxRQUFRO2dCQUNmLEVBQUUsS0FBSyxPQUFPLFNBQVMsTUFBTTtvQkFDekIsSUFBSSxLQUFLLGFBQWEsS0FBSyxVQUFVLFNBQVMsR0FBRzt3QkFDN0MsS0FBSyxRQUFRLEtBQUssVUFBVSxHQUFHOzs7Ozs7QUFNdkQiLCJmaWxlIjoiY29udHJvbGxlcnMvZGFzaGJvYXJkL3NldHRpbmdzL2FwaXMvekFwaUxpc3RDdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ3pBcGlMaXN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgelVzZXIsIHpJZGVudGl0eSkge1xuICAgICRzY29wZS5jYW5FZGl0ID0geklkZW50aXR5LmlzQXV0aG9yaXplZChbJ293bmVyJywgJ21hbmFnZXInXSk7XG4gICAgXG4gICAgKGZ1bmN0aW9uIGxvYWREYXRhKCkge1xuICAgICAgICB6VXNlclxuICAgICAgICAgICAgLnF1ZXJ5KClcbiAgICAgICAgICAgIC4kcHJvbWlzZVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24odXNlcnMpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUudXNlcnMgPSB1c2VycztcbiAgICAgICAgICAgICAgICBfLmVhY2godXNlcnMsIGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXIuc2l0ZVJvbGVzICYmIHVzZXIuc2l0ZVJvbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIucm9sZXMgPSB1c2VyLnNpdGVSb2xlc1swXS5yb2xlcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfSkoKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').controller('zApiNewCtrl', ['$scope', 'zUser', 'zNotifier', '$location', 'zIdentity', 'zCommonUtil', function ($scope, zUser, zNotifier, $location, zIdentity, zCommonUtil) {
    /* jshint newcap: false */
    $scope.user = new zUser({
        roles: ['api'],
        password: zCommonUtil.randomPw()
    });
    $scope.isSaving = false;
    $scope.canEdit = zIdentity.isAuthorized('owner', 'manager');
    
    $scope.validate = function(event, displayName) {
        var Regexp = /[!#$%&@'*+\/=?^_`{|}~-\s]+/g;
        var testResult = Regexp.test(displayName);

        if(testResult) {
            $scope.userForm.$invalid = true;
            $scope.spaceWarning = true;
        } else {
            $scope.spaceWarning = false;
        }
    };

    $scope.closeAlert = function() {
        $scope.spaceWarning = false;
    };

    $scope.saveUser = function() {
        $scope.user.email = $scope.user.displayName + '@' +
            zIdentity.getCurrentUser().currentSite + '.com';
        
        $scope.isSaving = true;
        $scope.user
            .$save()
            .then(function() {
                zNotifier.notify('New API Key created');
                $location.path('/settings/api');
            })
            .catch(function(err) {
                zNotifier.error('Unable to save changes: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9zZXR0aW5ncy9hcGlzL3pBcGlOZXdDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcseUZBQWUsVUFBVSxRQUFRLE9BQU8sV0FBVyxXQUFXLFdBQVcsYUFBYTs7SUFFbkgsT0FBTyxPQUFPLElBQUksTUFBTTtRQUNwQixPQUFPLENBQUM7UUFDUixVQUFVLFlBQVk7O0lBRTFCLE9BQU8sV0FBVztJQUNsQixPQUFPLFVBQVUsVUFBVSxhQUFhLFNBQVM7O0lBRWpELE9BQU8sV0FBVyxTQUFTLE9BQU8sYUFBYTtRQUMzQyxJQUFJLFNBQVM7UUFDYixJQUFJLGFBQWEsT0FBTyxLQUFLOztRQUU3QixHQUFHLFlBQVk7WUFDWCxPQUFPLFNBQVMsV0FBVztZQUMzQixPQUFPLGVBQWU7ZUFDbkI7WUFDSCxPQUFPLGVBQWU7Ozs7SUFJOUIsT0FBTyxhQUFhLFdBQVc7UUFDM0IsT0FBTyxlQUFlOzs7SUFHMUIsT0FBTyxXQUFXLFdBQVc7UUFDekIsT0FBTyxLQUFLLFFBQVEsT0FBTyxLQUFLLGNBQWM7WUFDMUMsVUFBVSxpQkFBaUIsY0FBYzs7UUFFN0MsT0FBTyxXQUFXO1FBQ2xCLE9BQU87YUFDRjthQUNBLEtBQUssV0FBVztnQkFDYixVQUFVLE9BQU87Z0JBQ2pCLFVBQVUsS0FBSzs7YUFFbEIsTUFBTSxTQUFTLEtBQUs7Z0JBQ2pCLFVBQVUsTUFBTSw2QkFBNkIsSUFBSSxLQUFLOzthQUV6RCxRQUFRLFdBQVc7Z0JBQ2hCLE9BQU8sV0FBVzs7OztBQUlsQyIsImZpbGUiOiJjb250cm9sbGVycy9kYXNoYm9hcmQvc2V0dGluZ3MvYXBpcy96QXBpTmV3Q3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCd6QXBpTmV3Q3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIHpVc2VyLCB6Tm90aWZpZXIsICRsb2NhdGlvbiwgeklkZW50aXR5LCB6Q29tbW9uVXRpbCkge1xuICAgIC8qIGpzaGludCBuZXdjYXA6IGZhbHNlICovXG4gICAgJHNjb3BlLnVzZXIgPSBuZXcgelVzZXIoe1xuICAgICAgICByb2xlczogWydhcGknXSxcbiAgICAgICAgcGFzc3dvcmQ6IHpDb21tb25VdGlsLnJhbmRvbVB3KClcbiAgICB9KTtcbiAgICAkc2NvcGUuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAkc2NvcGUuY2FuRWRpdCA9IHpJZGVudGl0eS5pc0F1dGhvcml6ZWQoJ293bmVyJywgJ21hbmFnZXInKTtcbiAgICBcbiAgICAkc2NvcGUudmFsaWRhdGUgPSBmdW5jdGlvbihldmVudCwgZGlzcGxheU5hbWUpIHtcbiAgICAgICAgdmFyIFJlZ2V4cCA9IC9bISMkJSZAJyorXFwvPT9eX2B7fH1+LVxcc10rL2c7XG4gICAgICAgIHZhciB0ZXN0UmVzdWx0ID0gUmVnZXhwLnRlc3QoZGlzcGxheU5hbWUpO1xuXG4gICAgICAgIGlmKHRlc3RSZXN1bHQpIHtcbiAgICAgICAgICAgICRzY29wZS51c2VyRm9ybS4kaW52YWxpZCA9IHRydWU7XG4gICAgICAgICAgICAkc2NvcGUuc3BhY2VXYXJuaW5nID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRzY29wZS5zcGFjZVdhcm5pbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUuY2xvc2VBbGVydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuc3BhY2VXYXJuaW5nID0gZmFsc2U7XG4gICAgfTtcblxuICAgICRzY29wZS5zYXZlVXNlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUudXNlci5lbWFpbCA9ICRzY29wZS51c2VyLmRpc3BsYXlOYW1lICsgJ0AnICtcbiAgICAgICAgICAgIHpJZGVudGl0eS5nZXRDdXJyZW50VXNlcigpLmN1cnJlbnRTaXRlICsgJy5jb20nO1xuICAgICAgICBcbiAgICAgICAgJHNjb3BlLmlzU2F2aW5nID0gdHJ1ZTtcbiAgICAgICAgJHNjb3BlLnVzZXJcbiAgICAgICAgICAgIC4kc2F2ZSgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIubm90aWZ5KCdOZXcgQVBJIEtleSBjcmVhdGVkJyk7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9zZXR0aW5ncy9hcGknKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdVbmFibGUgdG8gc2F2ZSBjaGFuZ2VzOiAnICsgZXJyLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').controller('zProfileDetailsCtrl', ['$scope', '$location', '$routeParams', 'zIdentity', 'zUser', 'zResource', 'zNotifier', function($scope, $location, $routeParams, zIdentity, zUser, zResource, zNotifier) {
    $scope.isLoading = true;
    
    zUser
        .get({
            id: zIdentity.getCurrentUser()._id
        })
        .$promise
        .then(function(user) {
            $scope.user = user;
            $scope.isLoading = false;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load record: ' + err.data.reason);
            $location.path('/dashboard');
        });
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9zZXR0aW5ncy9wcm9maWxlL3pQcm9maWxlRGV0YWlsc0N0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sV0FBVywrR0FBdUIsU0FBUyxRQUFRLFdBQVcsY0FBYyxXQUFXLE9BQU8sV0FBVyxXQUFXO0lBQ3RJLE9BQU8sWUFBWTs7SUFFbkI7U0FDSyxJQUFJO1lBQ0QsSUFBSSxVQUFVLGlCQUFpQjs7U0FFbEM7U0FDQSxLQUFLLFNBQVMsTUFBTTtZQUNqQixPQUFPLE9BQU87WUFDZCxPQUFPLFlBQVk7O1NBRXRCLE1BQU0sU0FBUyxLQUFLO1lBQ2pCLFVBQVUsTUFBTSw0QkFBNEIsSUFBSSxLQUFLO1lBQ3JELFVBQVUsS0FBSzs7O0FBRzNCIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9zZXR0aW5ncy9wcm9maWxlL3pQcm9maWxlRGV0YWlsc0N0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignelByb2ZpbGVEZXRhaWxzQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGxvY2F0aW9uLCAkcm91dGVQYXJhbXMsIHpJZGVudGl0eSwgelVzZXIsIHpSZXNvdXJjZSwgek5vdGlmaWVyKSB7XG4gICAgJHNjb3BlLmlzTG9hZGluZyA9IHRydWU7XG4gICAgXG4gICAgelVzZXJcbiAgICAgICAgLmdldCh7XG4gICAgICAgICAgICBpZDogeklkZW50aXR5LmdldEN1cnJlbnRVc2VyKCkuX2lkXG4gICAgICAgIH0pXG4gICAgICAgIC4kcHJvbWlzZVxuICAgICAgICAudGhlbihmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgICAgICAkc2NvcGUudXNlciA9IHVzZXI7XG4gICAgICAgICAgICAkc2NvcGUuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignVW5hYmxlIHRvIGxvYWQgcmVjb3JkOiAnICsgZXJyLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvZGFzaGJvYXJkJyk7XG4gICAgICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').controller('zProfileEditCtrl', ['$scope', '$location', 'zAuth', 'zNotifier', 'zCommonUtil', 'zIdentity', 'zUser', function ($scope, $location, zAuth, zNotifier, zCommonUtil, zIdentity, zUser) {
    $scope.isLoading = true;
    $scope.isSaving = false;
    $scope.isChangingPic = false;
    $scope.imgChanged = 0;
    $scope.emailRegex = zCommonUtil.getEmailRegex();
    $scope.isMismatchPasswords = false;
    
    var origEmail;
    zUser
        .get({
            id: zIdentity.getCurrentUser()._id
        })
        .$promise
        .then(function(user) {
            $scope.user = user;
            origEmail = user.email;
            $scope.picInfo = {
                id: user._id,
                type: 'user',
                cb: function() {
                    $scope.user.pic = 's3';
                    $scope.imgChanged++;
                    $scope.isChangingPic = false;
                }
            };
            $scope.isLoading = false;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load record: ' + err.data.reason);
            $location.path('/settings/profile');
        });
        
    $scope.startChangingPic = function() {
        $scope.isChangingPic = true;
    };

    $scope.cancelChangingPic = function() {
        $scope.isChangingPic = false;
    };
    
    $scope.update = function () {
        $scope.isMismatchPasswords = $scope.user.password !== $scope.repeatPassword;
        if ($scope.isMismatchPasswords) {
            return zNotifier.error('Passwords don\'t match');
        }
        
        $scope.isSaving = true;
        var user;
        $scope.user
            .$update()
            .then(function (u) {
                user = u;
                return zAuth.refreshJwt();
            })
            .then(function() {
                if (user.email !== origEmail) {
                    zNotifier.info('Check email to confirm address change to ' + user.email);
                } else {
                    zNotifier.notify('Your profile has been updated');
                }
                $location.path('/settings/profile');
            })
            .catch(function (err) {
                zNotifier.error('Unable to save record: ' + err.data.reason);
            });
    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9zZXR0aW5ncy9wcm9maWxlL3pQcm9maWxlRWRpdEN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sV0FBVyx1R0FBb0IsVUFBVSxRQUFRLFdBQVcsT0FBTyxXQUFXLGFBQWEsV0FBVyxPQUFPO0lBQy9ILE9BQU8sWUFBWTtJQUNuQixPQUFPLFdBQVc7SUFDbEIsT0FBTyxnQkFBZ0I7SUFDdkIsT0FBTyxhQUFhO0lBQ3BCLE9BQU8sYUFBYSxZQUFZO0lBQ2hDLE9BQU8sc0JBQXNCOztJQUU3QixJQUFJO0lBQ0o7U0FDSyxJQUFJO1lBQ0QsSUFBSSxVQUFVLGlCQUFpQjs7U0FFbEM7U0FDQSxLQUFLLFNBQVMsTUFBTTtZQUNqQixPQUFPLE9BQU87WUFDZCxZQUFZLEtBQUs7WUFDakIsT0FBTyxVQUFVO2dCQUNiLElBQUksS0FBSztnQkFDVCxNQUFNO2dCQUNOLElBQUksV0FBVztvQkFDWCxPQUFPLEtBQUssTUFBTTtvQkFDbEIsT0FBTztvQkFDUCxPQUFPLGdCQUFnQjs7O1lBRy9CLE9BQU8sWUFBWTs7U0FFdEIsTUFBTSxTQUFTLEtBQUs7WUFDakIsVUFBVSxNQUFNLDRCQUE0QixJQUFJLEtBQUs7WUFDckQsVUFBVSxLQUFLOzs7SUFHdkIsT0FBTyxtQkFBbUIsV0FBVztRQUNqQyxPQUFPLGdCQUFnQjs7O0lBRzNCLE9BQU8sb0JBQW9CLFdBQVc7UUFDbEMsT0FBTyxnQkFBZ0I7OztJQUczQixPQUFPLFNBQVMsWUFBWTtRQUN4QixPQUFPLHNCQUFzQixPQUFPLEtBQUssYUFBYSxPQUFPO1FBQzdELElBQUksT0FBTyxxQkFBcUI7WUFDNUIsT0FBTyxVQUFVLE1BQU07OztRQUczQixPQUFPLFdBQVc7UUFDbEIsSUFBSTtRQUNKLE9BQU87YUFDRjthQUNBLEtBQUssVUFBVSxHQUFHO2dCQUNmLE9BQU87Z0JBQ1AsT0FBTyxNQUFNOzthQUVoQixLQUFLLFdBQVc7Z0JBQ2IsSUFBSSxLQUFLLFVBQVUsV0FBVztvQkFDMUIsVUFBVSxLQUFLLDhDQUE4QyxLQUFLO3VCQUMvRDtvQkFDSCxVQUFVLE9BQU87O2dCQUVyQixVQUFVLEtBQUs7O2FBRWxCLE1BQU0sVUFBVSxLQUFLO2dCQUNsQixVQUFVLE1BQU0sNEJBQTRCLElBQUksS0FBSzs7OztBQUlyRSIsImZpbGUiOiJjb250cm9sbGVycy9kYXNoYm9hcmQvc2V0dGluZ3MvcHJvZmlsZS96UHJvZmlsZUVkaXRDdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ3pQcm9maWxlRWRpdEN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCAkbG9jYXRpb24sIHpBdXRoLCB6Tm90aWZpZXIsIHpDb21tb25VdGlsLCB6SWRlbnRpdHksIHpVc2VyKSB7XG4gICAgJHNjb3BlLmlzTG9hZGluZyA9IHRydWU7XG4gICAgJHNjb3BlLmlzU2F2aW5nID0gZmFsc2U7XG4gICAgJHNjb3BlLmlzQ2hhbmdpbmdQaWMgPSBmYWxzZTtcbiAgICAkc2NvcGUuaW1nQ2hhbmdlZCA9IDA7XG4gICAgJHNjb3BlLmVtYWlsUmVnZXggPSB6Q29tbW9uVXRpbC5nZXRFbWFpbFJlZ2V4KCk7XG4gICAgJHNjb3BlLmlzTWlzbWF0Y2hQYXNzd29yZHMgPSBmYWxzZTtcbiAgICBcbiAgICB2YXIgb3JpZ0VtYWlsO1xuICAgIHpVc2VyXG4gICAgICAgIC5nZXQoe1xuICAgICAgICAgICAgaWQ6IHpJZGVudGl0eS5nZXRDdXJyZW50VXNlcigpLl9pZFxuICAgICAgICB9KVxuICAgICAgICAuJHByb21pc2VcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24odXNlcikge1xuICAgICAgICAgICAgJHNjb3BlLnVzZXIgPSB1c2VyO1xuICAgICAgICAgICAgb3JpZ0VtYWlsID0gdXNlci5lbWFpbDtcbiAgICAgICAgICAgICRzY29wZS5waWNJbmZvID0ge1xuICAgICAgICAgICAgICAgIGlkOiB1c2VyLl9pZCxcbiAgICAgICAgICAgICAgICB0eXBlOiAndXNlcicsXG4gICAgICAgICAgICAgICAgY2I6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudXNlci5waWMgPSAnczMnO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaW1nQ2hhbmdlZCsrO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaXNDaGFuZ2luZ1BpYyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2NvcGUuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignVW5hYmxlIHRvIGxvYWQgcmVjb3JkOiAnICsgZXJyLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvc2V0dGluZ3MvcHJvZmlsZScpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgJHNjb3BlLnN0YXJ0Q2hhbmdpbmdQaWMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLmlzQ2hhbmdpbmdQaWMgPSB0cnVlO1xuICAgIH07XG5cbiAgICAkc2NvcGUuY2FuY2VsQ2hhbmdpbmdQaWMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLmlzQ2hhbmdpbmdQaWMgPSBmYWxzZTtcbiAgICB9O1xuICAgIFxuICAgICRzY29wZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRzY29wZS5pc01pc21hdGNoUGFzc3dvcmRzID0gJHNjb3BlLnVzZXIucGFzc3dvcmQgIT09ICRzY29wZS5yZXBlYXRQYXNzd29yZDtcbiAgICAgICAgaWYgKCRzY29wZS5pc01pc21hdGNoUGFzc3dvcmRzKSB7XG4gICAgICAgICAgICByZXR1cm4gek5vdGlmaWVyLmVycm9yKCdQYXNzd29yZHMgZG9uXFwndCBtYXRjaCcpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAkc2NvcGUuaXNTYXZpbmcgPSB0cnVlO1xuICAgICAgICB2YXIgdXNlcjtcbiAgICAgICAgJHNjb3BlLnVzZXJcbiAgICAgICAgICAgIC4kdXBkYXRlKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh1KSB7XG4gICAgICAgICAgICAgICAgdXNlciA9IHU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHpBdXRoLnJlZnJlc2hKd3QoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAodXNlci5lbWFpbCAhPT0gb3JpZ0VtYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHpOb3RpZmllci5pbmZvKCdDaGVjayBlbWFpbCB0byBjb25maXJtIGFkZHJlc3MgY2hhbmdlIHRvICcgKyB1c2VyLmVtYWlsKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB6Tm90aWZpZXIubm90aWZ5KCdZb3VyIHByb2ZpbGUgaGFzIGJlZW4gdXBkYXRlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3NldHRpbmdzL3Byb2ZpbGUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignVW5hYmxlIHRvIHNhdmUgcmVjb3JkOiAnICsgZXJyLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').controller('zSiteDetailsCtrl', ['$scope', '$routeParams', '$location', 'zNotifier', 'zSite', 'zUser', function($scope, $routeParams, $location, zNotifier, zSite, zUser) {
    $scope.isLoading = true;
    
    zSite.siteResource
        .get({id : $routeParams.id})
        .$promise
        .then(function(site) {
            $scope.site = site;
            return site;
        })
        .then(function() {
            return zUser.query().$promise;
        })
        .then(function(users) {
            $scope.site.users = users;
            $scope.isLoading = false;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load record: ' + err.data.reason);
            $location.path('/settings/sites');
        });
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9zZXR0aW5ncy9zaXRlcy96U2l0ZURldGFpbHNDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcsMkZBQW9CLFNBQVMsUUFBUSxjQUFjLFdBQVcsV0FBVyxPQUFPLE9BQU87SUFDcEgsT0FBTyxZQUFZOztJQUVuQixNQUFNO1NBQ0QsSUFBSSxDQUFDLEtBQUssYUFBYTtTQUN2QjtTQUNBLEtBQUssU0FBUyxNQUFNO1lBQ2pCLE9BQU8sT0FBTztZQUNkLE9BQU87O1NBRVYsS0FBSyxXQUFXO1lBQ2IsT0FBTyxNQUFNLFFBQVE7O1NBRXhCLEtBQUssU0FBUyxPQUFPO1lBQ2xCLE9BQU8sS0FBSyxRQUFRO1lBQ3BCLE9BQU8sWUFBWTs7U0FFdEIsTUFBTSxTQUFTLEtBQUs7WUFDakIsVUFBVSxNQUFNLDRCQUE0QixJQUFJLEtBQUs7WUFDckQsVUFBVSxLQUFLOzs7QUFHM0IiLCJmaWxlIjoiY29udHJvbGxlcnMvZGFzaGJvYXJkL3NldHRpbmdzL3NpdGVzL3pTaXRlRGV0YWlsc0N0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignelNpdGVEZXRhaWxzQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvdXRlUGFyYW1zLCAkbG9jYXRpb24sIHpOb3RpZmllciwgelNpdGUsIHpVc2VyKSB7XG4gICAgJHNjb3BlLmlzTG9hZGluZyA9IHRydWU7XG4gICAgXG4gICAgelNpdGUuc2l0ZVJlc291cmNlXG4gICAgICAgIC5nZXQoe2lkIDogJHJvdXRlUGFyYW1zLmlkfSlcbiAgICAgICAgLiRwcm9taXNlXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHNpdGUpIHtcbiAgICAgICAgICAgICRzY29wZS5zaXRlID0gc2l0ZTtcbiAgICAgICAgICAgIHJldHVybiBzaXRlO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB6VXNlci5xdWVyeSgpLiRwcm9taXNlO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbih1c2Vycykge1xuICAgICAgICAgICAgJHNjb3BlLnNpdGUudXNlcnMgPSB1c2VycztcbiAgICAgICAgICAgICRzY29wZS5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdVbmFibGUgdG8gbG9hZCByZWNvcmQ6ICcgKyBlcnIuZGF0YS5yZWFzb24pO1xuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9zZXR0aW5ncy9zaXRlcycpO1xuICAgICAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').controller('zSiteEditCtrl', ['$scope', '$location', 'zNotifier', '$routeParams', 'zCommonUtil', 'zSite', 'zIdentity', function($scope, $location, zNotifier, $routeParams, zCommonUtil, zSite, zIdentity) {
    $scope.isLoading = true;
    $scope.isSaving = false;
    $scope.isChangingPic = false;
    $scope.imgChanged = 0;
    $scope.emailRegex = zCommonUtil.getEmailRegex();
    
    zSite.siteResource
        .get({id : $routeParams.id})
        .$promise
        .then(function(site) {
            $scope.site = site;
            $scope.canDelete = site._id !== zIdentity.getCurrentUser().currentSite;
            $scope.picInfo = {
                id: site._id,
                type: 'site',
                cb: function() {
                    $scope.site.pic = 's3';
                    $scope.imgChanged++;
                    $scope.isChangingPic = false;
                }
            };
            $scope.isLoading = false;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load record: ' + err.data.reason);
            $location.path('/settings/sites');
        });
    
    $scope.startChangingPic = function() {
        $scope.isChangingPic = true;
    };

    $scope.cancelChangingPic = function() {
        $scope.isChangingPic = false;
    };

    $scope.saveSite = function() {
        $scope.isSaving = true;
        $scope.site
            .$update()
            .then(function() {
                zSite.refreshSites(true);
                zNotifier.notify('Site updated successfully');
                $location.path('/settings/sites');
            })
            .catch(function(err) {
                zNotifier.error('Unable to save record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };

    $scope.deleteSite = function() {
        $scope.isSaving = true;
        $scope.site
            .$delete(function() {
                zSite.refreshSites(true);
                zNotifier.notify('Site deleted successfully');
                $location.path('/settings/sites');
            })
            .catch(function(err) {
                zNotifier.error('Unable to delete record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9zZXR0aW5ncy9zaXRlcy96U2l0ZUVkaXRDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcsMkdBQWlCLFNBQVMsUUFBUSxXQUFXLFdBQVcsY0FBYyxhQUFhLE9BQU8sV0FBVztJQUNsSSxPQUFPLFlBQVk7SUFDbkIsT0FBTyxXQUFXO0lBQ2xCLE9BQU8sZ0JBQWdCO0lBQ3ZCLE9BQU8sYUFBYTtJQUNwQixPQUFPLGFBQWEsWUFBWTs7SUFFaEMsTUFBTTtTQUNELElBQUksQ0FBQyxLQUFLLGFBQWE7U0FDdkI7U0FDQSxLQUFLLFNBQVMsTUFBTTtZQUNqQixPQUFPLE9BQU87WUFDZCxPQUFPLFlBQVksS0FBSyxRQUFRLFVBQVUsaUJBQWlCO1lBQzNELE9BQU8sVUFBVTtnQkFDYixJQUFJLEtBQUs7Z0JBQ1QsTUFBTTtnQkFDTixJQUFJLFdBQVc7b0JBQ1gsT0FBTyxLQUFLLE1BQU07b0JBQ2xCLE9BQU87b0JBQ1AsT0FBTyxnQkFBZ0I7OztZQUcvQixPQUFPLFlBQVk7O1NBRXRCLE1BQU0sU0FBUyxLQUFLO1lBQ2pCLFVBQVUsTUFBTSw0QkFBNEIsSUFBSSxLQUFLO1lBQ3JELFVBQVUsS0FBSzs7O0lBR3ZCLE9BQU8sbUJBQW1CLFdBQVc7UUFDakMsT0FBTyxnQkFBZ0I7OztJQUczQixPQUFPLG9CQUFvQixXQUFXO1FBQ2xDLE9BQU8sZ0JBQWdCOzs7SUFHM0IsT0FBTyxXQUFXLFdBQVc7UUFDekIsT0FBTyxXQUFXO1FBQ2xCLE9BQU87YUFDRjthQUNBLEtBQUssV0FBVztnQkFDYixNQUFNLGFBQWE7Z0JBQ25CLFVBQVUsT0FBTztnQkFDakIsVUFBVSxLQUFLOzthQUVsQixNQUFNLFNBQVMsS0FBSztnQkFDakIsVUFBVSxNQUFNLDRCQUE0QixJQUFJLEtBQUs7O2FBRXhELFFBQVEsV0FBVztnQkFDaEIsT0FBTyxXQUFXOzs7O0lBSTlCLE9BQU8sYUFBYSxXQUFXO1FBQzNCLE9BQU8sV0FBVztRQUNsQixPQUFPO2FBQ0YsUUFBUSxXQUFXO2dCQUNoQixNQUFNLGFBQWE7Z0JBQ25CLFVBQVUsT0FBTztnQkFDakIsVUFBVSxLQUFLOzthQUVsQixNQUFNLFNBQVMsS0FBSztnQkFDakIsVUFBVSxNQUFNLDhCQUE4QixJQUFJLEtBQUs7O2FBRTFELFFBQVEsV0FBVztnQkFDaEIsT0FBTyxXQUFXOzs7O0FBSWxDIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9zZXR0aW5ncy9zaXRlcy96U2l0ZUVkaXRDdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ3pTaXRlRWRpdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRsb2NhdGlvbiwgek5vdGlmaWVyLCAkcm91dGVQYXJhbXMsIHpDb21tb25VdGlsLCB6U2l0ZSwgeklkZW50aXR5KSB7XG4gICAgJHNjb3BlLmlzTG9hZGluZyA9IHRydWU7XG4gICAgJHNjb3BlLmlzU2F2aW5nID0gZmFsc2U7XG4gICAgJHNjb3BlLmlzQ2hhbmdpbmdQaWMgPSBmYWxzZTtcbiAgICAkc2NvcGUuaW1nQ2hhbmdlZCA9IDA7XG4gICAgJHNjb3BlLmVtYWlsUmVnZXggPSB6Q29tbW9uVXRpbC5nZXRFbWFpbFJlZ2V4KCk7XG4gICAgXG4gICAgelNpdGUuc2l0ZVJlc291cmNlXG4gICAgICAgIC5nZXQoe2lkIDogJHJvdXRlUGFyYW1zLmlkfSlcbiAgICAgICAgLiRwcm9taXNlXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHNpdGUpIHtcbiAgICAgICAgICAgICRzY29wZS5zaXRlID0gc2l0ZTtcbiAgICAgICAgICAgICRzY29wZS5jYW5EZWxldGUgPSBzaXRlLl9pZCAhPT0geklkZW50aXR5LmdldEN1cnJlbnRVc2VyKCkuY3VycmVudFNpdGU7XG4gICAgICAgICAgICAkc2NvcGUucGljSW5mbyA9IHtcbiAgICAgICAgICAgICAgICBpZDogc2l0ZS5faWQsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3NpdGUnLFxuICAgICAgICAgICAgICAgIGNiOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNpdGUucGljID0gJ3MzJztcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmltZ0NoYW5nZWQrKztcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmlzQ2hhbmdpbmdQaWMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJHNjb3BlLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICB6Tm90aWZpZXIuZXJyb3IoJ1VuYWJsZSB0byBsb2FkIHJlY29yZDogJyArIGVyci5kYXRhLnJlYXNvbik7XG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3NldHRpbmdzL3NpdGVzJyk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgICRzY29wZS5zdGFydENoYW5naW5nUGljID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5pc0NoYW5naW5nUGljID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmNhbmNlbENoYW5naW5nUGljID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5pc0NoYW5naW5nUGljID0gZmFsc2U7XG4gICAgfTtcblxuICAgICRzY29wZS5zYXZlU2l0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuaXNTYXZpbmcgPSB0cnVlO1xuICAgICAgICAkc2NvcGUuc2l0ZVxuICAgICAgICAgICAgLiR1cGRhdGUoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgelNpdGUucmVmcmVzaFNpdGVzKHRydWUpO1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5ub3RpZnkoJ1NpdGUgdXBkYXRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3NldHRpbmdzL3NpdGVzJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignVW5hYmxlIHRvIHNhdmUgcmVjb3JkOiAnICsgZXJyLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZGVsZXRlU2l0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuaXNTYXZpbmcgPSB0cnVlO1xuICAgICAgICAkc2NvcGUuc2l0ZVxuICAgICAgICAgICAgLiRkZWxldGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgelNpdGUucmVmcmVzaFNpdGVzKHRydWUpO1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5ub3RpZnkoJ1NpdGUgZGVsZXRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3NldHRpbmdzL3NpdGVzJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignVW5hYmxlIHRvIGRlbGV0ZSByZWNvcmQ6ICcgKyBlcnIuZGF0YS5yZWFzb24pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maW5hbGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pc1NhdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').controller('zSiteListCtrl', ['$scope', 'zSite', function($scope, zSite) {
    $scope.sites = zSite.siteResource.query();
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9zZXR0aW5ncy9zaXRlcy96U2l0ZUxpc3RDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcscUNBQWlCLFNBQVMsUUFBUSxPQUFPO0lBQ3RFLE9BQU8sUUFBUSxNQUFNLGFBQWE7SUFDbkMiLCJmaWxlIjoiY29udHJvbGxlcnMvZGFzaGJvYXJkL3NldHRpbmdzL3NpdGVzL3pTaXRlTGlzdEN0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignelNpdGVMaXN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgelNpdGUpIHtcbiAgICAkc2NvcGUuc2l0ZXMgPSB6U2l0ZS5zaXRlUmVzb3VyY2UucXVlcnkoKTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').controller('zSiteNewCtrl', ['$scope', 'zNotifier', '$location', 'zCommonUtil', 'zSite', function($scope, zNotifier, $location, zCommonUtil, zSite) {
    /* jshint newcap: false */
    $scope.site = new zSite.siteResource();
    $scope.isSaving = false;
    $scope.emailRegex = zCommonUtil.getEmailRegex();
    
    $scope.createSite = function() {
        $scope.isSaving = true;
        $scope.site
            .$save()
            .then(function () {
                zNotifier.notify('New site created successfully');
                $location.path('/settings/sites');
            })
            .catch(function (err) {
                zNotifier.error('Unable to save changes: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9zZXR0aW5ncy9zaXRlcy96U2l0ZU5ld0N0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sV0FBVyw2RUFBZ0IsU0FBUyxRQUFRLFdBQVcsV0FBVyxhQUFhLE9BQU87O0lBRXhHLE9BQU8sT0FBTyxJQUFJLE1BQU07SUFDeEIsT0FBTyxXQUFXO0lBQ2xCLE9BQU8sYUFBYSxZQUFZOztJQUVoQyxPQUFPLGFBQWEsV0FBVztRQUMzQixPQUFPLFdBQVc7UUFDbEIsT0FBTzthQUNGO2FBQ0EsS0FBSyxZQUFZO2dCQUNkLFVBQVUsT0FBTztnQkFDakIsVUFBVSxLQUFLOzthQUVsQixNQUFNLFVBQVUsS0FBSztnQkFDbEIsVUFBVSxNQUFNLDZCQUE2QixJQUFJLEtBQUs7O2FBRXpELFFBQVEsV0FBVztnQkFDaEIsT0FBTyxXQUFXOzs7O0FBSWxDIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9zZXR0aW5ncy9zaXRlcy96U2l0ZU5ld0N0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignelNpdGVOZXdDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCB6Tm90aWZpZXIsICRsb2NhdGlvbiwgekNvbW1vblV0aWwsIHpTaXRlKSB7XG4gICAgLyoganNoaW50IG5ld2NhcDogZmFsc2UgKi9cbiAgICAkc2NvcGUuc2l0ZSA9IG5ldyB6U2l0ZS5zaXRlUmVzb3VyY2UoKTtcbiAgICAkc2NvcGUuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAkc2NvcGUuZW1haWxSZWdleCA9IHpDb21tb25VdGlsLmdldEVtYWlsUmVnZXgoKTtcbiAgICBcbiAgICAkc2NvcGUuY3JlYXRlU2l0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuaXNTYXZpbmcgPSB0cnVlO1xuICAgICAgICAkc2NvcGUuc2l0ZVxuICAgICAgICAgICAgLiRzYXZlKClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIubm90aWZ5KCdOZXcgc2l0ZSBjcmVhdGVkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvc2V0dGluZ3Mvc2l0ZXMnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignVW5hYmxlIHRvIHNhdmUgY2hhbmdlczogJyArIGVyci5kYXRhLnJlYXNvbik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzU2F2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').controller('zUserDetailsCtrl', ['$scope', '$location', '$routeParams', 'zIdentity', 'zUser', 'zResource', 'zNotifier', function($scope, $location, $routeParams, zIdentity, zUser, zResource, zNotifier) {
    $scope.isLoading = true;
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    
    zUser
        .get({ id : $routeParams.id })
        .$promise
        .then(function(user) {
            $scope.user = user;
            $scope.user.roles = $scope.user.roles.join(', ');
            return user;
        })
        .then(function(user) {
          return zResource.query({
                practitioner: user._id
            }).$promise;
        })
        .then(function(resources) {
            if (resources.length > 0) {
                $scope.user.linkedResource = resources[0];
            }
            $scope.isLoading = false;
        })
        .catch(function(err) {
            zNotifier.error('Unable to load record: ' + err.data.reason);
            $location.path('/settings/users');
        });
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9zZXR0aW5ncy91c2Vycy96VXNlckRldGFpbHNDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcsNEdBQW9CLFNBQVMsUUFBUSxXQUFXLGNBQWMsV0FBVyxPQUFPLFdBQVcsV0FBVztJQUNuSSxPQUFPLFlBQVk7SUFDbkIsT0FBTyxVQUFVLFVBQVUsYUFBYSxDQUFDLFNBQVM7O0lBRWxEO1NBQ0ssSUFBSSxFQUFFLEtBQUssYUFBYTtTQUN4QjtTQUNBLEtBQUssU0FBUyxNQUFNO1lBQ2pCLE9BQU8sT0FBTztZQUNkLE9BQU8sS0FBSyxRQUFRLE9BQU8sS0FBSyxNQUFNLEtBQUs7WUFDM0MsT0FBTzs7U0FFVixLQUFLLFNBQVMsTUFBTTtVQUNuQixPQUFPLFVBQVUsTUFBTTtnQkFDakIsY0FBYyxLQUFLO2VBQ3BCOztTQUVOLEtBQUssU0FBUyxXQUFXO1lBQ3RCLElBQUksVUFBVSxTQUFTLEdBQUc7Z0JBQ3RCLE9BQU8sS0FBSyxpQkFBaUIsVUFBVTs7WUFFM0MsT0FBTyxZQUFZOztTQUV0QixNQUFNLFNBQVMsS0FBSztZQUNqQixVQUFVLE1BQU0sNEJBQTRCLElBQUksS0FBSztZQUNyRCxVQUFVLEtBQUs7OztBQUczQiIsImZpbGUiOiJjb250cm9sbGVycy9kYXNoYm9hcmQvc2V0dGluZ3MvdXNlcnMvelVzZXJEZXRhaWxzQ3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCd6VXNlckRldGFpbHNDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24sICRyb3V0ZVBhcmFtcywgeklkZW50aXR5LCB6VXNlciwgelJlc291cmNlLCB6Tm90aWZpZXIpIHtcbiAgICAkc2NvcGUuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAkc2NvcGUuY2FuRWRpdCA9IHpJZGVudGl0eS5pc0F1dGhvcml6ZWQoWydvd25lcicsICdtYW5hZ2VyJ10pO1xuICAgIFxuICAgIHpVc2VyXG4gICAgICAgIC5nZXQoeyBpZCA6ICRyb3V0ZVBhcmFtcy5pZCB9KVxuICAgICAgICAuJHByb21pc2VcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24odXNlcikge1xuICAgICAgICAgICAgJHNjb3BlLnVzZXIgPSB1c2VyO1xuICAgICAgICAgICAgJHNjb3BlLnVzZXIucm9sZXMgPSAkc2NvcGUudXNlci5yb2xlcy5qb2luKCcsICcpO1xuICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgICByZXR1cm4gelJlc291cmNlLnF1ZXJ5KHtcbiAgICAgICAgICAgICAgICBwcmFjdGl0aW9uZXI6IHVzZXIuX2lkXG4gICAgICAgICAgICB9KS4kcHJvbWlzZTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzb3VyY2VzKSB7XG4gICAgICAgICAgICBpZiAocmVzb3VyY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUudXNlci5saW5rZWRSZXNvdXJjZSA9IHJlc291cmNlc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRzY29wZS5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdVbmFibGUgdG8gbG9hZCByZWNvcmQ6ICcgKyBlcnIuZGF0YS5yZWFzb24pO1xuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9zZXR0aW5ncy91c2VycycpO1xuICAgICAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').controller('zUserEditCtrl', ['$scope', '$routeParams', '$modal', '$location', '$http', 'zCommonUtil', 'zNotifier', 'zIdentity', 'zUser', 'zResource', 'zAuth', function (
    $scope, $routeParams, $modal, $location, $http, zCommonUtil,
    zNotifier, zIdentity, zUser, zResource, zAuth) {
    
    $scope.isLoading = true;
    $scope.isSaving = false;
    $scope.isChangingPic = false;
    $scope.imgChanged = 0;
    $scope.canEdit = zIdentity.isAuthorized('owner', 'manager');
    $scope.emailRegex = zCommonUtil.getEmailRegex();
    
    $scope.roles = ['owner', 'manager', 'admin', 'service provider', 'scheduler'];
    if (zIdentity.getCurrentUser().roles.indexOf('owner') === -1) {
        $scope.roles = _.without($scope.roles, 'owner');
    }
    
    (function loadData() {
        zUser
            .get({ id: $routeParams.id })
            .$promise
            .then(function(user) {
                zNotifier.notify('Ready to edit ' + user.name);
                $scope.user = user;
                // TODO: temporary fix:
                var clinicalRoleIndex = _.indexOf($scope.user.roles, 'clinical');
                if (clinicalRoleIndex !== -1) {
                    $scope.user.roles[clinicalRoleIndex] = 'service provider';
                }
                $scope.picInfo = {
                    id: user._id,
                    type: 'user',
                    cb: function() {
                        $scope.user.pic = 's3';
                        $scope.imgChanged++;
                        $scope.isChangingPic = false;
                        if ($scope.user.linkedResource) {
                            var url = '/api/uploads/copy?srcId=:srcId&srcType=user&dstId=:dstId&dstType=resource'
                                .replace(':srcId', $scope.user._id)
                                .replace(':dstId', $scope.user.linkedResource);
                            return $http.post(url);
                        }
                    }
                };
                return user;
            })
            .then(function() {
                return zResource.query().$promise;
            })
            .then(function(resources) {
                $scope.resources = _.filter(resources, function(resource) {
                    return !resource.practitioner || resource.practitioner === $scope.user._id;
                });
                var linkedResource = _.find(resources, { practitioner: $scope.user._id });
                $scope.user.linkedResource = linkedResource ? linkedResource._id : null;
                $scope.isLoading = false;
            })
            .catch(function (err) {
                zNotifier.error('Unable to load record: ' + err.data.reason);
                $location.path('/settings/users');
            });
    })();
    
    $scope.startChangingPic = function() {
        $scope.isChangingPic = true;
    };

    $scope.cancelChangingPic = function() {
        $scope.isChangingPic = false;
    };

    $scope.saveUser = function() {
        $scope.isSaving = true;
        $scope.user
            .$update()
            .then(function () {
                if ($scope.user._id === zIdentity.getCurrentUser()._id) {
                    return zAuth.refreshJwt();
                }
            })
            .then(function() {
                zNotifier.notify('User updated successfully');
                $location.path('/settings/users');
            })
            .catch(function(err) {
                zNotifier.error('Unable to save record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };

    $scope.deleteUser = function() {
        var modalInstance = $modal.open({
            templateUrl: 'views/dashboard/settings/users/delete-user-dialog.html',
            controller: 'zModalCtrl',
            resolve: {
                items: function () {
                    return $scope.user;
                }
            }
        });
        
        $scope.isSaving = true;
        modalInstance.result
            .then(function () {
                return $scope.user.$remove({
                    id: $scope.user._id
                });
            })
            .then(function () {
                zNotifier.notify('User deleted');
                $location.path('/settings/users');
            })
            .catch(function (err) {
                if (err !== 'cancel') {
                    zNotifier.error('Unable to delete record: ' + err.data.reason);
                }
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };

    $scope.resendInviteEmail = function () {
        $scope.isSaving = true;
        $scope.user
            .$update({
                id: $scope.user._id,
                action: 'sendNewUserEmail'
            })
            .then(function () {
                zNotifier.notify('New user email resent to ' + $scope.user.email);
                $location.path('/settings/users');
            })
            .catch(function (err) {
                zNotifier.error('Unable to resend invate email: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9zZXR0aW5ncy91c2Vycy96VXNlckVkaXRDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcsb0pBQWlCO0lBQzlDLFFBQVEsY0FBYyxRQUFRLFdBQVcsT0FBTztJQUNoRCxXQUFXLFdBQVcsT0FBTyxXQUFXLE9BQU87O0lBRS9DLE9BQU8sWUFBWTtJQUNuQixPQUFPLFdBQVc7SUFDbEIsT0FBTyxnQkFBZ0I7SUFDdkIsT0FBTyxhQUFhO0lBQ3BCLE9BQU8sVUFBVSxVQUFVLGFBQWEsU0FBUztJQUNqRCxPQUFPLGFBQWEsWUFBWTs7SUFFaEMsT0FBTyxRQUFRLENBQUMsU0FBUyxXQUFXLFNBQVMsb0JBQW9CO0lBQ2pFLElBQUksVUFBVSxpQkFBaUIsTUFBTSxRQUFRLGFBQWEsQ0FBQyxHQUFHO1FBQzFELE9BQU8sUUFBUSxFQUFFLFFBQVEsT0FBTyxPQUFPOzs7SUFHM0MsQ0FBQyxTQUFTLFdBQVc7UUFDakI7YUFDSyxJQUFJLEVBQUUsSUFBSSxhQUFhO2FBQ3ZCO2FBQ0EsS0FBSyxTQUFTLE1BQU07Z0JBQ2pCLFVBQVUsT0FBTyxtQkFBbUIsS0FBSztnQkFDekMsT0FBTyxPQUFPOztnQkFFZCxJQUFJLG9CQUFvQixFQUFFLFFBQVEsT0FBTyxLQUFLLE9BQU87Z0JBQ3JELElBQUksc0JBQXNCLENBQUMsR0FBRztvQkFDMUIsT0FBTyxLQUFLLE1BQU0scUJBQXFCOztnQkFFM0MsT0FBTyxVQUFVO29CQUNiLElBQUksS0FBSztvQkFDVCxNQUFNO29CQUNOLElBQUksV0FBVzt3QkFDWCxPQUFPLEtBQUssTUFBTTt3QkFDbEIsT0FBTzt3QkFDUCxPQUFPLGdCQUFnQjt3QkFDdkIsSUFBSSxPQUFPLEtBQUssZ0JBQWdCOzRCQUM1QixJQUFJLE1BQU07aUNBQ0wsUUFBUSxVQUFVLE9BQU8sS0FBSztpQ0FDOUIsUUFBUSxVQUFVLE9BQU8sS0FBSzs0QkFDbkMsT0FBTyxNQUFNLEtBQUs7Ozs7Z0JBSTlCLE9BQU87O2FBRVYsS0FBSyxXQUFXO2dCQUNiLE9BQU8sVUFBVSxRQUFROzthQUU1QixLQUFLLFNBQVMsV0FBVztnQkFDdEIsT0FBTyxZQUFZLEVBQUUsT0FBTyxXQUFXLFNBQVMsVUFBVTtvQkFDdEQsT0FBTyxDQUFDLFNBQVMsZ0JBQWdCLFNBQVMsaUJBQWlCLE9BQU8sS0FBSzs7Z0JBRTNFLElBQUksaUJBQWlCLEVBQUUsS0FBSyxXQUFXLEVBQUUsY0FBYyxPQUFPLEtBQUs7Z0JBQ25FLE9BQU8sS0FBSyxpQkFBaUIsaUJBQWlCLGVBQWUsTUFBTTtnQkFDbkUsT0FBTyxZQUFZOzthQUV0QixNQUFNLFVBQVUsS0FBSztnQkFDbEIsVUFBVSxNQUFNLDRCQUE0QixJQUFJLEtBQUs7Z0JBQ3JELFVBQVUsS0FBSzs7OztJQUkzQixPQUFPLG1CQUFtQixXQUFXO1FBQ2pDLE9BQU8sZ0JBQWdCOzs7SUFHM0IsT0FBTyxvQkFBb0IsV0FBVztRQUNsQyxPQUFPLGdCQUFnQjs7O0lBRzNCLE9BQU8sV0FBVyxXQUFXO1FBQ3pCLE9BQU8sV0FBVztRQUNsQixPQUFPO2FBQ0Y7YUFDQSxLQUFLLFlBQVk7Z0JBQ2QsSUFBSSxPQUFPLEtBQUssUUFBUSxVQUFVLGlCQUFpQixLQUFLO29CQUNwRCxPQUFPLE1BQU07OzthQUdwQixLQUFLLFdBQVc7Z0JBQ2IsVUFBVSxPQUFPO2dCQUNqQixVQUFVLEtBQUs7O2FBRWxCLE1BQU0sU0FBUyxLQUFLO2dCQUNqQixVQUFVLE1BQU0sNEJBQTRCLElBQUksS0FBSzs7YUFFeEQsUUFBUSxXQUFXO2dCQUNoQixPQUFPLFdBQVc7Ozs7SUFJOUIsT0FBTyxhQUFhLFdBQVc7UUFDM0IsSUFBSSxnQkFBZ0IsT0FBTyxLQUFLO1lBQzVCLGFBQWE7WUFDYixZQUFZO1lBQ1osU0FBUztnQkFDTCxPQUFPLFlBQVk7b0JBQ2YsT0FBTyxPQUFPOzs7OztRQUsxQixPQUFPLFdBQVc7UUFDbEIsY0FBYzthQUNULEtBQUssWUFBWTtnQkFDZCxPQUFPLE9BQU8sS0FBSyxRQUFRO29CQUN2QixJQUFJLE9BQU8sS0FBSzs7O2FBR3ZCLEtBQUssWUFBWTtnQkFDZCxVQUFVLE9BQU87Z0JBQ2pCLFVBQVUsS0FBSzs7YUFFbEIsTUFBTSxVQUFVLEtBQUs7Z0JBQ2xCLElBQUksUUFBUSxVQUFVO29CQUNsQixVQUFVLE1BQU0sOEJBQThCLElBQUksS0FBSzs7O2FBRzlELFFBQVEsV0FBVztnQkFDaEIsT0FBTyxXQUFXOzs7O0lBSTlCLE9BQU8sb0JBQW9CLFlBQVk7UUFDbkMsT0FBTyxXQUFXO1FBQ2xCLE9BQU87YUFDRixRQUFRO2dCQUNMLElBQUksT0FBTyxLQUFLO2dCQUNoQixRQUFROzthQUVYLEtBQUssWUFBWTtnQkFDZCxVQUFVLE9BQU8sOEJBQThCLE9BQU8sS0FBSztnQkFDM0QsVUFBVSxLQUFLOzthQUVsQixNQUFNLFVBQVUsS0FBSztnQkFDbEIsVUFBVSxNQUFNLG9DQUFvQyxJQUFJLEtBQUs7O2FBRWhFLFFBQVEsV0FBVztnQkFDaEIsT0FBTyxXQUFXOzs7SUFHL0IiLCJmaWxlIjoiY29udHJvbGxlcnMvZGFzaGJvYXJkL3NldHRpbmdzL3VzZXJzL3pVc2VyRWRpdEN0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignelVzZXJFZGl0Q3RybCcsIGZ1bmN0aW9uIChcbiAgICAkc2NvcGUsICRyb3V0ZVBhcmFtcywgJG1vZGFsLCAkbG9jYXRpb24sICRodHRwLCB6Q29tbW9uVXRpbCxcbiAgICB6Tm90aWZpZXIsIHpJZGVudGl0eSwgelVzZXIsIHpSZXNvdXJjZSwgekF1dGgpIHtcbiAgICBcbiAgICAkc2NvcGUuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAkc2NvcGUuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAkc2NvcGUuaXNDaGFuZ2luZ1BpYyA9IGZhbHNlO1xuICAgICRzY29wZS5pbWdDaGFuZ2VkID0gMDtcbiAgICAkc2NvcGUuY2FuRWRpdCA9IHpJZGVudGl0eS5pc0F1dGhvcml6ZWQoJ293bmVyJywgJ21hbmFnZXInKTtcbiAgICAkc2NvcGUuZW1haWxSZWdleCA9IHpDb21tb25VdGlsLmdldEVtYWlsUmVnZXgoKTtcbiAgICBcbiAgICAkc2NvcGUucm9sZXMgPSBbJ293bmVyJywgJ21hbmFnZXInLCAnYWRtaW4nLCAnc2VydmljZSBwcm92aWRlcicsICdzY2hlZHVsZXInXTtcbiAgICBpZiAoeklkZW50aXR5LmdldEN1cnJlbnRVc2VyKCkucm9sZXMuaW5kZXhPZignb3duZXInKSA9PT0gLTEpIHtcbiAgICAgICAgJHNjb3BlLnJvbGVzID0gXy53aXRob3V0KCRzY29wZS5yb2xlcywgJ293bmVyJyk7XG4gICAgfVxuICAgIFxuICAgIChmdW5jdGlvbiBsb2FkRGF0YSgpIHtcbiAgICAgICAgelVzZXJcbiAgICAgICAgICAgIC5nZXQoeyBpZDogJHJvdXRlUGFyYW1zLmlkIH0pXG4gICAgICAgICAgICAuJHByb21pc2VcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIubm90aWZ5KCdSZWFkeSB0byBlZGl0ICcgKyB1c2VyLm5hbWUpO1xuICAgICAgICAgICAgICAgICRzY29wZS51c2VyID0gdXNlcjtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiB0ZW1wb3JhcnkgZml4OlxuICAgICAgICAgICAgICAgIHZhciBjbGluaWNhbFJvbGVJbmRleCA9IF8uaW5kZXhPZigkc2NvcGUudXNlci5yb2xlcywgJ2NsaW5pY2FsJyk7XG4gICAgICAgICAgICAgICAgaWYgKGNsaW5pY2FsUm9sZUluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudXNlci5yb2xlc1tjbGluaWNhbFJvbGVJbmRleF0gPSAnc2VydmljZSBwcm92aWRlcic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRzY29wZS5waWNJbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogdXNlci5faWQsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICAgICAgY2I6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnVzZXIucGljID0gJ3MzJztcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5pbWdDaGFuZ2VkKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaXNDaGFuZ2luZ1BpYyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRzY29wZS51c2VyLmxpbmtlZFJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9ICcvYXBpL3VwbG9hZHMvY29weT9zcmNJZD06c3JjSWQmc3JjVHlwZT11c2VyJmRzdElkPTpkc3RJZCZkc3RUeXBlPXJlc291cmNlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgnOnNyY0lkJywgJHNjb3BlLnVzZXIuX2lkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgnOmRzdElkJywgJHNjb3BlLnVzZXIubGlua2VkUmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KHVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB6UmVzb3VyY2UucXVlcnkoKS4kcHJvbWlzZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUucmVzb3VyY2VzID0gXy5maWx0ZXIocmVzb3VyY2VzLCBmdW5jdGlvbihyZXNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXJlc291cmNlLnByYWN0aXRpb25lciB8fCByZXNvdXJjZS5wcmFjdGl0aW9uZXIgPT09ICRzY29wZS51c2VyLl9pZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgbGlua2VkUmVzb3VyY2UgPSBfLmZpbmQocmVzb3VyY2VzLCB7IHByYWN0aXRpb25lcjogJHNjb3BlLnVzZXIuX2lkIH0pO1xuICAgICAgICAgICAgICAgICRzY29wZS51c2VyLmxpbmtlZFJlc291cmNlID0gbGlua2VkUmVzb3VyY2UgPyBsaW5rZWRSZXNvdXJjZS5faWQgOiBudWxsO1xuICAgICAgICAgICAgICAgICRzY29wZS5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignVW5hYmxlIHRvIGxvYWQgcmVjb3JkOiAnICsgZXJyLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3NldHRpbmdzL3VzZXJzJyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9KSgpO1xuICAgIFxuICAgICRzY29wZS5zdGFydENoYW5naW5nUGljID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5pc0NoYW5naW5nUGljID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmNhbmNlbENoYW5naW5nUGljID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5pc0NoYW5naW5nUGljID0gZmFsc2U7XG4gICAgfTtcblxuICAgICRzY29wZS5zYXZlVXNlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuaXNTYXZpbmcgPSB0cnVlO1xuICAgICAgICAkc2NvcGUudXNlclxuICAgICAgICAgICAgLiR1cGRhdGUoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUudXNlci5faWQgPT09IHpJZGVudGl0eS5nZXRDdXJyZW50VXNlcigpLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gekF1dGgucmVmcmVzaEp3dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIubm90aWZ5KCdVc2VyIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9zZXR0aW5ncy91c2VycycpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIuZXJyb3IoJ1VuYWJsZSB0byBzYXZlIHJlY29yZDogJyArIGVyci5kYXRhLnJlYXNvbik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzU2F2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmRlbGV0ZVVzZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkbW9kYWwub3Blbih7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Rhc2hib2FyZC9zZXR0aW5ncy91c2Vycy9kZWxldGUtdXNlci1kaWFsb2cuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnek1vZGFsQ3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgaXRlbXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS51c2VyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAkc2NvcGUuaXNTYXZpbmcgPSB0cnVlO1xuICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdFxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUudXNlci4kcmVtb3ZlKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICRzY29wZS51c2VyLl9pZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB6Tm90aWZpZXIubm90aWZ5KCdVc2VyIGRlbGV0ZWQnKTtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3NldHRpbmdzL3VzZXJzJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyICE9PSAnY2FuY2VsJykge1xuICAgICAgICAgICAgICAgICAgICB6Tm90aWZpZXIuZXJyb3IoJ1VuYWJsZSB0byBkZWxldGUgcmVjb3JkOiAnICsgZXJyLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzU2F2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnJlc2VuZEludml0ZUVtYWlsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkc2NvcGUuaXNTYXZpbmcgPSB0cnVlO1xuICAgICAgICAkc2NvcGUudXNlclxuICAgICAgICAgICAgLiR1cGRhdGUoe1xuICAgICAgICAgICAgICAgIGlkOiAkc2NvcGUudXNlci5faWQsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiAnc2VuZE5ld1VzZXJFbWFpbCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgek5vdGlmaWVyLm5vdGlmeSgnTmV3IHVzZXIgZW1haWwgcmVzZW50IHRvICcgKyAkc2NvcGUudXNlci5lbWFpbCk7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9zZXR0aW5ncy91c2VycycpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdVbmFibGUgdG8gcmVzZW5kIGludmF0ZSBlbWFpbDogJyArIGVyci5kYXRhLnJlYXNvbik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzU2F2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').controller('zUserListCtrl', ['$scope', 'zUser', 'zIdentity', function($scope, zUser, zIdentity) {
    $scope.canEdit = zIdentity.isAuthorized(['owner', 'manager']);
    
    (function loadData() {
        zUser
            .query()
            .$promise
            .then(function(users) {
                $scope.users = users;
                _.each(users, function(user) {
                    if (user.siteRoles && user.siteRoles.length > 0) {
                        user.roles = user.siteRoles[0].roles;
                    }
                });
            });
    })();
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9zZXR0aW5ncy91c2Vycy96VXNlckxpc3RDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcsa0RBQWlCLFNBQVMsUUFBUSxPQUFPLFdBQVc7SUFDakYsT0FBTyxVQUFVLFVBQVUsYUFBYSxDQUFDLFNBQVM7O0lBRWxELENBQUMsU0FBUyxXQUFXO1FBQ2pCO2FBQ0s7YUFDQTthQUNBLEtBQUssU0FBUyxPQUFPO2dCQUNsQixPQUFPLFFBQVE7Z0JBQ2YsRUFBRSxLQUFLLE9BQU8sU0FBUyxNQUFNO29CQUN6QixJQUFJLEtBQUssYUFBYSxLQUFLLFVBQVUsU0FBUyxHQUFHO3dCQUM3QyxLQUFLLFFBQVEsS0FBSyxVQUFVLEdBQUc7Ozs7OztBQU12RCIsImZpbGUiOiJjb250cm9sbGVycy9kYXNoYm9hcmQvc2V0dGluZ3MvdXNlcnMvelVzZXJMaXN0Q3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCd6VXNlckxpc3RDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCB6VXNlciwgeklkZW50aXR5KSB7XG4gICAgJHNjb3BlLmNhbkVkaXQgPSB6SWRlbnRpdHkuaXNBdXRob3JpemVkKFsnb3duZXInLCAnbWFuYWdlciddKTtcbiAgICBcbiAgICAoZnVuY3Rpb24gbG9hZERhdGEoKSB7XG4gICAgICAgIHpVc2VyXG4gICAgICAgICAgICAucXVlcnkoKVxuICAgICAgICAgICAgLiRwcm9taXNlXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbih1c2Vycykge1xuICAgICAgICAgICAgICAgICRzY29wZS51c2VycyA9IHVzZXJzO1xuICAgICAgICAgICAgICAgIF8uZWFjaCh1c2VycywgZnVuY3Rpb24odXNlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodXNlci5zaXRlUm9sZXMgJiYgdXNlci5zaXRlUm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5yb2xlcyA9IHVzZXIuc2l0ZVJvbGVzWzBdLnJvbGVzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9KSgpO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').controller('zUserNewCtrl', ['$scope', '$location', 'zCommonUtil', 'zNotifier', 'zUser', 'zResource', 'zIdentity', function ($scope, $location, zCommonUtil, zNotifier, zUser, zResource, zIdentity) {
    /* jshint newcap: false */
    $scope.user = new zUser();
    $scope.isSaving = false;
    $scope.emailRegex = zCommonUtil.getEmailRegex();
    
    $scope.roles = ['owner', 'manager', 'admin', 'service provider', 'scheduler'];
    if (zIdentity.getCurrentUser().roles.indexOf('owner') === -1) {
        $scope.roles = _.without($scope.roles, 'owner');
    }
    
    (function loadData() {
        zResource
            .query({ practitioner: null })
            .$promise
            .then(function(resources) {
                $scope.resources = _.filter(resources, function(resource) {
                    return !resource.practitioner;
                });
            });
    })();
    
    $scope.createUser = function () {
        $scope.isSaving = true;
        $scope.user
            .$save()
            .then(function () {
                zNotifier.notify('New user created successfully. Email sent to ' + $scope.user.email);
                $location.path('/settings/users');
            })
            .catch(function (err) {
                zNotifier.error('Unable to save changes: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isSaving = false;
            });
    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2Rhc2hib2FyZC9zZXR0aW5ncy91c2Vycy96VXNlck5ld0N0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sV0FBVyx1R0FBZ0IsVUFBVSxRQUFRLFdBQVcsYUFBYSxXQUFXLE9BQU8sV0FBVyxXQUFXOztJQUUvSCxPQUFPLE9BQU8sSUFBSTtJQUNsQixPQUFPLFdBQVc7SUFDbEIsT0FBTyxhQUFhLFlBQVk7O0lBRWhDLE9BQU8sUUFBUSxDQUFDLFNBQVMsV0FBVyxTQUFTLG9CQUFvQjtJQUNqRSxJQUFJLFVBQVUsaUJBQWlCLE1BQU0sUUFBUSxhQUFhLENBQUMsR0FBRztRQUMxRCxPQUFPLFFBQVEsRUFBRSxRQUFRLE9BQU8sT0FBTzs7O0lBRzNDLENBQUMsU0FBUyxXQUFXO1FBQ2pCO2FBQ0ssTUFBTSxFQUFFLGNBQWM7YUFDdEI7YUFDQSxLQUFLLFNBQVMsV0FBVztnQkFDdEIsT0FBTyxZQUFZLEVBQUUsT0FBTyxXQUFXLFNBQVMsVUFBVTtvQkFDdEQsT0FBTyxDQUFDLFNBQVM7Ozs7O0lBS2pDLE9BQU8sYUFBYSxZQUFZO1FBQzVCLE9BQU8sV0FBVztRQUNsQixPQUFPO2FBQ0Y7YUFDQSxLQUFLLFlBQVk7Z0JBQ2QsVUFBVSxPQUFPLGtEQUFrRCxPQUFPLEtBQUs7Z0JBQy9FLFVBQVUsS0FBSzs7YUFFbEIsTUFBTSxVQUFVLEtBQUs7Z0JBQ2xCLFVBQVUsTUFBTSw2QkFBNkIsSUFBSSxLQUFLOzthQUV6RCxRQUFRLFdBQVc7Z0JBQ2hCLE9BQU8sV0FBVzs7OztBQUlsQyIsImZpbGUiOiJjb250cm9sbGVycy9kYXNoYm9hcmQvc2V0dGluZ3MvdXNlcnMvelVzZXJOZXdDdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ3pVc2VyTmV3Q3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsICRsb2NhdGlvbiwgekNvbW1vblV0aWwsIHpOb3RpZmllciwgelVzZXIsIHpSZXNvdXJjZSwgeklkZW50aXR5KSB7XG4gICAgLyoganNoaW50IG5ld2NhcDogZmFsc2UgKi9cbiAgICAkc2NvcGUudXNlciA9IG5ldyB6VXNlcigpO1xuICAgICRzY29wZS5pc1NhdmluZyA9IGZhbHNlO1xuICAgICRzY29wZS5lbWFpbFJlZ2V4ID0gekNvbW1vblV0aWwuZ2V0RW1haWxSZWdleCgpO1xuICAgIFxuICAgICRzY29wZS5yb2xlcyA9IFsnb3duZXInLCAnbWFuYWdlcicsICdhZG1pbicsICdzZXJ2aWNlIHByb3ZpZGVyJywgJ3NjaGVkdWxlciddO1xuICAgIGlmICh6SWRlbnRpdHkuZ2V0Q3VycmVudFVzZXIoKS5yb2xlcy5pbmRleE9mKCdvd25lcicpID09PSAtMSkge1xuICAgICAgICAkc2NvcGUucm9sZXMgPSBfLndpdGhvdXQoJHNjb3BlLnJvbGVzLCAnb3duZXInKTtcbiAgICB9XG4gICAgXG4gICAgKGZ1bmN0aW9uIGxvYWREYXRhKCkge1xuICAgICAgICB6UmVzb3VyY2VcbiAgICAgICAgICAgIC5xdWVyeSh7IHByYWN0aXRpb25lcjogbnVsbCB9KVxuICAgICAgICAgICAgLiRwcm9taXNlXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUucmVzb3VyY2VzID0gXy5maWx0ZXIocmVzb3VyY2VzLCBmdW5jdGlvbihyZXNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXJlc291cmNlLnByYWN0aXRpb25lcjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0pKCk7XG4gICAgXG4gICAgJHNjb3BlLmNyZWF0ZVVzZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRzY29wZS5pc1NhdmluZyA9IHRydWU7XG4gICAgICAgICRzY29wZS51c2VyXG4gICAgICAgICAgICAuJHNhdmUoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHpOb3RpZmllci5ub3RpZnkoJ05ldyB1c2VyIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LiBFbWFpbCBzZW50IHRvICcgKyAkc2NvcGUudXNlci5lbWFpbCk7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9zZXR0aW5ncy91c2VycycpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgek5vdGlmaWVyLmVycm9yKCdVbmFibGUgdG8gc2F2ZSBjaGFuZ2VzOiAnICsgZXJyLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').controller('zMainCtrl', ['$window', '$scope', 'zTheme', function ($window, $scope, zTheme) {

	var theme = $window.localStorage.theme;

	if(theme) {
		theme = _.find(zTheme.getThemes(), 'name', theme);
		zTheme.setCurrentTheme(theme);
	}

	$scope.$watch(function() {
		return zTheme.getCurrentTheme();
	}, function() {
		$scope.theme = zTheme.getCurrentTheme();
	});
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL21haW5DdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFdBQVcsNkNBQWEsVUFBVSxTQUFTLFFBQVEsUUFBUTs7Q0FFaEYsSUFBSSxRQUFRLFFBQVEsYUFBYTs7Q0FFakMsR0FBRyxPQUFPO0VBQ1QsUUFBUSxFQUFFLEtBQUssT0FBTyxhQUFhLFFBQVE7RUFDM0MsT0FBTyxnQkFBZ0I7OztDQUd4QixPQUFPLE9BQU8sV0FBVztFQUN4QixPQUFPLE9BQU87SUFDWixXQUFXO0VBQ2IsT0FBTyxRQUFRLE9BQU87O0lBRXJCIiwiZmlsZSI6ImNvbnRyb2xsZXJzL21haW5DdHJsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ3pNYWluQ3RybCcsIGZ1bmN0aW9uICgkd2luZG93LCAkc2NvcGUsIHpUaGVtZSkge1xuXG5cdHZhciB0aGVtZSA9ICR3aW5kb3cubG9jYWxTdG9yYWdlLnRoZW1lO1xuXG5cdGlmKHRoZW1lKSB7XG5cdFx0dGhlbWUgPSBfLmZpbmQoelRoZW1lLmdldFRoZW1lcygpLCAnbmFtZScsIHRoZW1lKTtcblx0XHR6VGhlbWUuc2V0Q3VycmVudFRoZW1lKHRoZW1lKTtcblx0fVxuXG5cdCRzY29wZS4kd2F0Y2goZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHpUaGVtZS5nZXRDdXJyZW50VGhlbWUoKTtcblx0fSwgZnVuY3Rpb24oKSB7XG5cdFx0JHNjb3BlLnRoZW1lID0gelRoZW1lLmdldEN1cnJlbnRUaGVtZSgpO1xuXHR9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').directive('checklistModel', ['$parse', '$compile', function($parse, $compile) {
    function contains(arr, item) {
        if (angular.isArray(arr)) {
            for (var i = 0; i < arr.length; i++) {
                if (angular.equals(arr[i], item)) {
                    return true;
                }
            }
        }
        return false;
    }

    function add(arr, item) {
        arr = angular.isArray(arr) ? arr : [];
        for (var i = 0; i < arr.length; i++) {
            if (angular.equals(arr[i], item)) {
                return arr;
            }
        }
        arr.push(item);
        return arr;
    }

    function remove(arr, item) {
        if (angular.isArray(arr)) {
            for (var i = 0; i < arr.length; i++) {
                if (angular.equals(arr[i], item)) {
                    arr.splice(i, 1);
                    break;
                }
            }
        }
        return arr;
    }

    // http://stackoverflow.com/a/19228302/1458162
    function postLinkFn(scope, elem, attrs) {
        // compile with `ng-model` pointing to `checked`
        $compile(elem)(scope);

        // getter / setter for original model
        var getter = $parse(attrs.checklistModel);
        var setter = getter.assign;

        // value added to list
        var value = $parse(attrs.checklistValue)(scope.$parent);

        // watch UI checked change
        scope.$watch('checked', function(newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            var current = getter(scope.$parent);
            if (newValue === true) {
                setter(scope.$parent, add(current, value));
            } else {
                setter(scope.$parent, remove(current, value));
            }
        });

        // watch original model change
        scope.$parent.$watch(attrs.checklistModel, function(newArr) {
            scope.checked = contains(newArr, value);
        }, true);
    }

    return {
        restrict: 'A',
        priority: 1000,
        terminal: true,
        scope: true,
        compile: function(tElement, tAttrs) {
            if (tElement[0].tagName !== 'INPUT' || !tElement.attr('type', 'checkbox')) {
                throw 'checklist-model should be applied to `input[type="checkbox"]`.';
            }

            if (!tAttrs.checklistValue) {
                throw 'You should provide `checklist-value`.';
            }

            // exclude recursion
            tElement.removeAttr('checklist-model');

            // local scope var storing individual checkbox model
            tElement.attr('ng-model', 'checked');

            return postLinkFn;
        }
    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvY2hlY2tsaXN0TW9kZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sVUFBVSxrQkFBa0IsQ0FBQyxVQUFVLFlBQVksU0FBUyxRQUFRLFVBQVU7SUFDaEcsU0FBUyxTQUFTLEtBQUssTUFBTTtRQUN6QixJQUFJLFFBQVEsUUFBUSxNQUFNO1lBQ3RCLEtBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLFFBQVEsS0FBSztnQkFDakMsSUFBSSxRQUFRLE9BQU8sSUFBSSxJQUFJLE9BQU87b0JBQzlCLE9BQU87Ozs7UUFJbkIsT0FBTzs7O0lBR1gsU0FBUyxJQUFJLEtBQUssTUFBTTtRQUNwQixNQUFNLFFBQVEsUUFBUSxPQUFPLE1BQU07UUFDbkMsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksUUFBUSxLQUFLO1lBQ2pDLElBQUksUUFBUSxPQUFPLElBQUksSUFBSSxPQUFPO2dCQUM5QixPQUFPOzs7UUFHZixJQUFJLEtBQUs7UUFDVCxPQUFPOzs7SUFHWCxTQUFTLE9BQU8sS0FBSyxNQUFNO1FBQ3ZCLElBQUksUUFBUSxRQUFRLE1BQU07WUFDdEIsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksUUFBUSxLQUFLO2dCQUNqQyxJQUFJLFFBQVEsT0FBTyxJQUFJLElBQUksT0FBTztvQkFDOUIsSUFBSSxPQUFPLEdBQUc7b0JBQ2Q7Ozs7UUFJWixPQUFPOzs7O0lBSVgsU0FBUyxXQUFXLE9BQU8sTUFBTSxPQUFPOztRQUVwQyxTQUFTLE1BQU07OztRQUdmLElBQUksU0FBUyxPQUFPLE1BQU07UUFDMUIsSUFBSSxTQUFTLE9BQU87OztRQUdwQixJQUFJLFFBQVEsT0FBTyxNQUFNLGdCQUFnQixNQUFNOzs7UUFHL0MsTUFBTSxPQUFPLFdBQVcsU0FBUyxVQUFVLFVBQVU7WUFDakQsSUFBSSxhQUFhLFVBQVU7Z0JBQ3ZCOztZQUVKLElBQUksVUFBVSxPQUFPLE1BQU07WUFDM0IsSUFBSSxhQUFhLE1BQU07Z0JBQ25CLE9BQU8sTUFBTSxTQUFTLElBQUksU0FBUzttQkFDaEM7Z0JBQ0gsT0FBTyxNQUFNLFNBQVMsT0FBTyxTQUFTOzs7OztRQUs5QyxNQUFNLFFBQVEsT0FBTyxNQUFNLGdCQUFnQixTQUFTLFFBQVE7WUFDeEQsTUFBTSxVQUFVLFNBQVMsUUFBUTtXQUNsQzs7O0lBR1AsT0FBTztRQUNILFVBQVU7UUFDVixVQUFVO1FBQ1YsVUFBVTtRQUNWLE9BQU87UUFDUCxTQUFTLFNBQVMsVUFBVSxRQUFRO1lBQ2hDLElBQUksU0FBUyxHQUFHLFlBQVksV0FBVyxDQUFDLFNBQVMsS0FBSyxRQUFRLGFBQWE7Z0JBQ3ZFLE1BQU07OztZQUdWLElBQUksQ0FBQyxPQUFPLGdCQUFnQjtnQkFDeEIsTUFBTTs7OztZQUlWLFNBQVMsV0FBVzs7O1lBR3BCLFNBQVMsS0FBSyxZQUFZOztZQUUxQixPQUFPOzs7O0FBSW5CIiwiZmlsZSI6ImRpcmVjdGl2ZXMvY2hlY2tsaXN0TW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuZGlyZWN0aXZlKCdjaGVja2xpc3RNb2RlbCcsIFsnJHBhcnNlJywgJyRjb21waWxlJywgZnVuY3Rpb24oJHBhcnNlLCAkY29tcGlsZSkge1xuICAgIGZ1bmN0aW9uIGNvbnRhaW5zKGFyciwgaXRlbSkge1xuICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KGFycikpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZXF1YWxzKGFycltpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGQoYXJyLCBpdGVtKSB7XG4gICAgICAgIGFyciA9IGFuZ3VsYXIuaXNBcnJheShhcnIpID8gYXJyIDogW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5lcXVhbHMoYXJyW2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcnI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXJyLnB1c2goaXRlbSk7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlKGFyciwgaXRlbSkge1xuICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KGFycikpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZXF1YWxzKGFycltpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTkyMjgzMDIvMTQ1ODE2MlxuICAgIGZ1bmN0aW9uIHBvc3RMaW5rRm4oc2NvcGUsIGVsZW0sIGF0dHJzKSB7XG4gICAgICAgIC8vIGNvbXBpbGUgd2l0aCBgbmctbW9kZWxgIHBvaW50aW5nIHRvIGBjaGVja2VkYFxuICAgICAgICAkY29tcGlsZShlbGVtKShzY29wZSk7XG5cbiAgICAgICAgLy8gZ2V0dGVyIC8gc2V0dGVyIGZvciBvcmlnaW5hbCBtb2RlbFxuICAgICAgICB2YXIgZ2V0dGVyID0gJHBhcnNlKGF0dHJzLmNoZWNrbGlzdE1vZGVsKTtcbiAgICAgICAgdmFyIHNldHRlciA9IGdldHRlci5hc3NpZ247XG5cbiAgICAgICAgLy8gdmFsdWUgYWRkZWQgdG8gbGlzdFxuICAgICAgICB2YXIgdmFsdWUgPSAkcGFyc2UoYXR0cnMuY2hlY2tsaXN0VmFsdWUpKHNjb3BlLiRwYXJlbnQpO1xuXG4gICAgICAgIC8vIHdhdGNoIFVJIGNoZWNrZWQgY2hhbmdlXG4gICAgICAgIHNjb3BlLiR3YXRjaCgnY2hlY2tlZCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gZ2V0dGVyKHNjb3BlLiRwYXJlbnQpO1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgc2V0dGVyKHNjb3BlLiRwYXJlbnQsIGFkZChjdXJyZW50LCB2YWx1ZSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXR0ZXIoc2NvcGUuJHBhcmVudCwgcmVtb3ZlKGN1cnJlbnQsIHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHdhdGNoIG9yaWdpbmFsIG1vZGVsIGNoYW5nZVxuICAgICAgICBzY29wZS4kcGFyZW50LiR3YXRjaChhdHRycy5jaGVja2xpc3RNb2RlbCwgZnVuY3Rpb24obmV3QXJyKSB7XG4gICAgICAgICAgICBzY29wZS5jaGVja2VkID0gY29udGFpbnMobmV3QXJyLCB2YWx1ZSk7XG4gICAgICAgIH0sIHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIHByaW9yaXR5OiAxMDAwLFxuICAgICAgICB0ZXJtaW5hbDogdHJ1ZSxcbiAgICAgICAgc2NvcGU6IHRydWUsXG4gICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKHRFbGVtZW50LCB0QXR0cnMpIHtcbiAgICAgICAgICAgIGlmICh0RWxlbWVudFswXS50YWdOYW1lICE9PSAnSU5QVVQnIHx8ICF0RWxlbWVudC5hdHRyKCd0eXBlJywgJ2NoZWNrYm94JykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyAnY2hlY2tsaXN0LW1vZGVsIHNob3VsZCBiZSBhcHBsaWVkIHRvIGBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl1gLic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdEF0dHJzLmNoZWNrbGlzdFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ1lvdSBzaG91bGQgcHJvdmlkZSBgY2hlY2tsaXN0LXZhbHVlYC4nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBleGNsdWRlIHJlY3Vyc2lvblxuICAgICAgICAgICAgdEVsZW1lbnQucmVtb3ZlQXR0cignY2hlY2tsaXN0LW1vZGVsJyk7XG5cbiAgICAgICAgICAgIC8vIGxvY2FsIHNjb3BlIHZhciBzdG9yaW5nIGluZGl2aWR1YWwgY2hlY2tib3ggbW9kZWxcbiAgICAgICAgICAgIHRFbGVtZW50LmF0dHIoJ25nLW1vZGVsJywgJ2NoZWNrZWQnKTtcblxuICAgICAgICAgICAgcmV0dXJuIHBvc3RMaW5rRm47XG4gICAgICAgIH1cbiAgICB9O1xufV0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').directive('clientMultiSelector', function() {
    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
            ngInitial: '=',
            onInitialize: '&',
            placeholder: '@'
        },
        controller: ['$scope', '$http', '$sce', 'zClient', function($scope, $http, $sce, zClient) {
            $scope.clients = [];
            zClient.query(function(clients) {
                $scope.clients = clients;
                if ($scope.ngInitial) {
                    $scope.ngModel = $scope.ngInitial;
                }
                if ($scope.onInitialize) {
                    $scope.onInitialize();
                }
            });
            
            $scope.refreshClients = function(q) {
                if (!q || q.length < 1) {
                    return;
                }
                $scope.clients = [];
                return $http
                    .get('/api/clients/search', {
                        params: {
                            q: q,
                            exclude: $scope.ngModel
                        }
                    })
                    .then(function(response) {
                        $scope.clients = zClient.mapObjectsToResources(response.data);
                    });
            };

            $scope.trustAsHtml = function(value) {
                return $sce.trustAsHtml(value);
            };
        }],
        templateUrl: 'views/common/clientMultiSelector.html'
    };
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvY2xpZW50TXVsdGlTZWxlY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxVQUFVLHVCQUF1QixXQUFXO0lBQzlELE9BQU87UUFDSCxVQUFVO1FBQ1YsT0FBTztZQUNILFNBQVM7WUFDVCxXQUFXO1lBQ1gsY0FBYztZQUNkLGFBQWE7O1FBRWpCLG1EQUFZLFNBQVMsUUFBUSxPQUFPLE1BQU0sU0FBUztZQUMvQyxPQUFPLFVBQVU7WUFDakIsUUFBUSxNQUFNLFNBQVMsU0FBUztnQkFDNUIsT0FBTyxVQUFVO2dCQUNqQixJQUFJLE9BQU8sV0FBVztvQkFDbEIsT0FBTyxVQUFVLE9BQU87O2dCQUU1QixJQUFJLE9BQU8sY0FBYztvQkFDckIsT0FBTzs7OztZQUlmLE9BQU8saUJBQWlCLFNBQVMsR0FBRztnQkFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRSxTQUFTLEdBQUc7b0JBQ3BCOztnQkFFSixPQUFPLFVBQVU7Z0JBQ2pCLE9BQU87cUJBQ0YsSUFBSSx1QkFBdUI7d0JBQ3hCLFFBQVE7NEJBQ0osR0FBRzs0QkFDSCxTQUFTLE9BQU87OztxQkFHdkIsS0FBSyxTQUFTLFVBQVU7d0JBQ3JCLE9BQU8sVUFBVSxRQUFRLHNCQUFzQixTQUFTOzs7O1lBSXBFLE9BQU8sY0FBYyxTQUFTLE9BQU87Z0JBQ2pDLE9BQU8sS0FBSyxZQUFZOzs7UUFHaEMsYUFBYTs7O0FBR3JCIiwiZmlsZSI6ImRpcmVjdGl2ZXMvY2xpZW50TXVsdGlTZWxlY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5kaXJlY3RpdmUoJ2NsaWVudE11bHRpU2VsZWN0b3InLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgbmdNb2RlbDogJz0nLFxuICAgICAgICAgICAgbmdJbml0aWFsOiAnPScsXG4gICAgICAgICAgICBvbkluaXRpYWxpemU6ICcmJyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnQCdcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJHNjZSwgekNsaWVudCkge1xuICAgICAgICAgICAgJHNjb3BlLmNsaWVudHMgPSBbXTtcbiAgICAgICAgICAgIHpDbGllbnQucXVlcnkoZnVuY3Rpb24oY2xpZW50cykge1xuICAgICAgICAgICAgICAgICRzY29wZS5jbGllbnRzID0gY2xpZW50cztcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLm5nSW5pdGlhbCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubmdNb2RlbCA9ICRzY29wZS5uZ0luaXRpYWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUub25Jbml0aWFsaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5vbkluaXRpYWxpemUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJHNjb3BlLnJlZnJlc2hDbGllbnRzID0gZnVuY3Rpb24ocSkge1xuICAgICAgICAgICAgICAgIGlmICghcSB8fCBxLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkc2NvcGUuY2xpZW50cyA9IFtdO1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAuZ2V0KCcvYXBpL2NsaWVudHMvc2VhcmNoJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcTogcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGNsdWRlOiAkc2NvcGUubmdNb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmNsaWVudHMgPSB6Q2xpZW50Lm1hcE9iamVjdHNUb1Jlc291cmNlcyhyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUudHJ1c3RBc0h0bWwgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKHZhbHVlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvY29tbW9uL2NsaWVudE11bHRpU2VsZWN0b3IuaHRtbCdcbiAgICB9O1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').directive('focusMe', function() {
    return {
        scope: { trigger: '=focusMe' },
        link: function(scope, element) {
            scope.$watch('trigger', function(value) {
                if(value === true) { 
                    element[0].focus();
                    scope.trigger = false;
                }
            });
        }
    };
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvZm9jdXNNZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxVQUFVLFdBQVcsV0FBVztJQUNsRCxPQUFPO1FBQ0gsT0FBTyxFQUFFLFNBQVM7UUFDbEIsTUFBTSxTQUFTLE9BQU8sU0FBUztZQUMzQixNQUFNLE9BQU8sV0FBVyxTQUFTLE9BQU87Z0JBQ3BDLEdBQUcsVUFBVSxNQUFNO29CQUNmLFFBQVEsR0FBRztvQkFDWCxNQUFNLFVBQVU7Ozs7OztBQU1wQyIsImZpbGUiOiJkaXJlY3RpdmVzL2ZvY3VzTWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuZGlyZWN0aXZlKCdmb2N1c01lJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2NvcGU6IHsgdHJpZ2dlcjogJz1mb2N1c01lJyB9LFxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCd0cmlnZ2VyJywgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZih2YWx1ZSA9PT0gdHJ1ZSkgeyBcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFswXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICBzY29wZS50cmlnZ2VyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').directive('resourceMultiSelector', ['zUser', function(zUser) {
    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
            ngInitial: '=',
            onInitialize: '&',
            placeholder: '@'
        },
        controller: ['$scope', '$sce', 'zResource', function($scope, $sce, zResource) {
            $scope.resources = [];
            zResource.query({ 'includes[]': ['practitioner'] }, function(resources) {
                $scope.resources = _.map(resources, function(resource) {
                    if (resource.practitioner) {
                        resource.practitionerName = zUser.getName(resource.practitioner);
                    }
                    return resource;
                });
                if ($scope.ngInitial) {
                    $scope.ngModel = $scope.ngInitial;
                }
                if ($scope.onInitialize) {
                    $scope.onInitialize();
                }
            });
            
            $scope.trustAsHtml = function(value) {
                return $sce.trustAsHtml(value);
            };
        }],
        templateUrl: 'views/common/resourceMultiSelector.html'
    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvcmVzb3VyY2VNdWx0aVNlbGVjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFVBQVUsbUNBQXlCLFNBQVMsT0FBTztJQUNyRSxPQUFPO1FBQ0gsVUFBVTtRQUNWLE9BQU87WUFDSCxTQUFTO1lBQ1QsV0FBVztZQUNYLGNBQWM7WUFDZCxhQUFhOztRQUVqQiw0Q0FBWSxTQUFTLFFBQVEsTUFBTSxXQUFXO1lBQzFDLE9BQU8sWUFBWTtZQUNuQixVQUFVLE1BQU0sRUFBRSxjQUFjLENBQUMsbUJBQW1CLFNBQVMsV0FBVztnQkFDcEUsT0FBTyxZQUFZLEVBQUUsSUFBSSxXQUFXLFNBQVMsVUFBVTtvQkFDbkQsSUFBSSxTQUFTLGNBQWM7d0JBQ3ZCLFNBQVMsbUJBQW1CLE1BQU0sUUFBUSxTQUFTOztvQkFFdkQsT0FBTzs7Z0JBRVgsSUFBSSxPQUFPLFdBQVc7b0JBQ2xCLE9BQU8sVUFBVSxPQUFPOztnQkFFNUIsSUFBSSxPQUFPLGNBQWM7b0JBQ3JCLE9BQU87Ozs7WUFJZixPQUFPLGNBQWMsU0FBUyxPQUFPO2dCQUNqQyxPQUFPLEtBQUssWUFBWTs7O1FBR2hDLGFBQWE7OztBQUdyQiIsImZpbGUiOiJkaXJlY3RpdmVzL3Jlc291cmNlTXVsdGlTZWxlY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5kaXJlY3RpdmUoJ3Jlc291cmNlTXVsdGlTZWxlY3RvcicsIGZ1bmN0aW9uKHpVc2VyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIG5nTW9kZWw6ICc9JyxcbiAgICAgICAgICAgIG5nSW5pdGlhbDogJz0nLFxuICAgICAgICAgICAgb25Jbml0aWFsaXplOiAnJicsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0AnXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSwgJHNjZSwgelJlc291cmNlKSB7XG4gICAgICAgICAgICAkc2NvcGUucmVzb3VyY2VzID0gW107XG4gICAgICAgICAgICB6UmVzb3VyY2UucXVlcnkoeyAnaW5jbHVkZXNbXSc6IFsncHJhY3RpdGlvbmVyJ10gfSwgZnVuY3Rpb24ocmVzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnJlc291cmNlcyA9IF8ubWFwKHJlc291cmNlcywgZnVuY3Rpb24ocmVzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc291cmNlLnByYWN0aXRpb25lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UucHJhY3RpdGlvbmVyTmFtZSA9IHpVc2VyLmdldE5hbWUocmVzb3VyY2UucHJhY3RpdGlvbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb3VyY2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5uZ0luaXRpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm5nTW9kZWwgPSAkc2NvcGUubmdJbml0aWFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLm9uSW5pdGlhbGl6ZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub25Jbml0aWFsaXplKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICRzY29wZS50cnVzdEFzSHRtbCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRzY2UudHJ1c3RBc0h0bWwodmFsdWUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9jb21tb24vcmVzb3VyY2VNdWx0aVNlbGVjdG9yLmh0bWwnXG4gICAgfTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').directive('userMultiSelector', function() {
    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
            placeholder: '@'
        },
        controller: ['$scope', 'zUser', '$sce', function($scope, zUser, $sce) {
            $scope.users = [];
            zUser.query(function(users) {
                $scope.users = users;
            });

            $scope.trustAsHtml = function(value) {
                return $sce.trustAsHtml(value);
            };
        }],
        templateUrl: 'views/common/userMultiSelector.html'
    };
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvdXNlck11bHRpU2VsZWN0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sVUFBVSxxQkFBcUIsV0FBVztJQUM1RCxPQUFPO1FBQ0gsVUFBVTtRQUNWLE9BQU87WUFDSCxTQUFTO1lBQ1QsYUFBYTs7UUFFakIsd0NBQVksU0FBUyxRQUFRLE9BQU8sTUFBTTtZQUN0QyxPQUFPLFFBQVE7WUFDZixNQUFNLE1BQU0sU0FBUyxPQUFPO2dCQUN4QixPQUFPLFFBQVE7OztZQUduQixPQUFPLGNBQWMsU0FBUyxPQUFPO2dCQUNqQyxPQUFPLEtBQUssWUFBWTs7O1FBR2hDLGFBQWE7OztBQUdyQiIsImZpbGUiOiJkaXJlY3RpdmVzL3VzZXJNdWx0aVNlbGVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmRpcmVjdGl2ZSgndXNlck11bHRpU2VsZWN0b3InLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgbmdNb2RlbDogJz0nLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdAJ1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsIHpVc2VyLCAkc2NlKSB7XG4gICAgICAgICAgICAkc2NvcGUudXNlcnMgPSBbXTtcbiAgICAgICAgICAgIHpVc2VyLnF1ZXJ5KGZ1bmN0aW9uKHVzZXJzKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnVzZXJzID0gdXNlcnM7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHNjb3BlLnRydXN0QXNIdG1sID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzSHRtbCh2YWx1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2NvbW1vbi91c2VyTXVsdGlTZWxlY3Rvci5odG1sJ1xuICAgIH07XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').directive('autoActive', ['$location', function ($location) {
    return {
        restrict: 'C',
        scope: false,
        link: function (scope, element) {
            function setActive() {
                var path = $location.path();
                if (path) {
                    angular.forEach(element.find('li'), function (li) {
                        var anchor = li.querySelector('a');
                        if (path.indexOf(anchor.pathname) > -1) {
                            angular.element(li).addClass('active');
                        } else {
                            angular.element(li).removeClass('active');
                        }
                    });
                }
            }

            setActive();

            scope.$on('$locationChangeSuccess', setActive);
        }
    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvekF1dG9BY3RpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sVUFBVSw0QkFBYyxVQUFVLFdBQVc7SUFDL0QsT0FBTztRQUNILFVBQVU7UUFDVixPQUFPO1FBQ1AsTUFBTSxVQUFVLE9BQU8sU0FBUztZQUM1QixTQUFTLFlBQVk7Z0JBQ2pCLElBQUksT0FBTyxVQUFVO2dCQUNyQixJQUFJLE1BQU07b0JBQ04sUUFBUSxRQUFRLFFBQVEsS0FBSyxPQUFPLFVBQVUsSUFBSTt3QkFDOUMsSUFBSSxTQUFTLEdBQUcsY0FBYzt3QkFDOUIsSUFBSSxLQUFLLFFBQVEsT0FBTyxZQUFZLENBQUMsR0FBRzs0QkFDcEMsUUFBUSxRQUFRLElBQUksU0FBUzsrQkFDMUI7NEJBQ0gsUUFBUSxRQUFRLElBQUksWUFBWTs7Ozs7O1lBTWhEOztZQUVBLE1BQU0sSUFBSSwwQkFBMEI7OztJQUc3QyIsImZpbGUiOiJkaXJlY3RpdmVzL3pBdXRvQWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmRpcmVjdGl2ZSgnYXV0b0FjdGl2ZScsIGZ1bmN0aW9uICgkbG9jYXRpb24pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0MnLFxuICAgICAgICBzY29wZTogZmFsc2UsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgZnVuY3Rpb24gc2V0QWN0aXZlKCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXRoID0gJGxvY2F0aW9uLnBhdGgoKTtcbiAgICAgICAgICAgICAgICBpZiAocGF0aCkge1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goZWxlbWVudC5maW5kKCdsaScpLCBmdW5jdGlvbiAobGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbmNob3IgPSBsaS5xdWVyeVNlbGVjdG9yKCdhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGF0aC5pbmRleE9mKGFuY2hvci5wYXRobmFtZSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChsaSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQobGkpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRBY3RpdmUoKTtcblxuICAgICAgICAgICAgc2NvcGUuJG9uKCckbG9jYXRpb25DaGFuZ2VTdWNjZXNzJywgc2V0QWN0aXZlKTtcbiAgICAgICAgfVxuICAgIH07XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').directive('profileImg', ['zProfileImgGet', function (zProfileImgGet) {
    function link(scope, element, attrs) {
        var _item;

        //todo: forceRefresh="true" to set add max-age header
        //todo: add default image if none set - use when editing pic
        //todo catch 403 error?

        function setPic() {
            var options = {
                type: attrs.profileType,
                size: attrs.profileSize,
                noCache: attrs.profileNocache
            };
            
            element.attr('src', null);
            zProfileImgGet.getPic(_item, options, function (err, dataURI) {
                if (err) {
                    var src = attrs.profileDefimg || null;
                    element.attr('src', src);
                } else {
                    setTimeout(function() {
                        scope.$apply(function () {
                            element.attr('src', dataURI);
                        });
                    }, 0);
                }
            });
        }

        scope.$watch(attrs.profileImg, function (value) {
            _item = value;
            setPic();
        });
        scope.$watch(attrs.imgChanged, function (value) {
            if (value) {
                setPic();
            }
        });
    }

    return {
        restrict: 'A',
        link: link
    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvelByb2ZpbGVJbWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sVUFBVSxpQ0FBYyxVQUFVLGdCQUFnQjtJQUNwRSxTQUFTLEtBQUssT0FBTyxTQUFTLE9BQU87UUFDakMsSUFBSTs7Ozs7O1FBTUosU0FBUyxTQUFTO1lBQ2QsSUFBSSxVQUFVO2dCQUNWLE1BQU0sTUFBTTtnQkFDWixNQUFNLE1BQU07Z0JBQ1osU0FBUyxNQUFNOzs7WUFHbkIsUUFBUSxLQUFLLE9BQU87WUFDcEIsZUFBZSxPQUFPLE9BQU8sU0FBUyxVQUFVLEtBQUssU0FBUztnQkFDMUQsSUFBSSxLQUFLO29CQUNMLElBQUksTUFBTSxNQUFNLGlCQUFpQjtvQkFDakMsUUFBUSxLQUFLLE9BQU87dUJBQ2pCO29CQUNILFdBQVcsV0FBVzt3QkFDbEIsTUFBTSxPQUFPLFlBQVk7NEJBQ3JCLFFBQVEsS0FBSyxPQUFPOzt1QkFFekI7Ozs7O1FBS2YsTUFBTSxPQUFPLE1BQU0sWUFBWSxVQUFVLE9BQU87WUFDNUMsUUFBUTtZQUNSOztRQUVKLE1BQU0sT0FBTyxNQUFNLFlBQVksVUFBVSxPQUFPO1lBQzVDLElBQUksT0FBTztnQkFDUDs7Ozs7SUFLWixPQUFPO1FBQ0gsVUFBVTtRQUNWLE1BQU07OztBQUdkIiwiZmlsZSI6ImRpcmVjdGl2ZXMvelByb2ZpbGVJbWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuZGlyZWN0aXZlKCdwcm9maWxlSW1nJywgZnVuY3Rpb24gKHpQcm9maWxlSW1nR2V0KSB7XG4gICAgZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIF9pdGVtO1xuXG4gICAgICAgIC8vdG9kbzogZm9yY2VSZWZyZXNoPVwidHJ1ZVwiIHRvIHNldCBhZGQgbWF4LWFnZSBoZWFkZXJcbiAgICAgICAgLy90b2RvOiBhZGQgZGVmYXVsdCBpbWFnZSBpZiBub25lIHNldCAtIHVzZSB3aGVuIGVkaXRpbmcgcGljXG4gICAgICAgIC8vdG9kbyBjYXRjaCA0MDMgZXJyb3I/XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0UGljKCkge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogYXR0cnMucHJvZmlsZVR5cGUsXG4gICAgICAgICAgICAgICAgc2l6ZTogYXR0cnMucHJvZmlsZVNpemUsXG4gICAgICAgICAgICAgICAgbm9DYWNoZTogYXR0cnMucHJvZmlsZU5vY2FjaGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGVsZW1lbnQuYXR0cignc3JjJywgbnVsbCk7XG4gICAgICAgICAgICB6UHJvZmlsZUltZ0dldC5nZXRQaWMoX2l0ZW0sIG9wdGlvbnMsIGZ1bmN0aW9uIChlcnIsIGRhdGFVUkkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzcmMgPSBhdHRycy5wcm9maWxlRGVmaW1nIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXR0cignc3JjJywgc3JjKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmF0dHIoJ3NyYycsIGRhdGFVUkkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLnByb2ZpbGVJbWcsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgX2l0ZW0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHNldFBpYygpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLmltZ0NoYW5nZWQsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc2V0UGljKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIGxpbms6IGxpbmtcbiAgICB9O1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app')
    .directive('settingsHide', ['$location', function ($location) {
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
    }])
    .directive('settingsShow', ['$location', function ($location) {
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
    }]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvelNldHRpbmdzQmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTztLQUNWLFVBQVUsOEJBQWdCLFVBQVUsV0FBVztRQUM1QyxPQUFPO1lBQ0gsVUFBVTtZQUNWLE9BQU87WUFDUCxNQUFNLFVBQVUsT0FBTyxTQUFTO2dCQUM1QixTQUFTLFlBQVk7b0JBQ2pCLElBQUksT0FBTyxVQUFVO29CQUNyQixJQUFJLE1BQU07d0JBQ04sSUFBSSxLQUFLLFFBQVEsY0FBYyxDQUFDLEdBQUc7NEJBQy9CLFFBQVE7K0JBQ0w7NEJBQ0gsUUFBUTs7Ozs7Z0JBS3BCO2dCQUNBLE1BQU0sSUFBSSwwQkFBMEI7Ozs7S0FJL0MsVUFBVSw4QkFBZ0IsVUFBVSxXQUFXO1FBQzVDLE9BQU87WUFDSCxVQUFVO1lBQ1YsT0FBTztZQUNQLE1BQU0sVUFBVSxPQUFPLFNBQVM7Z0JBQzVCLFNBQVMsWUFBWTtvQkFDakIsSUFBSSxPQUFPLFVBQVU7b0JBQ3JCLElBQUksTUFBTTt3QkFDTixJQUFJLEtBQUssUUFBUSxjQUFjLENBQUMsR0FBRzs0QkFDL0IsUUFBUTsrQkFDTDs0QkFDSCxRQUFROzs7OztnQkFLcEI7Z0JBQ0EsTUFBTSxJQUFJLDBCQUEwQjs7O1FBRzdDIiwiZmlsZSI6ImRpcmVjdGl2ZXMvelNldHRpbmdzQmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmRpcmVjdGl2ZSgnc2V0dGluZ3NIaWRlJywgZnVuY3Rpb24gKCRsb2NhdGlvbikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdDJyxcbiAgICAgICAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNldEFjdGl2ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSAkbG9jYXRpb24ucGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhdGguaW5kZXhPZignc2V0dGluZ3MnKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNldEFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgIHNjb3BlLiRvbignJGxvY2F0aW9uQ2hhbmdlU3VjY2VzcycsIHNldEFjdGl2ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSlcbiAgICAuZGlyZWN0aXZlKCdzZXR0aW5nc1Nob3cnLCBmdW5jdGlvbiAoJGxvY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN0cmljdDogJ0MnLFxuICAgICAgICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc2V0QWN0aXZlKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aCA9ICRsb2NhdGlvbi5wYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGF0aC5pbmRleE9mKCdzZXR0aW5ncycpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2V0QWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgc2NvcGUuJG9uKCckbG9jYXRpb25DaGFuZ2VTdWNjZXNzJywgc2V0QWN0aXZlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').filter('zCapitalize', function() {
	return function(input) {
		if(!!input) {
			var arr = input.split(' ');
			for(var i = 0; i < arr.length; i++) {
				arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substr(1).toLowerCase();
			}

			return arr.join(' ');
		}
		return ' ';
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlcnMvekNhcGl0YWxpemUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sT0FBTyxlQUFlLFdBQVc7Q0FDdEQsT0FBTyxTQUFTLE9BQU87RUFDdEIsR0FBRyxDQUFDLENBQUMsT0FBTztHQUNYLElBQUksTUFBTSxNQUFNLE1BQU07R0FDdEIsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksUUFBUSxLQUFLO0lBQ25DLElBQUksS0FBSyxJQUFJLEdBQUcsT0FBTyxHQUFHLGdCQUFnQixJQUFJLEdBQUcsT0FBTyxHQUFHOzs7R0FHNUQsT0FBTyxJQUFJLEtBQUs7O0VBRWpCLE9BQU87O0dBRU4iLCJmaWxlIjoiZmlsdGVycy96Q2FwaXRhbGl6ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5maWx0ZXIoJ3pDYXBpdGFsaXplJywgZnVuY3Rpb24oKSB7XG5cdHJldHVybiBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlmKCEhaW5wdXQpIHtcblx0XHRcdHZhciBhcnIgPSBpbnB1dC5zcGxpdCgnICcpO1xuXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRhcnJbaV0gPSBhcnJbaV0uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBhcnJbaV0uc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBhcnIuam9pbignICcpO1xuXHRcdH1cblx0XHRyZXR1cm4gJyAnO1xuXHR9O1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').factory('zAppointment', ['$resource', function($resource) {
    var appointmentResource = $resource('/api/appointments/:id/:action', 
        {
            id: '@_id'
        },
        {
            'update': {
                method: 'PUT',
                isArray: false
            },
            'updateDates': {
                method: 'POST',
                url: '/api/appointments/:id/dates'
            }
        });
    /*
    TODO: delete?
    Object.defineProperty(appointmentResource.prototype, 'title', {
        get: function() {
            return this.appointmentTypeName;
        }
    });

    // TODO: move to util?
    Object.defineProperty(appointmentResource.prototype, 'id', {
        get: function() {
            return this._id;
        }
    });

    Object.defineProperty(appointmentResource.prototype, 'editable', {
        get: function() {
            return true;
        }
    });

    Object.defineProperty(appointmentResource.prototype, 'ignoreTimezone', {
        get: function() {
            return true;
        }
    });
    */
    return appointmentResource;
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy96QXBwb2ludG1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sUUFBUSw4QkFBZ0IsU0FBUyxXQUFXO0lBQzlELElBQUksc0JBQXNCLFVBQVU7UUFDaEM7WUFDSSxJQUFJOztRQUVSO1lBQ0ksVUFBVTtnQkFDTixRQUFRO2dCQUNSLFNBQVM7O1lBRWIsZUFBZTtnQkFDWCxRQUFRO2dCQUNSLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQThCakIsT0FBTztJQUNSIiwiZmlsZSI6InJlc291cmNlcy96QXBwb2ludG1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuZmFjdG9yeSgnekFwcG9pbnRtZW50JywgZnVuY3Rpb24oJHJlc291cmNlKSB7XG4gICAgdmFyIGFwcG9pbnRtZW50UmVzb3VyY2UgPSAkcmVzb3VyY2UoJy9hcGkvYXBwb2ludG1lbnRzLzppZC86YWN0aW9uJywgXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnQF9pZCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgJ3VwZGF0ZSc6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgICAgIGlzQXJyYXk6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ3VwZGF0ZURhdGVzJzoge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvYXBwb2ludG1lbnRzLzppZC9kYXRlcydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgLypcbiAgICBUT0RPOiBkZWxldGU/XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFwcG9pbnRtZW50UmVzb3VyY2UucHJvdG90eXBlLCAndGl0bGUnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcHBvaW50bWVudFR5cGVOYW1lO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBUT0RPOiBtb3ZlIHRvIHV0aWw/XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFwcG9pbnRtZW50UmVzb3VyY2UucHJvdG90eXBlLCAnaWQnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhcHBvaW50bWVudFJlc291cmNlLnByb3RvdHlwZSwgJ2VkaXRhYmxlJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhcHBvaW50bWVudFJlc291cmNlLnByb3RvdHlwZSwgJ2lnbm9yZVRpbWV6b25lJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAqL1xuICAgIHJldHVybiBhcHBvaW50bWVudFJlc291cmNlO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').factory('zAppointmentTemplate', ['$resource', function($resource) {
    var appointmentTemplateResource = $resource('/api/appointmentTemplates/:id/', { id: '@_id' });
    return appointmentTemplateResource;
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy96QXBwb2ludG1lbnRUZW1wbGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxRQUFRLHNDQUF3QixTQUFTLFdBQVc7SUFDdEUsSUFBSSw4QkFBOEIsVUFBVSxrQ0FBa0MsRUFBRSxJQUFJO0lBQ3BGLE9BQU87SUFDUiIsImZpbGUiOiJyZXNvdXJjZXMvekFwcG9pbnRtZW50VGVtcGxhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuZmFjdG9yeSgnekFwcG9pbnRtZW50VGVtcGxhdGUnLCBmdW5jdGlvbigkcmVzb3VyY2UpIHtcbiAgICB2YXIgYXBwb2ludG1lbnRUZW1wbGF0ZVJlc291cmNlID0gJHJlc291cmNlKCcvYXBpL2FwcG9pbnRtZW50VGVtcGxhdGVzLzppZC8nLCB7IGlkOiAnQF9pZCcgfSk7XG4gICAgcmV0dXJuIGFwcG9pbnRtZW50VGVtcGxhdGVSZXNvdXJjZTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').factory('zClient', ['$resource', function($resource) {
    var clientResource = $resource('/api/clients/:id/', {
        id: '@_id'
    });

    Object.defineProperty(clientResource.prototype, 'name', {
        get: function() {
            return this.knownAs ? 
                this.knownAs + ' ' + (this.lastName ? this.lastName : '') :
                this.firstName + ' ' + (this.lastName ? this.lastName : '');
        }
    });

    Object.defineProperty(clientResource.prototype, 'age', {
        get: function() {
            if (this.dob) {
                return (moment().year() - moment(this.dob).year());
            }
        }
    });
    
    clientResource.mapObjectsToResources = function(items) {
        return items.map(function(item) {
            /* jshint newcap: false */
            return new clientResource(item);
        });
    };
    
    clientResource.getName = function(client) {
        return client.knownAs ? 
            client.knownAs + ' ' + (client.lastName ? client.lastName : '') :
            client.firstName + ' ' + (client.lastName ? client.lastName : '');
    };

    return clientResource;
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy96Q2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFFBQVEseUJBQVcsU0FBUyxXQUFXO0lBQ3pELElBQUksaUJBQWlCLFVBQVUscUJBQXFCO1FBQ2hELElBQUk7OztJQUdSLE9BQU8sZUFBZSxlQUFlLFdBQVcsUUFBUTtRQUNwRCxLQUFLLFdBQVc7WUFDWixPQUFPLEtBQUs7Z0JBQ1IsS0FBSyxVQUFVLE9BQU8sS0FBSyxXQUFXLEtBQUssV0FBVztnQkFDdEQsS0FBSyxZQUFZLE9BQU8sS0FBSyxXQUFXLEtBQUssV0FBVzs7OztJQUlwRSxPQUFPLGVBQWUsZUFBZSxXQUFXLE9BQU87UUFDbkQsS0FBSyxXQUFXO1lBQ1osSUFBSSxLQUFLLEtBQUs7Z0JBQ1YsUUFBUSxTQUFTLFNBQVMsT0FBTyxLQUFLLEtBQUs7Ozs7O0lBS3ZELGVBQWUsd0JBQXdCLFNBQVMsT0FBTztRQUNuRCxPQUFPLE1BQU0sSUFBSSxTQUFTLE1BQU07O1lBRTVCLE9BQU8sSUFBSSxlQUFlOzs7O0lBSWxDLGVBQWUsVUFBVSxTQUFTLFFBQVE7UUFDdEMsT0FBTyxPQUFPO1lBQ1YsT0FBTyxVQUFVLE9BQU8sT0FBTyxXQUFXLE9BQU8sV0FBVztZQUM1RCxPQUFPLFlBQVksT0FBTyxPQUFPLFdBQVcsT0FBTyxXQUFXOzs7SUFHdEUsT0FBTzs7QUFFWCIsImZpbGUiOiJyZXNvdXJjZXMvekNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5mYWN0b3J5KCd6Q2xpZW50JywgZnVuY3Rpb24oJHJlc291cmNlKSB7XG4gICAgdmFyIGNsaWVudFJlc291cmNlID0gJHJlc291cmNlKCcvYXBpL2NsaWVudHMvOmlkLycsIHtcbiAgICAgICAgaWQ6ICdAX2lkJ1xuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNsaWVudFJlc291cmNlLnByb3RvdHlwZSwgJ25hbWUnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5rbm93bkFzID8gXG4gICAgICAgICAgICAgICAgdGhpcy5rbm93bkFzICsgJyAnICsgKHRoaXMubGFzdE5hbWUgPyB0aGlzLmxhc3ROYW1lIDogJycpIDpcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0TmFtZSArICcgJyArICh0aGlzLmxhc3ROYW1lID8gdGhpcy5sYXN0TmFtZSA6ICcnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNsaWVudFJlc291cmNlLnByb3RvdHlwZSwgJ2FnZScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRvYikge1xuICAgICAgICAgICAgICAgIHJldHVybiAobW9tZW50KCkueWVhcigpIC0gbW9tZW50KHRoaXMuZG9iKS55ZWFyKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgY2xpZW50UmVzb3VyY2UubWFwT2JqZWN0c1RvUmVzb3VyY2VzID0gZnVuY3Rpb24oaXRlbXMpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW1zLm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAvKiBqc2hpbnQgbmV3Y2FwOiBmYWxzZSAqL1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBjbGllbnRSZXNvdXJjZShpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBcbiAgICBjbGllbnRSZXNvdXJjZS5nZXROYW1lID0gZnVuY3Rpb24oY2xpZW50KSB7XG4gICAgICAgIHJldHVybiBjbGllbnQua25vd25BcyA/IFxuICAgICAgICAgICAgY2xpZW50Lmtub3duQXMgKyAnICcgKyAoY2xpZW50Lmxhc3ROYW1lID8gY2xpZW50Lmxhc3ROYW1lIDogJycpIDpcbiAgICAgICAgICAgIGNsaWVudC5maXJzdE5hbWUgKyAnICcgKyAoY2xpZW50Lmxhc3ROYW1lID8gY2xpZW50Lmxhc3ROYW1lIDogJycpO1xuICAgIH07XG5cbiAgICByZXR1cm4gY2xpZW50UmVzb3VyY2U7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').factory('zDashboardResource', ['$resource', function ($resource) {

	return {
		dashboard: $resource('/api/dashboard', {}, { 'update': { method:'PUT' }}),
		dashboards: $resource('/api/dashboards')
	};
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy96RGFzaGJvYXJkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFFBQVEsb0NBQXNCLFVBQVUsV0FBVzs7Q0FFeEUsT0FBTztFQUNOLFdBQVcsVUFBVSxrQkFBa0IsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPO0VBQ2hFLFlBQVksVUFBVTs7SUFFckIiLCJmaWxlIjoicmVzb3VyY2VzL3pEYXNoYm9hcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuZmFjdG9yeSgnekRhc2hib2FyZFJlc291cmNlJywgZnVuY3Rpb24gKCRyZXNvdXJjZSkge1xuXG5cdHJldHVybiB7XG5cdFx0ZGFzaGJvYXJkOiAkcmVzb3VyY2UoJy9hcGkvZGFzaGJvYXJkJywge30sIHsgJ3VwZGF0ZSc6IHsgbWV0aG9kOidQVVQnIH19KSxcblx0XHRkYXNoYm9hcmRzOiAkcmVzb3VyY2UoJy9hcGkvZGFzaGJvYXJkcycpXG5cdH07XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').factory('zResource', ['$resource', function($resource) {
    var resourceResource = $resource('/api/resources/:id/:action', 
        {
            id: '@_id'
        }, 
        {
            'update': {
                method: 'PUT',
                isArray: false
            },
            'updateRegions': {
                method: 'POST',
                url: '/api/resources/:id/regions'
            }
        }
    );
    return resourceResource;
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy96UmVzb3VyY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sUUFBUSwyQkFBYSxTQUFTLFdBQVc7SUFDM0QsSUFBSSxtQkFBbUIsVUFBVTtRQUM3QjtZQUNJLElBQUk7O1FBRVI7WUFDSSxVQUFVO2dCQUNOLFFBQVE7Z0JBQ1IsU0FBUzs7WUFFYixpQkFBaUI7Z0JBQ2IsUUFBUTtnQkFDUixLQUFLOzs7O0lBSWpCLE9BQU87SUFDUiIsImZpbGUiOiJyZXNvdXJjZXMvelJlc291cmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ3pSZXNvdXJjZScsIGZ1bmN0aW9uKCRyZXNvdXJjZSkge1xuICAgIHZhciByZXNvdXJjZVJlc291cmNlID0gJHJlc291cmNlKCcvYXBpL3Jlc291cmNlcy86aWQvOmFjdGlvbicsIFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogJ0BfaWQnXG4gICAgICAgIH0sIFxuICAgICAgICB7XG4gICAgICAgICAgICAndXBkYXRlJzoge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICAgICAgaXNBcnJheTogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAndXBkYXRlUmVnaW9ucyc6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL3Jlc291cmNlcy86aWQvcmVnaW9ucydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICk7XG4gICAgcmV0dXJuIHJlc291cmNlUmVzb3VyY2U7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').factory('zResourceWeekAvTimes', ['$resource', function($resource) {
    var resourceWeekAvTimesResource = $resource('/api/resourceWeekAvTimes/',
        null, 
        {
            'clone': {
                method: 'POST',
                url: '/api/resourceWeekAvTimes/:id/clone'
            }
        }
    );
    return resourceWeekAvTimesResource;
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy96UmVzb3VyY2VXZWVrQXZUaW1lcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxRQUFRLHNDQUF3QixTQUFTLFdBQVc7SUFDdEUsSUFBSSw4QkFBOEIsVUFBVTtRQUN4QztRQUNBO1lBQ0ksU0FBUztnQkFDTCxRQUFRO2dCQUNSLEtBQUs7Ozs7SUFJakIsT0FBTztJQUNSIiwiZmlsZSI6InJlc291cmNlcy96UmVzb3VyY2VXZWVrQXZUaW1lcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5mYWN0b3J5KCd6UmVzb3VyY2VXZWVrQXZUaW1lcycsIGZ1bmN0aW9uKCRyZXNvdXJjZSkge1xuICAgIHZhciByZXNvdXJjZVdlZWtBdlRpbWVzUmVzb3VyY2UgPSAkcmVzb3VyY2UoJy9hcGkvcmVzb3VyY2VXZWVrQXZUaW1lcy8nLFxuICAgICAgICBudWxsLCBcbiAgICAgICAge1xuICAgICAgICAgICAgJ2Nsb25lJzoge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvcmVzb3VyY2VXZWVrQXZUaW1lcy86aWQvY2xvbmUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICApO1xuICAgIHJldHVybiByZXNvdXJjZVdlZWtBdlRpbWVzUmVzb3VyY2U7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').factory('zSite', ['$resource', '$http', '$q', 'zIdentity', function ($resource, $http, $q, zIdentity) {
    var siteResource = $resource('/api/sites/:id/:action', 
        {
            id: '@_id'
        }, 
        {
            'update': {
                method: 'PUT',
                isArray: false
            }
        });

    var currentSite;
    var allSites;
    
    function refreshSites(fullRefresh) {
        if (zIdentity.getJwt() && (fullRefresh || !allSites)) {
            return $http
                .get('/api/sites')
                .then(function (responce) {
                    var sites = responce.data;
                    var currentSiteId = zIdentity.getCurrentUser().currentSite;
                    allSites = sites;
                    currentSite = _.find(sites, '_id', currentSiteId);
                });
        }
        var deferred = $q.defer();
        deferred.resolve();
        return deferred.promise;
    }
    
    function getAllSites() {
        return allSites;
    }
    
    function getCurrentSite() {
        return currentSite;
    }
    
    return {
        siteResource: siteResource,
        getAllSites: getAllSites,
        getCurrentSite: getCurrentSite,
        refreshSites: refreshSites
    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy96U2l0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxRQUFRLG1EQUFTLFVBQVUsV0FBVyxPQUFPLElBQUksV0FBVztJQUM5RSxJQUFJLGVBQWUsVUFBVTtRQUN6QjtZQUNJLElBQUk7O1FBRVI7WUFDSSxVQUFVO2dCQUNOLFFBQVE7Z0JBQ1IsU0FBUzs7OztJQUlyQixJQUFJO0lBQ0osSUFBSTs7SUFFSixTQUFTLGFBQWEsYUFBYTtRQUMvQixJQUFJLFVBQVUsYUFBYSxlQUFlLENBQUMsV0FBVztZQUNsRCxPQUFPO2lCQUNGLElBQUk7aUJBQ0osS0FBSyxVQUFVLFVBQVU7b0JBQ3RCLElBQUksUUFBUSxTQUFTO29CQUNyQixJQUFJLGdCQUFnQixVQUFVLGlCQUFpQjtvQkFDL0MsV0FBVztvQkFDWCxjQUFjLEVBQUUsS0FBSyxPQUFPLE9BQU87OztRQUcvQyxJQUFJLFdBQVcsR0FBRztRQUNsQixTQUFTO1FBQ1QsT0FBTyxTQUFTOzs7SUFHcEIsU0FBUyxjQUFjO1FBQ25CLE9BQU87OztJQUdYLFNBQVMsaUJBQWlCO1FBQ3RCLE9BQU87OztJQUdYLE9BQU87UUFDSCxjQUFjO1FBQ2QsYUFBYTtRQUNiLGdCQUFnQjtRQUNoQixjQUFjOztJQUVuQiIsImZpbGUiOiJyZXNvdXJjZXMvelNpdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuZmFjdG9yeSgnelNpdGUnLCBmdW5jdGlvbiAoJHJlc291cmNlLCAkaHR0cCwgJHEsIHpJZGVudGl0eSkge1xuICAgIHZhciBzaXRlUmVzb3VyY2UgPSAkcmVzb3VyY2UoJy9hcGkvc2l0ZXMvOmlkLzphY3Rpb24nLCBcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICdAX2lkJ1xuICAgICAgICB9LCBcbiAgICAgICAge1xuICAgICAgICAgICAgJ3VwZGF0ZSc6IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgICAgIGlzQXJyYXk6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgdmFyIGN1cnJlbnRTaXRlO1xuICAgIHZhciBhbGxTaXRlcztcbiAgICBcbiAgICBmdW5jdGlvbiByZWZyZXNoU2l0ZXMoZnVsbFJlZnJlc2gpIHtcbiAgICAgICAgaWYgKHpJZGVudGl0eS5nZXRKd3QoKSAmJiAoZnVsbFJlZnJlc2ggfHwgIWFsbFNpdGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgLmdldCgnL2FwaS9zaXRlcycpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzaXRlcyA9IHJlc3BvbmNlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50U2l0ZUlkID0geklkZW50aXR5LmdldEN1cnJlbnRVc2VyKCkuY3VycmVudFNpdGU7XG4gICAgICAgICAgICAgICAgICAgIGFsbFNpdGVzID0gc2l0ZXM7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTaXRlID0gXy5maW5kKHNpdGVzLCAnX2lkJywgY3VycmVudFNpdGVJZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gZ2V0QWxsU2l0ZXMoKSB7XG4gICAgICAgIHJldHVybiBhbGxTaXRlcztcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gZ2V0Q3VycmVudFNpdGUoKSB7XG4gICAgICAgIHJldHVybiBjdXJyZW50U2l0ZTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2l0ZVJlc291cmNlOiBzaXRlUmVzb3VyY2UsXG4gICAgICAgIGdldEFsbFNpdGVzOiBnZXRBbGxTaXRlcyxcbiAgICAgICAgZ2V0Q3VycmVudFNpdGU6IGdldEN1cnJlbnRTaXRlLFxuICAgICAgICByZWZyZXNoU2l0ZXM6IHJlZnJlc2hTaXRlc1xuICAgIH07XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').factory('zToken', ['$resource', function($resource) {
    var tokenResource = $resource('/api/token/:id', {id : '@id'});
    return tokenResource;
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy96VG9rZW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sUUFBUSx3QkFBVSxTQUFTLFdBQVc7SUFDeEQsSUFBSSxnQkFBZ0IsVUFBVSxrQkFBa0IsQ0FBQyxLQUFLO0lBQ3RELE9BQU87SUFDUiIsImZpbGUiOiJyZXNvdXJjZXMvelRva2VuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ3pUb2tlbicsIGZ1bmN0aW9uKCRyZXNvdXJjZSkge1xuICAgIHZhciB0b2tlblJlc291cmNlID0gJHJlc291cmNlKCcvYXBpL3Rva2VuLzppZCcsIHtpZCA6ICdAaWQnfSk7XG4gICAgcmV0dXJuIHRva2VuUmVzb3VyY2U7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').factory('zUser', ['$resource', function($resource) {
    var userResource = $resource('/api/users/:id/:action',
        {
            id: '@_id'
        }, 
        {
            'update': {
                method: 'PUT',
                isArray: false
            }
        }
    );
    
    Object.defineProperty(userResource.prototype, 'name', {
        get: function() {
            return userResource.getName(this);
        }
    });

    Object.defineProperty(userResource.prototype, 'isAdmin', {
        get: function() {
            return this.roles && this.roles.indexOf('admin') !== -1 ;
        }
    });
    
    userResource.getName = function(user) {
        return (user.displayName || (user.firstName || '') + ' ' + (user.lastName || '')).trim();
    };

    return userResource;
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy96VXNlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxRQUFRLHVCQUFTLFNBQVMsV0FBVztJQUN2RCxJQUFJLGVBQWUsVUFBVTtRQUN6QjtZQUNJLElBQUk7O1FBRVI7WUFDSSxVQUFVO2dCQUNOLFFBQVE7Z0JBQ1IsU0FBUzs7Ozs7SUFLckIsT0FBTyxlQUFlLGFBQWEsV0FBVyxRQUFRO1FBQ2xELEtBQUssV0FBVztZQUNaLE9BQU8sYUFBYSxRQUFROzs7O0lBSXBDLE9BQU8sZUFBZSxhQUFhLFdBQVcsV0FBVztRQUNyRCxLQUFLLFdBQVc7WUFDWixPQUFPLEtBQUssU0FBUyxLQUFLLE1BQU0sUUFBUSxhQUFhLENBQUM7Ozs7SUFJOUQsYUFBYSxVQUFVLFNBQVMsTUFBTTtRQUNsQyxPQUFPLENBQUMsS0FBSyxlQUFlLENBQUMsS0FBSyxhQUFhLE1BQU0sT0FBTyxLQUFLLFlBQVksS0FBSzs7O0lBR3RGLE9BQU87O0FBRVgiLCJmaWxlIjoicmVzb3VyY2VzL3pVc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ3pVc2VyJywgZnVuY3Rpb24oJHJlc291cmNlKSB7XG4gICAgdmFyIHVzZXJSZXNvdXJjZSA9ICRyZXNvdXJjZSgnL2FwaS91c2Vycy86aWQvOmFjdGlvbicsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnQF9pZCdcbiAgICAgICAgfSwgXG4gICAgICAgIHtcbiAgICAgICAgICAgICd1cGRhdGUnOiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICBpc0FycmF5OiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcbiAgICBcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodXNlclJlc291cmNlLnByb3RvdHlwZSwgJ25hbWUnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdXNlclJlc291cmNlLmdldE5hbWUodGhpcyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh1c2VyUmVzb3VyY2UucHJvdG90eXBlLCAnaXNBZG1pbicsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvbGVzICYmIHRoaXMucm9sZXMuaW5kZXhPZignYWRtaW4nKSAhPT0gLTEgO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgdXNlclJlc291cmNlLmdldE5hbWUgPSBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgIHJldHVybiAodXNlci5kaXNwbGF5TmFtZSB8fCAodXNlci5maXJzdE5hbWUgfHwgJycpICsgJyAnICsgKHVzZXIubGFzdE5hbWUgfHwgJycpKS50cmltKCk7XG4gICAgfTtcblxuICAgIHJldHVybiB1c2VyUmVzb3VyY2U7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').factory('zUserById', ['$resource', function($resource) {
    var userResource = $resource('/api/users/:_id',
        {
            id: '@_id'
        }
    );

    return userResource;
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy96VXNlckJ5SWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sUUFBUSwyQkFBYSxTQUFTLFdBQVc7SUFDM0QsSUFBSSxlQUFlLFVBQVU7UUFDekI7WUFDSSxJQUFJOzs7O0lBSVosT0FBTzs7QUFFWCIsImZpbGUiOiJyZXNvdXJjZXMvelVzZXJCeUlkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ3pVc2VyQnlJZCcsIGZ1bmN0aW9uKCRyZXNvdXJjZSkge1xuICAgIHZhciB1c2VyUmVzb3VyY2UgPSAkcmVzb3VyY2UoJy9hcGkvdXNlcnMvOl9pZCcsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnQF9pZCdcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICByZXR1cm4gdXNlclJlc291cmNlO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').factory('zUserEcho', ['$resource', function($resource) {

	var userEchoResource = $resource('/api/token/getUserEcho');

	return userEchoResource;
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy96VXNlckVjaG8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sUUFBUSwyQkFBYSxTQUFTLFdBQVc7O0NBRTlELElBQUksbUJBQW1CLFVBQVU7O0NBRWpDLE9BQU87SUFDTCIsImZpbGUiOiJyZXNvdXJjZXMvelVzZXJFY2hvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ3pVc2VyRWNobycsIGZ1bmN0aW9uKCRyZXNvdXJjZSkge1xuXG5cdHZhciB1c2VyRWNob1Jlc291cmNlID0gJHJlc291cmNlKCcvYXBpL3Rva2VuL2dldFVzZXJFY2hvJyk7XG5cblx0cmV0dXJuIHVzZXJFY2hvUmVzb3VyY2U7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').factory('zAuth', ['$http', '$q', 'zIdentity', 'zUser', 'jwtHelper', 'zUserEchoService', 'zTheme', 'zNotifier', function ($http, $q, zIdentity, zUser, jwtHelper, zUserEchoService, zTheme, zNotifier) {
    return {
        authenticateUser: function (email, password) {
            return $http
                .post('/login', {
                    email: email,
                    password: password
                })
                .then(function (response) {
                    zIdentity.setJwt(response.data.jwt, response.data.user);
                    return response.data;
                });
        },
        
        registerOwner: function (newUserData) {
            return $http
                .post('/api/users/register', newUserData)
                .then(function (response) {
                    return zIdentity.setCurrentUser(response.data);
                });
        },
        
        changeSite: function (siteId) {
            var self = this;
            return zUser
                .get({ id: zIdentity.getCurrentUser()._id })
                .$promise
                .then(function (user) {
                    user.currentSite = siteId;
                    return user.$update();
                })
                .then(function () {
                    return self.refreshJwt();
                });
        },

        logoutUser: function () {
            // remove userEcho feedback button
            $('.ue-tab-container').remove();
            // logout userEcho
            var accessToken;
            var SSO_GUI = zIdentity.getCurrentUser()._id;

            zUserEchoService.getAccessToken()
                .then(function(data) {
                    accessToken = data.accessToken;

                    return $http
                        .get('https://userecho.com/api/v2/users/sso/'+ SSO_GUI +'.json?access_token='+ accessToken);
                })
                .then(function(api) {
                    var id = api.data.data? api.data.data.id : '1';

                    zIdentity.removeJwt();

                    return $http
                        .get('https://userecho.com/api/v2/users/'+ id +'/logout.json?access_token='+ accessToken);
                })
                .catch(function(err) {
                    zNotifier.error('Error occured While logout : ' + err);
                });
        },
        
        authorizeCurrentUserForRoute: function (role) {
            if (zIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },
        
        loggedIn: function () {
            var expToken = zIdentity.getJwt();
            var isTokenExpired = false;

            // check if token expired
            if(expToken) {
                isTokenExpired = jwtHelper.isTokenExpired(expToken);
            }

            if (zIdentity.isAuthenticated() && !isTokenExpired) {
                return true;
            } else {
                zIdentity.removeJwt();
                return $q.reject('not authenticated');
            }
        },
        
        refreshJwt: function() {
            return $http
                .get('/refreshJwt')
                .then(function (responce) {
                    return zIdentity.setJwt(responce.data.jwt, responce.data.user);
                })
                .catch(function () {
                    zIdentity.removeJwt();
                });
        }
    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3pBdXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFFBQVEsdUdBQVMsVUFBVSxPQUFPLElBQUksV0FBVyxPQUFPLFdBQVcsa0JBQWtCLFFBQVEsV0FBVztJQUMxSCxPQUFPO1FBQ0gsa0JBQWtCLFVBQVUsT0FBTyxVQUFVO1lBQ3pDLE9BQU87aUJBQ0YsS0FBSyxVQUFVO29CQUNaLE9BQU87b0JBQ1AsVUFBVTs7aUJBRWIsS0FBSyxVQUFVLFVBQVU7b0JBQ3RCLFVBQVUsT0FBTyxTQUFTLEtBQUssS0FBSyxTQUFTLEtBQUs7b0JBQ2xELE9BQU8sU0FBUzs7OztRQUk1QixlQUFlLFVBQVUsYUFBYTtZQUNsQyxPQUFPO2lCQUNGLEtBQUssdUJBQXVCO2lCQUM1QixLQUFLLFVBQVUsVUFBVTtvQkFDdEIsT0FBTyxVQUFVLGVBQWUsU0FBUzs7OztRQUlyRCxZQUFZLFVBQVUsUUFBUTtZQUMxQixJQUFJLE9BQU87WUFDWCxPQUFPO2lCQUNGLElBQUksRUFBRSxJQUFJLFVBQVUsaUJBQWlCO2lCQUNyQztpQkFDQSxLQUFLLFVBQVUsTUFBTTtvQkFDbEIsS0FBSyxjQUFjO29CQUNuQixPQUFPLEtBQUs7O2lCQUVmLEtBQUssWUFBWTtvQkFDZCxPQUFPLEtBQUs7Ozs7UUFJeEIsWUFBWSxZQUFZOztZQUVwQixFQUFFLHFCQUFxQjs7WUFFdkIsSUFBSTtZQUNKLElBQUksVUFBVSxVQUFVLGlCQUFpQjs7WUFFekMsaUJBQWlCO2lCQUNaLEtBQUssU0FBUyxNQUFNO29CQUNqQixjQUFjLEtBQUs7O29CQUVuQixPQUFPO3lCQUNGLElBQUksMENBQTBDLFNBQVMsdUJBQXVCOztpQkFFdEYsS0FBSyxTQUFTLEtBQUs7b0JBQ2hCLElBQUksS0FBSyxJQUFJLEtBQUssTUFBTSxJQUFJLEtBQUssS0FBSyxLQUFLOztvQkFFM0MsVUFBVTs7b0JBRVYsT0FBTzt5QkFDRixJQUFJLHNDQUFzQyxJQUFJLDhCQUE4Qjs7aUJBRXBGLE1BQU0sU0FBUyxLQUFLO29CQUNqQixVQUFVLE1BQU0sa0NBQWtDOzs7O1FBSTlELDhCQUE4QixVQUFVLE1BQU07WUFDMUMsSUFBSSxVQUFVLGFBQWEsT0FBTztnQkFDOUIsT0FBTzttQkFDSjtnQkFDSCxPQUFPLEdBQUcsT0FBTzs7OztRQUl6QixVQUFVLFlBQVk7WUFDbEIsSUFBSSxXQUFXLFVBQVU7WUFDekIsSUFBSSxpQkFBaUI7OztZQUdyQixHQUFHLFVBQVU7Z0JBQ1QsaUJBQWlCLFVBQVUsZUFBZTs7O1lBRzlDLElBQUksVUFBVSxxQkFBcUIsQ0FBQyxnQkFBZ0I7Z0JBQ2hELE9BQU87bUJBQ0o7Z0JBQ0gsVUFBVTtnQkFDVixPQUFPLEdBQUcsT0FBTzs7OztRQUl6QixZQUFZLFdBQVc7WUFDbkIsT0FBTztpQkFDRixJQUFJO2lCQUNKLEtBQUssVUFBVSxVQUFVO29CQUN0QixPQUFPLFVBQVUsT0FBTyxTQUFTLEtBQUssS0FBSyxTQUFTLEtBQUs7O2lCQUU1RCxNQUFNLFlBQVk7b0JBQ2YsVUFBVTs7OztJQUkzQiIsImZpbGUiOiJzZXJ2aWNlcy96QXV0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5mYWN0b3J5KCd6QXV0aCcsIGZ1bmN0aW9uICgkaHR0cCwgJHEsIHpJZGVudGl0eSwgelVzZXIsIGp3dEhlbHBlciwgelVzZXJFY2hvU2VydmljZSwgelRoZW1lLCB6Tm90aWZpZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhdXRoZW50aWNhdGVVc2VyOiBmdW5jdGlvbiAoZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAucG9zdCgnL2xvZ2luJywge1xuICAgICAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHpJZGVudGl0eS5zZXRKd3QocmVzcG9uc2UuZGF0YS5qd3QsIHJlc3BvbnNlLmRhdGEudXNlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgcmVnaXN0ZXJPd25lcjogZnVuY3Rpb24gKG5ld1VzZXJEYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAucG9zdCgnL2FwaS91c2Vycy9yZWdpc3RlcicsIG5ld1VzZXJEYXRhKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geklkZW50aXR5LnNldEN1cnJlbnRVc2VyKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgY2hhbmdlU2l0ZTogZnVuY3Rpb24gKHNpdGVJZCkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIHpVc2VyXG4gICAgICAgICAgICAgICAgLmdldCh7IGlkOiB6SWRlbnRpdHkuZ2V0Q3VycmVudFVzZXIoKS5faWQgfSlcbiAgICAgICAgICAgICAgICAuJHByb21pc2VcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICB1c2VyLmN1cnJlbnRTaXRlID0gc2l0ZUlkO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXNlci4kdXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLnJlZnJlc2hKd3QoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBsb2dvdXRVc2VyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgdXNlckVjaG8gZmVlZGJhY2sgYnV0dG9uXG4gICAgICAgICAgICAkKCcudWUtdGFiLWNvbnRhaW5lcicpLnJlbW92ZSgpO1xuICAgICAgICAgICAgLy8gbG9nb3V0IHVzZXJFY2hvXG4gICAgICAgICAgICB2YXIgYWNjZXNzVG9rZW47XG4gICAgICAgICAgICB2YXIgU1NPX0dVSSA9IHpJZGVudGl0eS5nZXRDdXJyZW50VXNlcigpLl9pZDtcblxuICAgICAgICAgICAgelVzZXJFY2hvU2VydmljZS5nZXRBY2Nlc3NUb2tlbigpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbiA9IGRhdGEuYWNjZXNzVG9rZW47XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCdodHRwczovL3VzZXJlY2hvLmNvbS9hcGkvdjIvdXNlcnMvc3NvLycrIFNTT19HVUkgKycuanNvbj9hY2Nlc3NfdG9rZW49JysgYWNjZXNzVG9rZW4pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oYXBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpZCA9IGFwaS5kYXRhLmRhdGE/IGFwaS5kYXRhLmRhdGEuaWQgOiAnMSc7XG5cbiAgICAgICAgICAgICAgICAgICAgeklkZW50aXR5LnJlbW92ZUp3dCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgnaHR0cHM6Ly91c2VyZWNoby5jb20vYXBpL3YyL3VzZXJzLycrIGlkICsnL2xvZ291dC5qc29uP2FjY2Vzc190b2tlbj0nKyBhY2Nlc3NUb2tlbik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHpOb3RpZmllci5lcnJvcignRXJyb3Igb2NjdXJlZCBXaGlsZSBsb2dvdXQgOiAnICsgZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIGF1dGhvcml6ZUN1cnJlbnRVc2VyRm9yUm91dGU6IGZ1bmN0aW9uIChyb2xlKSB7XG4gICAgICAgICAgICBpZiAoeklkZW50aXR5LmlzQXV0aG9yaXplZChyb2xlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KCdub3QgYXV0aG9yaXplZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgbG9nZ2VkSW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBleHBUb2tlbiA9IHpJZGVudGl0eS5nZXRKd3QoKTtcbiAgICAgICAgICAgIHZhciBpc1Rva2VuRXhwaXJlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0b2tlbiBleHBpcmVkXG4gICAgICAgICAgICBpZihleHBUb2tlbikge1xuICAgICAgICAgICAgICAgIGlzVG9rZW5FeHBpcmVkID0gand0SGVscGVyLmlzVG9rZW5FeHBpcmVkKGV4cFRva2VuKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHpJZGVudGl0eS5pc0F1dGhlbnRpY2F0ZWQoKSAmJiAhaXNUb2tlbkV4cGlyZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgeklkZW50aXR5LnJlbW92ZUp3dCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoJ25vdCBhdXRoZW50aWNhdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICByZWZyZXNoSnd0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgIC5nZXQoJy9yZWZyZXNoSnd0JylcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHpJZGVudGl0eS5zZXRKd3QocmVzcG9uY2UuZGF0YS5qd3QsIHJlc3BvbmNlLmRhdGEudXNlcik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB6SWRlbnRpdHkucmVtb3ZlSnd0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').factory('zAuthInterceptor', ['zIdentity', function (zIdentity) {
    return {
        request: function (config) {
            var jwt = zIdentity.getJwt();
            if (jwt) {
                config.headers.authorization = 'Bearer ' + jwt;
            }
            return config;
        },
        response: function (response) {
            return response;
        }
    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3pBdXRoSW50ZXJjZXB0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sUUFBUSxrQ0FBb0IsVUFBVSxXQUFXO0lBQ25FLE9BQU87UUFDSCxTQUFTLFVBQVUsUUFBUTtZQUN2QixJQUFJLE1BQU0sVUFBVTtZQUNwQixJQUFJLEtBQUs7Z0JBQ0wsT0FBTyxRQUFRLGdCQUFnQixZQUFZOztZQUUvQyxPQUFPOztRQUVYLFVBQVUsVUFBVSxVQUFVO1lBQzFCLE9BQU87OztJQUdoQiIsImZpbGUiOiJzZXJ2aWNlcy96QXV0aEludGVyY2VwdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ3pBdXRoSW50ZXJjZXB0b3InLCBmdW5jdGlvbiAoeklkZW50aXR5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVxdWVzdDogZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICAgICAgdmFyIGp3dCA9IHpJZGVudGl0eS5nZXRKd3QoKTtcbiAgICAgICAgICAgIGlmIChqd3QpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuaGVhZGVycy5hdXRob3JpemF0aW9uID0gJ0JlYXJlciAnICsgand0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgICAgfSxcbiAgICAgICAgcmVzcG9uc2U6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9XG4gICAgfTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').factory('zAws', ['$http', '$q', function($http, $q) {
    var gettingCredsPromise;

    return {
        config: AWS.config,
        aws: function() {
            if (gettingCredsPromise) {
                return gettingCredsPromise;
            }
            
            var deferred = $q.defer();
            if (AWS.config.credentials && !AWS.config.credentials.expired) {
                deferred.resolve(AWS);
            } else {
                $http
                    .get('/api/token/getTemporaryCredentials')
                    .then(function (res) {
                        AWS.config.credentials = new AWS.Credentials(res.data.AccessKeyId, res.data.SecretAccessKey, res.data.SessionToken);
                        AWS.config.credentials.expireTime = res.data.Expiration;
                        AWS.config.region = res.data.Region;
                        AWS.config.s3 = { bucket: res.data.Bucket };
                        deferred.resolve(AWS);
                    })
                    .catch(function(err) {
                        deferred.reject(err.data.reason);
                    })
                    .finally(function() {
                        gettingCredsPromise = null;
                    });
            }
            
            gettingCredsPromise = deferred.promise;
            return gettingCredsPromise;
        }
    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3pBd3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sUUFBUSx3QkFBUSxTQUFTLE9BQU8sSUFBSTtJQUN0RCxJQUFJOztJQUVKLE9BQU87UUFDSCxRQUFRLElBQUk7UUFDWixLQUFLLFdBQVc7WUFDWixJQUFJLHFCQUFxQjtnQkFDckIsT0FBTzs7O1lBR1gsSUFBSSxXQUFXLEdBQUc7WUFDbEIsSUFBSSxJQUFJLE9BQU8sZUFBZSxDQUFDLElBQUksT0FBTyxZQUFZLFNBQVM7Z0JBQzNELFNBQVMsUUFBUTttQkFDZDtnQkFDSDtxQkFDSyxJQUFJO3FCQUNKLEtBQUssVUFBVSxLQUFLO3dCQUNqQixJQUFJLE9BQU8sY0FBYyxJQUFJLElBQUksWUFBWSxJQUFJLEtBQUssYUFBYSxJQUFJLEtBQUssaUJBQWlCLElBQUksS0FBSzt3QkFDdEcsSUFBSSxPQUFPLFlBQVksYUFBYSxJQUFJLEtBQUs7d0JBQzdDLElBQUksT0FBTyxTQUFTLElBQUksS0FBSzt3QkFDN0IsSUFBSSxPQUFPLEtBQUssRUFBRSxRQUFRLElBQUksS0FBSzt3QkFDbkMsU0FBUyxRQUFROztxQkFFcEIsTUFBTSxTQUFTLEtBQUs7d0JBQ2pCLFNBQVMsT0FBTyxJQUFJLEtBQUs7O3FCQUU1QixRQUFRLFdBQVc7d0JBQ2hCLHNCQUFzQjs7OztZQUlsQyxzQkFBc0IsU0FBUztZQUMvQixPQUFPOzs7SUFHaEIiLCJmaWxlIjoic2VydmljZXMvekF3cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5mYWN0b3J5KCd6QXdzJywgZnVuY3Rpb24oJGh0dHAsICRxKSB7XG4gICAgdmFyIGdldHRpbmdDcmVkc1Byb21pc2U7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb25maWc6IEFXUy5jb25maWcsXG4gICAgICAgIGF3czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoZ2V0dGluZ0NyZWRzUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXR0aW5nQ3JlZHNQcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgaWYgKEFXUy5jb25maWcuY3JlZGVudGlhbHMgJiYgIUFXUy5jb25maWcuY3JlZGVudGlhbHMuZXhwaXJlZCkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoQVdTKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLmdldCgnL2FwaS90b2tlbi9nZXRUZW1wb3JhcnlDcmVkZW50aWFscycpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFXUy5jb25maWcuY3JlZGVudGlhbHMgPSBuZXcgQVdTLkNyZWRlbnRpYWxzKHJlcy5kYXRhLkFjY2Vzc0tleUlkLCByZXMuZGF0YS5TZWNyZXRBY2Nlc3NLZXksIHJlcy5kYXRhLlNlc3Npb25Ub2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBBV1MuY29uZmlnLmNyZWRlbnRpYWxzLmV4cGlyZVRpbWUgPSByZXMuZGF0YS5FeHBpcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgQVdTLmNvbmZpZy5yZWdpb24gPSByZXMuZGF0YS5SZWdpb247XG4gICAgICAgICAgICAgICAgICAgICAgICBBV1MuY29uZmlnLnMzID0geyBidWNrZXQ6IHJlcy5kYXRhLkJ1Y2tldCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShBV1MpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXJyLmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXR0aW5nQ3JlZHNQcm9taXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGdldHRpbmdDcmVkc1Byb21pc2UgPSBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgICAgcmV0dXJuIGdldHRpbmdDcmVkc1Byb21pc2U7XG4gICAgICAgIH1cbiAgICB9O1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').factory('zDashboard', ['$window', 'zDashboardResource', 'zIdentity', 'zTheme', function ($window, zDashboardResource, zIdentity, zTheme) {
	var dashboard;
	var dashboards;

	var DEFAULT_DASHBOARDS = {
		'scheduler': {
					'name' : 'scheduler',
					'theme' : {
						'name' : 'default',
						'cssMin' : 'css/bootswatch/default.min.css'
					},
					'widgets' : {
						'right' : [
							{
								'name' : 'Calendar'
							},
							{
								'name' : 'Hours'
							}
						],
						'left' : [
							{
								'name' : 'Service Providers'
							}
						]
					}
				},

		'admin': {
					'name' : 'admin',
					'theme' : {
						'name' : 'default',
						'cssMin' : 'css/bootswatch/default.min.css'
					},
					'widgets' : {
						'right' : [
							{
								'name': 'Calendar'
							},
							{
								'name' : 'Events'
							}
						],
						'left' : [
							{
								'name' : 'Communication'
							},
							{
								'name' : 'ToDos'
							}
						]
					}
				},

		'manager': {
					'name' : 'manager',
					'theme' : {
						'name' : 'default',
						'cssMin' : 'css/bootswatch/default.min.css'
					},
					'widgets' : {
						'right' : [
							{
								'name': 'Calendar'
							},
							{
								'name' : 'Events'
							}
						],
						'left' : [
							{
								'name' : 'Communication'
							},
							{
								'name' : 'ToDos'
							}
						]
					}
				},

		'service provider': {
					'name' : 'service provider',
					'theme' : {
						'name' : 'default',
						'cssMin' : 'css/bootswatch/default.min.css'
					},
					'widgets' : {
						'right' : [
							{
								'name': 'Calendar'
							},
							{
								'name' : 'Events'
							}
						],
						'left' : [
							{
								'name' : 'Communication'
							},
							{
								'name' : 'ToDos'
							}
						]
					}
				},

		'owner': {
					'name' : 'owner',
					'theme' : {
						'name' : 'default',
						'cssMin' : 'css/bootswatch/default.min.css'
					},
					'widgets' : {
						'right' : [
							{
								'name': 'Calendar'
							},
							{
								'name' : 'Events'
							}
						],
						'left' : [
							{
								'name' : 'Communication'
							},
							{
								'name' : 'ToDos'
							}
						]
					}
				}
	};

	return {
		setActiveDashboard: function(zDashboard) {
			// change jwt
			var currUser = zIdentity.getCurrentUser();
			currUser.activeRole = zDashboard.name;
			zIdentity.setCurrentUser(currUser);

			// change theme
			zTheme.setCurrentTheme(zDashboard.theme);
			$window.localStorage.setItem('dashboard', zDashboard.name);
			dashboard = zDashboard;
		},
		getActiveDashboard: function() {
			return dashboard;
		},
		setActiveDashboards: function(zDashboards) {
			dashboards = zDashboards;
		},
		getActiveDashboards: function() {
			return dashboards;
		},
		getDefaultDashboard: function(name) {
			return DEFAULT_DASHBOARDS[name];
		},
		getDashboard: function(name) {
			return zDashboardResource.dashboard.get({ 'name': name }).$promise;
		},
		getDashboards: function() {
			return zDashboardResource.dashboards.query().$promise;
		},
		createDashboard: function(dashboard) {
			return zDashboardResource.dashboard.save({ 'dashboard': dashboard }).$promise;
		},
		updateDashboard: function(dashboard) {
			return zDashboardResource.dashboard.update({ 'dashboard': dashboard }).$promise;
		},
		deleteDashboard: function(name) {
			return zDashboardResource.dashboard.delete({ 'name': name }).$promise;
		}
	};
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3pEYXNoYm9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sUUFBUSx1RUFBYyxVQUFVLFNBQVMsb0JBQW9CLFdBQVcsUUFBUTtDQUNyRyxJQUFJO0NBQ0osSUFBSTs7Q0FFSixJQUFJLHFCQUFxQjtFQUN4QixhQUFhO0tBQ1YsU0FBUztLQUNULFVBQVU7TUFDVCxTQUFTO01BQ1QsV0FBVzs7S0FFWixZQUFZO01BQ1gsVUFBVTtPQUNUO1FBQ0MsU0FBUzs7T0FFVjtRQUNDLFNBQVM7OztNQUdYLFNBQVM7T0FDUjtRQUNDLFNBQVM7Ozs7OztFQU1mLFNBQVM7S0FDTixTQUFTO0tBQ1QsVUFBVTtNQUNULFNBQVM7TUFDVCxXQUFXOztLQUVaLFlBQVk7TUFDWCxVQUFVO09BQ1Q7UUFDQyxRQUFROztPQUVUO1FBQ0MsU0FBUzs7O01BR1gsU0FBUztPQUNSO1FBQ0MsU0FBUzs7T0FFVjtRQUNDLFNBQVM7Ozs7OztFQU1mLFdBQVc7S0FDUixTQUFTO0tBQ1QsVUFBVTtNQUNULFNBQVM7TUFDVCxXQUFXOztLQUVaLFlBQVk7TUFDWCxVQUFVO09BQ1Q7UUFDQyxRQUFROztPQUVUO1FBQ0MsU0FBUzs7O01BR1gsU0FBUztPQUNSO1FBQ0MsU0FBUzs7T0FFVjtRQUNDLFNBQVM7Ozs7OztFQU1mLG9CQUFvQjtLQUNqQixTQUFTO0tBQ1QsVUFBVTtNQUNULFNBQVM7TUFDVCxXQUFXOztLQUVaLFlBQVk7TUFDWCxVQUFVO09BQ1Q7UUFDQyxRQUFROztPQUVUO1FBQ0MsU0FBUzs7O01BR1gsU0FBUztPQUNSO1FBQ0MsU0FBUzs7T0FFVjtRQUNDLFNBQVM7Ozs7OztFQU1mLFNBQVM7S0FDTixTQUFTO0tBQ1QsVUFBVTtNQUNULFNBQVM7TUFDVCxXQUFXOztLQUVaLFlBQVk7TUFDWCxVQUFVO09BQ1Q7UUFDQyxRQUFROztPQUVUO1FBQ0MsU0FBUzs7O01BR1gsU0FBUztPQUNSO1FBQ0MsU0FBUzs7T0FFVjtRQUNDLFNBQVM7Ozs7Ozs7Q0FPaEIsT0FBTztFQUNOLG9CQUFvQixTQUFTLFlBQVk7O0dBRXhDLElBQUksV0FBVyxVQUFVO0dBQ3pCLFNBQVMsYUFBYSxXQUFXO0dBQ2pDLFVBQVUsZUFBZTs7O0dBR3pCLE9BQU8sZ0JBQWdCLFdBQVc7R0FDbEMsUUFBUSxhQUFhLFFBQVEsYUFBYSxXQUFXO0dBQ3JELFlBQVk7O0VBRWIsb0JBQW9CLFdBQVc7R0FDOUIsT0FBTzs7RUFFUixxQkFBcUIsU0FBUyxhQUFhO0dBQzFDLGFBQWE7O0VBRWQscUJBQXFCLFdBQVc7R0FDL0IsT0FBTzs7RUFFUixxQkFBcUIsU0FBUyxNQUFNO0dBQ25DLE9BQU8sbUJBQW1COztFQUUzQixjQUFjLFNBQVMsTUFBTTtHQUM1QixPQUFPLG1CQUFtQixVQUFVLElBQUksRUFBRSxRQUFRLFFBQVE7O0VBRTNELGVBQWUsV0FBVztHQUN6QixPQUFPLG1CQUFtQixXQUFXLFFBQVE7O0VBRTlDLGlCQUFpQixTQUFTLFdBQVc7R0FDcEMsT0FBTyxtQkFBbUIsVUFBVSxLQUFLLEVBQUUsYUFBYSxhQUFhOztFQUV0RSxpQkFBaUIsU0FBUyxXQUFXO0dBQ3BDLE9BQU8sbUJBQW1CLFVBQVUsT0FBTyxFQUFFLGFBQWEsYUFBYTs7RUFFeEUsaUJBQWlCLFNBQVMsTUFBTTtHQUMvQixPQUFPLG1CQUFtQixVQUFVLE9BQU8sRUFBRSxRQUFRLFFBQVE7OztJQUc3RCIsImZpbGUiOiJzZXJ2aWNlcy96RGFzaGJvYXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ3pEYXNoYm9hcmQnLCBmdW5jdGlvbiAoJHdpbmRvdywgekRhc2hib2FyZFJlc291cmNlLCB6SWRlbnRpdHksIHpUaGVtZSkge1xuXHR2YXIgZGFzaGJvYXJkO1xuXHR2YXIgZGFzaGJvYXJkcztcblxuXHR2YXIgREVGQVVMVF9EQVNIQk9BUkRTID0ge1xuXHRcdCdzY2hlZHVsZXInOiB7XG5cdFx0XHRcdFx0J25hbWUnIDogJ3NjaGVkdWxlcicsXG5cdFx0XHRcdFx0J3RoZW1lJyA6IHtcblx0XHRcdFx0XHRcdCduYW1lJyA6ICdkZWZhdWx0Jyxcblx0XHRcdFx0XHRcdCdjc3NNaW4nIDogJ2Nzcy9ib290c3dhdGNoL2RlZmF1bHQubWluLmNzcydcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdCd3aWRnZXRzJyA6IHtcblx0XHRcdFx0XHRcdCdyaWdodCcgOiBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHQnbmFtZScgOiAnQ2FsZW5kYXInXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHQnbmFtZScgOiAnSG91cnMnXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHQnbGVmdCcgOiBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHQnbmFtZScgOiAnU2VydmljZSBQcm92aWRlcnMnXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cblx0XHQnYWRtaW4nOiB7XG5cdFx0XHRcdFx0J25hbWUnIDogJ2FkbWluJyxcblx0XHRcdFx0XHQndGhlbWUnIDoge1xuXHRcdFx0XHRcdFx0J25hbWUnIDogJ2RlZmF1bHQnLFxuXHRcdFx0XHRcdFx0J2Nzc01pbicgOiAnY3NzL2Jvb3Rzd2F0Y2gvZGVmYXVsdC5taW4uY3NzJ1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0J3dpZGdldHMnIDoge1xuXHRcdFx0XHRcdFx0J3JpZ2h0JyA6IFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdCduYW1lJzogJ0NhbGVuZGFyJ1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0J25hbWUnIDogJ0V2ZW50cydcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRcdCdsZWZ0JyA6IFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdCduYW1lJyA6ICdDb21tdW5pY2F0aW9uJ1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0J25hbWUnIDogJ1RvRG9zJ1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRdXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXG5cdFx0J21hbmFnZXInOiB7XG5cdFx0XHRcdFx0J25hbWUnIDogJ21hbmFnZXInLFxuXHRcdFx0XHRcdCd0aGVtZScgOiB7XG5cdFx0XHRcdFx0XHQnbmFtZScgOiAnZGVmYXVsdCcsXG5cdFx0XHRcdFx0XHQnY3NzTWluJyA6ICdjc3MvYm9vdHN3YXRjaC9kZWZhdWx0Lm1pbi5jc3MnXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQnd2lkZ2V0cycgOiB7XG5cdFx0XHRcdFx0XHQncmlnaHQnIDogW1xuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0J25hbWUnOiAnQ2FsZW5kYXInXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHQnbmFtZScgOiAnRXZlbnRzJ1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdFx0J2xlZnQnIDogW1xuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0J25hbWUnIDogJ0NvbW11bmljYXRpb24nXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHQnbmFtZScgOiAnVG9Eb3MnXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cblx0XHQnc2VydmljZSBwcm92aWRlcic6IHtcblx0XHRcdFx0XHQnbmFtZScgOiAnc2VydmljZSBwcm92aWRlcicsXG5cdFx0XHRcdFx0J3RoZW1lJyA6IHtcblx0XHRcdFx0XHRcdCduYW1lJyA6ICdkZWZhdWx0Jyxcblx0XHRcdFx0XHRcdCdjc3NNaW4nIDogJ2Nzcy9ib290c3dhdGNoL2RlZmF1bHQubWluLmNzcydcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdCd3aWRnZXRzJyA6IHtcblx0XHRcdFx0XHRcdCdyaWdodCcgOiBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHQnbmFtZSc6ICdDYWxlbmRhcidcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdCduYW1lJyA6ICdFdmVudHMnXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHQnbGVmdCcgOiBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHQnbmFtZScgOiAnQ29tbXVuaWNhdGlvbidcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdCduYW1lJyA6ICdUb0Rvcydcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblxuXHRcdCdvd25lcic6IHtcblx0XHRcdFx0XHQnbmFtZScgOiAnb3duZXInLFxuXHRcdFx0XHRcdCd0aGVtZScgOiB7XG5cdFx0XHRcdFx0XHQnbmFtZScgOiAnZGVmYXVsdCcsXG5cdFx0XHRcdFx0XHQnY3NzTWluJyA6ICdjc3MvYm9vdHN3YXRjaC9kZWZhdWx0Lm1pbi5jc3MnXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQnd2lkZ2V0cycgOiB7XG5cdFx0XHRcdFx0XHQncmlnaHQnIDogW1xuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0J25hbWUnOiAnQ2FsZW5kYXInXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHQnbmFtZScgOiAnRXZlbnRzJ1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdFx0J2xlZnQnIDogW1xuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0J25hbWUnIDogJ0NvbW11bmljYXRpb24nXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHQnbmFtZScgOiAnVG9Eb3MnXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdHNldEFjdGl2ZURhc2hib2FyZDogZnVuY3Rpb24oekRhc2hib2FyZCkge1xuXHRcdFx0Ly8gY2hhbmdlIGp3dFxuXHRcdFx0dmFyIGN1cnJVc2VyID0geklkZW50aXR5LmdldEN1cnJlbnRVc2VyKCk7XG5cdFx0XHRjdXJyVXNlci5hY3RpdmVSb2xlID0gekRhc2hib2FyZC5uYW1lO1xuXHRcdFx0eklkZW50aXR5LnNldEN1cnJlbnRVc2VyKGN1cnJVc2VyKTtcblxuXHRcdFx0Ly8gY2hhbmdlIHRoZW1lXG5cdFx0XHR6VGhlbWUuc2V0Q3VycmVudFRoZW1lKHpEYXNoYm9hcmQudGhlbWUpO1xuXHRcdFx0JHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGFzaGJvYXJkJywgekRhc2hib2FyZC5uYW1lKTtcblx0XHRcdGRhc2hib2FyZCA9IHpEYXNoYm9hcmQ7XG5cdFx0fSxcblx0XHRnZXRBY3RpdmVEYXNoYm9hcmQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGRhc2hib2FyZDtcblx0XHR9LFxuXHRcdHNldEFjdGl2ZURhc2hib2FyZHM6IGZ1bmN0aW9uKHpEYXNoYm9hcmRzKSB7XG5cdFx0XHRkYXNoYm9hcmRzID0gekRhc2hib2FyZHM7XG5cdFx0fSxcblx0XHRnZXRBY3RpdmVEYXNoYm9hcmRzOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBkYXNoYm9hcmRzO1xuXHRcdH0sXG5cdFx0Z2V0RGVmYXVsdERhc2hib2FyZDogZnVuY3Rpb24obmFtZSkge1xuXHRcdFx0cmV0dXJuIERFRkFVTFRfREFTSEJPQVJEU1tuYW1lXTtcblx0XHR9LFxuXHRcdGdldERhc2hib2FyZDogZnVuY3Rpb24obmFtZSkge1xuXHRcdFx0cmV0dXJuIHpEYXNoYm9hcmRSZXNvdXJjZS5kYXNoYm9hcmQuZ2V0KHsgJ25hbWUnOiBuYW1lIH0pLiRwcm9taXNlO1xuXHRcdH0sXG5cdFx0Z2V0RGFzaGJvYXJkczogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gekRhc2hib2FyZFJlc291cmNlLmRhc2hib2FyZHMucXVlcnkoKS4kcHJvbWlzZTtcblx0XHR9LFxuXHRcdGNyZWF0ZURhc2hib2FyZDogZnVuY3Rpb24oZGFzaGJvYXJkKSB7XG5cdFx0XHRyZXR1cm4gekRhc2hib2FyZFJlc291cmNlLmRhc2hib2FyZC5zYXZlKHsgJ2Rhc2hib2FyZCc6IGRhc2hib2FyZCB9KS4kcHJvbWlzZTtcblx0XHR9LFxuXHRcdHVwZGF0ZURhc2hib2FyZDogZnVuY3Rpb24oZGFzaGJvYXJkKSB7XG5cdFx0XHRyZXR1cm4gekRhc2hib2FyZFJlc291cmNlLmRhc2hib2FyZC51cGRhdGUoeyAnZGFzaGJvYXJkJzogZGFzaGJvYXJkIH0pLiRwcm9taXNlO1xuXHRcdH0sXG5cdFx0ZGVsZXRlRGFzaGJvYXJkOiBmdW5jdGlvbihuYW1lKSB7XG5cdFx0XHRyZXR1cm4gekRhc2hib2FyZFJlc291cmNlLmRhc2hib2FyZC5kZWxldGUoeyAnbmFtZSc6IG5hbWUgfSkuJHByb21pc2U7XG5cdFx0fVxuXHR9O1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
/* jshint camelcase: false, unused: false */
// userEcho global variable
var _ues;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3pGZWVkYmFjay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxJQUFJLEtBQUsiLCJmaWxlIjoic2VydmljZXMvekZlZWRiYWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoganNoaW50IGNhbWVsY2FzZTogZmFsc2UsIHVudXNlZDogZmFsc2UgKi9cbi8vIHVzZXJFY2hvIGdsb2JhbCB2YXJpYWJsZVxudmFyIF91ZXM7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').factory('zIdentity', ['$window', function ($window) {
    var storage = $window.localStorage;
    var cachedJwt;
    var cachedCurrentUser;
    var userJwt = 'userJwt';
    var currentUser = 'currentUser';

    return {
        setJwt: function (jwt, user) {
            cachedJwt = jwt;
            storage.setItem(userJwt, jwt);
            cachedCurrentUser = user;
            storage.setItem(currentUser, JSON.stringify(user));
        },
        
        getJwt: function () {
            if (!cachedJwt) {
                cachedJwt = storage.getItem(userJwt);
            }
            return cachedJwt;
        },
        
        removeJwt: function () {
            cachedJwt = null;
            storage.removeItem(userJwt);
            cachedCurrentUser = null;
            storage.removeItem(currentUser);
        },

        isAuthenticated: function () {
            return !!this.getJwt();
        },

        getCurrentUser: function () {
            if (!cachedCurrentUser) {
                cachedCurrentUser = JSON.parse(storage.getItem(currentUser));
            }
            return cachedCurrentUser;
        },

        setCurrentUser: function (user) {
            //used to store new registration user for confirmation page
            cachedCurrentUser = user;
            storage.setItem(currentUser, JSON.stringify(user));
        },

        isAuthorized: function (roles) {
            var user = this.getCurrentUser();
            if (!user) {
                return false;
            }
            var hasRole = false;
            if (typeof roles === 'string') {
                roles = [roles];
            }
            roles.some(function (role) {
                if (user.roles.indexOf(role) > -1) {
                    hasRole = true;
                    return true;
                }
            });
            return hasRole;
        }
    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3pJZGVudGl0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxRQUFRLHlCQUFhLFVBQVUsU0FBUztJQUMxRCxJQUFJLFVBQVUsUUFBUTtJQUN0QixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUksVUFBVTtJQUNkLElBQUksY0FBYzs7SUFFbEIsT0FBTztRQUNILFFBQVEsVUFBVSxLQUFLLE1BQU07WUFDekIsWUFBWTtZQUNaLFFBQVEsUUFBUSxTQUFTO1lBQ3pCLG9CQUFvQjtZQUNwQixRQUFRLFFBQVEsYUFBYSxLQUFLLFVBQVU7OztRQUdoRCxRQUFRLFlBQVk7WUFDaEIsSUFBSSxDQUFDLFdBQVc7Z0JBQ1osWUFBWSxRQUFRLFFBQVE7O1lBRWhDLE9BQU87OztRQUdYLFdBQVcsWUFBWTtZQUNuQixZQUFZO1lBQ1osUUFBUSxXQUFXO1lBQ25CLG9CQUFvQjtZQUNwQixRQUFRLFdBQVc7OztRQUd2QixpQkFBaUIsWUFBWTtZQUN6QixPQUFPLENBQUMsQ0FBQyxLQUFLOzs7UUFHbEIsZ0JBQWdCLFlBQVk7WUFDeEIsSUFBSSxDQUFDLG1CQUFtQjtnQkFDcEIsb0JBQW9CLEtBQUssTUFBTSxRQUFRLFFBQVE7O1lBRW5ELE9BQU87OztRQUdYLGdCQUFnQixVQUFVLE1BQU07O1lBRTVCLG9CQUFvQjtZQUNwQixRQUFRLFFBQVEsYUFBYSxLQUFLLFVBQVU7OztRQUdoRCxjQUFjLFVBQVUsT0FBTztZQUMzQixJQUFJLE9BQU8sS0FBSztZQUNoQixJQUFJLENBQUMsTUFBTTtnQkFDUCxPQUFPOztZQUVYLElBQUksVUFBVTtZQUNkLElBQUksT0FBTyxVQUFVLFVBQVU7Z0JBQzNCLFFBQVEsQ0FBQzs7WUFFYixNQUFNLEtBQUssVUFBVSxNQUFNO2dCQUN2QixJQUFJLEtBQUssTUFBTSxRQUFRLFFBQVEsQ0FBQyxHQUFHO29CQUMvQixVQUFVO29CQUNWLE9BQU87OztZQUdmLE9BQU87OztJQUdoQiIsImZpbGUiOiJzZXJ2aWNlcy96SWRlbnRpdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuZmFjdG9yeSgneklkZW50aXR5JywgZnVuY3Rpb24gKCR3aW5kb3cpIHtcbiAgICB2YXIgc3RvcmFnZSA9ICR3aW5kb3cubG9jYWxTdG9yYWdlO1xuICAgIHZhciBjYWNoZWRKd3Q7XG4gICAgdmFyIGNhY2hlZEN1cnJlbnRVc2VyO1xuICAgIHZhciB1c2VySnd0ID0gJ3VzZXJKd3QnO1xuICAgIHZhciBjdXJyZW50VXNlciA9ICdjdXJyZW50VXNlcic7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZXRKd3Q6IGZ1bmN0aW9uIChqd3QsIHVzZXIpIHtcbiAgICAgICAgICAgIGNhY2hlZEp3dCA9IGp3dDtcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbSh1c2VySnd0LCBqd3QpO1xuICAgICAgICAgICAgY2FjaGVkQ3VycmVudFVzZXIgPSB1c2VyO1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKGN1cnJlbnRVc2VyLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBnZXRKd3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghY2FjaGVkSnd0KSB7XG4gICAgICAgICAgICAgICAgY2FjaGVkSnd0ID0gc3RvcmFnZS5nZXRJdGVtKHVzZXJKd3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZEp3dDtcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIHJlbW92ZUp3dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2FjaGVkSnd0ID0gbnVsbDtcbiAgICAgICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh1c2VySnd0KTtcbiAgICAgICAgICAgIGNhY2hlZEN1cnJlbnRVc2VyID0gbnVsbDtcbiAgICAgICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbShjdXJyZW50VXNlcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNBdXRoZW50aWNhdGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gISF0aGlzLmdldEp3dCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldEN1cnJlbnRVc2VyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIWNhY2hlZEN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICAgICAgY2FjaGVkQ3VycmVudFVzZXIgPSBKU09OLnBhcnNlKHN0b3JhZ2UuZ2V0SXRlbShjdXJyZW50VXNlcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZEN1cnJlbnRVc2VyO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldEN1cnJlbnRVc2VyOiBmdW5jdGlvbiAodXNlcikge1xuICAgICAgICAgICAgLy91c2VkIHRvIHN0b3JlIG5ldyByZWdpc3RyYXRpb24gdXNlciBmb3IgY29uZmlybWF0aW9uIHBhZ2VcbiAgICAgICAgICAgIGNhY2hlZEN1cnJlbnRVc2VyID0gdXNlcjtcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShjdXJyZW50VXNlciwgSlNPTi5zdHJpbmdpZnkodXNlcikpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzQXV0aG9yaXplZDogZnVuY3Rpb24gKHJvbGVzKSB7XG4gICAgICAgICAgICB2YXIgdXNlciA9IHRoaXMuZ2V0Q3VycmVudFVzZXIoKTtcbiAgICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBoYXNSb2xlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHJvbGVzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJvbGVzID0gW3JvbGVzXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvbGVzLnNvbWUoZnVuY3Rpb24gKHJvbGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodXNlci5yb2xlcy5pbmRleE9mKHJvbGUpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzUm9sZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGhhc1JvbGU7XG4gICAgICAgIH1cbiAgICB9O1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
angular.module('app').value('zToastr', toastr);

angular.module('app').factory('zNotifier', ['zToastr', function(zToastr) {
    return {
        notify: function(msg) {
            zToastr.success(msg);
        },
        error: function(msg) {
            zToastr.error(msg);
        },
        info: function(msg) {
            zToastr.info(msg);
        },
        warning: function(msg) {
            zToastr.warning(msg);
        }
    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3pOb3RpZmllci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxNQUFNLFdBQVc7O0FBRXZDLFFBQVEsT0FBTyxPQUFPLFFBQVEseUJBQWEsU0FBUyxTQUFTO0lBQ3pELE9BQU87UUFDSCxRQUFRLFNBQVMsS0FBSztZQUNsQixRQUFRLFFBQVE7O1FBRXBCLE9BQU8sU0FBUyxLQUFLO1lBQ2pCLFFBQVEsTUFBTTs7UUFFbEIsTUFBTSxTQUFTLEtBQUs7WUFDaEIsUUFBUSxLQUFLOztRQUVqQixTQUFTLFNBQVMsS0FBSztZQUNuQixRQUFRLFFBQVE7OztJQUd6QiIsImZpbGUiOiJzZXJ2aWNlcy96Tm90aWZpZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykudmFsdWUoJ3pUb2FzdHInLCB0b2FzdHIpO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJykuZmFjdG9yeSgnek5vdGlmaWVyJywgZnVuY3Rpb24oelRvYXN0cikge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5vdGlmeTogZnVuY3Rpb24obXNnKSB7XG4gICAgICAgICAgICB6VG9hc3RyLnN1Y2Nlc3MobXNnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKG1zZykge1xuICAgICAgICAgICAgelRvYXN0ci5lcnJvcihtc2cpO1xuICAgICAgICB9LFxuICAgICAgICBpbmZvOiBmdW5jdGlvbihtc2cpIHtcbiAgICAgICAgICAgIHpUb2FzdHIuaW5mbyhtc2cpO1xuICAgICAgICB9LFxuICAgICAgICB3YXJuaW5nOiBmdW5jdGlvbihtc2cpIHtcbiAgICAgICAgICAgIHpUb2FzdHIud2FybmluZyhtc2cpO1xuICAgICAgICB9XG4gICAgfTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').factory('zProfileImgGet', ['zAws', 'zIdentity', '$cacheFactory', function (zAws, zIdentity, $cacheFactory) {

    var cache = $cacheFactory('zProfileImgGet', {
        number: 200
    });

    function getPic(item, options, done) {
        if (!item || !item._id) {
            return done(new Error('No _id'));
        }
        if (item.pic !== 's3') {
            return done(new Error('No s3'));
        }

        options.type = options.type || 'client';
        options.size = options.size || 'large';

        var key = zIdentity.getCurrentUser().currentSite + '/' + options.type + 's/pics/' + item._id + options.size + '.jpg';
        var value = cache.get(key);
        if (options.noCache || _.isUndefined(value)) {
            zAws.aws()
                .then(function (aws) {
                    var params = {};
                    params.Key = key;
                    if (options.noCache) {
                        params.ResponseCacheControl = 'max-age=1'; //force reload from s3
                    }
                    var bucket = new aws.S3({
                        params: {
                            Bucket: zAws.config.s3.bucket
                        }
                    });
                    bucket.getObject(params, function (err, s3object) {
                        if (err) {
                            return done(err);
                        }
                        var reader = new FileReader();
                        reader.onloadend = function () {
                            cache.put(params.Key, reader.result);
                            return done(null, reader.result);
                        };
                        var blob = new Blob([s3object.Body], {
                            type: s3object.ContentType
                        });
                        reader.readAsDataURL(blob);
                    });
                })
                .catch(function(err) {
                    done(new Error('Can\'t get file credentials: ' + err));
                });
        } else {
            return done(null, value);
        }
    }
    
    function getPicElement(item, options, done) {
        var clazz = options.cssClass;
        getPic(item, options, function (err, dataURI) {
            if (err || !dataURI) {
                return done('<img src="/images/man64.png" class="' + clazz + '" />');
            }
            if (dataURI) {
                return done('<img src="' + dataURI + '" class="' + clazz + '" />');
            }
        });
    }
    
    return {
        getPic: getPic,
        getPicElement: getPicElement
    };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3pQcm9maWxlSW1nR2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQVEsT0FBTyxPQUFPLFFBQVEseURBQWtCLFVBQVUsTUFBTSxXQUFXLGVBQWU7O0lBRXRGLElBQUksUUFBUSxjQUFjLGtCQUFrQjtRQUN4QyxRQUFROzs7SUFHWixTQUFTLE9BQU8sTUFBTSxTQUFTLE1BQU07UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUs7WUFDcEIsT0FBTyxLQUFLLElBQUksTUFBTTs7UUFFMUIsSUFBSSxLQUFLLFFBQVEsTUFBTTtZQUNuQixPQUFPLEtBQUssSUFBSSxNQUFNOzs7UUFHMUIsUUFBUSxPQUFPLFFBQVEsUUFBUTtRQUMvQixRQUFRLE9BQU8sUUFBUSxRQUFROztRQUUvQixJQUFJLE1BQU0sVUFBVSxpQkFBaUIsY0FBYyxNQUFNLFFBQVEsT0FBTyxZQUFZLEtBQUssTUFBTSxRQUFRLE9BQU87UUFDOUcsSUFBSSxRQUFRLE1BQU0sSUFBSTtRQUN0QixJQUFJLFFBQVEsV0FBVyxFQUFFLFlBQVksUUFBUTtZQUN6QyxLQUFLO2lCQUNBLEtBQUssVUFBVSxLQUFLO29CQUNqQixJQUFJLFNBQVM7b0JBQ2IsT0FBTyxNQUFNO29CQUNiLElBQUksUUFBUSxTQUFTO3dCQUNqQixPQUFPLHVCQUF1Qjs7b0JBRWxDLElBQUksU0FBUyxJQUFJLElBQUksR0FBRzt3QkFDcEIsUUFBUTs0QkFDSixRQUFRLEtBQUssT0FBTyxHQUFHOzs7b0JBRy9CLE9BQU8sVUFBVSxRQUFRLFVBQVUsS0FBSyxVQUFVO3dCQUM5QyxJQUFJLEtBQUs7NEJBQ0wsT0FBTyxLQUFLOzt3QkFFaEIsSUFBSSxTQUFTLElBQUk7d0JBQ2pCLE9BQU8sWUFBWSxZQUFZOzRCQUMzQixNQUFNLElBQUksT0FBTyxLQUFLLE9BQU87NEJBQzdCLE9BQU8sS0FBSyxNQUFNLE9BQU87O3dCQUU3QixJQUFJLE9BQU8sSUFBSSxLQUFLLENBQUMsU0FBUyxPQUFPOzRCQUNqQyxNQUFNLFNBQVM7O3dCQUVuQixPQUFPLGNBQWM7OztpQkFHNUIsTUFBTSxTQUFTLEtBQUs7b0JBQ2pCLEtBQUssSUFBSSxNQUFNLGtDQUFrQzs7ZUFFdEQ7WUFDSCxPQUFPLEtBQUssTUFBTTs7OztJQUkxQixTQUFTLGNBQWMsTUFBTSxTQUFTLE1BQU07UUFDeEMsSUFBSSxRQUFRLFFBQVE7UUFDcEIsT0FBTyxNQUFNLFNBQVMsVUFBVSxLQUFLLFNBQVM7WUFDMUMsSUFBSSxPQUFPLENBQUMsU0FBUztnQkFDakIsT0FBTyxLQUFLLHlDQUF5QyxRQUFROztZQUVqRSxJQUFJLFNBQVM7Z0JBQ1QsT0FBTyxLQUFLLGVBQWUsVUFBVSxjQUFjLFFBQVE7Ozs7O0lBS3ZFLE9BQU87UUFDSCxRQUFRO1FBQ1IsZUFBZTs7SUFFcEIiLCJmaWxlIjoic2VydmljZXMvelByb2ZpbGVJbWdHZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuZmFjdG9yeSgnelByb2ZpbGVJbWdHZXQnLCBmdW5jdGlvbiAoekF3cywgeklkZW50aXR5LCAkY2FjaGVGYWN0b3J5KSB7XG5cbiAgICB2YXIgY2FjaGUgPSAkY2FjaGVGYWN0b3J5KCd6UHJvZmlsZUltZ0dldCcsIHtcbiAgICAgICAgbnVtYmVyOiAyMDBcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGdldFBpYyhpdGVtLCBvcHRpb25zLCBkb25lKSB7XG4gICAgICAgIGlmICghaXRlbSB8fCAhaXRlbS5faWQpIHtcbiAgICAgICAgICAgIHJldHVybiBkb25lKG5ldyBFcnJvcignTm8gX2lkJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtLnBpYyAhPT0gJ3MzJykge1xuICAgICAgICAgICAgcmV0dXJuIGRvbmUobmV3IEVycm9yKCdObyBzMycpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMudHlwZSA9IG9wdGlvbnMudHlwZSB8fCAnY2xpZW50JztcbiAgICAgICAgb3B0aW9ucy5zaXplID0gb3B0aW9ucy5zaXplIHx8ICdsYXJnZSc7XG5cbiAgICAgICAgdmFyIGtleSA9IHpJZGVudGl0eS5nZXRDdXJyZW50VXNlcigpLmN1cnJlbnRTaXRlICsgJy8nICsgb3B0aW9ucy50eXBlICsgJ3MvcGljcy8nICsgaXRlbS5faWQgKyBvcHRpb25zLnNpemUgKyAnLmpwZyc7XG4gICAgICAgIHZhciB2YWx1ZSA9IGNhY2hlLmdldChrZXkpO1xuICAgICAgICBpZiAob3B0aW9ucy5ub0NhY2hlIHx8IF8uaXNVbmRlZmluZWQodmFsdWUpKSB7XG4gICAgICAgICAgICB6QXdzLmF3cygpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGF3cykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0ge307XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5LZXkgPSBrZXk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm5vQ2FjaGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5SZXNwb25zZUNhY2hlQ29udHJvbCA9ICdtYXgtYWdlPTEnOyAvL2ZvcmNlIHJlbG9hZCBmcm9tIHMzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1Y2tldCA9IG5ldyBhd3MuUzMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQnVja2V0OiB6QXdzLmNvbmZpZy5zMy5idWNrZXRcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJ1Y2tldC5nZXRPYmplY3QocGFyYW1zLCBmdW5jdGlvbiAoZXJyLCBzM29iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGUucHV0KHBhcmFtcy5LZXksIHJlYWRlci5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIHJlYWRlci5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBibG9iID0gbmV3IEJsb2IoW3Mzb2JqZWN0LkJvZHldLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogczNvYmplY3QuQ29udGVudFR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBkb25lKG5ldyBFcnJvcignQ2FuXFwndCBnZXQgZmlsZSBjcmVkZW50aWFsczogJyArIGVycikpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGdldFBpY0VsZW1lbnQoaXRlbSwgb3B0aW9ucywgZG9uZSkge1xuICAgICAgICB2YXIgY2xhenogPSBvcHRpb25zLmNzc0NsYXNzO1xuICAgICAgICBnZXRQaWMoaXRlbSwgb3B0aW9ucywgZnVuY3Rpb24gKGVyciwgZGF0YVVSSSkge1xuICAgICAgICAgICAgaWYgKGVyciB8fCAhZGF0YVVSSSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkb25lKCc8aW1nIHNyYz1cIi9pbWFnZXMvbWFuNjQucG5nXCIgY2xhc3M9XCInICsgY2xhenogKyAnXCIgLz4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhVVJJKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoJzxpbWcgc3JjPVwiJyArIGRhdGFVUkkgKyAnXCIgY2xhc3M9XCInICsgY2xhenogKyAnXCIgLz4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIGdldFBpYzogZ2V0UGljLFxuICAgICAgICBnZXRQaWNFbGVtZW50OiBnZXRQaWNFbGVtZW50XG4gICAgfTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').factory('zSettings', function() {
    var appointmentBook;
    
    return {
        appointmentBook: appointmentBook
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3pTZXR0aW5ncy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxRQUFRLGFBQWEsV0FBVztJQUNsRCxJQUFJOztJQUVKLE9BQU87UUFDSCxpQkFBaUI7O0dBRXRCIiwiZmlsZSI6InNlcnZpY2VzL3pTZXR0aW5ncy5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5mYWN0b3J5KCd6U2V0dGluZ3MnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXBwb2ludG1lbnRCb29rO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIGFwcG9pbnRtZW50Qm9vazogYXBwb2ludG1lbnRCb29rXG4gICAgfTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').factory('zTheme', ['$window', function ($window) {
		
	var theme;

	var THEMES = [
		{
			'name': 'default',
			'cssMin': '/css/bootswatch/default.min.css'
		},
		{
			'name': 'cerulean',
			'cssMin': '/css/bootswatch/cerulean.min.css',
		},
		{
			'name': 'cosmo',
			'cssMin': '/css/bootswatch/cosmo.min.css',
		},
		{
			'name': 'cyborg',
			'cssMin': '/css/bootswatch/cyborg.min.css',
		},
		{
			'name': 'darkly',
			'cssMin': '/css/bootswatch/darkly.min.css',
		},
		{
			'name': 'flatly',
			'cssMin': '/css/bootswatch/flatly.min.css',
		},
		{
			'name': 'journal',
			'cssMin': '/css/bootswatch/journal.min.css',
		},
		{
			'name': 'lumen',
			'cssMin': '/css/bootswatch/lumen.min.css',
		},
		{
			'name': 'paper',
			'cssMin': '/css/bootswatch/paper.min.css',
		},
		{
			'name': 'readable',
			'cssMin': '/css/bootswatch/readable.min.css',
		},
		{
			'name': 'sandstone',
			'cssMin': '/css/bootswatch/sandstone.min.css',
		},
		{
			'name': 'simplex',
			'cssMin': '/css/bootswatch/simplex.min.css',
		},
		{
			'name': 'slate',
			'cssMin': '/css/bootswatch/slate.min.css',
		},
		{
			'name': 'spacelab',
			'cssMin': '/css/bootswatch/spacelab.min.css',
		},
		{
			'name': 'superhero',
			'cssMin': '/css/bootswatch/superhero.min.css',
		},
		{
			'name': 'united',
			'cssMin': '/css/bootswatch/united.min.css',
		},
		{
			'name': 'yeti',
			'cssMin': '/css/bootswatch/yeti.min.css',
		}
	];

	return {
		setCurrentTheme: function(zTheme) {
			theme = zTheme;
			$window.localStorage.setItem('theme', zTheme.name);
		},
		getCurrentTheme: function() {
			return theme;
		},
		getThemes: function() {
			return THEMES;
		}
	};
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3pUaGVtZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxRQUFRLHNCQUFVLFVBQVUsU0FBUzs7Q0FFMUQsSUFBSTs7Q0FFSixJQUFJLFNBQVM7RUFDWjtHQUNDLFFBQVE7R0FDUixVQUFVOztFQUVYO0dBQ0MsUUFBUTtHQUNSLFVBQVU7O0VBRVg7R0FDQyxRQUFRO0dBQ1IsVUFBVTs7RUFFWDtHQUNDLFFBQVE7R0FDUixVQUFVOztFQUVYO0dBQ0MsUUFBUTtHQUNSLFVBQVU7O0VBRVg7R0FDQyxRQUFRO0dBQ1IsVUFBVTs7RUFFWDtHQUNDLFFBQVE7R0FDUixVQUFVOztFQUVYO0dBQ0MsUUFBUTtHQUNSLFVBQVU7O0VBRVg7R0FDQyxRQUFRO0dBQ1IsVUFBVTs7RUFFWDtHQUNDLFFBQVE7R0FDUixVQUFVOztFQUVYO0dBQ0MsUUFBUTtHQUNSLFVBQVU7O0VBRVg7R0FDQyxRQUFRO0dBQ1IsVUFBVTs7RUFFWDtHQUNDLFFBQVE7R0FDUixVQUFVOztFQUVYO0dBQ0MsUUFBUTtHQUNSLFVBQVU7O0VBRVg7R0FDQyxRQUFRO0dBQ1IsVUFBVTs7RUFFWDtHQUNDLFFBQVE7R0FDUixVQUFVOztFQUVYO0dBQ0MsUUFBUTtHQUNSLFVBQVU7Ozs7Q0FJWixPQUFPO0VBQ04saUJBQWlCLFNBQVMsUUFBUTtHQUNqQyxRQUFRO0dBQ1IsUUFBUSxhQUFhLFFBQVEsU0FBUyxPQUFPOztFQUU5QyxpQkFBaUIsV0FBVztHQUMzQixPQUFPOztFQUVSLFdBQVcsV0FBVztHQUNyQixPQUFPOzs7SUFHUCIsImZpbGUiOiJzZXJ2aWNlcy96VGhlbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJykuZmFjdG9yeSgnelRoZW1lJywgZnVuY3Rpb24gKCR3aW5kb3cpIHtcblx0XHRcblx0dmFyIHRoZW1lO1xuXG5cdHZhciBUSEVNRVMgPSBbXG5cdFx0e1xuXHRcdFx0J25hbWUnOiAnZGVmYXVsdCcsXG5cdFx0XHQnY3NzTWluJzogJy9jc3MvYm9vdHN3YXRjaC9kZWZhdWx0Lm1pbi5jc3MnXG5cdFx0fSxcblx0XHR7XG5cdFx0XHQnbmFtZSc6ICdjZXJ1bGVhbicsXG5cdFx0XHQnY3NzTWluJzogJy9jc3MvYm9vdHN3YXRjaC9jZXJ1bGVhbi5taW4uY3NzJyxcblx0XHR9LFxuXHRcdHtcblx0XHRcdCduYW1lJzogJ2Nvc21vJyxcblx0XHRcdCdjc3NNaW4nOiAnL2Nzcy9ib290c3dhdGNoL2Nvc21vLm1pbi5jc3MnLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0J25hbWUnOiAnY3lib3JnJyxcblx0XHRcdCdjc3NNaW4nOiAnL2Nzcy9ib290c3dhdGNoL2N5Ym9yZy5taW4uY3NzJyxcblx0XHR9LFxuXHRcdHtcblx0XHRcdCduYW1lJzogJ2RhcmtseScsXG5cdFx0XHQnY3NzTWluJzogJy9jc3MvYm9vdHN3YXRjaC9kYXJrbHkubWluLmNzcycsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHQnbmFtZSc6ICdmbGF0bHknLFxuXHRcdFx0J2Nzc01pbic6ICcvY3NzL2Jvb3Rzd2F0Y2gvZmxhdGx5Lm1pbi5jc3MnLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0J25hbWUnOiAnam91cm5hbCcsXG5cdFx0XHQnY3NzTWluJzogJy9jc3MvYm9vdHN3YXRjaC9qb3VybmFsLm1pbi5jc3MnLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0J25hbWUnOiAnbHVtZW4nLFxuXHRcdFx0J2Nzc01pbic6ICcvY3NzL2Jvb3Rzd2F0Y2gvbHVtZW4ubWluLmNzcycsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHQnbmFtZSc6ICdwYXBlcicsXG5cdFx0XHQnY3NzTWluJzogJy9jc3MvYm9vdHN3YXRjaC9wYXBlci5taW4uY3NzJyxcblx0XHR9LFxuXHRcdHtcblx0XHRcdCduYW1lJzogJ3JlYWRhYmxlJyxcblx0XHRcdCdjc3NNaW4nOiAnL2Nzcy9ib290c3dhdGNoL3JlYWRhYmxlLm1pbi5jc3MnLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0J25hbWUnOiAnc2FuZHN0b25lJyxcblx0XHRcdCdjc3NNaW4nOiAnL2Nzcy9ib290c3dhdGNoL3NhbmRzdG9uZS5taW4uY3NzJyxcblx0XHR9LFxuXHRcdHtcblx0XHRcdCduYW1lJzogJ3NpbXBsZXgnLFxuXHRcdFx0J2Nzc01pbic6ICcvY3NzL2Jvb3Rzd2F0Y2gvc2ltcGxleC5taW4uY3NzJyxcblx0XHR9LFxuXHRcdHtcblx0XHRcdCduYW1lJzogJ3NsYXRlJyxcblx0XHRcdCdjc3NNaW4nOiAnL2Nzcy9ib290c3dhdGNoL3NsYXRlLm1pbi5jc3MnLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0J25hbWUnOiAnc3BhY2VsYWInLFxuXHRcdFx0J2Nzc01pbic6ICcvY3NzL2Jvb3Rzd2F0Y2gvc3BhY2VsYWIubWluLmNzcycsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHQnbmFtZSc6ICdzdXBlcmhlcm8nLFxuXHRcdFx0J2Nzc01pbic6ICcvY3NzL2Jvb3Rzd2F0Y2gvc3VwZXJoZXJvLm1pbi5jc3MnLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0J25hbWUnOiAndW5pdGVkJyxcblx0XHRcdCdjc3NNaW4nOiAnL2Nzcy9ib290c3dhdGNoL3VuaXRlZC5taW4uY3NzJyxcblx0XHR9LFxuXHRcdHtcblx0XHRcdCduYW1lJzogJ3lldGknLFxuXHRcdFx0J2Nzc01pbic6ICcvY3NzL2Jvb3Rzd2F0Y2gveWV0aS5taW4uY3NzJyxcblx0XHR9XG5cdF07XG5cblx0cmV0dXJuIHtcblx0XHRzZXRDdXJyZW50VGhlbWU6IGZ1bmN0aW9uKHpUaGVtZSkge1xuXHRcdFx0dGhlbWUgPSB6VGhlbWU7XG5cdFx0XHQkd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0aGVtZScsIHpUaGVtZS5uYW1lKTtcblx0XHR9LFxuXHRcdGdldEN1cnJlbnRUaGVtZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhlbWU7XG5cdFx0fSxcblx0XHRnZXRUaGVtZXM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIFRIRU1FUztcblx0XHR9XG5cdH07XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
angular.module('app').factory('zUserEchoService', ['zUserEcho', function(zUserEcho) {
	
	return {

		getToken: function() {
			return zUserEcho.get().$promise;
		},
		getAccessToken: function() {
			return zUserEcho.get().$promise;
		},
		/* jshint ignore:start */
		generateFeedback: function(sso_token) {
			_ues = {
				host:'zurili.userecho.com',
				forum:'36250',
				lang:'en',
				tab_corner_radius:5,
				tab_font_size:20,
				tab_image_hash:'ZmVlZGJhY2s%3D',
				tab_chat_hash:'Y2hhdA%3D%3D',
				tab_alignment:'bottom',
				tab_text_color:'#ffffff',
				tab_text_shadow_color:'#00000055',
				tab_bg_color:'#57a957',
				tab_hover_color:'#eea32d',
				params: {
					sso_token: ''
				}
			};
			if(sso_token) {
				_ues.params.sso_token = sso_token;
			}

			(function() {
				var _ue = document.createElement('script'); 
				_ue.type = 'text/javascript'; 
				_ue.async = true;
				_ue.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'cdn.userecho.com/js/widget-1.4.gz.js';

				var s = document.getElementsByTagName('script')[0]; 
				s.parentNode.insertBefore(_ue, s);
			})();
		}
		/* jshint ignore:end */
	};
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3pVc2VyRWNoby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLE9BQU8sT0FBTyxRQUFRLGtDQUFvQixTQUFTLFdBQVc7O0NBRXJFLE9BQU87O0VBRU4sVUFBVSxXQUFXO0dBQ3BCLE9BQU8sVUFBVSxNQUFNOztFQUV4QixnQkFBZ0IsV0FBVztHQUMxQixPQUFPLFVBQVUsTUFBTTs7O0VBR3hCLGtCQUFrQixTQUFTLFdBQVc7R0FDckMsT0FBTztJQUNOLEtBQUs7SUFDTCxNQUFNO0lBQ04sS0FBSztJQUNMLGtCQUFrQjtJQUNsQixjQUFjO0lBQ2QsZUFBZTtJQUNmLGNBQWM7SUFDZCxjQUFjO0lBQ2QsZUFBZTtJQUNmLHNCQUFzQjtJQUN0QixhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLFFBQVE7S0FDUCxXQUFXOzs7R0FHYixHQUFHLFdBQVc7SUFDYixLQUFLLE9BQU8sWUFBWTs7O0dBR3pCLENBQUMsV0FBVztJQUNYLElBQUksTUFBTSxTQUFTLGNBQWM7SUFDakMsSUFBSSxPQUFPO0lBQ1gsSUFBSSxRQUFRO0lBQ1osSUFBSSxNQUFNLENBQUMsYUFBYSxTQUFTLFNBQVMsV0FBVyxhQUFhLGFBQWE7O0lBRS9FLElBQUksSUFBSSxTQUFTLHFCQUFxQixVQUFVO0lBQ2hELEVBQUUsV0FBVyxhQUFhLEtBQUs7Ozs7O0lBS2hDIiwiZmlsZSI6InNlcnZpY2VzL3pVc2VyRWNoby5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5mYWN0b3J5KCd6VXNlckVjaG9TZXJ2aWNlJywgZnVuY3Rpb24oelVzZXJFY2hvKSB7XG5cdFxuXHRyZXR1cm4ge1xuXG5cdFx0Z2V0VG9rZW46IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHpVc2VyRWNoby5nZXQoKS4kcHJvbWlzZTtcblx0XHR9LFxuXHRcdGdldEFjY2Vzc1Rva2VuOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB6VXNlckVjaG8uZ2V0KCkuJHByb21pc2U7XG5cdFx0fSxcblx0XHQvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cdFx0Z2VuZXJhdGVGZWVkYmFjazogZnVuY3Rpb24oc3NvX3Rva2VuKSB7XG5cdFx0XHRfdWVzID0ge1xuXHRcdFx0XHRob3N0Oid6dXJpbGkudXNlcmVjaG8uY29tJyxcblx0XHRcdFx0Zm9ydW06JzM2MjUwJyxcblx0XHRcdFx0bGFuZzonZW4nLFxuXHRcdFx0XHR0YWJfY29ybmVyX3JhZGl1czo1LFxuXHRcdFx0XHR0YWJfZm9udF9zaXplOjIwLFxuXHRcdFx0XHR0YWJfaW1hZ2VfaGFzaDonWm1WbFpHSmhZMnMlM0QnLFxuXHRcdFx0XHR0YWJfY2hhdF9oYXNoOidZMmhoZEElM0QlM0QnLFxuXHRcdFx0XHR0YWJfYWxpZ25tZW50Oidib3R0b20nLFxuXHRcdFx0XHR0YWJfdGV4dF9jb2xvcjonI2ZmZmZmZicsXG5cdFx0XHRcdHRhYl90ZXh0X3NoYWRvd19jb2xvcjonIzAwMDAwMDU1Jyxcblx0XHRcdFx0dGFiX2JnX2NvbG9yOicjNTdhOTU3Jyxcblx0XHRcdFx0dGFiX2hvdmVyX2NvbG9yOicjZWVhMzJkJyxcblx0XHRcdFx0cGFyYW1zOiB7XG5cdFx0XHRcdFx0c3NvX3Rva2VuOiAnJ1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0aWYoc3NvX3Rva2VuKSB7XG5cdFx0XHRcdF91ZXMucGFyYW1zLnNzb190b2tlbiA9IHNzb190b2tlbjtcblx0XHRcdH1cblxuXHRcdFx0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgX3VlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7IFxuXHRcdFx0XHRfdWUudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnOyBcblx0XHRcdFx0X3VlLmFzeW5jID0gdHJ1ZTtcblx0XHRcdFx0X3VlLnNyYyA9ICgnaHR0cHM6JyA9PT0gZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgPyAnaHR0cHM6Ly8nIDogJ2h0dHA6Ly8nKSArICdjZG4udXNlcmVjaG8uY29tL2pzL3dpZGdldC0xLjQuZ3ouanMnO1xuXG5cdFx0XHRcdHZhciBzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdOyBcblx0XHRcdFx0cy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShfdWUsIHMpO1xuXHRcdFx0fSkoKTtcblx0XHR9XG5cdFx0LyoganNoaW50IGlnbm9yZTplbmQgKi9cblx0fTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
angular.module('app').factory('zCommonUtil', function () {
    return {
        randomPw: function() {
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            
            for (var i = 0; i < 30; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        },
        
        dataURItoBlob: function(dataURI) {
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0) {
                byteString = atob(dataURI.split(',')[1]);
            } else {
                byteString = encodeURIComponent(dataURI.split(',')[1]);
            }
        
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
        
            return new Blob([ia], {type:mimeString});
        },
        
        getEmailRegex: function() {
            return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        },
        
        isValidEmail: function(email) {
            return this.getEmailRegex().test(email);
        },
        
        getErrorMessage: function(err) {
            if (err) {
                if (err.reason) {
                    return err.reason;
                } else if (err.message) {
                    return err.message;
                }
            }
            return '';
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwvekNvbW1vblV0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxPQUFPLE9BQU8sUUFBUSxlQUFlLFlBQVk7SUFDckQsT0FBTztRQUNILFVBQVUsV0FBVztZQUNqQixJQUFJLE9BQU87WUFDWCxJQUFJLFdBQVc7O1lBRWYsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksS0FBSztnQkFDekIsUUFBUSxTQUFTLE9BQU8sS0FBSyxNQUFNLEtBQUssV0FBVyxTQUFTOztZQUVoRSxPQUFPOzs7UUFHWCxlQUFlLFNBQVMsU0FBUztZQUM3QixJQUFJO1lBQ0osSUFBSSxRQUFRLE1BQU0sS0FBSyxHQUFHLFFBQVEsYUFBYSxHQUFHO2dCQUM5QyxhQUFhLEtBQUssUUFBUSxNQUFNLEtBQUs7bUJBQ2xDO2dCQUNILGFBQWEsbUJBQW1CLFFBQVEsTUFBTSxLQUFLOzs7WUFHdkQsSUFBSSxhQUFhLFFBQVEsTUFBTSxLQUFLLEdBQUcsTUFBTSxLQUFLLEdBQUcsTUFBTSxLQUFLOztZQUVoRSxJQUFJLEtBQUssSUFBSSxXQUFXLFdBQVc7WUFDbkMsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLFdBQVcsUUFBUSxLQUFLO2dCQUN4QyxHQUFHLEtBQUssV0FBVyxXQUFXOzs7WUFHbEMsT0FBTyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSzs7O1FBR2hDLGVBQWUsV0FBVztZQUN0QixPQUFPOzs7UUFHWCxjQUFjLFNBQVMsT0FBTztZQUMxQixPQUFPLEtBQUssZ0JBQWdCLEtBQUs7OztRQUdyQyxpQkFBaUIsU0FBUyxLQUFLO1lBQzNCLElBQUksS0FBSztnQkFDTCxJQUFJLElBQUksUUFBUTtvQkFDWixPQUFPLElBQUk7dUJBQ1IsSUFBSSxJQUFJLFNBQVM7b0JBQ3BCLE9BQU8sSUFBSTs7O1lBR25CLE9BQU87OztHQUdoQiIsImZpbGUiOiJ1dGlsL3pDb21tb25VdGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ3pDb21tb25VdGlsJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJhbmRvbVB3OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gJyc7XG4gICAgICAgICAgICB2YXIgcG9zc2libGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDMwOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0ZXh0ICs9IHBvc3NpYmxlLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZS5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgZGF0YVVSSXRvQmxvYjogZnVuY3Rpb24oZGF0YVVSSSkge1xuICAgICAgICAgICAgdmFyIGJ5dGVTdHJpbmc7XG4gICAgICAgICAgICBpZiAoZGF0YVVSSS5zcGxpdCgnLCcpWzBdLmluZGV4T2YoJ2Jhc2U2NCcpID49IDApIHtcbiAgICAgICAgICAgICAgICBieXRlU3RyaW5nID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBieXRlU3RyaW5nID0gZW5jb2RlVVJJQ29tcG9uZW50KGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgdmFyIG1pbWVTdHJpbmcgPSBkYXRhVVJJLnNwbGl0KCcsJylbMF0uc3BsaXQoJzonKVsxXS5zcGxpdCgnOycpWzBdO1xuICAgICAgICBcbiAgICAgICAgICAgIHZhciBpYSA9IG5ldyBVaW50OEFycmF5KGJ5dGVTdHJpbmcubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZVN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBuZXcgQmxvYihbaWFdLCB7dHlwZTptaW1lU3RyaW5nfSk7XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBnZXRFbWFpbFJlZ2V4OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAvXihbXFx3LV0rKD86XFwuW1xcdy1dKykqKUAoKD86W1xcdy1dK1xcLikqXFx3W1xcdy1dezAsNjZ9KVxcLihbYS16XXsyLDZ9KD86XFwuW2Etel17Mn0pPykkL2k7XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBpc1ZhbGlkRW1haWw6IGZ1bmN0aW9uKGVtYWlsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRFbWFpbFJlZ2V4KCkudGVzdChlbWFpbCk7XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBnZXRFcnJvck1lc3NhZ2U6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIucmVhc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlcnIucmVhc29uO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVyci5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgIH07XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=