angular.module('app').controller('zEventDetailCtrl', function($scope) {
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
});