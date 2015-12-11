function changeBannerSize (width, height) {
	console.log(width, height)
	var left = $(window).width() / 2 - width / 2 + 50;
	var top = $(window).height() / 2 - height / 2 - 50;
	console.log(left)
	$('.working-banner').css({
		'width': width,
		'height': height,
		'left': left,
		'top': top
	});
}


function bindZooming (banner) {
	var scale = 1;
	var scaleFactor = 1.1;
	$('.scale-plus').on('click', function() {
		scale *= scaleFactor;
		banner.css({
			'transform': 'scale('+ scale +')'
		});
	});

	$('.scale-minus').on('click', function() {
		scale /= scaleFactor;
		banner.css({
			'transform': 'scale('+ scale +')'
		});
	});
}