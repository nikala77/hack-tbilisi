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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJyZXNwb25zaXZlLWlmcmFtZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpZiAodHlwZW9mKG1ha2VSZXNwb25zaXZlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0ZG9jdW1lbnQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBzdGF0ZSA9IGRvY3VtZW50LnJlYWR5U3RhdGU7XG5cdFx0aWYgKHN0YXRlID09ICdjb21wbGV0ZScpIHtcblx0XHRcdHZhciB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVzcG9uc2l2ZS1iYW5uZXInKTtcblxuXHRcdFx0Zm9yKHZhciBpID0geC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHR2YXIgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lGUkFNRScpOyBcblx0XHRcdFx0aWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgeFtpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaHJlZicpKTsgXG5cdFx0XHRcdGlmcmFtZS5zdHlsZS5ib3JkZXIgPSAnbm9uZSc7XG5cdFx0XHRcdGlmcmFtZS5jbGFzc05hbWUgID0nYmFubmVyJztcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHcgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh4W2ldLnBhcmVudE5vZGUsIG51bGwpXG5cdFx0XHRcdFx0XHRcdFx0LmdldFByb3BlcnR5VmFsdWUoJ3dpZHRoJyk7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHcgPSAgeFtpXS5wYXJlbnROb2RlLmN1cnJlbnRTdHlsZS53aWR0aDtcblx0XHRcdFx0fSBcblxuXHRcdFx0XHRpZnJhbWUuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHcpOyBcblx0XHRcdFx0aWZyYW1lLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgIHhbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWhlaWdodCcpICogKHBhcnNlSW50KHcpL3hbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLXdpZHRoJykpICk7XG5cdFx0XHRcdHhbaV0ucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoIGlmcmFtZSAsIHhbaV0pO1xuXHRcdFx0fVxuXG5cdFx0XHRtYWtlUmVzcG9uc2l2ZSgpO1xuXG5cdFx0fVxuXHR9XG5cblx0dmFyIG1ha2VSZXNwb25zaXZlID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdiYW5uZXInKTtcblx0XHR2YXIgaTtcblx0XHRcblx0XHRmb3IgKGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkrKykge1xuXHRcdFx0eFtpXS5zdHlsZS5vdmVyZmxvdz0naGlkZGVuJztcblx0XHRcdHZhciBiYW5uZXJfaV93ID0gIHhbaV0uY2xpZW50V2lkdGg7XG5cdFx0XHR2YXIgYmFubmVyX2lfaCA9ICB4W2ldLmNsaWVudEhlaWdodDtcdFx0XG5cdFx0XHRcdCBcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHZhciBiYW5uZXJfcF93ICA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHhbaV0ucGFyZW50Tm9kZSwgbnVsbClcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICAuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKTtcblx0XHRcdFx0Ly8gY29uc29sZS5sb2codyk7XG5cdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0dmFyIGJhbm5lcl9wX3cgID0gIHhbaV0ucGFyZW50Tm9kZS5jdXJyZW50U3R5bGUud2lkdGg7XG5cdFx0XHR9IFxuXHRcdFx0XG5cdFx0XHRcblx0XHRcdGJhbm5lcl9wX3cgPSBwYXJzZUludChiYW5uZXJfcF93KTtcblx0XHRcdFxuXHRcdFx0dmFyIGJhbm5lcl9yYXRpbyA9IGJhbm5lcl9wX3cvYmFubmVyX2lfdztcblx0XHRcdHhbaV0ud2lkdGggPSBiYW5uZXJfcF93O1xuXHRcdFx0eFtpXS5oZWlnaHQgPSBiYW5uZXJfaV9oKmJhbm5lcl9yYXRpbztcblxuXHRcdFx0eFtpXS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHhbaV0uZ2V0QXR0cmlidXRlKCdzcmMnKSk7IFxuXG5cdFx0fSBcblx0fTtcblxuXHR3aW5kb3cub25yZXNpemUgPSBtYWtlUmVzcG9uc2l2ZTtcbn0iXSwiZmlsZSI6InJlc3BvbnNpdmUtaWZyYW1lLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
