var groupArr = [];
var objects = [];
var lastObjectID = 100;
var lastZindex = 100;
var workingBoard;
var workingBanner;
var bannerData;
var textFieldFocused;
var isSelected;
var wasDragged;
var slideIndex;
var activeObject;

var slideCanvas = 'defined';
var defaultData = { background: "#FF8800", json: [] };
$(function() {
	$.ajax({
		url: '/api/banner/data/' + bannerID,
		type: 'GET',
		timeout: 3000,
		success: function(data) {
			try {
				bannerData = JSON.parse(data);
			} catch(err) {
				bannerData = defaultData;
			}
			
			init(bannerData);
		},
		error: function(request, errorType, errorMessage) {
			console.log(request, errorType, errorMessage);
		},
	});
});

function init(data) {
	workingBoard = $('.working-board');
	workingBanner = $('.working-banner');

	alignMiddle(workingBanner);
	scrollCenter(workingBoard);
	
	bannerData = data;

	// load content of slide
	loadObjects(data);

};