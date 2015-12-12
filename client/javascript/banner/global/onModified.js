function bindOnModifiedEvent (element) {
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	var timeout = 0;
	var observer = new MutationObserver(function(mutations, observer) {
	    mutations.forEach(function (mutObject) {
	    	if (mutObject.target.getAttribute('data-active') === 'true') {
			    offsetShapePanel();
			    clearTimeout(timeout);
			    timeout = setTimeout(function () {

			    	if (textFieldFocused) {
			    		clearTimeout(timeout);
			    	} else {
			    		if (!isSelected) {

			    			isSelected = false;
			    			updateObjectStates(getSlideData());
			    		} else if (wasDragged) {

			    			wasDragged = false;
			    			updateObjectStates(getSlideData());
			    		} 
			    		else {
			    			wasDragged = false;
			    			isSelected = false;
			    		}
			    	}
			    }, 1000);
	    	} 
	    });
	});

	bindListeners(element);
	// define what element should be observed by the observer
	// and what types of mutations trigger the callback
	observer.observe( element, {
	  subtree: true,
	  attributes: true
	});

	$('body').trigger('slideChange');
}

var isDragging;
var target;

function bindListeners (element) {
	element.addEventListener("mousedown", function (e) {
		target = this;
	}, true);

	element.addEventListener("mousemove", function (e) {
		if (element === target) {
	    	isDragging = true;
		}
	}, true);

	element.addEventListener("mouseup", function (e) {
	    if (isDragging) {
	    	isDragging = false;
	    	wasDragged = true;
	    }
	}, true);
}

function offsetShapePanel () {
	var active = getActiveObject();

	if (active) {

		var	controls = active.siblings('.ft-controls'),
			topLeft = controls.find('.ft-scaler-tl').position() || active.css('left'),
			topRight = controls.find('.ft-scaler-tr').position() || active.css('left') + active.width(),
			bottomLeft = controls.find('.ft-scaler-bl').position() || active.css('left') + active.height(),
			bottomRight = controls.find('.ft-scaler-br').position() || active.css('top') + active.height() + active.width(),
			top = controls.position() ? controls.position().top - 5 : parseInt(active.css('top')) - 5,
			left = controls.position() ? controls.position().left + 25 : parseInt(active.css('left')) + active.width() + 10,
			arr = [topLeft, topRight, bottomRight, bottomLeft];

		var add = 0; 

		var shapePanel;
		if (active.data('type') === 'text') {
			shapePanel = active.siblings('.shape-panel');
		} else {
			for (var i = 0; i < arr.length; i++) {
				if (add < arr[i].left) {
					add = arr[i].left;
				}
			}	
			left += add;
			shapePanel = active.parent('.ft-container').siblings('.shape-panel');
		}
		shapePanel.css({
			top: top,
			left: left
		});
	}
}