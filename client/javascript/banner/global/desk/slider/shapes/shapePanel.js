function addControlPanel (shape, top, left) {

	var zIndex = parseInt(shape.css('z-index')),
		layersTop = top + 30,
		layersLeft = left + 15,
		type =  shape.data('type'),
		color = effects = image = textOpts = '';
	var panelZindex = lastZindex + 5;	
	var heart;	
		
	if (type === 'video' || type === 'audio') {
		color = effects = textOpts = 'disabled' ;
	} else if (type === 'image') {
		color = textOpts = 'disabled';
	}

	if (shape.data('type') === 'text') {
		heart = shape.parent('.slide-heart');
		left = left + shape.width() + 10;
		top = top - 5;
	} else {
		heart = shape.parent('.ft-container').parent('.slide-heart');
		shapePanel = shape.parent('.ft-container').siblings('.shape-panel');
	}

	heart.append(
		'<div class="shape-panel" style="top:'+top +'px; left:'+left+'px; z-index:' + panelZindex + ';">' +
			'<div class="list-group pnl-li-group">' +
			  	'<a class="list-group-item ' + color +' pnl-color" title="colors" href="#"><button></button></a>' +
			  	'<a class="list-group-item ' + color +' pnl-color pnl-scolor" title="colors" href="#"><button></button></a>' +
		  		'<div>' +
			  		'<a class="list-group-item dropdown-toggle ' + textOpts +' pnl-text-opts" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Text options" href="#"><span class="fa-panel glyphicon glyphicon-text-size"></span></a>' +
				  		'<ul class="dropdown-menu pnl-dropdown text-opts-dropdown" style="left: ' +  47 + 'px; top:' + 20 + 'px; ">' +
		  					'<li>' + 
		  						'<strong>Font family: </strong>' +
		  						'<select id="font-opts-select" style="width:95%; margin-top:2px;">' +
									'<option value="Arial,Helvetica" style="font-family:Arial,Helvetica;">Arial</option>' +
									'<option value="Arial Black,Gadget" style="font-family:Arial Black,Gadget;">Arial Black</option>' +
									'<option value="Batang,Beijing,URW Bookman L" style="font-family:Batang,Beijing,URW Bookman L;">Batang</option>' +
									'<option value="Broadway,Marker Felt,FreeSerif" style="font-family:Broadway,Marker Felt,FreeSerif;">Broadway</option>' +
									'<option value="Castellar,Brush Script,Nimbus Roman No9 L" style="font-family:Castellar,Brush Script,Nimbus Roman No9 L;">Castellar</option>' +
									'<option value="Comic Sans MS" style="font-family:Comic Sans MS;">Comic Sans MS</option>' +
									'<option value="Courier New" style="font-family:Courier New;">Courier New</option>' +
									'<option value="Edwardian Script ITC, Zapf Dingbats" style="font-family:Edwardian Script ITC, Zapf Dingbats;">Edwardian</option>' +
									'<option value="Elephant, Hiragino Kaku Gothic Std" style="font-family:Elephant, Hiragino Kaku Gothic Std;">Elephant</option>' +
									'<option value="Forte,Textile" style="font-family:Forte,Textile;">Forte</option>' +
									'<option value="Freestyle Script,Zapf Chancery" style="font-family:Freestyle Script,Zapf Chancery;">Freestyle Script</option>' +
									'<option value="Georgia" style="font-family:Georgia;">Georgia</option>' +
									'<option value="Hobo Std, Sand" style="font-family:Hobo Std, Sand;">Hobo Std</option>' +
									'<option value="Impact,Charcoal" style="font-family:Impact,Charcoal;">Impact</option>' +
									'<option value="Lucida Console,Monaco" style="font-family:Lucida Console,Monaco;">Lucida Console</option>' +
									'<option value="Lucida Sans Unicode,Lucida Grande" style="font-family:Lucida Sans Unicode,Lucida Grande;">Lucida Sans Unicode</option>' +
									'<option value="Lucida Calligraphy,Pilgiche" style="font-family:Lucida Calligraphy,Pilgiche;">Lucida Calligraphy</option>' +
									'<option value="Palatino Linotype,Book Antiqua,Palatino" style="font-family:Palatino Linotype,Book Antiqua,Palatino;">Palatino Linotype</option>' +
									'<option value="Palace Script MT, Papyrus" style="font-family:Palace Script MT, Papyrus;">Palace Script MT</option>' +
									'<option value="Symbol" style="font-family:Symbol;">Symbol</option>' +
									'<option value="Tahoma,Geneva" style="font-family:Tahoma,Geneva;">Tahoma</option>' +
									'<option value="Times New Roman, Times" style="font-family:Times New Roman, Times;">Times New Roman</option>' +
									'<option value="Trebuchet MS" style="font-family:Trebuchet MS;">Trebuchet MS</option>' +
									'<option value="Verdana" style="font-family:Verdana;">Verdana</option>' +
									'<option value="Viner Hand ITC" style="font-family:Viner Hand ITC;">Viner Hand ITC</option>' +
								'</select>'+
								'<hr>' +
		  					'</li>' +
		  					'<li>' + 
		  						'<strong>Font size: </strong>' +
		  						'<select id="text-opts-select">' +
									'<option value="2">2</option>' +
									'<option value="4">4</option>' +
									'<option value="6">6</option>' +
									'<option value="8">8</option>' +
									'<option value="10">10</option>' +
									'<option value="12">12</option>' +
									'<option value="14">14</option>' +
									'<option value="16">16</option>' +
									'<option value="18">18</option>' +
									'<option value="20">20</option>' +
									'<option value="22">22</option>' +
									'<option value="24">24</option>' +
									'<option value="26">26</option>' +
									'<option value="28">28</option>' +
									'<option value="30">30</option>' +
									'<option value="32">32</option>' +
									'<option value="34">34</option>' +
									'<option value="36">36</option>' +
									'<option value="38">38</option>' +
									'<option value="40">40</option>' +
									'<option value="42">42</option>' +
									'<option value="44">44</option>' +
									'<option value="46">46</option>' +
									'<option value="48">48</option>' +
									'<option value="50">50</option>' +
									'<option value="52">52</option>' +
									'<option value="54">54</option>' +
									'<option value="56">56</option>' +
									'<option value="58">58</option>' +
									'<option value="60">60</option>' +
									'<option value="62">62</option>' +
									'<option value="64">64</option>' +
									'<option value="66">66</option>' +
									'<option value="68">68</option>' +
									'<option value="70">70</option>' +
									'<option value="72">72</option>' +
								'</select>'+
								'<hr>' +
		  					'</li>' +
		  					'<li>' +
		  						'<strong>Text align: </strong>' +
		  						'<select id="text-align-select">' +
									'<option value="start">start</option>' +
									'<option value="left">left</option>' +
									'<option value="center">center</option>' +
									'<option value="right">right</option>' +
		  						'</select>'+
		  						'<hr>' +
		  					'</li>' +
				  			'<li>' +
				  				'<strong>Bold :</strong>' +
				  				'<i id="drkshadow" class="fa fa-text-toggle fa-bold fa-toggle-off fa-lg"></i><br>' +
								'<hr>' +
				  			'</li>' +
				  			'<li>' +
				  				'<strong>Underline :</strong>' +
				  				'<i id="drkshadow" class="fa fa-text-toggle fa-underline fa-toggle-off fa-lg"></i><br>' +
				  				'<hr>' +
				  			'</li>' +
				  			'<li>' +
				  				'<strong>Italic :</strong>' +
				  				'<i id="drkshadow" class="fa fa-text-toggle fa-italic fa-toggle-off fa-lg"></i><br>' +
				  				'<hr>' +
				  			'</li>' +
				  			'<li>' +
		  						'<strong>Text transform: </strong>' +
		  						'<select id="text-trans-select" style="width:95%; margin-top:2px;">' +
									'<option value="none">none</option>' +
									'<option value="uppercase">UPPERCASE</option>' +
									'<option value="lowercase">lowercase</option>' +
									'<option value="capitalize">Capitalize</option>' +
		  						'</select>'+
		  						'<hr>'+
		  					'</li>' +
		  					'<li>' +
				  				'<strong>Border stroke :</strong>' +
				  				'<i id="drkshadow" class="fa fa-text-toggle fa-brd-stroke fa-toggle-off fa-lg"></i><br>' +
				  				'<hr>' +
				  			'</li>' +
		  				'</ul>' +
	  			'</div>' +	
			  	'<a class="list-group-item dropdown-toggle pnl-effects ' + effects +'" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="effects" href="#"><i class="fa-panel fa fa-plus-square fw"></i></a>' +
				  	'<ul class="dropdown-menu pnl-dropdown effects-dropdown" style="left: ' +  47 + 'px; top:' + 40 + 'px; ">' +
	  					'<li>Opacity' +
	  						'<div class="opacity-slider"></div>' +
	  						'<hr>' +
	  					'</li>' +
			  			'<li><span style="margin-left:-20px;">Shadow: </span>' +
			  				'<i id="drkshadow" class="fa fa-shadow fa-toggle-off fa-lg"></i><br>' +
			  				'<div class="shadow-draggable">' +
			  					'<div class="shadow-draggable-board">' +
			  						'<div class="shadow-draggable-circle"></div>'+
			  					'</div>' +
			  				'</div>' +
			  				'<div class="shadow-color">' +
			  					'<label>color:</label>' +
			  					'<div class="shadow-colorpick"></div>' +
			  				'</div>' +
			  			'</li>' +
	  				'</ul>' +
			  	'<a class="list-group-item pnl-clone" title="clone" href="#"><i class="fa-panel fa fa-files-o fw"></i></a>' +
		  		'<div>' +
			  		'<a class="list-group-item dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="layers" href="#"><i class="fa-panel fa fa-database fw"></i></a>' +
			  			'<ul class="dropdown-menu pnl-dropdown layers-dropdown" style="left: ' +  47 + 'px; top:' + 102 + 'px; ">' +
		  					'<li data-opt="top">Top <hr></li>' +
				  			'<li data-opt="for">Forward <hr></li>' +
				  			'<li data-opt="back">Backword <hr></li>' +
				  			'<li data-opt="bot">Bottom</li>' +
		  				'</ul>' +
		  		'</div>' +		
			  '<a class="list-group-item pnl-delete" title="delete" href="#"><i class="fa-panel fa fa-trash"></i></a>' +
			'</div>' +
		'</div>');
	reBindListeners();	
}

