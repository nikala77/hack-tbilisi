// var data = [{"id":3,"campaign_id":4,"json":"[{\"tag\":\"img\",\"src\":\"http://localhost:8000/img/shapes/accounting/abacus.png\",\"width\":45,\"height\":45,\"style\":\"z-index: 100; top: 225px; left: 599px; position: absolute; transform: matrix(7.22222, 0, 0, 5.11111, 0, 0);\",\"freetrans\":{\"angle\":0,\"maintainAspectRatio\":false,\"rot-origin\":\"50% 50%\",\"scaleLimit\":0.1,\"scalex\":7.222222222222222,\"scaley\":5.111111111111111,\"x\":739,\"y\":318},\"animation\":{\"enter\":{\"type\":\"flyFromLeft\",\"start\":\"2\",\"delay\":\"3\"},\"exit\":{}}},{\"tag\":\"textArea\",\"text\":\"background image\",\"font\":\"'Arial Black', Gadget\",\"rows\":\"1\",\"cols\":16,\"style\":\"z-index: 101; font-family: 'Arial Black', Gadget; color: rgb(0, 0, 0); top: 65px; left: 281px; position: absolute; transform: matrix(4, 0, 0, 6.5, 0, 0); height: 20px; width: 152px;\",\"freetrans\":{\"angle\":0,\"maintainAspectRatio\":false,\"rot-origin\":\"50% 50%\",\"scaleLimit\":0.1,\"scalex\":4,\"scaley\":6.5,\"x\":523,\"y\":120},\"animation\":{\"enter\":{\"type\":\"flyFromRight\",\"start\":\"1\",\"delay\":\"1\"},\"exit\":{}}}]","title":"rgb(84, 82, 82) url(http://localhost:8000/assets/editor/uploads/images/7.jpg) repeat scroll 0% 0% / cover padding-box border-box","created_at":"2015-10-12 05:20:22","updated_at":"2015-10-22 08:46:23"},{"id":13,"campaign_id":4,"json":"[{\"tag\":\"video\",\"src\":\"https://www.youtube.com/embed/l1ZEcIbIQGI?rel=0&showinfo=0&autoplay=true&controls=false\",\"videoType\":\"youtube\",\"width\":560,\"height\":315,\"style\":\"z-index: 100; top: 38px; left: 138px; position: absolute; transform: matrix(1, 0, 0, 1, 0, 0);\",\"freetrans\":{\"angle\":0,\"maintainAspectRatio\":false,\"rot-origin\":\"50% 50%\",\"scaleLimit\":0.1,\"scalex\":1,\"scaley\":1,\"x\":138,\"y\":38},\"animation\":{\"enter\":{\"type\":\"popIn\",\"start\":\"1\",\"delay\":\"1\"},\"exit\":{}}},{\"tag\":\"textArea\",\"text\":\"edited text field\",\"font\":\"'Freestyle Script', 'Zapf Chancery'\",\"rows\":\"1\",\"cols\":17,\"style\":\"z-index: 102; font-family: 'Freestyle Script', 'Zapf Chancery'; color: rgb(0, 0, 0); top: 195px; left: 416px; position: absolute; transform: matrix(3, 0, 0, 3, 0, 0); height: 20px; width: 71px;\",\"freetrans\":{\"angle\":0,\"maintainAspectRatio\":false,\"rot-origin\":\"50% 50%\",\"scaleLimit\":0.1,\"scalex\":3,\"scaley\":3,\"x\":487,\"y\":215},\"animation\":{\"enter\":{\"type\":\"flyFromTop\",\"start\":\"1\",\"delay\":\"1\"},\"exit\":{}}},{\"tag\":\"img\",\"src\":\"http://localhost:8000/img/shapes/business/bar_chart_128.png\",\"width\":45,\"height\":45,\"style\":\"z-index: 103; top: 73px; left: 278px; position: absolute; transform: matrix(1, 0, 0, 1, 0, 0);\",\"freetrans\":{\"angle\":0,\"maintainAspectRatio\":false,\"rot-origin\":\"50% 50%\",\"scaleLimit\":0.1,\"scalex\":1,\"scaley\":1,\"x\":278,\"y\":73},\"animation\":{\"enter\":{\"type\":\"flyFromTop\",\"start\":\"1\",\"delay\":\"1\"},\"exit\":{}}},{\"tag\":\"img\",\"src\":\"http://localhost:8000/img/shapes/food/almond_128.png\",\"width\":53,\"height\":53,\"style\":\"z-index: 104; top: 280px; left: 172px; position: absolute; transform: matrix(4, 0, 0, 2.01887, 0, 0);\",\"freetrans\":{\"angle\":0,\"maintainAspectRatio\":false,\"rot-origin\":\"50% 50%\",\"scaleLimit\":0.1,\"scalex\":4,\"scaley\":2.018867924528302,\"x\":252,\"y\":307},\"animation\":{\"enter\":{\"type\":\"flyFromRight\",\"start\":\"1\",\"delay\":\"1\"},\"exit\":{}}}]","title":"rgb(84, 82, 82) url(http://localhost:8000/assets/editor/uploads/images/4.jpg) repeat scroll 0% 0% / cover padding-box border-box","created_at":"2015-10-15 11:59:09","updated_at":"2015-10-22 08:50:12"},{"id":16,"campaign_id":4,"json":"[{\"tag\":\"textArea\",\"text\":\"Text Field\",\"font\":\"Arial, Helvetica\",\"rows\":\"1\",\"cols\":10,\"style\":\"z-index: 117; font-family: Arial, Helvetica; color: rgb(0, 0, 0); top: 123px; left: 221px; position: absolute; transform: matrix(3, 0, 0, 3, 0, 0); height: 20px; width: 87px;\",\"freetrans\":{\"angle\":0,\"maintainAspectRatio\":false,\"rot-origin\":\"50% 50%\",\"scaleLimit\":0.1,\"scalex\":3,\"scaley\":3,\"x\":308,\"y\":143},\"animation\":{\"enter\":{},\"exit\":{}}}]","title":"rgb(84, 82, 82) none repeat scroll 0% 0% / cover padding-box border-box","created_at":"2015-10-20 09:59:45","updated_at":"2015-10-22 06:00:20"}]
$(function() {
	var hash = $('.presentation-container').data('campaign-hash');
	$.get('/campaigns/'+ hash +'/slides', function(data) {
		if(data.length) {
			startPresentation(data);
		} else {
			console.log('no slides');
		}
	});
});

