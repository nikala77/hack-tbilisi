$(function() {
	$('.working-board').on('click', '.ft-widget', function() {
		var id = parseInt($(this).attr('id'));
		if (id) {
			removeActiveObject();
			activateObject($(this));
		}
	});

	$('.working-board').on('click', '.contenteditable', function() {
		var id = parseInt($(this).attr('id'));
		if (id) {
			removeActiveObject();
			activateObject($(this));
		}
	});

	$('body').on('click', 'a', function(e) {
		if($(this).attr('href') === '#') {
			e.preventDefault();
		}
	});
});