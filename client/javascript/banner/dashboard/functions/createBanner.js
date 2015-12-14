function createBanner(useBtn, name, width, height, userID, url, data, template) {
	var banner = {
		name: name,
		width: width,
		height: height,
		userID: userID,
		url: url,
		data: data,
		template: template
	};
	
	$.ajax({
		url: '/api/banner/new',
		method: 'POST',
		data: banner,
		timeout: 3000,

		beforeSend: function() {
			if(useBtn.hasClass('use-this')) {
				useBtn.attr('disabled', 'disabled');
			} else {
				useBtn.unbind('click');
			}
		},
		success: function(response) {
			alert('Banner Has successfully created ', response);
		},
		error: function(request, errorType, errorMessage) {
			if(request.status === 301) {
				window.open("/editor/" + request.responseJSON);
			} else {
				alert(errorType, errorMessage);
			}
		},
		complete: function() {
			if(useBtn.hasClass('use-this')) {
				useBtn.removeAttr('disabled');
			} else {
				useBtn.on('click', bindCustomCreate);
			}
		}
	});
};

function bindCustomCreate() {
	var name = 'Untitled Banner';
	var width = $('#banner-width').val();
	var height = $('#banner-height').val();
	var url = 'www.example.com';
	var data = [];
	var template = false;
	createBanner($(this), name, width, height, userID, url, data, template);
}