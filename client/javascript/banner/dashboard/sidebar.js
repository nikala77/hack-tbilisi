$(function() {
	var avatarHTML = $('.avatar').html();
	var usernameHTML = $('.username').text();

	$('.username').popover({
		html: true,
		title: avatarHTML + ' <p>' + usernameHTML + '</p>',
		content: '<a href="/login" class="logout pull-right">Log Out</a>'
	});


	// activate on click
	switch(location.pathname) {
		case '/dashboard': 
			$('.dashboard-ul li:eq(0)').addClass('active'); break;

		case '/dashboard/banner/new': 
			$('.dashboard-ul li:eq(1)').addClass('active'); break;

		case '/dashboard/banner/statistics': 
			$('.dashboard-ul li:eq(2)').addClass('active'); break;
	};

	$(window).on('resize', function() {
		if($(this).width() <= 767) {
			$('.side-bar').css('left', '-250px');
			$('.header').css('margin-left', '0px');

		} else {
			$('.side-bar').css('left', '0px');
		}
	});

});