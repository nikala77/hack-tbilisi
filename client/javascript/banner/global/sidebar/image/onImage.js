var uploadImageWidth;
var uploadImageHeight;

$(function() {
	$('#image').on('click', 'img', function() {
		var src = $(this).attr('src');
		var width = $(this).css('width');
		var height = $(this).css('height');
		addImage(slideHeart, src, width, height);
		updateObjectStates(getSlideData());
	});

	// load previously uploaded images
	$('#activate-uploaded-images').on('click', function() {
		if($('.uploaded-images').children().length) {
			return;
		}

		$.get('/s3/images')
		.then(function(data) {
			data.forEach(function(i) {
				$('.uploaded-images').append('<div class="col-md-3"><img src="https://prezhero.s3.amazonaws.com/'+ i +'" alt="" class="img img-responsive"></div>')
			});
			updateObjectStates(getSlideData());
		})
		.fail(function(err) {
			console.log('err', err);
		});
	});

	$('#upload-image-btn').on('click', function(e) {
		e.preventDefault();
		aw3Upload('upload-image-input');
	});

	$('#test-form').on('submit', function() {
		console.log('uploading...');
	});

	// var _URL = window.URL || window.webkitURL;

	// $('#image-file').change(function (e) {
	// 	var file, img;

	// 	if ((file = this.files[0])) {
	// 		file.name = new Date() + file.name;
	// 		img = new Image();
	// 		img.onload = function () {
	// 			uploadImageWidth  = this.width;
	// 			uploadImageHeight = this.height;
	// 		};
	// 	}
	// });
});