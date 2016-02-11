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