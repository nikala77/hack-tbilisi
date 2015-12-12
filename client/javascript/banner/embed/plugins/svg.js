function convertSVG(shape, width, height, x, y, freetrans, animation) {
    var $img = shape;
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    $.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');
        // Replace image with new SVG
        $img.replaceWith($svg);
        if(x) {
            $svg.css({
                position: 'absolute',
                top: y,
                left: x,
                width: width,
                height: height
            }).attr({
                class: 'ft-widget'
            });

            $img.addClass('ft-widget');
        }
        $svg.find('path').css('fill', 'blue');
        return $svg;
    }, 'xml');

};