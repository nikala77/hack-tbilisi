angular.module('app').factory('zDashboard', function ($window, zDashboardResource, zIdentity, zTheme) {
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
});