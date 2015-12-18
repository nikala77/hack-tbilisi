angular.module('app').filter('zCapitalize', function() {
	return function(input) {
		if(!!input) {
			var arr = input.split(' ');
			for(var i = 0; i < arr.length; i++) {
				arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substr(1).toLowerCase();
			}

			return arr.join(' ');
		}
		return ' ';
	};
});