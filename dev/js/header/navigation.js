/*!
 * contentloaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 20101020
 * License: MIT
 * Version: 1.2
 *
 * URL:
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 *
 */

// @win window reference
// @fn function reference
var contentLoaded = function (win, fn) {

    var done = false, top = true,

        doc = win.document, root = doc.documentElement,

        add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
        rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
        pre = doc.addEventListener ? '' : 'on',

        init = function(e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
            (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
            if (!done && (done = true)) fn.call(win, e.type || e);
        },

        poll = function() {
            try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
            init('poll');
        };

    if (doc.readyState == 'complete') fn.call(win, 'lazy');
    else {
        if (doc.createEventObject && root.doScroll) {
            try { top = !win.frameElement; } catch(e) { }
            if (top) poll();
        }
        doc[add](pre + 'DOMContentLoaded', init, false);
        doc[add](pre + 'readystatechange', init, false);
        win[add](pre + 'load', init, false);
    }

}


var addEvent = function( obj, type, fn ) {
    if (obj.addEventListener)
        obj.addEventListener(type, fn, false);
    else if (obj.attachEvent)
        obj.attachEvent('on' + type, function() { return fn.apply(obj, new Array(window.event));});
}


function onHoverIn(e) {
    e.currentTarget.classList.add('hover')
    console.log('in');
}

function onHoverOut(e) {
    e.currentTarget.classList.remove('hover')
    console.log('out');

}

// function onClick(e) {
//     // prevent jumping to top of page on touch devices
//     if ($(e.currentTarget).attr('href') === '#') {
//         e.preventDefault();
//     }
// }

function init () {

    if (document.querySelectorAll('[data-controller="modules/Navigation"] li')) {

        var elements = document.querySelectorAll('[data-controller="modules/Navigation"] li');

        Array.prototype.forEach.call(elements, function(el, i){
            addEvent(el, 'mouseenter', onHoverIn);
            addEvent(el, 'mouseleave', onHoverOut);
        });
    }

}

// Nutzung von Diego Perinis Helferfunktion
contentLoaded(window, init);

