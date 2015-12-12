function uploadBackground(form) {
	var url = $(form).attr('action');
	var file = $(form).find('input[type=file]')[0].files[0];
	var randomName = new Date().getTime();
	var prepend = $(form).find('input[name=key]').val().split('${filename}')[0];
	$(form).find('input[name=key]').val(prepend + randomName + file.name);
	var filename = 'https://prezhero.s3.amazonaws.com/' + prepend + randomName + file.name;

	$.ajax( {
		url: url,
		type: 'post',
		data: new FormData( form ),
		processData: false,
		contentType: false,
		beforeSend: function() {
			$('.bg-upload-gif').show();
			$('.submit-bg-upload').attr('disabled', 'disabled');
		},
		success: function(data) {
			changeBackground(filename);
		},
		error: function(err) {
			changeBackground(filename);
		},
		complete: function() {
			$('.bg-upload-gif').hide();
			$('.submit-bg-upload').removeAttr('disabled');
		}
	});
	return false;
};