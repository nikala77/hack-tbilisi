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