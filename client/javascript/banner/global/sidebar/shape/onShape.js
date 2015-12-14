$(function() {
	$('.shape-box').on('click', 'img', function() {
		var that = $(this);
		addShape(workingBanner, that.attr('src'));
	});

});