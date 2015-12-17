$(function() {
	$('.preview-btn').on('click', function() {
		// update banner data
		var data = getBannerData();
		var background = workingBanner.css('background');

		bannerData.background = background;
		bannerData.json = data;

		// change preview modal dimensions
		var bannerWidth = $('.working-banner').width();
		var bannerHeight = $('.working-banner').height();
		var difx = 42;
		var dify = 98;
		$('.preview-banner').width(bannerWidth);
		$('.preview-banner').height(bannerHeight);
		$('.modal-content.prewiew-content').width(bannerWidth + difx);
		$('.modal-content.prewiew-content').height(bannerHeight + dify);
		
		// load banner
		loadPreview(bannerData, $('.preview-banner'), 1, 1);
	});
	
	$('#preview').on('hidden.bs.modal', function() {
		$('#preview .preview-banner').html('');
	});
});