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

	$('.edit-banner').on('click', function() {
		window.open('/editor/' + $(this).data('id'));
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
	}

	alignMiddle($('.custom-size-rectangle'), $('.scrollable'));

	// create banner
	$('.template .use-this').on('click', function() {
		var that = $(this);
		var name = that.data('name') || 'Untitled Banner';
		var width = that.data('width');
		var height = that.data('height');
		var url = that.data('url') || 'www.example.com';
		var data = that.data('json') || [];
		var template = false;
		createBanner(that, name, width, height, userID, url, data, template);
	});

	// create blank banner with custom size
	$('.custom-size-rectangle').on('click', bindCustomCreate);

});