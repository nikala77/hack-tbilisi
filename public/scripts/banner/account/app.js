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
	$('#signup').on('submit', function (e) {
		e.preventDefault();

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
				success: function (data) {
					document.location.href='/login?type=success'+
					'&message='+ data.message;
				},
			}).fail(function (data) {
				showValidation($('.signup-warning'), data.responseJSON.reason, 'error');
			});

		}

	});

	// forgot
	$('#forgot').on('submit', function (e) {
		e.preventDefault();

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
				success: function (data) {
					document.location.href='/login?type=success'+
					'&message='+ data.message;
				}, 
			}).fail(function (data) {
				showValidation($('.forgot-warning'), data.responseJSON.message, 'error');
			});
		}
	});

	// reset
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhY2NvdW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24gKCkge1xuXG5cdC8vIGxvZ2luIGZvcm1cblx0JCgnI2xvZ2luJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdHZhciBlbWFpbCA9ICQoJyNsb2dpbmVtYWlsJykudmFsKCkudHJpbSgpO1xuXHRcdHZhciBwYXNzd29yZCA9ICQoJyNsb2dpbnBhc3N3b3JkJykudmFsKCkudHJpbSgpO1xuXG5cdFx0aWYgKCFlbWFpbCB8fCAhcGFzc3dvcmQpIHtcblx0XHRcdGFsZXJ0KCdwbGVhc2UgZmlsbCB0aGUgZmllbGRzISEhJylcblx0XHR9IGVsc2Uge1xuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHR1cmw6ICcvbG9naW4nLFxuXHRcdFx0XHRkYXRhOiB7IGVtYWlsOiBlbWFpbCwgcGFzc3dvcmQ6IHBhc3N3b3JkIH0sXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdFx0ZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICcvJztcblx0XHRcdFx0fVxuXHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHR2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZGF0YS5yZXNwb25zZVRleHQpLm1lc3NhZ2U7IFxuXHRcdFx0XHRhbGVydChtZXNzYWdlKTtcblx0XHRcdH0pIFxuXHRcdH1cblx0fSk7XG5cblxuXG5cblx0Ly8gc2lnbnVwIGZvcm0gXG5cdCQoJyNzaWdudXAnKS5vbignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHR2YXIgZW1haWwgPSAkKCcjc2lnbnVwZW1haWwnKS52YWwoKS50cmltKCk7XG5cdFx0dmFyIHBhc3N3b3JkID0gJCgnI3NpZ251cHBhc3MnKS52YWwoKS50cmltKCk7XG5cblx0XHRpZiAoIWVtYWlsIHx8ICFwYXNzd29yZCkge1xuXHRcdFx0XG5cdFx0XHRzaG93VmFsaWRhdGlvbigkKCcuc2lnbnVwLXdhcm5pbmcnKSwgJ1BsZWFzZSBmaWxsIGFsbCBmaWVsZHMhJywgJ2Vycm9yJyk7XG5cdFx0XG5cdFx0fSBlbHNlIGlmKCFpc0VtYWlsKGVtYWlsKSkge1xuXG5cdFx0XHRzaG93VmFsaWRhdGlvbigkKCcuc2lnbnVwLXdhcm5pbmcnKSwgJ1BsZWFzZSBlbnRlciB2YWxpZCBlbWFpbCEnLCAnZXJyb3InKTtcblxuXHRcdH0gZWxzZSBpZihwYXNzd29yZC5sZW5ndGggPCA2KSB7XG5cblx0XHRcdHNob3dWYWxpZGF0aW9uKCQoJy5zaWdudXAtd2FybmluZycpLCAnUGFzc3dvcmQgbXVzdCBjb250YWluIGF0IGxlYXN0IDYgc3ltYm9sIScsICdlcnJvcicpO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdFxuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHR1cmw6ICcvc2lnbnVwJyxcblx0XHRcdFx0ZGF0YTogJCgnI3NpZ251cCcpLnNlcmlhbGl6ZSgpLFxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRcdGRvY3VtZW50LmxvY2F0aW9uLmhyZWY9Jy9sb2dpbj90eXBlPXN1Y2Nlc3MnK1xuXHRcdFx0XHRcdCcmbWVzc2FnZT0nKyBkYXRhLm1lc3NhZ2U7XG5cdFx0XHRcdH0sXG5cdFx0XHR9KS5mYWlsKGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdHNob3dWYWxpZGF0aW9uKCQoJy5zaWdudXAtd2FybmluZycpLCBkYXRhLnJlc3BvbnNlSlNPTi5yZWFzb24sICdlcnJvcicpO1xuXHRcdFx0fSk7XG5cblx0XHR9XG5cblx0fSk7XG5cblx0Ly8gZm9yZ290XG5cdCQoJyNmb3Jnb3QnKS5vbignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHR2YXIgZW1haWwgPSAkKCcjZm9yZ290ZW1haWwnKS52YWwoKS50cmltKCk7XG5cblx0XHRpZiAoIWVtYWlsKSB7XG5cdFx0XG5cdFx0XHRzaG93VmFsaWRhdGlvbigkKCcuZm9yZ290LXdhcm5pbmcnKSwgJ1BsZWFzZSBlbnRlciBlbWFpbCEnLCAnZXJyb3InKTtcblx0XHRcblx0XHR9IGVsc2UgaWYoIWlzRW1haWwoZW1haWwpKSB7XG5cblx0XHRcdHNob3dWYWxpZGF0aW9uKCQoJy5mb3Jnb3Qtd2FybmluZycpLCAnUGxlYXNlIGVudGVyIHZhbGlkIGVtYWlsIScsICdlcnJvcicpO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHR5cGU6IFwiUE9TVFwiLFxuXHRcdFx0XHR1cmw6ICcvZm9yZ290Jyxcblx0XHRcdFx0ZGF0YTogJCgnI2ZvcmdvdCcpLnNlcmlhbGl6ZSgpLFxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRcdGRvY3VtZW50LmxvY2F0aW9uLmhyZWY9Jy9sb2dpbj90eXBlPXN1Y2Nlc3MnK1xuXHRcdFx0XHRcdCcmbWVzc2FnZT0nKyBkYXRhLm1lc3NhZ2U7XG5cdFx0XHRcdH0sIFxuXHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRzaG93VmFsaWRhdGlvbigkKCcuZm9yZ290LXdhcm5pbmcnKSwgZGF0YS5yZXNwb25zZUpTT04ubWVzc2FnZSwgJ2Vycm9yJyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIHJlc2V0XG5cdCQoJyNyZXNldCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgcGFzc3dvcmQgPSAkKCcjcmVzZXRwYXNzJykudmFsKCkudHJpbSgpO1xuXHRcdHZhciByZXBlYXRQYXNzd29yZCA9ICQoJyNyZXBlYXRwYXNzJykudmFsKCkudHJpbSgpO1xuXG5cdFx0aWYgKCFwYXNzd29yZCB8fCAhcmVwZWF0UGFzc3dvcmQpIHtcblx0XHRcdGFsZXJ0KCdwbGVhc2UgZmlsbCBhbGwgdGhlIGZpZWxkcyEnKVxuXHRcdH0gZWxzZSBpZiAocGFzc3dvcmQgIT09IHJlcGVhdFBhc3N3b3JkKSB7XG5cdFx0XHRhbGVydCgncGFzc3dvcmQgYW5kIHJlcGVhdFBhc3N3b3JkIG11c3QgYmUgdGhlIHNhbWUhJylcblx0XHR9IGVsc2Uge1xuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dHlwZTogXCJQT1NUXCIsXG5cdFx0XHRcdHVybDogZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUsXG5cdFx0XHRcdGRhdGE6IHsgcGFzc3dvcmQ6IHBhc3N3b3JkLCByZXBlYXRQYXNzd29yZDogcmVwZWF0UGFzc3dvcmQgfSxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRhbGVydChkYXRhLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdGRvY3VtZW50LmxvY2F0aW9uLmhyZWY9Jy9sb2dpbic7XG5cdFx0XHRcdH0sIFxuXHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRhbGVydChkYXRhLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xufSk7Il0sImZpbGUiOiJhY2NvdW50LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

