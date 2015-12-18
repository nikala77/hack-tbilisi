function convertSVG(shape, fill, stroke, width, height) {
    var $img = shape;
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    $.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
                
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass +' replaced-svg');
        }
        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        $svg.attr('width', width);
        $svg.attr('height', height);

        $svg.css({
            'width': width,
            'height': height
        });

        // Replace image with new SVG
        $img.replaceWith($svg);

        if(fill) {
            $svg.find('path').css('fill', fill);
            $svg.find('polygon').css('fill', fill);
            $svg.find('circle').css('fill', fill);
            $svg.find('rect').css('fill', fill);
            $svg.find('polyline').css('fill', fill);
            $svg.find('line').css('fill', fill);
        }

        if(stroke) {
            $svg.find('path').css('stroke', stroke);
            $svg.find('polygon').css('stroke', stroke);
            $svg.find('circle').css('stroke', stroke);
            $svg.find('rect').css('stroke', stroke);
            $svg.find('polyline').css('stroke', stroke);
            $svg.find('line').css('stroke', stroke);
        }

        return $svg;
    }, 'xml');

};