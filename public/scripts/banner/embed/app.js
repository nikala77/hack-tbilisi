function convertSVG(shape, fill, stroke, width, height) {
    var $img = shape;
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    $.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
                
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass +' replaced-svg');
        }
        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        $svg.attr('width', width);
        $svg.attr('height', height);

        $svg.css({
            'width': width,
            'height': height
        });

        // Replace image with new SVG
        $img.replaceWith($svg);

        if(fill) {
            $svg.find('path').css('fill', fill);
            $svg.find('polygon').css('fill', fill);
            $svg.find('circle').css('fill', fill);
            $svg.find('rect').css('fill', fill);
            $svg.find('polyline').css('fill', fill);
            $svg.find('line').css('fill', fill);
        }

        if(stroke) {
            $svg.find('path').css('stroke', stroke);
            $svg.find('polygon').css('stroke', stroke);
            $svg.find('circle').css('stroke', stroke);
            $svg.find('rect').css('stroke', stroke);
            $svg.find('polyline').css('stroke', stroke);
            $svg.find('line').css('stroke', stroke);
        }

        return $svg;
    }, 'xml');

};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY29udmVydFNWRyhzaGFwZSwgZmlsbCwgc3Ryb2tlLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdmFyICRpbWcgPSBzaGFwZTtcbiAgICB2YXIgaW1nSUQgPSAkaW1nLmF0dHIoJ2lkJyk7XG4gICAgdmFyIGltZ0NsYXNzID0gJGltZy5hdHRyKCdjbGFzcycpO1xuICAgIHZhciBpbWdVUkwgPSAkaW1nLmF0dHIoJ3NyYycpO1xuICAgICQuZ2V0KGltZ1VSTCwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAvLyBHZXQgdGhlIFNWRyB0YWcsIGlnbm9yZSB0aGUgcmVzdFxuICAgICAgICB2YXIgJHN2ZyA9ICQoZGF0YSkuZmluZCgnc3ZnJyk7XG5cbiAgICAgICAgLy8gQWRkIHJlcGxhY2VkIGltYWdlJ3MgSUQgdG8gdGhlIG5ldyBTVkdcbiAgICAgICAgaWYodHlwZW9mIGltZ0lEICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cignaWQnLCBpbWdJRCk7XG4gICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgLy8gQWRkIHJlcGxhY2VkIGltYWdlJ3MgY2xhc3NlcyB0byB0aGUgbmV3IFNWR1xuICAgICAgICBpZih0eXBlb2YgaW1nQ2xhc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAkc3ZnID0gJHN2Zy5hdHRyKCdjbGFzcycsIGltZ0NsYXNzICsnIHJlcGxhY2VkLXN2ZycpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSBhbnkgaW52YWxpZCBYTUwgdGFncyBhcyBwZXIgaHR0cDovL3ZhbGlkYXRvci53My5vcmdcbiAgICAgICAgJHN2ZyA9ICRzdmcucmVtb3ZlQXR0cigneG1sbnM6YScpO1xuXG4gICAgICAgICRzdmcuYXR0cignd2lkdGgnLCB3aWR0aCk7XG4gICAgICAgICRzdmcuYXR0cignaGVpZ2h0JywgaGVpZ2h0KTtcblxuICAgICAgICAkc3ZnLmNzcyh7XG4gICAgICAgICAgICAnd2lkdGgnOiB3aWR0aCxcbiAgICAgICAgICAgICdoZWlnaHQnOiBoZWlnaHRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVwbGFjZSBpbWFnZSB3aXRoIG5ldyBTVkdcbiAgICAgICAgJGltZy5yZXBsYWNlV2l0aCgkc3ZnKTtcblxuICAgICAgICBpZihmaWxsKSB7XG4gICAgICAgICAgICAkc3ZnLmZpbmQoJ3BhdGgnKS5jc3MoJ2ZpbGwnLCBmaWxsKTtcbiAgICAgICAgICAgICRzdmcuZmluZCgncG9seWdvbicpLmNzcygnZmlsbCcsIGZpbGwpO1xuICAgICAgICAgICAgJHN2Zy5maW5kKCdjaXJjbGUnKS5jc3MoJ2ZpbGwnLCBmaWxsKTtcbiAgICAgICAgICAgICRzdmcuZmluZCgncmVjdCcpLmNzcygnZmlsbCcsIGZpbGwpO1xuICAgICAgICAgICAgJHN2Zy5maW5kKCdwb2x5bGluZScpLmNzcygnZmlsbCcsIGZpbGwpO1xuICAgICAgICAgICAgJHN2Zy5maW5kKCdsaW5lJykuY3NzKCdmaWxsJywgZmlsbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihzdHJva2UpIHtcbiAgICAgICAgICAgICRzdmcuZmluZCgncGF0aCcpLmNzcygnc3Ryb2tlJywgc3Ryb2tlKTtcbiAgICAgICAgICAgICRzdmcuZmluZCgncG9seWdvbicpLmNzcygnc3Ryb2tlJywgc3Ryb2tlKTtcbiAgICAgICAgICAgICRzdmcuZmluZCgnY2lyY2xlJykuY3NzKCdzdHJva2UnLCBzdHJva2UpO1xuICAgICAgICAgICAgJHN2Zy5maW5kKCdyZWN0JykuY3NzKCdzdHJva2UnLCBzdHJva2UpO1xuICAgICAgICAgICAgJHN2Zy5maW5kKCdwb2x5bGluZScpLmNzcygnc3Ryb2tlJywgc3Ryb2tlKTtcbiAgICAgICAgICAgICRzdmcuZmluZCgnbGluZScpLmNzcygnc3Ryb2tlJywgc3Ryb2tlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAkc3ZnO1xuICAgIH0sICd4bWwnKTtcblxufTsiXSwiZmlsZSI6InN2Zy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

$(function() {
	var id = $('.working-banner').data('id');
	
	$.ajax({
		url: '/api/banner/data/' + id,
		method: 'GET',
		timeout: 5000,

		beforeSend: function() {
			// show loading gif
		},
		success: function(response) {
			startFixedBanner(response);
		},
		error: function(request, errorType, errorMessage) {
			
		},
		complete: function() {
			// hide loading
		}
	});
});