function reBindListeners () {
	var heart = $('.slide-heart');
	var ft = $('.slide-heart').children('.ft-container').find('[data-active=true]');
	var panel = heart.children('.shape-panel');

	var col = panel.find('.pnl-color:not(.pnl-scolor)'),
		scol = panel.find('.pnl-scolor'),
		del = panel.find('.pnl-delete'),
		layers = panel.find('.layers-dropdown'),
		clone = panel.find('.pnl-clone'),
		effectsDropdown = panel.find('.pnl-dropdown');
	

	bindColorPicker(col);
	bindShapeColorPicker(scol);
	bindDelete(del);
	bindLayers(layers);
	bindClone(clone);
	bindSlider(effectsDropdown);
	bindPropagation(panel);	
	bindTextOptions(panel);
}

function activateControlPanel (shape, top, left) {
	var zIndex = parseInt(shape.css('z-index')),
		type =  shape.data('type'),
		color = effects = image = '',
		panelZindex = lastZindex + 5;	

	if (type === 'text') {
		left = shape.width() + left + 10;
		top = top - 5;
		shapePanel = shape.siblings('.shape-panel');
	} else {
		shapePanel = shape.parent('.ft-container').siblings('.shape-panel');
	}

	shapePanel.show();

	var color1 = shapePanel.find('.pnl-color:not(.pnl-scolor)');
	var color2 = shapePanel.find('.pnl-scolor');
	var pnlTxtOpts = shapePanel.find('.pnl-text-opts');

	if (type === 'video' || type === 'audio') {
		color = effects = 'disabled' ;
		color1.hide();
		color2.hide();
		pnlTxtOpts.hide();

	} else if (type === 'image') {
		color = 'disabled';
		color1.hide();
		color2.hide();
		pnlTxtOpts.hide();

		shapePanel.find('.pnl-color').addClass(color);
		shapePanel.find('.pnl-effects').removeClass(color);
	} else if (type === 'shape') {
		color1.show();
		color2.show();
		pnlTxtOpts.hide();

		color1.find('button').css('background-color', shape.data('fill') || '#000000');
		color2.find('button').css('background-color', shape.data('stroke') || '#000000');

		shapePanel.find('.pnl-color').removeClass('disabled');
		shapePanel.find('.pnl-effects').removeClass('disabled');
	} else {
		color1.show();
		color2.hide();
		pnlTxtOpts.show();

		color1.find('button').css('background-color', shape.css('color'));
		
		shapePanel.find('.pnl-color').removeClass('disabled');
		shapePanel.find('.pnl-effects').removeClass('disabled');
	}


	shapePanel.css({
		'top': top,
		'left': left,
		'z-index' : panelZindex
	});

	reBindListeners();	
} 

