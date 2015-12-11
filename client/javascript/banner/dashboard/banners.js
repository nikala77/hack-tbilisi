$(function() {

	// show tools on mouseover
	$('.banner-thumbnail').on('mouseover', function() {
		$(this).find('.tools').show();
	}).on('mouseout', function() {
		$(this).find('.tools').hide();
	});

	$('#banner-width').on('keyup', function() {
		$('.custom-size-rectangle').width(Number($(this).val()));
		alignMiddle($('.custom-size-rectangle'), $('.scrollable'));
	});
	
	$('#banner-height').on('keyup', function() {
		$('.custom-size-rectangle').height(Number($(this).val()));
		alignMiddle($('.custom-size-rectangle'), $('.scrollable'));
	});

	function alignMiddle(child, parent) {
		var pWidth = parent.width();
		var pHeight = parent.height();

		var cWidth = child.width();
		var cHeight = child.height();

		if(cWidth < pWidth) {
			child.css('left', (pWidth - cWidth) / 2 );
		} else {
			child.css('left', 0);
		}

		if(cHeight < pHeight) {
			child.css('top', (pHeight - cHeight) / 2 );
		} else {
			child.css('top', 0);
		}
	};

	alignMiddle($('.custom-size-rectangle'), $('.scrollable'))
});