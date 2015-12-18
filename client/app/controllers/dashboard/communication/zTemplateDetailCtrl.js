/// <reference path="../../../../../typings/angularjs/angular.d.ts"/>
angular.module('app').controller('zTemplateDetailCtrl', function($scope) {
    $scope.template={
        id:123456,
        created: new Date('2015/1/3'),
        lastUsed: new Date('2015/3/12'),
        templateType: 'SMS',
        description: 'Appointment reminder',
        subject: 'Test subject',
        body: 'Reminder from {siteName}. Your {appointmentType} is {friendlyTimespan} at {startTime}. Text "yes" to confirm. Call to reschedule.',
        attachment: ''
    };
});