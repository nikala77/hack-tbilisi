function fadeIn(tag, slide, startTime, delay) {
	tag.css({
		'display': 'none'
	});

	setTimeout(function() {
		tag.fadeIn(delay);
	}, startTime);
};