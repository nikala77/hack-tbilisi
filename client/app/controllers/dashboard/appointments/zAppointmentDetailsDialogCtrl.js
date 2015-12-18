angular.module('app').controller('zAppointmentDetailsDialogCtrl', function(
    $scope, $modalInstance, $location, zIdentity, zNotifier, zAppointment, zClient, params) {

    $scope.canEdit = true; // TODO: check roles
    $scope.isLoading = true;
    
    $scope.openClientView = function(client) {
        $modalInstance.dismiss('cancel');
        $location.url('/clients/' + client._id);
    };
    
    $scope.edit = function () {
        $modalInstance.close();
    };

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

    (function _loadData() {
        zAppointment
            .get({
                id: params._id, 
                'includes[]': ['clients', 'resources']
            })
            .$promise
            .then(function(appointment) {
                $scope.appointment = appointment;
            })
            .catch(function(err) {
                zNotifier.error('Unable to load record: ' + err.data.reason);
            })
            .finally(function() {
                $scope.isLoading = false;
            });
    })();
});
