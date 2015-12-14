function addVideo(slide, src, width, height, videoType, style, freetrans, animation, clone) {
	// https://www.youtube.com/watch?v=l1ZEcIbIQGI
	// https://vimeo.com/channels/staffpicks/140767141
	var random = generateRandom(slide);
	var x = random.x;
	var y = random.y;
	var width  = width ? width: 200;
	var height = height ? height: 150;

	var video = $('<img></img>');
	
	if(animation) {
		if(animation.enter) {
			video.data('enter-animation', animation.enter.type);
			video.data('enter-start', animation.enter.start);
			video.data('enter-delay', animation.enter.delay);
		}
		if(animation.exit) {
			video.data('exit-animation', animation.exit.type);
			video.data('exit-start', animation.exit.start);
			video.data('exit-delay', animation.exit.delay);
		}
	}

	video.attr({
		src: '/images/videoplaceholder.jpg',
		width: width,
		height: height,
		class: 'ft-widget'
	});

	video.css('z-index', lastZindex);

	video.data('animation', animation);
	
	video.attr({
		'id': ++lastObjectID,
		'data-active': true
	});
	lastZindex++;

	slide.append(video);
	
	if (groupArr.length > 0) 
		removeActiveObject();

	groupArr.push(video);

	if(!style) {
		video.freetrans({
			x: x,
			y: y
		});
	} else if(clone) {
		var css = buildCss(style);
		var zInd = Number(css['z-index']);
		lastZindex = zInd > lastZindex ? zInd : lastZindex;
		var rand = Math.random() * 100;
		css.top = Number(css.top.split('px')[0]) + rand;
		css.left = Number(css.left.split('px')[0]) + rand;
		freetrans.x += rand;
		freetrans.y += rand;
		video.freetrans(freetrans).css(css)
	} else {
		var css = buildCss(style);
		var zInd = Number(css['z-index']);
		// var top = parseInt(css['top']) + Math.floor(Math.random() * (30 + 30 + 1)) -30;
		// var left = parseInt(css['left']) + Math.floor(Math.random() * (30 + 30 + 1)) -30;
		// css['top'] = y = top;
		// css['left'] = x = left;
		lastZindex = zInd > lastZindex ? zInd : lastZindex;
		video.freetrans(freetrans).css(css)
	}
	video.css('z-index', lastZindex);

	video.data('type', 'video');
	console.log(src);
	video.data('video-src', src);
	video.data('video-type', videoType);
	video.parent('.ft-container').attr('data-active', true);	

	var controls = video.siblings('.ft-controls'); 
	controls.css('z-index', lastZindex);
	
	var top = controls.position().top - 5;
	var left = controls.position().left + controls.width() + 25;

	if (video.parent('.ft-container').siblings('.shape-panel').html()) {
		activateControlPanel(video, top, left);
	} else {
		addControlPanel(video, top, left);
	}

	lastZindex++;

	bindOnModifiedEvent(video[0]);
}