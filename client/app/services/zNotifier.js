angular.module('app').value('zToastr', toastr);

angular.module('app').factory('zNotifier', function(zToastr) {
    return {
        notify: function(msg) {
            zToastr.success(msg);
        },
        error: function(msg) {
            zToastr.error(msg);
        },
        info: function(msg) {
            zToastr.info(msg);
        },
        warning: function(msg) {
            zToastr.warning(msg);
        }
    };
});