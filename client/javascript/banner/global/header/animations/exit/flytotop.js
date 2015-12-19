function flyToTop(tag, slide, startTimeAt, delay, scalex, scaley, sum) {
	var top = tag.css('top');
	var outY = -tag.height();
	startTimeAt += sum;
	startTimeAt += 500;

	if(tag.hasClass('textarea')) {
		outY = -tag.height() * scaley;
	}

	tag.css({
		top: outY
	});

	setTimeout(function() {
		tag.animate({ 'top': outY }, delay);
	}, startTimeAt);
};