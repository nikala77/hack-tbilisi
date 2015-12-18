angular.module('app').controller('zEventEditUserMessageCtrl', function($scope) {

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



});