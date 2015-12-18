angular.module('app').controller('PicUploaderCtrl', function ($scope, $http, zCommonUtil, zNotifier) {
    $scope.myImage = '';
    $scope.myCroppedImage = '';
    $scope.files = null;
    $scope.isUploadingPic = false;

    $scope.uploadPic = function(files) {
        if (files && files.length) {
            var file = files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function($scope) {
                    $scope.myImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        }
    };

    $scope.savePic = function(image, picInfo) {
        if (!picInfo || !picInfo.id || !picInfo.type || !_.isFunction(picInfo.cb)) {
            throw new Error('Unable to upload picture, picInfo{id, type, cb} must be defined in parent controller');
        }
        
        $scope.isUploadingPic = true;
        var blob = zCommonUtil.dataURItoBlob(image);
        var fd = new FormData();
        fd.append('image', blob);
        var options = {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined }
        };
        
        var url = '/api/uploads/upload?type=:type&_id=:id'
            .replace(':type', picInfo.type)
            .replace(':id', picInfo.id);
        $http
            .post(url, fd, options)
            .then(function() {
                zNotifier.notify('Image uploaded succesfully');
                return picInfo.cb();
            })
            .catch(function(err) {
                zNotifier.error('Unable to upload picture: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isUploadingPic = false;
            });
    };
});
