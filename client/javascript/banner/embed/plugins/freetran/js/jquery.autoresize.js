var observe;
if (window.attachEvent) {
    observe = function (element, event, handler) {
        element.attachEvent('on'+event, handler);
    };
} else {
    observe = function (element, event, handler) {
        element.addEventListener(event, handler, false);
    };
}

function resize(textArea) {
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight+'px';
};
function delayedResize(textArea) {
    window.setTimeout(resize(textArea), 0);
};

$.fn.transResize = function() {
    var that = this[0];

    resize(that);
    observe(that, 'change', function() {
        resize(that);
    });
    observe(that, 'cut', function() {
        delayedResize(that)
    });
    observe(that, 'paste', function() {
        delayedResize(that)
    });
    observe(that, 'drop', function() {
        delayedResize(that)
    });
    observe(that, 'keydown', function() {
        delayedResize(that)
    });
};