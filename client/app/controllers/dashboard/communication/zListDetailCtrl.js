angular.module('app').controller('zListDetailCtrl', function($scope) {
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
});