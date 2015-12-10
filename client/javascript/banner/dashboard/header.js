$(function() {
	$('.show-side-bar').on('click', function() {

		if($('.section').css('margin-left') === '250px') {
			$('.side-bar').animate({ 'left': '-250px' }, 400);
			$('.section, .header').animate({ 'margin-left': '0px' });
		} else {
			$('.side-bar').animate({ 'left': '0px' }, 400);
			$('.section, .header').animate({ 'margin-left': '250px' });
		}
	});
});