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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhY2NvdW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24gKCkge1xuXG5cdC8vIGxvZ2luIGZvcm1cblx0JCgnI2xvZ2luJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciB0aGF0ID0gJCh0aGlzKTtcblx0XHR2YXIgZW1haWwgPSAkKCcjbG9naW5lbWFpbCcpLnZhbCgpLnRyaW0oKTtcblx0XHR2YXIgcGFzc3dvcmQgPSAkKCcjbG9naW5wYXNzd29yZCcpLnZhbCgpLnRyaW0oKTtcblxuXHRcdGlmICghZW1haWwgfHwgIXBhc3N3b3JkKSB7XG5cdFx0XHRzaG93VmFsaWRhdGlvbigkKCcubG9naW4td2FybmluZycpLCAnUGxlYXNlIGZpbGwgYWxsIGZpZWxkcyEnLCAnZXJyb3InKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHR1cmw6ICcvbG9naW4nLFxuXHRcdFx0XHRkYXRhOiB7IGVtYWlsOiBlbWFpbCwgcGFzc3dvcmQ6IHBhc3N3b3JkIH0sXG5cdFx0XHRcdGJlZm9yZVNlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHN0YXJ0TG9hZGluZyh0aGF0LmZpbmQoJ2J1dHRvblt0eXBlPXN1Ym1pdF0nKSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdFx0ZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICcvJztcblx0XHRcdFx0fSxcblx0XHRcdFx0Y29tcGxldGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGZpbmlzaExvYWRpbmcodGhhdC5maW5kKCdidXR0b25bdHlwZT1zdWJtaXRdJykpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KS5mYWlsKGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZShkYXRhLnJlc3BvbnNlVGV4dCkubWVzc2FnZTsgXG5cdFx0XHRcdHNob3dWYWxpZGF0aW9uKCQoJy5sb2dpbi13YXJuaW5nJyksIG1lc3NhZ2UsICdlcnJvcicpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcblxuXG5cblxuXHQvLyBzaWdudXAgZm9ybSBcblx0JCgnI3NpZ251cCcpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgdGhhdCA9ICQodGhpcyk7XG5cdFx0dmFyIGVtYWlsID0gJCgnI3NpZ251cGVtYWlsJykudmFsKCkudHJpbSgpO1xuXHRcdHZhciBwYXNzd29yZCA9ICQoJyNzaWdudXBwYXNzJykudmFsKCkudHJpbSgpO1xuXG5cdFx0aWYgKCFlbWFpbCB8fCAhcGFzc3dvcmQpIHtcblx0XHRcdFxuXHRcdFx0c2hvd1ZhbGlkYXRpb24oJCgnLnNpZ251cC13YXJuaW5nJyksICdQbGVhc2UgZmlsbCBhbGwgZmllbGRzIScsICdlcnJvcicpO1xuXHRcdFxuXHRcdH0gZWxzZSBpZighaXNFbWFpbChlbWFpbCkpIHtcblxuXHRcdFx0c2hvd1ZhbGlkYXRpb24oJCgnLnNpZ251cC13YXJuaW5nJyksICdQbGVhc2UgZW50ZXIgdmFsaWQgZW1haWwhJywgJ2Vycm9yJyk7XG5cblx0XHR9IGVsc2UgaWYocGFzc3dvcmQubGVuZ3RoIDwgNikge1xuXG5cdFx0XHRzaG93VmFsaWRhdGlvbigkKCcuc2lnbnVwLXdhcm5pbmcnKSwgJ1Bhc3N3b3JkIG11c3QgY29udGFpbiBhdCBsZWFzdCA2IHN5bWJvbCEnLCAnZXJyb3InKTtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRcblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0dXJsOiAnL3NpZ251cCcsXG5cdFx0XHRcdGRhdGE6ICQoJyNzaWdudXAnKS5zZXJpYWxpemUoKSxcblx0XHRcdFx0YmVmb3JlU2VuZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0c3RhcnRMb2FkaW5nKHRoYXQuZmluZCgnYnV0dG9uW3R5cGU9c3VibWl0XScpKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRkb2N1bWVudC5sb2NhdGlvbi5ocmVmPScvbG9naW4/dHlwZT1zdWNjZXNzJytcblx0XHRcdFx0XHQnJm1lc3NhZ2U9JysgZGF0YS5tZXNzYWdlO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0ZmluaXNoTG9hZGluZyh0aGF0LmZpbmQoJ2J1dHRvblt0eXBlPXN1Ym1pdF0nKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0c2hvd1ZhbGlkYXRpb24oJCgnLnNpZ251cC13YXJuaW5nJyksIGRhdGEucmVzcG9uc2VKU09OLnJlYXNvbiwgJ2Vycm9yJyk7XG5cdFx0XHR9KTtcblxuXHRcdH1cblxuXHR9KTtcblxuXHQvLyBmb3Jnb3Rcblx0JCgnI2ZvcmdvdCcpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgdGhhdCA9ICQodGhpcyk7XG5cdFx0dmFyIGVtYWlsID0gJCgnI2ZvcmdvdGVtYWlsJykudmFsKCkudHJpbSgpO1xuXG5cdFx0aWYgKCFlbWFpbCkge1xuXHRcdFxuXHRcdFx0c2hvd1ZhbGlkYXRpb24oJCgnLmZvcmdvdC13YXJuaW5nJyksICdQbGVhc2UgZW50ZXIgZW1haWwhJywgJ2Vycm9yJyk7XG5cdFx0XG5cdFx0fSBlbHNlIGlmKCFpc0VtYWlsKGVtYWlsKSkge1xuXG5cdFx0XHRzaG93VmFsaWRhdGlvbigkKCcuZm9yZ290LXdhcm5pbmcnKSwgJ1BsZWFzZSBlbnRlciB2YWxpZCBlbWFpbCEnLCAnZXJyb3InKTtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR0eXBlOiBcIlBPU1RcIixcblx0XHRcdFx0dXJsOiAnL2ZvcmdvdCcsXG5cdFx0XHRcdGRhdGE6ICQoJyNmb3Jnb3QnKS5zZXJpYWxpemUoKSxcblx0XHRcdFx0YmVmb3JlU2VuZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0c3RhcnRMb2FkaW5nKHRoYXQuZmluZCgnYnV0dG9uW3R5cGU9c3VibWl0XScpKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRkb2N1bWVudC5sb2NhdGlvbi5ocmVmPScvbG9naW4/dHlwZT1zdWNjZXNzJytcblx0XHRcdFx0XHQnJm1lc3NhZ2U9JysgZGF0YS5tZXNzYWdlO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0ZmluaXNoTG9hZGluZyh0aGF0LmZpbmQoJ2J1dHRvblt0eXBlPXN1Ym1pdF0nKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0c2hvd1ZhbGlkYXRpb24oJCgnLmZvcmdvdC13YXJuaW5nJyksIGRhdGEucmVzcG9uc2VKU09OLm1lc3NhZ2UsICdlcnJvcicpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcblxuXHQvLyByZXNldFxuXHQkKCcjcmVzZXQnKS5vbignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dmFyIHRoYXQgPSAkKHRoaXMpO1xuXHRcdHZhciBwYXNzd29yZCA9ICQoJyNyZXNldHBhc3MnKS52YWwoKS50cmltKCk7XG5cdFx0dmFyIHJlcGVhdFBhc3N3b3JkID0gJCgnI3JlcGVhdHBhc3MnKS52YWwoKS50cmltKCk7XG5cblx0XHRpZiAoIXBhc3N3b3JkIHx8ICFyZXBlYXRQYXNzd29yZCkge1xuXHRcdFx0XG5cdFx0XHRzaG93VmFsaWRhdGlvbigkKCcucmVzZXQtd2FybmluZycpLCAnUGxlYXNlIGZpbGwgYWxsIHRoZSBmaWVsZHMhJywgJ2Vycm9yJyk7XG5cblx0XHR9IGVsc2UgaWYgKHBhc3N3b3JkICE9PSByZXBlYXRQYXNzd29yZCkge1xuXHRcdFx0XG5cdFx0XHRzaG93VmFsaWRhdGlvbigkKCcucmVzZXQtd2FybmluZycpLCAnVmFsdWUgb2YgdGhlc2UgdHdvIGZpZWxkcyBtdXN0IGJlIHRoZSBzYW1lIScsICdlcnJvcicpO1xuXG5cdFx0fSBlbHNlIGlmKCBwYXNzd29yZC5sZW5ndGggPCA2ICkge1xuXG5cdFx0XHRzaG93VmFsaWRhdGlvbigkKCcucmVzZXQtd2FybmluZycpLCAnUGFzc3dvcmQgbXVzdCBjb250YWluIGF0IGxlYXN0IDYgc3ltYm9sIScsICdlcnJvcicpO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdFx0dXJsOiBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSxcblx0XHRcdFx0ZGF0YTogeyBwYXNzd29yZDogcGFzc3dvcmQsIHJlcGVhdFBhc3N3b3JkOiByZXBlYXRQYXNzd29yZCB9LFxuXHRcdFx0XHRiZWZvcmVTZW5kOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRzdGFydExvYWRpbmcodGhhdC5maW5kKCdidXR0b25bdHlwZT1zdWJtaXRdJykpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRcdGRvY3VtZW50LmxvY2F0aW9uLmhyZWY9Jy9sb2dpbj90eXBlPXN1Y2Nlc3MnK1xuXHRcdFx0XHRcdCcmbWVzc2FnZT0nKyBkYXRhLm1lc3NhZ2U7O1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0ZmluaXNoTG9hZGluZyh0aGF0LmZpbmQoJ2J1dHRvblt0eXBlPXN1Ym1pdF0nKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0c2hvd1ZhbGlkYXRpb24oJCgnLnJlc2V0LXdhcm5pbmcnKSwgZGF0YS5tZXNzYWdlLCAnZXJyb3InKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG59KTsiXSwiZmlsZSI6ImFjY291bnQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

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

