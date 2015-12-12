function fadeOut(tag, slide, startTime, delay, scalex, scaley, sum) {
	startTime += sum;

	setTimeout(function() {
		tag.fadeOut(delay);
	}, startTime);
};