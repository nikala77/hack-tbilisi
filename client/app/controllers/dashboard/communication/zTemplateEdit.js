/// <reference path="../../../../../typings/angularjs/angular.d.ts"/>
angular.module('app').controller('zTemplateEditCtrl', function($scope, $sce) {
    $scope.template = {
        id: 123456,
        created: new Date('2015/1/3'),
        lastUsed: new Date('2015/3/12'),
        templateType: 'SMS',
        description: 'Appointment reminder',
        subject: 'Email for client.firstName',
        body: 'Reminder from site.name. ' +
            'Your appointment.type is appointment.friendlyTimespan at appointment.start. Text "yes" to confirm. ' +
            'Call to reschedule.',
        attachment: ''
    };

    $scope.templateType = {};
    $scope.templateTypes = [{
        name: 'SMS'
    }, {
        name: 'Email'
    }];

    $scope.smsCount = function() {
        if ($scope.template.body.length === 0) {
            return 0;
        }
        var count = Math.floor($scope.template.body.length / 159) + 1;
        return count;
    };


    $scope.trustAsHtml = function(value) {
        return $sce.trustAsHtml(value);
    };

    $scope.areaConfig = {
        autocomplete: [{
            words: [
                'site.name',
                'client.title',
                'client.knownAs',
                'client.firstName',
                'client.lastName',
                'client.dob',
                'client.address',
                'client.email',
                'client.mobile',
                'client.phone',
                'client.occupation',
                'client.hobbies'
            ],
            cssClass: 'text-success font-italic',
            autocompleteOnSpace: false
        }, {
            words: [
                'site.name'
            ],
            cssClass: 'text-danger font-italic',
            autocompleteOnSpace: false
        }, {
            words: [
                'appointment.type',
                'appointment.resources',
                'appointment.status',
                'appointment.start',
                'appointment.friendlyTimespan',
                'appointment.duration'
            ],
            cssClass: 'text-warning font-italic',
            autocompleteOnSpace: false
        }]
    };
});