$(function() {
	$('#activate-uploaded-audios').on('click', function() {
		if($('.uploaded-audios').children().length) {
			return;
		}

		$.get('/s3/audios')
		.then(function(data) {
			var div9 = $('<div class="col-md-9">');
			var div3 = $('<div class="col-md-3">');

			data.forEach(function(i) {
				div9.append('<audio src="https://prezhero.s3.amazonaws.com/'+ i +'" controls="controls">Your browser does not support the audio element.</audio>');
				div3.append('<button class="btn btn-success plus-audio" data-src="https://prezhero.s3.amazonaws.com/'+ i +'"><i class="fa fa-plus"></i></button>');
				$('.uploaded-audios').append(div9);
				$('.uploaded-audios').append(div3);
			});
			updateObjectStates(getSlideData());
		})
		.fail(function(err) {
			console.log('err', err);
		});
	});

	$('#audio').on('click', '.plus-audio', function() {
		var src = $(this).data('src');
		addAudio(slideHeart, src);
		updateObjectStates(getSlideData());
	});
});