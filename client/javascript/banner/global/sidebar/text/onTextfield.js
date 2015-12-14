$(function() {
	$('.working-board').on('click', '.contenteditable', function(e) {
		$(this).find('div').focus();
		e = e || window.event;
		var caretRange = getMouseEventCaretRange(e);
		// Set a timer to allow the selection to happen and the dust settle first
		window.setTimeout(function() {
		    selectRange(caretRange);
		}, 10);
		return false;
	});

	$('.working-board').on('focus', '.editable', function (e) {
		var div = this;
		window.setTimeout(function() {
			var sel, range;
			if (window.getSelection && document.createRange) {
				range = document.createRange();
				range.selectNodeContents(div);
				range.collapse(true);
				sel = window.getSelection();
				sel.removeAllRanges();
				sel.addRange(range);
			} else if (document.body.createTextRange) {
				range = document.body.createTextRange();
				range.moveToElementText(div);
				range.collapse(true);
				range.select();
			}
		}, 1);
	});

	$('.working-board').on('keyup resize', '.contenteditable', function() {
		var width = $(this).find('.editable').width();
		var height = $(this).find('.editable').height();
		$(this).width(width);
		$(this).height(height);
	});

	$('.text-box h3').on('click', function() {
		var fontFamily = $(this).css('font-family');
		addText(workingBanner, 'Text Field', fontFamily);
		updateObjectStates(getBannerData());
	});
});