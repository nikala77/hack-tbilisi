$(function() {
	$('.insert-yt-video').on('click', function() {
		var yvlink = $('.yvlink').val();
		var valid = validateYoutubeVimeo(yvlink);
		var src;
		var videoType;
		var width;
		var height;

		if(valid) {
			var YTID = getYTID(yvlink);
			if(YTID) {
				// "https://www.youtube.com/embed/"+myId+"?rel=0&start="+ start_time +"&showinfo=0&end="+ end_time +"&autoplay="+autoplay+"&controls="+controls
				src = 'https://www.youtube.com/embed/'+ YTID +'?rel=0&showinfo=0&autoplay=true&controls=false';
				videoType = 'youtube';
				width = 560;
				height = 315;
			} else {
				var VID = getVimeoID(yvlink);
				// src = "https://player.vimeo.com/video/"+videoId+"#t="+ start_time +"?autoplay="+autoplay+"&controls="+controls;
				src = 'https://player.vimeo.com/video/'+ VID +'?autoplay=true&controls=false';
				videoType = 'vimeo';
				width = 500;
				height = 264;
			}
			addVideo(workingBanner, src, width, height, videoType);
			updateObjectStates(getBannerData());
		} else {
			showValidation($('.yv-validation'));
		}
	});

	$('#video').on('click', '.plus-video', function() {
		console.log('addvideo', $(this).data('src'));
		addVideo(workingBanner, $(this).data('src'), 300, 150, 'upload');
		updateObjectStates(getBannerData());
	});

	$('#activate-uploaded-videos').on('click', function() {
		if($('.uploaded-videos').children().length) {
			return;
		}

		$.get('/s3/videos')
		.then(function(data) {
			data.forEach(function(i) {
				$('.uploaded-videos').append('<video width="300" height="150" src="https://prezhero.s3.amazonaws.com/'+ i +'" controls="controls">Your browser does not support the video element.</video>');
				$('.uploaded-videos').append('<button class="btn btn-block btn-success plus-video" data-src="https://prezhero.s3.amazonaws.com/'+ i +'"><i class="fa fa-plus"></i></button>');
			});
			updateObjectStates(getBannerData());
		})
		.fail(function(err) {
			console.log('err', err);
		});
	});
});