$(function() {

	$('#banner-width').on('keyup', function() {
		$('.custom-size-rectangle').width(Number($(this).val()));
		alignMiddle($('.custom-size-rectangle'), $('.scrollable'));
	});
	
	$('#banner-height').on('keyup', function() {
		$('.custom-size-rectangle').height(Number($(this).val()));
		alignMiddle($('.custom-size-rectangle'), $('.scrollable'));
	});

	$('.edit-banner').on('click', function() {
		window.open('/editor/' + $(this).parent().data('banner-id'));
	});

	$('.delete-banner').on('click', function() {
		var id = $(this).parent().data('banner-id');
		var name = $(this).parent().data('banner-name');
		var index = $(this).closest('tr').index();

		$('.delete-banner-name').text(name);
		$('.modal-banner-delete').data('href', '/api/banner/delete/' + id);
		$('.modal-banner-delete').data('index', index);
	});

	$('.modal-banner-delete').on('click', function() {
		var href = $(this).data('href');
		var index = $(this).data('index');
		var row = $('.banners-table tbody tr').eq(index);
		deleteBanner($(this), href, row);
	});

	function alignMiddle(child, parent) {
		var pWidth = parent.width();
		var pHeight = parent.height();

		var cWidth = child.width();
		var cHeight = child.height();

		if(cWidth < pWidth) {
			child.css('left', (pWidth - cWidth) / 2 );
		} else {
			child.css('left', 0);
		}

		if(cHeight < pHeight) {
			child.css('top', (pHeight - cHeight) / 2 );
		} else {
			child.css('top', 0);
		}
	}

	alignMiddle($('.custom-size-rectangle'), $('.scrollable'));

	// create banner
	$('.template .use-this').on('click', function() {
		var that = $(this);
		var name = that.data('name') || 'Untitled Banner';
		var width = that.data('width');
		var height = that.data('height');
		var url = that.data('url') || 'www.example.com';
		var data = that.data('json') || [];
		var template = false;
		createBanner(that, name, width, height, userID, url, data, template);
	});

	// create blank banner with custom size
	$('.custom-size-rectangle').on('click', bindCustomCreate);

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiYW5uZXJzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24oKSB7XG5cblx0JCgnI2Jhbm5lci13aWR0aCcpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKCkge1xuXHRcdCQoJy5jdXN0b20tc2l6ZS1yZWN0YW5nbGUnKS53aWR0aChOdW1iZXIoJCh0aGlzKS52YWwoKSkpO1xuXHRcdGFsaWduTWlkZGxlKCQoJy5jdXN0b20tc2l6ZS1yZWN0YW5nbGUnKSwgJCgnLnNjcm9sbGFibGUnKSk7XG5cdH0pO1xuXHRcblx0JCgnI2Jhbm5lci1oZWlnaHQnKS5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcblx0XHQkKCcuY3VzdG9tLXNpemUtcmVjdGFuZ2xlJykuaGVpZ2h0KE51bWJlcigkKHRoaXMpLnZhbCgpKSk7XG5cdFx0YWxpZ25NaWRkbGUoJCgnLmN1c3RvbS1zaXplLXJlY3RhbmdsZScpLCAkKCcuc2Nyb2xsYWJsZScpKTtcblx0fSk7XG5cblx0JCgnLmVkaXQtYmFubmVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0d2luZG93Lm9wZW4oJy9lZGl0b3IvJyArICQodGhpcykucGFyZW50KCkuZGF0YSgnYmFubmVyLWlkJykpO1xuXHR9KTtcblxuXHQkKCcuZGVsZXRlLWJhbm5lcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBpZCA9ICQodGhpcykucGFyZW50KCkuZGF0YSgnYmFubmVyLWlkJyk7XG5cdFx0dmFyIG5hbWUgPSAkKHRoaXMpLnBhcmVudCgpLmRhdGEoJ2Jhbm5lci1uYW1lJyk7XG5cdFx0dmFyIGluZGV4ID0gJCh0aGlzKS5jbG9zZXN0KCd0cicpLmluZGV4KCk7XG5cblx0XHQkKCcuZGVsZXRlLWJhbm5lci1uYW1lJykudGV4dChuYW1lKTtcblx0XHQkKCcubW9kYWwtYmFubmVyLWRlbGV0ZScpLmRhdGEoJ2hyZWYnLCAnL2FwaS9iYW5uZXIvZGVsZXRlLycgKyBpZCk7XG5cdFx0JCgnLm1vZGFsLWJhbm5lci1kZWxldGUnKS5kYXRhKCdpbmRleCcsIGluZGV4KTtcblx0fSk7XG5cblx0JCgnLm1vZGFsLWJhbm5lci1kZWxldGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgaHJlZiA9ICQodGhpcykuZGF0YSgnaHJlZicpO1xuXHRcdHZhciBpbmRleCA9ICQodGhpcykuZGF0YSgnaW5kZXgnKTtcblx0XHR2YXIgcm93ID0gJCgnLmJhbm5lcnMtdGFibGUgdGJvZHkgdHInKS5lcShpbmRleCk7XG5cdFx0ZGVsZXRlQmFubmVyKCQodGhpcyksIGhyZWYsIHJvdyk7XG5cdH0pO1xuXG5cdGZ1bmN0aW9uIGFsaWduTWlkZGxlKGNoaWxkLCBwYXJlbnQpIHtcblx0XHR2YXIgcFdpZHRoID0gcGFyZW50LndpZHRoKCk7XG5cdFx0dmFyIHBIZWlnaHQgPSBwYXJlbnQuaGVpZ2h0KCk7XG5cblx0XHR2YXIgY1dpZHRoID0gY2hpbGQud2lkdGgoKTtcblx0XHR2YXIgY0hlaWdodCA9IGNoaWxkLmhlaWdodCgpO1xuXG5cdFx0aWYoY1dpZHRoIDwgcFdpZHRoKSB7XG5cdFx0XHRjaGlsZC5jc3MoJ2xlZnQnLCAocFdpZHRoIC0gY1dpZHRoKSAvIDIgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2hpbGQuY3NzKCdsZWZ0JywgMCk7XG5cdFx0fVxuXG5cdFx0aWYoY0hlaWdodCA8IHBIZWlnaHQpIHtcblx0XHRcdGNoaWxkLmNzcygndG9wJywgKHBIZWlnaHQgLSBjSGVpZ2h0KSAvIDIgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2hpbGQuY3NzKCd0b3AnLCAwKTtcblx0XHR9XG5cdH1cblxuXHRhbGlnbk1pZGRsZSgkKCcuY3VzdG9tLXNpemUtcmVjdGFuZ2xlJyksICQoJy5zY3JvbGxhYmxlJykpO1xuXG5cdC8vIGNyZWF0ZSBiYW5uZXJcblx0JCgnLnRlbXBsYXRlIC51c2UtdGhpcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciB0aGF0ID0gJCh0aGlzKTtcblx0XHR2YXIgbmFtZSA9IHRoYXQuZGF0YSgnbmFtZScpIHx8ICdVbnRpdGxlZCBCYW5uZXInO1xuXHRcdHZhciB3aWR0aCA9IHRoYXQuZGF0YSgnd2lkdGgnKTtcblx0XHR2YXIgaGVpZ2h0ID0gdGhhdC5kYXRhKCdoZWlnaHQnKTtcblx0XHR2YXIgdXJsID0gdGhhdC5kYXRhKCd1cmwnKSB8fCAnd3d3LmV4YW1wbGUuY29tJztcblx0XHR2YXIgZGF0YSA9IHRoYXQuZGF0YSgnanNvbicpIHx8IFtdO1xuXHRcdHZhciB0ZW1wbGF0ZSA9IGZhbHNlO1xuXHRcdGNyZWF0ZUJhbm5lcih0aGF0LCBuYW1lLCB3aWR0aCwgaGVpZ2h0LCB1c2VySUQsIHVybCwgZGF0YSwgdGVtcGxhdGUpO1xuXHR9KTtcblxuXHQvLyBjcmVhdGUgYmxhbmsgYmFubmVyIHdpdGggY3VzdG9tIHNpemVcblx0JCgnLmN1c3RvbS1zaXplLXJlY3RhbmdsZScpLm9uKCdjbGljaycsIGJpbmRDdXN0b21DcmVhdGUpO1xuXG59KTsiXSwiZmlsZSI6ImJhbm5lcnMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

$(function() {
	
	$('.project-list').on('click', function() {
		$('a[href="/dashboard/banner/new"]').parent()
			.addClass('active')
			.siblings().removeClass('active');
	});

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwcm9qZWN0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKGZ1bmN0aW9uKCkge1xuXHRcblx0JCgnLnByb2plY3QtbGlzdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdCQoJ2FbaHJlZj1cIi9kYXNoYm9hcmQvYmFubmVyL25ld1wiXScpLnBhcmVudCgpXG5cdFx0XHQuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cdFx0XHQuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdH0pO1xuXG59KTsiXSwiZmlsZSI6InByb2plY3RzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

$(function() {
	var avatarHTML = $('.avatar').html();
	var usernameHTML = $('.username').text();

	$('.username').popover({
		html: true,
		title: avatarHTML + ' <p>' + usernameHTML + '</p>',
		content: '<a href="/logout" class="logout"><i class="fa fa-power-off"></i>  Log Out </a>'
	});

	// activate on click
	switch(window.location.pathname) {
		case '/dashboard': 
			$('.dashboard-ul li:eq(0), #banners').addClass('active'); 
			break;
		case '/dashboard/banner/new': 
			$('.dashboard-ul li:eq(1), #small-square').addClass('active');
			$('a[href="#small-square"]').parent().addClass('active');
			break;
		case '/dashboard/banner/statistics': 
			$('.dashboard-ul li:eq(2), #statistics').addClass('active'); 
			break;
	}

	var usernameTitle = $('.username-title').text();

	if(usernameTitle.length > 15) {
		usernameTitle = usernameTitle.substring(0, 12).concat('...');
		console.log(usernameTitle);
		$('.username-title').text(usernameTitle);
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24oKSB7XG5cdHZhciBhdmF0YXJIVE1MID0gJCgnLmF2YXRhcicpLmh0bWwoKTtcblx0dmFyIHVzZXJuYW1lSFRNTCA9ICQoJy51c2VybmFtZScpLnRleHQoKTtcblxuXHQkKCcudXNlcm5hbWUnKS5wb3BvdmVyKHtcblx0XHRodG1sOiB0cnVlLFxuXHRcdHRpdGxlOiBhdmF0YXJIVE1MICsgJyA8cD4nICsgdXNlcm5hbWVIVE1MICsgJzwvcD4nLFxuXHRcdGNvbnRlbnQ6ICc8YSBocmVmPVwiL2xvZ291dFwiIGNsYXNzPVwibG9nb3V0XCI+PGkgY2xhc3M9XCJmYSBmYS1wb3dlci1vZmZcIj48L2k+ICBMb2cgT3V0IDwvYT4nXG5cdH0pO1xuXG5cdC8vIGFjdGl2YXRlIG9uIGNsaWNrXG5cdHN3aXRjaCh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpIHtcblx0XHRjYXNlICcvZGFzaGJvYXJkJzogXG5cdFx0XHQkKCcuZGFzaGJvYXJkLXVsIGxpOmVxKDApLCAjYmFubmVycycpLmFkZENsYXNzKCdhY3RpdmUnKTsgXG5cdFx0XHRicmVhaztcblx0XHRjYXNlICcvZGFzaGJvYXJkL2Jhbm5lci9uZXcnOiBcblx0XHRcdCQoJy5kYXNoYm9hcmQtdWwgbGk6ZXEoMSksICNzbWFsbC1zcXVhcmUnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHQkKCdhW2hyZWY9XCIjc21hbGwtc3F1YXJlXCJdJykucGFyZW50KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnL2Rhc2hib2FyZC9iYW5uZXIvc3RhdGlzdGljcyc6IFxuXHRcdFx0JCgnLmRhc2hib2FyZC11bCBsaTplcSgyKSwgI3N0YXRpc3RpY3MnKS5hZGRDbGFzcygnYWN0aXZlJyk7IFxuXHRcdFx0YnJlYWs7XG5cdH1cblxuXHR2YXIgdXNlcm5hbWVUaXRsZSA9ICQoJy51c2VybmFtZS10aXRsZScpLnRleHQoKTtcblxuXHRpZih1c2VybmFtZVRpdGxlLmxlbmd0aCA+IDE1KSB7XG5cdFx0dXNlcm5hbWVUaXRsZSA9IHVzZXJuYW1lVGl0bGUuc3Vic3RyaW5nKDAsIDEyKS5jb25jYXQoJy4uLicpO1xuXHRcdGNvbnNvbGUubG9nKHVzZXJuYW1lVGl0bGUpO1xuXHRcdCQoJy51c2VybmFtZS10aXRsZScpLnRleHQodXNlcm5hbWVUaXRsZSk7XG5cdH1cbn0pOyJdLCJmaWxlIjoic2lkZWJhci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

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
		async: false,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJmdW5jdGlvbnMvY3JlYXRlQmFubmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNyZWF0ZUJhbm5lcih1c2VCdG4sIG5hbWUsIHdpZHRoLCBoZWlnaHQsIHVzZXJJRCwgdXJsLCBkYXRhLCB0ZW1wbGF0ZSkge1xuXHR2YXIgYmFubmVyID0ge1xuXHRcdG5hbWU6IG5hbWUsXG5cdFx0d2lkdGg6IHdpZHRoLFxuXHRcdGhlaWdodDogaGVpZ2h0LFxuXHRcdHVzZXJJRDogdXNlcklELFxuXHRcdHVybDogdXJsLFxuXHRcdGRhdGE6IGRhdGEsXG5cdFx0dGVtcGxhdGU6IHRlbXBsYXRlXG5cdH07XG5cdFxuXHQkLmFqYXgoe1xuXHRcdHVybDogJy9hcGkvYmFubmVyL25ldycsXG5cdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0ZGF0YTogYmFubmVyLFxuXHRcdGFzeW5jOiBmYWxzZSxcblx0XHR0aW1lb3V0OiAzMDAwLFxuXG5cdFx0YmVmb3JlU2VuZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZih1c2VCdG4uaGFzQ2xhc3MoJ3VzZS10aGlzJykpIHtcblx0XHRcdFx0dXNlQnRuLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR1c2VCdG4udW5iaW5kKCdjbGljaycpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRcdGFsZXJ0KCdCYW5uZXIgSGFzIHN1Y2Nlc3NmdWxseSBjcmVhdGVkICcsIHJlc3BvbnNlKTtcblx0XHR9LFxuXHRcdGVycm9yOiBmdW5jdGlvbihyZXF1ZXN0LCBlcnJvclR5cGUsIGVycm9yTWVzc2FnZSkge1xuXHRcdFx0aWYocmVxdWVzdC5zdGF0dXMgPT09IDMwMSkge1xuXHRcdFx0XHR3aW5kb3cub3BlbihcIi9lZGl0b3IvXCIgKyByZXF1ZXN0LnJlc3BvbnNlSlNPTik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhbGVydChlcnJvclR5cGUsIGVycm9yTWVzc2FnZSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZih1c2VCdG4uaGFzQ2xhc3MoJ3VzZS10aGlzJykpIHtcblx0XHRcdFx0dXNlQnRuLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR1c2VCdG4ub24oJ2NsaWNrJywgYmluZEN1c3RvbUNyZWF0ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn07XG5cbmZ1bmN0aW9uIGJpbmRDdXN0b21DcmVhdGUoKSB7XG5cdHZhciBuYW1lID0gJ1VudGl0bGVkIEJhbm5lcic7XG5cdHZhciB3aWR0aCA9ICQoJyNiYW5uZXItd2lkdGgnKS52YWwoKTtcblx0dmFyIGhlaWdodCA9ICQoJyNiYW5uZXItaGVpZ2h0JykudmFsKCk7XG5cdHZhciB1cmwgPSAnd3d3LmV4YW1wbGUuY29tJztcblx0dmFyIGRhdGEgPSBbXTtcblx0dmFyIHRlbXBsYXRlID0gZmFsc2U7XG5cdGNyZWF0ZUJhbm5lcigkKHRoaXMpLCBuYW1lLCB3aWR0aCwgaGVpZ2h0LCB1c2VySUQsIHVybCwgZGF0YSwgdGVtcGxhdGUpO1xufSJdLCJmaWxlIjoiZnVuY3Rpb25zL2NyZWF0ZUJhbm5lci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJmdW5jdGlvbnMvZGVsZXRlQmFubmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGRlbGV0ZUJhbm5lcih1c2VCdG4sIGhyZWYsIHJvdykge1xuXHRcblx0JC5hamF4KHtcblx0XHR1cmw6IGhyZWYsXG5cdFx0bWV0aG9kOiAnREVMRVRFJyxcblxuXHRcdGJlZm9yZVNlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dXNlQnRuLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cdFx0fSxcblxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHRyb3cuc2xpZGVVcCgnc2xvdycsIGZ1bmN0aW9uKCkgeyBcblx0XHRcdFx0JCh0aGlzKS5yZW1vdmUoKTtcblx0XHRcdFx0c29ydEluZGV4ZXMoJCgnLmJhbm5lcnMtdGFibGUnKSk7XG5cdFx0XHRcdHNob3dEZWxldGVBbGVydCgkKCcuZGVsZXRlLWFsZXJ0JyksICdzdWNjZXNzJywgJ0Jhbm5lciBoYXMgcmVtb3ZlZCBzdWNjZXNzZnVsbHknLCA0KTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHRlcnJvcjogZnVuY3Rpb24ocmVxdWVzdCwgZXJyb3JUeXBlLCBlcnJvck1lc3NhZ2UpIHtcblx0XHRcdHNob3dEZWxldGVBbGVydCgkKCcuZGVsZXRlLWFsZXJ0JyksICdlcnJvcicsICdTb21lIHByb2JsZW1zIG9jY3VyZWQgd2hpbGUgZGVsZXRpbmcgYmFubmVyJywgNCk7XG5cdFx0XHR1c2VCdG4ucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcblx0XHR9LFxuXG5cdFx0Y29tcGxldGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0JCgnLm1vZGFsJykubW9kYWwoJ2hpZGUnKTtcblx0XHRcdHVzZUJ0bi5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuXHRcdH1cblx0fSk7XG59O1xuXG5mdW5jdGlvbiBzb3J0SW5kZXhlcyh0YWJsZSkge1xuXHR0YWJsZS5maW5kKCd0Ym9keSB0ciAubG9vcC1pbmRleCcpLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcblx0XHQkKHRoaXMpLnRleHQoaW5kZXggKyAxKTtcblx0fSk7XG59O1xuXG52YXIgZGVsZXRlVGltZW91dDtcblxuZnVuY3Rpb24gc2hvd0RlbGV0ZUFsZXJ0KHRhZywgc3RhdHVzLCB0ZXh0LCB0aW1lKSB7XG5cdGNsZWFyVGltZW91dChkZWxldGVUaW1lb3V0KTtcblx0XG5cdHRpbWUgKj0gMTAwMDtcblxuXHRpZihzdGF0dXMgPT09ICdzdWNjZXNzJykge1xuXHRcdHRhZy5yZW1vdmVDbGFzcygnYWxlcnQtd2FybmluZycpLmFkZENsYXNzKCdhbGVydC1zdWNjZXNzJyk7XG5cdFx0dGFnLmZpbmQoJy5kZWxldGUtdGV4dCcpLnRleHQodGV4dCk7XG5cdFx0dGFnLnNob3coKTtcblx0fSBlbHNlIHtcblx0XHR0YWcucmVtb3ZlQ2xhc3MoJ2FsZXJ0LXN1Y2Nlc3MnKS5hZGRDbGFzcygnYWxlcnQtd2FybmluZycpO1xuXHRcdHRhZy5maW5kKCcuZGVsZXRlLXRleHQnKS50ZXh0KHRleHQpO1x0XHRcblx0XHR0YWcuc2hvdygpO1xuXHR9XG5cblx0Ly8gaGlkZSBhbGVydCBhZnRlciBzb21lIHRpbWVcblx0ZGVsZXRlVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0dGFnLnNsaWRlVXAoJ3Nsb3cnKTtcblx0fSwgdGltZSk7XG59OyJdLCJmaWxlIjoiZnVuY3Rpb25zL2RlbGV0ZUJhbm5lci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
