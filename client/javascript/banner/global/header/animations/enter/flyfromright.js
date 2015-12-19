function flyFromRight(tag, slide, startTimeAt, delay, scalex) {
	var left = tag.css('left');
	var outX = slide.width();

	if(tag.hasClass('textarea')) {
		outX += tag.width() * scalex;
	}

	tag.css({
		left: outX
	});

	setTimeout(function() {
		tag.animate({ 'left': left }, delay);
	}, startTimeAt);
};