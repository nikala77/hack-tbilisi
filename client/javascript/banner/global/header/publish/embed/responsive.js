$(function() {
	var path = window.location.protocol + '//' + window.location.host;
	var apiPath = path + '/api/canvas-iframe-data/';
	$('#responsive-code').val(''+
		'<div data-href="'+ apiPath +'" class="responsive-presentation" data-height="400" data-width="800"></div>'+
		'<script src="'+ path +'/assets/editor/embed-scripts/responsive.js"></script>');

	$('#responsive-code').on('click', function() {
		$(this).select();
	});
});