function bindPropagation (element) {
	element.find('.dropdown-menu').on('click', function (e) {
		e.stopPropagation();
	});

	$('.colpick').on('click', function (e) {
		e.stopPropagation();
	})
}

function bindTextOptions (element) {
	var textOpts = element.find('.pnl-text-opts');
	var active = getActiveObject();
	var type = active.data('type');  
	if (type === 'text' && textOpts.hasClass('disabled')) {
		textOpts.removeClass('disabled');
	} else if (type !== 'text' && !textOpts.hasClass('disabled')) {
		textOpts.addClass('disabled');
	}

	if (type === 'text') {
		// change font size
		var size = parseInt(active.css('font-size').trim());
		var fonts = active.css('font-family').trim();
		var align = active.css('text-align').trim();
		var transform = active.css('text-transform').trim();

		$("#text-opts-select option").filter(function() {
		    return $(this).text() == size; 
		}).prop('selected', true);

		$("#font-opts-select option").filter(function() {
		    return $(this).text() == fonts; 
		}).prop('selected', true);

		$("#text-align-select option").filter(function() {
		    return $(this).text() == transform; 
		}).prop('selected', true);

		$("#text-trans-select option").filter(function() {
		    return $(this).text() == align; 
		}).prop('selected', true);

		$('body').on('change', '#text-opts-select', function () {
			var active = getActiveObject();
			var value = parseInt($(this).val().trim());
			active.css('font-size', value);
		});

		$('body').on('change', '#font-opts-select', function () {
			var active = getActiveObject();
			var value = $(this).val().trim();
			active.css('font-family', value);
		});

		$('body').on('change', '#text-align-select', function () {
			var active = getActiveObject();
			var value = $(this).val().trim();
			active.css('text-align', value);
		});

		$('body').on('change', '#text-trans-select', function () {
			var active = getActiveObject();
			var value = $(this).val().trim();
			active.css('text-transform', value);
		});

		// toggle bold
		var fontWeight = active.css('font-weight').trim();
		var boldToggle = element.find('.fa-bold');
		if (fontWeight === '400' && boldToggle.hasClass('fa-toggle-on')) {
			boldToggle.removeClass('fa-toggle-on')
				.addClass('fa-toggle-off');
		} else if (fontWeight === 'bold' && boldToggle.hasClass('fa-toggle-off')) {
			boldToggle.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on');
		}

		boldToggle.unbind().on('click', function (e) {
			var active = getActiveObject();
			if (boldToggle.hasClass('fa-toggle-on')) {
				boldToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');
				active.css('font-weight', 400);	
			} else if (boldToggle.hasClass('fa-toggle-off')) {
				boldToggle.removeClass('fa-toggle-off')
					.addClass('fa-toggle-on');
				active.css('font-weight', 'bold');	
			}
		});

		// toggle underline
		var decoration = active.css('text-decoration').trim();
		var decorationToggle = element.find('.fa-underline');
		if (decoration !== 'underline' && decorationToggle.hasClass('fa-toggle-on')) {
			decorationToggle.removeClass('fa-toggle-on')
				.addClass('fa-toggle-off');
		} else if (decoration === 'underline' && decorationToggle.hasClass('fa-toggle-off')) {
			decorationToggle.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on');
		}

		decorationToggle.unbind().on('click', function (e) {
			var active = getActiveObject();
			if (decorationToggle.hasClass('fa-toggle-on')) {
				decorationToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');
				active.css('text-decoration', 'none');	
			} else if (decorationToggle.hasClass('fa-toggle-off')) {
				decorationToggle.removeClass('fa-toggle-off')
					.addClass('fa-toggle-on');
				active.css('text-decoration', 'underline');	
			}
		});

		// toggle italic
		var fontStyle = active.css('font-style').trim();
		var italicToggle = element.find('.fa-italic');

		if (fontStyle !== 'italic' && italicToggle.hasClass('fa-toggle-on')) {
			italicToggle.removeClass('fa-toggle-on')
				.addClass('fa-toggle-off');
		} else if (fontStyle === 'italic' && italicToggle.hasClass('fa-toggle-off')) {
			decorationToggle.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on');
			active.css('font-style', 'normal');	
		}

		italicToggle.unbind().on('click', function (e) {
			var active = getActiveObject();
			if (italicToggle.hasClass('fa-toggle-on')) {
				italicToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');
				active.css('font-style', 'normal');	
			} else if (italicToggle.hasClass('fa-toggle-off')) {
				italicToggle.removeClass('fa-toggle-off')
					.addClass('fa-toggle-on');
					active.css('font-style', 'italic');	
			}
		});

		// toggle uppercase
		var textTransform = active.css('text-transform'),
			uppercaseToggle = element.find('.fa-uppercase'),
			lowercaseToggle = element.find('.fa-lowercase'),
			capitalizeToggle = element.find('.fa-capitalize');

		if (textTransform !== 'uppercase' && uppercaseToggle.hasClass('fa-toggle-on')) {
			uppercaseToggle.removeClass('fa-toggle-on')
				.addClass('fa-toggle-off');
		} else if (textTransform === 'uppercase'  && uppercaseToggle.hasClass('fa-toggle-off')) {
			uppercaseToggle.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on');
			active.css('text-transform', 'none');	
		} else if (textTransform !== 'lowercase' && lowercaseToggle.hasClass('fa-toggle-on')) {
			lowercaseToggle.removeClass('fa-toggle-on')
				.addClass('fa-toggle-off');
		} else if (textTransform === 'lowercase' && lowercaseToggle.hasClass('fa-toggle-off')) {
			lowercaseToggle.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on');
			active.css('text-transform', 'none');
		} else if (textTransform !== 'capitalize' && capitalizeToggle.hasClass('fa-toggle-off')) {
			capitalizeToggle.removeClass('fa-toggle-on')
				.addClass('fa-toggle-off');
		} else if (textTransform === 'capitalize' && capitalizeToggle.hasClass('fa-toggle-off')) {
			lowercaseToggle.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on');
			active.css('text-transform', 'none');
		}

		// toggle uppercase
		uppercaseToggle.unbind().on('click', function (e) {
			var active = getActiveObject();
			if (uppercaseToggle.hasClass('fa-toggle-on')) {
				uppercaseToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');
				active.css('text-transform', 'none');	
			} else if (uppercaseToggle.hasClass('fa-toggle-off')) {
				uppercaseToggle.removeClass('fa-toggle-off')
					.addClass('fa-toggle-on');
					active.css('text-transform', 'uppercase');	
				lowercaseToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');	
				capitalizeToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');		
			}
		});

		// toggle lowercase
		lowercaseToggle.unbind().on('click', function (e) {
			var active = getActiveObject();
			if (lowercaseToggle.hasClass('fa-toggle-on')) {
				lowercaseToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');
				
				active.css('text-transform', 'none');	
			} else if (lowercaseToggle.hasClass('fa-toggle-off')) {
				lowercaseToggle.removeClass('fa-toggle-off')
					.addClass('fa-toggle-on');
				uppercaseToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');
				capitalizeToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');	
				
				active.css('text-transform', 'lowercase');	
			}
		});

		capitalizeToggle.unbind().on('click', function (e) {
			var active = getActiveObject();
			if (capitalizeToggle.hasClass('fa-toggle-on')) {
				capitalizeToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');
				active.css('text-transform', 'none');	
			} else if (capitalizeToggle.hasClass('fa-toggle-off')) {
				capitalizeToggle.removeClass('fa-toggle-off')
					.addClass('fa-toggle-on');
				uppercaseToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');
				lowercaseToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');	

				active.css('text-transform', 'capitalize');	
			}
		});

		// border stroke
		var border = active.css('border').trim(),
			strokeWidth = parseInt(border.split(' ')[0]),
			borderToggle = element.find('.fa-brd-stroke'),
			color = active.css('color');

		if (strokeWidth === 0 && borderToggle.hasClass('fa-toggle-on')) {
			borderToggle.removeClass('fa-toggle-on')
				.addClass('fa-toggle-off');
		} else if (strokeWidth > 0 && borderToggle.hasClass('fa-toggle-off')) {
			borderToggle.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on');
			active.css({ 'border-top': '2px solid ' + color,
						 'border-bottom': '2px solid ' + color
						});
		}


		borderToggle.unbind().on('click', function (e) {
			var active = getActiveObject();
			if (borderToggle.hasClass('fa-toggle-on')) {
				borderToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');
				active.css('border', '0px none rgba(0, 0, 0, 0)');	
			} else if (borderToggle.hasClass('fa-toggle-off')) {
				borderToggle.removeClass('fa-toggle-off')
					.addClass('fa-toggle-on');
				var stroke = '2px solid ' + color;	
				active.css({ 'border-top': stroke,
						 'border-bottom': stroke
						});
			}
		});
	}

}

