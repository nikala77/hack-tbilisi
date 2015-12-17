$(function () {

	// login form
	$('#login').on('click', function () {
		var email = $('#loginemail').val().trim();
		var password = $('#loginpassword').val().trim();

		if (!email || !password) {
			alert('please fill the fields!!!')
		} else {
			$.ajax({
				type: 'POST',
				url: '/login',
				data: { email: email, password: password },
				success: function (data) {
					document.location.href = '/';
				}
			}).fail(function (data) {
				var message = JSON.parse(data.responseText).message; 
				alert(message);
			}) 
		}
	});




	// signup form 
	$('#signup').on('click', function () {
		var email = $('#signupemail').val().trim();
		var password = $('#signuppass').val().trim();

		if (!email || !password) {
			alert('please fill the fields!!!')
		} else {

			$.ajax({
				type: "POST",
				url: '/signup',
				data: { email: email, password: password },
				success: function (data) {
					alert(data.message);
					document.location.href='/login';
				}, 
			}).fail(function (data) {
				alert(data.responseText);
			});
		}

	});

	// reset
	$('#forgot').on('click', function () {
		var email = $('#forgotemail').val().trim();

		if (!email) {
			alert('please enter email!')
		} else {
			$.ajax({
				type: "POST",
				url: '/forgot',
				data: { email: email },
				success: function (data) {
					alert(data.message);
					document.location.href='/forgot';
				}, 
			}).fail(function (data) {
				alert(data.responseText);
			});
		}
	});

	$('#reset').on('click', function () {
		var password = $('#resetpass').val().trim();
		var repeatPassword = $('#repeatpass').val().trim();

		if (!password || !repeatPassword) {
			alert('please fill all the fields!')
		} else if (password !== repeatPassword) {
			alert('password and repeatPassword must be the same!')
		} else {
			$.ajax({
				type: "POST",
				url: document.location.pathname,
				data: { password: password, repeatPassword: repeatPassword },
				success: function (data) {
					alert(data.message);
					document.location.href='/login';
				}, 
			}).fail(function (data) {
				alert(data.responseText);
			});
		}
	});
});