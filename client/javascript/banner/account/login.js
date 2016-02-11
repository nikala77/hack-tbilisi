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