function startFixedBanner(data) {
	var width = $('.working-banner').data('width');
	var height = $('.working-banner').data('height');

	loadBanner(data, $('.working-banner'), window.innerWidth / width, window.innerHeight / height);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJmaXhlZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKGZ1bmN0aW9uKCkge1xyXG5cdHZhciBpZCA9ICQoJy53b3JraW5nLWJhbm5lcicpLmRhdGEoJ2lkJyk7XHJcblx0XHJcblx0JC5hamF4KHtcclxuXHRcdHVybDogJy9hcGkvYmFubmVyL2RhdGEvJyArIGlkLFxyXG5cdFx0bWV0aG9kOiAnR0VUJyxcclxuXHRcdHRpbWVvdXQ6IDUwMDAsXHJcblxyXG5cdFx0YmVmb3JlU2VuZDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vIHNob3cgbG9hZGluZyBnaWZcclxuXHRcdH0sXHJcblx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRzdGFydEZpeGVkQmFubmVyKHJlc3BvbnNlKTtcclxuXHRcdH0sXHJcblx0XHRlcnJvcjogZnVuY3Rpb24ocmVxdWVzdCwgZXJyb3JUeXBlLCBlcnJvck1lc3NhZ2UpIHtcclxuXHRcdFx0XHJcblx0XHR9LFxyXG5cdFx0Y29tcGxldGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQvLyBoaWRlIGxvYWRpbmdcclxuXHRcdH1cclxuXHR9KTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBzdGFydEZpeGVkQmFubmVyKGRhdGEpIHtcclxuXHR2YXIgd2lkdGggPSAkKCcud29ya2luZy1iYW5uZXInKS5kYXRhKCd3aWR0aCcpO1xyXG5cdHZhciBoZWlnaHQgPSAkKCcud29ya2luZy1iYW5uZXInKS5kYXRhKCdoZWlnaHQnKTtcclxuXHJcblx0bG9hZEJhbm5lcihkYXRhLCAkKCcud29ya2luZy1iYW5uZXInKSwgd2luZG93LmlubmVyV2lkdGggLyB3aWR0aCwgd2luZG93LmlubmVySGVpZ2h0IC8gaGVpZ2h0KTtcclxufTsiXSwiZmlsZSI6ImZpeGVkLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

function loadBanner(bannerData, workingBanner, windowx, windowy) {
	try {
		bannerData = JSON.parse(bannerData);
		var background = bannerData.background;
		workingBanner.css('background', background);
		var objects = JSON.parse(bannerData.json);
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

		var difx = (scalex * width - width) / 2;
		var dify = (scaley * height - height) / 2;

		var top = Number(style.top.split('px')[0]) * windowy - dify;
		var left = Number(style.left.split('px')[0]) * windowx - difx;
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
			var tag = $('<textArea type="text" class="textarea" disabled></textArea>');
			
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

			tag.css({
				top: textTop,
				left: textLeft
			});


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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJmdW5jdGlvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gbG9hZEJhbm5lcihiYW5uZXJEYXRhLCB3b3JraW5nQmFubmVyLCB3aW5kb3d4LCB3aW5kb3d5KSB7XHJcblx0dHJ5IHtcclxuXHRcdGJhbm5lckRhdGEgPSBKU09OLnBhcnNlKGJhbm5lckRhdGEpO1xyXG5cdFx0dmFyIGJhY2tncm91bmQgPSBiYW5uZXJEYXRhLmJhY2tncm91bmQ7XHJcblx0XHR3b3JraW5nQmFubmVyLmNzcygnYmFja2dyb3VuZCcsIGJhY2tncm91bmQpO1xyXG5cdFx0dmFyIG9iamVjdHMgPSBKU09OLnBhcnNlKGJhbm5lckRhdGEuanNvbik7XHJcblx0fSBjYXRjaChlcnIpIHtcclxuXHRcdHdvcmtpbmdCYW5uZXIuY3NzKCdiYWNrZ3JvdW5kJywgJ25vbmUnKTtcclxuXHRcdHdvcmtpbmdCYW5uZXIuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyM1NDUyNTInKTtcclxuXHRcdFxyXG5cdFx0Y29uc29sZS5sb2coJ29iamVjdHMgZG9lc25cXCd0IGV4aXN0cycpO1xyXG5cclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdG9iamVjdHMuZm9yRWFjaChmdW5jdGlvbihvYmopIHtcclxuXHRcdHZhciB0eXBlID0gb2JqLnRhZztcclxuXHRcdHZhciBzcmMgPSBvYmouc3JjO1xyXG5cdFx0dmFyIHZpZGVvVHlwZSA9IG9iai52aWRlb1R5cGU7XHJcblx0XHR2YXIgd2lkdGggPSBvYmoud2lkdGggKiB3aW5kb3d4O1xyXG5cdFx0dmFyIGhlaWdodCA9IG9iai5oZWlnaHQgKiB3aW5kb3d5O1xyXG5cclxuXHRcdHZhciBzdHlsZSA9IGJ1aWxkQ3NzKG9iai5zdHlsZSk7XHJcblx0XHR2YXIgZnJlZXRyYW5zID0gb2JqLmZyZWV0cmFucztcclxuXHRcdHZhciBhbmltYXRpb24gPSBvYmouYW5pbWF0aW9uO1xyXG5cclxuXHRcdHZhciB0ZXh0ID0gb2JqLnRleHQ7XHJcblx0XHR2YXIgZm9udCA9IG9iai5mb250O1xyXG5cdFx0dmFyIHJvd3MgPSBvYmoucm93cztcclxuXHRcdHZhciBjb2xzID0gb2JqLmNvbHM7XHJcblxyXG5cdFx0dmFyIGZyZWV0cmFucyA9IG9iai5mcmVldHJhbnM7XHJcblx0XHR2YXIgc2NhbGV4ID0gZnJlZXRyYW5zLnNjYWxleDtcclxuXHRcdHZhciBzY2FsZXkgPSBmcmVldHJhbnMuc2NhbGV5O1xyXG5cdFx0dmFyIGFuZ2xlID0gZnJlZXRyYW5zLmFuZ2xlO1xyXG5cclxuXHRcdHZhciBkaWZ4ID0gKHNjYWxleCAqIHdpZHRoIC0gd2lkdGgpIC8gMjtcclxuXHRcdHZhciBkaWZ5ID0gKHNjYWxleSAqIGhlaWdodCAtIGhlaWdodCkgLyAyO1xyXG5cclxuXHRcdHZhciB0b3AgPSBOdW1iZXIoc3R5bGUudG9wLnNwbGl0KCdweCcpWzBdKSAqIHdpbmRvd3kgLSBkaWZ5O1xyXG5cdFx0dmFyIGxlZnQgPSBOdW1iZXIoc3R5bGUubGVmdC5zcGxpdCgncHgnKVswXSkgKiB3aW5kb3d4IC0gZGlmeDtcclxuXHRcdHZhciB0ZXh0VG9wID0gTnVtYmVyKHN0eWxlLnRvcC5zcGxpdCgncHgnKVswXSkgKiB3aW5kb3d5O1xyXG5cdFx0dmFyIHRleHRMZWZ0ID0gTnVtYmVyKHN0eWxlLmxlZnQuc3BsaXQoJ3B4JylbMF0pICogd2luZG93eDtcclxuXHJcblx0XHR2YXIgd2lkdGggPSB3aWR0aCAqIHNjYWxleDtcclxuXHRcdHZhciBoZWlnaHQgPSBoZWlnaHQgKiBzY2FsZXk7XHJcblx0XHR2YXIgekluZGV4ID0gc3R5bGVbJ3otaW5kZXgnXTtcclxuXHRcdHZhciB2aWRlb1R5cGUgPSBvYmoudmlkZW9UeXBlO1xyXG5cdFx0dmFyIGFjdGl2ZVRhZztcclxuXHJcblx0XHRpZih0eXBlID09PSAnaW1nJykge1xyXG5cdFx0XHR2YXIgdGFnID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKSk7XHJcblxyXG5cdFx0XHR0YWcuYXR0cih7XHJcblx0XHRcdFx0J3NyYyc6IHNyY1xyXG5cdFx0XHR9KS5jc3Moe1xyXG5cdFx0XHRcdCdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXHJcblx0XHRcdFx0J3RvcCc6IHRvcCxcclxuXHRcdFx0XHQnbGVmdCc6IGxlZnQsXHJcblx0XHRcdFx0J3dpZHRoJzogd2lkdGgsXHJcblx0XHRcdFx0J2hlaWdodCc6IGhlaWdodCxcclxuXHRcdFx0XHQnei1pbmRleCc6IHpJbmRleFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHRcdHRhZy5jc3MoeyAndHJhbnNmb3JtJzogJ3JvdGF0ZSgnKyBhbmdsZSArJ2RlZyknICxcclxuXHRcdFx0XHRcdCd0cmFuc2Zvcm0tb3JpZ2luJzogJzUwJSA1MCUgNTBweCcgLFxyXG5cdFx0XHRcdFx0Jy1tcy10cmFuc2Zvcm0nOiAncm90YXRlKCcrIGFuZ2xlICsnZGVnKScgLFxyXG5cdFx0XHRcdFx0Jy1tcy10cmFuc2Zvcm0tb3JpZ2luJzogJzUwJSA1MCUgNTBweCcgLFxyXG5cdFx0XHRcdFx0Jy13ZWJraXQtdHJhbnNmb3JtJzogJ3JvdGF0ZSgnKyBhbmdsZSArJ2RlZyknICxcclxuXHRcdFx0XHRcdCctd2Via2l0LXRyYW5zZm9ybS1vcmlnaW4nOiAnNTAlIDUwJSA1MHB4JyB9KTtcclxuXHJcblx0XHRcdGFjdGl2ZVRhZyA9IHRhZztcclxuXHJcblx0XHR9IGVsc2UgaWYodHlwZSA9PT0gJ3RleHRBcmVhJykge1xyXG5cdFx0XHR2YXIgdGFnID0gJCgnPHRleHRBcmVhIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ0ZXh0YXJlYVwiIGRpc2FibGVkPjwvdGV4dEFyZWE+Jyk7XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgaGVpZ2h0ID0gTnVtYmVyKHN0eWxlLmhlaWdodC5zcGxpdCgncHgnKVswXSk7XHJcblx0XHRcdHZhciB3aWR0aCA9IE51bWJlcihzdHlsZS53aWR0aC5zcGxpdCgncHgnKVswXSk7XHJcblxyXG5cdFx0XHR2YXIgZGlmeSA9ICh3aW5kb3d5ICogaGVpZ2h0IC0gaGVpZ2h0KSAvIDI7XHJcblx0XHRcdHZhciBkaWZ4ID0gKHdpbmRvd3ggKiB3aWR0aCAtIHdpZHRoKSAvIDI7XHJcblxyXG5cdFx0XHRzdHlsZS50b3AgPSB0ZXh0VG9wICsgZGlmeTtcclxuXHRcdFx0c3R5bGUubGVmdCA9IHRleHRMZWZ0ICsgZGlmeDtcclxuXHJcblx0XHRcdHRhZy5jc3Moe1xyXG5cdFx0XHRcdCd0cmFuc2Zvcm0nOiAnc2NhbGUoJysgd2luZG93eCArJywnKyB3aW5kb3d5ICsnKSdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0YWcuY3NzKHN0eWxlKVxyXG5cdFx0XHQuaHRtbCh0ZXh0KVxyXG5cclxuXHRcdFx0YWN0aXZlVGFnID0gdGFnO1xyXG5cclxuXHRcdH0gIGVsc2UgaWYodHlwZSA9PT0gJ3NoYXBlJykge1xyXG5cdFx0XHR2YXIgZmlsbCA9IG9iai5maWxsO1xyXG5cdFx0XHR2YXIgc3Ryb2tlID0gb2JqLnN0cm9rZTtcclxuXHRcdFx0dmFyIHRhZyA9ICQoJzxkaXYgY2xhc3M9XCJzaGFwZVwiIGRhdGEtc3JjPVwiJysgc3JjICsnXCIgZGF0YS1maWxsPVwiJysgZmlsbCArJ1wiPjxpbWcgc3JjPVwiJysgc3JjICsnXCI+PC9pbWc+PC9kaXY+Jyk7XHJcblx0XHRcdFxyXG5cdFx0XHRjb252ZXJ0U1ZHKHRhZy5maW5kKCdpbWcnKSwgZmlsbCwgc3Ryb2tlLCB3aWR0aCAvIHNjYWxleCwgaGVpZ2h0IC8gc2NhbGV5KTtcclxuXHJcblx0XHRcdHRhZy5jc3Moc3R5bGUpO1xyXG5cclxuXHRcdFx0dGFnLmNzcyh7XHJcblx0XHRcdFx0dG9wOiB0ZXh0VG9wLFxyXG5cdFx0XHRcdGxlZnQ6IHRleHRMZWZ0XHJcblx0XHRcdH0pO1xyXG5cclxuXHJcblx0XHRcdGFjdGl2ZVRhZyA9IHRhZztcclxuXHJcblx0XHR9IGVsc2UgaWYodHlwZSA9PT0gJ2F1ZGlvJykge1xyXG5cdFx0XHR2YXIgdGFnID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpKTtcclxuXHRcdFx0dmFyIGF0dHJpYnV0ZXMgPSBvYmoucHJvcChcImF0dHJpYnV0ZXNcIik7XHJcblx0XHRcdHRhZy5hdHRyKCdzcmMnLCAnL3VwbG9hZHMvYXVkaW9zL3F1ZWVuLm1wMycpO1xyXG5cclxuXHRcdFx0dGFnWzBdLnBsYXkoKTtcclxuXHJcblx0XHRcdGFjdGl2ZVRhZyA9IHRhZztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciB0YWc7XHJcblxyXG5cdFx0XHRpZih2aWRlb1R5cGUgPT09ICd1cGxvYWQnKSB7XHJcblx0XHRcdFx0dGFnID0gJCgnPHZpZGVvPjwvdmlkZW8+Jyk7XHJcblxyXG5cdFx0XHRcdHZhciBzb3VyY2UgPSAkKCc8c291cmNlPjwvc291cmNlPicpO1xyXG5cdFx0XHRcdHNvdXJjZS5hdHRyKHsgdHlwZSA6ICd2aWRlby9tcDQnICwgc3JjIDogJy91cGxvYWRzL3ZpZGVvcy90ZXN0Lm1wNCcgfSk7XHJcblx0XHRcdFx0dGFnLmFwcGVuZChzb3VyY2UpO1xyXG5cdFx0XHRcdHRhZy5hcHBlbmQoJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSB2aWRlbyB0YWcuJyk7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYodmlkZW9UeXBlID09PSAneW91dHViZScpIHtcclxuXHRcdFx0XHR0YWcgPSAkKCc8aWZyYW1lPjwvaWZyYW1lPicpO1xyXG5cclxuXHRcdFx0XHR0YWcuYXR0cih7XHJcblx0XHRcdFx0XHRzcmM6IHNyY1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRhZyA9ICQoJzxpZnJhbWU+PC9pZnJhbWU+Jyk7XHJcblxyXG5cdFx0XHRcdHRhZy5hdHRyKHtcclxuXHRcdFx0XHRcdHNyYzogc3JjXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0YWcuY3NzKHsgJ3RyYW5zZm9ybSc6ICdyb3RhdGUoJysgYW5nbGUgKydkZWcpJyAsXHJcblx0XHRcdFx0XHQndHJhbnNmb3JtLW9yaWdpbic6ICc1MCUgNTAlJyAsXHJcblx0XHRcdFx0XHQnLW1zLXRyYW5zZm9ybSc6ICdyb3RhdGUoJysgYW5nbGUgKydkZWcpJyAsXHJcblx0XHRcdFx0XHQnLW1zLXRyYW5zZm9ybS1vcmlnaW4nOiAnNTAlIDUwJScgLFxyXG5cdFx0XHRcdFx0Jy13ZWJraXQtdHJhbnNmb3JtJzogJ3JvdGF0ZSgnKyBhbmdsZSArJ2RlZyknICxcclxuXHRcdFx0XHRcdCctd2Via2l0LXRyYW5zZm9ybS1vcmlnaW4nOiAnNTAlIDUwJScgfSk7XHJcblxyXG5cdFx0XHR0YWcuY3NzKHtcclxuXHRcdFx0XHQncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxyXG5cdFx0XHRcdCd0b3AnOiB0b3AsXHJcblx0XHRcdFx0J2xlZnQnOiBsZWZ0LFxyXG5cdFx0XHRcdCd3aWR0aCc6IHdpZHRoLFxyXG5cdFx0XHRcdCdoZWlnaHQnOiBoZWlnaHQsXHJcblx0XHRcdFx0J3otaW5kZXgnOiB6SW5kZXhcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRhY3RpdmVUYWcgPSB0YWc7XHJcblx0XHR9XHJcblx0XHQvLyBhZGQgdGFnIHRvIHByZXZpZXdcclxuXHRcdHdvcmtpbmdCYW5uZXIuYXBwZW5kKGFjdGl2ZVRhZyk7XHJcblx0XHQvLyBhbmltYXRpb25cclxuXHRcdHZhciBlbnRlckFuaW1hdGlvbiA9IG9iai5hbmltYXRpb24uZW50ZXI7XHJcblx0XHR2YXIgZXhpdEFuaW1hdGlvbiA9IG9iai5hbmltYXRpb24uZXhpdDtcclxuXHJcblx0XHRpZihlbnRlckFuaW1hdGlvbikge1xyXG5cdFx0XHR2YXIgc3RhcnRUaW1lID0gZW50ZXJBbmltYXRpb24uc3RhcnQ7XHJcblx0XHRcdHZhciBkZWxheSA9IGVudGVyQW5pbWF0aW9uLmRlbGF5O1xyXG5cdFx0XHR2YXIgdHlwZSA9IGVudGVyQW5pbWF0aW9uLnR5cGU7XHJcblx0XHRcdFxyXG5cdFx0XHRpZihvYmoudGFnID09PSAndGV4dEFyZWEnKSB7XHJcblx0XHRcdFx0c2NhbGV4ID0gd2luZG93eDtcclxuXHRcdFx0XHRzY2FsZXkgPSB3aW5kb3d5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihvYmoudGFnID09PSAnc2hhcGUnKSB7XHJcblx0XHRcdFx0c2NhbGV4ID0gb2JqLmZyZWV0cmFucy5zY2FsZXg7XHJcblx0XHRcdFx0c2NhbGV5ID0gb2JqLmZyZWV0cmFucy5zY2FsZXk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGdlbmVyYXRlQW5pbWF0aW9uKGFjdGl2ZVRhZywgdHlwZSwgc3RhcnRUaW1lLCBkZWxheSwgc2NhbGV4LCBzY2FsZXksIHdpZHRoLCBoZWlnaHQpO1xyXG5cdFx0fVxyXG5cdFx0aWYoZXhpdEFuaW1hdGlvbikge1xyXG5cdFx0XHR2YXIgdHlwZSA9IGV4aXRBbmltYXRpb24udHlwZTtcclxuXHRcdFx0dmFyIHN0YXJ0VGltZSA9IGV4aXRBbmltYXRpb24uc3RhcnQ7XHJcblx0XHRcdHZhciBkZWxheSA9IGV4aXRBbmltYXRpb24uZGVsYXk7XHJcblx0XHRcdHZhciBlbnRlclN0YXJ0VGltZSA9IGVudGVyQW5pbWF0aW9uLnN0YXJ0O1xyXG5cdFx0XHR2YXIgZW50ZXJEZWxheSA9IGVudGVyQW5pbWF0aW9uLmRlbGF5O1xyXG5cdFx0XHRcclxuXHRcdFx0aWYob2JqLnRhZyA9PT0gJ3RleHRBcmVhJykge1xyXG5cdFx0XHRcdHNjYWxleCA9IHdpbmRvd3g7XHJcblx0XHRcdFx0c2NhbGV5ID0gd2luZG93eTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYob2JqLnRhZyA9PT0gJ3NoYXBlJykge1xyXG5cdFx0XHRcdHNjYWxleCA9IG9iai5mcmVldHJhbnMuc2NhbGV4O1xyXG5cdFx0XHRcdHNjYWxleSA9IG9iai5mcmVldHJhbnMuc2NhbGV5O1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgc3VtID0gTnVtYmVyKGVudGVyU3RhcnRUaW1lKSAqIDEwMDAgKyBOdW1iZXIoZW50ZXJEZWxheSkgKiAxMDAwICsgMTAwMDsgXHJcblx0XHRcdGdlbmVyYXRlQW5pbWF0aW9uKGFjdGl2ZVRhZywgdHlwZSwgc3RhcnRUaW1lLCBkZWxheSwgc2NhbGV4LCBzY2FsZXksIHN1bSwgd2lkdGgsIGhlaWdodCk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07Il0sImZpbGUiOiJmdW5jdGlvbnMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

// returns random x and y cordinate
function generateRandom(slide) {
	var randomLeft = Math.round(slide.width() / 2 - (Math.random() * 150));
	var randomTop  = Math.round(slide.height() / 2 - (Math.random() * 150));

	var object = {
		x: randomLeft,
		y: randomTop
	};

	return object;
};

function rangeRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
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

function getRotationDegrees(obj) {
	var matrix = obj.css("-webkit-transform") ||
	obj.css("-moz-transform")    ||
	obj.css("-ms-transform")     ||
	obj.css("-o-transform")      ||
	obj.css("transform");
	if(matrix !== 'none') {
		var values = matrix.split('(')[1].split(')')[0].split(',');
		var a = values[0];
		var b = values[1];
		var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
	} else { var angle = 0; }
	return (angle < 0) ? angle + 360 : angle;
};

function replaceAll(str, find, replace) {
	var i = str.indexOf(find);
	if (i > -1) {
		str = str.replace(find, replace);
		i = i + replace.length;
		var st2 = str.substring(i);
		if(st2.indexOf(find) > -1){
			str = str.substring(0,i) + replaceAll(st2, find, replace);
		}
	}
	return str;
};

function lightSlider(ul) {
    ul.lightSlider({
        item:5,
        loop:false,
        keyPress:true,
        pager:false,
        adaptiveHeight: true
    });
};

function getMouseEventCaretRange(evt) {
    var range, x = evt.clientX, y = evt.clientY;
    
        // Try the simple IE way first
        if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToPoint(x, y);
        }
    
    else if (typeof document.createRange != "undefined") {
        // Try Mozilla's rangeOffset and rangeParent properties, which are exactly what we want
        
        if (typeof evt.rangeParent != "undefined") {
            range = document.createRange();
            range.setStart(evt.rangeParent, evt.rangeOffset);
            range.collapse(true);
        }
    
        // Try the standards-based way next
        else if (document.caretPositionFromPoint) {
            var pos = document.caretPositionFromPoint(x, y);
            range = document.createRange();
            range.setStart(pos.offsetNode, pos.offset);
            range.collapse(true);
        }
    
        // Next, the WebKit way
        else if (document.caretRangeFromPoint) {
            range = document.caretRangeFromPoint(x, y);
        }
    }
    
    return range;
}

function selectRange(range) {
    if (range) {
        if (typeof range.select != "undefined") {
            range.select();
        } else if (typeof window.getSelection != "undefined") {
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJnbG9iYWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcmV0dXJucyByYW5kb20geCBhbmQgeSBjb3JkaW5hdGVcbmZ1bmN0aW9uIGdlbmVyYXRlUmFuZG9tKHNsaWRlKSB7XG5cdHZhciByYW5kb21MZWZ0ID0gTWF0aC5yb3VuZChzbGlkZS53aWR0aCgpIC8gMiAtIChNYXRoLnJhbmRvbSgpICogMTUwKSk7XG5cdHZhciByYW5kb21Ub3AgID0gTWF0aC5yb3VuZChzbGlkZS5oZWlnaHQoKSAvIDIgLSAoTWF0aC5yYW5kb20oKSAqIDE1MCkpO1xuXG5cdHZhciBvYmplY3QgPSB7XG5cdFx0eDogcmFuZG9tTGVmdCxcblx0XHR5OiByYW5kb21Ub3Bcblx0fTtcblxuXHRyZXR1cm4gb2JqZWN0O1xufTtcblxuZnVuY3Rpb24gcmFuZ2VSYW5kb20obWluLCBtYXgpIHtcbiAgICByZXR1cm4gbWluICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKTtcbn07XG5cbmZ1bmN0aW9uIGJ1aWxkQ3NzKHN0eWxlKSB7XG5cdHZhciBzdHlsZXMgPSBzdHlsZS5zcGxpdCgnOycpO1xuXHR2YXIgYnVpbGRDc3MgPSB7fTtcblx0XG5cdHN0eWxlcy5mb3JFYWNoKGZ1bmN0aW9uKHN0eWxlKSB7XG5cdFx0dmFyIHByb3AgPSBzdHlsZS5zcGxpdCgnOicpWzBdO1xuXHRcdHZhciB2YWwgID0gc3R5bGUuc3BsaXQoJzonKVsxXTtcblx0XHRcblx0XHRpZihwcm9wICYmIHZhbCkge1xuXHRcdFx0cHJvcCA9IHByb3AudHJpbSgpO1xuXHRcdFx0dmFsICA9IHZhbC50cmltKCk7XG5cdFx0XHRidWlsZENzc1twcm9wXSA9IHZhbDtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBidWlsZENzcztcbn07XG5cbmZ1bmN0aW9uIGdldFJvdGF0aW9uRGVncmVlcyhvYmopIHtcblx0dmFyIG1hdHJpeCA9IG9iai5jc3MoXCItd2Via2l0LXRyYW5zZm9ybVwiKSB8fFxuXHRvYmouY3NzKFwiLW1vei10cmFuc2Zvcm1cIikgICAgfHxcblx0b2JqLmNzcyhcIi1tcy10cmFuc2Zvcm1cIikgICAgIHx8XG5cdG9iai5jc3MoXCItby10cmFuc2Zvcm1cIikgICAgICB8fFxuXHRvYmouY3NzKFwidHJhbnNmb3JtXCIpO1xuXHRpZihtYXRyaXggIT09ICdub25lJykge1xuXHRcdHZhciB2YWx1ZXMgPSBtYXRyaXguc3BsaXQoJygnKVsxXS5zcGxpdCgnKScpWzBdLnNwbGl0KCcsJyk7XG5cdFx0dmFyIGEgPSB2YWx1ZXNbMF07XG5cdFx0dmFyIGIgPSB2YWx1ZXNbMV07XG5cdFx0dmFyIGFuZ2xlID0gTWF0aC5yb3VuZChNYXRoLmF0YW4yKGIsIGEpICogKDE4MC9NYXRoLlBJKSk7XG5cdH0gZWxzZSB7IHZhciBhbmdsZSA9IDA7IH1cblx0cmV0dXJuIChhbmdsZSA8IDApID8gYW5nbGUgKyAzNjAgOiBhbmdsZTtcbn07XG5cbmZ1bmN0aW9uIHJlcGxhY2VBbGwoc3RyLCBmaW5kLCByZXBsYWNlKSB7XG5cdHZhciBpID0gc3RyLmluZGV4T2YoZmluZCk7XG5cdGlmIChpID4gLTEpIHtcblx0XHRzdHIgPSBzdHIucmVwbGFjZShmaW5kLCByZXBsYWNlKTtcblx0XHRpID0gaSArIHJlcGxhY2UubGVuZ3RoO1xuXHRcdHZhciBzdDIgPSBzdHIuc3Vic3RyaW5nKGkpO1xuXHRcdGlmKHN0Mi5pbmRleE9mKGZpbmQpID4gLTEpe1xuXHRcdFx0c3RyID0gc3RyLnN1YnN0cmluZygwLGkpICsgcmVwbGFjZUFsbChzdDIsIGZpbmQsIHJlcGxhY2UpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gc3RyO1xufTtcblxuZnVuY3Rpb24gbGlnaHRTbGlkZXIodWwpIHtcbiAgICB1bC5saWdodFNsaWRlcih7XG4gICAgICAgIGl0ZW06NSxcbiAgICAgICAgbG9vcDpmYWxzZSxcbiAgICAgICAga2V5UHJlc3M6dHJ1ZSxcbiAgICAgICAgcGFnZXI6ZmFsc2UsXG4gICAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlXG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBnZXRNb3VzZUV2ZW50Q2FyZXRSYW5nZShldnQpIHtcbiAgICB2YXIgcmFuZ2UsIHggPSBldnQuY2xpZW50WCwgeSA9IGV2dC5jbGllbnRZO1xuICAgIFxuICAgICAgICAvLyBUcnkgdGhlIHNpbXBsZSBJRSB3YXkgZmlyc3RcbiAgICAgICAgaWYgKGRvY3VtZW50LmJvZHkuY3JlYXRlVGV4dFJhbmdlKSB7XG4gICAgICAgICAgICByYW5nZSA9IGRvY3VtZW50LmJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICAgICAgICByYW5nZS5tb3ZlVG9Qb2ludCh4LCB5KTtcbiAgICAgICAgfVxuICAgIFxuICAgIGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC5jcmVhdGVSYW5nZSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIC8vIFRyeSBNb3ppbGxhJ3MgcmFuZ2VPZmZzZXQgYW5kIHJhbmdlUGFyZW50IHByb3BlcnRpZXMsIHdoaWNoIGFyZSBleGFjdGx5IHdoYXQgd2Ugd2FudFxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBldnQucmFuZ2VQYXJlbnQgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoZXZ0LnJhbmdlUGFyZW50LCBldnQucmFuZ2VPZmZzZXQpO1xuICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgLy8gVHJ5IHRoZSBzdGFuZGFyZHMtYmFzZWQgd2F5IG5leHRcbiAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnQuY2FyZXRQb3NpdGlvbkZyb21Qb2ludCkge1xuICAgICAgICAgICAgdmFyIHBvcyA9IGRvY3VtZW50LmNhcmV0UG9zaXRpb25Gcm9tUG9pbnQoeCwgeSk7XG4gICAgICAgICAgICByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgICAgICByYW5nZS5zZXRTdGFydChwb3Mub2Zmc2V0Tm9kZSwgcG9zLm9mZnNldCk7XG4gICAgICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICAvLyBOZXh0LCB0aGUgV2ViS2l0IHdheVxuICAgICAgICBlbHNlIGlmIChkb2N1bWVudC5jYXJldFJhbmdlRnJvbVBvaW50KSB7XG4gICAgICAgICAgICByYW5nZSA9IGRvY3VtZW50LmNhcmV0UmFuZ2VGcm9tUG9pbnQoeCwgeSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJhbmdlO1xufVxuXG5mdW5jdGlvbiBzZWxlY3RSYW5nZShyYW5nZSkge1xuICAgIGlmIChyYW5nZSkge1xuICAgICAgICBpZiAodHlwZW9mIHJhbmdlLnNlbGVjdCAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICByYW5nZS5zZWxlY3QoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93LmdldFNlbGVjdGlvbiAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB2YXIgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXSwiZmlsZSI6Imdsb2JhbC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

function generateAnimation(tag, animation, startTime, delay, scalex, scaley, sum) {
	try {
		var embedBanner = $('.animation-banner');
		startTime = (Number(startTime) + 0.5) * 1000;
		delay = (Number(delay) + 0.5 ) * 1000;
		sum = sum ? sum : 0;
		eval(animation + '(tag, embedBanner, startTime, delay, scalex, scaley, sum)');
	} catch(err) {
		// console.log('animation doesn\'t exists', err);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmltYXRpb25zL2FuaW1hdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBnZW5lcmF0ZUFuaW1hdGlvbih0YWcsIGFuaW1hdGlvbiwgc3RhcnRUaW1lLCBkZWxheSwgc2NhbGV4LCBzY2FsZXksIHN1bSkge1xyXG5cdHRyeSB7XHJcblx0XHR2YXIgZW1iZWRCYW5uZXIgPSAkKCcuYW5pbWF0aW9uLWJhbm5lcicpO1xyXG5cdFx0c3RhcnRUaW1lID0gKE51bWJlcihzdGFydFRpbWUpICsgMC41KSAqIDEwMDA7XHJcblx0XHRkZWxheSA9IChOdW1iZXIoZGVsYXkpICsgMC41ICkgKiAxMDAwO1xyXG5cdFx0c3VtID0gc3VtID8gc3VtIDogMDtcclxuXHRcdGV2YWwoYW5pbWF0aW9uICsgJyh0YWcsIGVtYmVkQmFubmVyLCBzdGFydFRpbWUsIGRlbGF5LCBzY2FsZXgsIHNjYWxleSwgc3VtKScpO1xyXG5cdH0gY2F0Y2goZXJyKSB7XHJcblx0XHQvLyBjb25zb2xlLmxvZygnYW5pbWF0aW9uIGRvZXNuXFwndCBleGlzdHMnLCBlcnIpO1xyXG5cdH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIG1heEFuaW1hdGlvbkR1cmF0aW9uKGRhdGEpIHtcclxuXHR2YXIgbWF4QW5pbWF0aW9uVGltZSA9IDIwMDA7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuXHRcdHRpbWUgPSAwO1xyXG5cdFx0b2JqZWN0ID0gZGF0YVtpXTtcclxuXHRcdGlmKG9iamVjdC5hbmltYXRpb24pIHtcclxuXHRcdFx0dmFyIGVudGVyID0gb2JqZWN0LmFuaW1hdGlvbi5lbnRlcjtcclxuXHRcdFx0dmFyIGV4aXQgPSBvYmplY3QuYW5pbWF0aW9uLmV4aXQ7XHJcblxyXG5cdFx0XHRpZihlbnRlci5zdGFydCkge1xyXG5cdFx0XHRcdHRpbWUgKz0gKE51bWJlcihlbnRlci5zdGFydCkgKyAwLjUpICogMTAwMDtcclxuXHRcdFx0XHR0aW1lICs9IChOdW1iZXIoZW50ZXIuZGVsYXkpICsgMC41KSAqIDEwMDA7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYoZXhpdC5zdGFydCkge1xyXG5cdFx0XHRcdHRpbWUgKz0gKE51bWJlcihleGl0LnN0YXJ0KSArIDAuNSkgKiAxMDAwO1xyXG5cdFx0XHRcdHRpbWUgKz0gKE51bWJlcihleGl0LmRlbGF5KSArIDAuNSkgKiAxMDAwO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmKHRpbWUgPiBtYXhBbmltYXRpb25UaW1lKSB7XHJcblx0XHRcdFx0bWF4QW5pbWF0aW9uVGltZSA9IHRpbWU7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbWF4QW5pbWF0aW9uVGltZSArIDIwMDA7XHJcbn07XHJcblxyXG5mdW5jdGlvbiB3aG9sZUFuaW1hdGlvblRpbWUocHJlc2VudGF0aW9uRGF0YSkge1xyXG5cdHZhciB3aG9sZVRpbWUgPSAxMDAwO1xyXG5cclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgcHJlc2VudGF0aW9uRGF0YS5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIG1heEFuaW1hdGlvblRpbWUgPSAyMDAwO1xyXG5cdFx0dmFyIGRhdGEgPSBwcmVzZW50YXRpb25EYXRhW2ldO1xyXG5cdFx0bWF4QW5pbWF0aW9uVGltZSA9IG1heEFuaW1hdGlvbkR1cmF0aW9uKGRhdGEpO1xyXG5cdFx0d2hvbGVUaW1lICs9IG1heEFuaW1hdGlvblRpbWU7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gd2hvbGVUaW1lO1xyXG59OyJdLCJmaWxlIjoiYW5pbWF0aW9ucy9hbmltYXRpb24uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

function flip(tag, slide, startTime, delay) {
	tag.css({
		'display': 'none'
	});

	setTimeout(function() {
		tag.fadeIn({ queue: false, duration: 'slow' });
		tag.addClass('animated flipInY', delay);
	}, startTime);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmltYXRpb25zL2NvbXBsZXgvZmxpcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBmbGlwKHRhZywgc2xpZGUsIHN0YXJ0VGltZSwgZGVsYXkpIHtcclxuXHR0YWcuY3NzKHtcclxuXHRcdCdkaXNwbGF5JzogJ25vbmUnXHJcblx0fSk7XHJcblxyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHR0YWcuZmFkZUluKHsgcXVldWU6IGZhbHNlLCBkdXJhdGlvbjogJ3Nsb3cnIH0pO1xyXG5cdFx0dGFnLmFkZENsYXNzKCdhbmltYXRlZCBmbGlwSW5ZJywgZGVsYXkpO1xyXG5cdH0sIHN0YXJ0VGltZSk7XHJcbn07Il0sImZpbGUiOiJhbmltYXRpb25zL2NvbXBsZXgvZmxpcC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

function hingle(tag, slide, startTime, delay) {
	setTimeout(function() {
		tag.addClass('animated hinge', delay);
	}, startTime);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmltYXRpb25zL2NvbXBsZXgvaGluZ2xlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGhpbmdsZSh0YWcsIHNsaWRlLCBzdGFydFRpbWUsIGRlbGF5KSB7XHJcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdHRhZy5hZGRDbGFzcygnYW5pbWF0ZWQgaGluZ2UnLCBkZWxheSk7XHJcblx0fSwgc3RhcnRUaW1lKTtcclxufTsiXSwiZmlsZSI6ImFuaW1hdGlvbnMvY29tcGxleC9oaW5nbGUuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

function lightSpeedIn(tag, slide, startTime, delay) {
	tag.css({
		'display': 'none'
	});

	setTimeout(function() {
		tag.fadeIn({ queue: false, duration: 'slow' });
		tag.addClass('animated lightSpeedIn', delay);
	}, startTime);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmltYXRpb25zL2NvbXBsZXgvbGlnaHRzcGVlZGluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGxpZ2h0U3BlZWRJbih0YWcsIHNsaWRlLCBzdGFydFRpbWUsIGRlbGF5KSB7XHJcblx0dGFnLmNzcyh7XHJcblx0XHQnZGlzcGxheSc6ICdub25lJ1xyXG5cdH0pO1xyXG5cclxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0dGFnLmZhZGVJbih7IHF1ZXVlOiBmYWxzZSwgZHVyYXRpb246ICdzbG93JyB9KTtcclxuXHRcdHRhZy5hZGRDbGFzcygnYW5pbWF0ZWQgbGlnaHRTcGVlZEluJywgZGVsYXkpO1xyXG5cdH0sIHN0YXJ0VGltZSk7XHJcbn07Il0sImZpbGUiOiJhbmltYXRpb25zL2NvbXBsZXgvbGlnaHRzcGVlZGluLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

function rollIn(tag, slide, startTime, delay) {
	tag.css({
		'opacity': 0
	});

	setTimeout(function() {
		tag.fadeIn({ queue: false, duration: 'slow' });
		tag.addClass('animated rollIn', delay);
	}, startTime);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmltYXRpb25zL2NvbXBsZXgvcm9sbGluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHJvbGxJbih0YWcsIHNsaWRlLCBzdGFydFRpbWUsIGRlbGF5KSB7XHJcblx0dGFnLmNzcyh7XHJcblx0XHQnb3BhY2l0eSc6IDBcclxuXHR9KTtcclxuXHJcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdHRhZy5mYWRlSW4oeyBxdWV1ZTogZmFsc2UsIGR1cmF0aW9uOiAnc2xvdycgfSk7XHJcblx0XHR0YWcuYWRkQ2xhc3MoJ2FuaW1hdGVkIHJvbGxJbicsIGRlbGF5KTtcclxuXHR9LCBzdGFydFRpbWUpO1xyXG59OyJdLCJmaWxlIjoiYW5pbWF0aW9ucy9jb21wbGV4L3JvbGxpbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

function rotate(tag, slide, startTime, delay) {
	tag.css({
		'opacity': 0
	});

	setTimeout(function() {
		tag.fadeIn({ queue: false, duration: 'slow' });
		tag.addClass('animated rotateIn', delay);
	}, startTime);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmltYXRpb25zL2NvbXBsZXgvcm90YXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHJvdGF0ZSh0YWcsIHNsaWRlLCBzdGFydFRpbWUsIGRlbGF5KSB7XHJcblx0dGFnLmNzcyh7XHJcblx0XHQnb3BhY2l0eSc6IDBcclxuXHR9KTtcclxuXHJcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdHRhZy5mYWRlSW4oeyBxdWV1ZTogZmFsc2UsIGR1cmF0aW9uOiAnc2xvdycgfSk7XHJcblx0XHR0YWcuYWRkQ2xhc3MoJ2FuaW1hdGVkIHJvdGF0ZUluJywgZGVsYXkpO1xyXG5cdH0sIHN0YXJ0VGltZSk7XHJcbn07Il0sImZpbGUiOiJhbmltYXRpb25zL2NvbXBsZXgvcm90YXRlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

function fadeIn(tag, slide, startTime, delay) {
	tag.css({
		'display': 'none'
	});

	setTimeout(function() {
		tag.fadeIn(delay);
	}, startTime);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmltYXRpb25zL2VudGVyL2ZhZGVpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBmYWRlSW4odGFnLCBzbGlkZSwgc3RhcnRUaW1lLCBkZWxheSkge1xyXG5cdHRhZy5jc3Moe1xyXG5cdFx0J2Rpc3BsYXknOiAnbm9uZSdcclxuXHR9KTtcclxuXHJcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdHRhZy5mYWRlSW4oZGVsYXkpO1xyXG5cdH0sIHN0YXJ0VGltZSk7XHJcbn07Il0sImZpbGUiOiJhbmltYXRpb25zL2VudGVyL2ZhZGVpbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

function flyFromBottom(tag, slide, startTimeAt, delay, scalex, scaley, width, height) {
	var top = tag.css('top');
	var outY =  slide.height();

	if(tag.hasClass('textarea')) {
		outY += tag.height() * scaley;
	}

	if(tag.hasClass('shape')) {
		outY += height * scaley;
	}

	tag.css({
		top: outY
	});

	setTimeout(function() {
		tag.animate({ 'top': top }, delay);
	}, startTimeAt);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmltYXRpb25zL2VudGVyL2ZseWZyb21ib3R0b20uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZmx5RnJvbUJvdHRvbSh0YWcsIHNsaWRlLCBzdGFydFRpbWVBdCwgZGVsYXksIHNjYWxleCwgc2NhbGV5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcblx0dmFyIHRvcCA9IHRhZy5jc3MoJ3RvcCcpO1xyXG5cdHZhciBvdXRZID0gIHNsaWRlLmhlaWdodCgpO1xyXG5cclxuXHRpZih0YWcuaGFzQ2xhc3MoJ3RleHRhcmVhJykpIHtcclxuXHRcdG91dFkgKz0gdGFnLmhlaWdodCgpICogc2NhbGV5O1xyXG5cdH1cclxuXHJcblx0aWYodGFnLmhhc0NsYXNzKCdzaGFwZScpKSB7XHJcblx0XHRvdXRZICs9IGhlaWdodCAqIHNjYWxleTtcclxuXHR9XHJcblxyXG5cdHRhZy5jc3Moe1xyXG5cdFx0dG9wOiBvdXRZXHJcblx0fSk7XHJcblxyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHR0YWcuYW5pbWF0ZSh7ICd0b3AnOiB0b3AgfSwgZGVsYXkpO1xyXG5cdH0sIHN0YXJ0VGltZUF0KTtcclxufTsiXSwiZmlsZSI6ImFuaW1hdGlvbnMvZW50ZXIvZmx5ZnJvbWJvdHRvbS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

function flyFromLeft(tag, slide, startTimeAt, delay, scalex, scaley, width, height) {
	var left = tag.css('left');
	var outX = -tag.width();

	if(tag.hasClass('textarea')) {
		outX = -tag.width() * scalex;
	}
	
	if(tag.hasClass('shape')) {
		outX = -width * scalex;
	}
	
	tag.css({
		left: outX
	});
	
	setTimeout(function() {
		tag.animate({ 'left': left }, delay);
	}, startTimeAt);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmltYXRpb25zL2VudGVyL2ZseWZyb21sZWZ0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGZseUZyb21MZWZ0KHRhZywgc2xpZGUsIHN0YXJ0VGltZUF0LCBkZWxheSwgc2NhbGV4LCBzY2FsZXksIHdpZHRoLCBoZWlnaHQpIHtcclxuXHR2YXIgbGVmdCA9IHRhZy5jc3MoJ2xlZnQnKTtcclxuXHR2YXIgb3V0WCA9IC10YWcud2lkdGgoKTtcclxuXHJcblx0aWYodGFnLmhhc0NsYXNzKCd0ZXh0YXJlYScpKSB7XHJcblx0XHRvdXRYID0gLXRhZy53aWR0aCgpICogc2NhbGV4O1xyXG5cdH1cclxuXHRcclxuXHRpZih0YWcuaGFzQ2xhc3MoJ3NoYXBlJykpIHtcclxuXHRcdG91dFggPSAtd2lkdGggKiBzY2FsZXg7XHJcblx0fVxyXG5cdFxyXG5cdHRhZy5jc3Moe1xyXG5cdFx0bGVmdDogb3V0WFxyXG5cdH0pO1xyXG5cdFxyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHR0YWcuYW5pbWF0ZSh7ICdsZWZ0JzogbGVmdCB9LCBkZWxheSk7XHJcblx0fSwgc3RhcnRUaW1lQXQpO1xyXG59OyJdLCJmaWxlIjoiYW5pbWF0aW9ucy9lbnRlci9mbHlmcm9tbGVmdC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

function flyFromRight(tag, slide, startTimeAt, delay, scalex, scaley, width, height) {
	var left = tag.css('left');
	var outX = slide.width();
	
	if(tag.hasClass('textarea')) {
		outX += width * scalex;
	}

	if(tag.hasClass('shape')) {
		outX += width * scalex;
	}

	tag.css({
		left: outX
	});

	setTimeout(function() {
		tag.animate({ 'left': left }, delay);
	}, startTimeAt);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmltYXRpb25zL2VudGVyL2ZseWZyb21yaWdodC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBmbHlGcm9tUmlnaHQodGFnLCBzbGlkZSwgc3RhcnRUaW1lQXQsIGRlbGF5LCBzY2FsZXgsIHNjYWxleSwgd2lkdGgsIGhlaWdodCkge1xyXG5cdHZhciBsZWZ0ID0gdGFnLmNzcygnbGVmdCcpO1xyXG5cdHZhciBvdXRYID0gc2xpZGUud2lkdGgoKTtcclxuXHRcclxuXHRpZih0YWcuaGFzQ2xhc3MoJ3RleHRhcmVhJykpIHtcclxuXHRcdG91dFggKz0gd2lkdGggKiBzY2FsZXg7XHJcblx0fVxyXG5cclxuXHRpZih0YWcuaGFzQ2xhc3MoJ3NoYXBlJykpIHtcclxuXHRcdG91dFggKz0gd2lkdGggKiBzY2FsZXg7XHJcblx0fVxyXG5cclxuXHR0YWcuY3NzKHtcclxuXHRcdGxlZnQ6IG91dFhcclxuXHR9KTtcclxuXHJcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdHRhZy5hbmltYXRlKHsgJ2xlZnQnOiBsZWZ0IH0sIGRlbGF5KTtcclxuXHR9LCBzdGFydFRpbWVBdCk7XHJcbn07Il0sImZpbGUiOiJhbmltYXRpb25zL2VudGVyL2ZseWZyb21yaWdodC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

function flyFromTop(tag, slide, startTimeAt, delay, scalex, scaley, width, height) {
	var top = tag.css('top');
	var outY = -tag.height();

	if(tag.hasClass('textarea')) {
		outY = -tag.height() * scaley;
	}

	if(tag.hasClass('shape')) {
		outY = -height * scaley;
	}

	tag.css({
		top: outY
	});

	setTimeout(function() {
		tag.animate({ 'top': top }, delay);
	}, startTimeAt);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmltYXRpb25zL2VudGVyL2ZseWZyb210b3AuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZmx5RnJvbVRvcCh0YWcsIHNsaWRlLCBzdGFydFRpbWVBdCwgZGVsYXksIHNjYWxleCwgc2NhbGV5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcblx0dmFyIHRvcCA9IHRhZy5jc3MoJ3RvcCcpO1xyXG5cdHZhciBvdXRZID0gLXRhZy5oZWlnaHQoKTtcclxuXHJcblx0aWYodGFnLmhhc0NsYXNzKCd0ZXh0YXJlYScpKSB7XHJcblx0XHRvdXRZID0gLXRhZy5oZWlnaHQoKSAqIHNjYWxleTtcclxuXHR9XHJcblxyXG5cdGlmKHRhZy5oYXNDbGFzcygnc2hhcGUnKSkge1xyXG5cdFx0b3V0WSA9IC1oZWlnaHQgKiBzY2FsZXk7XHJcblx0fVxyXG5cclxuXHR0YWcuY3NzKHtcclxuXHRcdHRvcDogb3V0WVxyXG5cdH0pO1xyXG5cclxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0dGFnLmFuaW1hdGUoeyAndG9wJzogdG9wIH0sIGRlbGF5KTtcclxuXHR9LCBzdGFydFRpbWVBdCk7XHJcbn07Il0sImZpbGUiOiJhbmltYXRpb25zL2VudGVyL2ZseWZyb210b3AuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

function popIn(tag, slide, startTime, delay, scalex, scaley) {
	tag.hide();

	setTimeout(function() {
		tag.show({ effect: 'scale' });
	}, startTime);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmltYXRpb25zL2VudGVyL3BvcGluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHBvcEluKHRhZywgc2xpZGUsIHN0YXJ0VGltZSwgZGVsYXksIHNjYWxleCwgc2NhbGV5KSB7XHJcblx0dGFnLmhpZGUoKTtcclxuXHJcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdHRhZy5zaG93KHsgZWZmZWN0OiAnc2NhbGUnIH0pO1xyXG5cdH0sIHN0YXJ0VGltZSk7XHJcbn07Il0sImZpbGUiOiJhbmltYXRpb25zL2VudGVyL3BvcGluLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

function fadeOut(tag, slide, startTime, delay, scalex, scaley, sum) {
	startTime += sum;

	setTimeout(function() {
		tag.fadeOut(delay);
	}, startTime);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmltYXRpb25zL2V4aXQvZmFkZW91dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBmYWRlT3V0KHRhZywgc2xpZGUsIHN0YXJ0VGltZSwgZGVsYXksIHNjYWxleCwgc2NhbGV5LCBzdW0pIHtcclxuXHRzdGFydFRpbWUgKz0gc3VtO1xyXG5cclxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0dGFnLmZhZGVPdXQoZGVsYXkpO1xyXG5cdH0sIHN0YXJ0VGltZSk7XHJcbn07Il0sImZpbGUiOiJhbmltYXRpb25zL2V4aXQvZmFkZW91dC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

function flyToBottom(tag, slide, startTimeAt, delay, scalex, scaley, sum) {
	var top = tag.css('top');
	var outY =  slide.height();
	startTimeAt += sum;

	if(tag.hasClass('textarea')) {
		outY += tag.height() * scaley;
	}

	setTimeout(function() {
		tag.animate({ 'top': outY }, delay);
	}, startTimeAt);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmltYXRpb25zL2V4aXQvZmx5dG9ib3R0b20uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZmx5VG9Cb3R0b20odGFnLCBzbGlkZSwgc3RhcnRUaW1lQXQsIGRlbGF5LCBzY2FsZXgsIHNjYWxleSwgc3VtKSB7XHJcblx0dmFyIHRvcCA9IHRhZy5jc3MoJ3RvcCcpO1xyXG5cdHZhciBvdXRZID0gIHNsaWRlLmhlaWdodCgpO1xyXG5cdHN0YXJ0VGltZUF0ICs9IHN1bTtcclxuXHJcblx0aWYodGFnLmhhc0NsYXNzKCd0ZXh0YXJlYScpKSB7XHJcblx0XHRvdXRZICs9IHRhZy5oZWlnaHQoKSAqIHNjYWxleTtcclxuXHR9XHJcblxyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHR0YWcuYW5pbWF0ZSh7ICd0b3AnOiBvdXRZIH0sIGRlbGF5KTtcclxuXHR9LCBzdGFydFRpbWVBdCk7XHJcbn07Il0sImZpbGUiOiJhbmltYXRpb25zL2V4aXQvZmx5dG9ib3R0b20uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

function flyToLeft(tag, slide, startTimeAt, delay, scalex, scaley, sum) {
	var left = tag.css('left');
	var outX = -tag.width();
	startTimeAt += sum;

	if(tag.hasClass('textarea')) {
		outX = -tag.width() * scalex;
	}
	
	setTimeout(function() {
		tag.animate({ 'left': outX }, delay);
	}, startTimeAt);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmltYXRpb25zL2V4aXQvZmx5dG9sZWZ0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGZseVRvTGVmdCh0YWcsIHNsaWRlLCBzdGFydFRpbWVBdCwgZGVsYXksIHNjYWxleCwgc2NhbGV5LCBzdW0pIHtcclxuXHR2YXIgbGVmdCA9IHRhZy5jc3MoJ2xlZnQnKTtcclxuXHR2YXIgb3V0WCA9IC10YWcud2lkdGgoKTtcclxuXHRzdGFydFRpbWVBdCArPSBzdW07XHJcblxyXG5cdGlmKHRhZy5oYXNDbGFzcygndGV4dGFyZWEnKSkge1xyXG5cdFx0b3V0WCA9IC10YWcud2lkdGgoKSAqIHNjYWxleDtcclxuXHR9XHJcblx0XHJcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdHRhZy5hbmltYXRlKHsgJ2xlZnQnOiBvdXRYIH0sIGRlbGF5KTtcclxuXHR9LCBzdGFydFRpbWVBdCk7XHJcbn07XHJcbiJdLCJmaWxlIjoiYW5pbWF0aW9ucy9leGl0L2ZseXRvbGVmdC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

function flyToRight(tag, slide, startTimeAt, delay, scalex, scaley, sum) {
	var left = tag.css('left');
	var outX = slide.width();
	startTimeAt += sum;

	if(tag.hasClass('textarea')) {
		outX += tag.width() * scalex;
	}

	setTimeout(function() {
		tag.animate({ 'left': outX }, delay);
	}, startTimeAt);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmltYXRpb25zL2V4aXQvZmx5dG9yaWdodC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBmbHlUb1JpZ2h0KHRhZywgc2xpZGUsIHN0YXJ0VGltZUF0LCBkZWxheSwgc2NhbGV4LCBzY2FsZXksIHN1bSkge1xyXG5cdHZhciBsZWZ0ID0gdGFnLmNzcygnbGVmdCcpO1xyXG5cdHZhciBvdXRYID0gc2xpZGUud2lkdGgoKTtcclxuXHRzdGFydFRpbWVBdCArPSBzdW07XHJcblxyXG5cdGlmKHRhZy5oYXNDbGFzcygndGV4dGFyZWEnKSkge1xyXG5cdFx0b3V0WCArPSB0YWcud2lkdGgoKSAqIHNjYWxleDtcclxuXHR9XHJcblxyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHR0YWcuYW5pbWF0ZSh7ICdsZWZ0Jzogb3V0WCB9LCBkZWxheSk7XHJcblx0fSwgc3RhcnRUaW1lQXQpO1xyXG59OyJdLCJmaWxlIjoiYW5pbWF0aW9ucy9leGl0L2ZseXRvcmlnaHQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

function flyToTop(tag, slide, startTimeAt, delay, scalex, scaley, sum) {
	var top = tag.css('top');
	var outY = -tag.height();
	startTimeAt += sum;
	startTimeAt += 500;

	if(tag.hasClass('textarea')) {
		outY = -tag.height() * scaley;
	}

	tag.css({
		top: outY
	});

	setTimeout(function() {
		tag.animate({ 'top': outY }, delay);
	}, startTimeAt);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmltYXRpb25zL2V4aXQvZmx5dG90b3AuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZmx5VG9Ub3AodGFnLCBzbGlkZSwgc3RhcnRUaW1lQXQsIGRlbGF5LCBzY2FsZXgsIHNjYWxleSwgc3VtKSB7XHJcblx0dmFyIHRvcCA9IHRhZy5jc3MoJ3RvcCcpO1xyXG5cdHZhciBvdXRZID0gLXRhZy5oZWlnaHQoKTtcclxuXHRzdGFydFRpbWVBdCArPSBzdW07XHJcblx0c3RhcnRUaW1lQXQgKz0gNTAwO1xyXG5cclxuXHRpZih0YWcuaGFzQ2xhc3MoJ3RleHRhcmVhJykpIHtcclxuXHRcdG91dFkgPSAtdGFnLmhlaWdodCgpICogc2NhbGV5O1xyXG5cdH1cclxuXHJcblx0dGFnLmNzcyh7XHJcblx0XHR0b3A6IG91dFlcclxuXHR9KTtcclxuXHJcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdHRhZy5hbmltYXRlKHsgJ3RvcCc6IG91dFkgfSwgZGVsYXkpO1xyXG5cdH0sIHN0YXJ0VGltZUF0KTtcclxufTsiXSwiZmlsZSI6ImFuaW1hdGlvbnMvZXhpdC9mbHl0b3RvcC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

function popOut(tag, slide, startTime, delay, scalex, scaley, sum) {
	startTime += sum;

	setTimeout(function() {
		tag.addClass('animated zoomOut', delay);
	}, startTime);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmltYXRpb25zL2V4aXQvcG9wb3V0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHBvcE91dCh0YWcsIHNsaWRlLCBzdGFydFRpbWUsIGRlbGF5LCBzY2FsZXgsIHNjYWxleSwgc3VtKSB7XHJcblx0c3RhcnRUaW1lICs9IHN1bTtcclxuXHJcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdHRhZy5hZGRDbGFzcygnYW5pbWF0ZWQgem9vbU91dCcsIGRlbGF5KTtcclxuXHR9LCBzdGFydFRpbWUpO1xyXG59OyJdLCJmaWxlIjoiYW5pbWF0aW9ucy9leGl0L3BvcG91dC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
