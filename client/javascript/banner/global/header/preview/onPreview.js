$(function() {
	$('#preview-slide-btn').on('click', function () {
		var dimen = previewSizeChanged(800, 400);
		loadPreview(activeSlide, presentationData, $('#preview-slide-desk'), dimen.x, dimen.y);
	});

	$('#preview-modal').on('hidden.bs.modal', function() {
		$('#preview-slide-desk').html('');
		if(presentationTimeout) {
			clearTimeout(presentationTimeout);
			presentationTimeout = undefined;
		}
	});
});