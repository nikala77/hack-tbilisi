function removeObjectFromGroup () {

	for (var i = 0; i < groupArr.length; i++) {
		if (groupArr[i].attr('data-active') === 'true') { 
			var index = i;
			if (index < groupArr.length) {
				groupArr.splice(i, 1);
				while (index < groupArr.length) {
					var shape = groupArr[index],
					zIndex = parseInt(shape.css('z-index'));
					shape.css('z-index', --zIndex);
					index++;
					lastZindex = zIndex + 1;
				}
			}
		} 
	}	
}

function removeAllObjects () {
	for (var i = 0; i < groupArr.length; i++) {
		groupArr[i].parent('.ft-container').remove();
		lastZindex--;
	}
	for (var i = 0; i < groupArr.length; i++)
		groupArr.splice(i, 1);
}