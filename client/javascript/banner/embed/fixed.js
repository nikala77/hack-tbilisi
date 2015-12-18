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