angular.module('app').directive('profileImg', function (zProfileImgGet) {
    function link(scope, element, attrs) {
        var _item;

        //todo: forceRefresh="true" to set add max-age header
        //todo: add default image if none set - use when editing pic
        //todo catch 403 error?

        function setPic() {
            var options = {
                type: attrs.profileType,
                size: attrs.profileSize,
                noCache: attrs.profileNocache
            };
            
            element.attr('src', null);
            zProfileImgGet.getPic(_item, options, function (err, dataURI) {
                if (err) {
                    var src = attrs.profileDefimg || null;
                    element.attr('src', src);
                } else {
                    setTimeout(function() {
                        scope.$apply(function () {
                            element.attr('src', dataURI);
                        });
                    }, 0);
                }
            });
        }

        scope.$watch(attrs.profileImg, function (value) {
            _item = value;
            setPic();
        });
        scope.$watch(attrs.imgChanged, function (value) {
            if (value) {
                setPic();
            }
        });
    }

    return {
        restrict: 'A',
        link: link
    };
});
