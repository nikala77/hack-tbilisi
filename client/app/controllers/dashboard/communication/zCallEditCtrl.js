angular.module('app').controller('zCallEditCtrl', function($scope) {
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
});