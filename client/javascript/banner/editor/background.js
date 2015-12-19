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
                console.log(bannerBg);
                var bgColor = '#'+rgb;
                bannerBg.css({
                    'background-color': bgColor,
                    'background-image': 'none'
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