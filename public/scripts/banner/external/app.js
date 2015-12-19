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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNwb25zaXZlLWlmcmFtZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpZiAodHlwZW9mKG1ha2VSZXNwb25zaXZlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0ZG9jdW1lbnQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBzdGF0ZSA9IGRvY3VtZW50LnJlYWR5U3RhdGU7XG5cdFx0aWYgKHN0YXRlID09ICdjb21wbGV0ZScpIHtcblx0XHRcdHZhciB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVzcG9uc2l2ZS1iYW5uZXInKTtcblxuXHRcdFx0Zm9yKHZhciBpID0geC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHR2YXIgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lGUkFNRScpOyBcblx0XHRcdFx0aWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgeFtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaHJlZicpKTsgXG5cdFx0XHRcdFxuXHRcdFx0XHRpZnJhbWUuc3R5bGUuYm9yZGVyID0gJ25vbmUnO1xuXHRcdFx0XHRpZnJhbWUuY2xhc3NOYW1lICA9J2Jhbm5lcic7XG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR3ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoeFtpXS5wYXJlbnROb2RlLCBudWxsKVxuXHRcdFx0XHRcdFx0XHRcdC5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHR3ID0gIHhbaV0ucGFyZW50Tm9kZS5jdXJyZW50U3R5bGUud2lkdGg7XG5cdFx0XHRcdH0gXG5cblx0XHRcdFx0aWZyYW1lLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3KTsgXG5cdFx0XHRcdGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICB4W2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1oZWlnaHQnKSAqIChwYXJzZUludCh3KS94W2ldLmdldEF0dHJpYnV0ZSgnZGF0YS13aWR0aCcpKSApO1xuXHRcdFx0XHR4W2ldLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKCBpZnJhbWUgLCB4W2ldKTtcblx0XHRcdH1cblxuXHRcdFx0bWFrZVJlc3BvbnNpdmUoKTtcblxuXHRcdH1cblx0fVxuXG5cdHZhciBtYWtlUmVzcG9uc2l2ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYmFubmVyJyk7XG5cdFx0dmFyIGk7XG5cdFx0XG5cdFx0Zm9yIChpID0gMDsgaSA8IHgubGVuZ3RoOyBpKyspIHtcblx0XHRcdHhbaV0uc3R5bGUub3ZlcmZsb3c9J2hpZGRlbic7XG5cdFx0XHR2YXIgYmFubmVyX2lfdyA9ICB4W2ldLmNsaWVudFdpZHRoO1xuXHRcdFx0dmFyIGJhbm5lcl9pX2ggPSAgeFtpXS5jbGllbnRIZWlnaHQ7XHRcdFxuXHRcdFx0XHQgXG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2YXIgYmFubmVyX3BfdyAgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh4W2ldLnBhcmVudE5vZGUsIG51bGwpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAgLmdldFByb3BlcnR5VmFsdWUoJ3dpZHRoJyk7XG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKHcpO1xuXHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdHZhciBiYW5uZXJfcF93ICA9ICB4W2ldLnBhcmVudE5vZGUuY3VycmVudFN0eWxlLndpZHRoO1xuXHRcdFx0fSBcblx0XHRcdFxuXHRcdFx0XG5cdFx0XHRiYW5uZXJfcF93ID0gcGFyc2VJbnQoYmFubmVyX3Bfdyk7XG5cdFx0XHRcblx0XHRcdHZhciBiYW5uZXJfcmF0aW8gPSBiYW5uZXJfcF93L2Jhbm5lcl9pX3c7XG5cdFx0XHR4W2ldLndpZHRoID0gYmFubmVyX3Bfdztcblx0XHRcdHhbaV0uaGVpZ2h0ID0gYmFubmVyX2lfaCpiYW5uZXJfcmF0aW87XG5cblx0XHRcdHhbaV0uc2V0QXR0cmlidXRlKCdzcmMnLCB4W2ldLmdldEF0dHJpYnV0ZSgnc3JjJykpOyBcblxuXHRcdH0gXG5cdH07XG5cblx0d2luZG93Lm9ucmVzaXplID0gbWFrZVJlc3BvbnNpdmU7XG59Il0sImZpbGUiOiJyZXNwb25zaXZlLWlmcmFtZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
