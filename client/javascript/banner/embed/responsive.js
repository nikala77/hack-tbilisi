if (typeof(makeResponsive) === 'undefined') {
	document.onreadystatechange = function () {
		var state = document.readyState;
		if (state == 'complete') {
			var x = document.getElementsByClassName('responsive-presentation');

			for(var i = 0; i < x.length; i++) {

				var  iframe = document.createElement('IFRAME'); 
				iframe.setAttribute('src', x[i].getAttribute('data-href')); 

				iframe.style.border = 'none';
				iframe.className  ='prez-hero';

				try {
					w = window.getComputedStyle(x[i].parentNode, null)
								.getPropertyValue('width');
								// console.log(w);
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
		var x = document.getElementsByClassName('prez-hero');
		var i;
		for (i = 0; i < x.length; i++) {
			x[i].style.overflow='hidden';
			prezHero_i_w =  x[i].clientWidth;
			prezHero_i_h =  x[i].clientHeight;		
				 
			try {
				var prezHero_p_w  = window.getComputedStyle(x[i].parentNode, null)
										  .getPropertyValue('width');
				// console.log(w);
			} catch(e) {
				var prezHero_p_w  =  x[i].parentNode.currentStyle.width;
			} 
			
			
			prezHero_p_w = parseInt(prezHero_p_w);
			
			var prezHero_ratio = prezHero_p_w/prezHero_i_w;
			x[i].width = prezHero_p_w;
			x[i].height = prezHero_i_h*prezHero_ratio;
		} 
	};

	window.onresize = makeResponsive;
}