$(function() {
	var search = getUrlVars();
	var type = search.type;
	var message = search.message;

	if(type === 'success') {
		message = message.split('%20').join(' ');
		showAlertValidation($('.redirect-alert'), message, type, 5);
	}
});

function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	
	for(var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}

	return vars;
};

function isEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsb2dpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKGZ1bmN0aW9uKCkge1xuXHR2YXIgc2VhcmNoID0gZ2V0VXJsVmFycygpO1xuXHR2YXIgdHlwZSA9IHNlYXJjaC50eXBlO1xuXHR2YXIgbWVzc2FnZSA9IHNlYXJjaC5tZXNzYWdlO1xuXG5cdGlmKHR5cGUgPT09ICdzdWNjZXNzJykge1xuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlLnNwbGl0KCclMjAnKS5qb2luKCcgJyk7XG5cdFx0c2hvd0FsZXJ0VmFsaWRhdGlvbigkKCcucmVkaXJlY3QtYWxlcnQnKSwgbWVzc2FnZSwgdHlwZSwgNSk7XG5cdH1cbn0pO1xuXG5mdW5jdGlvbiBnZXRVcmxWYXJzKCkge1xuXHR2YXIgdmFycyA9IFtdLCBoYXNoO1xuXHR2YXIgaGFzaGVzID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc2xpY2Uod2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignPycpICsgMSkuc3BsaXQoJyYnKTtcblx0XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBoYXNoZXMubGVuZ3RoOyBpKyspIHtcblx0XHRoYXNoID0gaGFzaGVzW2ldLnNwbGl0KCc9Jyk7XG5cdFx0dmFycy5wdXNoKGhhc2hbMF0pO1xuXHRcdHZhcnNbaGFzaFswXV0gPSBoYXNoWzFdO1xuXHR9XG5cblx0cmV0dXJuIHZhcnM7XG59O1xuXG5mdW5jdGlvbiBpc0VtYWlsKGVtYWlsKSB7XG5cdHZhciByZSA9IC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XG5cdHJldHVybiByZS50ZXN0KGVtYWlsKTtcbn07Il0sImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var validation = {};

