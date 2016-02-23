$(function() {
	var avatarHTML = $('.avatar').html();
	var usernameHTML = $('.username').text();

	$('.username').popover({
		html: true,
		title: avatarHTML + ' <p>' + usernameHTML + '</p>',
		content: '<a href="/logout" class="logout"><i class="fa fa-power-off"></i>  Log Out </a>'
	});

	// activate on click
	switch(window.location.pathname) {
		case '/dashboard': 
			$('.dashboard-ul li:eq(0), #banners').addClass('active'); 
			break;
		case '/dashboard/banner/new': 
			$('.dashboard-ul li:eq(1), #small-square').addClass('active');
			$('a[href="#small-square"]').parent().addClass('active');
			break;
		case '/dashboard/banner/statistics': 
			$('.dashboard-ul li:eq(2), #statistics').addClass('active'); 
			break;
	}

	var usernameTitle = $('.username-title').text();

	if(usernameTitle.length > 15) {
		usernameTitle = usernameTitle.substring(0, 12).concat('...');
		console.log(usernameTitle);
		$('.username-title').text(usernameTitle);
	}
});