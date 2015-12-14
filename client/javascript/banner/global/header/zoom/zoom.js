$(function() {
	var scale = 1;
	var scaleFactor = 1.1;
	$('#zoom-in').on('click', function() {
		scale *= scaleFactor;
		slideHeart.css({
			'transform': 'scale('+ scale +')'
		});
	});

	$('#zoom-out').on('click', function() {
		scale /= scaleFactor;
		slideHeart.css({
			'transform': 'scale('+ scale +')'
		});
	});
});