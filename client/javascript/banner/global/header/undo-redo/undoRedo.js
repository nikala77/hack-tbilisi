var objectStates = [];
var indexOfObjectStates = 0;

function initObjectStates (data) {
	objectStates[0] = data;
}

function updateObjectStates (str) {
	console.log('update');
	
	if (indexOfObjectStates < objectStates.length - 1) {
		for (var i = objectStates.length - 1; i > indexOfObjectStates; i--) {
			objectStates.splice(i , 1);
		}
	}
	
	objectStates.push(str);
	indexOfObjectStates++;
}

function loadPrevState (index) {
	removeAllObjects();
	loadAfterModify(objectStates[index]);
}

function loadNextState (index) {
	removeAllObjects();
	loadAfterModify(objectStates[index]);
}


function undo () {
	if (indexOfObjectStates >= 1) {
		loadPrevState(--indexOfObjectStates);
	}
}

function redo () {
	if (indexOfObjectStates < objectStates.length - 1) {
		loadNextState(++indexOfObjectStates);
	}
}

