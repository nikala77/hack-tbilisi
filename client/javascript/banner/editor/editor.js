console.log('editor');

$(function() {

  // sidebar initialization
  var backup_params;
  var options = {
    onMouseDown: function(){
      var $this = $(this);
      // transition-duration
      backup_params = {
        'transition-duration': $this.css('transition-duration')
      };
      var params = {
        'transition-duration': '0'
      };
      $this.css(params);
    }
    ,onMouseUp: function(){
      var $this = $(this);
      $this.css(backup_params);
    }
  };
  //
  $('.cabinet-left').cabinet($.extend({
    width: 300
    ,mode: 'position'
  }, options));
  //


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
  
});