function addImage(slide, src, width, height, style, freetrans, animation, clone) {
	var random = generateRandom(slide);
	var x = random.x;
	var y = random.y;
	var width  = width ? width: 200;
	var height = height ? height: 120;

	var img = $('<img></img>');
	
	if(animation) {
		if(animation.enter) {
			img.data('enter-animation', animation.enter.type);
			img.data('enter-start', animation.enter.start);
			img.data('enter-delay', animation.enter.delay);
		}
		if(animation.exit) {
			img.data('exit-animation', animation.exit.type);
			img.data('exit-start', animation.exit.start);
			img.data('exit-delay', animation.exit.delay);
		}		
	}

	img.attr({
		src: src,
		width: width,
		height: height,
		class: 'ft-widget'
	});

	img.data('animation', animation);
	
	img.attr({
		'id': ++lastObjectID,
		'data-active': true
	});
	slide.append(img);

	if (groupArr.length > 0) {
		removeActiveObject();
	}

	groupArr.push(img);

	if(!style) {
		img.freetrans({
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
		img.freetrans(freetrans).css(css);
	} else {
		var css = buildCss(style);
		var zInd = Number(css['z-index']);
		lastZindex = zInd > lastZindex ? zInd : lastZindex;
		img.freetrans(freetrans).css(css);
	}
	img.css('z-index', lastZindex);

	img.data('type', 'image');
	img.parent('.ft-container').attr('data-active', 'true');
	var controls = img.siblings('.ft-controls');

	var top = controls.position().top - 5;
	var left = controls.position().left + controls.width() + 25;

	if (img.parent('.ft-container').siblings('.shape-panel').html()) {
		activateControlPanel(img, top, left);
	} else {
		addControlPanel(img, top, left);
	}

	lastZindex++;

	bindOnModifiedEvent(img[0]);
}