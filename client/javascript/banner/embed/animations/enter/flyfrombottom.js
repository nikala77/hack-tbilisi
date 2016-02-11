function flyFromBottom(tag, slide, startTimeAt, delay, scalex, scaley, width, height) {
	var top = tag.css('top');
	var outY =  slide.height();

	if(tag.hasClass('textarea')) {
		outY += tag.height() * scaley;
	}

	if(tag.hasClass('shape')) {
		outY += height * scaley;
	}

	tag.css({
		top: outY
	});

	setTimeout(function() {
		tag.animate({ 'top': top }, delay);
	}, startTimeAt);
};