var uploadImageWidth;
var uploadImageHeight;

$(function() {
	$('.image-box').on('click', '.bg-image', function() {
		var src = $(this).css('background-image').split('url(')[1].split(')')[0];
		var width = $(this).css('width');
		var height = $(this).css('height');
		addImage(workingBanner, src, width, height);
		updateObjectStates(getBannerData());
	});
});