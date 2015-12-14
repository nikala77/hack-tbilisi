$(function() {
	$('.animation-dropdown').on('click', function(e) {
		e.stopPropagation();
	});

	$('.animation-tabs a').on('click', function (e) {
		e.preventDefault();
		$(this).tab('show');
	});

	$('.animation-tab-content li a').on('click', function() {
		$(this).parent().siblings().find('a').removeClass('active-animation');
		$(this).addClass('active-animation');
	});

	$('.save-animation').on('click', function() {
		var enter = $('#enter-stage');
		var exit = $('#exit-stage');
		var complex = $('#complex-stage');
		
		$('#animation-dropdown').dropdown('toggle');

		if(enter.hasClass('active')) {
			var startTime = $('.enter-start-time').val();
			var delay = $('.enter-delay').val();
			var animation = $('#enter-stage .active-animation').data('animation');
			var tag;

			if(slideHeart.find('.contenteditable[data-active="true"]').length) {
				tag = $('.contenteditable[data-active="true"]');
			} else {
				tag = slideHeart.find('.ft-container[data-active="true"]').children().not('.ft-controls');
			}

			tag.data('enter-animation', animation);
			tag.data('enter-start', startTime);
			tag.data('enter-delay', delay);
			return;
		}

		if(exit.hasClass('active')) {
			var startTime = $('.exit-start-time').val();
			var delay = $('.exit-delay').val();
			var animation = $('#exit-stage .active-animation').data('animation');
			var tag;

			if(slideHeart.find('.contenteditable[data-active="true"]').length) {
				tag = $('.contenteditable[data-active="true"]');
			} else {
				tag = slideHeart.find('.ft-container[data-active="true"]').children().not('.ft-controls');
			}

			tag.data('exit-animation', animation);
			tag.data('exit-start', startTime);
			tag.data('exit-delay', delay);
			return;
		}

		if(complex.hasClass('active')) {
			var startTime = $('.complex-start-time').val();
			var animation = $('#complex-stage .active-animation').data('animation');
			var tag;

			if(slideHeart.find('.contenteditable[data-active="true"]').length) {
				tag = $('.contenteditable[data-active="true"]');
			} else {
				tag = slideHeart.find('.ft-container[data-active="true"]').children().not('.ft-controls');
			}
			
			tag.data('enter-animation', animation);
			tag.data('enter-start', startTime);
			tag.data('enter-delay', -1912);
			return;
		}
	});
});