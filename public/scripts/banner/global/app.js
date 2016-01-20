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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY29udmVydFNWRyhzaGFwZSwgZmlsbCwgc3Ryb2tlLCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB2YXIgJGltZyA9IHNoYXBlO1xyXG4gICAgdmFyIGltZ0lEID0gJGltZy5hdHRyKCdpZCcpO1xyXG4gICAgdmFyIGltZ0NsYXNzID0gJGltZy5hdHRyKCdjbGFzcycpO1xyXG4gICAgdmFyIGltZ1VSTCA9ICRpbWcuYXR0cignc3JjJyk7XHJcbiAgICAkLmdldChpbWdVUkwsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAvLyBHZXQgdGhlIFNWRyB0YWcsIGlnbm9yZSB0aGUgcmVzdFxyXG4gICAgICAgIHZhciAkc3ZnID0gJChkYXRhKS5maW5kKCdzdmcnKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIHJlcGxhY2VkIGltYWdlJ3MgSUQgdG8gdGhlIG5ldyBTVkdcclxuICAgICAgICBpZih0eXBlb2YgaW1nSUQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIEFkZCByZXBsYWNlZCBpbWFnZSdzIGNsYXNzZXMgdG8gdGhlIG5ldyBTVkdcclxuICAgICAgICBpZih0eXBlb2YgaW1nQ2xhc3MgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2NsYXNzJywgaW1nQ2xhc3MgKycgcmVwbGFjZWQtc3ZnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJlbW92ZSBhbnkgaW52YWxpZCBYTUwgdGFncyBhcyBwZXIgaHR0cDovL3ZhbGlkYXRvci53My5vcmdcclxuICAgICAgICAkc3ZnID0gJHN2Zy5yZW1vdmVBdHRyKCd4bWxuczphJyk7XHJcblxyXG4gICAgICAgICRzdmcuYXR0cignd2lkdGgnLCB3aWR0aCk7XHJcbiAgICAgICAgJHN2Zy5hdHRyKCdoZWlnaHQnLCBoZWlnaHQpO1xyXG5cclxuICAgICAgICAkc3ZnLmNzcyh7XHJcbiAgICAgICAgICAgICd3aWR0aCc6IHdpZHRoLFxyXG4gICAgICAgICAgICAnaGVpZ2h0JzogaGVpZ2h0XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFJlcGxhY2UgaW1hZ2Ugd2l0aCBuZXcgU1ZHXHJcbiAgICAgICAgJGltZy5yZXBsYWNlV2l0aCgkc3ZnKTtcclxuXHJcbiAgICAgICAgaWYoZmlsbCkge1xyXG4gICAgICAgICAgICAkc3ZnLmZpbmQoJ3BhdGgnKS5jc3MoJ2ZpbGwnLCBmaWxsKTtcclxuICAgICAgICAgICAgJHN2Zy5maW5kKCdwb2x5Z29uJykuY3NzKCdmaWxsJywgZmlsbCk7XHJcbiAgICAgICAgICAgICRzdmcuZmluZCgnY2lyY2xlJykuY3NzKCdmaWxsJywgZmlsbCk7XHJcbiAgICAgICAgICAgICRzdmcuZmluZCgncmVjdCcpLmNzcygnZmlsbCcsIGZpbGwpO1xyXG4gICAgICAgICAgICAkc3ZnLmZpbmQoJ3BvbHlsaW5lJykuY3NzKCdmaWxsJywgZmlsbCk7XHJcbiAgICAgICAgICAgICRzdmcuZmluZCgnbGluZScpLmNzcygnZmlsbCcsIGZpbGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoc3Ryb2tlKSB7XHJcbiAgICAgICAgICAgICRzdmcuZmluZCgncGF0aCcpLmNzcygnc3Ryb2tlJywgc3Ryb2tlKTtcclxuICAgICAgICAgICAgJHN2Zy5maW5kKCdwb2x5Z29uJykuY3NzKCdzdHJva2UnLCBzdHJva2UpO1xyXG4gICAgICAgICAgICAkc3ZnLmZpbmQoJ2NpcmNsZScpLmNzcygnc3Ryb2tlJywgc3Ryb2tlKTtcclxuICAgICAgICAgICAgJHN2Zy5maW5kKCdyZWN0JykuY3NzKCdzdHJva2UnLCBzdHJva2UpO1xyXG4gICAgICAgICAgICAkc3ZnLmZpbmQoJ3BvbHlsaW5lJykuY3NzKCdzdHJva2UnLCBzdHJva2UpO1xyXG4gICAgICAgICAgICAkc3ZnLmZpbmQoJ2xpbmUnKS5jc3MoJ3N0cm9rZScsIHN0cm9rZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gJHN2ZztcclxuICAgIH0sICd4bWwnKTtcclxuXHJcbn07Il0sImZpbGUiOiJzdmcuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

// returns random x and y cordinate
function generateRandom(slide) {
	var randomLeft = Math.round(slide.width() / 2 - (Math.random() * 150));
	var randomTop  = Math.round(slide.height() / 2 - (Math.random() * 150));

	var object = {
		x: randomLeft,
		y: randomTop
	};

	return object;
};

function rangeRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
};

function buildCss(style) {
	var styles = style.split(';');
	var buildCss = {};
	
	styles.forEach(function(style) {
		var prop = style.split(':')[0];
		var val  = style.split(':')[1];
		
		if(prop && val) {
			prop = prop.trim();
			val  = val.trim();
			buildCss[prop] = val;
		}
	});

	return buildCss;
};

function getRotationDegrees(obj) {
	var matrix = obj.css("-webkit-transform") ||
	obj.css("-moz-transform")    ||
	obj.css("-ms-transform")     ||
	obj.css("-o-transform")      ||
	obj.css("transform");
	if(matrix !== 'none') {
		var values = matrix.split('(')[1].split(')')[0].split(',');
		var a = values[0];
		var b = values[1];
		var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
	} else { var angle = 0; }
	return (angle < 0) ? angle + 360 : angle;
};

function replaceAll(str, find, replace) {
	var i = str.indexOf(find);
	if (i > -1) {
		str = str.replace(find, replace);
		i = i + replace.length;
		var st2 = str.substring(i);
		if(st2.indexOf(find) > -1){
			str = str.substring(0,i) + replaceAll(st2, find, replace);
		}
	}
	return str;
};

function lightSlider(ul) {
    ul.lightSlider({
        item:5,
        loop:false,
        keyPress:true,
        pager:false,
        adaptiveHeight: true
    });
};

function getMouseEventCaretRange(evt) {
    var range, x = evt.clientX, y = evt.clientY;
    
        // Try the simple IE way first
        if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToPoint(x, y);
        }
    
    else if (typeof document.createRange != "undefined") {
        // Try Mozilla's rangeOffset and rangeParent properties, which are exactly what we want
        
        if (typeof evt.rangeParent != "undefined") {
            range = document.createRange();
            range.setStart(evt.rangeParent, evt.rangeOffset);
            range.collapse(true);
        }
    
        // Try the standards-based way next
        else if (document.caretPositionFromPoint) {
            var pos = document.caretPositionFromPoint(x, y);
            range = document.createRange();
            range.setStart(pos.offsetNode, pos.offset);
            range.collapse(true);
        }
    
        // Next, the WebKit way
        else if (document.caretRangeFromPoint) {
            range = document.caretRangeFromPoint(x, y);
        }
    }
    
    return range;
}

function selectRange(range) {
    if (range) {
        if (typeof range.select != "undefined") {
            range.select();
        } else if (typeof window.getSelection != "undefined") {
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJnbG9iYWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcmV0dXJucyByYW5kb20geCBhbmQgeSBjb3JkaW5hdGVcclxuZnVuY3Rpb24gZ2VuZXJhdGVSYW5kb20oc2xpZGUpIHtcclxuXHR2YXIgcmFuZG9tTGVmdCA9IE1hdGgucm91bmQoc2xpZGUud2lkdGgoKSAvIDIgLSAoTWF0aC5yYW5kb20oKSAqIDE1MCkpO1xyXG5cdHZhciByYW5kb21Ub3AgID0gTWF0aC5yb3VuZChzbGlkZS5oZWlnaHQoKSAvIDIgLSAoTWF0aC5yYW5kb20oKSAqIDE1MCkpO1xyXG5cclxuXHR2YXIgb2JqZWN0ID0ge1xyXG5cdFx0eDogcmFuZG9tTGVmdCxcclxuXHRcdHk6IHJhbmRvbVRvcFxyXG5cdH07XHJcblxyXG5cdHJldHVybiBvYmplY3Q7XHJcbn07XHJcblxyXG5mdW5jdGlvbiByYW5nZVJhbmRvbShtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIG1pbiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBidWlsZENzcyhzdHlsZSkge1xyXG5cdHZhciBzdHlsZXMgPSBzdHlsZS5zcGxpdCgnOycpO1xyXG5cdHZhciBidWlsZENzcyA9IHt9O1xyXG5cdFxyXG5cdHN0eWxlcy5mb3JFYWNoKGZ1bmN0aW9uKHN0eWxlKSB7XHJcblx0XHR2YXIgcHJvcCA9IHN0eWxlLnNwbGl0KCc6JylbMF07XHJcblx0XHR2YXIgdmFsICA9IHN0eWxlLnNwbGl0KCc6JylbMV07XHJcblx0XHRcclxuXHRcdGlmKHByb3AgJiYgdmFsKSB7XHJcblx0XHRcdHByb3AgPSBwcm9wLnRyaW0oKTtcclxuXHRcdFx0dmFsICA9IHZhbC50cmltKCk7XHJcblx0XHRcdGJ1aWxkQ3NzW3Byb3BdID0gdmFsO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gYnVpbGRDc3M7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBnZXRSb3RhdGlvbkRlZ3JlZXMob2JqKSB7XHJcblx0dmFyIG1hdHJpeCA9IG9iai5jc3MoXCItd2Via2l0LXRyYW5zZm9ybVwiKSB8fFxyXG5cdG9iai5jc3MoXCItbW96LXRyYW5zZm9ybVwiKSAgICB8fFxyXG5cdG9iai5jc3MoXCItbXMtdHJhbnNmb3JtXCIpICAgICB8fFxyXG5cdG9iai5jc3MoXCItby10cmFuc2Zvcm1cIikgICAgICB8fFxyXG5cdG9iai5jc3MoXCJ0cmFuc2Zvcm1cIik7XHJcblx0aWYobWF0cml4ICE9PSAnbm9uZScpIHtcclxuXHRcdHZhciB2YWx1ZXMgPSBtYXRyaXguc3BsaXQoJygnKVsxXS5zcGxpdCgnKScpWzBdLnNwbGl0KCcsJyk7XHJcblx0XHR2YXIgYSA9IHZhbHVlc1swXTtcclxuXHRcdHZhciBiID0gdmFsdWVzWzFdO1xyXG5cdFx0dmFyIGFuZ2xlID0gTWF0aC5yb3VuZChNYXRoLmF0YW4yKGIsIGEpICogKDE4MC9NYXRoLlBJKSk7XHJcblx0fSBlbHNlIHsgdmFyIGFuZ2xlID0gMDsgfVxyXG5cdHJldHVybiAoYW5nbGUgPCAwKSA/IGFuZ2xlICsgMzYwIDogYW5nbGU7XHJcbn07XHJcblxyXG5mdW5jdGlvbiByZXBsYWNlQWxsKHN0ciwgZmluZCwgcmVwbGFjZSkge1xyXG5cdHZhciBpID0gc3RyLmluZGV4T2YoZmluZCk7XHJcblx0aWYgKGkgPiAtMSkge1xyXG5cdFx0c3RyID0gc3RyLnJlcGxhY2UoZmluZCwgcmVwbGFjZSk7XHJcblx0XHRpID0gaSArIHJlcGxhY2UubGVuZ3RoO1xyXG5cdFx0dmFyIHN0MiA9IHN0ci5zdWJzdHJpbmcoaSk7XHJcblx0XHRpZihzdDIuaW5kZXhPZihmaW5kKSA+IC0xKXtcclxuXHRcdFx0c3RyID0gc3RyLnN1YnN0cmluZygwLGkpICsgcmVwbGFjZUFsbChzdDIsIGZpbmQsIHJlcGxhY2UpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gc3RyO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gbGlnaHRTbGlkZXIodWwpIHtcclxuICAgIHVsLmxpZ2h0U2xpZGVyKHtcclxuICAgICAgICBpdGVtOjUsXHJcbiAgICAgICAgbG9vcDpmYWxzZSxcclxuICAgICAgICBrZXlQcmVzczp0cnVlLFxyXG4gICAgICAgIHBhZ2VyOmZhbHNlLFxyXG4gICAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlXHJcbiAgICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGdldE1vdXNlRXZlbnRDYXJldFJhbmdlKGV2dCkge1xyXG4gICAgdmFyIHJhbmdlLCB4ID0gZXZ0LmNsaWVudFgsIHkgPSBldnQuY2xpZW50WTtcclxuICAgIFxyXG4gICAgICAgIC8vIFRyeSB0aGUgc2ltcGxlIElFIHdheSBmaXJzdFxyXG4gICAgICAgIGlmIChkb2N1bWVudC5ib2R5LmNyZWF0ZVRleHRSYW5nZSkge1xyXG4gICAgICAgICAgICByYW5nZSA9IGRvY3VtZW50LmJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XHJcbiAgICAgICAgICAgIHJhbmdlLm1vdmVUb1BvaW50KHgsIHkpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50LmNyZWF0ZVJhbmdlICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAvLyBUcnkgTW96aWxsYSdzIHJhbmdlT2Zmc2V0IGFuZCByYW5nZVBhcmVudCBwcm9wZXJ0aWVzLCB3aGljaCBhcmUgZXhhY3RseSB3aGF0IHdlIHdhbnRcclxuICAgICAgICBcclxuICAgICAgICBpZiAodHlwZW9mIGV2dC5yYW5nZVBhcmVudCAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuICAgICAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoZXZ0LnJhbmdlUGFyZW50LCBldnQucmFuZ2VPZmZzZXQpO1xyXG4gICAgICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvLyBUcnkgdGhlIHN0YW5kYXJkcy1iYXNlZCB3YXkgbmV4dFxyXG4gICAgICAgIGVsc2UgaWYgKGRvY3VtZW50LmNhcmV0UG9zaXRpb25Gcm9tUG9pbnQpIHtcclxuICAgICAgICAgICAgdmFyIHBvcyA9IGRvY3VtZW50LmNhcmV0UG9zaXRpb25Gcm9tUG9pbnQoeCwgeSk7XHJcbiAgICAgICAgICAgIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuICAgICAgICAgICAgcmFuZ2Uuc2V0U3RhcnQocG9zLm9mZnNldE5vZGUsIHBvcy5vZmZzZXQpO1xyXG4gICAgICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvLyBOZXh0LCB0aGUgV2ViS2l0IHdheVxyXG4gICAgICAgIGVsc2UgaWYgKGRvY3VtZW50LmNhcmV0UmFuZ2VGcm9tUG9pbnQpIHtcclxuICAgICAgICAgICAgcmFuZ2UgPSBkb2N1bWVudC5jYXJldFJhbmdlRnJvbVBvaW50KHgsIHkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHJhbmdlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZWxlY3RSYW5nZShyYW5nZSkge1xyXG4gICAgaWYgKHJhbmdlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiByYW5nZS5zZWxlY3QgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICByYW5nZS5zZWxlY3QoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cuZ2V0U2VsZWN0aW9uICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdmFyIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xyXG4gICAgICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var groupArr = [];
var objects = [];
var lastObjectID = 100;
var lastZindex = 100;
var workingBoard;
var workingBanner;
var bannerData;
var textFieldFocused;
var isSelected;
var wasDragged;
var slideIndex;
var activeObject;

var slideCanvas = 'defined';
var defaultData = { background: "#FF8800", json: [] };
$(function() {
	$.ajax({
		url: '/api/banner/data/' + bannerID,
		type: 'GET',
		timeout: 3000,
		success: function(data) {
			try {
				bannerData = JSON.parse(data);
			} catch(err) {
				bannerData = defaultData;
			}
			
			init(bannerData);
		},
		error: function(request, errorType, errorMessage) {
			console.log(request, errorType, errorMessage);
		},
	});
});

function init(data) {
	workingBoard = $('.working-board');
	workingBanner = $('.working-banner');

	alignMiddle(workingBanner);
	scrollCenter(workingBoard);
	
	bannerData = data;

	// load content of slide
	loadObjects(data);

};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBncm91cEFyciA9IFtdO1xyXG52YXIgb2JqZWN0cyA9IFtdO1xyXG52YXIgbGFzdE9iamVjdElEID0gMTAwO1xyXG52YXIgbGFzdFppbmRleCA9IDEwMDtcclxudmFyIHdvcmtpbmdCb2FyZDtcclxudmFyIHdvcmtpbmdCYW5uZXI7XHJcbnZhciBiYW5uZXJEYXRhO1xyXG52YXIgdGV4dEZpZWxkRm9jdXNlZDtcclxudmFyIGlzU2VsZWN0ZWQ7XHJcbnZhciB3YXNEcmFnZ2VkO1xyXG52YXIgc2xpZGVJbmRleDtcclxudmFyIGFjdGl2ZU9iamVjdDtcclxuXHJcbnZhciBzbGlkZUNhbnZhcyA9ICdkZWZpbmVkJztcclxudmFyIGRlZmF1bHREYXRhID0geyBiYWNrZ3JvdW5kOiBcIiNGRjg4MDBcIiwganNvbjogW10gfTtcclxuJChmdW5jdGlvbigpIHtcclxuXHQkLmFqYXgoe1xyXG5cdFx0dXJsOiAnL2FwaS9iYW5uZXIvZGF0YS8nICsgYmFubmVySUQsXHJcblx0XHR0eXBlOiAnR0VUJyxcclxuXHRcdHRpbWVvdXQ6IDMwMDAsXHJcblx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0YmFubmVyRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcblx0XHRcdFx0YmFubmVyRGF0YSA9IGRlZmF1bHREYXRhO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRpbml0KGJhbm5lckRhdGEpO1xyXG5cdFx0fSxcclxuXHRcdGVycm9yOiBmdW5jdGlvbihyZXF1ZXN0LCBlcnJvclR5cGUsIGVycm9yTWVzc2FnZSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhyZXF1ZXN0LCBlcnJvclR5cGUsIGVycm9yTWVzc2FnZSk7XHJcblx0XHR9LFxyXG5cdH0pO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoZGF0YSkge1xyXG5cdHdvcmtpbmdCb2FyZCA9ICQoJy53b3JraW5nLWJvYXJkJyk7XHJcblx0d29ya2luZ0Jhbm5lciA9ICQoJy53b3JraW5nLWJhbm5lcicpO1xyXG5cclxuXHRhbGlnbk1pZGRsZSh3b3JraW5nQmFubmVyKTtcclxuXHRzY3JvbGxDZW50ZXIod29ya2luZ0JvYXJkKTtcclxuXHRcclxuXHRiYW5uZXJEYXRhID0gZGF0YTtcclxuXHJcblx0Ly8gbG9hZCBjb250ZW50IG9mIHNsaWRlXHJcblx0bG9hZE9iamVjdHMoZGF0YSk7XHJcblxyXG59OyJdLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

$(function() {
	$('.working-board').on('click', '.ft-widget', function() {
		var id = parseInt($(this).attr('id'));
		if (id) {
			removeActiveObject();
			activateObject($(this));
		}
	});

	$('.working-board').on('click', '.contenteditable', function() {
		var id = parseInt($(this).attr('id'));
		if (id) {
			removeActiveObject();
			activateObject($(this));
		}
	});

	$('body').on('click', 'a', function(e) {
		if($(this).attr('href') === '#') {
			e.preventDefault();
		}
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJvbi1sb2FkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24oKSB7XHJcblx0JCgnLndvcmtpbmctYm9hcmQnKS5vbignY2xpY2snLCAnLmZ0LXdpZGdldCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGlkID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdpZCcpKTtcclxuXHRcdGlmIChpZCkge1xyXG5cdFx0XHRyZW1vdmVBY3RpdmVPYmplY3QoKTtcclxuXHRcdFx0YWN0aXZhdGVPYmplY3QoJCh0aGlzKSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdCQoJy53b3JraW5nLWJvYXJkJykub24oJ2NsaWNrJywgJy5jb250ZW50ZWRpdGFibGUnLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBpZCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignaWQnKSk7XHJcblx0XHRpZiAoaWQpIHtcclxuXHRcdFx0cmVtb3ZlQWN0aXZlT2JqZWN0KCk7XHJcblx0XHRcdGFjdGl2YXRlT2JqZWN0KCQodGhpcykpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQkKCdib2R5Jykub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRpZigkKHRoaXMpLmF0dHIoJ2hyZWYnKSA9PT0gJyMnKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH1cclxuXHR9KTtcclxufSk7Il0sImZpbGUiOiJvbi1sb2FkLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

function bindOnModifiedEvent (element) {
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	var timeout = 0;
	var observer = new MutationObserver(function(mutations, observer) {
	    mutations.forEach(function (mutObject) {
	    	if (mutObject.target.getAttribute('data-active') === 'true') {
			    offsetShapePanel();
			    clearTimeout(timeout);
			    timeout = setTimeout(function () {

			    	if (textFieldFocused) {
			    		clearTimeout(timeout);
			    	} else {
			    		if (!isSelected) {

			    			isSelected = false;
			    			updateObjectStates(getBannerData());
			    		} else if (wasDragged) {

			    			wasDragged = false;
			    			updateObjectStates(getBannerData());
			    		} 
			    		else {
			    			wasDragged = false;
			    			isSelected = false;
			    		}
			    	}
			    }, 1000);
	    	} 
	    });
	});

	bindListeners(element);
	// define what element should be observed by the observer
	// and what types of mutations trigger the callback
	observer.observe( element, {
	  subtree: true,
	  attributes: true
	});

	$('body').trigger('slideChange');
}

var isDragging;
var target;

function bindListeners (element) {
	element.addEventListener("mousedown", function (e) {
		target = this;
	}, true);

	element.addEventListener("mousemove", function (e) {
		if (element === target) {
	    	isDragging = true;
		}
	}, true);

	element.addEventListener("mouseup", function (e) {
	    if (isDragging) {
	    	isDragging = false;
	    	wasDragged = true;
	    }
	}, true);
}

function offsetShapePanel () {
	var active = getActiveObject();

	if (active) {

		var	controls = active.siblings('.ft-controls'),
			topLeft = controls.find('.ft-scaler-tl').position() || active.css('left'),
			topRight = controls.find('.ft-scaler-tr').position() || active.css('left') + active.width(),
			bottomLeft = controls.find('.ft-scaler-bl').position() || active.css('left') + active.height(),
			bottomRight = controls.find('.ft-scaler-br').position() || active.css('top') + active.height() + active.width(),
			top = controls.position() ? controls.position().top - 5 : parseInt(active.css('top')) - 5,
			left = controls.position() ? controls.position().left + 25 : parseInt(active.css('left')) + active.width() + 10,
			arr = [topLeft, topRight, bottomRight, bottomLeft];

		var add = 0; 

		var shapePanel;
		if (active.data('type') === 'text') {
			shapePanel = active.siblings('.shape-panel');
		} else {
			for (var i = 0; i < arr.length; i++) {
				if (add < arr[i].left) {
					add = arr[i].left;
				}
			}	
			left += add;
			shapePanel = active.parent('.ft-container').siblings('.shape-panel');
		}
		shapePanel.css({
			top: top,
			left: left
		});
	}
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJvbk1vZGlmaWVkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGJpbmRPbk1vZGlmaWVkRXZlbnQgKGVsZW1lbnQpIHtcclxuXHRNdXRhdGlvbk9ic2VydmVyID0gd2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIgfHwgd2luZG93LldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XHJcblx0dmFyIHRpbWVvdXQgPSAwO1xyXG5cdHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucywgb2JzZXJ2ZXIpIHtcclxuXHQgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dE9iamVjdCkge1xyXG5cdCAgICBcdGlmIChtdXRPYmplY3QudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1hY3RpdmUnKSA9PT0gJ3RydWUnKSB7XHJcblx0XHRcdCAgICBvZmZzZXRTaGFwZVBhbmVsKCk7XHJcblx0XHRcdCAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcblx0XHRcdCAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHQgICAgXHRpZiAodGV4dEZpZWxkRm9jdXNlZCkge1xyXG5cdFx0XHQgICAgXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuXHRcdFx0ICAgIFx0fSBlbHNlIHtcclxuXHRcdFx0ICAgIFx0XHRpZiAoIWlzU2VsZWN0ZWQpIHtcclxuXHJcblx0XHRcdCAgICBcdFx0XHRpc1NlbGVjdGVkID0gZmFsc2U7XHJcblx0XHRcdCAgICBcdFx0XHR1cGRhdGVPYmplY3RTdGF0ZXMoZ2V0QmFubmVyRGF0YSgpKTtcclxuXHRcdFx0ICAgIFx0XHR9IGVsc2UgaWYgKHdhc0RyYWdnZWQpIHtcclxuXHJcblx0XHRcdCAgICBcdFx0XHR3YXNEcmFnZ2VkID0gZmFsc2U7XHJcblx0XHRcdCAgICBcdFx0XHR1cGRhdGVPYmplY3RTdGF0ZXMoZ2V0QmFubmVyRGF0YSgpKTtcclxuXHRcdFx0ICAgIFx0XHR9IFxyXG5cdFx0XHQgICAgXHRcdGVsc2Uge1xyXG5cdFx0XHQgICAgXHRcdFx0d2FzRHJhZ2dlZCA9IGZhbHNlO1xyXG5cdFx0XHQgICAgXHRcdFx0aXNTZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0XHQgICAgXHRcdH1cclxuXHRcdFx0ICAgIFx0fVxyXG5cdFx0XHQgICAgfSwgMTAwMCk7XHJcblx0ICAgIFx0fSBcclxuXHQgICAgfSk7XHJcblx0fSk7XHJcblxyXG5cdGJpbmRMaXN0ZW5lcnMoZWxlbWVudCk7XHJcblx0Ly8gZGVmaW5lIHdoYXQgZWxlbWVudCBzaG91bGQgYmUgb2JzZXJ2ZWQgYnkgdGhlIG9ic2VydmVyXHJcblx0Ly8gYW5kIHdoYXQgdHlwZXMgb2YgbXV0YXRpb25zIHRyaWdnZXIgdGhlIGNhbGxiYWNrXHJcblx0b2JzZXJ2ZXIub2JzZXJ2ZSggZWxlbWVudCwge1xyXG5cdCAgc3VidHJlZTogdHJ1ZSxcclxuXHQgIGF0dHJpYnV0ZXM6IHRydWVcclxuXHR9KTtcclxuXHJcblx0JCgnYm9keScpLnRyaWdnZXIoJ3NsaWRlQ2hhbmdlJyk7XHJcbn1cclxuXHJcbnZhciBpc0RyYWdnaW5nO1xyXG52YXIgdGFyZ2V0O1xyXG5cclxuZnVuY3Rpb24gYmluZExpc3RlbmVycyAoZWxlbWVudCkge1xyXG5cdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dGFyZ2V0ID0gdGhpcztcclxuXHR9LCB0cnVlKTtcclxuXHJcblx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZiAoZWxlbWVudCA9PT0gdGFyZ2V0KSB7XHJcblx0ICAgIFx0aXNEcmFnZ2luZyA9IHRydWU7XHJcblx0XHR9XHJcblx0fSwgdHJ1ZSk7XHJcblxyXG5cdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHQgICAgaWYgKGlzRHJhZ2dpbmcpIHtcclxuXHQgICAgXHRpc0RyYWdnaW5nID0gZmFsc2U7XHJcblx0ICAgIFx0d2FzRHJhZ2dlZCA9IHRydWU7XHJcblx0ICAgIH1cclxuXHR9LCB0cnVlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb2Zmc2V0U2hhcGVQYW5lbCAoKSB7XHJcblx0dmFyIGFjdGl2ZSA9IGdldEFjdGl2ZU9iamVjdCgpO1xyXG5cclxuXHRpZiAoYWN0aXZlKSB7XHJcblxyXG5cdFx0dmFyXHRjb250cm9scyA9IGFjdGl2ZS5zaWJsaW5ncygnLmZ0LWNvbnRyb2xzJyksXHJcblx0XHRcdHRvcExlZnQgPSBjb250cm9scy5maW5kKCcuZnQtc2NhbGVyLXRsJykucG9zaXRpb24oKSB8fCBhY3RpdmUuY3NzKCdsZWZ0JyksXHJcblx0XHRcdHRvcFJpZ2h0ID0gY29udHJvbHMuZmluZCgnLmZ0LXNjYWxlci10cicpLnBvc2l0aW9uKCkgfHwgYWN0aXZlLmNzcygnbGVmdCcpICsgYWN0aXZlLndpZHRoKCksXHJcblx0XHRcdGJvdHRvbUxlZnQgPSBjb250cm9scy5maW5kKCcuZnQtc2NhbGVyLWJsJykucG9zaXRpb24oKSB8fCBhY3RpdmUuY3NzKCdsZWZ0JykgKyBhY3RpdmUuaGVpZ2h0KCksXHJcblx0XHRcdGJvdHRvbVJpZ2h0ID0gY29udHJvbHMuZmluZCgnLmZ0LXNjYWxlci1icicpLnBvc2l0aW9uKCkgfHwgYWN0aXZlLmNzcygndG9wJykgKyBhY3RpdmUuaGVpZ2h0KCkgKyBhY3RpdmUud2lkdGgoKSxcclxuXHRcdFx0dG9wID0gY29udHJvbHMucG9zaXRpb24oKSA/IGNvbnRyb2xzLnBvc2l0aW9uKCkudG9wIC0gNSA6IHBhcnNlSW50KGFjdGl2ZS5jc3MoJ3RvcCcpKSAtIDUsXHJcblx0XHRcdGxlZnQgPSBjb250cm9scy5wb3NpdGlvbigpID8gY29udHJvbHMucG9zaXRpb24oKS5sZWZ0ICsgMjUgOiBwYXJzZUludChhY3RpdmUuY3NzKCdsZWZ0JykpICsgYWN0aXZlLndpZHRoKCkgKyAxMCxcclxuXHRcdFx0YXJyID0gW3RvcExlZnQsIHRvcFJpZ2h0LCBib3R0b21SaWdodCwgYm90dG9tTGVmdF07XHJcblxyXG5cdFx0dmFyIGFkZCA9IDA7IFxyXG5cclxuXHRcdHZhciBzaGFwZVBhbmVsO1xyXG5cdFx0aWYgKGFjdGl2ZS5kYXRhKCd0eXBlJykgPT09ICd0ZXh0Jykge1xyXG5cdFx0XHRzaGFwZVBhbmVsID0gYWN0aXZlLnNpYmxpbmdzKCcuc2hhcGUtcGFuZWwnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKGFkZCA8IGFycltpXS5sZWZ0KSB7XHJcblx0XHRcdFx0XHRhZGQgPSBhcnJbaV0ubGVmdDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cdFxyXG5cdFx0XHRsZWZ0ICs9IGFkZDtcclxuXHRcdFx0c2hhcGVQYW5lbCA9IGFjdGl2ZS5wYXJlbnQoJy5mdC1jb250YWluZXInKS5zaWJsaW5ncygnLnNoYXBlLXBhbmVsJyk7XHJcblx0XHR9XHJcblx0XHRzaGFwZVBhbmVsLmNzcyh7XHJcblx0XHRcdHRvcDogdG9wLFxyXG5cdFx0XHRsZWZ0OiBsZWZ0XHJcblx0XHR9KTtcclxuXHR9XHJcbn0iXSwiZmlsZSI6Im9uTW9kaWZpZWQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

function scrollCenter(div) {
	div.scrollTop(div.height() * 0.85);
	div.scrollLeft(div.width() / 2.5);
};

function disableKeyboardScroll() {
	$('#slide-container').on('keydown', function(e) {
		var ar = new Array(33,34,35,36,37,38,39,40);
		var key = e.which;
		if($.inArray(key,ar) > -1) {
			e.preventDefault();
			return false;
		}
		return true;
	});
};

function alignMiddle(div) {
	div.css({ 
		top: (div.parent().height() - div.height()) / 2,
		left: (div.parent().width() - div.width()) / 2
	});
};

function loadObjects(data) {
	groupArr = [];
	var objects = eval(data.json);
	workingBanner.css('background', data.background);

	if(!objects) {
		return;
	}

	initObjectStates(objects);

	for(var j = 0; j < objects.length; j++) {
		var obj = objects[j];
		var src = obj.src;
		var videoType = obj.videoType;
		var width = obj.width;
		var height = obj.height;

		var style = obj.style;
		var freetrans = obj.freetrans;
		var animation = obj.animation;

		var text = obj.text;
		var font = obj.font;
		var rows = obj.rows;
		var cols = obj.cols;

		
		switch(objects[j].tag) {
			case 'img':   addImage(workingBanner, src, width, height, style, freetrans, animation); break;
			case 'textArea':  addText(workingBanner, text, font, width, height, style, animation); break;
			case 'shape':  addShape(workingBanner, src, width, height, obj.fill, obj.stroke, style, freetrans, animation); break;
			case 'audio': addAudio(workingBanner, src, width, height, style, freetrans, animation); break;
			case 'video': addVideo(workingBanner, src, width, height, videoType, style, freetrans, animation); break;
		}
	}
};

function loadAfterModify (str) {
	groupArr = [];
	var objects = eval(str);

	if(!objects) {
		return;
	}

	for(var j = 0; j < objects.length; j++) {
		var obj = objects[j];
		var src = obj.src;
		var videoType = obj.videoType;
		var width = obj.width;
		var height = obj.height;

		var style = obj.style;
		var freetrans = obj.freetrans;
		var animation = obj.animation;

		var text = obj.text;
		var font = obj.font;
		var rows = obj.rows;
		var cols = obj.cols;

		switch(objects[j].tag) {
			case 'audio': addAudio(workingBanner, src, width, height, style, freetrans, animation); break;
			case 'img':   addImage(workingBanner, src, width, height, style, freetrans, animation); break;
			case 'textArea':  addText(workingBanner, text, font, rows, cols, style, freetrans, animation); break;
			case 'shape':  addShape(workingBanner, src, width, height, obj.fill, style, freetrans, animation); break;
			case 'video': addVideo(workingBanner, src, width, height, videoType, style, freetrans, animation); break;
		}
	}
}

function getBannerData() {
	var bannerData = [];
	groupArr.forEach(function(obj) {
		var type = obj.data('type');
		try {
			var freetrans = obj.freetrans('getOptions');
		} catch(err) {
			freetrans = {
				x: obj.css('left'),
				y: obj.css('top')
			};
		}
		var enAnim = obj.data('enter-animation');
		var enStart = obj.data('enter-start');
		var enDelay = obj.data('enter-delay');
		var exAnim = obj.data('exit-animation');
		var exStart = obj.data('exit-start');
		var exDelay = obj.data('exit-delay');

		var animation = {
			enter: {
				type: enAnim,
				start: enStart,
				delay: enDelay 
			},
			exit : {
				type: exAnim,
				start: exStart,
				delay: exDelay 
			}
		};
		
		if(type === 'image') {
			var tag = 'img';
			var src = obj.attr('src');
			var width  = obj.width();
			var height = obj.height();
			var style  = obj.attr('style');
			var imageObj = new Image(tag, src, width, height, style, freetrans, animation);
			bannerData.push(imageObj);
			return;
		}
		if(type === 'text') {
			var tag = 'textArea';
			var text = obj.text();
			var style  = obj.attr('style');
			var font = obj.css('font-family');
			var width  = obj.width();
			var height = obj.height();
			var textObj = new TextFiled(tag, text, font, width, height, style, freetrans, animation);
			bannerData.push(textObj);
			return;
		}

		if(type === 'shape') {
			var tag = 'shape';
			var src = obj.data('src');
			var width  = obj.width();
			var height = obj.height();
			var fill = obj.data('fill');
			var stroke = obj.data('stroke');
			var style  = obj.attr('style');
			var shapeObj = new Shape(tag, src, width, height, fill, stroke, style, freetrans, animation);
			bannerData.push(shapeObj);
			return;
		}
		
		if(type === 'audio') {
			var tag = 'audio';
			var src = obj.data('audio-src');
			var width  = obj.width();
			var height = obj.height();
			var style  = obj.attr('style');
			var audioObj = new Audio(tag, src, width, height, style, freetrans, animation);
			bannerData.push(audioObj);
			return;
		}

		if(type === 'video') {
			var tag = 'video';
			var src = obj.data('video-src');
			var width  = obj.width();
			var height = obj.height();
			var style  = obj.attr('style');
			var videoType = obj.data('video-type');
			var videoObj = new Video(tag, src, videoType, width, height, style, freetrans, animation);
			bannerData.push(videoObj);
			return;
		}
	});
	var bannerData = JSON.stringify(bannerData);

	return bannerData;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkZXNrL2hlYXJ0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNjcm9sbENlbnRlcihkaXYpIHtcclxuXHRkaXYuc2Nyb2xsVG9wKGRpdi5oZWlnaHQoKSAqIDAuODUpO1xyXG5cdGRpdi5zY3JvbGxMZWZ0KGRpdi53aWR0aCgpIC8gMi41KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGRpc2FibGVLZXlib2FyZFNjcm9sbCgpIHtcclxuXHQkKCcjc2xpZGUtY29udGFpbmVyJykub24oJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XHJcblx0XHR2YXIgYXIgPSBuZXcgQXJyYXkoMzMsMzQsMzUsMzYsMzcsMzgsMzksNDApO1xyXG5cdFx0dmFyIGtleSA9IGUud2hpY2g7XHJcblx0XHRpZigkLmluQXJyYXkoa2V5LGFyKSA+IC0xKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBhbGlnbk1pZGRsZShkaXYpIHtcclxuXHRkaXYuY3NzKHsgXHJcblx0XHR0b3A6IChkaXYucGFyZW50KCkuaGVpZ2h0KCkgLSBkaXYuaGVpZ2h0KCkpIC8gMixcclxuXHRcdGxlZnQ6IChkaXYucGFyZW50KCkud2lkdGgoKSAtIGRpdi53aWR0aCgpKSAvIDJcclxuXHR9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGxvYWRPYmplY3RzKGRhdGEpIHtcclxuXHRncm91cEFyciA9IFtdO1xyXG5cdHZhciBvYmplY3RzID0gZXZhbChkYXRhLmpzb24pO1xyXG5cdHdvcmtpbmdCYW5uZXIuY3NzKCdiYWNrZ3JvdW5kJywgZGF0YS5iYWNrZ3JvdW5kKTtcclxuXHJcblx0aWYoIW9iamVjdHMpIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdGluaXRPYmplY3RTdGF0ZXMob2JqZWN0cyk7XHJcblxyXG5cdGZvcih2YXIgaiA9IDA7IGogPCBvYmplY3RzLmxlbmd0aDsgaisrKSB7XHJcblx0XHR2YXIgb2JqID0gb2JqZWN0c1tqXTtcclxuXHRcdHZhciBzcmMgPSBvYmouc3JjO1xyXG5cdFx0dmFyIHZpZGVvVHlwZSA9IG9iai52aWRlb1R5cGU7XHJcblx0XHR2YXIgd2lkdGggPSBvYmoud2lkdGg7XHJcblx0XHR2YXIgaGVpZ2h0ID0gb2JqLmhlaWdodDtcclxuXHJcblx0XHR2YXIgc3R5bGUgPSBvYmouc3R5bGU7XHJcblx0XHR2YXIgZnJlZXRyYW5zID0gb2JqLmZyZWV0cmFucztcclxuXHRcdHZhciBhbmltYXRpb24gPSBvYmouYW5pbWF0aW9uO1xyXG5cclxuXHRcdHZhciB0ZXh0ID0gb2JqLnRleHQ7XHJcblx0XHR2YXIgZm9udCA9IG9iai5mb250O1xyXG5cdFx0dmFyIHJvd3MgPSBvYmoucm93cztcclxuXHRcdHZhciBjb2xzID0gb2JqLmNvbHM7XHJcblxyXG5cdFx0XHJcblx0XHRzd2l0Y2gob2JqZWN0c1tqXS50YWcpIHtcclxuXHRcdFx0Y2FzZSAnaW1nJzogICBhZGRJbWFnZSh3b3JraW5nQmFubmVyLCBzcmMsIHdpZHRoLCBoZWlnaHQsIHN0eWxlLCBmcmVldHJhbnMsIGFuaW1hdGlvbik7IGJyZWFrO1xyXG5cdFx0XHRjYXNlICd0ZXh0QXJlYSc6ICBhZGRUZXh0KHdvcmtpbmdCYW5uZXIsIHRleHQsIGZvbnQsIHdpZHRoLCBoZWlnaHQsIHN0eWxlLCBhbmltYXRpb24pOyBicmVhaztcclxuXHRcdFx0Y2FzZSAnc2hhcGUnOiAgYWRkU2hhcGUod29ya2luZ0Jhbm5lciwgc3JjLCB3aWR0aCwgaGVpZ2h0LCBvYmouZmlsbCwgb2JqLnN0cm9rZSwgc3R5bGUsIGZyZWV0cmFucywgYW5pbWF0aW9uKTsgYnJlYWs7XHJcblx0XHRcdGNhc2UgJ2F1ZGlvJzogYWRkQXVkaW8od29ya2luZ0Jhbm5lciwgc3JjLCB3aWR0aCwgaGVpZ2h0LCBzdHlsZSwgZnJlZXRyYW5zLCBhbmltYXRpb24pOyBicmVhaztcclxuXHRcdFx0Y2FzZSAndmlkZW8nOiBhZGRWaWRlbyh3b3JraW5nQmFubmVyLCBzcmMsIHdpZHRoLCBoZWlnaHQsIHZpZGVvVHlwZSwgc3R5bGUsIGZyZWV0cmFucywgYW5pbWF0aW9uKTsgYnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuZnVuY3Rpb24gbG9hZEFmdGVyTW9kaWZ5IChzdHIpIHtcclxuXHRncm91cEFyciA9IFtdO1xyXG5cdHZhciBvYmplY3RzID0gZXZhbChzdHIpO1xyXG5cclxuXHRpZighb2JqZWN0cykge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0Zm9yKHZhciBqID0gMDsgaiA8IG9iamVjdHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdHZhciBvYmogPSBvYmplY3RzW2pdO1xyXG5cdFx0dmFyIHNyYyA9IG9iai5zcmM7XHJcblx0XHR2YXIgdmlkZW9UeXBlID0gb2JqLnZpZGVvVHlwZTtcclxuXHRcdHZhciB3aWR0aCA9IG9iai53aWR0aDtcclxuXHRcdHZhciBoZWlnaHQgPSBvYmouaGVpZ2h0O1xyXG5cclxuXHRcdHZhciBzdHlsZSA9IG9iai5zdHlsZTtcclxuXHRcdHZhciBmcmVldHJhbnMgPSBvYmouZnJlZXRyYW5zO1xyXG5cdFx0dmFyIGFuaW1hdGlvbiA9IG9iai5hbmltYXRpb247XHJcblxyXG5cdFx0dmFyIHRleHQgPSBvYmoudGV4dDtcclxuXHRcdHZhciBmb250ID0gb2JqLmZvbnQ7XHJcblx0XHR2YXIgcm93cyA9IG9iai5yb3dzO1xyXG5cdFx0dmFyIGNvbHMgPSBvYmouY29scztcclxuXHJcblx0XHRzd2l0Y2gob2JqZWN0c1tqXS50YWcpIHtcclxuXHRcdFx0Y2FzZSAnYXVkaW8nOiBhZGRBdWRpbyh3b3JraW5nQmFubmVyLCBzcmMsIHdpZHRoLCBoZWlnaHQsIHN0eWxlLCBmcmVldHJhbnMsIGFuaW1hdGlvbik7IGJyZWFrO1xyXG5cdFx0XHRjYXNlICdpbWcnOiAgIGFkZEltYWdlKHdvcmtpbmdCYW5uZXIsIHNyYywgd2lkdGgsIGhlaWdodCwgc3R5bGUsIGZyZWV0cmFucywgYW5pbWF0aW9uKTsgYnJlYWs7XHJcblx0XHRcdGNhc2UgJ3RleHRBcmVhJzogIGFkZFRleHQod29ya2luZ0Jhbm5lciwgdGV4dCwgZm9udCwgcm93cywgY29scywgc3R5bGUsIGZyZWV0cmFucywgYW5pbWF0aW9uKTsgYnJlYWs7XHJcblx0XHRcdGNhc2UgJ3NoYXBlJzogIGFkZFNoYXBlKHdvcmtpbmdCYW5uZXIsIHNyYywgd2lkdGgsIGhlaWdodCwgb2JqLmZpbGwsIHN0eWxlLCBmcmVldHJhbnMsIGFuaW1hdGlvbik7IGJyZWFrO1xyXG5cdFx0XHRjYXNlICd2aWRlbyc6IGFkZFZpZGVvKHdvcmtpbmdCYW5uZXIsIHNyYywgd2lkdGgsIGhlaWdodCwgdmlkZW9UeXBlLCBzdHlsZSwgZnJlZXRyYW5zLCBhbmltYXRpb24pOyBicmVhaztcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEJhbm5lckRhdGEoKSB7XHJcblx0dmFyIGJhbm5lckRhdGEgPSBbXTtcclxuXHRncm91cEFyci5mb3JFYWNoKGZ1bmN0aW9uKG9iaikge1xyXG5cdFx0dmFyIHR5cGUgPSBvYmouZGF0YSgndHlwZScpO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0dmFyIGZyZWV0cmFucyA9IG9iai5mcmVldHJhbnMoJ2dldE9wdGlvbnMnKTtcclxuXHRcdH0gY2F0Y2goZXJyKSB7XHJcblx0XHRcdGZyZWV0cmFucyA9IHtcclxuXHRcdFx0XHR4OiBvYmouY3NzKCdsZWZ0JyksXHJcblx0XHRcdFx0eTogb2JqLmNzcygndG9wJylcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHRcdHZhciBlbkFuaW0gPSBvYmouZGF0YSgnZW50ZXItYW5pbWF0aW9uJyk7XHJcblx0XHR2YXIgZW5TdGFydCA9IG9iai5kYXRhKCdlbnRlci1zdGFydCcpO1xyXG5cdFx0dmFyIGVuRGVsYXkgPSBvYmouZGF0YSgnZW50ZXItZGVsYXknKTtcclxuXHRcdHZhciBleEFuaW0gPSBvYmouZGF0YSgnZXhpdC1hbmltYXRpb24nKTtcclxuXHRcdHZhciBleFN0YXJ0ID0gb2JqLmRhdGEoJ2V4aXQtc3RhcnQnKTtcclxuXHRcdHZhciBleERlbGF5ID0gb2JqLmRhdGEoJ2V4aXQtZGVsYXknKTtcclxuXHJcblx0XHR2YXIgYW5pbWF0aW9uID0ge1xyXG5cdFx0XHRlbnRlcjoge1xyXG5cdFx0XHRcdHR5cGU6IGVuQW5pbSxcclxuXHRcdFx0XHRzdGFydDogZW5TdGFydCxcclxuXHRcdFx0XHRkZWxheTogZW5EZWxheSBcclxuXHRcdFx0fSxcclxuXHRcdFx0ZXhpdCA6IHtcclxuXHRcdFx0XHR0eXBlOiBleEFuaW0sXHJcblx0XHRcdFx0c3RhcnQ6IGV4U3RhcnQsXHJcblx0XHRcdFx0ZGVsYXk6IGV4RGVsYXkgXHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHRcclxuXHRcdGlmKHR5cGUgPT09ICdpbWFnZScpIHtcclxuXHRcdFx0dmFyIHRhZyA9ICdpbWcnO1xyXG5cdFx0XHR2YXIgc3JjID0gb2JqLmF0dHIoJ3NyYycpO1xyXG5cdFx0XHR2YXIgd2lkdGggID0gb2JqLndpZHRoKCk7XHJcblx0XHRcdHZhciBoZWlnaHQgPSBvYmouaGVpZ2h0KCk7XHJcblx0XHRcdHZhciBzdHlsZSAgPSBvYmouYXR0cignc3R5bGUnKTtcclxuXHRcdFx0dmFyIGltYWdlT2JqID0gbmV3IEltYWdlKHRhZywgc3JjLCB3aWR0aCwgaGVpZ2h0LCBzdHlsZSwgZnJlZXRyYW5zLCBhbmltYXRpb24pO1xyXG5cdFx0XHRiYW5uZXJEYXRhLnB1c2goaW1hZ2VPYmopO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRpZih0eXBlID09PSAndGV4dCcpIHtcclxuXHRcdFx0dmFyIHRhZyA9ICd0ZXh0QXJlYSc7XHJcblx0XHRcdHZhciB0ZXh0ID0gb2JqLnRleHQoKTtcclxuXHRcdFx0dmFyIHN0eWxlICA9IG9iai5hdHRyKCdzdHlsZScpO1xyXG5cdFx0XHR2YXIgZm9udCA9IG9iai5jc3MoJ2ZvbnQtZmFtaWx5Jyk7XHJcblx0XHRcdHZhciB3aWR0aCAgPSBvYmoud2lkdGgoKTtcclxuXHRcdFx0dmFyIGhlaWdodCA9IG9iai5oZWlnaHQoKTtcclxuXHRcdFx0dmFyIHRleHRPYmogPSBuZXcgVGV4dEZpbGVkKHRhZywgdGV4dCwgZm9udCwgd2lkdGgsIGhlaWdodCwgc3R5bGUsIGZyZWV0cmFucywgYW5pbWF0aW9uKTtcclxuXHRcdFx0YmFubmVyRGF0YS5wdXNoKHRleHRPYmopO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodHlwZSA9PT0gJ3NoYXBlJykge1xyXG5cdFx0XHR2YXIgdGFnID0gJ3NoYXBlJztcclxuXHRcdFx0dmFyIHNyYyA9IG9iai5kYXRhKCdzcmMnKTtcclxuXHRcdFx0dmFyIHdpZHRoICA9IG9iai53aWR0aCgpO1xyXG5cdFx0XHR2YXIgaGVpZ2h0ID0gb2JqLmhlaWdodCgpO1xyXG5cdFx0XHR2YXIgZmlsbCA9IG9iai5kYXRhKCdmaWxsJyk7XHJcblx0XHRcdHZhciBzdHJva2UgPSBvYmouZGF0YSgnc3Ryb2tlJyk7XHJcblx0XHRcdHZhciBzdHlsZSAgPSBvYmouYXR0cignc3R5bGUnKTtcclxuXHRcdFx0dmFyIHNoYXBlT2JqID0gbmV3IFNoYXBlKHRhZywgc3JjLCB3aWR0aCwgaGVpZ2h0LCBmaWxsLCBzdHJva2UsIHN0eWxlLCBmcmVldHJhbnMsIGFuaW1hdGlvbik7XHJcblx0XHRcdGJhbm5lckRhdGEucHVzaChzaGFwZU9iaik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYodHlwZSA9PT0gJ2F1ZGlvJykge1xyXG5cdFx0XHR2YXIgdGFnID0gJ2F1ZGlvJztcclxuXHRcdFx0dmFyIHNyYyA9IG9iai5kYXRhKCdhdWRpby1zcmMnKTtcclxuXHRcdFx0dmFyIHdpZHRoICA9IG9iai53aWR0aCgpO1xyXG5cdFx0XHR2YXIgaGVpZ2h0ID0gb2JqLmhlaWdodCgpO1xyXG5cdFx0XHR2YXIgc3R5bGUgID0gb2JqLmF0dHIoJ3N0eWxlJyk7XHJcblx0XHRcdHZhciBhdWRpb09iaiA9IG5ldyBBdWRpbyh0YWcsIHNyYywgd2lkdGgsIGhlaWdodCwgc3R5bGUsIGZyZWV0cmFucywgYW5pbWF0aW9uKTtcclxuXHRcdFx0YmFubmVyRGF0YS5wdXNoKGF1ZGlvT2JqKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHR5cGUgPT09ICd2aWRlbycpIHtcclxuXHRcdFx0dmFyIHRhZyA9ICd2aWRlbyc7XHJcblx0XHRcdHZhciBzcmMgPSBvYmouZGF0YSgndmlkZW8tc3JjJyk7XHJcblx0XHRcdHZhciB3aWR0aCAgPSBvYmoud2lkdGgoKTtcclxuXHRcdFx0dmFyIGhlaWdodCA9IG9iai5oZWlnaHQoKTtcclxuXHRcdFx0dmFyIHN0eWxlICA9IG9iai5hdHRyKCdzdHlsZScpO1xyXG5cdFx0XHR2YXIgdmlkZW9UeXBlID0gb2JqLmRhdGEoJ3ZpZGVvLXR5cGUnKTtcclxuXHRcdFx0dmFyIHZpZGVvT2JqID0gbmV3IFZpZGVvKHRhZywgc3JjLCB2aWRlb1R5cGUsIHdpZHRoLCBoZWlnaHQsIHN0eWxlLCBmcmVldHJhbnMsIGFuaW1hdGlvbik7XHJcblx0XHRcdGJhbm5lckRhdGEucHVzaCh2aWRlb09iaik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHR9KTtcclxuXHR2YXIgYmFubmVyRGF0YSA9IEpTT04uc3RyaW5naWZ5KGJhbm5lckRhdGEpO1xyXG5cclxuXHRyZXR1cm4gYmFubmVyRGF0YTtcclxufTsiXSwiZmlsZSI6ImRlc2svaGVhcnQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

function activateObject (shape) {
	
	var zIndex = parseInt(shape.css('z-index'));

	if(shape.hasClass('contenteditable')) {
		shape.find('div').show();

		var top = parseInt(shape.css('top')) + 5;
		var left = parseInt(shape.css('left')) + parseInt(shape.width()) + 25;
		
		shape.css('z-index', zIndex);
		isSelected = true;
		shape.attr('data-active', 'true');

		activateControlPanel(shape, top, left);
		activeObject = shape;
		activateAnimation(shape);
		return;
	}

	shape.freetrans('controls', true);

	if (zIndex) {
		var controls = shape.siblings('.ft-controls');
		var top = controls.position().top - 5;
		var left = controls.position().left + controls.width() + 25;
		var container = shape.parent('.ft-container');

		controls.css('z-index', zIndex);
		isSelected = true;
		shape.attr('data-active', 'true');
		container.attr('data-active', true);
		activateControlPanel(shape, top, left);
		activeObject = shape;
		activateAnimation(shape);
	}

};


function removeActiveObject () {
	groupArr.forEach(function (shape) {
		if(shape.hasClass('contenteditable')) {
			var editable = shape.find('div.editable');
			shape.attr('data-active', 'false');
			editable.blur();
			editable.siblings().hide();
			return;
		}
		if (shape.attr('data-active', 'true')) {
			shape.attr('data-active', 'false');
			shape.parent('.ft-container').attr('data-active', 'false');
			shape.freetrans('controls', false);
		}
	});
};

function getActiveObject () {
	var obj; 
	groupArr.forEach(function (shape) {
		if (shape.attr('data-active') === 'true') {
			obj = shape;
			return;
		}
	});
	return obj;
};

function activateAnimation(obj) {
	var enterAnimation = obj.data('enter-animation');
	var exitAnimation = obj.data('exit-animation');

	var enterStartTime = obj.data('enter-start');
	var enterDelay = obj.data('enter-delay');
	enterStartTime = enterStartTime ? enterStartTime : 1;
	enterDelay = enterDelay ? enterDelay : 1;

	var exitStartTime = obj.data('exit-start');
	var exitDelay = obj.data('exit-delay');
	exitStartTime = exitStartTime ? exitStartTime : 1;
	exitDelay = exitDelay ? exitDelay : 1;

	if(enterDelay !== -1912) {
		$('.enter-start-time').val(enterStartTime);
		$('.enter-delay').val(enterDelay);
	} else {
		$('.common-start-time').val(enterStartTime);
	}

	$('.animation-tab-content li a').removeClass('active-animation');

	var enterTag = $('[data-animation="'+ enterAnimation +'"]');
	enterTag.addClass('active-animation');
	enterTag.parent().siblings().find('a').removeClass('active-animation');

	var exitTag = $('[data-animation="'+ exitAnimation +'"]');
	exitTag.addClass('active-animation');
	exitTag.parent().siblings().find('a').removeClass('active-animation');

	$('.exit-start-time').val(exitStartTime);
	$('.exit-delay').val(exitDelay);

	if(enterAnimation === 'none') {
		$('#enter-stage-content li a').removeClass('active-animation');
		$('#common-content li a').removeClass('active-animation');
	}

	if(exitAnimation === 'none') {
		$('#exit-stage li a').removeClass('active-animation');
	}
	// if(obj[0].type !== 'textarea') {
	// 	$('.common-animation').show();
	// } else {
	// 	$('.common-animation').hide();
	// }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkZXNrL3NsaWRlci9hY3RpdmVPYmplY3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gYWN0aXZhdGVPYmplY3QgKHNoYXBlKSB7XHJcblx0XHJcblx0dmFyIHpJbmRleCA9IHBhcnNlSW50KHNoYXBlLmNzcygnei1pbmRleCcpKTtcclxuXHJcblx0aWYoc2hhcGUuaGFzQ2xhc3MoJ2NvbnRlbnRlZGl0YWJsZScpKSB7XHJcblx0XHRzaGFwZS5maW5kKCdkaXYnKS5zaG93KCk7XHJcblxyXG5cdFx0dmFyIHRvcCA9IHBhcnNlSW50KHNoYXBlLmNzcygndG9wJykpICsgNTtcclxuXHRcdHZhciBsZWZ0ID0gcGFyc2VJbnQoc2hhcGUuY3NzKCdsZWZ0JykpICsgcGFyc2VJbnQoc2hhcGUud2lkdGgoKSkgKyAyNTtcclxuXHRcdFxyXG5cdFx0c2hhcGUuY3NzKCd6LWluZGV4JywgekluZGV4KTtcclxuXHRcdGlzU2VsZWN0ZWQgPSB0cnVlO1xyXG5cdFx0c2hhcGUuYXR0cignZGF0YS1hY3RpdmUnLCAndHJ1ZScpO1xyXG5cclxuXHRcdGFjdGl2YXRlQ29udHJvbFBhbmVsKHNoYXBlLCB0b3AsIGxlZnQpO1xyXG5cdFx0YWN0aXZlT2JqZWN0ID0gc2hhcGU7XHJcblx0XHRhY3RpdmF0ZUFuaW1hdGlvbihzaGFwZSk7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHRzaGFwZS5mcmVldHJhbnMoJ2NvbnRyb2xzJywgdHJ1ZSk7XHJcblxyXG5cdGlmICh6SW5kZXgpIHtcclxuXHRcdHZhciBjb250cm9scyA9IHNoYXBlLnNpYmxpbmdzKCcuZnQtY29udHJvbHMnKTtcclxuXHRcdHZhciB0b3AgPSBjb250cm9scy5wb3NpdGlvbigpLnRvcCAtIDU7XHJcblx0XHR2YXIgbGVmdCA9IGNvbnRyb2xzLnBvc2l0aW9uKCkubGVmdCArIGNvbnRyb2xzLndpZHRoKCkgKyAyNTtcclxuXHRcdHZhciBjb250YWluZXIgPSBzaGFwZS5wYXJlbnQoJy5mdC1jb250YWluZXInKTtcclxuXHJcblx0XHRjb250cm9scy5jc3MoJ3otaW5kZXgnLCB6SW5kZXgpO1xyXG5cdFx0aXNTZWxlY3RlZCA9IHRydWU7XHJcblx0XHRzaGFwZS5hdHRyKCdkYXRhLWFjdGl2ZScsICd0cnVlJyk7XHJcblx0XHRjb250YWluZXIuYXR0cignZGF0YS1hY3RpdmUnLCB0cnVlKTtcclxuXHRcdGFjdGl2YXRlQ29udHJvbFBhbmVsKHNoYXBlLCB0b3AsIGxlZnQpO1xyXG5cdFx0YWN0aXZlT2JqZWN0ID0gc2hhcGU7XHJcblx0XHRhY3RpdmF0ZUFuaW1hdGlvbihzaGFwZSk7XHJcblx0fVxyXG5cclxufTtcclxuXHJcblxyXG5mdW5jdGlvbiByZW1vdmVBY3RpdmVPYmplY3QgKCkge1xyXG5cdGdyb3VwQXJyLmZvckVhY2goZnVuY3Rpb24gKHNoYXBlKSB7XHJcblx0XHRpZihzaGFwZS5oYXNDbGFzcygnY29udGVudGVkaXRhYmxlJykpIHtcclxuXHRcdFx0dmFyIGVkaXRhYmxlID0gc2hhcGUuZmluZCgnZGl2LmVkaXRhYmxlJyk7XHJcblx0XHRcdHNoYXBlLmF0dHIoJ2RhdGEtYWN0aXZlJywgJ2ZhbHNlJyk7XHJcblx0XHRcdGVkaXRhYmxlLmJsdXIoKTtcclxuXHRcdFx0ZWRpdGFibGUuc2libGluZ3MoKS5oaWRlKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmIChzaGFwZS5hdHRyKCdkYXRhLWFjdGl2ZScsICd0cnVlJykpIHtcclxuXHRcdFx0c2hhcGUuYXR0cignZGF0YS1hY3RpdmUnLCAnZmFsc2UnKTtcclxuXHRcdFx0c2hhcGUucGFyZW50KCcuZnQtY29udGFpbmVyJykuYXR0cignZGF0YS1hY3RpdmUnLCAnZmFsc2UnKTtcclxuXHRcdFx0c2hhcGUuZnJlZXRyYW5zKCdjb250cm9scycsIGZhbHNlKTtcclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGdldEFjdGl2ZU9iamVjdCAoKSB7XHJcblx0dmFyIG9iajsgXHJcblx0Z3JvdXBBcnIuZm9yRWFjaChmdW5jdGlvbiAoc2hhcGUpIHtcclxuXHRcdGlmIChzaGFwZS5hdHRyKCdkYXRhLWFjdGl2ZScpID09PSAndHJ1ZScpIHtcclxuXHRcdFx0b2JqID0gc2hhcGU7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHR9KTtcclxuXHRyZXR1cm4gb2JqO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gYWN0aXZhdGVBbmltYXRpb24ob2JqKSB7XHJcblx0dmFyIGVudGVyQW5pbWF0aW9uID0gb2JqLmRhdGEoJ2VudGVyLWFuaW1hdGlvbicpO1xyXG5cdHZhciBleGl0QW5pbWF0aW9uID0gb2JqLmRhdGEoJ2V4aXQtYW5pbWF0aW9uJyk7XHJcblxyXG5cdHZhciBlbnRlclN0YXJ0VGltZSA9IG9iai5kYXRhKCdlbnRlci1zdGFydCcpO1xyXG5cdHZhciBlbnRlckRlbGF5ID0gb2JqLmRhdGEoJ2VudGVyLWRlbGF5Jyk7XHJcblx0ZW50ZXJTdGFydFRpbWUgPSBlbnRlclN0YXJ0VGltZSA/IGVudGVyU3RhcnRUaW1lIDogMTtcclxuXHRlbnRlckRlbGF5ID0gZW50ZXJEZWxheSA/IGVudGVyRGVsYXkgOiAxO1xyXG5cclxuXHR2YXIgZXhpdFN0YXJ0VGltZSA9IG9iai5kYXRhKCdleGl0LXN0YXJ0Jyk7XHJcblx0dmFyIGV4aXREZWxheSA9IG9iai5kYXRhKCdleGl0LWRlbGF5Jyk7XHJcblx0ZXhpdFN0YXJ0VGltZSA9IGV4aXRTdGFydFRpbWUgPyBleGl0U3RhcnRUaW1lIDogMTtcclxuXHRleGl0RGVsYXkgPSBleGl0RGVsYXkgPyBleGl0RGVsYXkgOiAxO1xyXG5cclxuXHRpZihlbnRlckRlbGF5ICE9PSAtMTkxMikge1xyXG5cdFx0JCgnLmVudGVyLXN0YXJ0LXRpbWUnKS52YWwoZW50ZXJTdGFydFRpbWUpO1xyXG5cdFx0JCgnLmVudGVyLWRlbGF5JykudmFsKGVudGVyRGVsYXkpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcuY29tbW9uLXN0YXJ0LXRpbWUnKS52YWwoZW50ZXJTdGFydFRpbWUpO1xyXG5cdH1cclxuXHJcblx0JCgnLmFuaW1hdGlvbi10YWItY29udGVudCBsaSBhJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZS1hbmltYXRpb24nKTtcclxuXHJcblx0dmFyIGVudGVyVGFnID0gJCgnW2RhdGEtYW5pbWF0aW9uPVwiJysgZW50ZXJBbmltYXRpb24gKydcIl0nKTtcclxuXHRlbnRlclRhZy5hZGRDbGFzcygnYWN0aXZlLWFuaW1hdGlvbicpO1xyXG5cdGVudGVyVGFnLnBhcmVudCgpLnNpYmxpbmdzKCkuZmluZCgnYScpLnJlbW92ZUNsYXNzKCdhY3RpdmUtYW5pbWF0aW9uJyk7XHJcblxyXG5cdHZhciBleGl0VGFnID0gJCgnW2RhdGEtYW5pbWF0aW9uPVwiJysgZXhpdEFuaW1hdGlvbiArJ1wiXScpO1xyXG5cdGV4aXRUYWcuYWRkQ2xhc3MoJ2FjdGl2ZS1hbmltYXRpb24nKTtcclxuXHRleGl0VGFnLnBhcmVudCgpLnNpYmxpbmdzKCkuZmluZCgnYScpLnJlbW92ZUNsYXNzKCdhY3RpdmUtYW5pbWF0aW9uJyk7XHJcblxyXG5cdCQoJy5leGl0LXN0YXJ0LXRpbWUnKS52YWwoZXhpdFN0YXJ0VGltZSk7XHJcblx0JCgnLmV4aXQtZGVsYXknKS52YWwoZXhpdERlbGF5KTtcclxuXHJcblx0aWYoZW50ZXJBbmltYXRpb24gPT09ICdub25lJykge1xyXG5cdFx0JCgnI2VudGVyLXN0YWdlLWNvbnRlbnQgbGkgYScpLnJlbW92ZUNsYXNzKCdhY3RpdmUtYW5pbWF0aW9uJyk7XHJcblx0XHQkKCcjY29tbW9uLWNvbnRlbnQgbGkgYScpLnJlbW92ZUNsYXNzKCdhY3RpdmUtYW5pbWF0aW9uJyk7XHJcblx0fVxyXG5cclxuXHRpZihleGl0QW5pbWF0aW9uID09PSAnbm9uZScpIHtcclxuXHRcdCQoJyNleGl0LXN0YWdlIGxpIGEnKS5yZW1vdmVDbGFzcygnYWN0aXZlLWFuaW1hdGlvbicpO1xyXG5cdH1cclxuXHQvLyBpZihvYmpbMF0udHlwZSAhPT0gJ3RleHRhcmVhJykge1xyXG5cdC8vIFx0JCgnLmNvbW1vbi1hbmltYXRpb24nKS5zaG93KCk7XHJcblx0Ly8gfSBlbHNlIHtcclxuXHQvLyBcdCQoJy5jb21tb24tYW5pbWF0aW9uJykuaGlkZSgpO1xyXG5cdC8vIH1cclxufTsiXSwiZmlsZSI6ImRlc2svc2xpZGVyL2FjdGl2ZU9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

function removeObjectFromGroup () {

	for (var i = 0; i < groupArr.length; i++) {
		if (groupArr[i].attr('data-active') === 'true') { 
			var index = i;
			if (index < groupArr.length) {
				groupArr.splice(i, 1);
				while (index < groupArr.length) {
					var shape = groupArr[index],
					zIndex = parseInt(shape.css('z-index'));
					shape.css('z-index', --zIndex);
					index++;
					lastZindex = zIndex + 1;
				}
			}
		} 
	}	
}

function removeAllObjects () {
	for (var i = 0; i < groupArr.length; i++) {
		groupArr[i].parent('.ft-container').remove();
		lastZindex--;
	}
	for (var i = 0; i < groupArr.length; i++)
		groupArr.splice(i, 1);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkZXNrL3NsaWRlci9zaGFwZXMvZ3JvdXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gcmVtb3ZlT2JqZWN0RnJvbUdyb3VwICgpIHtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBncm91cEFyci5sZW5ndGg7IGkrKykge1xyXG5cdFx0aWYgKGdyb3VwQXJyW2ldLmF0dHIoJ2RhdGEtYWN0aXZlJykgPT09ICd0cnVlJykgeyBcclxuXHRcdFx0dmFyIGluZGV4ID0gaTtcclxuXHRcdFx0aWYgKGluZGV4IDwgZ3JvdXBBcnIubGVuZ3RoKSB7XHJcblx0XHRcdFx0Z3JvdXBBcnIuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHRcdHdoaWxlIChpbmRleCA8IGdyb3VwQXJyLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0dmFyIHNoYXBlID0gZ3JvdXBBcnJbaW5kZXhdLFxyXG5cdFx0XHRcdFx0ekluZGV4ID0gcGFyc2VJbnQoc2hhcGUuY3NzKCd6LWluZGV4JykpO1xyXG5cdFx0XHRcdFx0c2hhcGUuY3NzKCd6LWluZGV4JywgLS16SW5kZXgpO1xyXG5cdFx0XHRcdFx0aW5kZXgrKztcclxuXHRcdFx0XHRcdGxhc3RaaW5kZXggPSB6SW5kZXggKyAxO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBcclxuXHR9XHRcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQWxsT2JqZWN0cyAoKSB7XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBncm91cEFyci5sZW5ndGg7IGkrKykge1xyXG5cdFx0Z3JvdXBBcnJbaV0ucGFyZW50KCcuZnQtY29udGFpbmVyJykucmVtb3ZlKCk7XHJcblx0XHRsYXN0WmluZGV4LS07XHJcblx0fVxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZ3JvdXBBcnIubGVuZ3RoOyBpKyspXHJcblx0XHRncm91cEFyci5zcGxpY2UoaSwgMSk7XHJcbn0iXSwiZmlsZSI6ImRlc2svc2xpZGVyL3NoYXBlcy9ncm91cC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

function moveTop () {
	var lastIndex = lastZindex;
	for (var i = 0; i < groupArr.length - 1; i++) {

		var shape = groupArr[i];

		if (shape.attr('data-active') === 'true') {
			console.log('moveTop');
			// change z-indexes of elements
			shape.css('z-index', --lastIndex);
			shape.siblings('.ft-controls').css('z-index', lastIndex);
			for (var ind = i + 1; ind < groupArr.length; ind++) {
				var obj = groupArr[ind];
				decrementZindex(obj);
			}

			groupArr.splice(groupArr.length - 1, 0, groupArr.splice(i, 1)[0]);
			return;
		}
	}
}

function moveForward () {
	for (var i = 0; i < groupArr.length - 1; i++) {
		var shape = groupArr[i];
		if (shape.attr('data-active') === 'true') {

			var from = i,
				to = groupArr.indexOf(shape) + 1;

			// change z-indexes of elements
			incrementZindex(groupArr[from]);
			decrementZindex(groupArr[to]);

			groupArr.splice(to, 0, groupArr.splice(from, 1)[0]);
			console.log(groupArr);
			return;
		}
	}
}

function moveBackword () {
	for (var i = 1; i < groupArr.length; i++) {
		var shape = groupArr[i];
		if (shape.attr('data-active') === 'true') {
			var from = i,
				to = groupArr.indexOf(shape) - 1;
			
			console.log('moveBackword 2');
			// change z-indexes of elements
			incrementZindex(groupArr[to]);
			decrementZindex(groupArr[from]);

			groupArr.splice(to, 0, groupArr.splice(from, 1)[0]);
			return;
		}
	}
}

function moveBottom () {
			console.log('moveBottom');

	for (var i = 1; i < groupArr.length; i++) {
		var shape = groupArr[i];

		if (shape.attr('data-active') === 'true') {
			// change z-indexes of elements
			shape.css('z-index', 100);
			shape.siblings('.ft-controls').css('z-index', 100);
			for (var ind = i - 1; ind >= 0; ind--) {
				var obj = groupArr[ind];
				incrementZindex(obj);
			}

			groupArr.splice(0, 0, groupArr.splice(i, 1)[0]);

			return;
		}
	}
}


function incrementZindex (shape) {
	var zIndex = parseInt(shape.css('z-index'));
	shape.css('z-index', ++zIndex);
	shape.siblings('.ft-controls').css('z-index', zIndex);	
}

function decrementZindex (shape) {
	var zIndex = parseInt(shape.css('z-index'));
	shape.css('z-index', --zIndex);
	shape.siblings('.ft-controls').css('z-index', zIndex);	
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkZXNrL3NsaWRlci9zaGFwZXMvbGF5ZXJzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIG1vdmVUb3AgKCkge1xyXG5cdHZhciBsYXN0SW5kZXggPSBsYXN0WmluZGV4O1xyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZ3JvdXBBcnIubGVuZ3RoIC0gMTsgaSsrKSB7XHJcblxyXG5cdFx0dmFyIHNoYXBlID0gZ3JvdXBBcnJbaV07XHJcblxyXG5cdFx0aWYgKHNoYXBlLmF0dHIoJ2RhdGEtYWN0aXZlJykgPT09ICd0cnVlJykge1xyXG5cdFx0XHRjb25zb2xlLmxvZygnbW92ZVRvcCcpO1xyXG5cdFx0XHQvLyBjaGFuZ2Ugei1pbmRleGVzIG9mIGVsZW1lbnRzXHJcblx0XHRcdHNoYXBlLmNzcygnei1pbmRleCcsIC0tbGFzdEluZGV4KTtcclxuXHRcdFx0c2hhcGUuc2libGluZ3MoJy5mdC1jb250cm9scycpLmNzcygnei1pbmRleCcsIGxhc3RJbmRleCk7XHJcblx0XHRcdGZvciAodmFyIGluZCA9IGkgKyAxOyBpbmQgPCBncm91cEFyci5sZW5ndGg7IGluZCsrKSB7XHJcblx0XHRcdFx0dmFyIG9iaiA9IGdyb3VwQXJyW2luZF07XHJcblx0XHRcdFx0ZGVjcmVtZW50WmluZGV4KG9iaik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGdyb3VwQXJyLnNwbGljZShncm91cEFyci5sZW5ndGggLSAxLCAwLCBncm91cEFyci5zcGxpY2UoaSwgMSlbMF0pO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBtb3ZlRm9yd2FyZCAoKSB7XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBncm91cEFyci5sZW5ndGggLSAxOyBpKyspIHtcclxuXHRcdHZhciBzaGFwZSA9IGdyb3VwQXJyW2ldO1xyXG5cdFx0aWYgKHNoYXBlLmF0dHIoJ2RhdGEtYWN0aXZlJykgPT09ICd0cnVlJykge1xyXG5cclxuXHRcdFx0dmFyIGZyb20gPSBpLFxyXG5cdFx0XHRcdHRvID0gZ3JvdXBBcnIuaW5kZXhPZihzaGFwZSkgKyAxO1xyXG5cclxuXHRcdFx0Ly8gY2hhbmdlIHotaW5kZXhlcyBvZiBlbGVtZW50c1xyXG5cdFx0XHRpbmNyZW1lbnRaaW5kZXgoZ3JvdXBBcnJbZnJvbV0pO1xyXG5cdFx0XHRkZWNyZW1lbnRaaW5kZXgoZ3JvdXBBcnJbdG9dKTtcclxuXHJcblx0XHRcdGdyb3VwQXJyLnNwbGljZSh0bywgMCwgZ3JvdXBBcnIuc3BsaWNlKGZyb20sIDEpWzBdKTtcclxuXHRcdFx0Y29uc29sZS5sb2coZ3JvdXBBcnIpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBtb3ZlQmFja3dvcmQgKCkge1xyXG5cdGZvciAodmFyIGkgPSAxOyBpIDwgZ3JvdXBBcnIubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBzaGFwZSA9IGdyb3VwQXJyW2ldO1xyXG5cdFx0aWYgKHNoYXBlLmF0dHIoJ2RhdGEtYWN0aXZlJykgPT09ICd0cnVlJykge1xyXG5cdFx0XHR2YXIgZnJvbSA9IGksXHJcblx0XHRcdFx0dG8gPSBncm91cEFyci5pbmRleE9mKHNoYXBlKSAtIDE7XHJcblx0XHRcdFxyXG5cdFx0XHRjb25zb2xlLmxvZygnbW92ZUJhY2t3b3JkIDInKTtcclxuXHRcdFx0Ly8gY2hhbmdlIHotaW5kZXhlcyBvZiBlbGVtZW50c1xyXG5cdFx0XHRpbmNyZW1lbnRaaW5kZXgoZ3JvdXBBcnJbdG9dKTtcclxuXHRcdFx0ZGVjcmVtZW50WmluZGV4KGdyb3VwQXJyW2Zyb21dKTtcclxuXHJcblx0XHRcdGdyb3VwQXJyLnNwbGljZSh0bywgMCwgZ3JvdXBBcnIuc3BsaWNlKGZyb20sIDEpWzBdKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbW92ZUJvdHRvbSAoKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdtb3ZlQm90dG9tJyk7XHJcblxyXG5cdGZvciAodmFyIGkgPSAxOyBpIDwgZ3JvdXBBcnIubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBzaGFwZSA9IGdyb3VwQXJyW2ldO1xyXG5cclxuXHRcdGlmIChzaGFwZS5hdHRyKCdkYXRhLWFjdGl2ZScpID09PSAndHJ1ZScpIHtcclxuXHRcdFx0Ly8gY2hhbmdlIHotaW5kZXhlcyBvZiBlbGVtZW50c1xyXG5cdFx0XHRzaGFwZS5jc3MoJ3otaW5kZXgnLCAxMDApO1xyXG5cdFx0XHRzaGFwZS5zaWJsaW5ncygnLmZ0LWNvbnRyb2xzJykuY3NzKCd6LWluZGV4JywgMTAwKTtcclxuXHRcdFx0Zm9yICh2YXIgaW5kID0gaSAtIDE7IGluZCA+PSAwOyBpbmQtLSkge1xyXG5cdFx0XHRcdHZhciBvYmogPSBncm91cEFycltpbmRdO1xyXG5cdFx0XHRcdGluY3JlbWVudFppbmRleChvYmopO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRncm91cEFyci5zcGxpY2UoMCwgMCwgZ3JvdXBBcnIuc3BsaWNlKGksIDEpWzBdKTtcclxuXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpbmNyZW1lbnRaaW5kZXggKHNoYXBlKSB7XHJcblx0dmFyIHpJbmRleCA9IHBhcnNlSW50KHNoYXBlLmNzcygnei1pbmRleCcpKTtcclxuXHRzaGFwZS5jc3MoJ3otaW5kZXgnLCArK3pJbmRleCk7XHJcblx0c2hhcGUuc2libGluZ3MoJy5mdC1jb250cm9scycpLmNzcygnei1pbmRleCcsIHpJbmRleCk7XHRcclxufVxyXG5cclxuZnVuY3Rpb24gZGVjcmVtZW50WmluZGV4IChzaGFwZSkge1xyXG5cdHZhciB6SW5kZXggPSBwYXJzZUludChzaGFwZS5jc3MoJ3otaW5kZXgnKSk7XHJcblx0c2hhcGUuY3NzKCd6LWluZGV4JywgLS16SW5kZXgpO1xyXG5cdHNoYXBlLnNpYmxpbmdzKCcuZnQtY29udHJvbHMnKS5jc3MoJ3otaW5kZXgnLCB6SW5kZXgpO1x0XHJcbn0iXSwiZmlsZSI6ImRlc2svc2xpZGVyL3NoYXBlcy9sYXllcnMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

function addControlPanel (shape, top, left) {

	var zIndex = parseInt(shape.css('z-index')),
		layersTop = top + 30,
		layersLeft = left + 15,
		type =  shape.data('type'),
		color = effects = image = textOpts = '';
	var panelZindex = lastZindex + 5;	
	var heart;	
		
	if (type === 'video' || type === 'audio') {
		color = effects = textOpts = 'disabled' ;
	} else if (type === 'image') {
		color = textOpts = 'disabled';
	}

	if (shape.data('type') === 'text') {
		heart = shape.parent('.working-banner');
		left = left + shape.width() + 10;
		top = top - 5;
	} else {
		heart = shape.parent('.ft-container').parent('.working-banner');
		shapePanel = shape.parent('.ft-container').siblings('.shape-panel');
	}

	heart.append(
		'<div class="shape-panel" style="top:'+top +'px; left:'+left+'px; z-index:' + panelZindex + ';">' +
			'<div class="list-group pnl-li-group">' +
			  	'<a class="list-group-item ' + color +' pnl-color" title="colors" href="#"><button></button></a>' +
			  	'<a class="list-group-item ' + color +' pnl-color pnl-scolor" title="colors" href="#"><button></button></a>' +
		  		'<div>' +
			  		'<a class="list-group-item dropdown-toggle ' + textOpts +' pnl-text-opts" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Text options" href="#"><span class="fa-panel glyphicon glyphicon-text-size"></span></a>' +
				  		'<ul class="dropdown-menu pnl-dropdown text-opts-dropdown" style="left: ' +  47 + 'px; top:' + 20 + 'px; ">' +
		  					'<li>' + 
		  						'<strong>Font family: </strong>' +
		  						'<select id="font-opts-select" style="width:95%; margin-top:2px;">' +
									'<option value="Arial,Helvetica" style="font-family:Arial,Helvetica;">Arial</option>' +
									'<option value="Arial Black,Gadget" style="font-family:Arial Black,Gadget;">Arial Black</option>' +
									'<option value="Batang,Beijing,URW Bookman L" style="font-family:Batang,Beijing,URW Bookman L;">Batang</option>' +
									'<option value="Broadway,Marker Felt,FreeSerif" style="font-family:Broadway,Marker Felt,FreeSerif;">Broadway</option>' +
									'<option value="Castellar,Brush Script,Nimbus Roman No9 L" style="font-family:Castellar,Brush Script,Nimbus Roman No9 L;">Castellar</option>' +
									'<option value="Comic Sans MS" style="font-family:Comic Sans MS;">Comic Sans MS</option>' +
									'<option value="Courier New" style="font-family:Courier New;">Courier New</option>' +
									'<option value="Edwardian Script ITC, Zapf Dingbats" style="font-family:Edwardian Script ITC, Zapf Dingbats;">Edwardian</option>' +
									'<option value="Elephant, Hiragino Kaku Gothic Std" style="font-family:Elephant, Hiragino Kaku Gothic Std;">Elephant</option>' +
									'<option value="Forte,Textile" style="font-family:Forte,Textile;">Forte</option>' +
									'<option value="Freestyle Script,Zapf Chancery" style="font-family:Freestyle Script,Zapf Chancery;">Freestyle Script</option>' +
									'<option value="Georgia" style="font-family:Georgia;">Georgia</option>' +
									'<option value="Hobo Std, Sand" style="font-family:Hobo Std, Sand;">Hobo Std</option>' +
									'<option value="Impact,Charcoal" style="font-family:Impact,Charcoal;">Impact</option>' +
									'<option value="Lucida Console,Monaco" style="font-family:Lucida Console,Monaco;">Lucida Console</option>' +
									'<option value="Lucida Sans Unicode,Lucida Grande" style="font-family:Lucida Sans Unicode,Lucida Grande;">Lucida Sans Unicode</option>' +
									'<option value="Lucida Calligraphy,Pilgiche" style="font-family:Lucida Calligraphy,Pilgiche;">Lucida Calligraphy</option>' +
									'<option value="Palatino Linotype,Book Antiqua,Palatino" style="font-family:Palatino Linotype,Book Antiqua,Palatino;">Palatino Linotype</option>' +
									'<option value="Palace Script MT, Papyrus" style="font-family:Palace Script MT, Papyrus;">Palace Script MT</option>' +
									'<option value="Symbol" style="font-family:Symbol;">Symbol</option>' +
									'<option value="Tahoma,Geneva" style="font-family:Tahoma,Geneva;">Tahoma</option>' +
									'<option value="Times New Roman, Times" style="font-family:Times New Roman, Times;">Times New Roman</option>' +
									'<option value="Trebuchet MS" style="font-family:Trebuchet MS;">Trebuchet MS</option>' +
									'<option value="Verdana" style="font-family:Verdana;">Verdana</option>' +
									'<option value="Viner Hand ITC" style="font-family:Viner Hand ITC;">Viner Hand ITC</option>' +
								'</select>'+
								'<hr>' +
		  					'</li>' +
		  					'<li>' + 
		  						'<strong>Font size: </strong>' +
		  						'<select id="text-opts-select">' +
									'<option value="2">2</option>' +
									'<option value="4">4</option>' +
									'<option value="6">6</option>' +
									'<option value="8">8</option>' +
									'<option value="10">10</option>' +
									'<option value="12">12</option>' +
									'<option value="14">14</option>' +
									'<option value="16">16</option>' +
									'<option value="18">18</option>' +
									'<option value="20">20</option>' +
									'<option value="22">22</option>' +
									'<option value="24">24</option>' +
									'<option value="26">26</option>' +
									'<option value="28">28</option>' +
									'<option value="30">30</option>' +
									'<option value="32">32</option>' +
									'<option value="34">34</option>' +
									'<option value="36">36</option>' +
									'<option value="38">38</option>' +
									'<option value="40">40</option>' +
									'<option value="42">42</option>' +
									'<option value="44">44</option>' +
									'<option value="46">46</option>' +
									'<option value="48">48</option>' +
									'<option value="50">50</option>' +
									'<option value="52">52</option>' +
									'<option value="54">54</option>' +
									'<option value="56">56</option>' +
									'<option value="58">58</option>' +
									'<option value="60">60</option>' +
									'<option value="62">62</option>' +
									'<option value="64">64</option>' +
									'<option value="66">66</option>' +
									'<option value="68">68</option>' +
									'<option value="70">70</option>' +
									'<option value="72">72</option>' +
								'</select>'+
								'<hr>' +
		  					'</li>' +
		  					'<li>' +
		  						'<strong>Text align: </strong>' +
		  						'<select id="text-align-select">' +
									'<option value="start">start</option>' +
									'<option value="left">left</option>' +
									'<option value="center">center</option>' +
									'<option value="right">right</option>' +
		  						'</select>'+
		  						'<hr>' +
		  					'</li>' +
				  			'<li>' +
				  				'<strong>Bold :</strong>' +
				  				'<i id="drkshadow" class="fa fa-text-toggle fa-bold fa-toggle-off fa-lg"></i><br>' +
								'<hr>' +
				  			'</li>' +
				  			'<li>' +
				  				'<strong>Underline :</strong>' +
				  				'<i id="drkshadow" class="fa fa-text-toggle fa-underline fa-toggle-off fa-lg"></i><br>' +
				  				'<hr>' +
				  			'</li>' +
				  			'<li>' +
				  				'<strong>Italic :</strong>' +
				  				'<i id="drkshadow" class="fa fa-text-toggle fa-italic fa-toggle-off fa-lg"></i><br>' +
				  				'<hr>' +
				  			'</li>' +
				  			'<li>' +
		  						'<strong>Text transform: </strong>' +
		  						'<select id="text-trans-select" style="width:95%; margin-top:2px;">' +
									'<option value="none">none</option>' +
									'<option value="uppercase">UPPERCASE</option>' +
									'<option value="lowercase">lowercase</option>' +
									'<option value="capitalize">Capitalize</option>' +
		  						'</select>'+
		  						'<hr>'+
		  					'</li>' +
		  					'<li>' +
				  				'<strong>Border stroke :</strong>' +
				  				'<i id="drkshadow" class="fa fa-text-toggle fa-brd-stroke fa-toggle-off fa-lg"></i><br>' +
				  				'<hr>' +
				  			'</li>' +
		  				'</ul>' +
	  			'</div>' +	
			  	'<a class="list-group-item dropdown-toggle pnl-effects ' + effects +'" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="effects" href="#"><i class="fa-panel fa fa-plus-square fw"></i></a>' +
				  	'<ul class="dropdown-menu pnl-dropdown effects-dropdown" style="left: ' +  47 + 'px; top:' + 40 + 'px; ">' +
	  					'<li>Opacity' +
	  						'<div class="opacity-slider"></div>' +
	  						'<hr>' +
	  					'</li>' +
			  			'<li><span style="margin-left:-20px;">Shadow: </span>' +
			  				'<i id="drkshadow" class="fa fa-shadow fa-toggle-off fa-lg"></i><br>' +
			  				'<div class="shadow-draggable">' +
			  					'<div class="shadow-draggable-board">' +
			  						'<div class="shadow-draggable-circle"></div>'+
			  					'</div>' +
			  				'</div>' +
			  				'<div class="shadow-color">' +
			  					'<label>color:</label>' +
			  					'<div class="shadow-colorpick"></div>' +
			  				'</div>' +
			  			'</li>' +
	  				'</ul>' +
			  	'<a class="list-group-item pnl-clone" title="clone" href="#"><i class="fa-panel fa fa-files-o fw"></i></a>' +
		  		'<div>' +
			  		'<a class="list-group-item dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="layers" href="#"><i class="fa-panel fa fa-database fw"></i></a>' +
			  			'<ul class="dropdown-menu pnl-dropdown layers-dropdown" style="left: ' +  47 + 'px; top:' + 102 + 'px; ">' +
		  					'<li data-opt="top">Top <hr></li>' +
				  			'<li data-opt="for">Forward <hr></li>' +
				  			'<li data-opt="back">Backword <hr></li>' +
				  			'<li data-opt="bot">Bottom</li>' +
		  				'</ul>' +
		  		'</div>' +		
			  '<a class="list-group-item pnl-delete" title="delete" href="#"><i class="fa-panel fa fa-trash"></i></a>' +
			'</div>' +
		'</div>');
	reBindListeners();	
}

function reBindListeners () {
	var heart = $('.working-banner');
	var ft = $('.working-banner').children('.ft-container').find('[data-active=true]');
	var panel = heart.children('.shape-panel');

	var col = panel.find('.pnl-color:not(.pnl-scolor)'),
		scol = panel.find('.pnl-scolor'),
		del = panel.find('.pnl-delete'),
		layers = panel.find('.layers-dropdown'),
		clone = panel.find('.pnl-clone'),
		effectsDropdown = panel.find('.pnl-dropdown');
	

	bindColorPicker(col);
	bindShapeColorPicker(scol);
	bindDelete(del);
	bindLayers(layers);
	bindClone(clone);
	bindSlider(effectsDropdown);
	bindPropagation(panel);	
	bindTextOptions(panel);
}

function activateControlPanel (shape, top, left) {
	var zIndex = parseInt(shape.css('z-index')),
		type =  shape.data('type'),
		color = effects = image = '',
		panelZindex = lastZindex + 5;	

	if (type === 'text') {
		left = shape.width() + left + 10;
		top = top - 5;
		shapePanel = shape.siblings('.shape-panel');
	} else {
		shapePanel = shape.parent('.ft-container').siblings('.shape-panel');
	}

	shapePanel.show();

	var color1 = shapePanel.find('.pnl-color:not(.pnl-scolor)');
	var color2 = shapePanel.find('.pnl-scolor');
	var pnlTxtOpts = shapePanel.find('.pnl-text-opts');

	if (type === 'video' || type === 'audio') {
		color = effects = 'disabled' ;
		color1.hide();
		color2.hide();
		pnlTxtOpts.hide();

	} else if (type === 'image') {
		color = 'disabled';
		color1.hide();
		color2.hide();
		pnlTxtOpts.hide();

		shapePanel.find('.pnl-color').addClass(color);
		shapePanel.find('.pnl-effects').removeClass(color);
	} else if (type === 'shape') {
		color1.show();
		color2.show();
		pnlTxtOpts.hide();

		color1.find('button').css('background-color', shape.data('fill') || '#000000');
		color2.find('button').css('background-color', shape.data('stroke') || '#000000');

		shapePanel.find('.pnl-color').removeClass('disabled');
		shapePanel.find('.pnl-effects').removeClass('disabled');
	} else {
		color1.show();
		color2.hide();
		pnlTxtOpts.show();

		color1.find('button').css('background-color', shape.css('color'));
		
		shapePanel.find('.pnl-color').removeClass('disabled');
		shapePanel.find('.pnl-effects').removeClass('disabled');
	}


	shapePanel.css({
		'top': top,
		'left': left,
		'z-index' : panelZindex
	});

	reBindListeners();	
} 

function bindPropagation (element) {
	element.find('.dropdown-menu').on('click', function (e) {
		e.stopPropagation();
	});

	$('.colpick').on('click', function (e) {
		e.stopPropagation();
	})
}

function bindTextOptions (element) {
	var textOpts = element.find('.pnl-text-opts');
	var active = getActiveObject();
	var type = active.data('type');  
	if (type === 'text' && textOpts.hasClass('disabled')) {
		textOpts.removeClass('disabled');
	} else if (type !== 'text' && !textOpts.hasClass('disabled')) {
		textOpts.addClass('disabled');
	}

	if (type === 'text') {
		// change font size
		var size = parseInt(active.css('font-size').trim());
		var fonts = active.css('font-family').trim();
		var align = active.css('text-align').trim();
		var transform = active.css('text-transform').trim();

		$("#text-opts-select option").filter(function() {
		    return $(this).text() == size; 
		}).prop('selected', true);

		$("#font-opts-select option").filter(function() {
		    return $(this).text() == fonts; 
		}).prop('selected', true);

		$("#text-align-select option").filter(function() {
		    return $(this).text() == transform; 
		}).prop('selected', true);

		$("#text-trans-select option").filter(function() {
		    return $(this).text() == align; 
		}).prop('selected', true);

		$('body').on('change', '#text-opts-select', function () {
			var active = getActiveObject();
			var value = parseInt($(this).val().trim());
			active.css('font-size', value);
		});

		$('body').on('change', '#font-opts-select', function () {
			var active = getActiveObject();
			var value = $(this).val().trim();
			active.css('font-family', value);
		});

		$('body').on('change', '#text-align-select', function () {
			var active = getActiveObject();
			var value = $(this).val().trim();
			active.css('text-align', value);
		});

		$('body').on('change', '#text-trans-select', function () {
			var active = getActiveObject();
			var value = $(this).val().trim();
			active.css('text-transform', value);
		});

		// toggle bold
		var fontWeight = active.css('font-weight').trim();
		var boldToggle = element.find('.fa-bold');
		if (fontWeight === '400' && boldToggle.hasClass('fa-toggle-on')) {
			boldToggle.removeClass('fa-toggle-on')
				.addClass('fa-toggle-off');
		} else if (fontWeight === 'bold' && boldToggle.hasClass('fa-toggle-off')) {
			boldToggle.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on');
		}

		boldToggle.unbind().on('click', function (e) {
			var active = getActiveObject();
			if (boldToggle.hasClass('fa-toggle-on')) {
				boldToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');
				active.css('font-weight', 400);	
			} else if (boldToggle.hasClass('fa-toggle-off')) {
				boldToggle.removeClass('fa-toggle-off')
					.addClass('fa-toggle-on');
				active.css('font-weight', 'bold');	
			}
		});

		// toggle underline
		var decoration = active.css('text-decoration').trim();
		var decorationToggle = element.find('.fa-underline');
		if (decoration !== 'underline' && decorationToggle.hasClass('fa-toggle-on')) {
			decorationToggle.removeClass('fa-toggle-on')
				.addClass('fa-toggle-off');
		} else if (decoration === 'underline' && decorationToggle.hasClass('fa-toggle-off')) {
			decorationToggle.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on');
		}

		decorationToggle.unbind().on('click', function (e) {
			var active = getActiveObject();
			if (decorationToggle.hasClass('fa-toggle-on')) {
				decorationToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');
				active.css('text-decoration', 'none');	
			} else if (decorationToggle.hasClass('fa-toggle-off')) {
				decorationToggle.removeClass('fa-toggle-off')
					.addClass('fa-toggle-on');
				active.css('text-decoration', 'underline');	
			}
		});

		// toggle italic
		var fontStyle = active.css('font-style').trim();
		var italicToggle = element.find('.fa-italic');

		if (fontStyle !== 'italic' && italicToggle.hasClass('fa-toggle-on')) {
			italicToggle.removeClass('fa-toggle-on')
				.addClass('fa-toggle-off');
		} else if (fontStyle === 'italic' && italicToggle.hasClass('fa-toggle-off')) {
			decorationToggle.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on');
			active.css('font-style', 'normal');	
		}

		italicToggle.unbind().on('click', function (e) {
			var active = getActiveObject();
			if (italicToggle.hasClass('fa-toggle-on')) {
				italicToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');
				active.css('font-style', 'normal');	
			} else if (italicToggle.hasClass('fa-toggle-off')) {
				italicToggle.removeClass('fa-toggle-off')
					.addClass('fa-toggle-on');
					active.css('font-style', 'italic');	
			}
		});

		// toggle uppercase
		var textTransform = active.css('text-transform'),
			uppercaseToggle = element.find('.fa-uppercase'),
			lowercaseToggle = element.find('.fa-lowercase'),
			capitalizeToggle = element.find('.fa-capitalize');

		if (textTransform !== 'uppercase' && uppercaseToggle.hasClass('fa-toggle-on')) {
			uppercaseToggle.removeClass('fa-toggle-on')
				.addClass('fa-toggle-off');
		} else if (textTransform === 'uppercase'  && uppercaseToggle.hasClass('fa-toggle-off')) {
			uppercaseToggle.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on');
			active.css('text-transform', 'none');	
		} else if (textTransform !== 'lowercase' && lowercaseToggle.hasClass('fa-toggle-on')) {
			lowercaseToggle.removeClass('fa-toggle-on')
				.addClass('fa-toggle-off');
		} else if (textTransform === 'lowercase' && lowercaseToggle.hasClass('fa-toggle-off')) {
			lowercaseToggle.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on');
			active.css('text-transform', 'none');
		} else if (textTransform !== 'capitalize' && capitalizeToggle.hasClass('fa-toggle-off')) {
			capitalizeToggle.removeClass('fa-toggle-on')
				.addClass('fa-toggle-off');
		} else if (textTransform === 'capitalize' && capitalizeToggle.hasClass('fa-toggle-off')) {
			lowercaseToggle.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on');
			active.css('text-transform', 'none');
		}

		// toggle uppercase
		uppercaseToggle.unbind().on('click', function (e) {
			var active = getActiveObject();
			if (uppercaseToggle.hasClass('fa-toggle-on')) {
				uppercaseToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');
				active.css('text-transform', 'none');	
			} else if (uppercaseToggle.hasClass('fa-toggle-off')) {
				uppercaseToggle.removeClass('fa-toggle-off')
					.addClass('fa-toggle-on');
					active.css('text-transform', 'uppercase');	
				lowercaseToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');	
				capitalizeToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');		
			}
		});

		// toggle lowercase
		lowercaseToggle.unbind().on('click', function (e) {
			var active = getActiveObject();
			if (lowercaseToggle.hasClass('fa-toggle-on')) {
				lowercaseToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');
				
				active.css('text-transform', 'none');	
			} else if (lowercaseToggle.hasClass('fa-toggle-off')) {
				lowercaseToggle.removeClass('fa-toggle-off')
					.addClass('fa-toggle-on');
				uppercaseToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');
				capitalizeToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');	
				
				active.css('text-transform', 'lowercase');	
			}
		});

		capitalizeToggle.unbind().on('click', function (e) {
			var active = getActiveObject();
			if (capitalizeToggle.hasClass('fa-toggle-on')) {
				capitalizeToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');
				active.css('text-transform', 'none');	
			} else if (capitalizeToggle.hasClass('fa-toggle-off')) {
				capitalizeToggle.removeClass('fa-toggle-off')
					.addClass('fa-toggle-on');
				uppercaseToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');
				lowercaseToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');	

				active.css('text-transform', 'capitalize');	
			}
		});

		// border stroke
		var border = active.css('border').trim(),
			strokeWidth = parseInt(border.split(' ')[0]),
			borderToggle = element.find('.fa-brd-stroke'),
			color = active.css('color');

		if (strokeWidth === 0 && borderToggle.hasClass('fa-toggle-on')) {
			borderToggle.removeClass('fa-toggle-on')
				.addClass('fa-toggle-off');
		} else if (strokeWidth > 0 && borderToggle.hasClass('fa-toggle-off')) {
			borderToggle.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on');
			active.css({ 'border-top': '2px solid ' + color,
						 'border-bottom': '2px solid ' + color
						});
		}


		borderToggle.unbind().on('click', function (e) {
			var active = getActiveObject();
			if (borderToggle.hasClass('fa-toggle-on')) {
				borderToggle.removeClass('fa-toggle-on')
					.addClass('fa-toggle-off');
				active.css('border', '0px none rgba(0, 0, 0, 0)');	
			} else if (borderToggle.hasClass('fa-toggle-off')) {
				borderToggle.removeClass('fa-toggle-off')
					.addClass('fa-toggle-on');
				var stroke = '2px solid ' + color;	
				active.css({ 'border-top': stroke,
						 'border-bottom': stroke
						});
			}
		});
	}

}

function bindSlider (element) {
	var active = getActiveObject();

	var shadow = {
		
		setShadow: function (left, top, blur) {

			var active = getActiveObject();

			if (active.data('type') === 'text') {
				if (active.css('text-shadow') !== 'none') {
					var full = active.css('text-shadow'),
						nColor = " " + full.substring(0, full.indexOf(')') + 1),
						positions = full.substring(full.indexOf(')') + 1).split(' '),
						nLeft = positions[1],
						nTop = " " + positions[2],
						blurSize = " " + positions[3];
					
					shadow.blur = blur ? blur : nColor;
					shadow.left = left ? left : nLeft;
					shadow.top = top ? top: nTop;
					shadow.blurSize = blurSize;
					shadow.color = shadow.left + shadow.top + shadow.blurSize + shadow.blur;
					active.css('text-shadow', shadow.color);

				} else {
					active.css('text-shadow', '0px 0px 5px #000000');
				}
		
			} else if (active.data('type') !== 'text') {
				if (active.css('box-shadow') !== 'none') {

					var full = active.css('box-shadow'),
						nColor = " " + full.substring(0, full.indexOf(')') + 1),
						positions = full.substring(full.indexOf(')') + 1).split(' '),
						nLeft = positions[1],
						nTop = " " + positions[2],
						blurSize = " " + positions[3];
					
					shadow.blur = blur ? blur : nColor;
					shadow.left = left ? left : nLeft;
					shadow.top = top ? top: nTop;
					shadow.blurSize = blurSize;
					shadow.color = shadow.left + shadow.top + shadow.blurSize + shadow.blur;
					active.css('box-shadow', shadow.color);

				} else {
					active.css('box-shadow', '0px 0px 5px #000000');	
				}
			} 
		}
	}

	shadowEnabled = false;
	
	var opValue = 100 - Math.floor(parseFloat(active.css('opacity')) * 100);

	var fa = element.find('.fa-shadow');
	if (active.data('type') === 'text' && active.css('text-shadow') !== 'none') {
		if (fa.hasClass('fa-toggle-off')) {
			fa.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on');
		}
	} else if (active.data('type') !== 'text' && active.css('box-shadow') !== 'none') {
		if (fa.hasClass('fa-toggle-off')) {
			fa.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on');
		}
	} else {
		if (fa.hasClass('fa-toggle-on')) {
			fa.removeClass('fa-toggle-on')
				.addClass('fa-toggle-off');
		}
	}

	//opacity slider 
	element.find('.opacity-slider').slider({
		value: opValue,
		slide: function (event, ui) {
			active.css('opacity', 1 - ui.value / 100);
		},
		stop: function (event, ui) {
			active.css('opacity', 1 - ui.value / 100);
		}
	});

	element.find('.fa-shadow').unbind().on('click', function (e) {
		e.preventDefault();

		var fa = $(this);

		hasShadowToggle(fa);
	});

	function hasShadowToggle (fa) {
		if (fa.hasClass('fa-toggle-off')) {
			fa.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on');
			shadowEnabled = true;
			addShadow();
			return;
		} 

		if (fa.hasClass('fa-toggle-on')) {
			fa.removeClass('fa-toggle-on')
				.addClass('fa-toggle-off');
			shadowEnabled = false;
			removeShadow();
			return;
		}
	}

	function addShadow () {
		var active = getActiveObject();	
		if (active.data('type') === 'text' && shadowEnabled) {

			var	blur = ' #000',
				top = ' 0px',
				left = '0px';
			shadow.setShadow(left, top, blur);

		} else if (shadowEnabled){

			var	blur = ' #000',
				top = ' 0px',
				left = '0px';
			shadow.setShadow(left, top, blur);
		}
	}

	function removeShadow() {

		var active = getActiveObject();	
		if (active.data('type') === 'text' && !shadowEnabled) {
			active.css('text-shadow', 'none');
		} else if (!shadowEnabled){
			active.css('box-shadow', 'none');
		}
	}

	var colpicker = element.find('.shadow-colorpick');
	colpicker.colpick({
		layout : 'rgb',
		submit : false,
		value : '#000',
		onChange : function (hsb,rgb) {
			var bgColor = '#'+rgb;
			var blur = ' ' + bgColor;
			colpicker.css('background-color', bgColor);
			shadow.setShadow(null, null, blur);

			if (element.find('.fa-shadow').hasClass('fa-toggle-off')) {
				fa.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on'); 
			}
		},
		onSubmit : function(hsb,hex,rgb,el) {
			colpicker.colpickHide();
		}
	});

	element.find('.shadow-draggable-circle').draggable({
		containment: 'parent',
		drag: function (event, ui) {
			var left = ui.position.left - 13 + 'px',
			top = ui.position.top - 13 + 'px';

			top = " " + top;
			shadow.setShadow(left, top, null);
			if (element.find('.fa-shadow').hasClass('fa-toggle-off')) {
				fa.removeClass('fa-toggle-off')
				.addClass('fa-toggle-on'); 
			}
		}
	});
}

function bindColorPicker (element) {
	element.colpick({
		layout : 'rgb',
		submit : false,
		onChange : function (hsb,rgb) {
			var bgColor = '#'+rgb,
				activeObject = getActiveObject(),
				type = activeObject.data('type');

			$('.pnl-color:not(.pnl-scolor)').find('button').css('background-color', bgColor);

			if(type !== 'shape') {
				activeObject.css('color', bgColor);
				if (type === 'text') {
					var border = activeObject.css('border').trim(),
						strokeWidth = parseInt(border.split(' ')[0]);
					if (strokeWidth > 0) {
						activeObject.css('border', '2px solid ' + bgColor);	
					}	
				}
			} else {
				activeObject.data('fill', bgColor);

				activeObject.find('svg').find('path').css('fill', bgColor);
				activeObject.find('svg').find('polygon').css('fill', bgColor);
				activeObject.find('svg').find('rect').css('fill', bgColor);
				activeObject.find('svg').find('circle').css('fill', bgColor);
				activeObject.find('svg').find('polyline').css('fill', bgColor);
				activeObject.find('svg').find('line').css('fill', bgColor);
			}
		},
		onSubmit : function(hsb,hex,rgb,el) {
			element.colpickHide();
		}
	});
}

function bindShapeColorPicker (element) {
	element.colpick({
		layout : 'rgb',
		submit : false,
		onChange : function (hsb,rgb) {
			var bgColor = '#'+rgb,
				activeObject = getActiveObject(),
				type = activeObject.data('type');

			$('.pnl-scolor').find('button').css('background-color', bgColor);

			if(type === 'shape') {
				activeObject.data('stroke', bgColor);

				activeObject.find('svg').find('path').css('stroke', bgColor);
				activeObject.find('svg').find('polygon').css('stroke', bgColor);
				activeObject.find('svg').find('rect').css('stroke', bgColor);
				activeObject.find('svg').find('circle').css('stroke', bgColor);
				activeObject.find('svg').find('polyline').css('stroke', bgColor);
				activeObject.find('svg').find('line').css('stroke', bgColor);
			}
		},
		onSubmit : function(hsb,hex,rgb,el) {
			element.colpickHide();
		}
	});
}

function bindDelete (element) {
	element.unbind().on('click', function (e) {
		var container = $('.ft-container[data-active=true]');
		container.siblings('.shape-panel').hide();
		removeObjectFromGroup();
		container.remove();
		updateObjectStates(getBannerData());
	});
}

function bindLayers (element) {
	element.unbind().on('click', 'li', function (e) {
		var option = $(this).data('opt');
		switch (option) {
			case 'top': 
				moveTop();
				break;
			case 'for': 
				moveForward();
				break;
			case 'back': 
				moveBackword();
				break;
			case 'bot': 
				moveBottom();
				break;			
		}
	});
}

function bindClone (element) {

	element.unbind().on('click', function(e) {
		var obj = getActiveObject();
		var type = obj.data('type');
		if (type !== 'text') {
			var freetrans = obj.freetrans('getOptions');
		}

		switch (type) {
			case 'image':
				addImage(workingBanner, obj.attr('src'), obj.width(), obj.height(), obj.attr('style'), freetrans, null, true);
				break;
			case 'text':
				var text = obj.text();
				addText(workingBanner, text, obj.css('font-family'), obj.attr('rows'), text.length, obj.attr('style'), null, true);
				break;
			case 'shape':
				addShape(workingBanner, obj.data('src'), obj.width(), obj.height(), obj.data('fill'), obj.attr('style'), freetrans, null, true);
				break;
			case 'video':
				addVideo(workingBanner, obj.data('video-src'), obj.width(), obj.height(), obj.data('video-type'), obj.attr('style'), freetrans, null, true);
				break;
			case 'audio':
				addAudio(workingBanner, obj.data('audio-src'), obj.width(), obj.height(), obj.attr('style'), freetrans, null, true);
				break;
		}
	});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkZXNrL3NsaWRlci9zaGFwZXMvc2hhcGVQYW5lbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBhZGRDb250cm9sUGFuZWwgKHNoYXBlLCB0b3AsIGxlZnQpIHtcclxuXHJcblx0dmFyIHpJbmRleCA9IHBhcnNlSW50KHNoYXBlLmNzcygnei1pbmRleCcpKSxcclxuXHRcdGxheWVyc1RvcCA9IHRvcCArIDMwLFxyXG5cdFx0bGF5ZXJzTGVmdCA9IGxlZnQgKyAxNSxcclxuXHRcdHR5cGUgPSAgc2hhcGUuZGF0YSgndHlwZScpLFxyXG5cdFx0Y29sb3IgPSBlZmZlY3RzID0gaW1hZ2UgPSB0ZXh0T3B0cyA9ICcnO1xyXG5cdHZhciBwYW5lbFppbmRleCA9IGxhc3RaaW5kZXggKyA1O1x0XHJcblx0dmFyIGhlYXJ0O1x0XHJcblx0XHRcclxuXHRpZiAodHlwZSA9PT0gJ3ZpZGVvJyB8fCB0eXBlID09PSAnYXVkaW8nKSB7XHJcblx0XHRjb2xvciA9IGVmZmVjdHMgPSB0ZXh0T3B0cyA9ICdkaXNhYmxlZCcgO1xyXG5cdH0gZWxzZSBpZiAodHlwZSA9PT0gJ2ltYWdlJykge1xyXG5cdFx0Y29sb3IgPSB0ZXh0T3B0cyA9ICdkaXNhYmxlZCc7XHJcblx0fVxyXG5cclxuXHRpZiAoc2hhcGUuZGF0YSgndHlwZScpID09PSAndGV4dCcpIHtcclxuXHRcdGhlYXJ0ID0gc2hhcGUucGFyZW50KCcud29ya2luZy1iYW5uZXInKTtcclxuXHRcdGxlZnQgPSBsZWZ0ICsgc2hhcGUud2lkdGgoKSArIDEwO1xyXG5cdFx0dG9wID0gdG9wIC0gNTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0aGVhcnQgPSBzaGFwZS5wYXJlbnQoJy5mdC1jb250YWluZXInKS5wYXJlbnQoJy53b3JraW5nLWJhbm5lcicpO1xyXG5cdFx0c2hhcGVQYW5lbCA9IHNoYXBlLnBhcmVudCgnLmZ0LWNvbnRhaW5lcicpLnNpYmxpbmdzKCcuc2hhcGUtcGFuZWwnKTtcclxuXHR9XHJcblxyXG5cdGhlYXJ0LmFwcGVuZChcclxuXHRcdCc8ZGl2IGNsYXNzPVwic2hhcGUtcGFuZWxcIiBzdHlsZT1cInRvcDonK3RvcCArJ3B4OyBsZWZ0OicrbGVmdCsncHg7IHotaW5kZXg6JyArIHBhbmVsWmluZGV4ICsgJztcIj4nICtcclxuXHRcdFx0JzxkaXYgY2xhc3M9XCJsaXN0LWdyb3VwIHBubC1saS1ncm91cFwiPicgK1xyXG5cdFx0XHQgIFx0JzxhIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtICcgKyBjb2xvciArJyBwbmwtY29sb3JcIiB0aXRsZT1cImNvbG9yc1wiIGhyZWY9XCIjXCI+PGJ1dHRvbj48L2J1dHRvbj48L2E+JyArXHJcblx0XHRcdCAgXHQnPGEgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gJyArIGNvbG9yICsnIHBubC1jb2xvciBwbmwtc2NvbG9yXCIgdGl0bGU9XCJjb2xvcnNcIiBocmVmPVwiI1wiPjxidXR0b24+PC9idXR0b24+PC9hPicgK1xyXG5cdFx0ICBcdFx0JzxkaXY+JyArXHJcblx0XHRcdCAgXHRcdCc8YSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbSBkcm9wZG93bi10b2dnbGUgJyArIHRleHRPcHRzICsnIHBubC10ZXh0LW9wdHNcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiB0aXRsZT1cIlRleHQgb3B0aW9uc1wiIGhyZWY9XCIjXCI+PHNwYW4gY2xhc3M9XCJmYS1wYW5lbCBnbHlwaGljb24gZ2x5cGhpY29uLXRleHQtc2l6ZVwiPjwvc3Bhbj48L2E+JyArXHJcblx0XHRcdFx0ICBcdFx0Jzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnUgcG5sLWRyb3Bkb3duIHRleHQtb3B0cy1kcm9wZG93blwiIHN0eWxlPVwibGVmdDogJyArICA0NyArICdweDsgdG9wOicgKyAyMCArICdweDsgXCI+JyArXHJcblx0XHQgIFx0XHRcdFx0XHQnPGxpPicgKyBcclxuXHRcdCAgXHRcdFx0XHRcdFx0JzxzdHJvbmc+Rm9udCBmYW1pbHk6IDwvc3Ryb25nPicgK1xyXG5cdFx0ICBcdFx0XHRcdFx0XHQnPHNlbGVjdCBpZD1cImZvbnQtb3B0cy1zZWxlY3RcIiBzdHlsZT1cIndpZHRoOjk1JTsgbWFyZ2luLXRvcDoycHg7XCI+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiQXJpYWwsSGVsdmV0aWNhXCIgc3R5bGU9XCJmb250LWZhbWlseTpBcmlhbCxIZWx2ZXRpY2E7XCI+QXJpYWw8L29wdGlvbj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCJBcmlhbCBCbGFjayxHYWRnZXRcIiBzdHlsZT1cImZvbnQtZmFtaWx5OkFyaWFsIEJsYWNrLEdhZGdldDtcIj5BcmlhbCBCbGFjazwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIkJhdGFuZyxCZWlqaW5nLFVSVyBCb29rbWFuIExcIiBzdHlsZT1cImZvbnQtZmFtaWx5OkJhdGFuZyxCZWlqaW5nLFVSVyBCb29rbWFuIEw7XCI+QmF0YW5nPC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiQnJvYWR3YXksTWFya2VyIEZlbHQsRnJlZVNlcmlmXCIgc3R5bGU9XCJmb250LWZhbWlseTpCcm9hZHdheSxNYXJrZXIgRmVsdCxGcmVlU2VyaWY7XCI+QnJvYWR3YXk8L29wdGlvbj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCJDYXN0ZWxsYXIsQnJ1c2ggU2NyaXB0LE5pbWJ1cyBSb21hbiBObzkgTFwiIHN0eWxlPVwiZm9udC1mYW1pbHk6Q2FzdGVsbGFyLEJydXNoIFNjcmlwdCxOaW1idXMgUm9tYW4gTm85IEw7XCI+Q2FzdGVsbGFyPC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiQ29taWMgU2FucyBNU1wiIHN0eWxlPVwiZm9udC1mYW1pbHk6Q29taWMgU2FucyBNUztcIj5Db21pYyBTYW5zIE1TPC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiQ291cmllciBOZXdcIiBzdHlsZT1cImZvbnQtZmFtaWx5OkNvdXJpZXIgTmV3O1wiPkNvdXJpZXIgTmV3PC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiRWR3YXJkaWFuIFNjcmlwdCBJVEMsIFphcGYgRGluZ2JhdHNcIiBzdHlsZT1cImZvbnQtZmFtaWx5OkVkd2FyZGlhbiBTY3JpcHQgSVRDLCBaYXBmIERpbmdiYXRzO1wiPkVkd2FyZGlhbjwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIkVsZXBoYW50LCBIaXJhZ2lubyBLYWt1IEdvdGhpYyBTdGRcIiBzdHlsZT1cImZvbnQtZmFtaWx5OkVsZXBoYW50LCBIaXJhZ2lubyBLYWt1IEdvdGhpYyBTdGQ7XCI+RWxlcGhhbnQ8L29wdGlvbj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCJGb3J0ZSxUZXh0aWxlXCIgc3R5bGU9XCJmb250LWZhbWlseTpGb3J0ZSxUZXh0aWxlO1wiPkZvcnRlPC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiRnJlZXN0eWxlIFNjcmlwdCxaYXBmIENoYW5jZXJ5XCIgc3R5bGU9XCJmb250LWZhbWlseTpGcmVlc3R5bGUgU2NyaXB0LFphcGYgQ2hhbmNlcnk7XCI+RnJlZXN0eWxlIFNjcmlwdDwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIkdlb3JnaWFcIiBzdHlsZT1cImZvbnQtZmFtaWx5Okdlb3JnaWE7XCI+R2VvcmdpYTwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIkhvYm8gU3RkLCBTYW5kXCIgc3R5bGU9XCJmb250LWZhbWlseTpIb2JvIFN0ZCwgU2FuZDtcIj5Ib2JvIFN0ZDwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIkltcGFjdCxDaGFyY29hbFwiIHN0eWxlPVwiZm9udC1mYW1pbHk6SW1wYWN0LENoYXJjb2FsO1wiPkltcGFjdDwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIkx1Y2lkYSBDb25zb2xlLE1vbmFjb1wiIHN0eWxlPVwiZm9udC1mYW1pbHk6THVjaWRhIENvbnNvbGUsTW9uYWNvO1wiPkx1Y2lkYSBDb25zb2xlPC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiTHVjaWRhIFNhbnMgVW5pY29kZSxMdWNpZGEgR3JhbmRlXCIgc3R5bGU9XCJmb250LWZhbWlseTpMdWNpZGEgU2FucyBVbmljb2RlLEx1Y2lkYSBHcmFuZGU7XCI+THVjaWRhIFNhbnMgVW5pY29kZTwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIkx1Y2lkYSBDYWxsaWdyYXBoeSxQaWxnaWNoZVwiIHN0eWxlPVwiZm9udC1mYW1pbHk6THVjaWRhIENhbGxpZ3JhcGh5LFBpbGdpY2hlO1wiPkx1Y2lkYSBDYWxsaWdyYXBoeTwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIlBhbGF0aW5vIExpbm90eXBlLEJvb2sgQW50aXF1YSxQYWxhdGlub1wiIHN0eWxlPVwiZm9udC1mYW1pbHk6UGFsYXRpbm8gTGlub3R5cGUsQm9vayBBbnRpcXVhLFBhbGF0aW5vO1wiPlBhbGF0aW5vIExpbm90eXBlPC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiUGFsYWNlIFNjcmlwdCBNVCwgUGFweXJ1c1wiIHN0eWxlPVwiZm9udC1mYW1pbHk6UGFsYWNlIFNjcmlwdCBNVCwgUGFweXJ1cztcIj5QYWxhY2UgU2NyaXB0IE1UPC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiU3ltYm9sXCIgc3R5bGU9XCJmb250LWZhbWlseTpTeW1ib2w7XCI+U3ltYm9sPC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiVGFob21hLEdlbmV2YVwiIHN0eWxlPVwiZm9udC1mYW1pbHk6VGFob21hLEdlbmV2YTtcIj5UYWhvbWE8L29wdGlvbj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCJUaW1lcyBOZXcgUm9tYW4sIFRpbWVzXCIgc3R5bGU9XCJmb250LWZhbWlseTpUaW1lcyBOZXcgUm9tYW4sIFRpbWVzO1wiPlRpbWVzIE5ldyBSb21hbjwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIlRyZWJ1Y2hldCBNU1wiIHN0eWxlPVwiZm9udC1mYW1pbHk6VHJlYnVjaGV0IE1TO1wiPlRyZWJ1Y2hldCBNUzwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIlZlcmRhbmFcIiBzdHlsZT1cImZvbnQtZmFtaWx5OlZlcmRhbmE7XCI+VmVyZGFuYTwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIlZpbmVyIEhhbmQgSVRDXCIgc3R5bGU9XCJmb250LWZhbWlseTpWaW5lciBIYW5kIElUQztcIj5WaW5lciBIYW5kIElUQzwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0Jzwvc2VsZWN0PicrXHJcblx0XHRcdFx0XHRcdFx0XHQnPGhyPicgK1xyXG5cdFx0ICBcdFx0XHRcdFx0JzwvbGk+JyArXHJcblx0XHQgIFx0XHRcdFx0XHQnPGxpPicgKyBcclxuXHRcdCAgXHRcdFx0XHRcdFx0JzxzdHJvbmc+Rm9udCBzaXplOiA8L3N0cm9uZz4nICtcclxuXHRcdCAgXHRcdFx0XHRcdFx0JzxzZWxlY3QgaWQ9XCJ0ZXh0LW9wdHMtc2VsZWN0XCI+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiMlwiPjI8L29wdGlvbj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCI0XCI+NDwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIjZcIj42PC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiOFwiPjg8L29wdGlvbj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCIxMFwiPjEwPC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiMTJcIj4xMjwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIjE0XCI+MTQ8L29wdGlvbj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCIxNlwiPjE2PC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiMThcIj4xODwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIjIwXCI+MjA8L29wdGlvbj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCIyMlwiPjIyPC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiMjRcIj4yNDwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIjI2XCI+MjY8L29wdGlvbj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCIyOFwiPjI4PC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiMzBcIj4zMDwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIjMyXCI+MzI8L29wdGlvbj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCIzNFwiPjM0PC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiMzZcIj4zNjwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIjM4XCI+Mzg8L29wdGlvbj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCI0MFwiPjQwPC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiNDJcIj40Mjwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIjQ0XCI+NDQ8L29wdGlvbj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCI0NlwiPjQ2PC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiNDhcIj40ODwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIjUwXCI+NTA8L29wdGlvbj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCI1MlwiPjUyPC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiNTRcIj41NDwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIjU2XCI+NTY8L29wdGlvbj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCI1OFwiPjU4PC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiNjBcIj42MDwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIjYyXCI+NjI8L29wdGlvbj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCI2NFwiPjY0PC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiNjZcIj42Njwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIjY4XCI+Njg8L29wdGlvbj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCI3MFwiPjcwPC9vcHRpb24+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiNzJcIj43Mjwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0Jzwvc2VsZWN0PicrXHJcblx0XHRcdFx0XHRcdFx0XHQnPGhyPicgK1xyXG5cdFx0ICBcdFx0XHRcdFx0JzwvbGk+JyArXHJcblx0XHQgIFx0XHRcdFx0XHQnPGxpPicgK1xyXG5cdFx0ICBcdFx0XHRcdFx0XHQnPHN0cm9uZz5UZXh0IGFsaWduOiA8L3N0cm9uZz4nICtcclxuXHRcdCAgXHRcdFx0XHRcdFx0JzxzZWxlY3QgaWQ9XCJ0ZXh0LWFsaWduLXNlbGVjdFwiPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cInN0YXJ0XCI+c3RhcnQ8L29wdGlvbj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCJsZWZ0XCI+bGVmdDwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cImNlbnRlclwiPmNlbnRlcjwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cInJpZ2h0XCI+cmlnaHQ8L29wdGlvbj4nICtcclxuXHRcdCAgXHRcdFx0XHRcdFx0Jzwvc2VsZWN0PicrXHJcblx0XHQgIFx0XHRcdFx0XHRcdCc8aHI+JyArXHJcblx0XHQgIFx0XHRcdFx0XHQnPC9saT4nICtcclxuXHRcdFx0XHQgIFx0XHRcdCc8bGk+JyArXHJcblx0XHRcdFx0ICBcdFx0XHRcdCc8c3Ryb25nPkJvbGQgOjwvc3Ryb25nPicgK1xyXG5cdFx0XHRcdCAgXHRcdFx0XHQnPGkgaWQ9XCJkcmtzaGFkb3dcIiBjbGFzcz1cImZhIGZhLXRleHQtdG9nZ2xlIGZhLWJvbGQgZmEtdG9nZ2xlLW9mZiBmYS1sZ1wiPjwvaT48YnI+JyArXHJcblx0XHRcdFx0XHRcdFx0XHQnPGhyPicgK1xyXG5cdFx0XHRcdCAgXHRcdFx0JzwvbGk+JyArXHJcblx0XHRcdFx0ICBcdFx0XHQnPGxpPicgK1xyXG5cdFx0XHRcdCAgXHRcdFx0XHQnPHN0cm9uZz5VbmRlcmxpbmUgOjwvc3Ryb25nPicgK1xyXG5cdFx0XHRcdCAgXHRcdFx0XHQnPGkgaWQ9XCJkcmtzaGFkb3dcIiBjbGFzcz1cImZhIGZhLXRleHQtdG9nZ2xlIGZhLXVuZGVybGluZSBmYS10b2dnbGUtb2ZmIGZhLWxnXCI+PC9pPjxicj4nICtcclxuXHRcdFx0XHQgIFx0XHRcdFx0Jzxocj4nICtcclxuXHRcdFx0XHQgIFx0XHRcdCc8L2xpPicgK1xyXG5cdFx0XHRcdCAgXHRcdFx0JzxsaT4nICtcclxuXHRcdFx0XHQgIFx0XHRcdFx0JzxzdHJvbmc+SXRhbGljIDo8L3N0cm9uZz4nICtcclxuXHRcdFx0XHQgIFx0XHRcdFx0JzxpIGlkPVwiZHJrc2hhZG93XCIgY2xhc3M9XCJmYSBmYS10ZXh0LXRvZ2dsZSBmYS1pdGFsaWMgZmEtdG9nZ2xlLW9mZiBmYS1sZ1wiPjwvaT48YnI+JyArXHJcblx0XHRcdFx0ICBcdFx0XHRcdCc8aHI+JyArXHJcblx0XHRcdFx0ICBcdFx0XHQnPC9saT4nICtcclxuXHRcdFx0XHQgIFx0XHRcdCc8bGk+JyArXHJcblx0XHQgIFx0XHRcdFx0XHRcdCc8c3Ryb25nPlRleHQgdHJhbnNmb3JtOiA8L3N0cm9uZz4nICtcclxuXHRcdCAgXHRcdFx0XHRcdFx0JzxzZWxlY3QgaWQ9XCJ0ZXh0LXRyYW5zLXNlbGVjdFwiIHN0eWxlPVwid2lkdGg6OTUlOyBtYXJnaW4tdG9wOjJweDtcIj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCJub25lXCI+bm9uZTwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cInVwcGVyY2FzZVwiPlVQUEVSQ0FTRTwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cImxvd2VyY2FzZVwiPmxvd2VyY2FzZTwvb3B0aW9uPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cImNhcGl0YWxpemVcIj5DYXBpdGFsaXplPC9vcHRpb24+JyArXHJcblx0XHQgIFx0XHRcdFx0XHRcdCc8L3NlbGVjdD4nK1xyXG5cdFx0ICBcdFx0XHRcdFx0XHQnPGhyPicrXHJcblx0XHQgIFx0XHRcdFx0XHQnPC9saT4nICtcclxuXHRcdCAgXHRcdFx0XHRcdCc8bGk+JyArXHJcblx0XHRcdFx0ICBcdFx0XHRcdCc8c3Ryb25nPkJvcmRlciBzdHJva2UgOjwvc3Ryb25nPicgK1xyXG5cdFx0XHRcdCAgXHRcdFx0XHQnPGkgaWQ9XCJkcmtzaGFkb3dcIiBjbGFzcz1cImZhIGZhLXRleHQtdG9nZ2xlIGZhLWJyZC1zdHJva2UgZmEtdG9nZ2xlLW9mZiBmYS1sZ1wiPjwvaT48YnI+JyArXHJcblx0XHRcdFx0ICBcdFx0XHRcdCc8aHI+JyArXHJcblx0XHRcdFx0ICBcdFx0XHQnPC9saT4nICtcclxuXHRcdCAgXHRcdFx0XHQnPC91bD4nICtcclxuXHQgIFx0XHRcdCc8L2Rpdj4nICtcdFxyXG5cdFx0XHQgIFx0JzxhIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtIGRyb3Bkb3duLXRvZ2dsZSBwbmwtZWZmZWN0cyAnICsgZWZmZWN0cyArJ1wiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIHRpdGxlPVwiZWZmZWN0c1wiIGhyZWY9XCIjXCI+PGkgY2xhc3M9XCJmYS1wYW5lbCBmYSBmYS1wbHVzLXNxdWFyZSBmd1wiPjwvaT48L2E+JyArXHJcblx0XHRcdFx0ICBcdCc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IHBubC1kcm9wZG93biBlZmZlY3RzLWRyb3Bkb3duXCIgc3R5bGU9XCJsZWZ0OiAnICsgIDQ3ICsgJ3B4OyB0b3A6JyArIDQwICsgJ3B4OyBcIj4nICtcclxuXHQgIFx0XHRcdFx0XHQnPGxpPk9wYWNpdHknICtcclxuXHQgIFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwib3BhY2l0eS1zbGlkZXJcIj48L2Rpdj4nICtcclxuXHQgIFx0XHRcdFx0XHRcdCc8aHI+JyArXHJcblx0ICBcdFx0XHRcdFx0JzwvbGk+JyArXHJcblx0XHRcdCAgXHRcdFx0JzxsaT48c3BhbiBzdHlsZT1cIm1hcmdpbi1sZWZ0Oi0yMHB4O1wiPlNoYWRvdzogPC9zcGFuPicgK1xyXG5cdFx0XHQgIFx0XHRcdFx0JzxpIGlkPVwiZHJrc2hhZG93XCIgY2xhc3M9XCJmYSBmYS1zaGFkb3cgZmEtdG9nZ2xlLW9mZiBmYS1sZ1wiPjwvaT48YnI+JyArXHJcblx0XHRcdCAgXHRcdFx0XHQnPGRpdiBjbGFzcz1cInNoYWRvdy1kcmFnZ2FibGVcIj4nICtcclxuXHRcdFx0ICBcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJzaGFkb3ctZHJhZ2dhYmxlLWJvYXJkXCI+JyArXHJcblx0XHRcdCAgXHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJzaGFkb3ctZHJhZ2dhYmxlLWNpcmNsZVwiPjwvZGl2PicrXHJcblx0XHRcdCAgXHRcdFx0XHRcdCc8L2Rpdj4nICtcclxuXHRcdFx0ICBcdFx0XHRcdCc8L2Rpdj4nICtcclxuXHRcdFx0ICBcdFx0XHRcdCc8ZGl2IGNsYXNzPVwic2hhZG93LWNvbG9yXCI+JyArXHJcblx0XHRcdCAgXHRcdFx0XHRcdCc8bGFiZWw+Y29sb3I6PC9sYWJlbD4nICtcclxuXHRcdFx0ICBcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJzaGFkb3ctY29sb3JwaWNrXCI+PC9kaXY+JyArXHJcblx0XHRcdCAgXHRcdFx0XHQnPC9kaXY+JyArXHJcblx0XHRcdCAgXHRcdFx0JzwvbGk+JyArXHJcblx0ICBcdFx0XHRcdCc8L3VsPicgK1xyXG5cdFx0XHQgIFx0JzxhIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtIHBubC1jbG9uZVwiIHRpdGxlPVwiY2xvbmVcIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmEtcGFuZWwgZmEgZmEtZmlsZXMtbyBmd1wiPjwvaT48L2E+JyArXHJcblx0XHQgIFx0XHQnPGRpdj4nICtcclxuXHRcdFx0ICBcdFx0JzxhIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtIGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIHRpdGxlPVwibGF5ZXJzXCIgaHJlZj1cIiNcIj48aSBjbGFzcz1cImZhLXBhbmVsIGZhIGZhLWRhdGFiYXNlIGZ3XCI+PC9pPjwvYT4nICtcclxuXHRcdFx0ICBcdFx0XHQnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudSBwbmwtZHJvcGRvd24gbGF5ZXJzLWRyb3Bkb3duXCIgc3R5bGU9XCJsZWZ0OiAnICsgIDQ3ICsgJ3B4OyB0b3A6JyArIDEwMiArICdweDsgXCI+JyArXHJcblx0XHQgIFx0XHRcdFx0XHQnPGxpIGRhdGEtb3B0PVwidG9wXCI+VG9wIDxocj48L2xpPicgK1xyXG5cdFx0XHRcdCAgXHRcdFx0JzxsaSBkYXRhLW9wdD1cImZvclwiPkZvcndhcmQgPGhyPjwvbGk+JyArXHJcblx0XHRcdFx0ICBcdFx0XHQnPGxpIGRhdGEtb3B0PVwiYmFja1wiPkJhY2t3b3JkIDxocj48L2xpPicgK1xyXG5cdFx0XHRcdCAgXHRcdFx0JzxsaSBkYXRhLW9wdD1cImJvdFwiPkJvdHRvbTwvbGk+JyArXHJcblx0XHQgIFx0XHRcdFx0JzwvdWw+JyArXHJcblx0XHQgIFx0XHQnPC9kaXY+JyArXHRcdFxyXG5cdFx0XHQgICc8YSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbSBwbmwtZGVsZXRlXCIgdGl0bGU9XCJkZWxldGVcIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmEtcGFuZWwgZmEgZmEtdHJhc2hcIj48L2k+PC9hPicgK1xyXG5cdFx0XHQnPC9kaXY+JyArXHJcblx0XHQnPC9kaXY+Jyk7XHJcblx0cmVCaW5kTGlzdGVuZXJzKCk7XHRcclxufVxyXG5cclxuZnVuY3Rpb24gcmVCaW5kTGlzdGVuZXJzICgpIHtcclxuXHR2YXIgaGVhcnQgPSAkKCcud29ya2luZy1iYW5uZXInKTtcclxuXHR2YXIgZnQgPSAkKCcud29ya2luZy1iYW5uZXInKS5jaGlsZHJlbignLmZ0LWNvbnRhaW5lcicpLmZpbmQoJ1tkYXRhLWFjdGl2ZT10cnVlXScpO1xyXG5cdHZhciBwYW5lbCA9IGhlYXJ0LmNoaWxkcmVuKCcuc2hhcGUtcGFuZWwnKTtcclxuXHJcblx0dmFyIGNvbCA9IHBhbmVsLmZpbmQoJy5wbmwtY29sb3I6bm90KC5wbmwtc2NvbG9yKScpLFxyXG5cdFx0c2NvbCA9IHBhbmVsLmZpbmQoJy5wbmwtc2NvbG9yJyksXHJcblx0XHRkZWwgPSBwYW5lbC5maW5kKCcucG5sLWRlbGV0ZScpLFxyXG5cdFx0bGF5ZXJzID0gcGFuZWwuZmluZCgnLmxheWVycy1kcm9wZG93bicpLFxyXG5cdFx0Y2xvbmUgPSBwYW5lbC5maW5kKCcucG5sLWNsb25lJyksXHJcblx0XHRlZmZlY3RzRHJvcGRvd24gPSBwYW5lbC5maW5kKCcucG5sLWRyb3Bkb3duJyk7XHJcblx0XHJcblxyXG5cdGJpbmRDb2xvclBpY2tlcihjb2wpO1xyXG5cdGJpbmRTaGFwZUNvbG9yUGlja2VyKHNjb2wpO1xyXG5cdGJpbmREZWxldGUoZGVsKTtcclxuXHRiaW5kTGF5ZXJzKGxheWVycyk7XHJcblx0YmluZENsb25lKGNsb25lKTtcclxuXHRiaW5kU2xpZGVyKGVmZmVjdHNEcm9wZG93bik7XHJcblx0YmluZFByb3BhZ2F0aW9uKHBhbmVsKTtcdFxyXG5cdGJpbmRUZXh0T3B0aW9ucyhwYW5lbCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFjdGl2YXRlQ29udHJvbFBhbmVsIChzaGFwZSwgdG9wLCBsZWZ0KSB7XHJcblx0dmFyIHpJbmRleCA9IHBhcnNlSW50KHNoYXBlLmNzcygnei1pbmRleCcpKSxcclxuXHRcdHR5cGUgPSAgc2hhcGUuZGF0YSgndHlwZScpLFxyXG5cdFx0Y29sb3IgPSBlZmZlY3RzID0gaW1hZ2UgPSAnJyxcclxuXHRcdHBhbmVsWmluZGV4ID0gbGFzdFppbmRleCArIDU7XHRcclxuXHJcblx0aWYgKHR5cGUgPT09ICd0ZXh0Jykge1xyXG5cdFx0bGVmdCA9IHNoYXBlLndpZHRoKCkgKyBsZWZ0ICsgMTA7XHJcblx0XHR0b3AgPSB0b3AgLSA1O1xyXG5cdFx0c2hhcGVQYW5lbCA9IHNoYXBlLnNpYmxpbmdzKCcuc2hhcGUtcGFuZWwnKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c2hhcGVQYW5lbCA9IHNoYXBlLnBhcmVudCgnLmZ0LWNvbnRhaW5lcicpLnNpYmxpbmdzKCcuc2hhcGUtcGFuZWwnKTtcclxuXHR9XHJcblxyXG5cdHNoYXBlUGFuZWwuc2hvdygpO1xyXG5cclxuXHR2YXIgY29sb3IxID0gc2hhcGVQYW5lbC5maW5kKCcucG5sLWNvbG9yOm5vdCgucG5sLXNjb2xvciknKTtcclxuXHR2YXIgY29sb3IyID0gc2hhcGVQYW5lbC5maW5kKCcucG5sLXNjb2xvcicpO1xyXG5cdHZhciBwbmxUeHRPcHRzID0gc2hhcGVQYW5lbC5maW5kKCcucG5sLXRleHQtb3B0cycpO1xyXG5cclxuXHRpZiAodHlwZSA9PT0gJ3ZpZGVvJyB8fCB0eXBlID09PSAnYXVkaW8nKSB7XHJcblx0XHRjb2xvciA9IGVmZmVjdHMgPSAnZGlzYWJsZWQnIDtcclxuXHRcdGNvbG9yMS5oaWRlKCk7XHJcblx0XHRjb2xvcjIuaGlkZSgpO1xyXG5cdFx0cG5sVHh0T3B0cy5oaWRlKCk7XHJcblxyXG5cdH0gZWxzZSBpZiAodHlwZSA9PT0gJ2ltYWdlJykge1xyXG5cdFx0Y29sb3IgPSAnZGlzYWJsZWQnO1xyXG5cdFx0Y29sb3IxLmhpZGUoKTtcclxuXHRcdGNvbG9yMi5oaWRlKCk7XHJcblx0XHRwbmxUeHRPcHRzLmhpZGUoKTtcclxuXHJcblx0XHRzaGFwZVBhbmVsLmZpbmQoJy5wbmwtY29sb3InKS5hZGRDbGFzcyhjb2xvcik7XHJcblx0XHRzaGFwZVBhbmVsLmZpbmQoJy5wbmwtZWZmZWN0cycpLnJlbW92ZUNsYXNzKGNvbG9yKTtcclxuXHR9IGVsc2UgaWYgKHR5cGUgPT09ICdzaGFwZScpIHtcclxuXHRcdGNvbG9yMS5zaG93KCk7XHJcblx0XHRjb2xvcjIuc2hvdygpO1xyXG5cdFx0cG5sVHh0T3B0cy5oaWRlKCk7XHJcblxyXG5cdFx0Y29sb3IxLmZpbmQoJ2J1dHRvbicpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIHNoYXBlLmRhdGEoJ2ZpbGwnKSB8fCAnIzAwMDAwMCcpO1xyXG5cdFx0Y29sb3IyLmZpbmQoJ2J1dHRvbicpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIHNoYXBlLmRhdGEoJ3N0cm9rZScpIHx8ICcjMDAwMDAwJyk7XHJcblxyXG5cdFx0c2hhcGVQYW5lbC5maW5kKCcucG5sLWNvbG9yJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHRzaGFwZVBhbmVsLmZpbmQoJy5wbmwtZWZmZWN0cycpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRjb2xvcjEuc2hvdygpO1xyXG5cdFx0Y29sb3IyLmhpZGUoKTtcclxuXHRcdHBubFR4dE9wdHMuc2hvdygpO1xyXG5cclxuXHRcdGNvbG9yMS5maW5kKCdidXR0b24nKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBzaGFwZS5jc3MoJ2NvbG9yJykpO1xyXG5cdFx0XHJcblx0XHRzaGFwZVBhbmVsLmZpbmQoJy5wbmwtY29sb3InKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdHNoYXBlUGFuZWwuZmluZCgnLnBubC1lZmZlY3RzJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0fVxyXG5cclxuXHJcblx0c2hhcGVQYW5lbC5jc3Moe1xyXG5cdFx0J3RvcCc6IHRvcCxcclxuXHRcdCdsZWZ0JzogbGVmdCxcclxuXHRcdCd6LWluZGV4JyA6IHBhbmVsWmluZGV4XHJcblx0fSk7XHJcblxyXG5cdHJlQmluZExpc3RlbmVycygpO1x0XHJcbn0gXHJcblxyXG5mdW5jdGlvbiBiaW5kUHJvcGFnYXRpb24gKGVsZW1lbnQpIHtcclxuXHRlbGVtZW50LmZpbmQoJy5kcm9wZG93bi1tZW51Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5jb2xwaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0fSlcclxufVxyXG5cclxuZnVuY3Rpb24gYmluZFRleHRPcHRpb25zIChlbGVtZW50KSB7XHJcblx0dmFyIHRleHRPcHRzID0gZWxlbWVudC5maW5kKCcucG5sLXRleHQtb3B0cycpO1xyXG5cdHZhciBhY3RpdmUgPSBnZXRBY3RpdmVPYmplY3QoKTtcclxuXHR2YXIgdHlwZSA9IGFjdGl2ZS5kYXRhKCd0eXBlJyk7ICBcclxuXHRpZiAodHlwZSA9PT0gJ3RleHQnICYmIHRleHRPcHRzLmhhc0NsYXNzKCdkaXNhYmxlZCcpKSB7XHJcblx0XHR0ZXh0T3B0cy5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuXHR9IGVsc2UgaWYgKHR5cGUgIT09ICd0ZXh0JyAmJiAhdGV4dE9wdHMuaGFzQ2xhc3MoJ2Rpc2FibGVkJykpIHtcclxuXHRcdHRleHRPcHRzLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdH1cclxuXHJcblx0aWYgKHR5cGUgPT09ICd0ZXh0Jykge1xyXG5cdFx0Ly8gY2hhbmdlIGZvbnQgc2l6ZVxyXG5cdFx0dmFyIHNpemUgPSBwYXJzZUludChhY3RpdmUuY3NzKCdmb250LXNpemUnKS50cmltKCkpO1xyXG5cdFx0dmFyIGZvbnRzID0gYWN0aXZlLmNzcygnZm9udC1mYW1pbHknKS50cmltKCk7XHJcblx0XHR2YXIgYWxpZ24gPSBhY3RpdmUuY3NzKCd0ZXh0LWFsaWduJykudHJpbSgpO1xyXG5cdFx0dmFyIHRyYW5zZm9ybSA9IGFjdGl2ZS5jc3MoJ3RleHQtdHJhbnNmb3JtJykudHJpbSgpO1xyXG5cclxuXHRcdCQoXCIjdGV4dC1vcHRzLXNlbGVjdCBvcHRpb25cIikuZmlsdGVyKGZ1bmN0aW9uKCkge1xyXG5cdFx0ICAgIHJldHVybiAkKHRoaXMpLnRleHQoKSA9PSBzaXplOyBcclxuXHRcdH0pLnByb3AoJ3NlbGVjdGVkJywgdHJ1ZSk7XHJcblxyXG5cdFx0JChcIiNmb250LW9wdHMtc2VsZWN0IG9wdGlvblwiKS5maWx0ZXIoZnVuY3Rpb24oKSB7XHJcblx0XHQgICAgcmV0dXJuICQodGhpcykudGV4dCgpID09IGZvbnRzOyBcclxuXHRcdH0pLnByb3AoJ3NlbGVjdGVkJywgdHJ1ZSk7XHJcblxyXG5cdFx0JChcIiN0ZXh0LWFsaWduLXNlbGVjdCBvcHRpb25cIikuZmlsdGVyKGZ1bmN0aW9uKCkge1xyXG5cdFx0ICAgIHJldHVybiAkKHRoaXMpLnRleHQoKSA9PSB0cmFuc2Zvcm07IFxyXG5cdFx0fSkucHJvcCgnc2VsZWN0ZWQnLCB0cnVlKTtcclxuXHJcblx0XHQkKFwiI3RleHQtdHJhbnMtc2VsZWN0IG9wdGlvblwiKS5maWx0ZXIoZnVuY3Rpb24oKSB7XHJcblx0XHQgICAgcmV0dXJuICQodGhpcykudGV4dCgpID09IGFsaWduOyBcclxuXHRcdH0pLnByb3AoJ3NlbGVjdGVkJywgdHJ1ZSk7XHJcblxyXG5cdFx0JCgnYm9keScpLm9uKCdjaGFuZ2UnLCAnI3RleHQtb3B0cy1zZWxlY3QnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBhY3RpdmUgPSBnZXRBY3RpdmVPYmplY3QoKTtcclxuXHRcdFx0dmFyIHZhbHVlID0gcGFyc2VJbnQoJCh0aGlzKS52YWwoKS50cmltKCkpO1xyXG5cdFx0XHRhY3RpdmUuY3NzKCdmb250LXNpemUnLCB2YWx1ZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCdib2R5Jykub24oJ2NoYW5nZScsICcjZm9udC1vcHRzLXNlbGVjdCcsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGFjdGl2ZSA9IGdldEFjdGl2ZU9iamVjdCgpO1xyXG5cdFx0XHR2YXIgdmFsdWUgPSAkKHRoaXMpLnZhbCgpLnRyaW0oKTtcclxuXHRcdFx0YWN0aXZlLmNzcygnZm9udC1mYW1pbHknLCB2YWx1ZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCdib2R5Jykub24oJ2NoYW5nZScsICcjdGV4dC1hbGlnbi1zZWxlY3QnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBhY3RpdmUgPSBnZXRBY3RpdmVPYmplY3QoKTtcclxuXHRcdFx0dmFyIHZhbHVlID0gJCh0aGlzKS52YWwoKS50cmltKCk7XHJcblx0XHRcdGFjdGl2ZS5jc3MoJ3RleHQtYWxpZ24nLCB2YWx1ZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCdib2R5Jykub24oJ2NoYW5nZScsICcjdGV4dC10cmFucy1zZWxlY3QnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBhY3RpdmUgPSBnZXRBY3RpdmVPYmplY3QoKTtcclxuXHRcdFx0dmFyIHZhbHVlID0gJCh0aGlzKS52YWwoKS50cmltKCk7XHJcblx0XHRcdGFjdGl2ZS5jc3MoJ3RleHQtdHJhbnNmb3JtJywgdmFsdWUpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gdG9nZ2xlIGJvbGRcclxuXHRcdHZhciBmb250V2VpZ2h0ID0gYWN0aXZlLmNzcygnZm9udC13ZWlnaHQnKS50cmltKCk7XHJcblx0XHR2YXIgYm9sZFRvZ2dsZSA9IGVsZW1lbnQuZmluZCgnLmZhLWJvbGQnKTtcclxuXHRcdGlmIChmb250V2VpZ2h0ID09PSAnNDAwJyAmJiBib2xkVG9nZ2xlLmhhc0NsYXNzKCdmYS10b2dnbGUtb24nKSkge1xyXG5cdFx0XHRib2xkVG9nZ2xlLnJlbW92ZUNsYXNzKCdmYS10b2dnbGUtb24nKVxyXG5cdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9mZicpO1xyXG5cdFx0fSBlbHNlIGlmIChmb250V2VpZ2h0ID09PSAnYm9sZCcgJiYgYm9sZFRvZ2dsZS5oYXNDbGFzcygnZmEtdG9nZ2xlLW9mZicpKSB7XHJcblx0XHRcdGJvbGRUb2dnbGUucmVtb3ZlQ2xhc3MoJ2ZhLXRvZ2dsZS1vZmYnKVxyXG5cdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9uJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ym9sZFRvZ2dsZS51bmJpbmQoKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHR2YXIgYWN0aXZlID0gZ2V0QWN0aXZlT2JqZWN0KCk7XHJcblx0XHRcdGlmIChib2xkVG9nZ2xlLmhhc0NsYXNzKCdmYS10b2dnbGUtb24nKSkge1xyXG5cdFx0XHRcdGJvbGRUb2dnbGUucmVtb3ZlQ2xhc3MoJ2ZhLXRvZ2dsZS1vbicpXHJcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ2ZhLXRvZ2dsZS1vZmYnKTtcclxuXHRcdFx0XHRhY3RpdmUuY3NzKCdmb250LXdlaWdodCcsIDQwMCk7XHRcclxuXHRcdFx0fSBlbHNlIGlmIChib2xkVG9nZ2xlLmhhc0NsYXNzKCdmYS10b2dnbGUtb2ZmJykpIHtcclxuXHRcdFx0XHRib2xkVG9nZ2xlLnJlbW92ZUNsYXNzKCdmYS10b2dnbGUtb2ZmJylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9uJyk7XHJcblx0XHRcdFx0YWN0aXZlLmNzcygnZm9udC13ZWlnaHQnLCAnYm9sZCcpO1x0XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIHRvZ2dsZSB1bmRlcmxpbmVcclxuXHRcdHZhciBkZWNvcmF0aW9uID0gYWN0aXZlLmNzcygndGV4dC1kZWNvcmF0aW9uJykudHJpbSgpO1xyXG5cdFx0dmFyIGRlY29yYXRpb25Ub2dnbGUgPSBlbGVtZW50LmZpbmQoJy5mYS11bmRlcmxpbmUnKTtcclxuXHRcdGlmIChkZWNvcmF0aW9uICE9PSAndW5kZXJsaW5lJyAmJiBkZWNvcmF0aW9uVG9nZ2xlLmhhc0NsYXNzKCdmYS10b2dnbGUtb24nKSkge1xyXG5cdFx0XHRkZWNvcmF0aW9uVG9nZ2xlLnJlbW92ZUNsYXNzKCdmYS10b2dnbGUtb24nKVxyXG5cdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9mZicpO1xyXG5cdFx0fSBlbHNlIGlmIChkZWNvcmF0aW9uID09PSAndW5kZXJsaW5lJyAmJiBkZWNvcmF0aW9uVG9nZ2xlLmhhc0NsYXNzKCdmYS10b2dnbGUtb2ZmJykpIHtcclxuXHRcdFx0ZGVjb3JhdGlvblRvZ2dsZS5yZW1vdmVDbGFzcygnZmEtdG9nZ2xlLW9mZicpXHJcblx0XHRcdFx0LmFkZENsYXNzKCdmYS10b2dnbGUtb24nKTtcclxuXHRcdH1cclxuXHJcblx0XHRkZWNvcmF0aW9uVG9nZ2xlLnVuYmluZCgpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdHZhciBhY3RpdmUgPSBnZXRBY3RpdmVPYmplY3QoKTtcclxuXHRcdFx0aWYgKGRlY29yYXRpb25Ub2dnbGUuaGFzQ2xhc3MoJ2ZhLXRvZ2dsZS1vbicpKSB7XHJcblx0XHRcdFx0ZGVjb3JhdGlvblRvZ2dsZS5yZW1vdmVDbGFzcygnZmEtdG9nZ2xlLW9uJylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9mZicpO1xyXG5cdFx0XHRcdGFjdGl2ZS5jc3MoJ3RleHQtZGVjb3JhdGlvbicsICdub25lJyk7XHRcclxuXHRcdFx0fSBlbHNlIGlmIChkZWNvcmF0aW9uVG9nZ2xlLmhhc0NsYXNzKCdmYS10b2dnbGUtb2ZmJykpIHtcclxuXHRcdFx0XHRkZWNvcmF0aW9uVG9nZ2xlLnJlbW92ZUNsYXNzKCdmYS10b2dnbGUtb2ZmJylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9uJyk7XHJcblx0XHRcdFx0YWN0aXZlLmNzcygndGV4dC1kZWNvcmF0aW9uJywgJ3VuZGVybGluZScpO1x0XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIHRvZ2dsZSBpdGFsaWNcclxuXHRcdHZhciBmb250U3R5bGUgPSBhY3RpdmUuY3NzKCdmb250LXN0eWxlJykudHJpbSgpO1xyXG5cdFx0dmFyIGl0YWxpY1RvZ2dsZSA9IGVsZW1lbnQuZmluZCgnLmZhLWl0YWxpYycpO1xyXG5cclxuXHRcdGlmIChmb250U3R5bGUgIT09ICdpdGFsaWMnICYmIGl0YWxpY1RvZ2dsZS5oYXNDbGFzcygnZmEtdG9nZ2xlLW9uJykpIHtcclxuXHRcdFx0aXRhbGljVG9nZ2xlLnJlbW92ZUNsYXNzKCdmYS10b2dnbGUtb24nKVxyXG5cdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9mZicpO1xyXG5cdFx0fSBlbHNlIGlmIChmb250U3R5bGUgPT09ICdpdGFsaWMnICYmIGl0YWxpY1RvZ2dsZS5oYXNDbGFzcygnZmEtdG9nZ2xlLW9mZicpKSB7XHJcblx0XHRcdGRlY29yYXRpb25Ub2dnbGUucmVtb3ZlQ2xhc3MoJ2ZhLXRvZ2dsZS1vZmYnKVxyXG5cdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9uJyk7XHJcblx0XHRcdGFjdGl2ZS5jc3MoJ2ZvbnQtc3R5bGUnLCAnbm9ybWFsJyk7XHRcclxuXHRcdH1cclxuXHJcblx0XHRpdGFsaWNUb2dnbGUudW5iaW5kKCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0dmFyIGFjdGl2ZSA9IGdldEFjdGl2ZU9iamVjdCgpO1xyXG5cdFx0XHRpZiAoaXRhbGljVG9nZ2xlLmhhc0NsYXNzKCdmYS10b2dnbGUtb24nKSkge1xyXG5cdFx0XHRcdGl0YWxpY1RvZ2dsZS5yZW1vdmVDbGFzcygnZmEtdG9nZ2xlLW9uJylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9mZicpO1xyXG5cdFx0XHRcdGFjdGl2ZS5jc3MoJ2ZvbnQtc3R5bGUnLCAnbm9ybWFsJyk7XHRcclxuXHRcdFx0fSBlbHNlIGlmIChpdGFsaWNUb2dnbGUuaGFzQ2xhc3MoJ2ZhLXRvZ2dsZS1vZmYnKSkge1xyXG5cdFx0XHRcdGl0YWxpY1RvZ2dsZS5yZW1vdmVDbGFzcygnZmEtdG9nZ2xlLW9mZicpXHJcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ2ZhLXRvZ2dsZS1vbicpO1xyXG5cdFx0XHRcdFx0YWN0aXZlLmNzcygnZm9udC1zdHlsZScsICdpdGFsaWMnKTtcdFxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyB0b2dnbGUgdXBwZXJjYXNlXHJcblx0XHR2YXIgdGV4dFRyYW5zZm9ybSA9IGFjdGl2ZS5jc3MoJ3RleHQtdHJhbnNmb3JtJyksXHJcblx0XHRcdHVwcGVyY2FzZVRvZ2dsZSA9IGVsZW1lbnQuZmluZCgnLmZhLXVwcGVyY2FzZScpLFxyXG5cdFx0XHRsb3dlcmNhc2VUb2dnbGUgPSBlbGVtZW50LmZpbmQoJy5mYS1sb3dlcmNhc2UnKSxcclxuXHRcdFx0Y2FwaXRhbGl6ZVRvZ2dsZSA9IGVsZW1lbnQuZmluZCgnLmZhLWNhcGl0YWxpemUnKTtcclxuXHJcblx0XHRpZiAodGV4dFRyYW5zZm9ybSAhPT0gJ3VwcGVyY2FzZScgJiYgdXBwZXJjYXNlVG9nZ2xlLmhhc0NsYXNzKCdmYS10b2dnbGUtb24nKSkge1xyXG5cdFx0XHR1cHBlcmNhc2VUb2dnbGUucmVtb3ZlQ2xhc3MoJ2ZhLXRvZ2dsZS1vbicpXHJcblx0XHRcdFx0LmFkZENsYXNzKCdmYS10b2dnbGUtb2ZmJyk7XHJcblx0XHR9IGVsc2UgaWYgKHRleHRUcmFuc2Zvcm0gPT09ICd1cHBlcmNhc2UnICAmJiB1cHBlcmNhc2VUb2dnbGUuaGFzQ2xhc3MoJ2ZhLXRvZ2dsZS1vZmYnKSkge1xyXG5cdFx0XHR1cHBlcmNhc2VUb2dnbGUucmVtb3ZlQ2xhc3MoJ2ZhLXRvZ2dsZS1vZmYnKVxyXG5cdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9uJyk7XHJcblx0XHRcdGFjdGl2ZS5jc3MoJ3RleHQtdHJhbnNmb3JtJywgJ25vbmUnKTtcdFxyXG5cdFx0fSBlbHNlIGlmICh0ZXh0VHJhbnNmb3JtICE9PSAnbG93ZXJjYXNlJyAmJiBsb3dlcmNhc2VUb2dnbGUuaGFzQ2xhc3MoJ2ZhLXRvZ2dsZS1vbicpKSB7XHJcblx0XHRcdGxvd2VyY2FzZVRvZ2dsZS5yZW1vdmVDbGFzcygnZmEtdG9nZ2xlLW9uJylcclxuXHRcdFx0XHQuYWRkQ2xhc3MoJ2ZhLXRvZ2dsZS1vZmYnKTtcclxuXHRcdH0gZWxzZSBpZiAodGV4dFRyYW5zZm9ybSA9PT0gJ2xvd2VyY2FzZScgJiYgbG93ZXJjYXNlVG9nZ2xlLmhhc0NsYXNzKCdmYS10b2dnbGUtb2ZmJykpIHtcclxuXHRcdFx0bG93ZXJjYXNlVG9nZ2xlLnJlbW92ZUNsYXNzKCdmYS10b2dnbGUtb2ZmJylcclxuXHRcdFx0XHQuYWRkQ2xhc3MoJ2ZhLXRvZ2dsZS1vbicpO1xyXG5cdFx0XHRhY3RpdmUuY3NzKCd0ZXh0LXRyYW5zZm9ybScsICdub25lJyk7XHJcblx0XHR9IGVsc2UgaWYgKHRleHRUcmFuc2Zvcm0gIT09ICdjYXBpdGFsaXplJyAmJiBjYXBpdGFsaXplVG9nZ2xlLmhhc0NsYXNzKCdmYS10b2dnbGUtb2ZmJykpIHtcclxuXHRcdFx0Y2FwaXRhbGl6ZVRvZ2dsZS5yZW1vdmVDbGFzcygnZmEtdG9nZ2xlLW9uJylcclxuXHRcdFx0XHQuYWRkQ2xhc3MoJ2ZhLXRvZ2dsZS1vZmYnKTtcclxuXHRcdH0gZWxzZSBpZiAodGV4dFRyYW5zZm9ybSA9PT0gJ2NhcGl0YWxpemUnICYmIGNhcGl0YWxpemVUb2dnbGUuaGFzQ2xhc3MoJ2ZhLXRvZ2dsZS1vZmYnKSkge1xyXG5cdFx0XHRsb3dlcmNhc2VUb2dnbGUucmVtb3ZlQ2xhc3MoJ2ZhLXRvZ2dsZS1vZmYnKVxyXG5cdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9uJyk7XHJcblx0XHRcdGFjdGl2ZS5jc3MoJ3RleHQtdHJhbnNmb3JtJywgJ25vbmUnKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyB0b2dnbGUgdXBwZXJjYXNlXHJcblx0XHR1cHBlcmNhc2VUb2dnbGUudW5iaW5kKCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0dmFyIGFjdGl2ZSA9IGdldEFjdGl2ZU9iamVjdCgpO1xyXG5cdFx0XHRpZiAodXBwZXJjYXNlVG9nZ2xlLmhhc0NsYXNzKCdmYS10b2dnbGUtb24nKSkge1xyXG5cdFx0XHRcdHVwcGVyY2FzZVRvZ2dsZS5yZW1vdmVDbGFzcygnZmEtdG9nZ2xlLW9uJylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9mZicpO1xyXG5cdFx0XHRcdGFjdGl2ZS5jc3MoJ3RleHQtdHJhbnNmb3JtJywgJ25vbmUnKTtcdFxyXG5cdFx0XHR9IGVsc2UgaWYgKHVwcGVyY2FzZVRvZ2dsZS5oYXNDbGFzcygnZmEtdG9nZ2xlLW9mZicpKSB7XHJcblx0XHRcdFx0dXBwZXJjYXNlVG9nZ2xlLnJlbW92ZUNsYXNzKCdmYS10b2dnbGUtb2ZmJylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9uJyk7XHJcblx0XHRcdFx0XHRhY3RpdmUuY3NzKCd0ZXh0LXRyYW5zZm9ybScsICd1cHBlcmNhc2UnKTtcdFxyXG5cdFx0XHRcdGxvd2VyY2FzZVRvZ2dsZS5yZW1vdmVDbGFzcygnZmEtdG9nZ2xlLW9uJylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9mZicpO1x0XHJcblx0XHRcdFx0Y2FwaXRhbGl6ZVRvZ2dsZS5yZW1vdmVDbGFzcygnZmEtdG9nZ2xlLW9uJylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9mZicpO1x0XHRcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gdG9nZ2xlIGxvd2VyY2FzZVxyXG5cdFx0bG93ZXJjYXNlVG9nZ2xlLnVuYmluZCgpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdHZhciBhY3RpdmUgPSBnZXRBY3RpdmVPYmplY3QoKTtcclxuXHRcdFx0aWYgKGxvd2VyY2FzZVRvZ2dsZS5oYXNDbGFzcygnZmEtdG9nZ2xlLW9uJykpIHtcclxuXHRcdFx0XHRsb3dlcmNhc2VUb2dnbGUucmVtb3ZlQ2xhc3MoJ2ZhLXRvZ2dsZS1vbicpXHJcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ2ZhLXRvZ2dsZS1vZmYnKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRhY3RpdmUuY3NzKCd0ZXh0LXRyYW5zZm9ybScsICdub25lJyk7XHRcclxuXHRcdFx0fSBlbHNlIGlmIChsb3dlcmNhc2VUb2dnbGUuaGFzQ2xhc3MoJ2ZhLXRvZ2dsZS1vZmYnKSkge1xyXG5cdFx0XHRcdGxvd2VyY2FzZVRvZ2dsZS5yZW1vdmVDbGFzcygnZmEtdG9nZ2xlLW9mZicpXHJcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ2ZhLXRvZ2dsZS1vbicpO1xyXG5cdFx0XHRcdHVwcGVyY2FzZVRvZ2dsZS5yZW1vdmVDbGFzcygnZmEtdG9nZ2xlLW9uJylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9mZicpO1xyXG5cdFx0XHRcdGNhcGl0YWxpemVUb2dnbGUucmVtb3ZlQ2xhc3MoJ2ZhLXRvZ2dsZS1vbicpXHJcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ2ZhLXRvZ2dsZS1vZmYnKTtcdFxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGFjdGl2ZS5jc3MoJ3RleHQtdHJhbnNmb3JtJywgJ2xvd2VyY2FzZScpO1x0XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGNhcGl0YWxpemVUb2dnbGUudW5iaW5kKCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0dmFyIGFjdGl2ZSA9IGdldEFjdGl2ZU9iamVjdCgpO1xyXG5cdFx0XHRpZiAoY2FwaXRhbGl6ZVRvZ2dsZS5oYXNDbGFzcygnZmEtdG9nZ2xlLW9uJykpIHtcclxuXHRcdFx0XHRjYXBpdGFsaXplVG9nZ2xlLnJlbW92ZUNsYXNzKCdmYS10b2dnbGUtb24nKVxyXG5cdFx0XHRcdFx0LmFkZENsYXNzKCdmYS10b2dnbGUtb2ZmJyk7XHJcblx0XHRcdFx0YWN0aXZlLmNzcygndGV4dC10cmFuc2Zvcm0nLCAnbm9uZScpO1x0XHJcblx0XHRcdH0gZWxzZSBpZiAoY2FwaXRhbGl6ZVRvZ2dsZS5oYXNDbGFzcygnZmEtdG9nZ2xlLW9mZicpKSB7XHJcblx0XHRcdFx0Y2FwaXRhbGl6ZVRvZ2dsZS5yZW1vdmVDbGFzcygnZmEtdG9nZ2xlLW9mZicpXHJcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ2ZhLXRvZ2dsZS1vbicpO1xyXG5cdFx0XHRcdHVwcGVyY2FzZVRvZ2dsZS5yZW1vdmVDbGFzcygnZmEtdG9nZ2xlLW9uJylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9mZicpO1xyXG5cdFx0XHRcdGxvd2VyY2FzZVRvZ2dsZS5yZW1vdmVDbGFzcygnZmEtdG9nZ2xlLW9uJylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9mZicpO1x0XHJcblxyXG5cdFx0XHRcdGFjdGl2ZS5jc3MoJ3RleHQtdHJhbnNmb3JtJywgJ2NhcGl0YWxpemUnKTtcdFxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBib3JkZXIgc3Ryb2tlXHJcblx0XHR2YXIgYm9yZGVyID0gYWN0aXZlLmNzcygnYm9yZGVyJykudHJpbSgpLFxyXG5cdFx0XHRzdHJva2VXaWR0aCA9IHBhcnNlSW50KGJvcmRlci5zcGxpdCgnICcpWzBdKSxcclxuXHRcdFx0Ym9yZGVyVG9nZ2xlID0gZWxlbWVudC5maW5kKCcuZmEtYnJkLXN0cm9rZScpLFxyXG5cdFx0XHRjb2xvciA9IGFjdGl2ZS5jc3MoJ2NvbG9yJyk7XHJcblxyXG5cdFx0aWYgKHN0cm9rZVdpZHRoID09PSAwICYmIGJvcmRlclRvZ2dsZS5oYXNDbGFzcygnZmEtdG9nZ2xlLW9uJykpIHtcclxuXHRcdFx0Ym9yZGVyVG9nZ2xlLnJlbW92ZUNsYXNzKCdmYS10b2dnbGUtb24nKVxyXG5cdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9mZicpO1xyXG5cdFx0fSBlbHNlIGlmIChzdHJva2VXaWR0aCA+IDAgJiYgYm9yZGVyVG9nZ2xlLmhhc0NsYXNzKCdmYS10b2dnbGUtb2ZmJykpIHtcclxuXHRcdFx0Ym9yZGVyVG9nZ2xlLnJlbW92ZUNsYXNzKCdmYS10b2dnbGUtb2ZmJylcclxuXHRcdFx0XHQuYWRkQ2xhc3MoJ2ZhLXRvZ2dsZS1vbicpO1xyXG5cdFx0XHRhY3RpdmUuY3NzKHsgJ2JvcmRlci10b3AnOiAnMnB4IHNvbGlkICcgKyBjb2xvcixcclxuXHRcdFx0XHRcdFx0ICdib3JkZXItYm90dG9tJzogJzJweCBzb2xpZCAnICsgY29sb3JcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGJvcmRlclRvZ2dsZS51bmJpbmQoKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHR2YXIgYWN0aXZlID0gZ2V0QWN0aXZlT2JqZWN0KCk7XHJcblx0XHRcdGlmIChib3JkZXJUb2dnbGUuaGFzQ2xhc3MoJ2ZhLXRvZ2dsZS1vbicpKSB7XHJcblx0XHRcdFx0Ym9yZGVyVG9nZ2xlLnJlbW92ZUNsYXNzKCdmYS10b2dnbGUtb24nKVxyXG5cdFx0XHRcdFx0LmFkZENsYXNzKCdmYS10b2dnbGUtb2ZmJyk7XHJcblx0XHRcdFx0YWN0aXZlLmNzcygnYm9yZGVyJywgJzBweCBub25lIHJnYmEoMCwgMCwgMCwgMCknKTtcdFxyXG5cdFx0XHR9IGVsc2UgaWYgKGJvcmRlclRvZ2dsZS5oYXNDbGFzcygnZmEtdG9nZ2xlLW9mZicpKSB7XHJcblx0XHRcdFx0Ym9yZGVyVG9nZ2xlLnJlbW92ZUNsYXNzKCdmYS10b2dnbGUtb2ZmJylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9uJyk7XHJcblx0XHRcdFx0dmFyIHN0cm9rZSA9ICcycHggc29saWQgJyArIGNvbG9yO1x0XHJcblx0XHRcdFx0YWN0aXZlLmNzcyh7ICdib3JkZXItdG9wJzogc3Ryb2tlLFxyXG5cdFx0XHRcdFx0XHQgJ2JvcmRlci1ib3R0b20nOiBzdHJva2VcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJpbmRTbGlkZXIgKGVsZW1lbnQpIHtcclxuXHR2YXIgYWN0aXZlID0gZ2V0QWN0aXZlT2JqZWN0KCk7XHJcblxyXG5cdHZhciBzaGFkb3cgPSB7XHJcblx0XHRcclxuXHRcdHNldFNoYWRvdzogZnVuY3Rpb24gKGxlZnQsIHRvcCwgYmx1cikge1xyXG5cclxuXHRcdFx0dmFyIGFjdGl2ZSA9IGdldEFjdGl2ZU9iamVjdCgpO1xyXG5cclxuXHRcdFx0aWYgKGFjdGl2ZS5kYXRhKCd0eXBlJykgPT09ICd0ZXh0Jykge1xyXG5cdFx0XHRcdGlmIChhY3RpdmUuY3NzKCd0ZXh0LXNoYWRvdycpICE9PSAnbm9uZScpIHtcclxuXHRcdFx0XHRcdHZhciBmdWxsID0gYWN0aXZlLmNzcygndGV4dC1zaGFkb3cnKSxcclxuXHRcdFx0XHRcdFx0bkNvbG9yID0gXCIgXCIgKyBmdWxsLnN1YnN0cmluZygwLCBmdWxsLmluZGV4T2YoJyknKSArIDEpLFxyXG5cdFx0XHRcdFx0XHRwb3NpdGlvbnMgPSBmdWxsLnN1YnN0cmluZyhmdWxsLmluZGV4T2YoJyknKSArIDEpLnNwbGl0KCcgJyksXHJcblx0XHRcdFx0XHRcdG5MZWZ0ID0gcG9zaXRpb25zWzFdLFxyXG5cdFx0XHRcdFx0XHRuVG9wID0gXCIgXCIgKyBwb3NpdGlvbnNbMl0sXHJcblx0XHRcdFx0XHRcdGJsdXJTaXplID0gXCIgXCIgKyBwb3NpdGlvbnNbM107XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdHNoYWRvdy5ibHVyID0gYmx1ciA/IGJsdXIgOiBuQ29sb3I7XHJcblx0XHRcdFx0XHRzaGFkb3cubGVmdCA9IGxlZnQgPyBsZWZ0IDogbkxlZnQ7XHJcblx0XHRcdFx0XHRzaGFkb3cudG9wID0gdG9wID8gdG9wOiBuVG9wO1xyXG5cdFx0XHRcdFx0c2hhZG93LmJsdXJTaXplID0gYmx1clNpemU7XHJcblx0XHRcdFx0XHRzaGFkb3cuY29sb3IgPSBzaGFkb3cubGVmdCArIHNoYWRvdy50b3AgKyBzaGFkb3cuYmx1clNpemUgKyBzaGFkb3cuYmx1cjtcclxuXHRcdFx0XHRcdGFjdGl2ZS5jc3MoJ3RleHQtc2hhZG93Jywgc2hhZG93LmNvbG9yKTtcclxuXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGFjdGl2ZS5jc3MoJ3RleHQtc2hhZG93JywgJzBweCAwcHggNXB4ICMwMDAwMDAnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcclxuXHRcdFx0fSBlbHNlIGlmIChhY3RpdmUuZGF0YSgndHlwZScpICE9PSAndGV4dCcpIHtcclxuXHRcdFx0XHRpZiAoYWN0aXZlLmNzcygnYm94LXNoYWRvdycpICE9PSAnbm9uZScpIHtcclxuXHJcblx0XHRcdFx0XHR2YXIgZnVsbCA9IGFjdGl2ZS5jc3MoJ2JveC1zaGFkb3cnKSxcclxuXHRcdFx0XHRcdFx0bkNvbG9yID0gXCIgXCIgKyBmdWxsLnN1YnN0cmluZygwLCBmdWxsLmluZGV4T2YoJyknKSArIDEpLFxyXG5cdFx0XHRcdFx0XHRwb3NpdGlvbnMgPSBmdWxsLnN1YnN0cmluZyhmdWxsLmluZGV4T2YoJyknKSArIDEpLnNwbGl0KCcgJyksXHJcblx0XHRcdFx0XHRcdG5MZWZ0ID0gcG9zaXRpb25zWzFdLFxyXG5cdFx0XHRcdFx0XHRuVG9wID0gXCIgXCIgKyBwb3NpdGlvbnNbMl0sXHJcblx0XHRcdFx0XHRcdGJsdXJTaXplID0gXCIgXCIgKyBwb3NpdGlvbnNbM107XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdHNoYWRvdy5ibHVyID0gYmx1ciA/IGJsdXIgOiBuQ29sb3I7XHJcblx0XHRcdFx0XHRzaGFkb3cubGVmdCA9IGxlZnQgPyBsZWZ0IDogbkxlZnQ7XHJcblx0XHRcdFx0XHRzaGFkb3cudG9wID0gdG9wID8gdG9wOiBuVG9wO1xyXG5cdFx0XHRcdFx0c2hhZG93LmJsdXJTaXplID0gYmx1clNpemU7XHJcblx0XHRcdFx0XHRzaGFkb3cuY29sb3IgPSBzaGFkb3cubGVmdCArIHNoYWRvdy50b3AgKyBzaGFkb3cuYmx1clNpemUgKyBzaGFkb3cuYmx1cjtcclxuXHRcdFx0XHRcdGFjdGl2ZS5jc3MoJ2JveC1zaGFkb3cnLCBzaGFkb3cuY29sb3IpO1xyXG5cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0YWN0aXZlLmNzcygnYm94LXNoYWRvdycsICcwcHggMHB4IDVweCAjMDAwMDAwJyk7XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzaGFkb3dFbmFibGVkID0gZmFsc2U7XHJcblx0XHJcblx0dmFyIG9wVmFsdWUgPSAxMDAgLSBNYXRoLmZsb29yKHBhcnNlRmxvYXQoYWN0aXZlLmNzcygnb3BhY2l0eScpKSAqIDEwMCk7XHJcblxyXG5cdHZhciBmYSA9IGVsZW1lbnQuZmluZCgnLmZhLXNoYWRvdycpO1xyXG5cdGlmIChhY3RpdmUuZGF0YSgndHlwZScpID09PSAndGV4dCcgJiYgYWN0aXZlLmNzcygndGV4dC1zaGFkb3cnKSAhPT0gJ25vbmUnKSB7XHJcblx0XHRpZiAoZmEuaGFzQ2xhc3MoJ2ZhLXRvZ2dsZS1vZmYnKSkge1xyXG5cdFx0XHRmYS5yZW1vdmVDbGFzcygnZmEtdG9nZ2xlLW9mZicpXHJcblx0XHRcdFx0LmFkZENsYXNzKCdmYS10b2dnbGUtb24nKTtcclxuXHRcdH1cclxuXHR9IGVsc2UgaWYgKGFjdGl2ZS5kYXRhKCd0eXBlJykgIT09ICd0ZXh0JyAmJiBhY3RpdmUuY3NzKCdib3gtc2hhZG93JykgIT09ICdub25lJykge1xyXG5cdFx0aWYgKGZhLmhhc0NsYXNzKCdmYS10b2dnbGUtb2ZmJykpIHtcclxuXHRcdFx0ZmEucmVtb3ZlQ2xhc3MoJ2ZhLXRvZ2dsZS1vZmYnKVxyXG5cdFx0XHRcdC5hZGRDbGFzcygnZmEtdG9nZ2xlLW9uJyk7XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdGlmIChmYS5oYXNDbGFzcygnZmEtdG9nZ2xlLW9uJykpIHtcclxuXHRcdFx0ZmEucmVtb3ZlQ2xhc3MoJ2ZhLXRvZ2dsZS1vbicpXHJcblx0XHRcdFx0LmFkZENsYXNzKCdmYS10b2dnbGUtb2ZmJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvL29wYWNpdHkgc2xpZGVyIFxyXG5cdGVsZW1lbnQuZmluZCgnLm9wYWNpdHktc2xpZGVyJykuc2xpZGVyKHtcclxuXHRcdHZhbHVlOiBvcFZhbHVlLFxyXG5cdFx0c2xpZGU6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcclxuXHRcdFx0YWN0aXZlLmNzcygnb3BhY2l0eScsIDEgLSB1aS52YWx1ZSAvIDEwMCk7XHJcblx0XHR9LFxyXG5cdFx0c3RvcDogZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xyXG5cdFx0XHRhY3RpdmUuY3NzKCdvcGFjaXR5JywgMSAtIHVpLnZhbHVlIC8gMTAwKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0ZWxlbWVudC5maW5kKCcuZmEtc2hhZG93JykudW5iaW5kKCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHR2YXIgZmEgPSAkKHRoaXMpO1xyXG5cclxuXHRcdGhhc1NoYWRvd1RvZ2dsZShmYSk7XHJcblx0fSk7XHJcblxyXG5cdGZ1bmN0aW9uIGhhc1NoYWRvd1RvZ2dsZSAoZmEpIHtcclxuXHRcdGlmIChmYS5oYXNDbGFzcygnZmEtdG9nZ2xlLW9mZicpKSB7XHJcblx0XHRcdGZhLnJlbW92ZUNsYXNzKCdmYS10b2dnbGUtb2ZmJylcclxuXHRcdFx0XHQuYWRkQ2xhc3MoJ2ZhLXRvZ2dsZS1vbicpO1xyXG5cdFx0XHRzaGFkb3dFbmFibGVkID0gdHJ1ZTtcclxuXHRcdFx0YWRkU2hhZG93KCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH0gXHJcblxyXG5cdFx0aWYgKGZhLmhhc0NsYXNzKCdmYS10b2dnbGUtb24nKSkge1xyXG5cdFx0XHRmYS5yZW1vdmVDbGFzcygnZmEtdG9nZ2xlLW9uJylcclxuXHRcdFx0XHQuYWRkQ2xhc3MoJ2ZhLXRvZ2dsZS1vZmYnKTtcclxuXHRcdFx0c2hhZG93RW5hYmxlZCA9IGZhbHNlO1xyXG5cdFx0XHRyZW1vdmVTaGFkb3coKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYWRkU2hhZG93ICgpIHtcclxuXHRcdHZhciBhY3RpdmUgPSBnZXRBY3RpdmVPYmplY3QoKTtcdFxyXG5cdFx0aWYgKGFjdGl2ZS5kYXRhKCd0eXBlJykgPT09ICd0ZXh0JyAmJiBzaGFkb3dFbmFibGVkKSB7XHJcblxyXG5cdFx0XHR2YXJcdGJsdXIgPSAnICMwMDAnLFxyXG5cdFx0XHRcdHRvcCA9ICcgMHB4JyxcclxuXHRcdFx0XHRsZWZ0ID0gJzBweCc7XHJcblx0XHRcdHNoYWRvdy5zZXRTaGFkb3cobGVmdCwgdG9wLCBibHVyKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKHNoYWRvd0VuYWJsZWQpe1xyXG5cclxuXHRcdFx0dmFyXHRibHVyID0gJyAjMDAwJyxcclxuXHRcdFx0XHR0b3AgPSAnIDBweCcsXHJcblx0XHRcdFx0bGVmdCA9ICcwcHgnO1xyXG5cdFx0XHRzaGFkb3cuc2V0U2hhZG93KGxlZnQsIHRvcCwgYmx1cik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiByZW1vdmVTaGFkb3coKSB7XHJcblxyXG5cdFx0dmFyIGFjdGl2ZSA9IGdldEFjdGl2ZU9iamVjdCgpO1x0XHJcblx0XHRpZiAoYWN0aXZlLmRhdGEoJ3R5cGUnKSA9PT0gJ3RleHQnICYmICFzaGFkb3dFbmFibGVkKSB7XHJcblx0XHRcdGFjdGl2ZS5jc3MoJ3RleHQtc2hhZG93JywgJ25vbmUnKTtcclxuXHRcdH0gZWxzZSBpZiAoIXNoYWRvd0VuYWJsZWQpe1xyXG5cdFx0XHRhY3RpdmUuY3NzKCdib3gtc2hhZG93JywgJ25vbmUnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHZhciBjb2xwaWNrZXIgPSBlbGVtZW50LmZpbmQoJy5zaGFkb3ctY29sb3JwaWNrJyk7XHJcblx0Y29scGlja2VyLmNvbHBpY2soe1xyXG5cdFx0bGF5b3V0IDogJ3JnYicsXHJcblx0XHRzdWJtaXQgOiBmYWxzZSxcclxuXHRcdHZhbHVlIDogJyMwMDAnLFxyXG5cdFx0b25DaGFuZ2UgOiBmdW5jdGlvbiAoaHNiLHJnYikge1xyXG5cdFx0XHR2YXIgYmdDb2xvciA9ICcjJytyZ2I7XHJcblx0XHRcdHZhciBibHVyID0gJyAnICsgYmdDb2xvcjtcclxuXHRcdFx0Y29scGlja2VyLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGJnQ29sb3IpO1xyXG5cdFx0XHRzaGFkb3cuc2V0U2hhZG93KG51bGwsIG51bGwsIGJsdXIpO1xyXG5cclxuXHRcdFx0aWYgKGVsZW1lbnQuZmluZCgnLmZhLXNoYWRvdycpLmhhc0NsYXNzKCdmYS10b2dnbGUtb2ZmJykpIHtcclxuXHRcdFx0XHRmYS5yZW1vdmVDbGFzcygnZmEtdG9nZ2xlLW9mZicpXHJcblx0XHRcdFx0LmFkZENsYXNzKCdmYS10b2dnbGUtb24nKTsgXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRvblN1Ym1pdCA6IGZ1bmN0aW9uKGhzYixoZXgscmdiLGVsKSB7XHJcblx0XHRcdGNvbHBpY2tlci5jb2xwaWNrSGlkZSgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRlbGVtZW50LmZpbmQoJy5zaGFkb3ctZHJhZ2dhYmxlLWNpcmNsZScpLmRyYWdnYWJsZSh7XHJcblx0XHRjb250YWlubWVudDogJ3BhcmVudCcsXHJcblx0XHRkcmFnOiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XHJcblx0XHRcdHZhciBsZWZ0ID0gdWkucG9zaXRpb24ubGVmdCAtIDEzICsgJ3B4JyxcclxuXHRcdFx0dG9wID0gdWkucG9zaXRpb24udG9wIC0gMTMgKyAncHgnO1xyXG5cclxuXHRcdFx0dG9wID0gXCIgXCIgKyB0b3A7XHJcblx0XHRcdHNoYWRvdy5zZXRTaGFkb3cobGVmdCwgdG9wLCBudWxsKTtcclxuXHRcdFx0aWYgKGVsZW1lbnQuZmluZCgnLmZhLXNoYWRvdycpLmhhc0NsYXNzKCdmYS10b2dnbGUtb2ZmJykpIHtcclxuXHRcdFx0XHRmYS5yZW1vdmVDbGFzcygnZmEtdG9nZ2xlLW9mZicpXHJcblx0XHRcdFx0LmFkZENsYXNzKCdmYS10b2dnbGUtb24nKTsgXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYmluZENvbG9yUGlja2VyIChlbGVtZW50KSB7XHJcblx0ZWxlbWVudC5jb2xwaWNrKHtcclxuXHRcdGxheW91dCA6ICdyZ2InLFxyXG5cdFx0c3VibWl0IDogZmFsc2UsXHJcblx0XHRvbkNoYW5nZSA6IGZ1bmN0aW9uIChoc2IscmdiKSB7XHJcblx0XHRcdHZhciBiZ0NvbG9yID0gJyMnK3JnYixcclxuXHRcdFx0XHRhY3RpdmVPYmplY3QgPSBnZXRBY3RpdmVPYmplY3QoKSxcclxuXHRcdFx0XHR0eXBlID0gYWN0aXZlT2JqZWN0LmRhdGEoJ3R5cGUnKTtcclxuXHJcblx0XHRcdCQoJy5wbmwtY29sb3I6bm90KC5wbmwtc2NvbG9yKScpLmZpbmQoJ2J1dHRvbicpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGJnQ29sb3IpO1xyXG5cclxuXHRcdFx0aWYodHlwZSAhPT0gJ3NoYXBlJykge1xyXG5cdFx0XHRcdGFjdGl2ZU9iamVjdC5jc3MoJ2NvbG9yJywgYmdDb2xvcik7XHJcblx0XHRcdFx0aWYgKHR5cGUgPT09ICd0ZXh0Jykge1xyXG5cdFx0XHRcdFx0dmFyIGJvcmRlciA9IGFjdGl2ZU9iamVjdC5jc3MoJ2JvcmRlcicpLnRyaW0oKSxcclxuXHRcdFx0XHRcdFx0c3Ryb2tlV2lkdGggPSBwYXJzZUludChib3JkZXIuc3BsaXQoJyAnKVswXSk7XHJcblx0XHRcdFx0XHRpZiAoc3Ryb2tlV2lkdGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdGFjdGl2ZU9iamVjdC5jc3MoJ2JvcmRlcicsICcycHggc29saWQgJyArIGJnQ29sb3IpO1x0XHJcblx0XHRcdFx0XHR9XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0YWN0aXZlT2JqZWN0LmRhdGEoJ2ZpbGwnLCBiZ0NvbG9yKTtcclxuXHJcblx0XHRcdFx0YWN0aXZlT2JqZWN0LmZpbmQoJ3N2ZycpLmZpbmQoJ3BhdGgnKS5jc3MoJ2ZpbGwnLCBiZ0NvbG9yKTtcclxuXHRcdFx0XHRhY3RpdmVPYmplY3QuZmluZCgnc3ZnJykuZmluZCgncG9seWdvbicpLmNzcygnZmlsbCcsIGJnQ29sb3IpO1xyXG5cdFx0XHRcdGFjdGl2ZU9iamVjdC5maW5kKCdzdmcnKS5maW5kKCdyZWN0JykuY3NzKCdmaWxsJywgYmdDb2xvcik7XHJcblx0XHRcdFx0YWN0aXZlT2JqZWN0LmZpbmQoJ3N2ZycpLmZpbmQoJ2NpcmNsZScpLmNzcygnZmlsbCcsIGJnQ29sb3IpO1xyXG5cdFx0XHRcdGFjdGl2ZU9iamVjdC5maW5kKCdzdmcnKS5maW5kKCdwb2x5bGluZScpLmNzcygnZmlsbCcsIGJnQ29sb3IpO1xyXG5cdFx0XHRcdGFjdGl2ZU9iamVjdC5maW5kKCdzdmcnKS5maW5kKCdsaW5lJykuY3NzKCdmaWxsJywgYmdDb2xvcik7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRvblN1Ym1pdCA6IGZ1bmN0aW9uKGhzYixoZXgscmdiLGVsKSB7XHJcblx0XHRcdGVsZW1lbnQuY29scGlja0hpZGUoKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYmluZFNoYXBlQ29sb3JQaWNrZXIgKGVsZW1lbnQpIHtcclxuXHRlbGVtZW50LmNvbHBpY2soe1xyXG5cdFx0bGF5b3V0IDogJ3JnYicsXHJcblx0XHRzdWJtaXQgOiBmYWxzZSxcclxuXHRcdG9uQ2hhbmdlIDogZnVuY3Rpb24gKGhzYixyZ2IpIHtcclxuXHRcdFx0dmFyIGJnQ29sb3IgPSAnIycrcmdiLFxyXG5cdFx0XHRcdGFjdGl2ZU9iamVjdCA9IGdldEFjdGl2ZU9iamVjdCgpLFxyXG5cdFx0XHRcdHR5cGUgPSBhY3RpdmVPYmplY3QuZGF0YSgndHlwZScpO1xyXG5cclxuXHRcdFx0JCgnLnBubC1zY29sb3InKS5maW5kKCdidXR0b24nKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBiZ0NvbG9yKTtcclxuXHJcblx0XHRcdGlmKHR5cGUgPT09ICdzaGFwZScpIHtcclxuXHRcdFx0XHRhY3RpdmVPYmplY3QuZGF0YSgnc3Ryb2tlJywgYmdDb2xvcik7XHJcblxyXG5cdFx0XHRcdGFjdGl2ZU9iamVjdC5maW5kKCdzdmcnKS5maW5kKCdwYXRoJykuY3NzKCdzdHJva2UnLCBiZ0NvbG9yKTtcclxuXHRcdFx0XHRhY3RpdmVPYmplY3QuZmluZCgnc3ZnJykuZmluZCgncG9seWdvbicpLmNzcygnc3Ryb2tlJywgYmdDb2xvcik7XHJcblx0XHRcdFx0YWN0aXZlT2JqZWN0LmZpbmQoJ3N2ZycpLmZpbmQoJ3JlY3QnKS5jc3MoJ3N0cm9rZScsIGJnQ29sb3IpO1xyXG5cdFx0XHRcdGFjdGl2ZU9iamVjdC5maW5kKCdzdmcnKS5maW5kKCdjaXJjbGUnKS5jc3MoJ3N0cm9rZScsIGJnQ29sb3IpO1xyXG5cdFx0XHRcdGFjdGl2ZU9iamVjdC5maW5kKCdzdmcnKS5maW5kKCdwb2x5bGluZScpLmNzcygnc3Ryb2tlJywgYmdDb2xvcik7XHJcblx0XHRcdFx0YWN0aXZlT2JqZWN0LmZpbmQoJ3N2ZycpLmZpbmQoJ2xpbmUnKS5jc3MoJ3N0cm9rZScsIGJnQ29sb3IpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0b25TdWJtaXQgOiBmdW5jdGlvbihoc2IsaGV4LHJnYixlbCkge1xyXG5cdFx0XHRlbGVtZW50LmNvbHBpY2tIaWRlKCk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJpbmREZWxldGUgKGVsZW1lbnQpIHtcclxuXHRlbGVtZW50LnVuYmluZCgpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgY29udGFpbmVyID0gJCgnLmZ0LWNvbnRhaW5lcltkYXRhLWFjdGl2ZT10cnVlXScpO1xyXG5cdFx0Y29udGFpbmVyLnNpYmxpbmdzKCcuc2hhcGUtcGFuZWwnKS5oaWRlKCk7XHJcblx0XHRyZW1vdmVPYmplY3RGcm9tR3JvdXAoKTtcclxuXHRcdGNvbnRhaW5lci5yZW1vdmUoKTtcclxuXHRcdHVwZGF0ZU9iamVjdFN0YXRlcyhnZXRCYW5uZXJEYXRhKCkpO1xyXG5cdH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBiaW5kTGF5ZXJzIChlbGVtZW50KSB7XHJcblx0ZWxlbWVudC51bmJpbmQoKS5vbignY2xpY2snLCAnbGknLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyIG9wdGlvbiA9ICQodGhpcykuZGF0YSgnb3B0Jyk7XHJcblx0XHRzd2l0Y2ggKG9wdGlvbikge1xyXG5cdFx0XHRjYXNlICd0b3AnOiBcclxuXHRcdFx0XHRtb3ZlVG9wKCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2Zvcic6IFxyXG5cdFx0XHRcdG1vdmVGb3J3YXJkKCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2JhY2snOiBcclxuXHRcdFx0XHRtb3ZlQmFja3dvcmQoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnYm90JzogXHJcblx0XHRcdFx0bW92ZUJvdHRvbSgpO1xyXG5cdFx0XHRcdGJyZWFrO1x0XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBiaW5kQ2xvbmUgKGVsZW1lbnQpIHtcclxuXHJcblx0ZWxlbWVudC51bmJpbmQoKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHR2YXIgb2JqID0gZ2V0QWN0aXZlT2JqZWN0KCk7XHJcblx0XHR2YXIgdHlwZSA9IG9iai5kYXRhKCd0eXBlJyk7XHJcblx0XHRpZiAodHlwZSAhPT0gJ3RleHQnKSB7XHJcblx0XHRcdHZhciBmcmVldHJhbnMgPSBvYmouZnJlZXRyYW5zKCdnZXRPcHRpb25zJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRcdGNhc2UgJ2ltYWdlJzpcclxuXHRcdFx0XHRhZGRJbWFnZSh3b3JraW5nQmFubmVyLCBvYmouYXR0cignc3JjJyksIG9iai53aWR0aCgpLCBvYmouaGVpZ2h0KCksIG9iai5hdHRyKCdzdHlsZScpLCBmcmVldHJhbnMsIG51bGwsIHRydWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICd0ZXh0JzpcclxuXHRcdFx0XHR2YXIgdGV4dCA9IG9iai50ZXh0KCk7XHJcblx0XHRcdFx0YWRkVGV4dCh3b3JraW5nQmFubmVyLCB0ZXh0LCBvYmouY3NzKCdmb250LWZhbWlseScpLCBvYmouYXR0cigncm93cycpLCB0ZXh0Lmxlbmd0aCwgb2JqLmF0dHIoJ3N0eWxlJyksIG51bGwsIHRydWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdzaGFwZSc6XHJcblx0XHRcdFx0YWRkU2hhcGUod29ya2luZ0Jhbm5lciwgb2JqLmRhdGEoJ3NyYycpLCBvYmoud2lkdGgoKSwgb2JqLmhlaWdodCgpLCBvYmouZGF0YSgnZmlsbCcpLCBvYmouYXR0cignc3R5bGUnKSwgZnJlZXRyYW5zLCBudWxsLCB0cnVlKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAndmlkZW8nOlxyXG5cdFx0XHRcdGFkZFZpZGVvKHdvcmtpbmdCYW5uZXIsIG9iai5kYXRhKCd2aWRlby1zcmMnKSwgb2JqLndpZHRoKCksIG9iai5oZWlnaHQoKSwgb2JqLmRhdGEoJ3ZpZGVvLXR5cGUnKSwgb2JqLmF0dHIoJ3N0eWxlJyksIGZyZWV0cmFucywgbnVsbCwgdHJ1ZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2F1ZGlvJzpcclxuXHRcdFx0XHRhZGRBdWRpbyh3b3JraW5nQmFubmVyLCBvYmouZGF0YSgnYXVkaW8tc3JjJyksIG9iai53aWR0aCgpLCBvYmouaGVpZ2h0KCksIG9iai5hdHRyKCdzdHlsZScpLCBmcmVldHJhbnMsIG51bGwsIHRydWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59Il0sImZpbGUiOiJkZXNrL3NsaWRlci9zaGFwZXMvc2hhcGVQYW5lbC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

function generateAnimation(tag, animation, startTime, delay, scalex, scaley, sum) {
	try {
		var previewBanner = $('.preview-banner');
		startTime = (Number(startTime) + 0.5) * 1000;
		delay = (Number(delay) + 0.5 ) * 1000;
		sum = sum ? sum : 0;
		eval(animation + '(tag, previewBanner, startTime, delay, scalex, scaley, sum)');
		
	} catch(err) {
		// console.log('animation doesn\'t exists', err);
	}
};

function maxAnimationDuration(data) {
	var maxAnimationTime = 2000;
	for(var i = 0; i < data.length; i++) {
		time = 0;
		object = data[i];
		if(object.animation) {
			var enter = object.animation.enter;
			var exit = object.animation.exit;

			if(enter.start) {
				time += (Number(enter.start) + 0.5) * 1000;
				time += (Number(enter.delay) + 0.5) * 1000;
			}
			if(exit.start) {
				time += (Number(exit.start) + 0.5) * 1000;
				time += (Number(exit.delay) + 0.5) * 1000;
			}
			if(time > maxAnimationTime) {
				maxAnimationTime = time;
			}
		};
	}

	return maxAnimationTime + 2000;
};

function wholeAnimationTime(presentationData) {
	var wholeTime = 1000;

	for(var i = 0; i < presentationData.length; i++) {
		var maxAnimationTime = 2000;
		var data = presentationData[i];
		maxAnimationTime = maxAnimationDuration(data);
		wholeTime += maxAnimationTime;
	}

	return wholeTime;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvYW5pbWF0aW9ucy9hbmltYXRpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2VuZXJhdGVBbmltYXRpb24odGFnLCBhbmltYXRpb24sIHN0YXJ0VGltZSwgZGVsYXksIHNjYWxleCwgc2NhbGV5LCBzdW0pIHtcclxuXHR0cnkge1xyXG5cdFx0dmFyIHByZXZpZXdCYW5uZXIgPSAkKCcucHJldmlldy1iYW5uZXInKTtcclxuXHRcdHN0YXJ0VGltZSA9IChOdW1iZXIoc3RhcnRUaW1lKSArIDAuNSkgKiAxMDAwO1xyXG5cdFx0ZGVsYXkgPSAoTnVtYmVyKGRlbGF5KSArIDAuNSApICogMTAwMDtcclxuXHRcdHN1bSA9IHN1bSA/IHN1bSA6IDA7XHJcblx0XHRldmFsKGFuaW1hdGlvbiArICcodGFnLCBwcmV2aWV3QmFubmVyLCBzdGFydFRpbWUsIGRlbGF5LCBzY2FsZXgsIHNjYWxleSwgc3VtKScpO1xyXG5cdFx0XHJcblx0fSBjYXRjaChlcnIpIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKCdhbmltYXRpb24gZG9lc25cXCd0IGV4aXN0cycsIGVycik7XHJcblx0fVxyXG59O1xyXG5cclxuZnVuY3Rpb24gbWF4QW5pbWF0aW9uRHVyYXRpb24oZGF0YSkge1xyXG5cdHZhciBtYXhBbmltYXRpb25UaW1lID0gMjAwMDtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG5cdFx0dGltZSA9IDA7XHJcblx0XHRvYmplY3QgPSBkYXRhW2ldO1xyXG5cdFx0aWYob2JqZWN0LmFuaW1hdGlvbikge1xyXG5cdFx0XHR2YXIgZW50ZXIgPSBvYmplY3QuYW5pbWF0aW9uLmVudGVyO1xyXG5cdFx0XHR2YXIgZXhpdCA9IG9iamVjdC5hbmltYXRpb24uZXhpdDtcclxuXHJcblx0XHRcdGlmKGVudGVyLnN0YXJ0KSB7XHJcblx0XHRcdFx0dGltZSArPSAoTnVtYmVyKGVudGVyLnN0YXJ0KSArIDAuNSkgKiAxMDAwO1xyXG5cdFx0XHRcdHRpbWUgKz0gKE51bWJlcihlbnRlci5kZWxheSkgKyAwLjUpICogMTAwMDtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZihleGl0LnN0YXJ0KSB7XHJcblx0XHRcdFx0dGltZSArPSAoTnVtYmVyKGV4aXQuc3RhcnQpICsgMC41KSAqIDEwMDA7XHJcblx0XHRcdFx0dGltZSArPSAoTnVtYmVyKGV4aXQuZGVsYXkpICsgMC41KSAqIDEwMDA7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYodGltZSA+IG1heEFuaW1hdGlvblRpbWUpIHtcclxuXHRcdFx0XHRtYXhBbmltYXRpb25UaW1lID0gdGltZTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBtYXhBbmltYXRpb25UaW1lICsgMjAwMDtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHdob2xlQW5pbWF0aW9uVGltZShwcmVzZW50YXRpb25EYXRhKSB7XHJcblx0dmFyIHdob2xlVGltZSA9IDEwMDA7XHJcblxyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBwcmVzZW50YXRpb25EYXRhLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgbWF4QW5pbWF0aW9uVGltZSA9IDIwMDA7XHJcblx0XHR2YXIgZGF0YSA9IHByZXNlbnRhdGlvbkRhdGFbaV07XHJcblx0XHRtYXhBbmltYXRpb25UaW1lID0gbWF4QW5pbWF0aW9uRHVyYXRpb24oZGF0YSk7XHJcblx0XHR3aG9sZVRpbWUgKz0gbWF4QW5pbWF0aW9uVGltZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB3aG9sZVRpbWU7XHJcbn07Il0sImZpbGUiOiJoZWFkZXIvYW5pbWF0aW9ucy9hbmltYXRpb24uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

function flip(tag, slide, startTime, delay) {
	tag.css({
		'display': 'none'
	});

	setTimeout(function() {
		tag.fadeIn({ queue: false, duration: 'slow' });
		tag.addClass('animated flipInY', delay);
	}, startTime);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvYW5pbWF0aW9ucy9jb21wbGV4L2ZsaXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZmxpcCh0YWcsIHNsaWRlLCBzdGFydFRpbWUsIGRlbGF5KSB7XHJcblx0dGFnLmNzcyh7XHJcblx0XHQnZGlzcGxheSc6ICdub25lJ1xyXG5cdH0pO1xyXG5cclxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0dGFnLmZhZGVJbih7IHF1ZXVlOiBmYWxzZSwgZHVyYXRpb246ICdzbG93JyB9KTtcclxuXHRcdHRhZy5hZGRDbGFzcygnYW5pbWF0ZWQgZmxpcEluWScsIGRlbGF5KTtcclxuXHR9LCBzdGFydFRpbWUpO1xyXG59OyJdLCJmaWxlIjoiaGVhZGVyL2FuaW1hdGlvbnMvY29tcGxleC9mbGlwLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

function hingle(tag, slide, startTime, delay) {
	setTimeout(function() {
		tag.addClass('animated hinge', delay);
	}, startTime);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvYW5pbWF0aW9ucy9jb21wbGV4L2hpbmdsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBoaW5nbGUodGFnLCBzbGlkZSwgc3RhcnRUaW1lLCBkZWxheSkge1xyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHR0YWcuYWRkQ2xhc3MoJ2FuaW1hdGVkIGhpbmdlJywgZGVsYXkpO1xyXG5cdH0sIHN0YXJ0VGltZSk7XHJcbn07Il0sImZpbGUiOiJoZWFkZXIvYW5pbWF0aW9ucy9jb21wbGV4L2hpbmdsZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

function lightSpeedIn(tag, slide, startTime, delay) {
	tag.css({
		'display': 'none'
	});

	setTimeout(function() {
		tag.fadeIn({ queue: false, duration: 'slow' });
		tag.addClass('animated lightSpeedIn', delay);
	}, startTime);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvYW5pbWF0aW9ucy9jb21wbGV4L2xpZ2h0c3BlZWRpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBsaWdodFNwZWVkSW4odGFnLCBzbGlkZSwgc3RhcnRUaW1lLCBkZWxheSkge1xyXG5cdHRhZy5jc3Moe1xyXG5cdFx0J2Rpc3BsYXknOiAnbm9uZSdcclxuXHR9KTtcclxuXHJcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdHRhZy5mYWRlSW4oeyBxdWV1ZTogZmFsc2UsIGR1cmF0aW9uOiAnc2xvdycgfSk7XHJcblx0XHR0YWcuYWRkQ2xhc3MoJ2FuaW1hdGVkIGxpZ2h0U3BlZWRJbicsIGRlbGF5KTtcclxuXHR9LCBzdGFydFRpbWUpO1xyXG59OyJdLCJmaWxlIjoiaGVhZGVyL2FuaW1hdGlvbnMvY29tcGxleC9saWdodHNwZWVkaW4uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

function rollIn(tag, slide, startTime, delay) {
	tag.css({
		'opacity': 0
	});

	setTimeout(function() {
		tag.fadeIn({ queue: false, duration: 'slow' });
		tag.addClass('animated rollIn', delay);
	}, startTime);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvYW5pbWF0aW9ucy9jb21wbGV4L3JvbGxpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiByb2xsSW4odGFnLCBzbGlkZSwgc3RhcnRUaW1lLCBkZWxheSkge1xyXG5cdHRhZy5jc3Moe1xyXG5cdFx0J29wYWNpdHknOiAwXHJcblx0fSk7XHJcblxyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHR0YWcuZmFkZUluKHsgcXVldWU6IGZhbHNlLCBkdXJhdGlvbjogJ3Nsb3cnIH0pO1xyXG5cdFx0dGFnLmFkZENsYXNzKCdhbmltYXRlZCByb2xsSW4nLCBkZWxheSk7XHJcblx0fSwgc3RhcnRUaW1lKTtcclxufTsiXSwiZmlsZSI6ImhlYWRlci9hbmltYXRpb25zL2NvbXBsZXgvcm9sbGluLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

function rotate(tag, slide, startTime, delay) {
	tag.css({
		'opacity': 0
	});

	setTimeout(function() {
		tag.fadeIn({ queue: false, duration: 'slow' });
		tag.addClass('animated rotateIn', delay);
	}, startTime);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvYW5pbWF0aW9ucy9jb21wbGV4L3JvdGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiByb3RhdGUodGFnLCBzbGlkZSwgc3RhcnRUaW1lLCBkZWxheSkge1xyXG5cdHRhZy5jc3Moe1xyXG5cdFx0J29wYWNpdHknOiAwXHJcblx0fSk7XHJcblxyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHR0YWcuZmFkZUluKHsgcXVldWU6IGZhbHNlLCBkdXJhdGlvbjogJ3Nsb3cnIH0pO1xyXG5cdFx0dGFnLmFkZENsYXNzKCdhbmltYXRlZCByb3RhdGVJbicsIGRlbGF5KTtcclxuXHR9LCBzdGFydFRpbWUpO1xyXG59OyJdLCJmaWxlIjoiaGVhZGVyL2FuaW1hdGlvbnMvY29tcGxleC9yb3RhdGUuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

function fadeIn(tag, slide, startTime, delay) {
	tag.css({
		'display': 'none'
	});

	setTimeout(function() {
		tag.fadeIn(delay);
	}, startTime);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvYW5pbWF0aW9ucy9lbnRlci9mYWRlaW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZmFkZUluKHRhZywgc2xpZGUsIHN0YXJ0VGltZSwgZGVsYXkpIHtcclxuXHR0YWcuY3NzKHtcclxuXHRcdCdkaXNwbGF5JzogJ25vbmUnXHJcblx0fSk7XHJcblxyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHR0YWcuZmFkZUluKGRlbGF5KTtcclxuXHR9LCBzdGFydFRpbWUpO1xyXG59OyJdLCJmaWxlIjoiaGVhZGVyL2FuaW1hdGlvbnMvZW50ZXIvZmFkZWluLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

function flyFromBottom(tag, slide, startTimeAt, delay, scalex, scaley, width, height) {
	var top = tag.css('top');
	var outY =  slide.height();

	if(tag.hasClass('textarea')) {
		outY += tag.height() * scaley;
	}

	if(tag.hasClass('shape')) {
		outY += height * scaley;
	}

	tag.css({
		top: outY
	});

	setTimeout(function() {
		tag.animate({ 'top': top }, delay);
	}, startTimeAt);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvYW5pbWF0aW9ucy9lbnRlci9mbHlmcm9tYm90dG9tLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGZseUZyb21Cb3R0b20odGFnLCBzbGlkZSwgc3RhcnRUaW1lQXQsIGRlbGF5LCBzY2FsZXgsIHNjYWxleSwgd2lkdGgsIGhlaWdodCkge1xyXG5cdHZhciB0b3AgPSB0YWcuY3NzKCd0b3AnKTtcclxuXHR2YXIgb3V0WSA9ICBzbGlkZS5oZWlnaHQoKTtcclxuXHJcblx0aWYodGFnLmhhc0NsYXNzKCd0ZXh0YXJlYScpKSB7XHJcblx0XHRvdXRZICs9IHRhZy5oZWlnaHQoKSAqIHNjYWxleTtcclxuXHR9XHJcblxyXG5cdGlmKHRhZy5oYXNDbGFzcygnc2hhcGUnKSkge1xyXG5cdFx0b3V0WSArPSBoZWlnaHQgKiBzY2FsZXk7XHJcblx0fVxyXG5cclxuXHR0YWcuY3NzKHtcclxuXHRcdHRvcDogb3V0WVxyXG5cdH0pO1xyXG5cclxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0dGFnLmFuaW1hdGUoeyAndG9wJzogdG9wIH0sIGRlbGF5KTtcclxuXHR9LCBzdGFydFRpbWVBdCk7XHJcbn07Il0sImZpbGUiOiJoZWFkZXIvYW5pbWF0aW9ucy9lbnRlci9mbHlmcm9tYm90dG9tLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

function flyFromLeft(tag, slide, startTimeAt, delay, scalex, scaley, width, height) {
	var left = tag.css('left');
	var outX = -tag.width();

	if(tag.hasClass('textarea')) {
		outX = -tag.width() * scalex;
	}
	
	if(tag.hasClass('shape')) {
		outX = -width * scalex;
	}
	
	tag.css({
		left: outX
	});
	
	setTimeout(function() {
		tag.animate({ 'left': left }, delay);
	}, startTimeAt);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvYW5pbWF0aW9ucy9lbnRlci9mbHlmcm9tbGVmdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBmbHlGcm9tTGVmdCh0YWcsIHNsaWRlLCBzdGFydFRpbWVBdCwgZGVsYXksIHNjYWxleCwgc2NhbGV5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcblx0dmFyIGxlZnQgPSB0YWcuY3NzKCdsZWZ0Jyk7XHJcblx0dmFyIG91dFggPSAtdGFnLndpZHRoKCk7XHJcblxyXG5cdGlmKHRhZy5oYXNDbGFzcygndGV4dGFyZWEnKSkge1xyXG5cdFx0b3V0WCA9IC10YWcud2lkdGgoKSAqIHNjYWxleDtcclxuXHR9XHJcblx0XHJcblx0aWYodGFnLmhhc0NsYXNzKCdzaGFwZScpKSB7XHJcblx0XHRvdXRYID0gLXdpZHRoICogc2NhbGV4O1xyXG5cdH1cclxuXHRcclxuXHR0YWcuY3NzKHtcclxuXHRcdGxlZnQ6IG91dFhcclxuXHR9KTtcclxuXHRcclxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0dGFnLmFuaW1hdGUoeyAnbGVmdCc6IGxlZnQgfSwgZGVsYXkpO1xyXG5cdH0sIHN0YXJ0VGltZUF0KTtcclxufTsiXSwiZmlsZSI6ImhlYWRlci9hbmltYXRpb25zL2VudGVyL2ZseWZyb21sZWZ0LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

function flyFromRight(tag, slide, startTimeAt, delay, scalex, scaley, width, height) {
	var left = tag.css('left');
	var outX = slide.width();
	
	if(tag.hasClass('textarea')) {
		outX += width * scalex;
	}
	console.log(tag);
	if(tag.hasClass('shape')) {
		outX += width * scalex;
		console.log(outX, width, scalex)
	}

	tag.css({
		left: outX
	});

	setTimeout(function() {
		tag.animate({ 'left': left }, delay);
	}, startTimeAt);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvYW5pbWF0aW9ucy9lbnRlci9mbHlmcm9tcmlnaHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZmx5RnJvbVJpZ2h0KHRhZywgc2xpZGUsIHN0YXJ0VGltZUF0LCBkZWxheSwgc2NhbGV4LCBzY2FsZXksIHdpZHRoLCBoZWlnaHQpIHtcclxuXHR2YXIgbGVmdCA9IHRhZy5jc3MoJ2xlZnQnKTtcclxuXHR2YXIgb3V0WCA9IHNsaWRlLndpZHRoKCk7XHJcblx0XHJcblx0aWYodGFnLmhhc0NsYXNzKCd0ZXh0YXJlYScpKSB7XHJcblx0XHRvdXRYICs9IHdpZHRoICogc2NhbGV4O1xyXG5cdH1cclxuXHRjb25zb2xlLmxvZyh0YWcpO1xyXG5cdGlmKHRhZy5oYXNDbGFzcygnc2hhcGUnKSkge1xyXG5cdFx0b3V0WCArPSB3aWR0aCAqIHNjYWxleDtcclxuXHRcdGNvbnNvbGUubG9nKG91dFgsIHdpZHRoLCBzY2FsZXgpXHJcblx0fVxyXG5cclxuXHR0YWcuY3NzKHtcclxuXHRcdGxlZnQ6IG91dFhcclxuXHR9KTtcclxuXHJcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdHRhZy5hbmltYXRlKHsgJ2xlZnQnOiBsZWZ0IH0sIGRlbGF5KTtcclxuXHR9LCBzdGFydFRpbWVBdCk7XHJcbn07Il0sImZpbGUiOiJoZWFkZXIvYW5pbWF0aW9ucy9lbnRlci9mbHlmcm9tcmlnaHQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

function flyFromTop(tag, slide, startTimeAt, delay, scalex, scaley, width, height) {
	var top = tag.css('top');
	var outY = -tag.height();

	if(tag.hasClass('textarea')) {
		outY = -tag.height() * scaley;
	}

	if(tag.hasClass('shape')) {
		outY = -height * scaley;
	}

	tag.css({
		top: outY
	});

	setTimeout(function() {
		tag.animate({ 'top': top }, delay);
	}, startTimeAt);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvYW5pbWF0aW9ucy9lbnRlci9mbHlmcm9tdG9wLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGZseUZyb21Ub3AodGFnLCBzbGlkZSwgc3RhcnRUaW1lQXQsIGRlbGF5LCBzY2FsZXgsIHNjYWxleSwgd2lkdGgsIGhlaWdodCkge1xyXG5cdHZhciB0b3AgPSB0YWcuY3NzKCd0b3AnKTtcclxuXHR2YXIgb3V0WSA9IC10YWcuaGVpZ2h0KCk7XHJcblxyXG5cdGlmKHRhZy5oYXNDbGFzcygndGV4dGFyZWEnKSkge1xyXG5cdFx0b3V0WSA9IC10YWcuaGVpZ2h0KCkgKiBzY2FsZXk7XHJcblx0fVxyXG5cclxuXHRpZih0YWcuaGFzQ2xhc3MoJ3NoYXBlJykpIHtcclxuXHRcdG91dFkgPSAtaGVpZ2h0ICogc2NhbGV5O1xyXG5cdH1cclxuXHJcblx0dGFnLmNzcyh7XHJcblx0XHR0b3A6IG91dFlcclxuXHR9KTtcclxuXHJcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdHRhZy5hbmltYXRlKHsgJ3RvcCc6IHRvcCB9LCBkZWxheSk7XHJcblx0fSwgc3RhcnRUaW1lQXQpO1xyXG59OyJdLCJmaWxlIjoiaGVhZGVyL2FuaW1hdGlvbnMvZW50ZXIvZmx5ZnJvbXRvcC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

function popIn(tag, slide, startTime, delay, scalex, scaley) {
	tag.hide();

	setTimeout(function() {
		tag.show({ effect: 'scale' });
	}, startTime);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvYW5pbWF0aW9ucy9lbnRlci9wb3Bpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBwb3BJbih0YWcsIHNsaWRlLCBzdGFydFRpbWUsIGRlbGF5LCBzY2FsZXgsIHNjYWxleSkge1xyXG5cdHRhZy5oaWRlKCk7XHJcblxyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHR0YWcuc2hvdyh7IGVmZmVjdDogJ3NjYWxlJyB9KTtcclxuXHR9LCBzdGFydFRpbWUpO1xyXG59OyJdLCJmaWxlIjoiaGVhZGVyL2FuaW1hdGlvbnMvZW50ZXIvcG9waW4uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

function fadeOut(tag, slide, startTime, delay, scalex, scaley, sum) {
	startTime += sum;

	setTimeout(function() {
		tag.fadeOut(delay);
	}, startTime);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvYW5pbWF0aW9ucy9leGl0L2ZhZGVvdXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZmFkZU91dCh0YWcsIHNsaWRlLCBzdGFydFRpbWUsIGRlbGF5LCBzY2FsZXgsIHNjYWxleSwgc3VtKSB7XHJcblx0c3RhcnRUaW1lICs9IHN1bTtcclxuXHJcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdHRhZy5mYWRlT3V0KGRlbGF5KTtcclxuXHR9LCBzdGFydFRpbWUpO1xyXG59OyJdLCJmaWxlIjoiaGVhZGVyL2FuaW1hdGlvbnMvZXhpdC9mYWRlb3V0LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

function flyToBottom(tag, slide, startTimeAt, delay, scalex, scaley, sum) {
	var top = tag.css('top');
	var outY =  slide.height();
	startTimeAt += sum;

	if(tag.hasClass('textarea')) {
		outY += tag.height() * scaley;
	}

	setTimeout(function() {
		tag.animate({ 'top': outY }, delay);
	}, startTimeAt);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvYW5pbWF0aW9ucy9leGl0L2ZseXRvYm90dG9tLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGZseVRvQm90dG9tKHRhZywgc2xpZGUsIHN0YXJ0VGltZUF0LCBkZWxheSwgc2NhbGV4LCBzY2FsZXksIHN1bSkge1xyXG5cdHZhciB0b3AgPSB0YWcuY3NzKCd0b3AnKTtcclxuXHR2YXIgb3V0WSA9ICBzbGlkZS5oZWlnaHQoKTtcclxuXHRzdGFydFRpbWVBdCArPSBzdW07XHJcblxyXG5cdGlmKHRhZy5oYXNDbGFzcygndGV4dGFyZWEnKSkge1xyXG5cdFx0b3V0WSArPSB0YWcuaGVpZ2h0KCkgKiBzY2FsZXk7XHJcblx0fVxyXG5cclxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0dGFnLmFuaW1hdGUoeyAndG9wJzogb3V0WSB9LCBkZWxheSk7XHJcblx0fSwgc3RhcnRUaW1lQXQpO1xyXG59OyJdLCJmaWxlIjoiaGVhZGVyL2FuaW1hdGlvbnMvZXhpdC9mbHl0b2JvdHRvbS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

function flyToLeft(tag, slide, startTimeAt, delay, scalex, scaley, sum) {
	var left = tag.css('left');
	var outX = -tag.width();
	startTimeAt += sum;

	if(tag.hasClass('textarea')) {
		outX = -tag.width() * scalex;
	}
	
	setTimeout(function() {
		tag.animate({ 'left': outX }, delay);
	}, startTimeAt);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvYW5pbWF0aW9ucy9leGl0L2ZseXRvbGVmdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBmbHlUb0xlZnQodGFnLCBzbGlkZSwgc3RhcnRUaW1lQXQsIGRlbGF5LCBzY2FsZXgsIHNjYWxleSwgc3VtKSB7XHJcblx0dmFyIGxlZnQgPSB0YWcuY3NzKCdsZWZ0Jyk7XHJcblx0dmFyIG91dFggPSAtdGFnLndpZHRoKCk7XHJcblx0c3RhcnRUaW1lQXQgKz0gc3VtO1xyXG5cclxuXHRpZih0YWcuaGFzQ2xhc3MoJ3RleHRhcmVhJykpIHtcclxuXHRcdG91dFggPSAtdGFnLndpZHRoKCkgKiBzY2FsZXg7XHJcblx0fVxyXG5cdFxyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHR0YWcuYW5pbWF0ZSh7ICdsZWZ0Jzogb3V0WCB9LCBkZWxheSk7XHJcblx0fSwgc3RhcnRUaW1lQXQpO1xyXG59O1xyXG4iXSwiZmlsZSI6ImhlYWRlci9hbmltYXRpb25zL2V4aXQvZmx5dG9sZWZ0LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

function flyToRight(tag, slide, startTimeAt, delay, scalex, scaley, sum) {
	var left = tag.css('left');
	var outX = slide.width();
	startTimeAt += sum;

	if(tag.hasClass('textarea')) {
		outX += tag.width() * scalex;
	}

	setTimeout(function() {
		tag.animate({ 'left': outX }, delay);
	}, startTimeAt);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvYW5pbWF0aW9ucy9leGl0L2ZseXRvcmlnaHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZmx5VG9SaWdodCh0YWcsIHNsaWRlLCBzdGFydFRpbWVBdCwgZGVsYXksIHNjYWxleCwgc2NhbGV5LCBzdW0pIHtcclxuXHR2YXIgbGVmdCA9IHRhZy5jc3MoJ2xlZnQnKTtcclxuXHR2YXIgb3V0WCA9IHNsaWRlLndpZHRoKCk7XHJcblx0c3RhcnRUaW1lQXQgKz0gc3VtO1xyXG5cclxuXHRpZih0YWcuaGFzQ2xhc3MoJ3RleHRhcmVhJykpIHtcclxuXHRcdG91dFggKz0gdGFnLndpZHRoKCkgKiBzY2FsZXg7XHJcblx0fVxyXG5cclxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0dGFnLmFuaW1hdGUoeyAnbGVmdCc6IG91dFggfSwgZGVsYXkpO1xyXG5cdH0sIHN0YXJ0VGltZUF0KTtcclxufTsiXSwiZmlsZSI6ImhlYWRlci9hbmltYXRpb25zL2V4aXQvZmx5dG9yaWdodC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

function flyToTop(tag, slide, startTimeAt, delay, scalex, scaley, sum) {
	var top = tag.css('top');
	var outY = -tag.height();
	startTimeAt += sum;
	startTimeAt += 500;

	if(tag.hasClass('textarea')) {
		outY = -tag.height() * scaley;
	}

	tag.css({
		top: outY
	});

	setTimeout(function() {
		tag.animate({ 'top': outY }, delay);
	}, startTimeAt);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvYW5pbWF0aW9ucy9leGl0L2ZseXRvdG9wLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGZseVRvVG9wKHRhZywgc2xpZGUsIHN0YXJ0VGltZUF0LCBkZWxheSwgc2NhbGV4LCBzY2FsZXksIHN1bSkge1xyXG5cdHZhciB0b3AgPSB0YWcuY3NzKCd0b3AnKTtcclxuXHR2YXIgb3V0WSA9IC10YWcuaGVpZ2h0KCk7XHJcblx0c3RhcnRUaW1lQXQgKz0gc3VtO1xyXG5cdHN0YXJ0VGltZUF0ICs9IDUwMDtcclxuXHJcblx0aWYodGFnLmhhc0NsYXNzKCd0ZXh0YXJlYScpKSB7XHJcblx0XHRvdXRZID0gLXRhZy5oZWlnaHQoKSAqIHNjYWxleTtcclxuXHR9XHJcblxyXG5cdHRhZy5jc3Moe1xyXG5cdFx0dG9wOiBvdXRZXHJcblx0fSk7XHJcblxyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHR0YWcuYW5pbWF0ZSh7ICd0b3AnOiBvdXRZIH0sIGRlbGF5KTtcclxuXHR9LCBzdGFydFRpbWVBdCk7XHJcbn07Il0sImZpbGUiOiJoZWFkZXIvYW5pbWF0aW9ucy9leGl0L2ZseXRvdG9wLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

function popOut(tag, slide, startTime, delay, scalex, scaley, sum) {
	startTime += sum;

	setTimeout(function() {
		tag.addClass('animated zoomOut', delay);
	}, startTime);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvYW5pbWF0aW9ucy9leGl0L3BvcG91dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBwb3BPdXQodGFnLCBzbGlkZSwgc3RhcnRUaW1lLCBkZWxheSwgc2NhbGV4LCBzY2FsZXksIHN1bSkge1xyXG5cdHN0YXJ0VGltZSArPSBzdW07XHJcblxyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHR0YWcuYWRkQ2xhc3MoJ2FuaW1hdGVkIHpvb21PdXQnLCBkZWxheSk7XHJcblx0fSwgc3RhcnRUaW1lKTtcclxufTsiXSwiZmlsZSI6ImhlYWRlci9hbmltYXRpb25zL2V4aXQvcG9wb3V0LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

$(function() {
	$('#animationDropdown').on('click', function(e) {
		e.stopPropagation();
	});

	$('.animation-tabs a').on('click', function (e) {
		e.preventDefault();
		$(this).tab('show');
	});

	$('.animation-button').on('click', function() {
		$(this).siblings().removeClass('active-animation');
		$(this).addClass('active-animation');
	});

	$('#animation-save-btn').on('click', function() {
		var enter = $('#enter-stage');
		var exit = $('#exit-stage');
		var complex = $('#complex');
		
		// $('#animationDropdown').dropdown('toggle');
		if(enter.hasClass('active')) {
			var startTime = $('.enter-start-time').val();
			var delay = $('.enter-delay').val();
			var animation = $('#enter-stage-content .active-animation').find('a').data('animation');
			var tag;
			if(workingBanner.find('.contenteditable[data-active="true"]').length) {
				tag = $('.contenteditable[data-active="true"]');
			} else {
				tag = workingBanner.find('.ft-container[data-active="true"]').children().not('.ft-controls');
			}

			tag.data('enter-animation', animation);
			tag.data('enter-start', startTime);
			tag.data('enter-delay', delay);
			return;
		}

		if(exit.hasClass('active')) {
			var startTime = $('.exit-start-time').val();
			var delay = $('.exit-delay').val();
			var animation = $('#exit-stage-content .active-animation').find('a').data('animation');
			var tag;

			if(workingBanner.find('.contenteditable[data-active="true"]').length) {
				tag = $('.contenteditable[data-active="true"]');
			} else {
				tag = workingBanner.find('.ft-container[data-active="true"]').children().not('.ft-controls');
			}

			tag.data('exit-animation', animation);
			tag.data('exit-start', startTime);
			tag.data('exit-delay', delay);
			return;
		}

		if(complex.hasClass('active')) {
			var startTime = $('.complex-start-time').val();
			var animation = $('#complex-content .active-animation').find('a').data('animation');
			var tag;

			if(workingBanner.find('.contenteditable[data-active="true"]').length) {
				tag = $('.contenteditable[data-active="true"]');
			} else {
				tag = workingBanner.find('.ft-container[data-active="true"]').children().not('.ft-controls');
			}
			
			tag.data('enter-animation', animation);
			tag.data('enter-start', startTime);
			tag.data('enter-delay', -1912);
			return;
		}
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvYW5pbWF0aW9ucy9vbkFuaW1hdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKGZ1bmN0aW9uKCkge1xyXG5cdCQoJyNhbmltYXRpb25Ecm9wZG93bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5hbmltYXRpb24tdGFicyBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdCQodGhpcykudGFiKCdzaG93Jyk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5hbmltYXRpb24tYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHQkKHRoaXMpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZS1hbmltYXRpb24nKTtcclxuXHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZS1hbmltYXRpb24nKTtcclxuXHR9KTtcclxuXHJcblx0JCgnI2FuaW1hdGlvbi1zYXZlLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGVudGVyID0gJCgnI2VudGVyLXN0YWdlJyk7XHJcblx0XHR2YXIgZXhpdCA9ICQoJyNleGl0LXN0YWdlJyk7XHJcblx0XHR2YXIgY29tcGxleCA9ICQoJyNjb21wbGV4Jyk7XHJcblx0XHRcclxuXHRcdC8vICQoJyNhbmltYXRpb25Ecm9wZG93bicpLmRyb3Bkb3duKCd0b2dnbGUnKTtcclxuXHRcdGlmKGVudGVyLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG5cdFx0XHR2YXIgc3RhcnRUaW1lID0gJCgnLmVudGVyLXN0YXJ0LXRpbWUnKS52YWwoKTtcclxuXHRcdFx0dmFyIGRlbGF5ID0gJCgnLmVudGVyLWRlbGF5JykudmFsKCk7XHJcblx0XHRcdHZhciBhbmltYXRpb24gPSAkKCcjZW50ZXItc3RhZ2UtY29udGVudCAuYWN0aXZlLWFuaW1hdGlvbicpLmZpbmQoJ2EnKS5kYXRhKCdhbmltYXRpb24nKTtcclxuXHRcdFx0dmFyIHRhZztcclxuXHRcdFx0aWYod29ya2luZ0Jhbm5lci5maW5kKCcuY29udGVudGVkaXRhYmxlW2RhdGEtYWN0aXZlPVwidHJ1ZVwiXScpLmxlbmd0aCkge1xyXG5cdFx0XHRcdHRhZyA9ICQoJy5jb250ZW50ZWRpdGFibGVbZGF0YS1hY3RpdmU9XCJ0cnVlXCJdJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFnID0gd29ya2luZ0Jhbm5lci5maW5kKCcuZnQtY29udGFpbmVyW2RhdGEtYWN0aXZlPVwidHJ1ZVwiXScpLmNoaWxkcmVuKCkubm90KCcuZnQtY29udHJvbHMnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGFnLmRhdGEoJ2VudGVyLWFuaW1hdGlvbicsIGFuaW1hdGlvbik7XHJcblx0XHRcdHRhZy5kYXRhKCdlbnRlci1zdGFydCcsIHN0YXJ0VGltZSk7XHJcblx0XHRcdHRhZy5kYXRhKCdlbnRlci1kZWxheScsIGRlbGF5KTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGV4aXQuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcblx0XHRcdHZhciBzdGFydFRpbWUgPSAkKCcuZXhpdC1zdGFydC10aW1lJykudmFsKCk7XHJcblx0XHRcdHZhciBkZWxheSA9ICQoJy5leGl0LWRlbGF5JykudmFsKCk7XHJcblx0XHRcdHZhciBhbmltYXRpb24gPSAkKCcjZXhpdC1zdGFnZS1jb250ZW50IC5hY3RpdmUtYW5pbWF0aW9uJykuZmluZCgnYScpLmRhdGEoJ2FuaW1hdGlvbicpO1xyXG5cdFx0XHR2YXIgdGFnO1xyXG5cclxuXHRcdFx0aWYod29ya2luZ0Jhbm5lci5maW5kKCcuY29udGVudGVkaXRhYmxlW2RhdGEtYWN0aXZlPVwidHJ1ZVwiXScpLmxlbmd0aCkge1xyXG5cdFx0XHRcdHRhZyA9ICQoJy5jb250ZW50ZWRpdGFibGVbZGF0YS1hY3RpdmU9XCJ0cnVlXCJdJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFnID0gd29ya2luZ0Jhbm5lci5maW5kKCcuZnQtY29udGFpbmVyW2RhdGEtYWN0aXZlPVwidHJ1ZVwiXScpLmNoaWxkcmVuKCkubm90KCcuZnQtY29udHJvbHMnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGFnLmRhdGEoJ2V4aXQtYW5pbWF0aW9uJywgYW5pbWF0aW9uKTtcclxuXHRcdFx0dGFnLmRhdGEoJ2V4aXQtc3RhcnQnLCBzdGFydFRpbWUpO1xyXG5cdFx0XHR0YWcuZGF0YSgnZXhpdC1kZWxheScsIGRlbGF5KTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGNvbXBsZXguaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcblx0XHRcdHZhciBzdGFydFRpbWUgPSAkKCcuY29tcGxleC1zdGFydC10aW1lJykudmFsKCk7XHJcblx0XHRcdHZhciBhbmltYXRpb24gPSAkKCcjY29tcGxleC1jb250ZW50IC5hY3RpdmUtYW5pbWF0aW9uJykuZmluZCgnYScpLmRhdGEoJ2FuaW1hdGlvbicpO1xyXG5cdFx0XHR2YXIgdGFnO1xyXG5cclxuXHRcdFx0aWYod29ya2luZ0Jhbm5lci5maW5kKCcuY29udGVudGVkaXRhYmxlW2RhdGEtYWN0aXZlPVwidHJ1ZVwiXScpLmxlbmd0aCkge1xyXG5cdFx0XHRcdHRhZyA9ICQoJy5jb250ZW50ZWRpdGFibGVbZGF0YS1hY3RpdmU9XCJ0cnVlXCJdJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFnID0gd29ya2luZ0Jhbm5lci5maW5kKCcuZnQtY29udGFpbmVyW2RhdGEtYWN0aXZlPVwidHJ1ZVwiXScpLmNoaWxkcmVuKCkubm90KCcuZnQtY29udHJvbHMnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0dGFnLmRhdGEoJ2VudGVyLWFuaW1hdGlvbicsIGFuaW1hdGlvbik7XHJcblx0XHRcdHRhZy5kYXRhKCdlbnRlci1zdGFydCcsIHN0YXJ0VGltZSk7XHJcblx0XHRcdHRhZy5kYXRhKCdlbnRlci1kZWxheScsIC0xOTEyKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59KTsiXSwiZmlsZSI6ImhlYWRlci9hbmltYXRpb25zL29uQW5pbWF0aW9uLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

$(function() {
	$('.preview-btn').on('click', function() {
		// update banner data
		var data = getBannerData();
		var background = workingBanner.css('background');

		bannerData.background = background;
		bannerData.json = data;

		// change preview modal dimensions
		var bannerWidth = $('.working-banner').width();
		var bannerHeight = $('.working-banner').height();
		var difx = 42;
		var dify = 98;
		$('.preview-banner').width(bannerWidth);
		$('.preview-banner').height(bannerHeight);
		$('.modal-content.prewiew-content').width(bannerWidth + difx);
		$('.modal-content.prewiew-content').height(bannerHeight + dify);
		
		// load banner
		loadPreview(bannerData, $('.preview-banner'), 1, 1);
	});
	
	$('#preview').on('hidden.bs.modal', function() {
		$('#preview .preview-banner').html('');
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvcHJldmlldy9vblByZXZpZXcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbigpIHtcclxuXHQkKCcucHJldmlldy1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdC8vIHVwZGF0ZSBiYW5uZXIgZGF0YVxyXG5cdFx0dmFyIGRhdGEgPSBnZXRCYW5uZXJEYXRhKCk7XHJcblx0XHR2YXIgYmFja2dyb3VuZCA9IHdvcmtpbmdCYW5uZXIuY3NzKCdiYWNrZ3JvdW5kJyk7XHJcblxyXG5cdFx0YmFubmVyRGF0YS5iYWNrZ3JvdW5kID0gYmFja2dyb3VuZDtcclxuXHRcdGJhbm5lckRhdGEuanNvbiA9IGRhdGE7XHJcblxyXG5cdFx0Ly8gY2hhbmdlIHByZXZpZXcgbW9kYWwgZGltZW5zaW9uc1xyXG5cdFx0dmFyIGJhbm5lcldpZHRoID0gJCgnLndvcmtpbmctYmFubmVyJykud2lkdGgoKTtcclxuXHRcdHZhciBiYW5uZXJIZWlnaHQgPSAkKCcud29ya2luZy1iYW5uZXInKS5oZWlnaHQoKTtcclxuXHRcdHZhciBkaWZ4ID0gNDI7XHJcblx0XHR2YXIgZGlmeSA9IDk4O1xyXG5cdFx0JCgnLnByZXZpZXctYmFubmVyJykud2lkdGgoYmFubmVyV2lkdGgpO1xyXG5cdFx0JCgnLnByZXZpZXctYmFubmVyJykuaGVpZ2h0KGJhbm5lckhlaWdodCk7XHJcblx0XHQkKCcubW9kYWwtY29udGVudC5wcmV3aWV3LWNvbnRlbnQnKS53aWR0aChiYW5uZXJXaWR0aCArIGRpZngpO1xyXG5cdFx0JCgnLm1vZGFsLWNvbnRlbnQucHJld2lldy1jb250ZW50JykuaGVpZ2h0KGJhbm5lckhlaWdodCArIGRpZnkpO1xyXG5cdFx0XHJcblx0XHQvLyBsb2FkIGJhbm5lclxyXG5cdFx0bG9hZFByZXZpZXcoYmFubmVyRGF0YSwgJCgnLnByZXZpZXctYmFubmVyJyksIDEsIDEpO1xyXG5cdH0pO1xyXG5cdFxyXG5cdCQoJyNwcmV2aWV3Jykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0JCgnI3ByZXZpZXcgLnByZXZpZXctYmFubmVyJykuaHRtbCgnJyk7XHJcblx0fSk7XHJcbn0pOyJdLCJmaWxlIjoiaGVhZGVyL3ByZXZpZXcvb25QcmV2aWV3LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

function loadPreview(bannerData, workingBanner, windowx, windowy) {
	try {
		var objects = JSON.parse(bannerData.json);
		var background = bannerData.background;
		workingBanner.css('background', background);
	} catch(err) {
		workingBanner.css('background', 'none');
		workingBanner.css('background-color', '#545252');
		
		console.log('objects doesn\'t exists');

		return;
	}

	objects.forEach(function(obj) {
		var type = obj.tag;
		var src = obj.src;
		var videoType = obj.videoType;
		var width = obj.width * windowx;
		var height = obj.height * windowy;

		var style = buildCss(obj.style);
		var freetrans = obj.freetrans;
		var animation = obj.animation;

		var text = obj.text;
		var font = obj.font;
		var rows = obj.rows;
		var cols = obj.cols;

		var freetrans = obj.freetrans;
		var scalex = freetrans.scalex;
		var scaley = freetrans.scaley;
		var angle = freetrans.angle;

		var dify = (scaley * height - height) / 2;
		var difx = (scalex * width - width) / 2;

		var top = Number(style.top.split('px')[0]) * windowx - dify;
		var left = Number(style.left.split('px')[0]) * windowy - difx;
		var textTop = Number(style.top.split('px')[0]) * windowy;
		var textLeft = Number(style.left.split('px')[0]) * windowx;

		var width = width * scalex;
		var height = height * scaley;
		var zIndex = style['z-index'];
		var videoType = obj.videoType;
		var activeTag;

		if(type === 'img') {
			var tag = $(document.createElement('img'));

			tag.attr({
				'src': src
			}).css({
				'position': 'absolute',
				'top': top,
				'left': left,
				'width': width,
				'height': height,
				'z-index': zIndex
			});
			
			tag.css({ 'transform': 'rotate('+ angle +'deg)' ,
					'transform-origin': '50% 50% 50px' ,
					'-ms-transform': 'rotate('+ angle +'deg)' ,
					'-ms-transform-origin': '50% 50% 50px' ,
					'-webkit-transform': 'rotate('+ angle +'deg)' ,
					'-webkit-transform-origin': '50% 50% 50px' });

			activeTag = tag;

		} else if(type === 'textArea') {
			var tag = $('<textArea class="textarea" type="text" disabled></textArea>');
			
			var height = Number(style.height.split('px')[0]);
			var width = Number(style.width.split('px')[0]);

			var dify = (windowy * height - height) / 2;
			var difx = (windowx * width - width) / 2;

			style.top = textTop + dify;
			style.left = textLeft + difx;

			tag.css({
				'transform': 'scale('+ windowx +','+ windowy +')'
			});

			tag.css(style)
			.html(text)

			activeTag = tag;

		}  else if(type === 'shape') {
			var fill = obj.fill;
			var stroke = obj.stroke;
			var tag = $('<div class="shape" data-src="'+ src +'" data-fill="'+ fill +'"><img src="'+ src +'"></img></div>');
			
			convertSVG(tag.find('img'), fill, stroke, width / scalex, height / scaley);

			tag.css(style);

			activeTag = tag;

		} else if(type === 'audio') {
			var tag = $(document.createElement('audio'));
			var attributes = obj.prop("attributes");
			tag.attr('src', '/uploads/audios/queen.mp3');

			tag[0].play();

			activeTag = tag;
		} else {
			var tag;

			if(videoType === 'upload') {
				tag = $('<video></video>');

				var source = $('<source></source>');
				source.attr({ type : 'video/mp4' , src : '/uploads/videos/test.mp4' });
				tag.append(source);
				tag.append('Your browser does not support the video tag.');

			} else if(videoType === 'youtube') {
				tag = $('<iframe></iframe>');

				tag.attr({
					src: src
				});
			} else {
				tag = $('<iframe></iframe>');

				tag.attr({
					src: src
				});

			}

			tag.css({ 'transform': 'rotate('+ angle +'deg)' ,
					'transform-origin': '50% 50%' ,
					'-ms-transform': 'rotate('+ angle +'deg)' ,
					'-ms-transform-origin': '50% 50%' ,
					'-webkit-transform': 'rotate('+ angle +'deg)' ,
					'-webkit-transform-origin': '50% 50%' });

			tag.css({
				'position': 'absolute',
				'top': top,
				'left': left,
				'width': width,
				'height': height,
				'z-index': zIndex
			});

			activeTag = tag;
		}
		// add tag to preview
		workingBanner.append(activeTag);
		// animation
		var enterAnimation = obj.animation.enter;
		var exitAnimation = obj.animation.exit;

		if(enterAnimation) {
			var startTime = enterAnimation.start;
			var delay = enterAnimation.delay;
			var type = enterAnimation.type;
			
			if(obj.tag === 'textArea') {
				scalex = windowx;
				scaley = windowy;
			}

			if(obj.tag === 'shape') {
				scalex = obj.freetrans.scalex;
				scaley = obj.freetrans.scaley;
			}

			generateAnimation(activeTag, type, startTime, delay, scalex, scaley, width, height);
		}
		if(exitAnimation) {
			var type = exitAnimation.type;
			var startTime = exitAnimation.start;
			var delay = exitAnimation.delay;
			var enterStartTime = enterAnimation.start;
			var enterDelay = enterAnimation.delay;
			
			if(obj.tag === 'textArea') {
				scalex = windowx;
				scaley = windowy;
			}

			if(obj.tag === 'shape') {
				scalex = obj.freetrans.scalex;
				scaley = obj.freetrans.scaley;
			}
			
			var sum = Number(enterStartTime) * 1000 + Number(enterDelay) * 1000 + 1000; 
			generateAnimation(activeTag, type, startTime, delay, scalex, scaley, sum, width, height);
		}
	});
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvcHJldmlldy9wcmV2aWV3LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGxvYWRQcmV2aWV3KGJhbm5lckRhdGEsIHdvcmtpbmdCYW5uZXIsIHdpbmRvd3gsIHdpbmRvd3kpIHtcclxuXHR0cnkge1xyXG5cdFx0dmFyIG9iamVjdHMgPSBKU09OLnBhcnNlKGJhbm5lckRhdGEuanNvbik7XHJcblx0XHR2YXIgYmFja2dyb3VuZCA9IGJhbm5lckRhdGEuYmFja2dyb3VuZDtcclxuXHRcdHdvcmtpbmdCYW5uZXIuY3NzKCdiYWNrZ3JvdW5kJywgYmFja2dyb3VuZCk7XHJcblx0fSBjYXRjaChlcnIpIHtcclxuXHRcdHdvcmtpbmdCYW5uZXIuY3NzKCdiYWNrZ3JvdW5kJywgJ25vbmUnKTtcclxuXHRcdHdvcmtpbmdCYW5uZXIuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyM1NDUyNTInKTtcclxuXHRcdFxyXG5cdFx0Y29uc29sZS5sb2coJ29iamVjdHMgZG9lc25cXCd0IGV4aXN0cycpO1xyXG5cclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdG9iamVjdHMuZm9yRWFjaChmdW5jdGlvbihvYmopIHtcclxuXHRcdHZhciB0eXBlID0gb2JqLnRhZztcclxuXHRcdHZhciBzcmMgPSBvYmouc3JjO1xyXG5cdFx0dmFyIHZpZGVvVHlwZSA9IG9iai52aWRlb1R5cGU7XHJcblx0XHR2YXIgd2lkdGggPSBvYmoud2lkdGggKiB3aW5kb3d4O1xyXG5cdFx0dmFyIGhlaWdodCA9IG9iai5oZWlnaHQgKiB3aW5kb3d5O1xyXG5cclxuXHRcdHZhciBzdHlsZSA9IGJ1aWxkQ3NzKG9iai5zdHlsZSk7XHJcblx0XHR2YXIgZnJlZXRyYW5zID0gb2JqLmZyZWV0cmFucztcclxuXHRcdHZhciBhbmltYXRpb24gPSBvYmouYW5pbWF0aW9uO1xyXG5cclxuXHRcdHZhciB0ZXh0ID0gb2JqLnRleHQ7XHJcblx0XHR2YXIgZm9udCA9IG9iai5mb250O1xyXG5cdFx0dmFyIHJvd3MgPSBvYmoucm93cztcclxuXHRcdHZhciBjb2xzID0gb2JqLmNvbHM7XHJcblxyXG5cdFx0dmFyIGZyZWV0cmFucyA9IG9iai5mcmVldHJhbnM7XHJcblx0XHR2YXIgc2NhbGV4ID0gZnJlZXRyYW5zLnNjYWxleDtcclxuXHRcdHZhciBzY2FsZXkgPSBmcmVldHJhbnMuc2NhbGV5O1xyXG5cdFx0dmFyIGFuZ2xlID0gZnJlZXRyYW5zLmFuZ2xlO1xyXG5cclxuXHRcdHZhciBkaWZ5ID0gKHNjYWxleSAqIGhlaWdodCAtIGhlaWdodCkgLyAyO1xyXG5cdFx0dmFyIGRpZnggPSAoc2NhbGV4ICogd2lkdGggLSB3aWR0aCkgLyAyO1xyXG5cclxuXHRcdHZhciB0b3AgPSBOdW1iZXIoc3R5bGUudG9wLnNwbGl0KCdweCcpWzBdKSAqIHdpbmRvd3ggLSBkaWZ5O1xyXG5cdFx0dmFyIGxlZnQgPSBOdW1iZXIoc3R5bGUubGVmdC5zcGxpdCgncHgnKVswXSkgKiB3aW5kb3d5IC0gZGlmeDtcclxuXHRcdHZhciB0ZXh0VG9wID0gTnVtYmVyKHN0eWxlLnRvcC5zcGxpdCgncHgnKVswXSkgKiB3aW5kb3d5O1xyXG5cdFx0dmFyIHRleHRMZWZ0ID0gTnVtYmVyKHN0eWxlLmxlZnQuc3BsaXQoJ3B4JylbMF0pICogd2luZG93eDtcclxuXHJcblx0XHR2YXIgd2lkdGggPSB3aWR0aCAqIHNjYWxleDtcclxuXHRcdHZhciBoZWlnaHQgPSBoZWlnaHQgKiBzY2FsZXk7XHJcblx0XHR2YXIgekluZGV4ID0gc3R5bGVbJ3otaW5kZXgnXTtcclxuXHRcdHZhciB2aWRlb1R5cGUgPSBvYmoudmlkZW9UeXBlO1xyXG5cdFx0dmFyIGFjdGl2ZVRhZztcclxuXHJcblx0XHRpZih0eXBlID09PSAnaW1nJykge1xyXG5cdFx0XHR2YXIgdGFnID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKSk7XHJcblxyXG5cdFx0XHR0YWcuYXR0cih7XHJcblx0XHRcdFx0J3NyYyc6IHNyY1xyXG5cdFx0XHR9KS5jc3Moe1xyXG5cdFx0XHRcdCdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXHJcblx0XHRcdFx0J3RvcCc6IHRvcCxcclxuXHRcdFx0XHQnbGVmdCc6IGxlZnQsXHJcblx0XHRcdFx0J3dpZHRoJzogd2lkdGgsXHJcblx0XHRcdFx0J2hlaWdodCc6IGhlaWdodCxcclxuXHRcdFx0XHQnei1pbmRleCc6IHpJbmRleFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHRcdHRhZy5jc3MoeyAndHJhbnNmb3JtJzogJ3JvdGF0ZSgnKyBhbmdsZSArJ2RlZyknICxcclxuXHRcdFx0XHRcdCd0cmFuc2Zvcm0tb3JpZ2luJzogJzUwJSA1MCUgNTBweCcgLFxyXG5cdFx0XHRcdFx0Jy1tcy10cmFuc2Zvcm0nOiAncm90YXRlKCcrIGFuZ2xlICsnZGVnKScgLFxyXG5cdFx0XHRcdFx0Jy1tcy10cmFuc2Zvcm0tb3JpZ2luJzogJzUwJSA1MCUgNTBweCcgLFxyXG5cdFx0XHRcdFx0Jy13ZWJraXQtdHJhbnNmb3JtJzogJ3JvdGF0ZSgnKyBhbmdsZSArJ2RlZyknICxcclxuXHRcdFx0XHRcdCctd2Via2l0LXRyYW5zZm9ybS1vcmlnaW4nOiAnNTAlIDUwJSA1MHB4JyB9KTtcclxuXHJcblx0XHRcdGFjdGl2ZVRhZyA9IHRhZztcclxuXHJcblx0XHR9IGVsc2UgaWYodHlwZSA9PT0gJ3RleHRBcmVhJykge1xyXG5cdFx0XHR2YXIgdGFnID0gJCgnPHRleHRBcmVhIGNsYXNzPVwidGV4dGFyZWFcIiB0eXBlPVwidGV4dFwiIGRpc2FibGVkPjwvdGV4dEFyZWE+Jyk7XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgaGVpZ2h0ID0gTnVtYmVyKHN0eWxlLmhlaWdodC5zcGxpdCgncHgnKVswXSk7XHJcblx0XHRcdHZhciB3aWR0aCA9IE51bWJlcihzdHlsZS53aWR0aC5zcGxpdCgncHgnKVswXSk7XHJcblxyXG5cdFx0XHR2YXIgZGlmeSA9ICh3aW5kb3d5ICogaGVpZ2h0IC0gaGVpZ2h0KSAvIDI7XHJcblx0XHRcdHZhciBkaWZ4ID0gKHdpbmRvd3ggKiB3aWR0aCAtIHdpZHRoKSAvIDI7XHJcblxyXG5cdFx0XHRzdHlsZS50b3AgPSB0ZXh0VG9wICsgZGlmeTtcclxuXHRcdFx0c3R5bGUubGVmdCA9IHRleHRMZWZ0ICsgZGlmeDtcclxuXHJcblx0XHRcdHRhZy5jc3Moe1xyXG5cdFx0XHRcdCd0cmFuc2Zvcm0nOiAnc2NhbGUoJysgd2luZG93eCArJywnKyB3aW5kb3d5ICsnKSdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0YWcuY3NzKHN0eWxlKVxyXG5cdFx0XHQuaHRtbCh0ZXh0KVxyXG5cclxuXHRcdFx0YWN0aXZlVGFnID0gdGFnO1xyXG5cclxuXHRcdH0gIGVsc2UgaWYodHlwZSA9PT0gJ3NoYXBlJykge1xyXG5cdFx0XHR2YXIgZmlsbCA9IG9iai5maWxsO1xyXG5cdFx0XHR2YXIgc3Ryb2tlID0gb2JqLnN0cm9rZTtcclxuXHRcdFx0dmFyIHRhZyA9ICQoJzxkaXYgY2xhc3M9XCJzaGFwZVwiIGRhdGEtc3JjPVwiJysgc3JjICsnXCIgZGF0YS1maWxsPVwiJysgZmlsbCArJ1wiPjxpbWcgc3JjPVwiJysgc3JjICsnXCI+PC9pbWc+PC9kaXY+Jyk7XHJcblx0XHRcdFxyXG5cdFx0XHRjb252ZXJ0U1ZHKHRhZy5maW5kKCdpbWcnKSwgZmlsbCwgc3Ryb2tlLCB3aWR0aCAvIHNjYWxleCwgaGVpZ2h0IC8gc2NhbGV5KTtcclxuXHJcblx0XHRcdHRhZy5jc3Moc3R5bGUpO1xyXG5cclxuXHRcdFx0YWN0aXZlVGFnID0gdGFnO1xyXG5cclxuXHRcdH0gZWxzZSBpZih0eXBlID09PSAnYXVkaW8nKSB7XHJcblx0XHRcdHZhciB0YWcgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJykpO1xyXG5cdFx0XHR2YXIgYXR0cmlidXRlcyA9IG9iai5wcm9wKFwiYXR0cmlidXRlc1wiKTtcclxuXHRcdFx0dGFnLmF0dHIoJ3NyYycsICcvdXBsb2Fkcy9hdWRpb3MvcXVlZW4ubXAzJyk7XHJcblxyXG5cdFx0XHR0YWdbMF0ucGxheSgpO1xyXG5cclxuXHRcdFx0YWN0aXZlVGFnID0gdGFnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHRhZztcclxuXHJcblx0XHRcdGlmKHZpZGVvVHlwZSA9PT0gJ3VwbG9hZCcpIHtcclxuXHRcdFx0XHR0YWcgPSAkKCc8dmlkZW8+PC92aWRlbz4nKTtcclxuXHJcblx0XHRcdFx0dmFyIHNvdXJjZSA9ICQoJzxzb3VyY2U+PC9zb3VyY2U+Jyk7XHJcblx0XHRcdFx0c291cmNlLmF0dHIoeyB0eXBlIDogJ3ZpZGVvL21wNCcgLCBzcmMgOiAnL3VwbG9hZHMvdmlkZW9zL3Rlc3QubXA0JyB9KTtcclxuXHRcdFx0XHR0YWcuYXBwZW5kKHNvdXJjZSk7XHJcblx0XHRcdFx0dGFnLmFwcGVuZCgnWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIHZpZGVvIHRhZy4nKTtcclxuXHJcblx0XHRcdH0gZWxzZSBpZih2aWRlb1R5cGUgPT09ICd5b3V0dWJlJykge1xyXG5cdFx0XHRcdHRhZyA9ICQoJzxpZnJhbWU+PC9pZnJhbWU+Jyk7XHJcblxyXG5cdFx0XHRcdHRhZy5hdHRyKHtcclxuXHRcdFx0XHRcdHNyYzogc3JjXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFnID0gJCgnPGlmcmFtZT48L2lmcmFtZT4nKTtcclxuXHJcblx0XHRcdFx0dGFnLmF0dHIoe1xyXG5cdFx0XHRcdFx0c3JjOiBzcmNcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRhZy5jc3MoeyAndHJhbnNmb3JtJzogJ3JvdGF0ZSgnKyBhbmdsZSArJ2RlZyknICxcclxuXHRcdFx0XHRcdCd0cmFuc2Zvcm0tb3JpZ2luJzogJzUwJSA1MCUnICxcclxuXHRcdFx0XHRcdCctbXMtdHJhbnNmb3JtJzogJ3JvdGF0ZSgnKyBhbmdsZSArJ2RlZyknICxcclxuXHRcdFx0XHRcdCctbXMtdHJhbnNmb3JtLW9yaWdpbic6ICc1MCUgNTAlJyAsXHJcblx0XHRcdFx0XHQnLXdlYmtpdC10cmFuc2Zvcm0nOiAncm90YXRlKCcrIGFuZ2xlICsnZGVnKScgLFxyXG5cdFx0XHRcdFx0Jy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbic6ICc1MCUgNTAlJyB9KTtcclxuXHJcblx0XHRcdHRhZy5jc3Moe1xyXG5cdFx0XHRcdCdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXHJcblx0XHRcdFx0J3RvcCc6IHRvcCxcclxuXHRcdFx0XHQnbGVmdCc6IGxlZnQsXHJcblx0XHRcdFx0J3dpZHRoJzogd2lkdGgsXHJcblx0XHRcdFx0J2hlaWdodCc6IGhlaWdodCxcclxuXHRcdFx0XHQnei1pbmRleCc6IHpJbmRleFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGFjdGl2ZVRhZyA9IHRhZztcclxuXHRcdH1cclxuXHRcdC8vIGFkZCB0YWcgdG8gcHJldmlld1xyXG5cdFx0d29ya2luZ0Jhbm5lci5hcHBlbmQoYWN0aXZlVGFnKTtcclxuXHRcdC8vIGFuaW1hdGlvblxyXG5cdFx0dmFyIGVudGVyQW5pbWF0aW9uID0gb2JqLmFuaW1hdGlvbi5lbnRlcjtcclxuXHRcdHZhciBleGl0QW5pbWF0aW9uID0gb2JqLmFuaW1hdGlvbi5leGl0O1xyXG5cclxuXHRcdGlmKGVudGVyQW5pbWF0aW9uKSB7XHJcblx0XHRcdHZhciBzdGFydFRpbWUgPSBlbnRlckFuaW1hdGlvbi5zdGFydDtcclxuXHRcdFx0dmFyIGRlbGF5ID0gZW50ZXJBbmltYXRpb24uZGVsYXk7XHJcblx0XHRcdHZhciB0eXBlID0gZW50ZXJBbmltYXRpb24udHlwZTtcclxuXHRcdFx0XHJcblx0XHRcdGlmKG9iai50YWcgPT09ICd0ZXh0QXJlYScpIHtcclxuXHRcdFx0XHRzY2FsZXggPSB3aW5kb3d4O1xyXG5cdFx0XHRcdHNjYWxleSA9IHdpbmRvd3k7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKG9iai50YWcgPT09ICdzaGFwZScpIHtcclxuXHRcdFx0XHRzY2FsZXggPSBvYmouZnJlZXRyYW5zLnNjYWxleDtcclxuXHRcdFx0XHRzY2FsZXkgPSBvYmouZnJlZXRyYW5zLnNjYWxleTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Z2VuZXJhdGVBbmltYXRpb24oYWN0aXZlVGFnLCB0eXBlLCBzdGFydFRpbWUsIGRlbGF5LCBzY2FsZXgsIHNjYWxleSwgd2lkdGgsIGhlaWdodCk7XHJcblx0XHR9XHJcblx0XHRpZihleGl0QW5pbWF0aW9uKSB7XHJcblx0XHRcdHZhciB0eXBlID0gZXhpdEFuaW1hdGlvbi50eXBlO1xyXG5cdFx0XHR2YXIgc3RhcnRUaW1lID0gZXhpdEFuaW1hdGlvbi5zdGFydDtcclxuXHRcdFx0dmFyIGRlbGF5ID0gZXhpdEFuaW1hdGlvbi5kZWxheTtcclxuXHRcdFx0dmFyIGVudGVyU3RhcnRUaW1lID0gZW50ZXJBbmltYXRpb24uc3RhcnQ7XHJcblx0XHRcdHZhciBlbnRlckRlbGF5ID0gZW50ZXJBbmltYXRpb24uZGVsYXk7XHJcblx0XHRcdFxyXG5cdFx0XHRpZihvYmoudGFnID09PSAndGV4dEFyZWEnKSB7XHJcblx0XHRcdFx0c2NhbGV4ID0gd2luZG93eDtcclxuXHRcdFx0XHRzY2FsZXkgPSB3aW5kb3d5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihvYmoudGFnID09PSAnc2hhcGUnKSB7XHJcblx0XHRcdFx0c2NhbGV4ID0gb2JqLmZyZWV0cmFucy5zY2FsZXg7XHJcblx0XHRcdFx0c2NhbGV5ID0gb2JqLmZyZWV0cmFucy5zY2FsZXk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHZhciBzdW0gPSBOdW1iZXIoZW50ZXJTdGFydFRpbWUpICogMTAwMCArIE51bWJlcihlbnRlckRlbGF5KSAqIDEwMDAgKyAxMDAwOyBcclxuXHRcdFx0Z2VuZXJhdGVBbmltYXRpb24oYWN0aXZlVGFnLCB0eXBlLCBzdGFydFRpbWUsIGRlbGF5LCBzY2FsZXgsIHNjYWxleSwgc3VtLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHRcdH1cclxuXHR9KTtcclxufTsiXSwiZmlsZSI6ImhlYWRlci9wcmV2aWV3L3ByZXZpZXcuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvcHVibGlzaC9lbWJlZC9maXhlZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIiXSwiZmlsZSI6ImhlYWRlci9wdWJsaXNoL2VtYmVkL2ZpeGVkLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

$(function() {
	var path = window.location.protocol + '//' + window.location.host;
	var apiPath = path + '/api/canvas-iframe-data/';
	$('#responsive-code').val(''+
		'<div data-href="'+ apiPath +'" class="responsive-presentation" data-height="400" data-width="800"></div>'+
		'<script src="'+ path +'/assets/editor/embed-scripts/responsive.js"></script>');

	$('#responsive-code').on('click', function() {
		$(this).select();
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvcHVibGlzaC9lbWJlZC9yZXNwb25zaXZlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24oKSB7XHJcblx0dmFyIHBhdGggPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgd2luZG93LmxvY2F0aW9uLmhvc3Q7XHJcblx0dmFyIGFwaVBhdGggPSBwYXRoICsgJy9hcGkvY2FudmFzLWlmcmFtZS1kYXRhLyc7XHJcblx0JCgnI3Jlc3BvbnNpdmUtY29kZScpLnZhbCgnJytcclxuXHRcdCc8ZGl2IGRhdGEtaHJlZj1cIicrIGFwaVBhdGggKydcIiBjbGFzcz1cInJlc3BvbnNpdmUtcHJlc2VudGF0aW9uXCIgZGF0YS1oZWlnaHQ9XCI0MDBcIiBkYXRhLXdpZHRoPVwiODAwXCI+PC9kaXY+JytcclxuXHRcdCc8c2NyaXB0IHNyYz1cIicrIHBhdGggKycvYXNzZXRzL2VkaXRvci9lbWJlZC1zY3JpcHRzL3Jlc3BvbnNpdmUuanNcIj48L3NjcmlwdD4nKTtcclxuXHJcblx0JCgnI3Jlc3BvbnNpdmUtY29kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0JCh0aGlzKS5zZWxlY3QoKTtcclxuXHR9KTtcclxufSk7Il0sImZpbGUiOiJoZWFkZXIvcHVibGlzaC9lbWJlZC9yZXNwb25zaXZlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

$(function() {
	$('#save').on('click', function () {
		var that = $(this);
		var data = getBannerData();
		var background = workingBanner.css('background');

		bannerData.background = background;
		bannerData.json = data;

		$.ajax({
			url: '/api/banner/data/' + bannerID,
			type: 'PUT',
			data: { data: JSON.stringify(bannerData) },
			timeout: 3000,
			beforeSend: function() {
				that.attr('disabled', 'disabled');
			},
			success: function(response) {
				console.log(response);
			},
			error: function(request, errorType, errorMessage) {
				console.log(request, errorType, errorMessage);
			},
			complete: function() {
				that.removeAttr('disabled');
			}
		});
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvc2F2ZS9zYXZlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24oKSB7XHJcblx0JCgnI3NhdmUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgdGhhdCA9ICQodGhpcyk7XHJcblx0XHR2YXIgZGF0YSA9IGdldEJhbm5lckRhdGEoKTtcclxuXHRcdHZhciBiYWNrZ3JvdW5kID0gd29ya2luZ0Jhbm5lci5jc3MoJ2JhY2tncm91bmQnKTtcclxuXHJcblx0XHRiYW5uZXJEYXRhLmJhY2tncm91bmQgPSBiYWNrZ3JvdW5kO1xyXG5cdFx0YmFubmVyRGF0YS5qc29uID0gZGF0YTtcclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6ICcvYXBpL2Jhbm5lci9kYXRhLycgKyBiYW5uZXJJRCxcclxuXHRcdFx0dHlwZTogJ1BVVCcsXHJcblx0XHRcdGRhdGE6IHsgZGF0YTogSlNPTi5zdHJpbmdpZnkoYmFubmVyRGF0YSkgfSxcclxuXHRcdFx0dGltZW91dDogMzAwMCxcclxuXHRcdFx0YmVmb3JlU2VuZDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dGhhdC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKHJlcXVlc3QsIGVycm9yVHlwZSwgZXJyb3JNZXNzYWdlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2cocmVxdWVzdCwgZXJyb3JUeXBlLCBlcnJvck1lc3NhZ2UpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRjb21wbGV0ZTogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dGhhdC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxufSk7Il0sImZpbGUiOiJoZWFkZXIvc2F2ZS9zYXZlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

$(function() {
	// undo redo button binding
	$('#undo').on('click', function (e) {
		e.preventDefault();
		undo();
	});

	$('#redo').on('click', function (e) {
		e.preventDefault();
		redo();
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvdW5kby1yZWRvL29uVW5kb1JlZG8uanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbigpIHtcclxuXHQvLyB1bmRvIHJlZG8gYnV0dG9uIGJpbmRpbmdcclxuXHQkKCcjdW5kbycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR1bmRvKCk7XHJcblx0fSk7XHJcblxyXG5cdCQoJyNyZWRvJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdHJlZG8oKTtcclxuXHR9KTtcclxufSk7Il0sImZpbGUiOiJoZWFkZXIvdW5kby1yZWRvL29uVW5kb1JlZG8uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var objectStates = [];
var indexOfObjectStates = 0;

function initObjectStates (data) {
	objectStates[0] = data;
}

function updateObjectStates (str) {
	console.log('update');
	
	if (indexOfObjectStates < objectStates.length - 1) {
		for (var i = objectStates.length - 1; i > indexOfObjectStates; i--) {
			objectStates.splice(i , 1);
		}
	}
	
	objectStates.push(str);
	indexOfObjectStates++;
}

function loadPrevState (index) {
	removeAllObjects();
	loadAfterModify(objectStates[index]);
}

function loadNextState (index) {
	removeAllObjects();
	loadAfterModify(objectStates[index]);
}


function undo () {
	if (indexOfObjectStates >= 1) {
		loadPrevState(--indexOfObjectStates);
	}
}

function redo () {
	if (indexOfObjectStates < objectStates.length - 1) {
		loadNextState(++indexOfObjectStates);
	}
}


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvdW5kby1yZWRvL3VuZG9SZWRvLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBvYmplY3RTdGF0ZXMgPSBbXTtcclxudmFyIGluZGV4T2ZPYmplY3RTdGF0ZXMgPSAwO1xyXG5cclxuZnVuY3Rpb24gaW5pdE9iamVjdFN0YXRlcyAoZGF0YSkge1xyXG5cdG9iamVjdFN0YXRlc1swXSA9IGRhdGE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZU9iamVjdFN0YXRlcyAoc3RyKSB7XHJcblx0Y29uc29sZS5sb2coJ3VwZGF0ZScpO1xyXG5cdFxyXG5cdGlmIChpbmRleE9mT2JqZWN0U3RhdGVzIDwgb2JqZWN0U3RhdGVzLmxlbmd0aCAtIDEpIHtcclxuXHRcdGZvciAodmFyIGkgPSBvYmplY3RTdGF0ZXMubGVuZ3RoIC0gMTsgaSA+IGluZGV4T2ZPYmplY3RTdGF0ZXM7IGktLSkge1xyXG5cdFx0XHRvYmplY3RTdGF0ZXMuc3BsaWNlKGkgLCAxKTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0b2JqZWN0U3RhdGVzLnB1c2goc3RyKTtcclxuXHRpbmRleE9mT2JqZWN0U3RhdGVzKys7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRQcmV2U3RhdGUgKGluZGV4KSB7XHJcblx0cmVtb3ZlQWxsT2JqZWN0cygpO1xyXG5cdGxvYWRBZnRlck1vZGlmeShvYmplY3RTdGF0ZXNbaW5kZXhdKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZE5leHRTdGF0ZSAoaW5kZXgpIHtcclxuXHRyZW1vdmVBbGxPYmplY3RzKCk7XHJcblx0bG9hZEFmdGVyTW9kaWZ5KG9iamVjdFN0YXRlc1tpbmRleF0pO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gdW5kbyAoKSB7XHJcblx0aWYgKGluZGV4T2ZPYmplY3RTdGF0ZXMgPj0gMSkge1xyXG5cdFx0bG9hZFByZXZTdGF0ZSgtLWluZGV4T2ZPYmplY3RTdGF0ZXMpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVkbyAoKSB7XHJcblx0aWYgKGluZGV4T2ZPYmplY3RTdGF0ZXMgPCBvYmplY3RTdGF0ZXMubGVuZ3RoIC0gMSkge1xyXG5cdFx0bG9hZE5leHRTdGF0ZSgrK2luZGV4T2ZPYmplY3RTdGF0ZXMpO1xyXG5cdH1cclxufVxyXG5cclxuIl0sImZpbGUiOiJoZWFkZXIvdW5kby1yZWRvL3VuZG9SZWRvLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

$(function() {
	var scale = 1;
	var scaleFactor = 1.1;
	$('#zoom-in').on('click', function() {
		scale *= scaleFactor;
		slideHeart.css({
			'transform': 'scale('+ scale +')'
		});
	});

	$('#zoom-out').on('click', function() {
		scale /= scaleFactor;
		slideHeart.css({
			'transform': 'scale('+ scale +')'
		});
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWFkZXIvem9vbS96b29tLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24oKSB7XHJcblx0dmFyIHNjYWxlID0gMTtcclxuXHR2YXIgc2NhbGVGYWN0b3IgPSAxLjE7XHJcblx0JCgnI3pvb20taW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdHNjYWxlICo9IHNjYWxlRmFjdG9yO1xyXG5cdFx0c2xpZGVIZWFydC5jc3Moe1xyXG5cdFx0XHQndHJhbnNmb3JtJzogJ3NjYWxlKCcrIHNjYWxlICsnKSdcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcjem9vbS1vdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdHNjYWxlIC89IHNjYWxlRmFjdG9yO1xyXG5cdFx0c2xpZGVIZWFydC5jc3Moe1xyXG5cdFx0XHQndHJhbnNmb3JtJzogJ3NjYWxlKCcrIHNjYWxlICsnKSdcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59KTsiXSwiZmlsZSI6ImhlYWRlci96b29tL3pvb20uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

function addAudio(slide, src, width, height, style, freetrans, animation, clone) {
	var random = generateRandom(slide);
	var x = random.x;
	var y = random.y;
	var width  = width ? width: 50;
	var height = height ? height: 50;

	var audio = $('<img></img>');

	audio.attr({
		src: '/images/audioplaceholder.png',
		width: width,
		height: height,
		class: 'ft-widget'
	});

	audio.data('audio-src', src);
	
	audio.attr({
		'id': ++lastObjectID,
		'data-active': true
	});

	slide.append(audio);


	if (groupArr.length > 0) 
		removeActiveObject();

	groupArr.push(audio);

	if(!style) {
		audio.freetrans({
			x: x,
			y: y
		});
	} else if(clone) {
		var css = buildCss(style);
		var zInd = Number(css['z-index']);
		lastZindex = zInd > lastZindex ? zInd : lastZindex;
		var rand = Math.random() * 100;
		css.top = Number(css.top.split('px')[0]) + rand;
		css.left = Number(css.left.split('px')[0]) + rand;
		freetrans.x += rand;
		freetrans.y += rand;
		audio.freetrans(freetrans).css(css)
	} else {
		var css = buildCss(style);
		var zInd = Number(css['z-index']);
		// var top = parseInt(css['top']) + Math.floor(Math.random() * (30 + 30 + 1)) -30;
		// var left = parseInt(css['left']) + Math.floor(Math.random() * (30 + 30 + 1)) -30;
		// css['top'] = y = top;
		// css['left'] = x = left;
		lastZindex = zInd > lastZindex ? zInd : lastZindex;

		audio.freetrans(freetrans).css(css);
	}
	audio.css('z-index', lastZindex);

	audio.data('type', 'audio');

	audio.parent('.ft-container').attr('data-active', true);
	var controls = audio.siblings('.ft-controls') 
	controls.css('z-index', lastZindex);
	var top = controls.position().top - 5;
	var left = controls.position().left + controls.width() + 25;

	if (audio.parent('.ft-container').siblings('.shape-panel').html()) {
		activateControlPanel(audio, top, left);
	} else {
		addControlPanel(audio, top, left);
	}
	
	lastZindex++;

	bindOnModifiedEvent(audio[0]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyL2F1ZGlvL2FkZEF1ZGlvLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGFkZEF1ZGlvKHNsaWRlLCBzcmMsIHdpZHRoLCBoZWlnaHQsIHN0eWxlLCBmcmVldHJhbnMsIGFuaW1hdGlvbiwgY2xvbmUpIHtcclxuXHR2YXIgcmFuZG9tID0gZ2VuZXJhdGVSYW5kb20oc2xpZGUpO1xyXG5cdHZhciB4ID0gcmFuZG9tLng7XHJcblx0dmFyIHkgPSByYW5kb20ueTtcclxuXHR2YXIgd2lkdGggID0gd2lkdGggPyB3aWR0aDogNTA7XHJcblx0dmFyIGhlaWdodCA9IGhlaWdodCA/IGhlaWdodDogNTA7XHJcblxyXG5cdHZhciBhdWRpbyA9ICQoJzxpbWc+PC9pbWc+Jyk7XHJcblxyXG5cdGF1ZGlvLmF0dHIoe1xyXG5cdFx0c3JjOiAnL2ltYWdlcy9hdWRpb3BsYWNlaG9sZGVyLnBuZycsXHJcblx0XHR3aWR0aDogd2lkdGgsXHJcblx0XHRoZWlnaHQ6IGhlaWdodCxcclxuXHRcdGNsYXNzOiAnZnQtd2lkZ2V0J1xyXG5cdH0pO1xyXG5cclxuXHRhdWRpby5kYXRhKCdhdWRpby1zcmMnLCBzcmMpO1xyXG5cdFxyXG5cdGF1ZGlvLmF0dHIoe1xyXG5cdFx0J2lkJzogKytsYXN0T2JqZWN0SUQsXHJcblx0XHQnZGF0YS1hY3RpdmUnOiB0cnVlXHJcblx0fSk7XHJcblxyXG5cdHNsaWRlLmFwcGVuZChhdWRpbyk7XHJcblxyXG5cclxuXHRpZiAoZ3JvdXBBcnIubGVuZ3RoID4gMCkgXHJcblx0XHRyZW1vdmVBY3RpdmVPYmplY3QoKTtcclxuXHJcblx0Z3JvdXBBcnIucHVzaChhdWRpbyk7XHJcblxyXG5cdGlmKCFzdHlsZSkge1xyXG5cdFx0YXVkaW8uZnJlZXRyYW5zKHtcclxuXHRcdFx0eDogeCxcclxuXHRcdFx0eTogeVxyXG5cdFx0fSk7XHJcblx0fSBlbHNlIGlmKGNsb25lKSB7XHJcblx0XHR2YXIgY3NzID0gYnVpbGRDc3Moc3R5bGUpO1xyXG5cdFx0dmFyIHpJbmQgPSBOdW1iZXIoY3NzWyd6LWluZGV4J10pO1xyXG5cdFx0bGFzdFppbmRleCA9IHpJbmQgPiBsYXN0WmluZGV4ID8gekluZCA6IGxhc3RaaW5kZXg7XHJcblx0XHR2YXIgcmFuZCA9IE1hdGgucmFuZG9tKCkgKiAxMDA7XHJcblx0XHRjc3MudG9wID0gTnVtYmVyKGNzcy50b3Auc3BsaXQoJ3B4JylbMF0pICsgcmFuZDtcclxuXHRcdGNzcy5sZWZ0ID0gTnVtYmVyKGNzcy5sZWZ0LnNwbGl0KCdweCcpWzBdKSArIHJhbmQ7XHJcblx0XHRmcmVldHJhbnMueCArPSByYW5kO1xyXG5cdFx0ZnJlZXRyYW5zLnkgKz0gcmFuZDtcclxuXHRcdGF1ZGlvLmZyZWV0cmFucyhmcmVldHJhbnMpLmNzcyhjc3MpXHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3MgPSBidWlsZENzcyhzdHlsZSk7XHJcblx0XHR2YXIgekluZCA9IE51bWJlcihjc3NbJ3otaW5kZXgnXSk7XHJcblx0XHQvLyB2YXIgdG9wID0gcGFyc2VJbnQoY3NzWyd0b3AnXSkgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMzAgKyAzMCArIDEpKSAtMzA7XHJcblx0XHQvLyB2YXIgbGVmdCA9IHBhcnNlSW50KGNzc1snbGVmdCddKSArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgzMCArIDMwICsgMSkpIC0zMDtcclxuXHRcdC8vIGNzc1sndG9wJ10gPSB5ID0gdG9wO1xyXG5cdFx0Ly8gY3NzWydsZWZ0J10gPSB4ID0gbGVmdDtcclxuXHRcdGxhc3RaaW5kZXggPSB6SW5kID4gbGFzdFppbmRleCA/IHpJbmQgOiBsYXN0WmluZGV4O1xyXG5cclxuXHRcdGF1ZGlvLmZyZWV0cmFucyhmcmVldHJhbnMpLmNzcyhjc3MpO1xyXG5cdH1cclxuXHRhdWRpby5jc3MoJ3otaW5kZXgnLCBsYXN0WmluZGV4KTtcclxuXHJcblx0YXVkaW8uZGF0YSgndHlwZScsICdhdWRpbycpO1xyXG5cclxuXHRhdWRpby5wYXJlbnQoJy5mdC1jb250YWluZXInKS5hdHRyKCdkYXRhLWFjdGl2ZScsIHRydWUpO1xyXG5cdHZhciBjb250cm9scyA9IGF1ZGlvLnNpYmxpbmdzKCcuZnQtY29udHJvbHMnKSBcclxuXHRjb250cm9scy5jc3MoJ3otaW5kZXgnLCBsYXN0WmluZGV4KTtcclxuXHR2YXIgdG9wID0gY29udHJvbHMucG9zaXRpb24oKS50b3AgLSA1O1xyXG5cdHZhciBsZWZ0ID0gY29udHJvbHMucG9zaXRpb24oKS5sZWZ0ICsgY29udHJvbHMud2lkdGgoKSArIDI1O1xyXG5cclxuXHRpZiAoYXVkaW8ucGFyZW50KCcuZnQtY29udGFpbmVyJykuc2libGluZ3MoJy5zaGFwZS1wYW5lbCcpLmh0bWwoKSkge1xyXG5cdFx0YWN0aXZhdGVDb250cm9sUGFuZWwoYXVkaW8sIHRvcCwgbGVmdCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGFkZENvbnRyb2xQYW5lbChhdWRpbywgdG9wLCBsZWZ0KTtcclxuXHR9XHJcblx0XHJcblx0bGFzdFppbmRleCsrO1xyXG5cclxuXHRiaW5kT25Nb2RpZmllZEV2ZW50KGF1ZGlvWzBdKTtcclxufSJdLCJmaWxlIjoic2lkZWJhci9hdWRpby9hZGRBdWRpby5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var Audio = function(tag, src, width, height, style, freetrans, animation) {
	this.tag		= tag;
	this.src		= src;
	this.width		= width;
	this.height		= height;
	this.style		= style;
	this.freetrans	= freetrans;
	this.animation 	= animation;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyL2F1ZGlvL0F1ZGlvLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBBdWRpbyA9IGZ1bmN0aW9uKHRhZywgc3JjLCB3aWR0aCwgaGVpZ2h0LCBzdHlsZSwgZnJlZXRyYW5zLCBhbmltYXRpb24pIHtcclxuXHR0aGlzLnRhZ1x0XHQ9IHRhZztcclxuXHR0aGlzLnNyY1x0XHQ9IHNyYztcclxuXHR0aGlzLndpZHRoXHRcdD0gd2lkdGg7XHJcblx0dGhpcy5oZWlnaHRcdFx0PSBoZWlnaHQ7XHJcblx0dGhpcy5zdHlsZVx0XHQ9IHN0eWxlO1xyXG5cdHRoaXMuZnJlZXRyYW5zXHQ9IGZyZWV0cmFucztcclxuXHR0aGlzLmFuaW1hdGlvbiBcdD0gYW5pbWF0aW9uO1xyXG59OyJdLCJmaWxlIjoic2lkZWJhci9hdWRpby9BdWRpby5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

$(function() {
	$('#activate-uploaded-audios').on('click', function() {
		if($('.uploaded-audios').children().length) {
			return;
		}

		$.get('/s3/audios')
		.then(function(data) {
			var div9 = $('<div class="col-md-9">');
			var div3 = $('<div class="col-md-3">');

			data.forEach(function(i) {
				div9.append('<audio src="https://prezhero.s3.amazonaws.com/'+ i +'" controls="controls">Your browser does not support the audio element.</audio>');
				div3.append('<button class="btn btn-success plus-audio" data-src="https://prezhero.s3.amazonaws.com/'+ i +'"><i class="fa fa-plus"></i></button>');
				$('.uploaded-audios').append(div9);
				$('.uploaded-audios').append(div3);
			});
			updateObjectStates(getSlideData());
		})
		.fail(function(err) {
			console.log('err', err);
		});
	});

	$('#audio').on('click', '.plus-audio', function() {
		var src = $(this).data('src');
		addAudio(slideHeart, src);
		updateObjectStates(getSlideData());
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyL2F1ZGlvL29uQXVkaW8uanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbigpIHtcclxuXHQkKCcjYWN0aXZhdGUtdXBsb2FkZWQtYXVkaW9zJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRpZigkKCcudXBsb2FkZWQtYXVkaW9zJykuY2hpbGRyZW4oKS5sZW5ndGgpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdCQuZ2V0KCcvczMvYXVkaW9zJylcclxuXHRcdC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0dmFyIGRpdjkgPSAkKCc8ZGl2IGNsYXNzPVwiY29sLW1kLTlcIj4nKTtcclxuXHRcdFx0dmFyIGRpdjMgPSAkKCc8ZGl2IGNsYXNzPVwiY29sLW1kLTNcIj4nKTtcclxuXHJcblx0XHRcdGRhdGEuZm9yRWFjaChmdW5jdGlvbihpKSB7XHJcblx0XHRcdFx0ZGl2OS5hcHBlbmQoJzxhdWRpbyBzcmM9XCJodHRwczovL3ByZXpoZXJvLnMzLmFtYXpvbmF3cy5jb20vJysgaSArJ1wiIGNvbnRyb2xzPVwiY29udHJvbHNcIj5Zb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgYXVkaW8gZWxlbWVudC48L2F1ZGlvPicpO1xyXG5cdFx0XHRcdGRpdjMuYXBwZW5kKCc8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIHBsdXMtYXVkaW9cIiBkYXRhLXNyYz1cImh0dHBzOi8vcHJlemhlcm8uczMuYW1hem9uYXdzLmNvbS8nKyBpICsnXCI+PGkgY2xhc3M9XCJmYSBmYS1wbHVzXCI+PC9pPjwvYnV0dG9uPicpO1xyXG5cdFx0XHRcdCQoJy51cGxvYWRlZC1hdWRpb3MnKS5hcHBlbmQoZGl2OSk7XHJcblx0XHRcdFx0JCgnLnVwbG9hZGVkLWF1ZGlvcycpLmFwcGVuZChkaXYzKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHVwZGF0ZU9iamVjdFN0YXRlcyhnZXRTbGlkZURhdGEoKSk7XHJcblx0XHR9KVxyXG5cdFx0LmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdlcnInLCBlcnIpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdCQoJyNhdWRpbycpLm9uKCdjbGljaycsICcucGx1cy1hdWRpbycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHNyYyA9ICQodGhpcykuZGF0YSgnc3JjJyk7XHJcblx0XHRhZGRBdWRpbyhzbGlkZUhlYXJ0LCBzcmMpO1xyXG5cdFx0dXBkYXRlT2JqZWN0U3RhdGVzKGdldFNsaWRlRGF0YSgpKTtcclxuXHR9KTtcclxufSk7Il0sImZpbGUiOiJzaWRlYmFyL2F1ZGlvL29uQXVkaW8uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

function changeBackground(filename) {
	slideHeart.css('background-image', 'url("'+ filename +'")');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyL2JhY2tncm91bmQvYmFja2dyb3VuZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjaGFuZ2VCYWNrZ3JvdW5kKGZpbGVuYW1lKSB7XHJcblx0c2xpZGVIZWFydC5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAndXJsKFwiJysgZmlsZW5hbWUgKydcIiknKTtcclxufTsiXSwiZmlsZSI6InNpZGViYXIvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

// $(function() {
// 	$('#backgroundColPick').colpick({
// 		layout : 'rgb',
// 		submit : false,
// 		onChange : function (hsb,rgb) {
// 			var bgColor = '#'+rgb;
// 			slideHeart.css({
// 				'background-image': 'none'
// 			});
// 			slideHeart.css({
// 				'background-color': bgColor
// 			});
// 		},
// 		onSubmit : function(hsb,hex,rgb,el) {
// 			$('#backgroundColPick').colpickHide();
// 			slideHeart.css({
// 				'background-image': 'none'
// 			});
// 			updateObjectStates(getSlideData());
// 		}
// 	});

// 	$('.background').not('.pick').on('click', function() {
// 		var color = $(this).data('color');

// 		slideHeart.css({
// 			'background-image': 'none'
// 		});
// 		slideHeart.css({
// 			'background-color': color
// 		});
// 		$('body').trigger('slideChange');
// 		updateObjectStates(getSlideData());
// 	});

// 	$('.background-image').on('click', function() {
// 		changeBackground($(this).data('url'));
// 	});

// 	$('.bg-repeat').on('change', function() {
// 		if($(this).is(":checked")) {
// 			slideHeart.css({
// 				'-webkit-background-size': 'auto',
// 				'-moz-background-size': 'auto',
// 				'-o-background-size': 'auto',
// 				'background-size': 'auto',
// 				'background-repeat': 'repeat'
// 			});
// 		} else {
// 			slideHeart.css({
// 				'-webkit-background-size': 'cover',
// 				'-moz-background-size': 'cover',
// 				'-o-background-size': 'cover',
// 				'background-size': 'cover',
// 			});
// 		}
// 	});
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyL2JhY2tncm91bmQvb25CYWNrZ3JvdW5kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vICQoZnVuY3Rpb24oKSB7XHJcbi8vIFx0JCgnI2JhY2tncm91bmRDb2xQaWNrJykuY29scGljayh7XHJcbi8vIFx0XHRsYXlvdXQgOiAncmdiJyxcclxuLy8gXHRcdHN1Ym1pdCA6IGZhbHNlLFxyXG4vLyBcdFx0b25DaGFuZ2UgOiBmdW5jdGlvbiAoaHNiLHJnYikge1xyXG4vLyBcdFx0XHR2YXIgYmdDb2xvciA9ICcjJytyZ2I7XHJcbi8vIFx0XHRcdHNsaWRlSGVhcnQuY3NzKHtcclxuLy8gXHRcdFx0XHQnYmFja2dyb3VuZC1pbWFnZSc6ICdub25lJ1xyXG4vLyBcdFx0XHR9KTtcclxuLy8gXHRcdFx0c2xpZGVIZWFydC5jc3Moe1xyXG4vLyBcdFx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogYmdDb2xvclxyXG4vLyBcdFx0XHR9KTtcclxuLy8gXHRcdH0sXHJcbi8vIFx0XHRvblN1Ym1pdCA6IGZ1bmN0aW9uKGhzYixoZXgscmdiLGVsKSB7XHJcbi8vIFx0XHRcdCQoJyNiYWNrZ3JvdW5kQ29sUGljaycpLmNvbHBpY2tIaWRlKCk7XHJcbi8vIFx0XHRcdHNsaWRlSGVhcnQuY3NzKHtcclxuLy8gXHRcdFx0XHQnYmFja2dyb3VuZC1pbWFnZSc6ICdub25lJ1xyXG4vLyBcdFx0XHR9KTtcclxuLy8gXHRcdFx0dXBkYXRlT2JqZWN0U3RhdGVzKGdldFNsaWRlRGF0YSgpKTtcclxuLy8gXHRcdH1cclxuLy8gXHR9KTtcclxuXHJcbi8vIFx0JCgnLmJhY2tncm91bmQnKS5ub3QoJy5waWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbi8vIFx0XHR2YXIgY29sb3IgPSAkKHRoaXMpLmRhdGEoJ2NvbG9yJyk7XHJcblxyXG4vLyBcdFx0c2xpZGVIZWFydC5jc3Moe1xyXG4vLyBcdFx0XHQnYmFja2dyb3VuZC1pbWFnZSc6ICdub25lJ1xyXG4vLyBcdFx0fSk7XHJcbi8vIFx0XHRzbGlkZUhlYXJ0LmNzcyh7XHJcbi8vIFx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3JcclxuLy8gXHRcdH0pO1xyXG4vLyBcdFx0JCgnYm9keScpLnRyaWdnZXIoJ3NsaWRlQ2hhbmdlJyk7XHJcbi8vIFx0XHR1cGRhdGVPYmplY3RTdGF0ZXMoZ2V0U2xpZGVEYXRhKCkpO1xyXG4vLyBcdH0pO1xyXG5cclxuLy8gXHQkKCcuYmFja2dyb3VuZC1pbWFnZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4vLyBcdFx0Y2hhbmdlQmFja2dyb3VuZCgkKHRoaXMpLmRhdGEoJ3VybCcpKTtcclxuLy8gXHR9KTtcclxuXHJcbi8vIFx0JCgnLmJnLXJlcGVhdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuLy8gXHRcdGlmKCQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKSkge1xyXG4vLyBcdFx0XHRzbGlkZUhlYXJ0LmNzcyh7XHJcbi8vIFx0XHRcdFx0Jy13ZWJraXQtYmFja2dyb3VuZC1zaXplJzogJ2F1dG8nLFxyXG4vLyBcdFx0XHRcdCctbW96LWJhY2tncm91bmQtc2l6ZSc6ICdhdXRvJyxcclxuLy8gXHRcdFx0XHQnLW8tYmFja2dyb3VuZC1zaXplJzogJ2F1dG8nLFxyXG4vLyBcdFx0XHRcdCdiYWNrZ3JvdW5kLXNpemUnOiAnYXV0bycsXHJcbi8vIFx0XHRcdFx0J2JhY2tncm91bmQtcmVwZWF0JzogJ3JlcGVhdCdcclxuLy8gXHRcdFx0fSk7XHJcbi8vIFx0XHR9IGVsc2Uge1xyXG4vLyBcdFx0XHRzbGlkZUhlYXJ0LmNzcyh7XHJcbi8vIFx0XHRcdFx0Jy13ZWJraXQtYmFja2dyb3VuZC1zaXplJzogJ2NvdmVyJyxcclxuLy8gXHRcdFx0XHQnLW1vei1iYWNrZ3JvdW5kLXNpemUnOiAnY292ZXInLFxyXG4vLyBcdFx0XHRcdCctby1iYWNrZ3JvdW5kLXNpemUnOiAnY292ZXInLFxyXG4vLyBcdFx0XHRcdCdiYWNrZ3JvdW5kLXNpemUnOiAnY292ZXInLFxyXG4vLyBcdFx0XHR9KTtcclxuLy8gXHRcdH1cclxuLy8gXHR9KTtcclxuLy8gfSk7Il0sImZpbGUiOiJzaWRlYmFyL2JhY2tncm91bmQvb25CYWNrZ3JvdW5kLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

function addImage(slide, src, width, height, style, freetrans, animation, clone) {
	var random = generateRandom(slide);
	var x = random.x;
	var y = random.y;
	var width  = width ? width: 200;
	var height = height ? height: 120;

	var img = $('<img></img>');
	
	if(animation) {
		if(animation.enter) {
			img.data('enter-animation', animation.enter.type);
			img.data('enter-start', animation.enter.start);
			img.data('enter-delay', animation.enter.delay);
		}
		if(animation.exit) {
			img.data('exit-animation', animation.exit.type);
			img.data('exit-start', animation.exit.start);
			img.data('exit-delay', animation.exit.delay);
		}		
	}

	img.attr({
		src: src,
		width: width,
		height: height,
		class: 'ft-widget'
	});

	img.data('animation', animation);
	
	img.attr({
		'id': ++lastObjectID,
		'data-active': true
	});
	slide.append(img);

	if (groupArr.length > 0) {
		removeActiveObject();
	}

	groupArr.push(img);

	if(!style) {
		img.freetrans({
			x: x,
			y: y
		});
	} else if(clone) {
		var css = buildCss(style);
		var zInd = Number(css['z-index']);
		lastZindex = zInd > lastZindex ? zInd : lastZindex;
		var rand = Math.random() * 100;
		css.top = Number(css.top.split('px')[0]) + rand;
		css.left = Number(css.left.split('px')[0]) + rand;
		freetrans.x += rand;
		freetrans.y += rand;
		img.freetrans(freetrans).css(css);
	} else {
		var css = buildCss(style);
		var zInd = Number(css['z-index']);
		lastZindex = zInd > lastZindex ? zInd : lastZindex;
		img.freetrans(freetrans).css(css);
	}
	img.css('z-index', lastZindex);

	img.data('type', 'image');
	img.parent('.ft-container').attr('data-active', 'true');
	var controls = img.siblings('.ft-controls');

	var top = controls.position().top - 5;
	var left = controls.position().left + controls.width() + 25;

	if (img.parent('.ft-container').siblings('.shape-panel').html()) {
		activateControlPanel(img, top, left);
	} else {
		addControlPanel(img, top, left);
	}

	lastZindex++;

	bindOnModifiedEvent(img[0]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyL2ltYWdlL2FkZEltYWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGFkZEltYWdlKHNsaWRlLCBzcmMsIHdpZHRoLCBoZWlnaHQsIHN0eWxlLCBmcmVldHJhbnMsIGFuaW1hdGlvbiwgY2xvbmUpIHtcclxuXHR2YXIgcmFuZG9tID0gZ2VuZXJhdGVSYW5kb20oc2xpZGUpO1xyXG5cdHZhciB4ID0gcmFuZG9tLng7XHJcblx0dmFyIHkgPSByYW5kb20ueTtcclxuXHR2YXIgd2lkdGggID0gd2lkdGggPyB3aWR0aDogMjAwO1xyXG5cdHZhciBoZWlnaHQgPSBoZWlnaHQgPyBoZWlnaHQ6IDEyMDtcclxuXHJcblx0dmFyIGltZyA9ICQoJzxpbWc+PC9pbWc+Jyk7XHJcblx0XHJcblx0aWYoYW5pbWF0aW9uKSB7XHJcblx0XHRpZihhbmltYXRpb24uZW50ZXIpIHtcclxuXHRcdFx0aW1nLmRhdGEoJ2VudGVyLWFuaW1hdGlvbicsIGFuaW1hdGlvbi5lbnRlci50eXBlKTtcclxuXHRcdFx0aW1nLmRhdGEoJ2VudGVyLXN0YXJ0JywgYW5pbWF0aW9uLmVudGVyLnN0YXJ0KTtcclxuXHRcdFx0aW1nLmRhdGEoJ2VudGVyLWRlbGF5JywgYW5pbWF0aW9uLmVudGVyLmRlbGF5KTtcclxuXHRcdH1cclxuXHRcdGlmKGFuaW1hdGlvbi5leGl0KSB7XHJcblx0XHRcdGltZy5kYXRhKCdleGl0LWFuaW1hdGlvbicsIGFuaW1hdGlvbi5leGl0LnR5cGUpO1xyXG5cdFx0XHRpbWcuZGF0YSgnZXhpdC1zdGFydCcsIGFuaW1hdGlvbi5leGl0LnN0YXJ0KTtcclxuXHRcdFx0aW1nLmRhdGEoJ2V4aXQtZGVsYXknLCBhbmltYXRpb24uZXhpdC5kZWxheSk7XHJcblx0XHR9XHRcdFxyXG5cdH1cclxuXHJcblx0aW1nLmF0dHIoe1xyXG5cdFx0c3JjOiBzcmMsXHJcblx0XHR3aWR0aDogd2lkdGgsXHJcblx0XHRoZWlnaHQ6IGhlaWdodCxcclxuXHRcdGNsYXNzOiAnZnQtd2lkZ2V0J1xyXG5cdH0pO1xyXG5cclxuXHRpbWcuZGF0YSgnYW5pbWF0aW9uJywgYW5pbWF0aW9uKTtcclxuXHRcclxuXHRpbWcuYXR0cih7XHJcblx0XHQnaWQnOiArK2xhc3RPYmplY3RJRCxcclxuXHRcdCdkYXRhLWFjdGl2ZSc6IHRydWVcclxuXHR9KTtcclxuXHRzbGlkZS5hcHBlbmQoaW1nKTtcclxuXHJcblx0aWYgKGdyb3VwQXJyLmxlbmd0aCA+IDApIHtcclxuXHRcdHJlbW92ZUFjdGl2ZU9iamVjdCgpO1xyXG5cdH1cclxuXHJcblx0Z3JvdXBBcnIucHVzaChpbWcpO1xyXG5cclxuXHRpZighc3R5bGUpIHtcclxuXHRcdGltZy5mcmVldHJhbnMoe1xyXG5cdFx0XHR4OiB4LFxyXG5cdFx0XHR5OiB5XHJcblx0XHR9KTtcclxuXHR9IGVsc2UgaWYoY2xvbmUpIHtcclxuXHRcdHZhciBjc3MgPSBidWlsZENzcyhzdHlsZSk7XHJcblx0XHR2YXIgekluZCA9IE51bWJlcihjc3NbJ3otaW5kZXgnXSk7XHJcblx0XHRsYXN0WmluZGV4ID0gekluZCA+IGxhc3RaaW5kZXggPyB6SW5kIDogbGFzdFppbmRleDtcclxuXHRcdHZhciByYW5kID0gTWF0aC5yYW5kb20oKSAqIDEwMDtcclxuXHRcdGNzcy50b3AgPSBOdW1iZXIoY3NzLnRvcC5zcGxpdCgncHgnKVswXSkgKyByYW5kO1xyXG5cdFx0Y3NzLmxlZnQgPSBOdW1iZXIoY3NzLmxlZnQuc3BsaXQoJ3B4JylbMF0pICsgcmFuZDtcclxuXHRcdGZyZWV0cmFucy54ICs9IHJhbmQ7XHJcblx0XHRmcmVldHJhbnMueSArPSByYW5kO1xyXG5cdFx0aW1nLmZyZWV0cmFucyhmcmVldHJhbnMpLmNzcyhjc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgY3NzID0gYnVpbGRDc3Moc3R5bGUpO1xyXG5cdFx0dmFyIHpJbmQgPSBOdW1iZXIoY3NzWyd6LWluZGV4J10pO1xyXG5cdFx0bGFzdFppbmRleCA9IHpJbmQgPiBsYXN0WmluZGV4ID8gekluZCA6IGxhc3RaaW5kZXg7XHJcblx0XHRpbWcuZnJlZXRyYW5zKGZyZWV0cmFucykuY3NzKGNzcyk7XHJcblx0fVxyXG5cdGltZy5jc3MoJ3otaW5kZXgnLCBsYXN0WmluZGV4KTtcclxuXHJcblx0aW1nLmRhdGEoJ3R5cGUnLCAnaW1hZ2UnKTtcclxuXHRpbWcucGFyZW50KCcuZnQtY29udGFpbmVyJykuYXR0cignZGF0YS1hY3RpdmUnLCAndHJ1ZScpO1xyXG5cdHZhciBjb250cm9scyA9IGltZy5zaWJsaW5ncygnLmZ0LWNvbnRyb2xzJyk7XHJcblxyXG5cdHZhciB0b3AgPSBjb250cm9scy5wb3NpdGlvbigpLnRvcCAtIDU7XHJcblx0dmFyIGxlZnQgPSBjb250cm9scy5wb3NpdGlvbigpLmxlZnQgKyBjb250cm9scy53aWR0aCgpICsgMjU7XHJcblxyXG5cdGlmIChpbWcucGFyZW50KCcuZnQtY29udGFpbmVyJykuc2libGluZ3MoJy5zaGFwZS1wYW5lbCcpLmh0bWwoKSkge1xyXG5cdFx0YWN0aXZhdGVDb250cm9sUGFuZWwoaW1nLCB0b3AsIGxlZnQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRhZGRDb250cm9sUGFuZWwoaW1nLCB0b3AsIGxlZnQpO1xyXG5cdH1cclxuXHJcblx0bGFzdFppbmRleCsrO1xyXG5cclxuXHRiaW5kT25Nb2RpZmllZEV2ZW50KGltZ1swXSk7XHJcbn0iXSwiZmlsZSI6InNpZGViYXIvaW1hZ2UvYWRkSW1hZ2UuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var Image = function(tag, src, width, height, style, freetrans, animation) {
	this.tag		= tag;
	this.src		= src;
	this.width		= width;
	this.height		= height;
	this.style		= style;
	this.freetrans	= freetrans
	this.animation 	= animation;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyL2ltYWdlL0ltYWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBJbWFnZSA9IGZ1bmN0aW9uKHRhZywgc3JjLCB3aWR0aCwgaGVpZ2h0LCBzdHlsZSwgZnJlZXRyYW5zLCBhbmltYXRpb24pIHtcclxuXHR0aGlzLnRhZ1x0XHQ9IHRhZztcclxuXHR0aGlzLnNyY1x0XHQ9IHNyYztcclxuXHR0aGlzLndpZHRoXHRcdD0gd2lkdGg7XHJcblx0dGhpcy5oZWlnaHRcdFx0PSBoZWlnaHQ7XHJcblx0dGhpcy5zdHlsZVx0XHQ9IHN0eWxlO1xyXG5cdHRoaXMuZnJlZXRyYW5zXHQ9IGZyZWV0cmFuc1xyXG5cdHRoaXMuYW5pbWF0aW9uIFx0PSBhbmltYXRpb247XHJcbn07Il0sImZpbGUiOiJzaWRlYmFyL2ltYWdlL0ltYWdlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

var uploadImageWidth;
var uploadImageHeight;

$(function() {
	$('.image-box').on('click', '.bg-image', function() {
		var src = $(this).css('background-image').split('url(')[1].split(')')[0];
		var width = $(this).css('width');
		var height = $(this).css('height');
		addImage(workingBanner, src, width, height);
		updateObjectStates(getBannerData());
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyL2ltYWdlL29uSW1hZ2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIHVwbG9hZEltYWdlV2lkdGg7XHJcbnZhciB1cGxvYWRJbWFnZUhlaWdodDtcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcblx0JCgnLmltYWdlLWJveCcpLm9uKCdjbGljaycsICcuYmctaW1hZ2UnLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBzcmMgPSAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLnNwbGl0KCd1cmwoJylbMV0uc3BsaXQoJyknKVswXTtcclxuXHRcdHZhciB3aWR0aCA9ICQodGhpcykuY3NzKCd3aWR0aCcpO1xyXG5cdFx0dmFyIGhlaWdodCA9ICQodGhpcykuY3NzKCdoZWlnaHQnKTtcclxuXHRcdGFkZEltYWdlKHdvcmtpbmdCYW5uZXIsIHNyYywgd2lkdGgsIGhlaWdodCk7XHJcblx0XHR1cGRhdGVPYmplY3RTdGF0ZXMoZ2V0QmFubmVyRGF0YSgpKTtcclxuXHR9KTtcclxufSk7Il0sImZpbGUiOiJzaWRlYmFyL2ltYWdlL29uSW1hZ2UuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

function addShape(slide, src, width, height, fill, stroke, style, freetrans, animation, clone) {
	var random = generateRandom(slide);
	var x = random.x;
	var y = random.y;

	var width  = width || 90;
	var height = height || 90;

	var shape = $('<div data-src="'+ src +'"><img src="'+ src +'" width="'+ width +'" height="'+ height +'"></img></div>');
	shape.data('fill', fill);
	shape.data('stroke', stroke);
	
	convertSVG(shape.find('img'), fill, stroke, width, height);
	
	if(animation) {
		if(animation.enter) {
			shape.data('enter-animation', animation.enter.type);
			shape.data('enter-start', animation.enter.start);
			shape.data('enter-delay', animation.enter.delay);
		}
		if(animation.exit) {
			shape.data('exit-animation', animation.exit.type);
			shape.data('exit-start', animation.exit.start);
			shape.data('exit-delay', animation.exit.delay);
		}		
	}

	shape.attr({
		width: width,
		height: height,
		class: 'svg-container ft-widget'
	});


	shape.data('animation', animation);

	shape.attr({
		'id': ++lastObjectID,
		'data-active': true
	});

	slide.append(shape);
	
	if (groupArr.length > 0) {
		removeActiveObject();
	}

	groupArr.push(shape);

	if(!style) {
		shape.freetrans({
			x: x,
			y: y
		});
	} else if(clone) {
		var css = buildCss(style);
		var zInd = Number(css['z-index']);
		lastZindex = zInd > lastZindex ? zInd : lastZindex;
		var rand = Math.random() * 100;
		css.top = Number(css.top.split('px')[0]) + rand;
		css.left = Number(css.left.split('px')[0]) + rand;
		freetrans.x = freetrans.x + rand;
		freetrans.y = freetrans.y + rand;
		shape.css(css).freetrans(freetrans);
	} else {
		var css = buildCss(style);
		var zInd = Number(css['z-index']);
		lastZindex = zInd > lastZindex ? zInd : lastZindex;
		shape.freetrans(freetrans).css(css);
	}
	shape.css('z-index', lastZindex);
	
	shape.data('type', 'shape');
	shape.parent('.ft-container').attr('data-active', true);
	
	var controls = shape.siblings('.ft-controls') 
	controls.css('z-index', lastZindex);
	var top = controls.position().top - 5;
	var left = controls.position().left + controls.width() + 25;

	if (shape.parent('.ft-container').siblings('.shape-panel').html()) {
		activateControlPanel(shape, top, left);
	} else {
		addControlPanel(shape, top, left);
	}

	lastZindex++;

	bindOnModifiedEvent(shape[0]);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyL3NoYXBlL2FkZFNoYXBlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGFkZFNoYXBlKHNsaWRlLCBzcmMsIHdpZHRoLCBoZWlnaHQsIGZpbGwsIHN0cm9rZSwgc3R5bGUsIGZyZWV0cmFucywgYW5pbWF0aW9uLCBjbG9uZSkge1xyXG5cdHZhciByYW5kb20gPSBnZW5lcmF0ZVJhbmRvbShzbGlkZSk7XHJcblx0dmFyIHggPSByYW5kb20ueDtcclxuXHR2YXIgeSA9IHJhbmRvbS55O1xyXG5cclxuXHR2YXIgd2lkdGggID0gd2lkdGggfHwgOTA7XHJcblx0dmFyIGhlaWdodCA9IGhlaWdodCB8fCA5MDtcclxuXHJcblx0dmFyIHNoYXBlID0gJCgnPGRpdiBkYXRhLXNyYz1cIicrIHNyYyArJ1wiPjxpbWcgc3JjPVwiJysgc3JjICsnXCIgd2lkdGg9XCInKyB3aWR0aCArJ1wiIGhlaWdodD1cIicrIGhlaWdodCArJ1wiPjwvaW1nPjwvZGl2PicpO1xyXG5cdHNoYXBlLmRhdGEoJ2ZpbGwnLCBmaWxsKTtcclxuXHRzaGFwZS5kYXRhKCdzdHJva2UnLCBzdHJva2UpO1xyXG5cdFxyXG5cdGNvbnZlcnRTVkcoc2hhcGUuZmluZCgnaW1nJyksIGZpbGwsIHN0cm9rZSwgd2lkdGgsIGhlaWdodCk7XHJcblx0XHJcblx0aWYoYW5pbWF0aW9uKSB7XHJcblx0XHRpZihhbmltYXRpb24uZW50ZXIpIHtcclxuXHRcdFx0c2hhcGUuZGF0YSgnZW50ZXItYW5pbWF0aW9uJywgYW5pbWF0aW9uLmVudGVyLnR5cGUpO1xyXG5cdFx0XHRzaGFwZS5kYXRhKCdlbnRlci1zdGFydCcsIGFuaW1hdGlvbi5lbnRlci5zdGFydCk7XHJcblx0XHRcdHNoYXBlLmRhdGEoJ2VudGVyLWRlbGF5JywgYW5pbWF0aW9uLmVudGVyLmRlbGF5KTtcclxuXHRcdH1cclxuXHRcdGlmKGFuaW1hdGlvbi5leGl0KSB7XHJcblx0XHRcdHNoYXBlLmRhdGEoJ2V4aXQtYW5pbWF0aW9uJywgYW5pbWF0aW9uLmV4aXQudHlwZSk7XHJcblx0XHRcdHNoYXBlLmRhdGEoJ2V4aXQtc3RhcnQnLCBhbmltYXRpb24uZXhpdC5zdGFydCk7XHJcblx0XHRcdHNoYXBlLmRhdGEoJ2V4aXQtZGVsYXknLCBhbmltYXRpb24uZXhpdC5kZWxheSk7XHJcblx0XHR9XHRcdFxyXG5cdH1cclxuXHJcblx0c2hhcGUuYXR0cih7XHJcblx0XHR3aWR0aDogd2lkdGgsXHJcblx0XHRoZWlnaHQ6IGhlaWdodCxcclxuXHRcdGNsYXNzOiAnc3ZnLWNvbnRhaW5lciBmdC13aWRnZXQnXHJcblx0fSk7XHJcblxyXG5cclxuXHRzaGFwZS5kYXRhKCdhbmltYXRpb24nLCBhbmltYXRpb24pO1xyXG5cclxuXHRzaGFwZS5hdHRyKHtcclxuXHRcdCdpZCc6ICsrbGFzdE9iamVjdElELFxyXG5cdFx0J2RhdGEtYWN0aXZlJzogdHJ1ZVxyXG5cdH0pO1xyXG5cclxuXHRzbGlkZS5hcHBlbmQoc2hhcGUpO1xyXG5cdFxyXG5cdGlmIChncm91cEFyci5sZW5ndGggPiAwKSB7XHJcblx0XHRyZW1vdmVBY3RpdmVPYmplY3QoKTtcclxuXHR9XHJcblxyXG5cdGdyb3VwQXJyLnB1c2goc2hhcGUpO1xyXG5cclxuXHRpZighc3R5bGUpIHtcclxuXHRcdHNoYXBlLmZyZWV0cmFucyh7XHJcblx0XHRcdHg6IHgsXHJcblx0XHRcdHk6IHlcclxuXHRcdH0pO1xyXG5cdH0gZWxzZSBpZihjbG9uZSkge1xyXG5cdFx0dmFyIGNzcyA9IGJ1aWxkQ3NzKHN0eWxlKTtcclxuXHRcdHZhciB6SW5kID0gTnVtYmVyKGNzc1snei1pbmRleCddKTtcclxuXHRcdGxhc3RaaW5kZXggPSB6SW5kID4gbGFzdFppbmRleCA/IHpJbmQgOiBsYXN0WmluZGV4O1xyXG5cdFx0dmFyIHJhbmQgPSBNYXRoLnJhbmRvbSgpICogMTAwO1xyXG5cdFx0Y3NzLnRvcCA9IE51bWJlcihjc3MudG9wLnNwbGl0KCdweCcpWzBdKSArIHJhbmQ7XHJcblx0XHRjc3MubGVmdCA9IE51bWJlcihjc3MubGVmdC5zcGxpdCgncHgnKVswXSkgKyByYW5kO1xyXG5cdFx0ZnJlZXRyYW5zLnggPSBmcmVldHJhbnMueCArIHJhbmQ7XHJcblx0XHRmcmVldHJhbnMueSA9IGZyZWV0cmFucy55ICsgcmFuZDtcclxuXHRcdHNoYXBlLmNzcyhjc3MpLmZyZWV0cmFucyhmcmVldHJhbnMpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgY3NzID0gYnVpbGRDc3Moc3R5bGUpO1xyXG5cdFx0dmFyIHpJbmQgPSBOdW1iZXIoY3NzWyd6LWluZGV4J10pO1xyXG5cdFx0bGFzdFppbmRleCA9IHpJbmQgPiBsYXN0WmluZGV4ID8gekluZCA6IGxhc3RaaW5kZXg7XHJcblx0XHRzaGFwZS5mcmVldHJhbnMoZnJlZXRyYW5zKS5jc3MoY3NzKTtcclxuXHR9XHJcblx0c2hhcGUuY3NzKCd6LWluZGV4JywgbGFzdFppbmRleCk7XHJcblx0XHJcblx0c2hhcGUuZGF0YSgndHlwZScsICdzaGFwZScpO1xyXG5cdHNoYXBlLnBhcmVudCgnLmZ0LWNvbnRhaW5lcicpLmF0dHIoJ2RhdGEtYWN0aXZlJywgdHJ1ZSk7XHJcblx0XHJcblx0dmFyIGNvbnRyb2xzID0gc2hhcGUuc2libGluZ3MoJy5mdC1jb250cm9scycpIFxyXG5cdGNvbnRyb2xzLmNzcygnei1pbmRleCcsIGxhc3RaaW5kZXgpO1xyXG5cdHZhciB0b3AgPSBjb250cm9scy5wb3NpdGlvbigpLnRvcCAtIDU7XHJcblx0dmFyIGxlZnQgPSBjb250cm9scy5wb3NpdGlvbigpLmxlZnQgKyBjb250cm9scy53aWR0aCgpICsgMjU7XHJcblxyXG5cdGlmIChzaGFwZS5wYXJlbnQoJy5mdC1jb250YWluZXInKS5zaWJsaW5ncygnLnNoYXBlLXBhbmVsJykuaHRtbCgpKSB7XHJcblx0XHRhY3RpdmF0ZUNvbnRyb2xQYW5lbChzaGFwZSwgdG9wLCBsZWZ0KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0YWRkQ29udHJvbFBhbmVsKHNoYXBlLCB0b3AsIGxlZnQpO1xyXG5cdH1cclxuXHJcblx0bGFzdFppbmRleCsrO1xyXG5cclxuXHRiaW5kT25Nb2RpZmllZEV2ZW50KHNoYXBlWzBdKTtcclxufTsiXSwiZmlsZSI6InNpZGViYXIvc2hhcGUvYWRkU2hhcGUuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

$(function() {
	$('.shape-box').on('click', 'img', function() {
		var that = $(this);
		addShape(workingBanner, that.attr('src'));
	});

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyL3NoYXBlL29uU2hhcGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbigpIHtcclxuXHQkKCcuc2hhcGUtYm94Jykub24oJ2NsaWNrJywgJ2ltZycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHRoYXQgPSAkKHRoaXMpO1xyXG5cdFx0YWRkU2hhcGUod29ya2luZ0Jhbm5lciwgdGhhdC5hdHRyKCdzcmMnKSk7XHJcblx0fSk7XHJcblxyXG59KTsiXSwiZmlsZSI6InNpZGViYXIvc2hhcGUvb25TaGFwZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

var Shape = function(tag, src, width, height, fill, stroke, style, freetrans, animation) {
	this.tag		= tag;
	this.src		= src;
	this.width		= width;
	this.height		= height;
	this.fill		= fill;
	this.stroke		= stroke;
	this.style		= style;
	this.freetrans	= freetrans
	this.animation 	= animation;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyL3NoYXBlL1NoYXBlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBTaGFwZSA9IGZ1bmN0aW9uKHRhZywgc3JjLCB3aWR0aCwgaGVpZ2h0LCBmaWxsLCBzdHJva2UsIHN0eWxlLCBmcmVldHJhbnMsIGFuaW1hdGlvbikge1xyXG5cdHRoaXMudGFnXHRcdD0gdGFnO1xyXG5cdHRoaXMuc3JjXHRcdD0gc3JjO1xyXG5cdHRoaXMud2lkdGhcdFx0PSB3aWR0aDtcclxuXHR0aGlzLmhlaWdodFx0XHQ9IGhlaWdodDtcclxuXHR0aGlzLmZpbGxcdFx0PSBmaWxsO1xyXG5cdHRoaXMuc3Ryb2tlXHRcdD0gc3Ryb2tlO1xyXG5cdHRoaXMuc3R5bGVcdFx0PSBzdHlsZTtcclxuXHR0aGlzLmZyZWV0cmFuc1x0PSBmcmVldHJhbnNcclxuXHR0aGlzLmFuaW1hdGlvbiBcdD0gYW5pbWF0aW9uO1xyXG59OyJdLCJmaWxlIjoic2lkZWJhci9zaGFwZS9TaGFwZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

function addText(slide, text, font, width, height, style, animation, clone) {
	var random = generateRandom(slide);
	var x = random.x;
	var y = random.y;

	var textContainer = $('<div class="text-container contenteditable ft-container" contenteditable="false"><div class="editable" contenteditable="true" data-active="true"></div></div>');
	var textArea = textContainer.find('div');

	if(animation) {
		if(animation.enter) {
			textContainer.data('enter-animation', animation.enter.type);
			textContainer.data('enter-start', animation.enter.start);
			textContainer.data('enter-delay', animation.enter.delay);
		}
		if(animation.exit) {
			textContainer.data('exit-animation', animation.exit.type);
			textContainer.data('exit-start', animation.exit.start);
			textContainer.data('exit-delay', animation.exit.delay);
		}		
	}
	textArea.text(text);

	textContainer.append('<div class="ui-resizable-handle ui-resizable-nw" id="nwgrip" styles="z-index:' + lastZindex +';"></div>'+
    '<div class="ui-resizable-handle ui-resizable-ne" id="negrip"></div>'+
    '<div class="ui-resizable-handle ui-resizable-sw" id="swgrip"></div>'+
    '<div class="ui-resizable-handle ui-resizable-se" id="segrip"></div>'+
    '<div class="ui-resizable-handle ui-resizable-n" id="ngrip"></div>'+
    '<div class="ui-resizable-handle ui-resizable-s" id="sgrip"></div>'+
    '<div class="ui-resizable-handle ui-resizable-e" id="egrip"></div>'+
    '<div class="ui-resizable-handle ui-resizable-w" id="wgrip"></div>');

	slide.append(textContainer);
	
	textContainer.css({ 
		'font-family': font,
		'color': '#000000',
	});

	textContainer.data('animation', animation);
	
	textContainer.attr({
		'id': ++lastObjectID,
		'data-active': true
	});

	if (groupArr.length > 0) {
		removeActiveObject();
	}

	groupArr.push(textContainer);

	if(!style) {
		textContainer.css({
			'position': 'absolute',
			'top': y,
			'left': x,
			'font-size': '18px',
			'width': '120px',
			'height': '30px',
		});
	} else if(clone) {
		var css = buildCss(style);
		var zInd = Number(css['z-index']);
		lastZindex = zInd > lastZindex ? zInd : lastZindex;
		var rand = Math.random() * 100;
		css.top = y = Number(css.top.split('px')[0]) + rand;
		css.left = x = Number(css.left.split('px')[0]) + rand;
		textContainer.css(css)
	} else {
		var css = buildCss(style);
		var zInd = Number(css['z-index']);
		lastZindex = zInd > lastZindex ? zInd : lastZindex;
		textContainer.css(css);
	}
	textContainer.css('z-index', lastZindex);

	textContainer.draggable();
	console.log(textContainer);
	textContainer.resizable({
	    handles: {
			'nw': '#nwgrip',
			'ne': '#negrip',
			'sw': '#swgrip',
			'se': '#segrip',
			'n': '#ngrip',
			'e': '#egrip',
			's': '#sgrip',
			'w': '#wgrip'
	    }
	});


	textContainer.data('type', 'text');

	if (textContainer.siblings('.shape-panel').html()) {
		activateControlPanel(textContainer, y, x);
	} else {
		addControlPanel(textContainer, y, x);
	}

	lastZindex++;
	bindOnModifiedEvent(textContainer[0]);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyL3RleHQvYWRkVGV4dGZpZWxkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGFkZFRleHQoc2xpZGUsIHRleHQsIGZvbnQsIHdpZHRoLCBoZWlnaHQsIHN0eWxlLCBhbmltYXRpb24sIGNsb25lKSB7XHJcblx0dmFyIHJhbmRvbSA9IGdlbmVyYXRlUmFuZG9tKHNsaWRlKTtcclxuXHR2YXIgeCA9IHJhbmRvbS54O1xyXG5cdHZhciB5ID0gcmFuZG9tLnk7XHJcblxyXG5cdHZhciB0ZXh0Q29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cInRleHQtY29udGFpbmVyIGNvbnRlbnRlZGl0YWJsZSBmdC1jb250YWluZXJcIiBjb250ZW50ZWRpdGFibGU9XCJmYWxzZVwiPjxkaXYgY2xhc3M9XCJlZGl0YWJsZVwiIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIiBkYXRhLWFjdGl2ZT1cInRydWVcIj48L2Rpdj48L2Rpdj4nKTtcclxuXHR2YXIgdGV4dEFyZWEgPSB0ZXh0Q29udGFpbmVyLmZpbmQoJ2RpdicpO1xyXG5cclxuXHRpZihhbmltYXRpb24pIHtcclxuXHRcdGlmKGFuaW1hdGlvbi5lbnRlcikge1xyXG5cdFx0XHR0ZXh0Q29udGFpbmVyLmRhdGEoJ2VudGVyLWFuaW1hdGlvbicsIGFuaW1hdGlvbi5lbnRlci50eXBlKTtcclxuXHRcdFx0dGV4dENvbnRhaW5lci5kYXRhKCdlbnRlci1zdGFydCcsIGFuaW1hdGlvbi5lbnRlci5zdGFydCk7XHJcblx0XHRcdHRleHRDb250YWluZXIuZGF0YSgnZW50ZXItZGVsYXknLCBhbmltYXRpb24uZW50ZXIuZGVsYXkpO1xyXG5cdFx0fVxyXG5cdFx0aWYoYW5pbWF0aW9uLmV4aXQpIHtcclxuXHRcdFx0dGV4dENvbnRhaW5lci5kYXRhKCdleGl0LWFuaW1hdGlvbicsIGFuaW1hdGlvbi5leGl0LnR5cGUpO1xyXG5cdFx0XHR0ZXh0Q29udGFpbmVyLmRhdGEoJ2V4aXQtc3RhcnQnLCBhbmltYXRpb24uZXhpdC5zdGFydCk7XHJcblx0XHRcdHRleHRDb250YWluZXIuZGF0YSgnZXhpdC1kZWxheScsIGFuaW1hdGlvbi5leGl0LmRlbGF5KTtcclxuXHRcdH1cdFx0XHJcblx0fVxyXG5cdHRleHRBcmVhLnRleHQodGV4dCk7XHJcblxyXG5cdHRleHRDb250YWluZXIuYXBwZW5kKCc8ZGl2IGNsYXNzPVwidWktcmVzaXphYmxlLWhhbmRsZSB1aS1yZXNpemFibGUtbndcIiBpZD1cIm53Z3JpcFwiIHN0eWxlcz1cInotaW5kZXg6JyArIGxhc3RaaW5kZXggKyc7XCI+PC9kaXY+JytcclxuICAgICc8ZGl2IGNsYXNzPVwidWktcmVzaXphYmxlLWhhbmRsZSB1aS1yZXNpemFibGUtbmVcIiBpZD1cIm5lZ3JpcFwiPjwvZGl2PicrXHJcbiAgICAnPGRpdiBjbGFzcz1cInVpLXJlc2l6YWJsZS1oYW5kbGUgdWktcmVzaXphYmxlLXN3XCIgaWQ9XCJzd2dyaXBcIj48L2Rpdj4nK1xyXG4gICAgJzxkaXYgY2xhc3M9XCJ1aS1yZXNpemFibGUtaGFuZGxlIHVpLXJlc2l6YWJsZS1zZVwiIGlkPVwic2VncmlwXCI+PC9kaXY+JytcclxuICAgICc8ZGl2IGNsYXNzPVwidWktcmVzaXphYmxlLWhhbmRsZSB1aS1yZXNpemFibGUtblwiIGlkPVwibmdyaXBcIj48L2Rpdj4nK1xyXG4gICAgJzxkaXYgY2xhc3M9XCJ1aS1yZXNpemFibGUtaGFuZGxlIHVpLXJlc2l6YWJsZS1zXCIgaWQ9XCJzZ3JpcFwiPjwvZGl2PicrXHJcbiAgICAnPGRpdiBjbGFzcz1cInVpLXJlc2l6YWJsZS1oYW5kbGUgdWktcmVzaXphYmxlLWVcIiBpZD1cImVncmlwXCI+PC9kaXY+JytcclxuICAgICc8ZGl2IGNsYXNzPVwidWktcmVzaXphYmxlLWhhbmRsZSB1aS1yZXNpemFibGUtd1wiIGlkPVwid2dyaXBcIj48L2Rpdj4nKTtcclxuXHJcblx0c2xpZGUuYXBwZW5kKHRleHRDb250YWluZXIpO1xyXG5cdFxyXG5cdHRleHRDb250YWluZXIuY3NzKHsgXHJcblx0XHQnZm9udC1mYW1pbHknOiBmb250LFxyXG5cdFx0J2NvbG9yJzogJyMwMDAwMDAnLFxyXG5cdH0pO1xyXG5cclxuXHR0ZXh0Q29udGFpbmVyLmRhdGEoJ2FuaW1hdGlvbicsIGFuaW1hdGlvbik7XHJcblx0XHJcblx0dGV4dENvbnRhaW5lci5hdHRyKHtcclxuXHRcdCdpZCc6ICsrbGFzdE9iamVjdElELFxyXG5cdFx0J2RhdGEtYWN0aXZlJzogdHJ1ZVxyXG5cdH0pO1xyXG5cclxuXHRpZiAoZ3JvdXBBcnIubGVuZ3RoID4gMCkge1xyXG5cdFx0cmVtb3ZlQWN0aXZlT2JqZWN0KCk7XHJcblx0fVxyXG5cclxuXHRncm91cEFyci5wdXNoKHRleHRDb250YWluZXIpO1xyXG5cclxuXHRpZighc3R5bGUpIHtcclxuXHRcdHRleHRDb250YWluZXIuY3NzKHtcclxuXHRcdFx0J3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcclxuXHRcdFx0J3RvcCc6IHksXHJcblx0XHRcdCdsZWZ0JzogeCxcclxuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcxOHB4JyxcclxuXHRcdFx0J3dpZHRoJzogJzEyMHB4JyxcclxuXHRcdFx0J2hlaWdodCc6ICczMHB4JyxcclxuXHRcdH0pO1xyXG5cdH0gZWxzZSBpZihjbG9uZSkge1xyXG5cdFx0dmFyIGNzcyA9IGJ1aWxkQ3NzKHN0eWxlKTtcclxuXHRcdHZhciB6SW5kID0gTnVtYmVyKGNzc1snei1pbmRleCddKTtcclxuXHRcdGxhc3RaaW5kZXggPSB6SW5kID4gbGFzdFppbmRleCA/IHpJbmQgOiBsYXN0WmluZGV4O1xyXG5cdFx0dmFyIHJhbmQgPSBNYXRoLnJhbmRvbSgpICogMTAwO1xyXG5cdFx0Y3NzLnRvcCA9IHkgPSBOdW1iZXIoY3NzLnRvcC5zcGxpdCgncHgnKVswXSkgKyByYW5kO1xyXG5cdFx0Y3NzLmxlZnQgPSB4ID0gTnVtYmVyKGNzcy5sZWZ0LnNwbGl0KCdweCcpWzBdKSArIHJhbmQ7XHJcblx0XHR0ZXh0Q29udGFpbmVyLmNzcyhjc3MpXHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3MgPSBidWlsZENzcyhzdHlsZSk7XHJcblx0XHR2YXIgekluZCA9IE51bWJlcihjc3NbJ3otaW5kZXgnXSk7XHJcblx0XHRsYXN0WmluZGV4ID0gekluZCA+IGxhc3RaaW5kZXggPyB6SW5kIDogbGFzdFppbmRleDtcclxuXHRcdHRleHRDb250YWluZXIuY3NzKGNzcyk7XHJcblx0fVxyXG5cdHRleHRDb250YWluZXIuY3NzKCd6LWluZGV4JywgbGFzdFppbmRleCk7XHJcblxyXG5cdHRleHRDb250YWluZXIuZHJhZ2dhYmxlKCk7XHJcblx0Y29uc29sZS5sb2codGV4dENvbnRhaW5lcik7XHJcblx0dGV4dENvbnRhaW5lci5yZXNpemFibGUoe1xyXG5cdCAgICBoYW5kbGVzOiB7XHJcblx0XHRcdCdudyc6ICcjbndncmlwJyxcclxuXHRcdFx0J25lJzogJyNuZWdyaXAnLFxyXG5cdFx0XHQnc3cnOiAnI3N3Z3JpcCcsXHJcblx0XHRcdCdzZSc6ICcjc2VncmlwJyxcclxuXHRcdFx0J24nOiAnI25ncmlwJyxcclxuXHRcdFx0J2UnOiAnI2VncmlwJyxcclxuXHRcdFx0J3MnOiAnI3NncmlwJyxcclxuXHRcdFx0J3cnOiAnI3dncmlwJ1xyXG5cdCAgICB9XHJcblx0fSk7XHJcblxyXG5cclxuXHR0ZXh0Q29udGFpbmVyLmRhdGEoJ3R5cGUnLCAndGV4dCcpO1xyXG5cclxuXHRpZiAodGV4dENvbnRhaW5lci5zaWJsaW5ncygnLnNoYXBlLXBhbmVsJykuaHRtbCgpKSB7XHJcblx0XHRhY3RpdmF0ZUNvbnRyb2xQYW5lbCh0ZXh0Q29udGFpbmVyLCB5LCB4KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0YWRkQ29udHJvbFBhbmVsKHRleHRDb250YWluZXIsIHksIHgpO1xyXG5cdH1cclxuXHJcblx0bGFzdFppbmRleCsrO1xyXG5cdGJpbmRPbk1vZGlmaWVkRXZlbnQodGV4dENvbnRhaW5lclswXSk7XHJcbn07Il0sImZpbGUiOiJzaWRlYmFyL3RleHQvYWRkVGV4dGZpZWxkLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

$(function() {
	$('.working-board').on('click', '.contenteditable', function(e) {
		$(this).find('div').focus();
		e = e || window.event;
		var caretRange = getMouseEventCaretRange(e);
		// Set a timer to allow the selection to happen and the dust settle first
		window.setTimeout(function() {
		    selectRange(caretRange);
		}, 10);
		return false;
	});

	$('.working-board').on('focus', '.editable', function (e) {
		var div = this;
		window.setTimeout(function() {
			var sel, range;
			if (window.getSelection && document.createRange) {
				range = document.createRange();
				range.selectNodeContents(div);
				range.collapse(true);
				sel = window.getSelection();
				sel.removeAllRanges();
				sel.addRange(range);
			} else if (document.body.createTextRange) {
				range = document.body.createTextRange();
				range.moveToElementText(div);
				range.collapse(true);
				range.select();
			}
		}, 1);
	});

	$('.working-board').on('keyup resize', '.contenteditable', function() {
		var width = $(this).find('.editable').width();
		var height = $(this).find('.editable').height();
		$(this).width(width);
		$(this).height(height);
	});

	$('.text-box h3').on('click', function() {
		var fontFamily = $(this).css('font-family');
		addText(workingBanner, 'Text Field', fontFamily);
		updateObjectStates(getBannerData());
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyL3RleHQvb25UZXh0ZmllbGQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbigpIHtcclxuXHQkKCcud29ya2luZy1ib2FyZCcpLm9uKCdjbGljaycsICcuY29udGVudGVkaXRhYmxlJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0JCh0aGlzKS5maW5kKCdkaXYnKS5mb2N1cygpO1xyXG5cdFx0ZSA9IGUgfHwgd2luZG93LmV2ZW50O1xyXG5cdFx0dmFyIGNhcmV0UmFuZ2UgPSBnZXRNb3VzZUV2ZW50Q2FyZXRSYW5nZShlKTtcclxuXHRcdC8vIFNldCBhIHRpbWVyIHRvIGFsbG93IHRoZSBzZWxlY3Rpb24gdG8gaGFwcGVuIGFuZCB0aGUgZHVzdCBzZXR0bGUgZmlyc3RcclxuXHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0ICAgIHNlbGVjdFJhbmdlKGNhcmV0UmFuZ2UpO1xyXG5cdFx0fSwgMTApO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcud29ya2luZy1ib2FyZCcpLm9uKCdmb2N1cycsICcuZWRpdGFibGUnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyIGRpdiA9IHRoaXM7XHJcblx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHNlbCwgcmFuZ2U7XHJcblx0XHRcdGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uICYmIGRvY3VtZW50LmNyZWF0ZVJhbmdlKSB7XHJcblx0XHRcdFx0cmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG5cdFx0XHRcdHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhkaXYpO1xyXG5cdFx0XHRcdHJhbmdlLmNvbGxhcHNlKHRydWUpO1xyXG5cdFx0XHRcdHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuXHRcdFx0XHRzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcblx0XHRcdFx0c2VsLmFkZFJhbmdlKHJhbmdlKTtcclxuXHRcdFx0fSBlbHNlIGlmIChkb2N1bWVudC5ib2R5LmNyZWF0ZVRleHRSYW5nZSkge1xyXG5cdFx0XHRcdHJhbmdlID0gZG9jdW1lbnQuYm9keS5jcmVhdGVUZXh0UmFuZ2UoKTtcclxuXHRcdFx0XHRyYW5nZS5tb3ZlVG9FbGVtZW50VGV4dChkaXYpO1xyXG5cdFx0XHRcdHJhbmdlLmNvbGxhcHNlKHRydWUpO1xyXG5cdFx0XHRcdHJhbmdlLnNlbGVjdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9LCAxKTtcclxuXHR9KTtcclxuXHJcblx0JCgnLndvcmtpbmctYm9hcmQnKS5vbigna2V5dXAgcmVzaXplJywgJy5jb250ZW50ZWRpdGFibGUnLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciB3aWR0aCA9ICQodGhpcykuZmluZCgnLmVkaXRhYmxlJykud2lkdGgoKTtcclxuXHRcdHZhciBoZWlnaHQgPSAkKHRoaXMpLmZpbmQoJy5lZGl0YWJsZScpLmhlaWdodCgpO1xyXG5cdFx0JCh0aGlzKS53aWR0aCh3aWR0aCk7XHJcblx0XHQkKHRoaXMpLmhlaWdodChoZWlnaHQpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcudGV4dC1ib3ggaDMnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBmb250RmFtaWx5ID0gJCh0aGlzKS5jc3MoJ2ZvbnQtZmFtaWx5Jyk7XHJcblx0XHRhZGRUZXh0KHdvcmtpbmdCYW5uZXIsICdUZXh0IEZpZWxkJywgZm9udEZhbWlseSk7XHJcblx0XHR1cGRhdGVPYmplY3RTdGF0ZXMoZ2V0QmFubmVyRGF0YSgpKTtcclxuXHR9KTtcclxufSk7Il0sImZpbGUiOiJzaWRlYmFyL3RleHQvb25UZXh0ZmllbGQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var TextFiled = function(tag, text, font, width, height, style, freetrans, animation) {
	this.tag		= tag;
	this.text 		= text;
	this.font		= font;
	this.width		= width;
	this.height		= height;
	this.style		= style;
	this.freetrans	= freetrans;
	this.animation 	= animation;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyL3RleHQvVGV4dGZpZWxkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBUZXh0RmlsZWQgPSBmdW5jdGlvbih0YWcsIHRleHQsIGZvbnQsIHdpZHRoLCBoZWlnaHQsIHN0eWxlLCBmcmVldHJhbnMsIGFuaW1hdGlvbikge1xyXG5cdHRoaXMudGFnXHRcdD0gdGFnO1xyXG5cdHRoaXMudGV4dCBcdFx0PSB0ZXh0O1xyXG5cdHRoaXMuZm9udFx0XHQ9IGZvbnQ7XHJcblx0dGhpcy53aWR0aFx0XHQ9IHdpZHRoO1xyXG5cdHRoaXMuaGVpZ2h0XHRcdD0gaGVpZ2h0O1xyXG5cdHRoaXMuc3R5bGVcdFx0PSBzdHlsZTtcclxuXHR0aGlzLmZyZWV0cmFuc1x0PSBmcmVldHJhbnM7XHJcblx0dGhpcy5hbmltYXRpb24gXHQ9IGFuaW1hdGlvbjtcclxufTsiXSwiZmlsZSI6InNpZGViYXIvdGV4dC9UZXh0ZmllbGQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

function addVideo(slide, src, width, height, videoType, style, freetrans, animation, clone) {
	// https://www.youtube.com/watch?v=l1ZEcIbIQGI
	// https://vimeo.com/channels/staffpicks/140767141
	var random = generateRandom(slide);
	var x = random.x;
	var y = random.y;
	var width  = width ? width: 200;
	var height = height ? height: 150;

	var video = $('<img></img>');
	
	if(animation) {
		if(animation.enter) {
			video.data('enter-animation', animation.enter.type);
			video.data('enter-start', animation.enter.start);
			video.data('enter-delay', animation.enter.delay);
		}
		if(animation.exit) {
			video.data('exit-animation', animation.exit.type);
			video.data('exit-start', animation.exit.start);
			video.data('exit-delay', animation.exit.delay);
		}
	}

	video.attr({
		src: '/images/videoplaceholder.jpg',
		width: width,
		height: height,
		class: 'ft-widget'
	});

	video.css('z-index', lastZindex);

	video.data('animation', animation);
	
	video.attr({
		'id': ++lastObjectID,
		'data-active': true
	});
	lastZindex++;

	slide.append(video);
	
	if (groupArr.length > 0) 
		removeActiveObject();

	groupArr.push(video);

	if(!style) {
		video.freetrans({
			x: x,
			y: y
		});
	} else if(clone) {
		var css = buildCss(style);
		var zInd = Number(css['z-index']);
		lastZindex = zInd > lastZindex ? zInd : lastZindex;
		var rand = Math.random() * 100;
		css.top = Number(css.top.split('px')[0]) + rand;
		css.left = Number(css.left.split('px')[0]) + rand;
		freetrans.x += rand;
		freetrans.y += rand;
		video.freetrans(freetrans).css(css)
	} else {
		var css = buildCss(style);
		var zInd = Number(css['z-index']);
		// var top = parseInt(css['top']) + Math.floor(Math.random() * (30 + 30 + 1)) -30;
		// var left = parseInt(css['left']) + Math.floor(Math.random() * (30 + 30 + 1)) -30;
		// css['top'] = y = top;
		// css['left'] = x = left;
		lastZindex = zInd > lastZindex ? zInd : lastZindex;
		video.freetrans(freetrans).css(css)
	}
	video.css('z-index', lastZindex);

	video.data('type', 'video');
	console.log(src);
	video.data('video-src', src);
	video.data('video-type', videoType);
	video.parent('.ft-container').attr('data-active', true);	

	var controls = video.siblings('.ft-controls'); 
	controls.css('z-index', lastZindex);
	
	var top = controls.position().top - 5;
	var left = controls.position().left + controls.width() + 25;

	if (video.parent('.ft-container').siblings('.shape-panel').html()) {
		activateControlPanel(video, top, left);
	} else {
		addControlPanel(video, top, left);
	}

	lastZindex++;

	bindOnModifiedEvent(video[0]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyL3ZpZGVvL2FkZFZpZGVvLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGFkZFZpZGVvKHNsaWRlLCBzcmMsIHdpZHRoLCBoZWlnaHQsIHZpZGVvVHlwZSwgc3R5bGUsIGZyZWV0cmFucywgYW5pbWF0aW9uLCBjbG9uZSkge1xyXG5cdC8vIGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9bDFaRWNJYklRR0lcclxuXHQvLyBodHRwczovL3ZpbWVvLmNvbS9jaGFubmVscy9zdGFmZnBpY2tzLzE0MDc2NzE0MVxyXG5cdHZhciByYW5kb20gPSBnZW5lcmF0ZVJhbmRvbShzbGlkZSk7XHJcblx0dmFyIHggPSByYW5kb20ueDtcclxuXHR2YXIgeSA9IHJhbmRvbS55O1xyXG5cdHZhciB3aWR0aCAgPSB3aWR0aCA/IHdpZHRoOiAyMDA7XHJcblx0dmFyIGhlaWdodCA9IGhlaWdodCA/IGhlaWdodDogMTUwO1xyXG5cclxuXHR2YXIgdmlkZW8gPSAkKCc8aW1nPjwvaW1nPicpO1xyXG5cdFxyXG5cdGlmKGFuaW1hdGlvbikge1xyXG5cdFx0aWYoYW5pbWF0aW9uLmVudGVyKSB7XHJcblx0XHRcdHZpZGVvLmRhdGEoJ2VudGVyLWFuaW1hdGlvbicsIGFuaW1hdGlvbi5lbnRlci50eXBlKTtcclxuXHRcdFx0dmlkZW8uZGF0YSgnZW50ZXItc3RhcnQnLCBhbmltYXRpb24uZW50ZXIuc3RhcnQpO1xyXG5cdFx0XHR2aWRlby5kYXRhKCdlbnRlci1kZWxheScsIGFuaW1hdGlvbi5lbnRlci5kZWxheSk7XHJcblx0XHR9XHJcblx0XHRpZihhbmltYXRpb24uZXhpdCkge1xyXG5cdFx0XHR2aWRlby5kYXRhKCdleGl0LWFuaW1hdGlvbicsIGFuaW1hdGlvbi5leGl0LnR5cGUpO1xyXG5cdFx0XHR2aWRlby5kYXRhKCdleGl0LXN0YXJ0JywgYW5pbWF0aW9uLmV4aXQuc3RhcnQpO1xyXG5cdFx0XHR2aWRlby5kYXRhKCdleGl0LWRlbGF5JywgYW5pbWF0aW9uLmV4aXQuZGVsYXkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dmlkZW8uYXR0cih7XHJcblx0XHRzcmM6ICcvaW1hZ2VzL3ZpZGVvcGxhY2Vob2xkZXIuanBnJyxcclxuXHRcdHdpZHRoOiB3aWR0aCxcclxuXHRcdGhlaWdodDogaGVpZ2h0LFxyXG5cdFx0Y2xhc3M6ICdmdC13aWRnZXQnXHJcblx0fSk7XHJcblxyXG5cdHZpZGVvLmNzcygnei1pbmRleCcsIGxhc3RaaW5kZXgpO1xyXG5cclxuXHR2aWRlby5kYXRhKCdhbmltYXRpb24nLCBhbmltYXRpb24pO1xyXG5cdFxyXG5cdHZpZGVvLmF0dHIoe1xyXG5cdFx0J2lkJzogKytsYXN0T2JqZWN0SUQsXHJcblx0XHQnZGF0YS1hY3RpdmUnOiB0cnVlXHJcblx0fSk7XHJcblx0bGFzdFppbmRleCsrO1xyXG5cclxuXHRzbGlkZS5hcHBlbmQodmlkZW8pO1xyXG5cdFxyXG5cdGlmIChncm91cEFyci5sZW5ndGggPiAwKSBcclxuXHRcdHJlbW92ZUFjdGl2ZU9iamVjdCgpO1xyXG5cclxuXHRncm91cEFyci5wdXNoKHZpZGVvKTtcclxuXHJcblx0aWYoIXN0eWxlKSB7XHJcblx0XHR2aWRlby5mcmVldHJhbnMoe1xyXG5cdFx0XHR4OiB4LFxyXG5cdFx0XHR5OiB5XHJcblx0XHR9KTtcclxuXHR9IGVsc2UgaWYoY2xvbmUpIHtcclxuXHRcdHZhciBjc3MgPSBidWlsZENzcyhzdHlsZSk7XHJcblx0XHR2YXIgekluZCA9IE51bWJlcihjc3NbJ3otaW5kZXgnXSk7XHJcblx0XHRsYXN0WmluZGV4ID0gekluZCA+IGxhc3RaaW5kZXggPyB6SW5kIDogbGFzdFppbmRleDtcclxuXHRcdHZhciByYW5kID0gTWF0aC5yYW5kb20oKSAqIDEwMDtcclxuXHRcdGNzcy50b3AgPSBOdW1iZXIoY3NzLnRvcC5zcGxpdCgncHgnKVswXSkgKyByYW5kO1xyXG5cdFx0Y3NzLmxlZnQgPSBOdW1iZXIoY3NzLmxlZnQuc3BsaXQoJ3B4JylbMF0pICsgcmFuZDtcclxuXHRcdGZyZWV0cmFucy54ICs9IHJhbmQ7XHJcblx0XHRmcmVldHJhbnMueSArPSByYW5kO1xyXG5cdFx0dmlkZW8uZnJlZXRyYW5zKGZyZWV0cmFucykuY3NzKGNzcylcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGNzcyA9IGJ1aWxkQ3NzKHN0eWxlKTtcclxuXHRcdHZhciB6SW5kID0gTnVtYmVyKGNzc1snei1pbmRleCddKTtcclxuXHRcdC8vIHZhciB0b3AgPSBwYXJzZUludChjc3NbJ3RvcCddKSArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgzMCArIDMwICsgMSkpIC0zMDtcclxuXHRcdC8vIHZhciBsZWZ0ID0gcGFyc2VJbnQoY3NzWydsZWZ0J10pICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDMwICsgMzAgKyAxKSkgLTMwO1xyXG5cdFx0Ly8gY3NzWyd0b3AnXSA9IHkgPSB0b3A7XHJcblx0XHQvLyBjc3NbJ2xlZnQnXSA9IHggPSBsZWZ0O1xyXG5cdFx0bGFzdFppbmRleCA9IHpJbmQgPiBsYXN0WmluZGV4ID8gekluZCA6IGxhc3RaaW5kZXg7XHJcblx0XHR2aWRlby5mcmVldHJhbnMoZnJlZXRyYW5zKS5jc3MoY3NzKVxyXG5cdH1cclxuXHR2aWRlby5jc3MoJ3otaW5kZXgnLCBsYXN0WmluZGV4KTtcclxuXHJcblx0dmlkZW8uZGF0YSgndHlwZScsICd2aWRlbycpO1xyXG5cdGNvbnNvbGUubG9nKHNyYyk7XHJcblx0dmlkZW8uZGF0YSgndmlkZW8tc3JjJywgc3JjKTtcclxuXHR2aWRlby5kYXRhKCd2aWRlby10eXBlJywgdmlkZW9UeXBlKTtcclxuXHR2aWRlby5wYXJlbnQoJy5mdC1jb250YWluZXInKS5hdHRyKCdkYXRhLWFjdGl2ZScsIHRydWUpO1x0XHJcblxyXG5cdHZhciBjb250cm9scyA9IHZpZGVvLnNpYmxpbmdzKCcuZnQtY29udHJvbHMnKTsgXHJcblx0Y29udHJvbHMuY3NzKCd6LWluZGV4JywgbGFzdFppbmRleCk7XHJcblx0XHJcblx0dmFyIHRvcCA9IGNvbnRyb2xzLnBvc2l0aW9uKCkudG9wIC0gNTtcclxuXHR2YXIgbGVmdCA9IGNvbnRyb2xzLnBvc2l0aW9uKCkubGVmdCArIGNvbnRyb2xzLndpZHRoKCkgKyAyNTtcclxuXHJcblx0aWYgKHZpZGVvLnBhcmVudCgnLmZ0LWNvbnRhaW5lcicpLnNpYmxpbmdzKCcuc2hhcGUtcGFuZWwnKS5odG1sKCkpIHtcclxuXHRcdGFjdGl2YXRlQ29udHJvbFBhbmVsKHZpZGVvLCB0b3AsIGxlZnQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRhZGRDb250cm9sUGFuZWwodmlkZW8sIHRvcCwgbGVmdCk7XHJcblx0fVxyXG5cclxuXHRsYXN0WmluZGV4Kys7XHJcblxyXG5cdGJpbmRPbk1vZGlmaWVkRXZlbnQodmlkZW9bMF0pO1xyXG59Il0sImZpbGUiOiJzaWRlYmFyL3ZpZGVvL2FkZFZpZGVvLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

$(function() {
	$('.insert-yt-video').on('click', function() {
		var yvlink = $('.yvlink').val();
		var valid = validateYoutubeVimeo(yvlink);
		var src;
		var videoType;
		var width;
		var height;

		if(valid) {
			var YTID = getYTID(yvlink);
			if(YTID) {
				// "https://www.youtube.com/embed/"+myId+"?rel=0&start="+ start_time +"&showinfo=0&end="+ end_time +"&autoplay="+autoplay+"&controls="+controls
				src = 'https://www.youtube.com/embed/'+ YTID +'?rel=0&showinfo=0&autoplay=0&controls=0';
				videoType = 'youtube';
				width = 560;
				height = 315;
			} else {
				var VID = getVimeoID(yvlink);
				// src = "https://player.vimeo.com/video/"+videoId+"#t="+ start_time +"?autoplay="+autoplay+"&controls="+controls;
				src = 'https://player.vimeo.com/video/'+ VID +'?autoplay=false&controls=false';
				videoType = 'vimeo';
				width = 500;
				height = 264;
			}
			addVideo(workingBanner, src, width, height, videoType);
			updateObjectStates(getBannerData());
		} else {
			showValidation($('.yv-validation'));
		}
	});

	$('#video').on('click', '.plus-video', function() {
		console.log('addvideo', $(this).data('src'));
		addVideo(workingBanner, $(this).data('src'), 300, 150, 'upload');
		updateObjectStates(getBannerData());
	});

	$('#activate-uploaded-videos').on('click', function() {
		if($('.uploaded-videos').children().length) {
			return;
		}

		$.get('/s3/videos')
		.then(function(data) {
			data.forEach(function(i) {
				$('.uploaded-videos').append('<video width="300" height="150" src="https://prezhero.s3.amazonaws.com/'+ i +'" controls="controls">Your browser does not support the video element.</video>');
				$('.uploaded-videos').append('<button class="btn btn-block btn-success plus-video" data-src="https://prezhero.s3.amazonaws.com/'+ i +'"><i class="fa fa-plus"></i></button>');
			});
			updateObjectStates(getBannerData());
		})
		.fail(function(err) {
			console.log('err', err);
		});
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyL3ZpZGVvL29uVklkZW8uanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbigpIHtcclxuXHQkKCcuaW5zZXJ0LXl0LXZpZGVvJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgeXZsaW5rID0gJCgnLnl2bGluaycpLnZhbCgpO1xyXG5cdFx0dmFyIHZhbGlkID0gdmFsaWRhdGVZb3V0dWJlVmltZW8oeXZsaW5rKTtcclxuXHRcdHZhciBzcmM7XHJcblx0XHR2YXIgdmlkZW9UeXBlO1xyXG5cdFx0dmFyIHdpZHRoO1xyXG5cdFx0dmFyIGhlaWdodDtcclxuXHJcblx0XHRpZih2YWxpZCkge1xyXG5cdFx0XHR2YXIgWVRJRCA9IGdldFlUSUQoeXZsaW5rKTtcclxuXHRcdFx0aWYoWVRJRCkge1xyXG5cdFx0XHRcdC8vIFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvXCIrbXlJZCtcIj9yZWw9MCZzdGFydD1cIisgc3RhcnRfdGltZSArXCImc2hvd2luZm89MCZlbmQ9XCIrIGVuZF90aW1lICtcIiZhdXRvcGxheT1cIithdXRvcGxheStcIiZjb250cm9scz1cIitjb250cm9sc1xyXG5cdFx0XHRcdHNyYyA9ICdodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8nKyBZVElEICsnP3JlbD0wJnNob3dpbmZvPTAmYXV0b3BsYXk9MCZjb250cm9scz0wJztcclxuXHRcdFx0XHR2aWRlb1R5cGUgPSAneW91dHViZSc7XHJcblx0XHRcdFx0d2lkdGggPSA1NjA7XHJcblx0XHRcdFx0aGVpZ2h0ID0gMzE1O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhciBWSUQgPSBnZXRWaW1lb0lEKHl2bGluayk7XHJcblx0XHRcdFx0Ly8gc3JjID0gXCJodHRwczovL3BsYXllci52aW1lby5jb20vdmlkZW8vXCIrdmlkZW9JZCtcIiN0PVwiKyBzdGFydF90aW1lICtcIj9hdXRvcGxheT1cIithdXRvcGxheStcIiZjb250cm9scz1cIitjb250cm9scztcclxuXHRcdFx0XHRzcmMgPSAnaHR0cHM6Ly9wbGF5ZXIudmltZW8uY29tL3ZpZGVvLycrIFZJRCArJz9hdXRvcGxheT1mYWxzZSZjb250cm9scz1mYWxzZSc7XHJcblx0XHRcdFx0dmlkZW9UeXBlID0gJ3ZpbWVvJztcclxuXHRcdFx0XHR3aWR0aCA9IDUwMDtcclxuXHRcdFx0XHRoZWlnaHQgPSAyNjQ7XHJcblx0XHRcdH1cclxuXHRcdFx0YWRkVmlkZW8od29ya2luZ0Jhbm5lciwgc3JjLCB3aWR0aCwgaGVpZ2h0LCB2aWRlb1R5cGUpO1xyXG5cdFx0XHR1cGRhdGVPYmplY3RTdGF0ZXMoZ2V0QmFubmVyRGF0YSgpKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHNob3dWYWxpZGF0aW9uKCQoJy55di12YWxpZGF0aW9uJykpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQkKCcjdmlkZW8nKS5vbignY2xpY2snLCAnLnBsdXMtdmlkZW8nLCBmdW5jdGlvbigpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdhZGR2aWRlbycsICQodGhpcykuZGF0YSgnc3JjJykpO1xyXG5cdFx0YWRkVmlkZW8od29ya2luZ0Jhbm5lciwgJCh0aGlzKS5kYXRhKCdzcmMnKSwgMzAwLCAxNTAsICd1cGxvYWQnKTtcclxuXHRcdHVwZGF0ZU9iamVjdFN0YXRlcyhnZXRCYW5uZXJEYXRhKCkpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcjYWN0aXZhdGUtdXBsb2FkZWQtdmlkZW9zJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRpZigkKCcudXBsb2FkZWQtdmlkZW9zJykuY2hpbGRyZW4oKS5sZW5ndGgpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdCQuZ2V0KCcvczMvdmlkZW9zJylcclxuXHRcdC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0ZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGkpIHtcclxuXHRcdFx0XHQkKCcudXBsb2FkZWQtdmlkZW9zJykuYXBwZW5kKCc8dmlkZW8gd2lkdGg9XCIzMDBcIiBoZWlnaHQ9XCIxNTBcIiBzcmM9XCJodHRwczovL3ByZXpoZXJvLnMzLmFtYXpvbmF3cy5jb20vJysgaSArJ1wiIGNvbnRyb2xzPVwiY29udHJvbHNcIj5Zb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgdmlkZW8gZWxlbWVudC48L3ZpZGVvPicpO1xyXG5cdFx0XHRcdCQoJy51cGxvYWRlZC12aWRlb3MnKS5hcHBlbmQoJzxidXR0b24gY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1zdWNjZXNzIHBsdXMtdmlkZW9cIiBkYXRhLXNyYz1cImh0dHBzOi8vcHJlemhlcm8uczMuYW1hem9uYXdzLmNvbS8nKyBpICsnXCI+PGkgY2xhc3M9XCJmYSBmYS1wbHVzXCI+PC9pPjwvYnV0dG9uPicpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0dXBkYXRlT2JqZWN0U3RhdGVzKGdldEJhbm5lckRhdGEoKSk7XHJcblx0XHR9KVxyXG5cdFx0LmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdlcnInLCBlcnIpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn0pOyJdLCJmaWxlIjoic2lkZWJhci92aWRlby9vblZJZGVvLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyL3ZpZGVvL3VwbG9hZFZpZGVvLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHVwbG9hZFZpZGVvKGZvcm0sIHR5cGUpIHtcclxuICB2YXIgdXJsID0gJChmb3JtKS5hdHRyKCdhY3Rpb24nKTtcclxuICB2YXIgZmlsZSA9ICQoZm9ybSkuZmluZCgnaW5wdXRbdHlwZT1maWxlXScpWzBdLmZpbGVzWzBdO1xyXG4gIHZhciBwcmVwZW5kID0gJChmb3JtKS5maW5kKCdpbnB1dFtuYW1lPWtleV0nKS52YWwoKS5zcGxpdCgnJHtmaWxlbmFtZX0nKVswXTtcclxuICB2YXIgZmlsZW5hbWUgPSAnaHR0cHM6Ly9wcmV6aGVyby5zMy5hbWF6b25hd3MuY29tLycgKyBwcmVwZW5kICsgZmlsZS5uYW1lO1xyXG5cclxuICAkLmFqYXgoIHtcclxuICAgIHVybDogdXJsLFxyXG4gICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgZGF0YTogbmV3IEZvcm1EYXRhKCBmb3JtICksXHJcbiAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICBjb250ZW50VHlwZTogZmFsc2UsXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgYWRkVmlkZW8oc2xpZGVIZWFydCwgZmlsZW5hbWUsIDMwMCwgMTUwLCAndXBsb2FkJyk7XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xyXG4gICAgICBhZGRWaWRlbyhzbGlkZUhlYXJ0LCBmaWxlbmFtZSwgMzAwLCAxNTAsICd1cGxvYWQnKTtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gZmFsc2U7XHJcbn0iXSwiZmlsZSI6InNpZGViYXIvdmlkZW8vdXBsb2FkVmlkZW8uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

var Video = function(tag, src, videoType, width, height, style, freetrans, animation) {
	this.tag		= tag;
	this.src		= src;
	this.src		= src;
	this.videoType	= videoType;
	this.width		= width;
	this.height		= height;
	this.style		= style;
	this.freetrans	= freetrans
	this.animation 	= animation;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyL3ZpZGVvL1ZpZGVvLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBWaWRlbyA9IGZ1bmN0aW9uKHRhZywgc3JjLCB2aWRlb1R5cGUsIHdpZHRoLCBoZWlnaHQsIHN0eWxlLCBmcmVldHJhbnMsIGFuaW1hdGlvbikge1xyXG5cdHRoaXMudGFnXHRcdD0gdGFnO1xyXG5cdHRoaXMuc3JjXHRcdD0gc3JjO1xyXG5cdHRoaXMuc3JjXHRcdD0gc3JjO1xyXG5cdHRoaXMudmlkZW9UeXBlXHQ9IHZpZGVvVHlwZTtcclxuXHR0aGlzLndpZHRoXHRcdD0gd2lkdGg7XHJcblx0dGhpcy5oZWlnaHRcdFx0PSBoZWlnaHQ7XHJcblx0dGhpcy5zdHlsZVx0XHQ9IHN0eWxlO1xyXG5cdHRoaXMuZnJlZXRyYW5zXHQ9IGZyZWV0cmFuc1xyXG5cdHRoaXMuYW5pbWF0aW9uIFx0PSBhbmltYXRpb247XHJcbn07Il0sImZpbGUiOiJzaWRlYmFyL3ZpZGVvL1ZpZGVvLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

function getId(url) {
	var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	var match = url.match(regExp);

	if (match && match[2].length == 11) {
		return match[2];
	} else {
		return null;
	}
};

function validateYoutubeVimeo(yvlink) {
	var yRegex = new RegExp(/http(s)?:\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-]+)(&(amp;)?[\w\?=]*)?/gi);
	var vRegex = new RegExp(/http(s)?:\/\/(?:www\.)?(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/gi);
	
	if(!yRegex.test(yvlink) && !vRegex.test(yvlink)) {
		return false;
	}

	return true;
};

function showValidation(tag) {
	tag.show(500);
	setTimeout(function() {
		tag.hide();
	}, 2000);
};

function getYTID(url) {
	var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	var match = url.match(regExp);

	if (match && match[2].length == 11) {
		return match[2];
	} else {
		return null;
	}
};

function getVimeoID(url) {
	var videoID = url.split('/');
	videoID = videoID[videoID.length-1];

	return videoID;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzaWRlYmFyL3ZpZGVvL3lvdXR1YmUtdmltZW8uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2V0SWQodXJsKSB7XHJcblx0dmFyIHJlZ0V4cCA9IC9eLiooeW91dHUuYmVcXC98dlxcL3x1XFwvXFx3XFwvfGVtYmVkXFwvfHdhdGNoXFw/dj18XFwmdj0pKFteI1xcJlxcP10qKS4qLztcclxuXHR2YXIgbWF0Y2ggPSB1cmwubWF0Y2gocmVnRXhwKTtcclxuXHJcblx0aWYgKG1hdGNoICYmIG1hdGNoWzJdLmxlbmd0aCA9PSAxMSkge1xyXG5cdFx0cmV0dXJuIG1hdGNoWzJdO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcbn07XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZVlvdXR1YmVWaW1lbyh5dmxpbmspIHtcclxuXHR2YXIgeVJlZ2V4ID0gbmV3IFJlZ0V4cCgvaHR0cChzKT86XFwvXFwvKD86d3d3XFwuKT95b3V0dSg/OmJlXFwuY29tXFwvd2F0Y2hcXD92PXxcXC5iZVxcLykoW1xcd1xcLV0rKSgmKGFtcDspP1tcXHdcXD89XSopPy9naSk7XHJcblx0dmFyIHZSZWdleCA9IG5ldyBSZWdFeHAoL2h0dHAocyk/OlxcL1xcLyg/Ond3d1xcLik/KHZpbWVvXFwuY29tXFwvKSgoY2hhbm5lbHNcXC9bQS16XStcXC8pfChncm91cHNcXC9bQS16XStcXC92aWRlb3NcXC8pKT8oWzAtOV0rKS9naSk7XHJcblx0XHJcblx0aWYoIXlSZWdleC50ZXN0KHl2bGluaykgJiYgIXZSZWdleC50ZXN0KHl2bGluaykpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gc2hvd1ZhbGlkYXRpb24odGFnKSB7XHJcblx0dGFnLnNob3coNTAwKTtcclxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0dGFnLmhpZGUoKTtcclxuXHR9LCAyMDAwKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGdldFlUSUQodXJsKSB7XHJcblx0dmFyIHJlZ0V4cCA9IC9eLiooeW91dHUuYmVcXC98dlxcL3x1XFwvXFx3XFwvfGVtYmVkXFwvfHdhdGNoXFw/dj18XFwmdj0pKFteI1xcJlxcP10qKS4qLztcclxuXHR2YXIgbWF0Y2ggPSB1cmwubWF0Y2gocmVnRXhwKTtcclxuXHJcblx0aWYgKG1hdGNoICYmIG1hdGNoWzJdLmxlbmd0aCA9PSAxMSkge1xyXG5cdFx0cmV0dXJuIG1hdGNoWzJdO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBnZXRWaW1lb0lEKHVybCkge1xyXG5cdHZhciB2aWRlb0lEID0gdXJsLnNwbGl0KCcvJyk7XHJcblx0dmlkZW9JRCA9IHZpZGVvSURbdmlkZW9JRC5sZW5ndGgtMV07XHJcblxyXG5cdHJldHVybiB2aWRlb0lEO1xyXG59OyJdLCJmaWxlIjoic2lkZWJhci92aWRlby95b3V0dWJlLXZpbWVvLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
