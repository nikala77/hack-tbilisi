function flyFromRight(tag, slide, startTimeAt, delay, scalex, scaley, width, height) {
	var left = tag.css('left');
	var outX = slide.width();
	
	if(tag.hasClass('textarea')) {
		outX += width * scalex;
	}
	console.log(tag);
	if(tag.hasClass('shape')) {
		outX += width * scalex;
		console.log(outX, width, scalex)
	}

	tag.css({
		left: outX
	});

	setTimeout(function() {
		tag.animate({ 'left': left }, delay);
	}, startTimeAt);
};