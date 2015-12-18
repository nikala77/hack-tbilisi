/// <reference path="../../typings/angularjs/angular.d.ts"/>
angular.module('app', [
    'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.calendar',
    'angularSpectrumColorpicker', 'ui.select', 'ngImgCrop', 'ngFileUpload', 'ngAutocomplete',
    'monospaced.elastic', 'smartArea', 'angular-sortable-view', 'angular-jwt'
]);

angular.module('app').config(function ($routeProvider, $locationProvider, $httpProvider, $provide, uiSelectConfig) {
    Raygun.init('oiIY1Dn+9RrZk8tOk3Jahw=='); // TODO: implement a new way to get ApiKey
    $.cookie.json = true;
    
    $provide.decorator('$exceptionHandler', function($delegate) {
        return function(err, cause) {
            console.log('[App unhandled error]', err, cause);
            Raygun.send(err);
            $delegate(err, cause);
        };
    });
    
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
});

angular.module('app').run(function ($rootScope, $location, zNotifier) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized' || rejection === 'not authenticated') {
            zNotifier.info('You need to login');
            var redirectPath = encodeURIComponent($location.path());
            $location.path('/login').search({
                redirect: redirectPath
            });
        }
    });
});
