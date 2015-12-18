/// <reference path="../../../../../typings/angularjs/angular.d.ts"/>
angular.module('app').controller('zTemplateListCtrl', function($scope) {
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
});