$(function () {

	// login form

	$('#login').on('click', function () {
		var email = $('#loginemail').val().trim();
		var password = $('#loginpassword').val().trim();
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
	});




	// signup form 
	$('#signup').on('click', function () {
		var email = $('#signupemail').val().trim();
		var password = $('#signuppass').val().trim();
		$.ajax({
			type: "POST",
			url: '/signup',
			data: {email: email, password: password},
			success: function (data) {
				alert(data.message);
				document.location.href='/login';
			}, 
		}).fail(function (data) {
			alert(data.responseText);
		});
	})
});