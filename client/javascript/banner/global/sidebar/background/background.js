function updateBgRepeat() {
	if(slideHeart.css('background-repeat') === 'repeat') {
		$('.bg-repeat').attr('checked', true);
	} else {
		$('.bg-repeat').attr('checked', false);
	}
};

function changeBackground(filename) {
	slideHeart.css('background-image', 'url("'+ filename +'")');
};