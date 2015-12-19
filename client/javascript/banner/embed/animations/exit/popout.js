function popOut(tag, slide, startTime, delay, scalex, scaley, sum) {
	startTime += sum;

	setTimeout(function() {
		tag.addClass('animated zoomOut', delay);
	}, startTime);
};