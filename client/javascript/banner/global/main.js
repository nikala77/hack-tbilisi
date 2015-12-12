var groupArr = [];
var objects = [];
var lastObjectID = 100;
var lastZindex = 100;
var slideHeart;
var slideContainer;
var presentationData;
var activeSlide;
var textFieldFocused;
var isSelected;
var wasDragged;
var slideIndex;
var activeObject;
var templateSlideID;
var templateData;
var aw3;
var artWidth;
var artHeight;
// 2560x1440
// 2560x420
// 29.17%
// 29.17%

var slideCanvas = 'defined';

var defaultData = [{"id":633,"campaign_id":99,"json":"[{\"tag\":\"img\",\"src\":\"https://prezhero.s3.amazonaws.com/user1/images/Picture1111.png\",\"width\":60,\"height\":70,\"style\":\"top: 209px; left: 502px; position: absolute; transform: matrix(2.00469, 0, 0, 1.06343, 0, 0); z-index: 100;\",\"freetrans\":{\"angle\":0,\"maintainAspectRatio\":false,\"rot-origin\":\"50% 50%\",\"scaleLimit\":0.1,\"scalex\":2.0046938685132702,\"scaley\":1.0634344893455867,\"x\":532.2009582519531,\"y\":211.77761840820312},\"animation\":{\"enter\":{\"type\":\"rotate\",\"start\":\"2\",\"delay\":-1912},\"exit\":{}}},{\"tag\":\"img\",\"src\":\"https://prezhero.s3.amazonaws.com/user1/images/Picture222.png\",\"width\":62,\"height\":70,\"style\":\"top: 216px; left: 594px; position: absolute; transform: matrix(0.1, 0, 0, 2.1049, 0, 0); z-index: 101;\",\"freetrans\":{\"angle\":0,\"maintainAspectRatio\":false,\"rot-origin\":\"50% 50%\",\"scaleLimit\":0.1,\"scalex\":0.1,\"scaley\":2.1048969624797227,\"x\":567.0000610351562,\"y\":255.25347900390625},\"animation\":{\"enter\":{\"type\":\"flyFromBottom\",\"start\":\"1\",\"delay\":\"1\"},\"exit\":{}}},{\"tag\":\"img\",\"src\":\"https://prezhero.s3.amazonaws.com/user1/images/Picture222.png\",\"width\":61,\"height\":70,\"style\":\"top: 156px; left: 501px; position: absolute; transform: matrix(3.55579, 0, 0, 0.1, 0, 0); z-index: 102;\",\"freetrans\":{\"angle\":0,\"maintainAspectRatio\":false,\"rot-origin\":\"50% 50%\",\"scaleLimit\":0.1,\"scalex\":3.5557939648252557,\"scaley\":0.1,\"x\":579.7615356445312,\"y\":124.99676513671875},\"animation\":{\"enter\":{\"type\":\"flyFromLeft\",\"start\":\"1\",\"delay\":\"1\"},\"exit\":{}}},{\"tag\":\"img\",\"src\":\"https://prezhero.s3.amazonaws.com/user1/images/Picture222.png\",\"width\":60,\"height\":70,\"style\":\"top: 213px; left: 424px; position: absolute; transform: matrix(0.1, 0, 0, 2.08814, 0, 0); z-index: 103;\",\"freetrans\":{\"angle\":0,\"maintainAspectRatio\":false,\"rot-origin\":\"50% 50%\",\"scaleLimit\":0.1,\"scalex\":0.1,\"scaley\":2.0881413640265807,\"x\":397.20111083984375,\"y\":251.104248046875},\"animation\":{\"enter\":{\"type\":\"flyFromBottom\",\"start\":\"1\",\"delay\":\"1\"},\"exit\":{}}},{\"tag\":\"img\",\"src\":\"https://prezhero.s3.amazonaws.com/user1/images/Picture222.png\",\"width\":61,\"height\":70,\"style\":\"top: 272px; left: 504px; position: absolute; transform: matrix(3.52204, 0, 0, 0.1, 0, 0); z-index: 104;\",\"freetrans\":{\"angle\":0,\"maintainAspectRatio\":false,\"rot-origin\":\"50% 50%\",\"scaleLimit\":0.1,\"scalex\":3.5220445966724463,\"scaley\":0.1,\"x\":581.3742980957031,\"y\":241.0001220703125},\"animation\":{\"enter\":{\"type\":\"flyFromLeft\",\"start\":\"1\",\"delay\":\"1\"},\"exit\":{}}},{\"tag\":\"textArea\",\"text\":\"EDUCATION\",\"font\":\"'Lucida Calligraphy', Pilgiche\",\"width\":80,\"height\":14,\"style\":\"font-family: 'Lucida Calligraphy', Pilgiche; color: rgb(255, 255, 255); z-index: 105; font-size: 10px; top: 289px; left: 494.953px; position: absolute; height: 14px; width: 80px;\",\"freetrans\":{\"x\":\"494.953px\",\"y\":\"289px\"},\"animation\":{\"enter\":{\"type\":\"flyFromBottom\",\"start\":\"2\",\"delay\":\"1\"},\"exit\":{}}}]","title":"rgb(199, 60, 50) none repeat scroll 0% 0% / auto padding-box border-box","created_at":"2015-11-19 05:46:55","updated_at":"2015-11-19 12:24:24"}];
var url = document.URL;
var hash = url.split('/');
hash = hash[4];

$(function() {
	$.get('/campaigns/'+ hash, function(data) {
		if(data.json) {
			var templateData = JSON.parse(data.json);
			init(templateData);
		} else {
			var campaign = {
				campaignHash: hash,
				json: JSON.stringify(defaultData)
			};

			$.post('/campaigns/update-campaign', campaign, function(campaign) {
				init(defaultData);
			});
			// $.get('/templates/templates-by-campaign-hash/'+ hash, function(data) {
			// 	templateData = data.slides;
			// 	templateSlideID = templateData[0].id;
			// 	var slide = {
			// 		template_slide_id: templateSlideID,
			// 		title: templateData[0].title,
			// 		json: templateData[0].json
			// 	};
			// 	$.post('/campaigns/'+ hash +'/slides', slide, function(slide) {
			// 		init([slide]);
			// 	});
			// });
		}
	}).fail(function(err) {
		console.log('get template data API doesn\'t exists');
		init(data);
	});
});

function init(data) {
	
	// load amazon data

	slideContainer = $('#slide-container');
	presentationData = data;

	for(var i = 0; i < presentationData.length; i++) {
		var _id = presentationData[i].id;
		var background = presentationData[i].title;

		var display = i === 0 ? 'block' : 'none';
		var heart = $('<div class="slide-heart" id="slide-heart'+ _id +'"'+
		'style="background:'+ background +'; display:'+ display +'"></div>');

		$('.slide-desk').append(heart);
		$('#content-slider').append($('<li data-index="'+ i +'" class="carousel'+ i +'"></li>'));
	}
	
	activeSlide = 0;
	slideIndex = presentationData[activeSlide].id;
	slideHeart = $('#slide-heart'+ slideIndex);
	artWidth = slideHeart.width();
	artHeight = slideHeart.height();

	// align center slide heart inside slide div 571 109927
	// alignMiddle($('.slide-heart'));
	scrollCenter(slideContainer);

	// load content of slide
	loadObjects(activeSlide);

	// update background reapeat checkbox
	updateBgRepeat();
};