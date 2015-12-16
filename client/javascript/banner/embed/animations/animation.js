function generateAnimation(tag, animation, startTime, delay, scalex, scaley, sum) {
	try {
		var embedBanner = $('.animation-banner');
		startTime = (Number(startTime) + 0.5) * 1000;
		delay = (Number(delay) + 0.5 ) * 1000;
		sum = sum ? sum : 0;
		console.log('animation', animation)
		eval(animation + '(tag, embedBanner, startTime, delay, scalex, scaley, sum)');
		
	} catch(err) {
		console.log('animation doesn\'t exists', err);
	}
};

function maxAnimationDuration(data) {
	var maxAnimationTime = 2000;
	for(var i = 0; i < data.length; i++) {
		time = 0;
		object = data[i];
		if(object.animation) {
			var enter = object.animation.enter;
			var exit = object.animation.exit;

			if(enter.start) {
				time += (Number(enter.start) + 0.5) * 1000;
				time += (Number(enter.delay) + 0.5) * 1000;
			}
			if(exit.start) {
				time += (Number(exit.start) + 0.5) * 1000;
				time += (Number(exit.delay) + 0.5) * 1000;
			}
			if(time > maxAnimationTime) {
				maxAnimationTime = time;
			}
		};
	}

	return maxAnimationTime + 2000;
};

function wholeAnimationTime(presentationData) {
	var wholeTime = 1000;

	for(var i = 0; i < presentationData.length; i++) {
		var maxAnimationTime = 2000;
		var data = presentationData[i];
		maxAnimationTime = maxAnimationDuration(data);
		wholeTime += maxAnimationTime;
	}

	return wholeTime;
};