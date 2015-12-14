function getId(url) {
	var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	var match = url.match(regExp);

	if (match && match[2].length == 11) {
		return match[2];
	} else {
		return null;
	}
};

function validateYoutubeVimeo(yvlink) {
	var yRegex = new RegExp(/http(s)?:\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-]+)(&(amp;)?[\w\?=]*)?/gi);
	var vRegex = new RegExp(/http(s)?:\/\/(?:www\.)?(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/gi);
	
	if(!yRegex.test(yvlink) && !vRegex.test(yvlink)) {
		return false;
	}

	return true;
};

function showValidation(tag) {
	tag.show(500);
	setTimeout(function() {
		tag.hide();
	}, 2000);
};

function getYTID(url) {
	var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	var match = url.match(regExp);

	if (match && match[2].length == 11) {
		return match[2];
	} else {
		return null;
	}
};

function getVimeoID(url) {
	var videoID = url.split('/');
	videoID = videoID[videoID.length-1];

	return videoID;
};