function bindSlider (element) {
	var active = getActiveObject();

	var shadow = {
		
		setShadow: function (left, top, blur) {

			var active = getActiveObject();

			if (active.data('type') === 'text') {
				if (active.css('text-shadow') !== 'none') {
					var full = active.css('text-shadow'),
						nColor = " " + full.substring(0, full.indexOf(')') + 1),
						positions = full.substring(full.indexOf(')') + 1).split(' '),
						nLeft = positions[1],
						nTop = " " + positions[2],
						blurSize = " " + positions[3];
					
					shadow.blur = blur ? blur : nColor;
					shadow.left = left ? left : nLeft;
					shadow.top = top ? top: nTop;
					shadow.blurSize = blurSize;
					shadow.color = shadow.left + shadow.top + shadow.blurSize + shadow.blur;
					active.css('text-shadow', shadow.color);

				} else {
					active.css('text-shadow', '0px 0px 5px #000000');
				}
		
			} else if (active.data('type') !== 'text') {
				if (active.css('box-shadow') !== 'none') {

					var full = active.css('box-shadow'),
						nColor = " " + full.substring(0, full.indexOf(')') + 1),
						positions = full.substring(full.indexOf(')') + 1).split(' '),
						nLeft = positions[1],
						nTop = " " + positions[2],
						blurSize = " " + positions[3];
					
					shadow.blur = blur ? blur : nColor;
					shadow.left = left ? left : nLeft;
					shadow.top = top ? top: nTop;
					shadow.blurSize = blurSize;
					shadow.color = shadow.left + shadow.top + shadow.blurSize + shadow.blur;
					active.css('box-shadow', shadow.color);

				} else {
					active.css('box-shadow', '0px 0px 5px #000000');	
				}
			} 
		}
	}

	shadowEnabled = false;
	
	var opValue = 100 - Math.floor(parseFloat(active.css('opacity')) * 100);

	var fa = element.find('.fa-shadow');
	if (active.data('type') === 'text' && active.css('text-shadow') !== 'none') {
		if (fa.hasClass('fa-toggle-off')) {
			fa.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on');
		}
	} else if (active.data('type') !== 'text' && active.css('box-shadow') !== 'none') {
		if (fa.hasClass('fa-toggle-off')) {
			fa.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on');
		}
	} else {
		if (fa.hasClass('fa-toggle-on')) {
			fa.removeClass('fa-toggle-on')
				.addClass('fa-toggle-off');
		}
	}

	//opacity slider 
	element.find('.opacity-slider').slider({
		value: opValue,
		slide: function (event, ui) {
			active.css('opacity', 1 - ui.value / 100);
		},
		stop: function (event, ui) {
			active.css('opacity', 1 - ui.value / 100);
		}
	});

	element.find('.fa-shadow').unbind().on('click', function (e) {
		e.preventDefault();

		var fa = $(this);

		hasShadowToggle(fa);
	});

	function hasShadowToggle (fa) {
		if (fa.hasClass('fa-toggle-off')) {
			fa.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on');
			shadowEnabled = true;
			addShadow();
			return;
		} 

		if (fa.hasClass('fa-toggle-on')) {
			fa.removeClass('fa-toggle-on')
				.addClass('fa-toggle-off');
			shadowEnabled = false;
			removeShadow();
			return;
		}
	}

	function addShadow () {
		var active = getActiveObject();	
		if (active.data('type') === 'text' && shadowEnabled) {

			var	blur = ' #000',
				top = ' 0px',
				left = '0px';
			shadow.setShadow(left, top, blur);

		} else if (shadowEnabled){

			var	blur = ' #000',
				top = ' 0px',
				left = '0px';
			shadow.setShadow(left, top, blur);
		}
	}

	function removeShadow() {

		var active = getActiveObject();	
		if (active.data('type') === 'text' && !shadowEnabled) {
			active.css('text-shadow', 'none');
		} else if (!shadowEnabled){
			active.css('box-shadow', 'none');
		}
	}

	var colpicker = element.find('.shadow-colorpick');
	colpicker.colpick({
		layout : 'rgb',
		submit : false,
		value : '#000',
		onChange : function (hsb,rgb) {
			var bgColor = '#'+rgb;
			var blur = ' ' + bgColor;
			colpicker.css('background-color', bgColor);
			shadow.setShadow(null, null, blur);

			if (element.find('.fa-shadow').hasClass('fa-toggle-off')) {
				fa.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on'); 
			}
		},
		onSubmit : function(hsb,hex,rgb,el) {
			colpicker.colpickHide();
		}
	});

	element.find('.shadow-draggable-circle').draggable({
		containment: 'parent',
		drag: function (event, ui) {
			var left = ui.position.left - 13 + 'px',
			top = ui.position.top - 13 + 'px';

			top = " " + top;
			shadow.setShadow(left, top, null);
			if (element.find('.fa-shadow').hasClass('fa-toggle-off')) {
				fa.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on'); 
			}
		}
	});
}

