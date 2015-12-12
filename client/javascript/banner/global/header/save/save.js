$(function() {
	$('#save').on('click', function () {
		var slideData = getSlideData();
		var background = slideHeart.css('background');

		presentationData[activeSlide].title = background;
		presentationData[activeSlide].json = slideData;

		$.ajax({
			url: '/campaigns/update-campaign/',
			type: 'POST',
			data: {
				campaignHash: hash,
				json: JSON.stringify(presentationData)
			},
			success: function(result) {
				console.log('saved in DB');
			}
		});
	});
});