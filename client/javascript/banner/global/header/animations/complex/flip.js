function flip(tag, slide, startTime, delay) {
	tag.css({
		'display': 'none'
	});

	setTimeout(function() {
		tag.fadeIn({ queue: false, duration: 'slow' });
		tag.addClass('animated flipInY', delay);
	}, startTime);
};