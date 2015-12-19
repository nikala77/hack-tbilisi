$(function() {
	
	$('.project-list').on('click', function() {
		$('a[href="/dashboard/banner/new"]').parent()
			.addClass('active')
			.siblings().removeClass('active');
	});

});