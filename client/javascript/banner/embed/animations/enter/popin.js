function popIn(tag, slide, startTime, delay, scalex, scaley) {
	tag.hide();

	setTimeout(function() {
		tag.show({ effect: 'scale' });
	}, startTime);
};