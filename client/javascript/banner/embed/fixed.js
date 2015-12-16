$(function() {
	var id = $('.fixed-banner').data('id');
	
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
	loadBanner(data, $('.fixed-banner'), 1, 1);
};