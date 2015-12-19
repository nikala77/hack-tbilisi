function flyFromBottom(tag, slide, startTimeAt, delay, scalex, scaley) {
	var top = tag.css('top');
	var outY =  slide.height();

	if(tag.hasClass('textarea')) {
		outY += tag.height() * scaley;
	}

	tag.css({
		top: outY
	});

	setTimeout(function() {
		tag.animate({ 'top': top }, delay);
	}, startTimeAt);
};