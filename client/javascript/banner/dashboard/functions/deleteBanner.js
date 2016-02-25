function deleteBanner(useBtn, href, row) {
	
	$.ajax({
		url: href,
		method: 'DELETE',

		beforeSend: function() {
			useBtn.attr('disabled', 'disabled');
		},

		success: function(response) {
			row.slideUp('slow', function() { 
				$(this).remove();
				sortIndexes($('.banners-table'));
				showDeleteAlert($('.delete-alert'), 'success', 'Banner has removed successfully', 4);
			});
		},

		error: function(request, errorType, errorMessage) {
			showDeleteAlert($('.delete-alert'), 'error', 'Some problems occured while deleting banner', 4);
			useBtn.removeAttr('disabled');
		},

		complete: function() {
			$('.modal').modal('hide');
			useBtn.removeAttr('disabled');
		}
	});
};

function sortIndexes(table) {
	table.find('tbody tr .loop-index').each(function(index) {
		$(this).text(index + 1);
	});
};

var deleteTimeout;

function showDeleteAlert(tag, status, text, time) {
	clearTimeout(deleteTimeout);
	
	time *= 1000;

	if(status === 'success') {
		tag.removeClass('alert-warning').addClass('alert-success');
		tag.find('.delete-text').text(text);
		tag.show();
	} else {
		tag.removeClass('alert-success').addClass('alert-warning');
		tag.find('.delete-text').text(text);		
		tag.show();
	}

	// hide alert after some time
	deleteTimeout = setTimeout(function() {
		tag.slideUp('slow');
	}, time);
};