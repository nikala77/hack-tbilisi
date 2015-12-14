function loadObjects(activeSlide, presentationData, slideHeart, windowx, windowy) {
	slideHeart.fadeOut().html('').fadeIn();
	try {
		var objects = eval(presentationData[activeSlide].json);
		var background = presentationData[activeSlide].title;
		slideHeart.css('background', background);
	} catch(err) {
		slideHeart.css('background', 'none');
		slideHeart.css('background-color', '#545252');
		return;
		console.log('objects doesn\'t exists');
	}
	objects.forEach(function(obj) {
		var type = obj.tag;
		var src = obj.src;
		var videoType = obj.videoType;
		var width = obj.width * windowx;
		var height = obj.height * windowy;

		var style = buildCss(obj.style);
		var freetrans = obj.freetrans;
		var animation = obj.animation;

		var text = obj.text;
		var font = obj.font;
		var rows = obj.rows;
		var cols = obj.cols;

		var freetrans = obj.freetrans;
		var scalex = freetrans.scalex;
		var scaley = freetrans.scaley;
		var angle = freetrans.angle;

		var dify = (scaley * height - height) / 2;
		var difx = (scalex * width - width) / 2;

		var top = Number(style.top.split('px')[0]) * windowx - dify;
		var left = Number(style.left.split('px')[0]) * windowy - difx;
		var textTop = Number(style.top.split('px')[0]) * windowy;
		var textLeft = Number(style.left.split('px')[0]) * windowx;

		var width = width * scalex;
		var height = height * scaley;
		var zIndex = style['z-index'];
		var videoType = obj.videoType;
		var activeTag;

		if(type === 'audio') {
			var tag = $(document.createElement('audio'));
			var attributes = obj.prop("attributes");
			tag.attr('src', '/uploads/audios/queen.mp3');

			tag[0].play();

			activeTag = tag;
		}

		if(type === 'img') {
			var tag = $(document.createElement('img'));

			tag.attr({
				'src': src
			}).css({
				'position': 'absolute',
				'top': top,
				'left': left,
				'width': width,
				'height': height,
				'z-index': zIndex
			});
			
			tag.css({ 'transform': 'rotate('+ angle +'deg)' ,
					'transform-origin': '50% 50% 50px' ,
					'-ms-transform': 'rotate('+ angle +'deg)' ,
					'-ms-transform-origin': '50% 50% 50px' ,
					'-webkit-transform': 'rotate('+ angle +'deg)' ,
					'-webkit-transform-origin': '50% 50% 50px' });

			activeTag = tag;
		}

		if(type === 'textArea') {
			var tag = $('<div class="textarea"></div>');
			
			var height = Number(style.height.split('px')[0]);
			var width = Number(style.width.split('px')[0]);

			var dify = (windowy * height - height) / 2;
			var difx = (windowx * width - width) / 2;

			style.top = textTop + dify;
			style.left = textLeft + difx;

			tag.css({
				'transform': 'scale('+ windowx +','+ windowy +')'
			});

			tag.css(style)
			.html(text)

			activeTag = tag;
		}

		if(type === 'video') {
			var tag;

			if(videoType === 'upload') {
				tag = $('<video></video>');

				tag.attr({
					'autoplay': true,
					'muted': true,
					'controls': true
				});

				var source = $('<source></source>');
				source.attr({ type : 'video/mp4' , src : '/uploads/videos/test.mp4' });
				tag.append(source);
				tag.append('Your browser does not support the video tag.');

			} else if(videoType === 'youtube') {
				tag = $('<iframe></iframe>');
				tag.attr({
					src: src
				});
			} else {
				tag = $('<iframe></iframe>');

				tag.attr({
					src: src
				});

			}

			tag.css({ 'transform': 'rotate('+ angle +'deg)' ,
					'transform-origin': '50% 50%' ,
					'-ms-transform': 'rotate('+ angle +'deg)' ,
					'-ms-transform-origin': '50% 50%' ,
					'-webkit-transform': 'rotate('+ angle +'deg)' ,
					'-webkit-transform-origin': '50% 50%' });

			tag.css({
				'position': 'absolute',
				'top': top,
				'left': left,
				'width': width,
				'height': height,
				'z-index': zIndex
			});

			activeTag = tag;
		}
		// add tag to preview
		slideHeart.append(activeTag);
		// animation
		var enterAnimation = obj.animation.enter;
		var exitAnimation = obj.animation.exit;

		if(enterAnimation) {
			var startTime = enterAnimation.start;
			var delay = enterAnimation.delay;
			var type = enterAnimation.type;
			if(obj.tag === 'textArea') {
				scalex = windowx;
				scaley = windowy;
			}
			generateAnimation(activeTag, type, startTime, delay, scalex, scaley);
		}
		if(exitAnimation) {
			var type = exitAnimation.type;
			var startTime = exitAnimation.start;
			var delay = exitAnimation.delay;
			var enterStartTime = enterAnimation.start;
			var enterDelay = enterAnimation.delay;
			if(obj.tag === 'textArea') {
				scalex = windowx;
				scaley = windowy;
			}
			var sum = Number(enterStartTime) * 1000 + Number(enterDelay) * 1000 + 1000; 
			generateAnimation(activeTag, type, startTime, delay, scalex, scaley, sum);
		}
	});
};

function buildCss(style) {
	var styles = style.split(';');
	var buildCss = {};
	
	styles.forEach(function(style) {
		var prop = style.split(':')[0];
		var val  = style.split(':')[1];
		
		if(prop && val) {
			prop = prop.trim();
			val  = val.trim();
			buildCss[prop] = val;
		}
	});

	return buildCss;
};