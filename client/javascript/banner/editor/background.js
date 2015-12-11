$(function () {
  var bannerBg = $('.working-banner'),
      bgBox = $('.bg-box'),
      bgColpicker = $('#bg-colpicker');
  
  // change banner size via dropdown
  $('.baner-size-dropdown').on('click', 'li', function () {
    var newValue =  parseInt($(this).find('h4').text());

    switch (newValue) {
      case 200 : changeBannerSize(200, 200); break;
      case 300 : changeBannerSize(300, 300); break;
      case 728 : changeBannerSize(728, 90); break;
      case 120 : changeBannerSize(120, 600); break;
      case 160 : changeBannerSize(160, 600); break;
    }
  });

  // add background image

  // change background color

  // colpicker
  $('.bg-colpicker').on('click', function () {
    $('#bg-colpicker').colpick({
      layout : 'rgb',
      submit : false,
      onChange : function (hsb,rgb) {
        var bgColor = '#'+rgb;
        bannerBg.css({
          'background-color': bgColor,
          'background-image': none
        });
      },
      onSubmit : function(hsb,hex,rgb,el) {
        bgColpicker.colpickHide();
      }
    });
  });
   
  
  // often used colors
  $('.bg-colored').on('click', function () {
    bannerBg.css({
      'background-color': $(this).css('background-color'),
      'background-image': 'none'
    });
  }); 

  // change background images
  bgBox.on('click', '.bg-image', function () {
    bannerBg.css({
      'background-image': $(this).css('background-image'),
      'background-size': 'cover'
    });
  });
})