function startPresentation(data) {
	var width = 800;
	var height = 400;

	var windowWidth = $('.presentation-container').width();
	var windowHeight = $('.presentation-container').height();

	var windowx = windowWidth / width;
	var windowy = windowHeight / height;

	var slideHeart = $('.slide-heart');
	slideHeart.css({
		'width': windowWidth,
		'height': windowHeight
	});
	
	var activeSlide = 0;
	var totalSlides = data.length;
	updateInfo(activeSlide + 1, totalSlides);
	loadObjects(activeSlide, data, slideHeart, windowx, windowy);

	$('body').on('keyup', function(e) {
		if(e.keyCode === 39) {
			if(activeSlide >= data.length - 1) {
				// activeSlide = 0;
				return;
			}
			activeSlide++;
			loadObjects(activeSlide, data, slideHeart, windowx, windowy);
			updateInfo(activeSlide + 1, totalSlides);
			return;
		}
		if(e.keyCode === 37) {
			if(activeSlide <= 0) {
				// activeSlide = data.length - 1;
				return;
			}
			activeSlide--;
			loadObjects(activeSlide, data, slideHeart, windowx, windowy);
			updateInfo(activeSlide + 1, totalSlides);
			return;
		}
	});
	
	$('.left-slide').on('click', function() {
		if(activeSlide <= 0) {
			// activeSlide = data.length - 1;
			return;
		}
		activeSlide--;
		loadObjects(activeSlide, data, slideHeart, windowx, windowy);
		updateInfo(activeSlide + 1, totalSlides);
		return;
	});

	$('.right-slide').on('click', function() {
		if(activeSlide >= data.length - 1) {
			// activeSlide = 0;
			return;
		}
		activeSlide++;
		loadObjects(activeSlide, data, slideHeart, windowx, windowy);
		updateInfo(activeSlide + 1, totalSlides);
		return;
	});

	$('.presentation-container').on('mouseover', function() {
		$('.slide-control').show();
	}).on('mouseout', function() {
		$('.slide-control').hide();
	});

	if (fullScreenApi.supportsFullScreen) {
		$('.slide-heart').get(0).addEventListener('click', function() {
			fullScreenApi.requestFullScreen(this);
		}, true);
	}

	$(window).on('resize', function() {
		windowWidth = $('.parent-slide').width();
		windowHeight = $('.presentation-container').height();

		slideHeart.css({
			'width': windowWidth,
			'height': windowHeight
		});

		loadObjects(activeSlide, data, slideHeart, windowx, windowy);
	});

};

function updateInfo(activeSlide, totalSlides) {
	$('.current-slide').text(activeSlide);
	$('.total-slides').text(totalSlides);
};
