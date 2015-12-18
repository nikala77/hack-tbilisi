angular.module('app').factory('zCommonUtil', function () {
    return {
        randomPw: function() {
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            
            for (var i = 0; i < 30; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        },
        
        dataURItoBlob: function(dataURI) {
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0) {
                byteString = atob(dataURI.split(',')[1]);
            } else {
                byteString = encodeURIComponent(dataURI.split(',')[1]);
            }
        
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
        
            return new Blob([ia], {type:mimeString});
        },
        
        getEmailRegex: function() {
            return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        },
        
        isValidEmail: function(email) {
            return this.getEmailRegex().test(email);
        },
        
        getErrorMessage: function(err) {
            if (err) {
                if (err.reason) {
                    return err.reason;
                } else if (err.message) {
                    return err.message;
                }
            }
            return '';
        }
    };
});