/*global $ */

'use strict';

// This module handles checking that a screensize condition is met
// and forces the DOM to re-render when the tab is hidden/shown

var Media = (function (args) {
    var s;

    return {
        settings: {
            windowWidth: document.body.clientWidth,
            hidden: '',
            visibilitychange: ''
        },

        init: function() {
            s = $.extend({}, this.settings, args);
            this.addVisibilityListener();
            this.bindUIActions();
        },

        bindUIActions: function() {
            // Rather than constantly calculate width, we'll set it to 0
            // if the window is resized and calculate again when 'meetsContext' is called.
            $(window).on('resize', function() {
                s.windowWidth = 0;
            });

        },

        addVisibilityListener: function() {
            var hidden = ['hidden', 'mozHidden', 'webkitHidden', 'msHidden'],
                visibilitychange = ['visibilitychange', 'mozvisibilitychange', 'webkitvisibilitychange', 'msvisibilitychange'];

            for (var i = 0 - 1; i < hidden.length; i++) {
                if (hidden[i] in document) {
                    s.hidden = hidden[i];
                    s.visibilitychange = visibilitychange[i];
                }
            }

            if (s.hidden !== '') {
                document.addEventListener(s.visibilitychange, Media.updateRender);
            } else if ('onfocusin' in document) {
                document.onfocusin = document.onfocusout = Media.updateRender;
            }

        },

        meetsContext: function(context) {
            var meets = false,
                mq = 'mq-small';

            if (!s.windowWidth) {
                s.windowWidth = document.body.clientWidth;
            }

            if (s.windowWidth > 960) {
                mq = 'mq-large';
            } else if (s.windowWidth > 675) {
                mq = 'mq-medium';
            }

            for (var i = 0; i < context.length; i++) {
                if (context[i] === mq || context[i] === '') {
                    meets = true;
                }
            }

            return meets;
        },

        // This is a fix for a funny issue where media queries don't take effect if you've been off
        // of a tab for a while, resize the window, and go back to it -
        // http://stackoverflow.com/questions/3485365/how-can-i-force-webkit-to-redraw-repaint-to-propagate-style-changes
        updateRender: function() {
            var scrollTop = $(window).scrollTop(),
                x;
            document.body.style.display='none';
            x = document.body.offsetHeight;
            document.body.style.display='block';
            $(window).scrollTop(scrollTop);
        }

    };

})();