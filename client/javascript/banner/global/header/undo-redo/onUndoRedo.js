$(function() {
	// undo redo button binding
	$('#undo').on('click', function (e) {
		e.preventDefault();
		undo();
	});

	$('#redo').on('click', function (e) {
		e.preventDefault();
		redo();
	});
});