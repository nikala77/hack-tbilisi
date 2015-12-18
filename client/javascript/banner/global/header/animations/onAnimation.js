$(function() {
	$('#animationDropdown').on('click', function(e) {
		e.stopPropagation();
	});

	$('.animation-tabs a').on('click', function (e) {
		e.preventDefault();
		$(this).tab('show');
	});

	$('.animation-button').on('click', function() {
		$(this).siblings().removeClass('active-animation');
		$(this).addClass('active-animation');
	});

	$('#animation-save-btn').on('click', function() {
		var enter = $('#enter-stage');
		var exit = $('#exit-stage');
		var complex = $('#complex');
		
		$('#animationDropdown').dropdown('toggle');
		if(enter.hasClass('active')) {
			var startTime = $('.enter-start-time').val();
			var delay = $('.enter-delay').val();
			var animation = $('#enter-stage-content .active-animation').find('a').data('animation');
			var tag;
			if(workingBanner.find('.contenteditable[data-active="true"]').length) {
				tag = $('.contenteditable[data-active="true"]');
			} else {
				tag = workingBanner.find('.ft-container[data-active="true"]').children().not('.ft-controls');
			}

			tag.data('enter-animation', animation);
			tag.data('enter-start', startTime);
			tag.data('enter-delay', delay);
			return;
		}

		if(exit.hasClass('active')) {
			var startTime = $('.exit-start-time').val();
			var delay = $('.exit-delay').val();
			var animation = $('#exit-stage-content .active-animation').find('a').data('animation');
			var tag;

			if(workingBanner.find('.contenteditable[data-active="true"]').length) {
				tag = $('.contenteditable[data-active="true"]');
			} else {
				tag = workingBanner.find('.ft-container[data-active="true"]').children().not('.ft-controls');
			}

			tag.data('exit-animation', animation);
			tag.data('exit-start', startTime);
			tag.data('exit-delay', delay);
			return;
		}

		if(complex.hasClass('active')) {
			var startTime = $('.complex-start-time').val();
			var animation = $('#complex-content .active-animation').find('a').data('animation');
			var tag;

			if(workingBanner.find('.contenteditable[data-active="true"]').length) {
				tag = $('.contenteditable[data-active="true"]');
			} else {
				tag = workingBanner.find('.ft-container[data-active="true"]').children().not('.ft-controls');
			}
			
			tag.data('enter-animation', animation);
			tag.data('enter-start', startTime);
			tag.data('enter-delay', -1912);
			return;
		}
	});
});