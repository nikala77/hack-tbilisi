angular.module('app').controller('zDashboardCtrl', function($scope, $window, zResource, zDashboard, zIdentity, zTheme, zNotifier) {
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

});