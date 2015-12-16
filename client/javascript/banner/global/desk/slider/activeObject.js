function activateObject (shape) {
	
	var zIndex = parseInt(shape.css('z-index'));

	if(shape.hasClass('contenteditable')) {
		shape.find('div').show();

		var top = parseInt(shape.css('top')) + 5;
		var left = parseInt(shape.css('left')) + parseInt(shape.width()) + 25;
		
		shape.css('z-index', zIndex);
		isSelected = true;
		shape.attr('data-active', 'true');

		activateControlPanel(shape, top, left);
		activeObject = shape;
		activateAnimation(shape);
		return;
	}

	shape.freetrans('controls', true);

	if (zIndex) {
		var controls = shape.siblings('.ft-controls');
		var top = controls.position().top - 5;
		var left = controls.position().left + controls.width() + 25;
		var container = shape.parent('.ft-container');

		controls.css('z-index', zIndex);
		isSelected = true;
		shape.attr('data-active', 'true');
		container.attr('data-active', true);
		activateControlPanel(shape, top, left);
		activeObject = shape;
		activateAnimation(shape);
	}

};


function removeActiveObject () {
	groupArr.forEach(function (shape) {
		if(shape.hasClass('contenteditable')) {
			var editable = shape.find('div.editable');
			shape.attr('data-active', 'false');
			editable.blur();
			editable.siblings().hide();
			return;
		}
		if (shape.attr('data-active', 'true')) {
			shape.attr('data-active', 'false');
			shape.parent('.ft-container').attr('data-active', 'false');
			shape.freetrans('controls', false);
		}
	});
};

function getActiveObject () {
	var obj; 
	groupArr.forEach(function (shape) {
		if (shape.attr('data-active') === 'true') {
			obj = shape;
			return;
		}
	});
	return obj;
};

function activateAnimation(obj) {
	var enterAnimation = obj.data('enter-animation');
	var exitAnimation = obj.data('exit-animation');

	var enterStartTime = obj.data('enter-start');
	var enterDelay = obj.data('enter-delay');
	enterStartTime = enterStartTime ? enterStartTime : 1;
	enterDelay = enterDelay ? enterDelay : 1;

	var exitStartTime = obj.data('exit-start');
	var exitDelay = obj.data('exit-delay');
	exitStartTime = exitStartTime ? exitStartTime : 1;
	exitDelay = exitDelay ? exitDelay : 1;

	if(enterDelay !== -1912) {
		$('.enter-start-time').val(enterStartTime);
		$('.enter-delay').val(enterDelay);
	} else {
		$('.common-start-time').val(enterStartTime);
	}

	$('.animation-tab-content li a').removeClass('active-animation');

	var enterTag = $('[data-animation="'+ enterAnimation +'"]');
	enterTag.addClass('active-animation');
	enterTag.parent().siblings().find('a').removeClass('active-animation');

	var exitTag = $('[data-animation="'+ exitAnimation +'"]');
	exitTag.addClass('active-animation');
	exitTag.parent().siblings().find('a').removeClass('active-animation');

	$('.exit-start-time').val(exitStartTime);
	$('.exit-delay').val(exitDelay);

	if(enterAnimation === 'none') {
		$('#enter-stage-content li a').removeClass('active-animation');
		$('#common-content li a').removeClass('active-animation');
	}

	if(exitAnimation === 'none') {
		$('#exit-stage li a').removeClass('active-animation');
	}
	// if(obj[0].type !== 'textarea') {
	// 	$('.common-animation').show();
	// } else {
	// 	$('.common-animation').hide();
	// }
};