function generateAnimation(tag, animation, startTime, delay, scalex, scaley, sum) {
	try {
		var previewDesk = $('.slide-heart');
		startTime = (Number(startTime) + 0.5) * 1000;
		delay = (Number(delay) + 0.5 ) * 1000;
		sum = sum ? sum : 0;
		eval(animation + '(tag, previewDesk, startTime, delay, scalex, scaley, sum)');
	} catch(err) {
		// console.log('animation doesn\'t exists', err);
	}
};