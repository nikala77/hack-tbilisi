$(function() {
	$('#shape').on('click', 'img', function() {
		var that = $(this);
		addShape(slideHeart, that.attr('src'));
	});

	// 1. load shapes 35 images
	$('#icon-accordion a').on('click', function() {
		var size = Number($(this).data('size'));
		var type = $(this).data('type');
		var collapseID = $(this).attr('href');
		var accordionBody = $(collapseID + ' .panel-body');

		$('#icon-accordion .in').not(collapseID).removeClass('in');

		if(accordionBody.children().length > 0) {
			return;
		}

		for(var i = 1; i <= size; i++) {
			accordionBody.append('<img class="svg social-link img" src="/img/svg/'+ type +'/Layer '+ i +'.svg">');
		}
	});
});