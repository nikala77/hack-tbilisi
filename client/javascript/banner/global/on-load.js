$(function() {
	$('#slide-container').on('click', '.ft-widget', function() {
		var id = parseInt($(this).attr('id'));
		if (id) {
			removeActiveObject();
			activateObject($(this));
		}
	});

	$('#slide-container').on('click', '.contenteditable', function() {
		var id = parseInt($(this).attr('id'));
		if (id) {
			removeActiveObject();
			activateObject($(this));
		}
	});
});