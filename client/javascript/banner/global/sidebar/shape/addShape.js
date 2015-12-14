function addShape(slide, src, width, height, fill, stroke, style, freetrans, animation, clone) {
	var random = generateRandom(slide);
	var x = random.x;
	var y = random.y;
	var width  = width || 100;
	var height = height || 100;

	var shape = $('<div data-src="'+ src +'"><img src="'+ src +'" width="'+ width +'" height="'+ height +'"></img></div>');
	shape.data('fill', fill);
	shape.data('stroke', stroke);
	
	convertSVG(shape.find('img'), fill, stroke, width, height);
	
	if(animation) {
		if(animation.enter) {
			shape.data('enter-animation', animation.enter.type);
			shape.data('enter-start', animation.enter.start);
			shape.data('enter-delay', animation.enter.delay);
		}
		if(animation.exit) {
			shape.data('exit-animation', animation.exit.type);
			shape.data('exit-start', animation.exit.start);
			shape.data('exit-delay', animation.exit.delay);
		}		
	}

	shape.attr({
		width: width,
		height: height,
		class: 'svg-container ft-widget'
	});


	shape.data('animation', animation);

	shape.attr({
		'id': ++lastObjectID,
		'data-active': true
	});

	slide.append(shape);
	
	if (groupArr.length > 0) {
		removeActiveObject();
	}

	groupArr.push(shape);

	if(!style) {
		shape.freetrans({
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
		freetrans.x = freetrans.x + rand;
		freetrans.y = freetrans.y + rand;
		shape.css(css).freetrans(freetrans);
	} else {
		var css = buildCss(style);
		var zInd = Number(css['z-index']);
		lastZindex = zInd > lastZindex ? zInd : lastZindex;
		shape.freetrans(freetrans).css(css);
	}
	shape.css('z-index', lastZindex);
	
	shape.data('type', 'shape');
	shape.parent('.ft-container').attr('data-active', true);
	
	var controls = shape.siblings('.ft-controls') 
	controls.css('z-index', lastZindex);
	var top = controls.position().top - 5;
	var left = controls.position().left + controls.width() + 25;

	if (shape.parent('.ft-container').siblings('.shape-panel').html()) {
		activateControlPanel(shape, top, left);
	} else {
		addControlPanel(shape, top, left);
	}

	lastZindex++;

	bindOnModifiedEvent(shape[0]);
};