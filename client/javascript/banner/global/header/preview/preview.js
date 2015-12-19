function loadPreview(bannerData, workingBanner, windowx, windowy) {
	try {
		var objects = JSON.parse(bannerData.json);
		var background = bannerData.background;
		workingBanner.css('background', background);
	} catch(err) {
		workingBanner.css('background', 'none');
		workingBanner.css('background-color', '#545252');
		
		console.log('objects doesn\'t exists');

		return;
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

		} else if(type === 'textArea') {
			var tag = $('<textArea class="textarea" type="text" disabled></textArea>');
			
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

		}  else if(type === 'shape') {
			var fill = obj.fill;
			var stroke = obj.stroke;
			var tag = $('<div class="shape" data-src="'+ src +'" data-fill="'+ fill +'"><img src="'+ src +'"></img></div>');
			
			convertSVG(tag.find('img'), fill, stroke, width / scalex, height / scaley);

			tag.css(style);

			activeTag = tag;

		} else if(type === 'audio') {
			var tag = $(document.createElement('audio'));
			var attributes = obj.prop("attributes");
			tag.attr('src', '/uploads/audios/queen.mp3');

			tag[0].play();

			activeTag = tag;
		} else {
			var tag;

			if(videoType === 'upload') {
				tag = $('<video></video>');

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
		workingBanner.append(activeTag);
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

			if(obj.tag === 'shape') {
				scalex = obj.freetrans.scalex;
				scaley = obj.freetrans.scaley;
			}

			generateAnimation(activeTag, type, startTime, delay, scalex, scaley, width, height);
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

			if(obj.tag === 'shape') {
				scalex = obj.freetrans.scalex;
				scaley = obj.freetrans.scaley;
			}
			
			var sum = Number(enterStartTime) * 1000 + Number(enterDelay) * 1000 + 1000; 
			generateAnimation(activeTag, type, startTime, delay, scalex, scaley, sum, width, height);
		}
	});
};