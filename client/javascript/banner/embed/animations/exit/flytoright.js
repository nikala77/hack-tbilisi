function flyToRight(tag, slide, startTimeAt, delay, scalex, scaley, sum) {
	var left = tag.css('left');
	var outX = slide.width();
	startTimeAt += sum;

	if(tag.hasClass('textarea')) {
		outX += tag.width() * scalex;
	}

	setTimeout(function() {
		tag.animate({ 'left': outX }, delay);
	}, startTimeAt);
};