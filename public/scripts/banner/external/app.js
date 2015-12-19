if (typeof(makeResponsive) === 'undefined') {
	document.onreadystatechange = function () {
		var state = document.readyState;
		if (state == 'complete') {
			var x = document.getElementsByClassName('responsive-banner');

			for(var i = x.length - 1; i >= 0; i--) {
				var  iframe = document.createElement('IFRAME'); 
				iframe.setAttribute('src', x[i].getAttribute('data-href')); 

				iframe.style.border = 'none';
				iframe.className  ='banner';

				try {
					w = window.getComputedStyle(x[i].parentNode, null)
								.getPropertyValue('width');
				} catch(e) {
					w =  x[i].parentNode.currentStyle.width;
				} 

				iframe.setAttribute('width', w); 
				iframe.setAttribute('height',  x[i].getAttribute('data-height') * (parseInt(w)/x[i].getAttribute('data-width')) );
				x[i].parentNode.replaceChild( iframe , x[i]);
			}

			makeResponsive();

		}
	}

	var makeResponsive = function() {
		var x = document.getElementsByClassName('banner');
		var i;
		
		for (i = 0; i < x.length; i++) {
			x[i].style.overflow='hidden';
			var banner_i_w =  x[i].clientWidth;
			var banner_i_h =  x[i].clientHeight;		
				 
			try {
				var banner_p_w  = window.getComputedStyle(x[i].parentNode, null)
										  .getPropertyValue('width');
				// console.log(w);
			} catch(e) {
				var banner_p_w  =  x[i].parentNode.currentStyle.width;
			} 
			
			
			banner_p_w = parseInt(banner_p_w);
			
			var banner_ratio = banner_p_w/banner_i_w;
			x[i].width = banner_p_w;
			x[i].height = banner_i_h*banner_ratio;

			x[i].setAttribute('src', x[i].getAttribute('src')); 

		} 
	};

	window.onresize = makeResponsive;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNwb25zaXZlLWlmcmFtZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpZiAodHlwZW9mKG1ha2VSZXNwb25zaXZlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0ZG9jdW1lbnQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBzdGF0ZSA9IGRvY3VtZW50LnJlYWR5U3RhdGU7XG5cdFx0aWYgKHN0YXRlID09ICdjb21wbGV0ZScpIHtcblx0XHRcdHZhciB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVzcG9uc2l2ZS1iYW5uZXInKTtcblxuXHRcdFx0Zm9yKHZhciBpID0geC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHR2YXIgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lGUkFNRScpOyBcblx0XHRcdFx0aWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgeFtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaHJlZicpKTsgXG5cblx0XHRcdFx0aWZyYW1lLnN0eWxlLmJvcmRlciA9ICdub25lJztcblx0XHRcdFx0aWZyYW1lLmNsYXNzTmFtZSAgPSdiYW5uZXInO1xuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHhbaV0ucGFyZW50Tm9kZSwgbnVsbClcblx0XHRcdFx0XHRcdFx0XHQuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKTtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0dyA9ICB4W2ldLnBhcmVudE5vZGUuY3VycmVudFN0eWxlLndpZHRoO1xuXHRcdFx0XHR9IFxuXG5cdFx0XHRcdGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdyk7IFxuXHRcdFx0XHRpZnJhbWUuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAgeFtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaGVpZ2h0JykgKiAocGFyc2VJbnQodykveFtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtd2lkdGgnKSkgKTtcblx0XHRcdFx0eFtpXS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCggaWZyYW1lICwgeFtpXSk7XG5cdFx0XHR9XG5cblx0XHRcdG1ha2VSZXNwb25zaXZlKCk7XG5cblx0XHR9XG5cdH1cblxuXHR2YXIgbWFrZVJlc3BvbnNpdmUgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Jhbm5lcicpO1xuXHRcdHZhciBpO1xuXHRcdFxuXHRcdGZvciAoaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR4W2ldLnN0eWxlLm92ZXJmbG93PSdoaWRkZW4nO1xuXHRcdFx0dmFyIGJhbm5lcl9pX3cgPSAgeFtpXS5jbGllbnRXaWR0aDtcblx0XHRcdHZhciBiYW5uZXJfaV9oID0gIHhbaV0uY2xpZW50SGVpZ2h0O1x0XHRcblx0XHRcdFx0IFxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dmFyIGJhbm5lcl9wX3cgID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoeFtpXS5wYXJlbnROb2RlLCBudWxsKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgIC5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpO1xuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyh3KTtcblx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHR2YXIgYmFubmVyX3BfdyAgPSAgeFtpXS5wYXJlbnROb2RlLmN1cnJlbnRTdHlsZS53aWR0aDtcblx0XHRcdH0gXG5cdFx0XHRcblx0XHRcdFxuXHRcdFx0YmFubmVyX3BfdyA9IHBhcnNlSW50KGJhbm5lcl9wX3cpO1xuXHRcdFx0XG5cdFx0XHR2YXIgYmFubmVyX3JhdGlvID0gYmFubmVyX3Bfdy9iYW5uZXJfaV93O1xuXHRcdFx0eFtpXS53aWR0aCA9IGJhbm5lcl9wX3c7XG5cdFx0XHR4W2ldLmhlaWdodCA9IGJhbm5lcl9pX2gqYmFubmVyX3JhdGlvO1xuXG5cdFx0XHR4W2ldLnNldEF0dHJpYnV0ZSgnc3JjJywgeFtpXS5nZXRBdHRyaWJ1dGUoJ3NyYycpKTsgXG5cblx0XHR9IFxuXHR9O1xuXG5cdHdpbmRvdy5vbnJlc2l6ZSA9IG1ha2VSZXNwb25zaXZlO1xufSJdLCJmaWxlIjoicmVzcG9uc2l2ZS1pZnJhbWUuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