function startLoading(btn) {
	btn.addClass('disabled');
	var img = $('<img src="/images/loading.gif" alt="load" class="loading-gif">');
	btn.append(img);
};

function finishLoading(btn) {
	btn.removeClass('disabled');
	btn.find('img.loading-gif').remove();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsb2dpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKGZ1bmN0aW9uKCkge1xuXHR2YXIgc2VhcmNoID0gZ2V0VXJsVmFycygpO1xuXHR2YXIgdHlwZSA9IHNlYXJjaC50eXBlO1xuXHR2YXIgbWVzc2FnZSA9IHNlYXJjaC5tZXNzYWdlO1xuXG5cdGlmKHR5cGUgPT09ICdzdWNjZXNzJykge1xuXHRcdG1lc3NhZ2UgPSBtZXNzYWdlLnNwbGl0KCclMjAnKS5qb2luKCcgJyk7XG5cdFx0c2hvd0FsZXJ0VmFsaWRhdGlvbigkKCcucmVkaXJlY3QtYWxlcnQnKSwgbWVzc2FnZSwgdHlwZSwgNSk7XG5cdH1cbn0pO1xuXG5mdW5jdGlvbiBnZXRVcmxWYXJzKCkge1xuXHR2YXIgdmFycyA9IFtdLCBoYXNoO1xuXHR2YXIgaGFzaGVzID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc2xpY2Uod2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignPycpICsgMSkuc3BsaXQoJyYnKTtcblx0XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBoYXNoZXMubGVuZ3RoOyBpKyspIHtcblx0XHRoYXNoID0gaGFzaGVzW2ldLnNwbGl0KCc9Jyk7XG5cdFx0dmFycy5wdXNoKGhhc2hbMF0pO1xuXHRcdHZhcnNbaGFzaFswXV0gPSBoYXNoWzFdO1xuXHR9XG5cblx0cmV0dXJuIHZhcnM7XG59O1xuXG5mdW5jdGlvbiBpc0VtYWlsKGVtYWlsKSB7XG5cdHZhciByZSA9IC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XG5cdHJldHVybiByZS50ZXN0KGVtYWlsKTtcbn07XG5cbmZ1bmN0aW9uIHN0YXJ0TG9hZGluZyhidG4pIHtcblx0YnRuLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXHR2YXIgaW1nID0gJCgnPGltZyBzcmM9XCIvaW1hZ2VzL2xvYWRpbmcuZ2lmXCIgYWx0PVwibG9hZFwiIGNsYXNzPVwibG9hZGluZy1naWZcIj4nKTtcblx0YnRuLmFwcGVuZChpbWcpO1xufTtcblxuZnVuY3Rpb24gZmluaXNoTG9hZGluZyhidG4pIHtcblx0YnRuLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuXHRidG4uZmluZCgnaW1nLmxvYWRpbmctZ2lmJykucmVtb3ZlKCk7XG59OyJdLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

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
