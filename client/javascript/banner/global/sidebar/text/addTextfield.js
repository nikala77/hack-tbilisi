function addText(slide, text, font, width, height, style, animation, clone) {
	var random = generateRandom(slide);
	var x = random.x;
	var y = random.y;

	var textContainer = $('<div class="text-container contenteditable ft-container" contenteditable="false"><div class="editable" contenteditable="true" data-active="true"></div></div>');
	var textArea = textContainer.find('div');

	if(animation) {
		if(animation.enter) {
			textContainer.data('enter-animation', animation.enter.type);
			textContainer.data('enter-start', animation.enter.start);
			textContainer.data('enter-delay', animation.enter.delay);
		}
		if(animation.exit) {
			textContainer.data('exit-animation', animation.exit.type);
			textContainer.data('exit-start', animation.exit.start);
			textContainer.data('exit-delay', animation.exit.delay);
		}		
	}
	textArea.text(text);

	textContainer.append('<div class="ui-resizable-handle ui-resizable-nw" id="nwgrip" styles="z-index:' + lastZindex +';"></div>'+
    '<div class="ui-resizable-handle ui-resizable-ne" id="negrip"></div>'+
    '<div class="ui-resizable-handle ui-resizable-sw" id="swgrip"></div>'+
    '<div class="ui-resizable-handle ui-resizable-se" id="segrip"></div>'+
    '<div class="ui-resizable-handle ui-resizable-n" id="ngrip"></div>'+
    '<div class="ui-resizable-handle ui-resizable-s" id="sgrip"></div>'+
    '<div class="ui-resizable-handle ui-resizable-e" id="egrip"></div>'+
    '<div class="ui-resizable-handle ui-resizable-w" id="wgrip"></div>');

	slide.append(textContainer);
	
	textContainer.css({ 
		'font-family': font,
		'color': '#000000',
	});

	textContainer.data('animation', animation);
	
	textContainer.attr({
		'id': ++lastObjectID,
		'data-active': true
	});

	if (groupArr.length > 0) {
		removeActiveObject();
	}

	groupArr.push(textContainer);

	if(!style) {
		textContainer.css({
			'position': 'absolute',
			'top': y,
			'left': x,
			'font-size': '18px',
			'width': '120px',
			'height': '30px',
		});
	} else if(clone) {
		var css = buildCss(style);
		var zInd = Number(css['z-index']);
		lastZindex = zInd > lastZindex ? zInd : lastZindex;
		var rand = Math.random() * 100;
		css.top = y = Number(css.top.split('px')[0]) + rand;
		css.left = x = Number(css.left.split('px')[0]) + rand;
		textContainer.css(css)
	} else {
		var css = buildCss(style);
		var zInd = Number(css['z-index']);
		lastZindex = zInd > lastZindex ? zInd : lastZindex;
		textContainer.css(css);
	}
	textContainer.css('z-index', lastZindex);

	textContainer.draggable();
	console.log(textContainer);
	textContainer.resizable({
	    handles: {
			'nw': '#nwgrip',
			'ne': '#negrip',
			'sw': '#swgrip',
			'se': '#segrip',
			'n': '#ngrip',
			'e': '#egrip',
			's': '#sgrip',
			'w': '#wgrip'
	    }
	});


	textContainer.data('type', 'text');

	if (textContainer.siblings('.shape-panel').html()) {
		activateControlPanel(textContainer, y, x);
	} else {
		addControlPanel(textContainer, y, x);
	}

	lastZindex++;
	bindOnModifiedEvent(textContainer[0]);
};