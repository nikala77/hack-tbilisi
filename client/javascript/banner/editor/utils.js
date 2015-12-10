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