function hingle(tag, slide, startTime, delay) {
	setTimeout(function() {
		tag.addClass('animated hinge', delay);
	}, startTime);
};