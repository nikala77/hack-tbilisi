$(function () {

	// login form
	$('#login').on('submit', function (e) {
		e.preventDefault();
		var that = $(this);
		var email = $('#loginemail').val().trim();
		var password = $('#loginpassword').val().trim();

		if (!email || !password) {
			showValidation($('.login-warning'), 'Please fill all fields!', 'error');
		} else {
			$.ajax({
				type: 'POST',
				url: '/login',
				data: { email: email, password: password },
				beforeSend: function() {
					startLoading(that.find('button[type=submit]'));
				},
				success: function (data) {
					document.location.href = '/';
				},
				complete: function() {
					finishLoading(that.find('button[type=submit]'));
				}
			}).fail(function (data) {
				var message = JSON.parse(data.responseText).message; 
				showValidation($('.login-warning'), message, 'error');
			});
		}
	});




	// signup form 
	$('#signup').on('submit', function (e) {
		e.preventDefault();
		var that = $(this);
		var email = $('#signupemail').val().trim();
		var password = $('#signuppass').val().trim();

		if (!email || !password) {
			
			showValidation($('.signup-warning'), 'Please fill all fields!', 'error');
		
		} else if(!isEmail(email)) {

			showValidation($('.signup-warning'), 'Please enter valid email!', 'error');

		} else if(password.length < 6) {

			showValidation($('.signup-warning'), 'Password must contain at least 6 symbol!', 'error');

		} else {
			
			$.ajax({
				type: 'POST',
				url: '/signup',
				data: $('#signup').serialize(),
				beforeSend: function() {
					startLoading(that.find('button[type=submit]'));
				},
				success: function (data) {
					document.location.href='/login?type=success'+
					'&message='+ data.message;
				},
				complete: function() {
					finishLoading(that.find('button[type=submit]'));
				}
			}).fail(function (data) {
				showValidation($('.signup-warning'), data.responseJSON.reason, 'error');
			});

		}

	});

	// forgot
	$('#forgot').on('submit', function (e) {
		e.preventDefault();
		var that = $(this);
		var email = $('#forgotemail').val().trim();

		if (!email) {
		
			showValidation($('.forgot-warning'), 'Please enter email!', 'error');
		
		} else if(!isEmail(email)) {

			showValidation($('.forgot-warning'), 'Please enter valid email!', 'error');

		} else {
			$.ajax({
				type: "POST",
				url: '/forgot',
				data: $('#forgot').serialize(),
				beforeSend: function() {
					startLoading(that.find('button[type=submit]'));
				},
				success: function (data) {
					document.location.href='/login?type=success'+
					'&message='+ data.message;
				},
				complete: function() {
					finishLoading(that.find('button[type=submit]'));
				}
			}).fail(function (data) {
				showValidation($('.forgot-warning'), data.responseJSON.message, 'error');
			});
		}
	});

	// reset
	$('#reset').on('submit', function (e) {
		e.preventDefault();
		var that = $(this);
		var password = $('#resetpass').val().trim();
		var repeatPassword = $('#repeatpass').val().trim();

		if (!password || !repeatPassword) {
			
			showValidation($('.reset-warning'), 'Please fill all the fields!', 'error');

		} else if (password !== repeatPassword) {
			
			showValidation($('.reset-warning'), 'Value of these two fields must be the same!', 'error');

		} else if( password.length < 6 ) {

			showValidation($('.reset-warning'), 'Password must contain at least 6 symbol!', 'error');

		} else {
			$.ajax({
				type: 'POST',
				url: document.location.pathname,
				data: { password: password, repeatPassword: repeatPassword },
				beforeSend: function() {
					startLoading(that.find('button[type=submit]'));
				},
				success: function (data) {
					document.location.href='/login?type=success'+
					'&message='+ data.message;;
				},
				complete: function() {
					finishLoading(that.find('button[type=submit]'));
				}
			}).fail(function (data) {
				showValidation($('.reset-warning'), data.message, 'error');
			});
		}
	});
});