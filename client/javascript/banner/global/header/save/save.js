$(function() {
	$('#save').on('click', function () {
		var that = $(this);
		var data = getBannerData();
		var background = workingBanner.css('background');

		bannerData.background = background;
		bannerData.json = data;

		$.ajax({
			url: '/api/banner/data/' + bannerID,
			type: 'PUT',
			data: { data: JSON.stringify(bannerData) },
			timeout: 3000,
			beforeSend: function() {
				that.attr('disabled', 'disabled');
			},
			success: function(response) {
				console.log(response);
			},
			error: function(request, errorType, errorMessage) {
				console.log(request, errorType, errorMessage);
			},
			complete: function() {
				that.removeAttr('disabled');
			}
		});
	});
});