function deleteBanner(useBtn, href) {
	
	$.ajax({
		url: href,
		method: 'DELETE',

		beforeSend: function() {
			useBtn.attr('disabled', 'disabled');
		},

		success: function(response) {
			console.log('Banner has successfully removed');
		},

		error: function(request, errorType, errorMessage) {
			useBtn.removeAttr('disabled');
		},

		complete: function() {
			useBtn.removeAttr('disabled');
		}
	});
};