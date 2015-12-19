$(function (){

	$('.dropdown-menu').click(function(e) {
        e.stopPropagation();
    });

	$("#enter-stage").on("click",function(){
		$("#enter-stage").addClass("active");
		$("#exit-stage").removeClass("active");
		$("#complex").removeClass("active");

		$("#enter-stage-content").show();
		$("#exit-stage-content").hide();
		$("#complex-content").hide();
	});

	$("#exit-stage").on("click",function(){
		$("#enter-stage").removeClass("active");
		$("#exit-stage").addClass("active");
		$("#complex").removeClass("active");

		$("#enter-stage-content").hide();
		$("#exit-stage-content").show();
		$("#complex-content").hide();
	});

	$("#complex").on("click",function(){
		$("#enter-stage").removeClass("active");
		$("#exit-stage").removeClass("active");
		$("#complex").addClass("active");

		$("#enter-stage-content").hide();
		$("#exit-stage-content").hide();
		$("#complex-content").show();
	});

	$("#animation-close-btn").on("click",function(){
		$(".animations-dropdown").removeClass("open");
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmltYXRpb24tZHJvcGRvd24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbiAoKXtcblxuXHQkKCcuZHJvcGRvd24tbWVudScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuXHQkKFwiI2VudGVyLXN0YWdlXCIpLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuXHRcdCQoXCIjZW50ZXItc3RhZ2VcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cdFx0JChcIiNleGl0LXN0YWdlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXHRcdCQoXCIjY29tcGxleFwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcblxuXHRcdCQoXCIjZW50ZXItc3RhZ2UtY29udGVudFwiKS5zaG93KCk7XG5cdFx0JChcIiNleGl0LXN0YWdlLWNvbnRlbnRcIikuaGlkZSgpO1xuXHRcdCQoXCIjY29tcGxleC1jb250ZW50XCIpLmhpZGUoKTtcblx0fSk7XG5cblx0JChcIiNleGl0LXN0YWdlXCIpLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuXHRcdCQoXCIjZW50ZXItc3RhZ2VcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG5cdFx0JChcIiNleGl0LXN0YWdlXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXHRcdCQoXCIjY29tcGxleFwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcblxuXHRcdCQoXCIjZW50ZXItc3RhZ2UtY29udGVudFwiKS5oaWRlKCk7XG5cdFx0JChcIiNleGl0LXN0YWdlLWNvbnRlbnRcIikuc2hvdygpO1xuXHRcdCQoXCIjY29tcGxleC1jb250ZW50XCIpLmhpZGUoKTtcblx0fSk7XG5cblx0JChcIiNjb21wbGV4XCIpLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuXHRcdCQoXCIjZW50ZXItc3RhZ2VcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG5cdFx0JChcIiNleGl0LXN0YWdlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXHRcdCQoXCIjY29tcGxleFwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblxuXHRcdCQoXCIjZW50ZXItc3RhZ2UtY29udGVudFwiKS5oaWRlKCk7XG5cdFx0JChcIiNleGl0LXN0YWdlLWNvbnRlbnRcIikuaGlkZSgpO1xuXHRcdCQoXCIjY29tcGxleC1jb250ZW50XCIpLnNob3coKTtcblx0fSk7XG5cblx0JChcIiNhbmltYXRpb24tY2xvc2UtYnRuXCIpLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuXHRcdCQoXCIuYW5pbWF0aW9ucy1kcm9wZG93blwiKS5yZW1vdmVDbGFzcyhcIm9wZW5cIik7XG5cdH0pO1xufSk7Il0sImZpbGUiOiJhbmltYXRpb24tZHJvcGRvd24uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

$(function () {

    // change background colors, images, size
    // from sidebar and


    var bannerBg = $('.working-banner'),
        bgBox = $('.bg-box'),
        bgColpicker = $('#bg-colpicker'),
        customSize = $('.custom-size'),
        bSizeDropdown = $('.bannersize-dropdown');  
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

    bSizeDropdown.find('button').on('click', function () {
        var currentWidth = parseInt(bannerBg.css('width')),
            currentHeight = parseInt(bannerBg.css('height'));
        console.log(currentHeight, currentWidth);
        customSize.find('.custom-size-width').val(currentWidth);     
        customSize.find('.custom-size-height').val(currentHeight);     
    });


    // custom size options
    customSize.find('input').on('change', function () {
        var $this = $(this),
            opt = $this.hasClass('custom-size-width'),
            currentWidth = parseInt(bannerBg.css('width')),
            currentHeight = parseInt(bannerBg.css('height'));

        if (opt) {
            changeBannerSize(parseInt($this.val()), currentHeight);   
        } else {
            changeBannerSize(currentWidth, parseInt($this.val()));
        }
    });

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiYWNrZ3JvdW5kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24gKCkge1xuXG4gICAgLy8gY2hhbmdlIGJhY2tncm91bmQgY29sb3JzLCBpbWFnZXMsIHNpemVcbiAgICAvLyBmcm9tIHNpZGViYXIgYW5kXG5cblxuICAgIHZhciBiYW5uZXJCZyA9ICQoJy53b3JraW5nLWJhbm5lcicpLFxuICAgICAgICBiZ0JveCA9ICQoJy5iZy1ib3gnKSxcbiAgICAgICAgYmdDb2xwaWNrZXIgPSAkKCcjYmctY29scGlja2VyJyksXG4gICAgICAgIGN1c3RvbVNpemUgPSAkKCcuY3VzdG9tLXNpemUnKSxcbiAgICAgICAgYlNpemVEcm9wZG93biA9ICQoJy5iYW5uZXJzaXplLWRyb3Bkb3duJyk7ICBcbiAgICAvLyBjaGFuZ2UgYmFubmVyIHNpemUgdmlhIGRyb3Bkb3duXG4gICAgJCgnLmJhbmVyLXNpemUtZHJvcGRvd24nKS5vbignY2xpY2snLCAnbGknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9ICBwYXJzZUludCgkKHRoaXMpLmZpbmQoJ2g0JykudGV4dCgpKTtcblxuICAgICAgICBzd2l0Y2ggKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBjYXNlIDIwMCA6IGNoYW5nZUJhbm5lclNpemUoMjAwLCAyMDApOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzAwIDogY2hhbmdlQmFubmVyU2l6ZSgzMDAsIDMwMCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA3MjggOiBjaGFuZ2VCYW5uZXJTaXplKDcyOCwgOTApOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTIwIDogY2hhbmdlQmFubmVyU2l6ZSgxMjAsIDYwMCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxNjAgOiBjaGFuZ2VCYW5uZXJTaXplKDE2MCwgNjAwKTsgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGJTaXplRHJvcGRvd24uZmluZCgnYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY3VycmVudFdpZHRoID0gcGFyc2VJbnQoYmFubmVyQmcuY3NzKCd3aWR0aCcpKSxcbiAgICAgICAgICAgIGN1cnJlbnRIZWlnaHQgPSBwYXJzZUludChiYW5uZXJCZy5jc3MoJ2hlaWdodCcpKTtcbiAgICAgICAgY29uc29sZS5sb2coY3VycmVudEhlaWdodCwgY3VycmVudFdpZHRoKTtcbiAgICAgICAgY3VzdG9tU2l6ZS5maW5kKCcuY3VzdG9tLXNpemUtd2lkdGgnKS52YWwoY3VycmVudFdpZHRoKTsgICAgIFxuICAgICAgICBjdXN0b21TaXplLmZpbmQoJy5jdXN0b20tc2l6ZS1oZWlnaHQnKS52YWwoY3VycmVudEhlaWdodCk7ICAgICBcbiAgICB9KTtcblxuXG4gICAgLy8gY3VzdG9tIHNpemUgb3B0aW9uc1xuICAgIGN1c3RvbVNpemUuZmluZCgnaW5wdXQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxuICAgICAgICAgICAgb3B0ID0gJHRoaXMuaGFzQ2xhc3MoJ2N1c3RvbS1zaXplLXdpZHRoJyksXG4gICAgICAgICAgICBjdXJyZW50V2lkdGggPSBwYXJzZUludChiYW5uZXJCZy5jc3MoJ3dpZHRoJykpLFxuICAgICAgICAgICAgY3VycmVudEhlaWdodCA9IHBhcnNlSW50KGJhbm5lckJnLmNzcygnaGVpZ2h0JykpO1xuXG4gICAgICAgIGlmIChvcHQpIHtcbiAgICAgICAgICAgIGNoYW5nZUJhbm5lclNpemUocGFyc2VJbnQoJHRoaXMudmFsKCkpLCBjdXJyZW50SGVpZ2h0KTsgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoYW5nZUJhbm5lclNpemUoY3VycmVudFdpZHRoLCBwYXJzZUludCgkdGhpcy52YWwoKSkpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBjb2xwaWNrZXJcbiAgICAkKCcuYmctY29scGlja2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcjYmctY29scGlja2VyJykuY29scGljayh7XG4gICAgICAgICAgICBsYXlvdXQgOiAncmdiJyxcbiAgICAgICAgICAgIHN1Ym1pdCA6IGZhbHNlLFxuICAgICAgICAgICAgb25DaGFuZ2UgOiBmdW5jdGlvbiAoaHNiLHJnYikge1xuICAgICAgICAgICAgICAgIHZhciBiZ0NvbG9yID0gJyMnK3JnYjtcbiAgICAgICAgICAgICAgICBiYW5uZXJCZy5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IGJnQ29sb3IsXG4gICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlJzogbm9uZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uU3VibWl0IDogZnVuY3Rpb24oaHNiLGhleCxyZ2IsZWwpIHtcbiAgICAgICAgICAgICAgICBiZ0NvbHBpY2tlci5jb2xwaWNrSGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgIFxuICBcbiAgICAvLyBvZnRlbiB1c2VkIGNvbG9yc1xuICAgICQoJy5iZy1jb2xvcmVkJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBiYW5uZXJCZy5jc3Moe1xuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicpLFxuICAgICAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2UnOiAnbm9uZSdcbiAgICAgICAgfSk7XG4gICAgfSk7IFxuXG4gICAgLy8gY2hhbmdlIGJhY2tncm91bmQgaW1hZ2VzXG4gICAgYmdCb3gub24oJ2NsaWNrJywgJy5iZy1pbWFnZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmFubmVyQmcuY3NzKHtcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlJzogJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKSxcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLXNpemUnOiAnY292ZXInXG4gICAgICAgIH0pO1xuICAgIH0pO1xufSkiXSwiZmlsZSI6ImJhY2tncm91bmQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJlZGl0b3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbigpIHtcbiAgXG4gIHZhciBiYW5uZXJCZyA9ICQoJy53b3JraW5nLWJhbm5lcicpO1xuXG4gIC8vIHNpZGViYXIgaW5pdGlhbGl6YXRpb25cbiAgdmFyIGJhY2t1cF9wYXJhbXM7XG4gIHZhciBvcHRpb25zID0ge1xuICAgIG9uTW91c2VEb3duOiBmdW5jdGlvbigpe1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgIC8vIHRyYW5zaXRpb24tZHVyYXRpb25cbiAgICAgIGJhY2t1cF9wYXJhbXMgPSB7XG4gICAgICAgICd0cmFuc2l0aW9uLWR1cmF0aW9uJzogJHRoaXMuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJylcbiAgICAgIH07XG4gICAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICAndHJhbnNpdGlvbi1kdXJhdGlvbic6ICcwJ1xuICAgICAgfTtcbiAgICAgICR0aGlzLmNzcyhwYXJhbXMpO1xuICAgIH1cbiAgICAsb25Nb3VzZVVwOiBmdW5jdGlvbigpe1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICR0aGlzLmNzcyhiYWNrdXBfcGFyYW1zKTtcbiAgICB9XG4gIH07XG4gIC8vXG4gICQoJy5jYWJpbmV0LWxlZnQnKS5jYWJpbmV0KCQuZXh0ZW5kKHtcbiAgICB3aWR0aDogMzAwXG4gICAgLG1vZGU6ICdwb3NpdGlvbidcbiAgfSwgb3B0aW9ucykpO1xuICAvL1xuXG5cbiAgLy8gdXBkYXRlIGJhbm5lciBuYW1lIFxuXG4gICQoJyNiYW5uZXJuYW1lJykub24oJ2JsdXInLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG5hbWUgPSAkKHRoaXMpLnZhbCgpLnRyaW0oKTtcbiAgICB2YXIgaWQgPSBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpWzJdO1xuICAgIGNvbnNvbGUubG9nKCcvYXBpL2Jhbm5lci8nICsgaWQpO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIlBVVFwiLFxuICAgICAgICB1cmw6ICcvYXBpL2Jhbm5lci8nICsgaWQsXG4gICAgICAgIGRhdGE6IHsgbmFtZTogbmFtZSB9LFxuICAgICAgfSkuZmFpbChmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBhbGVydChkYXRhLnJlc3BvbnNlVGV4dCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gIH0pO1xuXG4gIC8vIGJpbmQgc29tZSBlZGl0b3Igb3B0aW9ucyBcbiAgYmluZFpvb21pbmcoYmFubmVyQmcpO1xufSk7Il0sImZpbGUiOiJlZGl0b3IuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

function copyElement(elementID) {
    var hiddenInput = document.createElement("input");
    hiddenInput.setAttribute("value", document.getElementById(elementID).value);
    document.body.appendChild(hiddenInput);
    hiddenInput.select();
    document.execCommand("copy");
    document.body.removeChild(hiddenInput);
};

$(function () {
	$("#publish-embed").on("click",function(){
		$("#publish-embed").addClass("publish-active");
		$("#publish-player").removeClass("publish-active");
		$("#publish-download").removeClass("publish-active");

		$(".embed-content").show();
		$(".player-content").hide();
		$(".download-content").hide();
	});

	$("#publish-player").on("click",function(){
		$("#publish-embed").removeClass("publish-active");
		$("#publish-player").addClass("publish-active");
		$("#publish-download").removeClass("publish-active");

		$(".embed-content").hide();
		$(".player-content").show();
		$(".download-content").hide();
	});

	$("#publish-download").on("click",function(){
		$("#publish-embed").removeClass("publish-active");
		$("#publish-player").removeClass("publish-active");
		$("#publish-download").addClass("publish-active");

		$(".embed-content").hide();
		$(".player-content").hide();
		$(".download-content").show();
	});

	$("#fixed").on("click",function(){
		$("#fixed").addClass("active");
		$("#responsive").removeClass("active");
	});

	$("#responsive").on("click",function(){
		$("#fixed").removeClass("active");
		$("#responsive").addClass("active");
	});

	$(".copy-btn").on("click",function(){
		copyElement('puvlish-link-textarea');
	});	
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwdWJsaXNoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNvcHlFbGVtZW50KGVsZW1lbnRJRCkge1xuICAgIHZhciBoaWRkZW5JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBoaWRkZW5JbnB1dC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SUQpLnZhbHVlKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGhpZGRlbklucHV0KTtcbiAgICBoaWRkZW5JbnB1dC5zZWxlY3QoKTtcbiAgICBkb2N1bWVudC5leGVjQ29tbWFuZChcImNvcHlcIik7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChoaWRkZW5JbnB1dCk7XG59O1xuXG4kKGZ1bmN0aW9uICgpIHtcblx0JChcIiNwdWJsaXNoLWVtYmVkXCIpLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuXHRcdCQoXCIjcHVibGlzaC1lbWJlZFwiKS5hZGRDbGFzcyhcInB1Ymxpc2gtYWN0aXZlXCIpO1xuXHRcdCQoXCIjcHVibGlzaC1wbGF5ZXJcIikucmVtb3ZlQ2xhc3MoXCJwdWJsaXNoLWFjdGl2ZVwiKTtcblx0XHQkKFwiI3B1Ymxpc2gtZG93bmxvYWRcIikucmVtb3ZlQ2xhc3MoXCJwdWJsaXNoLWFjdGl2ZVwiKTtcblxuXHRcdCQoXCIuZW1iZWQtY29udGVudFwiKS5zaG93KCk7XG5cdFx0JChcIi5wbGF5ZXItY29udGVudFwiKS5oaWRlKCk7XG5cdFx0JChcIi5kb3dubG9hZC1jb250ZW50XCIpLmhpZGUoKTtcblx0fSk7XG5cblx0JChcIiNwdWJsaXNoLXBsYXllclwiKS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcblx0XHQkKFwiI3B1Ymxpc2gtZW1iZWRcIikucmVtb3ZlQ2xhc3MoXCJwdWJsaXNoLWFjdGl2ZVwiKTtcblx0XHQkKFwiI3B1Ymxpc2gtcGxheWVyXCIpLmFkZENsYXNzKFwicHVibGlzaC1hY3RpdmVcIik7XG5cdFx0JChcIiNwdWJsaXNoLWRvd25sb2FkXCIpLnJlbW92ZUNsYXNzKFwicHVibGlzaC1hY3RpdmVcIik7XG5cblx0XHQkKFwiLmVtYmVkLWNvbnRlbnRcIikuaGlkZSgpO1xuXHRcdCQoXCIucGxheWVyLWNvbnRlbnRcIikuc2hvdygpO1xuXHRcdCQoXCIuZG93bmxvYWQtY29udGVudFwiKS5oaWRlKCk7XG5cdH0pO1xuXG5cdCQoXCIjcHVibGlzaC1kb3dubG9hZFwiKS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcblx0XHQkKFwiI3B1Ymxpc2gtZW1iZWRcIikucmVtb3ZlQ2xhc3MoXCJwdWJsaXNoLWFjdGl2ZVwiKTtcblx0XHQkKFwiI3B1Ymxpc2gtcGxheWVyXCIpLnJlbW92ZUNsYXNzKFwicHVibGlzaC1hY3RpdmVcIik7XG5cdFx0JChcIiNwdWJsaXNoLWRvd25sb2FkXCIpLmFkZENsYXNzKFwicHVibGlzaC1hY3RpdmVcIik7XG5cblx0XHQkKFwiLmVtYmVkLWNvbnRlbnRcIikuaGlkZSgpO1xuXHRcdCQoXCIucGxheWVyLWNvbnRlbnRcIikuaGlkZSgpO1xuXHRcdCQoXCIuZG93bmxvYWQtY29udGVudFwiKS5zaG93KCk7XG5cdH0pO1xuXG5cdCQoXCIjZml4ZWRcIikub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG5cdFx0JChcIiNmaXhlZFwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblx0XHQkKFwiI3Jlc3BvbnNpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG5cdH0pO1xuXG5cdCQoXCIjcmVzcG9uc2l2ZVwiKS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcblx0XHQkKFwiI2ZpeGVkXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXHRcdCQoXCIjcmVzcG9uc2l2ZVwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblx0fSk7XG5cblx0JChcIi5jb3B5LWJ0blwiKS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcblx0XHRjb3B5RWxlbWVudCgncHV2bGlzaC1saW5rLXRleHRhcmVhJyk7XG5cdH0pO1x0XG59KTsiXSwiZmlsZSI6InB1Ymxpc2guanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

function changeBannerSize (width, height) {
	console.log(width, height)
	var left = $(window).width() / 2 - width / 2 + 50;
	var top = $(window).height() / 2 - height / 2 - 50;
	console.log(left)
	$('.working-banner').css({
		'width': width,
		'height': height,
		'left': left,
		'top': top
	});
}


function bindZooming (banner) {
	var scale = 1;
	var scaleFactor = 1.1;
	$('.scale-plus').on('click', function() {
		scale *= scaleFactor;
		banner.css({
			'transform': 'scale('+ scale +')'
		});
	});

	$('.scale-minus').on('click', function() {
		scale /= scaleFactor;
		banner.css({
			'transform': 'scale('+ scale +')'
		});
	});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1dGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjaGFuZ2VCYW5uZXJTaXplICh3aWR0aCwgaGVpZ2h0KSB7XG5cdGNvbnNvbGUubG9nKHdpZHRoLCBoZWlnaHQpXG5cdHZhciBsZWZ0ID0gJCh3aW5kb3cpLndpZHRoKCkgLyAyIC0gd2lkdGggLyAyICsgNTA7XG5cdHZhciB0b3AgPSAkKHdpbmRvdykuaGVpZ2h0KCkgLyAyIC0gaGVpZ2h0IC8gMiAtIDUwO1xuXHRjb25zb2xlLmxvZyhsZWZ0KVxuXHQkKCcud29ya2luZy1iYW5uZXInKS5jc3Moe1xuXHRcdCd3aWR0aCc6IHdpZHRoLFxuXHRcdCdoZWlnaHQnOiBoZWlnaHQsXG5cdFx0J2xlZnQnOiBsZWZ0LFxuXHRcdCd0b3AnOiB0b3Bcblx0fSk7XG59XG5cblxuZnVuY3Rpb24gYmluZFpvb21pbmcgKGJhbm5lcikge1xuXHR2YXIgc2NhbGUgPSAxO1xuXHR2YXIgc2NhbGVGYWN0b3IgPSAxLjE7XG5cdCQoJy5zY2FsZS1wbHVzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0c2NhbGUgKj0gc2NhbGVGYWN0b3I7XG5cdFx0YmFubmVyLmNzcyh7XG5cdFx0XHQndHJhbnNmb3JtJzogJ3NjYWxlKCcrIHNjYWxlICsnKSdcblx0XHR9KTtcblx0fSk7XG5cblx0JCgnLnNjYWxlLW1pbnVzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0c2NhbGUgLz0gc2NhbGVGYWN0b3I7XG5cdFx0YmFubmVyLmNzcyh7XG5cdFx0XHQndHJhbnNmb3JtJzogJ3NjYWxlKCcrIHNjYWxlICsnKSdcblx0XHR9KTtcblx0fSk7XG59Il0sImZpbGUiOiJ1dGlscy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
