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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhY2NvdW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24gKCkge1xuXG5cdC8vIGxvZ2luIGZvcm1cblx0JCgnI2xvZ2luJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdHZhciBlbWFpbCA9ICQoJyNsb2dpbmVtYWlsJykudmFsKCkudHJpbSgpO1xuXHRcdHZhciBwYXNzd29yZCA9ICQoJyNsb2dpbnBhc3N3b3JkJykudmFsKCkudHJpbSgpO1xuXG5cdFx0aWYgKCFlbWFpbCB8fCAhcGFzc3dvcmQpIHtcblx0XHRcdGFsZXJ0KCdwbGVhc2UgZmlsbCB0aGUgZmllbGRzISEhJylcblx0XHR9IGVsc2Uge1xuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHR1cmw6ICcvbG9naW4nLFxuXHRcdFx0XHRkYXRhOiB7IGVtYWlsOiBlbWFpbCwgcGFzc3dvcmQ6IHBhc3N3b3JkIH0sXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdFx0ZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICcvJztcblx0XHRcdFx0fVxuXHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHR2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZGF0YS5yZXNwb25zZVRleHQpLm1lc3NhZ2U7IFxuXHRcdFx0XHRhbGVydChtZXNzYWdlKTtcblx0XHRcdH0pIFxuXHRcdH1cblx0fSk7XG5cblxuXG5cblx0Ly8gc2lnbnVwIGZvcm0gXG5cdCQoJyNzaWdudXAnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGVtYWlsID0gJCgnI3NpZ251cGVtYWlsJykudmFsKCkudHJpbSgpO1xuXHRcdHZhciBwYXNzd29yZCA9ICQoJyNzaWdudXBwYXNzJykudmFsKCkudHJpbSgpO1xuXG5cdFx0aWYgKCFlbWFpbCB8fCAhcGFzc3dvcmQpIHtcblx0XHRcdGFsZXJ0KCdwbGVhc2UgZmlsbCB0aGUgZmllbGRzISEhJylcblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR0eXBlOiBcIlBPU1RcIixcblx0XHRcdFx0dXJsOiAnL3NpZ251cCcsXG5cdFx0XHRcdGRhdGE6IHsgZW1haWw6IGVtYWlsLCBwYXNzd29yZDogcGFzc3dvcmQgfSxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRhbGVydChkYXRhLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdGRvY3VtZW50LmxvY2F0aW9uLmhyZWY9Jy9sb2dpbic7XG5cdFx0XHRcdH0sIFxuXHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRhbGVydChkYXRhLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fSk7XG5cblx0Ly8gcmVzZXRcblx0JCgnI2ZvcmdvdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgZW1haWwgPSAkKCcjZm9yZ290ZW1haWwnKS52YWwoKS50cmltKCk7XG5cblx0XHRpZiAoIWVtYWlsKSB7XG5cdFx0XHRhbGVydCgncGxlYXNlIGVudGVyIGVtYWlsIScpXG5cdFx0fSBlbHNlIHtcblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHR5cGU6IFwiUE9TVFwiLFxuXHRcdFx0XHR1cmw6ICcvZm9yZ290Jyxcblx0XHRcdFx0ZGF0YTogeyBlbWFpbDogZW1haWwgfSxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRhbGVydChkYXRhLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdGRvY3VtZW50LmxvY2F0aW9uLmhyZWY9Jy9mb3Jnb3QnO1xuXHRcdFx0XHR9LCBcblx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0YWxlcnQoZGF0YS5yZXNwb25zZVRleHQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcblxuXHQkKCcjcmVzZXQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHBhc3N3b3JkID0gJCgnI3Jlc2V0cGFzcycpLnZhbCgpLnRyaW0oKTtcblx0XHR2YXIgcmVwZWF0UGFzc3dvcmQgPSAkKCcjcmVwZWF0cGFzcycpLnZhbCgpLnRyaW0oKTtcblxuXHRcdGlmICghcGFzc3dvcmQgfHwgIXJlcGVhdFBhc3N3b3JkKSB7XG5cdFx0XHRhbGVydCgncGxlYXNlIGZpbGwgYWxsIHRoZSBmaWVsZHMhJylcblx0XHR9IGVsc2UgaWYgKHBhc3N3b3JkICE9PSByZXBlYXRQYXNzd29yZCkge1xuXHRcdFx0YWxlcnQoJ3Bhc3N3b3JkIGFuZCByZXBlYXRQYXNzd29yZCBtdXN0IGJlIHRoZSBzYW1lIScpXG5cdFx0fSBlbHNlIHtcblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHR5cGU6IFwiUE9TVFwiLFxuXHRcdFx0XHR1cmw6IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLFxuXHRcdFx0XHRkYXRhOiB7IHBhc3N3b3JkOiBwYXNzd29yZCwgcmVwZWF0UGFzc3dvcmQ6IHJlcGVhdFBhc3N3b3JkIH0sXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdFx0YWxlcnQoZGF0YS5tZXNzYWdlKTtcblx0XHRcdFx0XHRkb2N1bWVudC5sb2NhdGlvbi5ocmVmPScvbG9naW4nO1xuXHRcdFx0XHR9LCBcblx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0YWxlcnQoZGF0YS5yZXNwb25zZVRleHQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcbn0pOyJdLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
