/// <reference path="../../../../../typings/angularjs/angular.d.ts"/>
angular.module('app').controller('zEventListCtrl', function($scope) {
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
    
});