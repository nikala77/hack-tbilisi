function scrollCenter(div) {
	div.scrollTop(div.height() * 0.85);
	div.scrollLeft(div.width() / 2.5);
};

function disableKeyboardScroll() {
	$('#slide-container').on('keydown', function(e) {
		var ar = new Array(33,34,35,36,37,38,39,40);
		var key = e.which;
		if($.inArray(key,ar) > -1) {
			e.preventDefault();
			return false;
		}
		return true;
	});
};

function alignMiddle(div) {
	div.css({ 
		top: (div.parent().height() - div.height()) / 2,
		left: (div.parent().width() - div.width()) / 2
	});
};

function loadObjects(data) {
	groupArr = [];
	var objects = eval(data.json);
	workingBanner.css('background', data.background);

	if(!objects) {
		return;
	}

	initObjectStates(objects);

	for(var j = 0; j < objects.length; j++) {
		var obj = objects[j];
		var src = obj.src;
		var videoType = obj.videoType;
		var width = obj.width;
		var height = obj.height;

		var style = obj.style;
		var freetrans = obj.freetrans;
		var animation = obj.animation;

		var text = obj.text;
		var font = obj.font;
		var rows = obj.rows;
		var cols = obj.cols;

		
		switch(objects[j].tag) {
			case 'img':   addImage(workingBanner, src, width, height, style, freetrans, animation); break;
			case 'textArea':  addText(workingBanner, text, font, width, height, style, animation); break;
			case 'shape':  addShape(workingBanner, src, width, height, obj.fill, obj.stroke, style, freetrans, animation); break;
			case 'audio': addAudio(workingBanner, src, width, height, style, freetrans, animation); break;
			case 'video': addVideo(workingBanner, src, width, height, videoType, style, freetrans, animation); break;
		}
	}
};

function loadAfterModify (str) {
	groupArr = [];
	var objects = eval(str);

	if(!objects) {
		return;
	}

	for(var j = 0; j < objects.length; j++) {
		var obj = objects[j];
		var src = obj.src;
		var videoType = obj.videoType;
		var width = obj.width;
		var height = obj.height;

		var style = obj.style;
		var freetrans = obj.freetrans;
		var animation = obj.animation;

		var text = obj.text;
		var font = obj.font;
		var rows = obj.rows;
		var cols = obj.cols;

		switch(objects[j].tag) {
			case 'audio': addAudio(workingBanner, src, width, height, style, freetrans, animation); break;
			case 'img':   addImage(workingBanner, src, width, height, style, freetrans, animation); break;
			case 'textArea':  addText(workingBanner, text, font, rows, cols, style, freetrans, animation); break;
			case 'shape':  addShape(workingBanner, src, width, height, obj.fill, style, freetrans, animation); break;
			case 'video': addVideo(workingBanner, src, width, height, videoType, style, freetrans, animation); break;
		}
	}
}

function getBannerData() {
	var bannerData = [];
	groupArr.forEach(function(obj) {
		var type = obj.data('type');
		try {
			var freetrans = obj.freetrans('getOptions');
		} catch(err) {
			freetrans = {
				x: obj.css('left'),
				y: obj.css('top')
			};
		}
		var enAnim = obj.data('enter-animation');
		var enStart = obj.data('enter-start');
		var enDelay = obj.data('enter-delay');
		var exAnim = obj.data('exit-animation');
		var exStart = obj.data('exit-start');
		var exDelay = obj.data('exit-delay');

		var animation = {
			enter: {
				type: enAnim,
				start: enStart,
				delay: enDelay 
			},
			exit : {
				type: exAnim,
				start: exStart,
				delay: exDelay 
			}
		};
		
		if(type === 'image') {
			var tag = 'img';
			var src = obj.attr('src');
			var width  = obj.width();
			var height = obj.height();
			var style  = obj.attr('style');
			var imageObj = new Image(tag, src, width, height, style, freetrans, animation);
			bannerData.push(imageObj);
			return;
		}
		if(type === 'text') {
			var tag = 'textArea';
			var text = obj.text();
			var style  = obj.attr('style');
			var font = obj.css('font-family');
			var width  = obj.width();
			var height = obj.height();
			var textObj = new TextFiled(tag, text, font, width, height, style, freetrans, animation);
			bannerData.push(textObj);
			return;
		}

		if(type === 'shape') {
			var tag = 'shape';
			var src = obj.data('src');
			var width  = obj.width();
			var height = obj.height();
			var fill = obj.data('fill');
			var stroke = obj.data('stroke');
			var style  = obj.attr('style');
			var shapeObj = new Shape(tag, src, width, height, fill, stroke, style, freetrans, animation);
			bannerData.push(shapeObj);
			return;
		}
		
		if(type === 'audio') {
			var tag = 'audio';
			var src = obj.data('audio-src');
			var width  = obj.width();
			var height = obj.height();
			var style  = obj.attr('style');
			var audioObj = new Audio(tag, src, width, height, style, freetrans, animation);
			bannerData.push(audioObj);
			return;
		}

		if(type === 'video') {
			var tag = 'video';
			var src = obj.data('video-src');
			var width  = obj.width();
			var height = obj.height();
			var style  = obj.attr('style');
			var videoType = obj.data('video-type');
			var videoObj = new Video(tag, src, videoType, width, height, style, freetrans, animation);
			bannerData.push(videoObj);
			return;
		}
	});
	var bannerData = JSON.stringify(bannerData);

	return bannerData;
};