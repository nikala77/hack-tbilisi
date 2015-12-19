function lightSpeedIn(tag, slide, startTime, delay) {
	tag.css({
		'display': 'none'
	});

	setTimeout(function() {
		tag.fadeIn({ queue: false, duration: 'slow' });
		tag.addClass('animated lightSpeedIn', delay);
	}, startTime);
};