function addAudio(slide, src, width, height, style, freetrans, animation, clone) {
	var random = generateRandom(slide);
	var x = random.x;
	var y = random.y;
	var width  = width ? width: 100;
	var height = height ? height: 100;

	var audio = $('<img></img>');

	audio.attr({
		src: '/uploads/images/audio.png',
		width: width,
		height: height,
		class: 'ft-widget'
	});

	audio.data('audio-src', src);
	
	audio.attr({
		'id': ++lastObjectID,
		'data-active': true
	});

	slide.append(audio);


	if (groupArr.length > 0) 
		removeActiveObject();

	groupArr.push(audio);

	if(!style) {
		audio.freetrans({
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
		audio.freetrans(freetrans).css(css)
	} else {
		var css = buildCss(style);
		var zInd = Number(css['z-index']);
		// var top = parseInt(css['top']) + Math.floor(Math.random() * (30 + 30 + 1)) -30;
		// var left = parseInt(css['left']) + Math.floor(Math.random() * (30 + 30 + 1)) -30;
		// css['top'] = y = top;
		// css['left'] = x = left;
		lastZindex = zInd > lastZindex ? zInd : lastZindex;

		audio.freetrans(freetrans).css(css);
	}
	audio.css('z-index', lastZindex);

	audio.data('type', 'audio');

	audio.parent('.ft-container').attr('data-active', true);
	var controls = audio.siblings('.ft-controls') 
	controls.css('z-index', lastZindex);
	var top = controls.position().top - 5;
	var left = controls.position().left + controls.width() + 25;

	if (audio.parent('.ft-container').siblings('.shape-panel').html()) {
		activateControlPanel(audio, top, left);
	} else {
		addControlPanel(audio, top, left);
	}
	
	lastZindex++;

	bindOnModifiedEvent(audio[0]);
}