function bindColorPicker (element) {
	element.colpick({
		layout : 'rgb',
		submit : false,
		onChange : function (hsb,rgb) {
			var bgColor = '#'+rgb,
				activeObject = getActiveObject(),
				type = activeObject.data('type');

			$('.pnl-color:not(.pnl-scolor)').find('button').css('background-color', bgColor);

			if(type !== 'shape') {
				activeObject.css('color', bgColor);
				if (type === 'text') {
					var border = activeObject.css('border').trim(),
						strokeWidth = parseInt(border.split(' ')[0]);
					if (strokeWidth > 0) {
						activeObject.css('border', '2px solid ' + bgColor);	
					}	
				}
			} else {
				activeObject.data('fill', bgColor);

				activeObject.find('svg').find('path').css('fill', bgColor);
				activeObject.find('svg').find('polygon').css('fill', bgColor);
				activeObject.find('svg').find('rect').css('fill', bgColor);
				activeObject.find('svg').find('circle').css('fill', bgColor);
				activeObject.find('svg').find('polyline').css('fill', bgColor);
				activeObject.find('svg').find('line').css('fill', bgColor);
			}
		},
		onSubmit : function(hsb,hex,rgb,el) {
			element.colpickHide();
		}
	});
}

function bindShapeColorPicker (element) {
	element.colpick({
		layout : 'rgb',
		submit : false,
		onChange : function (hsb,rgb) {
			var bgColor = '#'+rgb,
				activeObject = getActiveObject(),
				type = activeObject.data('type');

			$('.pnl-scolor').find('button').css('background-color', bgColor);

			if(type === 'shape') {
				activeObject.data('stroke', bgColor);

				activeObject.find('svg').find('path').css('stroke', bgColor);
				activeObject.find('svg').find('polygon').css('stroke', bgColor);
				activeObject.find('svg').find('rect').css('stroke', bgColor);
				activeObject.find('svg').find('circle').css('stroke', bgColor);
				activeObject.find('svg').find('polyline').css('stroke', bgColor);
				activeObject.find('svg').find('line').css('stroke', bgColor);
			}
		},
		onSubmit : function(hsb,hex,rgb,el) {
			element.colpickHide();
		}
	});
}

