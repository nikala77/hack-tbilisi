// $(function() {
// 	$('#backgroundColPick').colpick({
// 		layout : 'rgb',
// 		submit : false,
// 		onChange : function (hsb,rgb) {
// 			var bgColor = '#'+rgb;
// 			slideHeart.css({
// 				'background-image': 'none'
// 			});
// 			slideHeart.css({
// 				'background-color': bgColor
// 			});
// 		},
// 		onSubmit : function(hsb,hex,rgb,el) {
// 			$('#backgroundColPick').colpickHide();
// 			slideHeart.css({
// 				'background-image': 'none'
// 			});
// 			updateObjectStates(getSlideData());
// 		}
// 	});

// 	$('.background').not('.pick').on('click', function() {
// 		var color = $(this).data('color');

// 		slideHeart.css({
// 			'background-image': 'none'
// 		});
// 		slideHeart.css({
// 			'background-color': color
// 		});
// 		$('body').trigger('slideChange');
// 		updateObjectStates(getSlideData());
// 	});

// 	$('.background-image').on('click', function() {
// 		changeBackground($(this).data('url'));
// 	});

// 	$('.bg-repeat').on('change', function() {
// 		if($(this).is(":checked")) {
// 			slideHeart.css({
// 				'-webkit-background-size': 'auto',
// 				'-moz-background-size': 'auto',
// 				'-o-background-size': 'auto',
// 				'background-size': 'auto',
// 				'background-repeat': 'repeat'
// 			});
// 		} else {
// 			slideHeart.css({
// 				'-webkit-background-size': 'cover',
// 				'-moz-background-size': 'cover',
// 				'-o-background-size': 'cover',
// 				'background-size': 'cover',
// 			});
// 		}
// 	});
// });