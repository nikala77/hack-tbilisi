$(function() {
  
  var bannerBg = $('.working-banner');

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


  // update banner name 

  $('#bannername').on('blur', function () {
    var name = $(this).val().trim();
    var id = document.location.pathname.split('/')[2];
    console.log('/api/banner/' + id);
    if (name) {
      $.ajax({
        type: "PUT",
        url: '/api/banner/' + id,
        data: { name: name },
      }).fail(function (data) {
        alert(data.responseText);
      });
    }
    
  });

  // bind some editor options 
  bindZooming(bannerBg);
});