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