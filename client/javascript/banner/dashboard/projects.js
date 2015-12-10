$(function() {

	if($(this).width() <= 752) {
		$('.section').css('margin-left', '0px');
	}

	$(window).on('resize', function() {
		if($(this).width() <= 752) {
			$('.section').css('margin-left', '0px');
		} else {
			$('.section').css('margin-left', '250px');
		}
	});

});