console.log('editor');

$(function() {
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
});