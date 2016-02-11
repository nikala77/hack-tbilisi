function uploadVideo(form, type) {
  var url = $(form).attr('action');
  var file = $(form).find('input[type=file]')[0].files[0];
  var prepend = $(form).find('input[name=key]').val().split('${filename}')[0];
  var filename = 'https://prezhero.s3.amazonaws.com/' + prepend + file.name;

  $.ajax( {
    url: url,
    type: 'post',
    data: new FormData( form ),
    processData: false,
    contentType: false,
    success: function(data){
      addVideo(slideHeart, filename, 300, 150, 'upload');
    },
    error: function(err) {
      addVideo(slideHeart, filename, 300, 150, 'upload');
    }
  });
  return false;
}