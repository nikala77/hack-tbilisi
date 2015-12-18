angular.module('app').controller('zEventEditCtrl', function($scope) {
    $scope.event = {
        Id: 123456,
        eventDate: new Date('2014/06/28 10:00'),
        eventType: 'Admin note',
        eventStatus: 'Unread',
        eventSummary: '',
        clientId: 987654,
        clientName: 'Fiona Sawyer',
        createdById: '123456',
        createdByName: 'Dr Richard',
        relatedToSps: ['123456'],
        subject:'',
        body:''
    };

    // $scope.$watch('files', function () {
 //        $scope.upload($scope.files);
 //    });

 //    $scope.upload = function (files) {
 //        if (files && files.length) {
 //            for (var i = 0; i < files.length; i++) {
 //                var file = files[i];
 //                Upload.upload({
 //                    url: 'upload/url',
 //                    fields: {'username': $scope.username},
 //                    file: file
 //                }).progress(function (evt) {
 //                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
 //                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
 //                }).success(function (data, status, headers, config) {
 //                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
 //                });
 //            }
 //        }
 //    };
});