function bindDelete (element) {
	element.unbind().on('click', function (e) {
		var container = $('.ft-container[data-active=true]');
		container.siblings('.shape-panel').hide();
		removeObjectFromGroup();
		container.remove();
		updateObjectStates(getSlideData());
	});
}

function bindLayers (element) {
	element.unbind().on('click', 'li', function (e) {
		var option = $(this).data('opt');
		switch (option) {
			case 'top': 
				moveTop();
				break;
			case 'for': 
				moveForward();
				break;
			case 'back': 
				moveBackword();
				break;
			case 'bot': 
				moveBottom();
				break;			
		}
	});
}

function bindClone (element) {

	element.unbind().on('click', function(e) {
		var obj = getActiveObject();
		var type = obj.data('type');
		if (type !== 'text') {
			var freetrans = obj.freetrans('getOptions');
		}

		switch (type) {
			case 'image':
				addImage(slideHeart, obj.attr('src'), obj.width(), obj.height(), obj.attr('style'), freetrans, null, true);
				break;
			case 'text':
				var text = obj.text();
				addText(slideHeart, text, obj.css('font-family'), obj.attr('rows'), text.length, obj.attr('style'), null, true);
				break;
			case 'shape':
				addShape(slideHeart, obj.data('src'), obj.width(), obj.height(), obj.data('fill'), obj.attr('style'), freetrans, null, true);
				break;
			case 'video':
				addVideo(slideHeart, obj.data('video-src'), obj.width(), obj.height(), obj.data('video-type'), obj.attr('style'), freetrans, null, true);
				break;
			case 'audio':
				addAudio(slideHeart, obj.data('audio-src'), obj.width(), obj.height(), obj.attr('style'), freetrans, null, true);
				break;
		}
	});
}