function rotate(tag, slide, startTime, delay) {
	tag.css({
		'opacity': 0
	});

	setTimeout(function() {
		tag.fadeIn({ queue: false, duration: 'slow' });
		tag.addClass('animated rotateIn', delay);
	}, startTime);
};