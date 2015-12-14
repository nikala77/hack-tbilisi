function flyToBottom(tag, slide, startTimeAt, delay, scalex, scaley, sum) {
	var top = tag.css('top');
	var outY =  slide.height();
	startTimeAt += sum;

	if(tag.hasClass('textarea')) {
		outY += tag.height() * scaley;
	}

	setTimeout(function() {
		tag.animate({ 'top': outY }, delay);
	}, startTimeAt);
};