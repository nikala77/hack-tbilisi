angular.module('app').controller('zAccountsCtrl', function($scope) {
    /* jshint maxlen: 160 */
    $scope.appointments = [
        {clientName: 'Fiona Sawyer', appointmentName: 'Adjustment', appointmentDate: new Date('2014-06-28 10:00'), duration: 5, doctorName: 'Dr Richard'},
        {clientName: 'Xavier Sawyer', appointmentName: 'Adjustment', appointmentDate: new Date('2014-06-28 10:10'), duration: 5, doctorName: 'Dr Richard'},
        {clientName: 'Max Sawyer', appointmentName: 'Adjustment', appointmentDate: new Date('2014-06-28 10:20'), duration: 5, doctorName: 'Dr Richard'},
        {clientName: 'Oscar Sawyer', appointmentName: 'Adjustment', appointmentDate: new Date('2014-06-28 10:30'), duration: 5, doctorName: 'Dr Richard'}
    ];
});