$(function() {

	// show tools on mouseover
	$('.banner-thumbnail').on('mouseover', function() {
		$(this).find('.tools').show();
	}).on('mouseout', function() {
		$(this).find('.tools').hide();
	});

	$('#banner-width').on('keyup', function() {
		$('.custom-size-rectangle').width(Number($(this).val()));
		alignMiddle($('.custom-size-rectangle'), $('.scrollable'));
	});
	
	$('#banner-height').on('keyup', function() {
		$('.custom-size-rectangle').height(Number($(this).val()));
		alignMiddle($('.custom-size-rectangle'), $('.scrollable'));
	});

	$('.edit-banner').on('click', function() {
		window.open('/editor/' + $(this).data('id'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiYW5uZXJzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24oKSB7XG5cblx0Ly8gc2hvdyB0b29scyBvbiBtb3VzZW92ZXJcblx0JCgnLmJhbm5lci10aHVtYm5haWwnKS5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XG5cdFx0JCh0aGlzKS5maW5kKCcudG9vbHMnKS5zaG93KCk7XG5cdH0pLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xuXHRcdCQodGhpcykuZmluZCgnLnRvb2xzJykuaGlkZSgpO1xuXHR9KTtcblxuXHQkKCcjYmFubmVyLXdpZHRoJykub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XG5cdFx0JCgnLmN1c3RvbS1zaXplLXJlY3RhbmdsZScpLndpZHRoKE51bWJlcigkKHRoaXMpLnZhbCgpKSk7XG5cdFx0YWxpZ25NaWRkbGUoJCgnLmN1c3RvbS1zaXplLXJlY3RhbmdsZScpLCAkKCcuc2Nyb2xsYWJsZScpKTtcblx0fSk7XG5cdFxuXHQkKCcjYmFubmVyLWhlaWdodCcpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKCkge1xuXHRcdCQoJy5jdXN0b20tc2l6ZS1yZWN0YW5nbGUnKS5oZWlnaHQoTnVtYmVyKCQodGhpcykudmFsKCkpKTtcblx0XHRhbGlnbk1pZGRsZSgkKCcuY3VzdG9tLXNpemUtcmVjdGFuZ2xlJyksICQoJy5zY3JvbGxhYmxlJykpO1xuXHR9KTtcblxuXHQkKCcuZWRpdC1iYW5uZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHR3aW5kb3cub3BlbignL2VkaXRvci8nICsgJCh0aGlzKS5kYXRhKCdpZCcpKTtcblx0fSk7XG5cblx0ZnVuY3Rpb24gYWxpZ25NaWRkbGUoY2hpbGQsIHBhcmVudCkge1xuXHRcdHZhciBwV2lkdGggPSBwYXJlbnQud2lkdGgoKTtcblx0XHR2YXIgcEhlaWdodCA9IHBhcmVudC5oZWlnaHQoKTtcblxuXHRcdHZhciBjV2lkdGggPSBjaGlsZC53aWR0aCgpO1xuXHRcdHZhciBjSGVpZ2h0ID0gY2hpbGQuaGVpZ2h0KCk7XG5cblx0XHRpZihjV2lkdGggPCBwV2lkdGgpIHtcblx0XHRcdGNoaWxkLmNzcygnbGVmdCcsIChwV2lkdGggLSBjV2lkdGgpIC8gMiApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjaGlsZC5jc3MoJ2xlZnQnLCAwKTtcblx0XHR9XG5cblx0XHRpZihjSGVpZ2h0IDwgcEhlaWdodCkge1xuXHRcdFx0Y2hpbGQuY3NzKCd0b3AnLCAocEhlaWdodCAtIGNIZWlnaHQpIC8gMiApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjaGlsZC5jc3MoJ3RvcCcsIDApO1xuXHRcdH1cblx0fVxuXG5cdGFsaWduTWlkZGxlKCQoJy5jdXN0b20tc2l6ZS1yZWN0YW5nbGUnKSwgJCgnLnNjcm9sbGFibGUnKSk7XG5cblx0Ly8gY3JlYXRlIGJhbm5lclxuXHQkKCcudGVtcGxhdGUgLnVzZS10aGlzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHRoYXQgPSAkKHRoaXMpO1xuXHRcdHZhciBuYW1lID0gdGhhdC5kYXRhKCduYW1lJykgfHwgJ1VudGl0bGVkIEJhbm5lcic7XG5cdFx0dmFyIHdpZHRoID0gdGhhdC5kYXRhKCd3aWR0aCcpO1xuXHRcdHZhciBoZWlnaHQgPSB0aGF0LmRhdGEoJ2hlaWdodCcpO1xuXHRcdHZhciB1cmwgPSB0aGF0LmRhdGEoJ3VybCcpIHx8ICd3d3cuZXhhbXBsZS5jb20nO1xuXHRcdHZhciBkYXRhID0gdGhhdC5kYXRhKCdqc29uJykgfHwgW107XG5cdFx0dmFyIHRlbXBsYXRlID0gZmFsc2U7XG5cdFx0Y3JlYXRlQmFubmVyKHRoYXQsIG5hbWUsIHdpZHRoLCBoZWlnaHQsIHVzZXJJRCwgdXJsLCBkYXRhLCB0ZW1wbGF0ZSk7XG5cdH0pO1xuXG5cdC8vIGNyZWF0ZSBibGFuayBiYW5uZXIgd2l0aCBjdXN0b20gc2l6ZVxuXHQkKCcuY3VzdG9tLXNpemUtcmVjdGFuZ2xlJykub24oJ2NsaWNrJywgYmluZEN1c3RvbUNyZWF0ZSk7XG5cbn0pOyJdLCJmaWxlIjoiYmFubmVycy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

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
		content: '<a href="/logout" class="logout pull-right"><i class="fa fa-power-off"></i>  Log Out </a>'
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24oKSB7XG5cdHZhciBhdmF0YXJIVE1MID0gJCgnLmF2YXRhcicpLmh0bWwoKTtcblx0dmFyIHVzZXJuYW1lSFRNTCA9ICQoJy51c2VybmFtZScpLnRleHQoKTtcblxuXHQkKCcudXNlcm5hbWUnKS5wb3BvdmVyKHtcblx0XHRodG1sOiB0cnVlLFxuXHRcdHRpdGxlOiBhdmF0YXJIVE1MICsgJyA8cD4nICsgdXNlcm5hbWVIVE1MICsgJzwvcD4nLFxuXHRcdGNvbnRlbnQ6ICc8YSBocmVmPVwiL2xvZ291dFwiIGNsYXNzPVwibG9nb3V0IHB1bGwtcmlnaHRcIj48aSBjbGFzcz1cImZhIGZhLXBvd2VyLW9mZlwiPjwvaT4gIExvZyBPdXQgPC9hPidcblx0fSk7XG5cblx0Ly8gYWN0aXZhdGUgb24gY2xpY2tcblx0c3dpdGNoKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkge1xuXHRcdGNhc2UgJy9kYXNoYm9hcmQnOiBcblx0XHRcdCQoJy5kYXNoYm9hcmQtdWwgbGk6ZXEoMCksICNiYW5uZXJzJykuYWRkQ2xhc3MoJ2FjdGl2ZScpOyBcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJy9kYXNoYm9hcmQvYmFubmVyL25ldyc6IFxuXHRcdFx0JCgnLmRhc2hib2FyZC11bCBsaTplcSgxKSwgI3NtYWxsLXNxdWFyZScpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdCQoJ2FbaHJlZj1cIiNzbWFsbC1zcXVhcmVcIl0nKS5wYXJlbnQoKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICcvZGFzaGJvYXJkL2Jhbm5lci9zdGF0aXN0aWNzJzogXG5cdFx0XHQkKCcuZGFzaGJvYXJkLXVsIGxpOmVxKDIpLCAjc3RhdGlzdGljcycpLmFkZENsYXNzKCdhY3RpdmUnKTsgXG5cdFx0XHRicmVhaztcblx0fVxufSk7Il0sImZpbGUiOiJzaWRlYmFyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

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
