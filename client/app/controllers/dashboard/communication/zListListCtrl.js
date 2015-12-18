/// <reference path="../../../../../typings/angularjs/angular.d.ts"/>
angular.module('app').controller('zListListCtrl', function($scope) {
    $scope.lists=[{
        id: '123456',
        created: new Date('2001-01-01'),
        lastUsed: new Date('2001-01-01'),
        type: 'Client',
        description: 'Sian\'s active patients SMS'
    }];
});