function showValidation(div, text, result, time) {
	
	clearTimeout(validation.timeout);

	time = time || 3;
	time *= 1000;

	if(result === 'success') {
		div.addClass('text-success').removeClass('text-danger');
	} else {
		div.addClass('text-danger').removeClass('text-success');
	}

	div.html(text);
	div.slideDown(700);

	validation.timeout = setTimeout(function() {
		div.slideUp(700);
	}, time);
}

function showAlertValidation(div, text, result, time) {
	clearTimeout(validation.timeout);

	time = time || 3;
	time *= 1000;

	if(result === 'success') {
		div.addClass('alert-success').removeClass('alert-danger');
	} else {
		div.addClass('alert-danger').removeClass('alert-success');
	}

	div.html(text);
	div.slideDown(700);

	validation.timeout = setTimeout(function() {
		div.slideUp(700);
	}, time);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ2YWxpZGF0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciB2YWxpZGF0aW9uID0ge307XG5cbmZ1bmN0aW9uIHNob3dWYWxpZGF0aW9uKGRpdiwgdGV4dCwgcmVzdWx0LCB0aW1lKSB7XG5cdFxuXHRjbGVhclRpbWVvdXQodmFsaWRhdGlvbi50aW1lb3V0KTtcblxuXHR0aW1lID0gdGltZSB8fCAzO1xuXHR0aW1lICo9IDEwMDA7XG5cblx0aWYocmVzdWx0ID09PSAnc3VjY2VzcycpIHtcblx0XHRkaXYuYWRkQ2xhc3MoJ3RleHQtc3VjY2VzcycpLnJlbW92ZUNsYXNzKCd0ZXh0LWRhbmdlcicpO1xuXHR9IGVsc2Uge1xuXHRcdGRpdi5hZGRDbGFzcygndGV4dC1kYW5nZXInKS5yZW1vdmVDbGFzcygndGV4dC1zdWNjZXNzJyk7XG5cdH1cblxuXHRkaXYuaHRtbCh0ZXh0KTtcblx0ZGl2LnNsaWRlRG93big3MDApO1xuXG5cdHZhbGlkYXRpb24udGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0ZGl2LnNsaWRlVXAoNzAwKTtcblx0fSwgdGltZSk7XG59XG5cbmZ1bmN0aW9uIHNob3dBbGVydFZhbGlkYXRpb24oZGl2LCB0ZXh0LCByZXN1bHQsIHRpbWUpIHtcblx0Y2xlYXJUaW1lb3V0KHZhbGlkYXRpb24udGltZW91dCk7XG5cblx0dGltZSA9IHRpbWUgfHwgMztcblx0dGltZSAqPSAxMDAwO1xuXG5cdGlmKHJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XG5cdFx0ZGl2LmFkZENsYXNzKCdhbGVydC1zdWNjZXNzJykucmVtb3ZlQ2xhc3MoJ2FsZXJ0LWRhbmdlcicpO1xuXHR9IGVsc2Uge1xuXHRcdGRpdi5hZGRDbGFzcygnYWxlcnQtZGFuZ2VyJykucmVtb3ZlQ2xhc3MoJ2FsZXJ0LXN1Y2Nlc3MnKTtcblx0fVxuXG5cdGRpdi5odG1sKHRleHQpO1xuXHRkaXYuc2xpZGVEb3duKDcwMCk7XG5cblx0dmFsaWRhdGlvbi50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRkaXYuc2xpZGVVcCg3MDApO1xuXHR9LCB0aW1lKTtcbn07Il0sImZpbGUiOiJ2YWxpZGF0aW9uLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
