function moveTop () {
	var lastIndex = lastZindex;
	for (var i = 0; i < groupArr.length - 1; i++) {

		var shape = groupArr[i];

		if (shape.attr('data-active') === 'true') {
			console.log('moveTop');
			// change z-indexes of elements
			shape.css('z-index', --lastIndex);
			shape.siblings('.ft-controls').css('z-index', lastIndex);
			for (var ind = i + 1; ind < groupArr.length; ind++) {
				var obj = groupArr[ind];
				decrementZindex(obj);
			}

			groupArr.splice(groupArr.length - 1, 0, groupArr.splice(i, 1)[0]);
			return;
		}
	}
}

function moveForward () {
	for (var i = 0; i < groupArr.length - 1; i++) {
		var shape = groupArr[i];
		if (shape.attr('data-active') === 'true') {

			var from = i,
				to = groupArr.indexOf(shape) + 1;

			// change z-indexes of elements
			incrementZindex(groupArr[from]);
			decrementZindex(groupArr[to]);

			groupArr.splice(to, 0, groupArr.splice(from, 1)[0]);
			console.log(groupArr);
			return;
		}
	}
}

function moveBackword () {
	for (var i = 1; i < groupArr.length; i++) {
		var shape = groupArr[i];
		if (shape.attr('data-active') === 'true') {
			var from = i,
				to = groupArr.indexOf(shape) - 1;
			
			console.log('moveBackword 2');
			// change z-indexes of elements
			incrementZindex(groupArr[to]);
			decrementZindex(groupArr[from]);

			groupArr.splice(to, 0, groupArr.splice(from, 1)[0]);
			return;
		}
	}
}

function moveBottom () {
			console.log('moveBottom');

	for (var i = 1; i < groupArr.length; i++) {
		var shape = groupArr[i];

		if (shape.attr('data-active') === 'true') {
			// change z-indexes of elements
			shape.css('z-index', 100);
			shape.siblings('.ft-controls').css('z-index', 100);
			for (var ind = i - 1; ind >= 0; ind--) {
				var obj = groupArr[ind];
				incrementZindex(obj);
			}

			groupArr.splice(0, 0, groupArr.splice(i, 1)[0]);

			return;
		}
	}
}


function incrementZindex (shape) {
	var zIndex = parseInt(shape.css('z-index'));
	shape.css('z-index', ++zIndex);
	shape.siblings('.ft-controls').css('z-index', zIndex);	
}

function decrementZindex (shape) {
	var zIndex = parseInt(shape.css('z-index'));
	shape.css('z-index', --zIndex);
	shape.siblings('.ft-controls').css('z-index', zIndex);	
}