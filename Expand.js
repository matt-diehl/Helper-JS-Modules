/*global $, Media */

// This is a simple module for handling expand/contract elements
// Relies on the Media.js module to check screen size
// Animation is handled by css transitions

'use strict';

var Expand = (function () {
    var s;

    return {
        settings: {
            expandToggle: $('.js-expand-toggle')
        },

        init: function() {
            s = this.settings;
            this.bindUIActions();
        },

        // If the expand functionality only applies to one or two media queries, the data-expand-context attribute
        // is added to the expand toggle. The value should be the media query it applies to (mq-small)
        // Multiple contexts are handled by separating values with vertical bar characters (mq-small|mq-medium)
        bindUIActions: function() {
            s.expandToggle.on('click', function(e) {
                Expand.triggerActions($(this), e);
            });
        },

        triggerActions: function(el, e) {
            var dataExpandItem = el.data('expand-item'),
                dataCollapseItem = el.data('collapse'),
                expandWrap = el.closest('.js-expand-wrap'),
                expandItem = dataExpandItem ? $(dataExpandItem) : expandWrap.children('.js-expand-item'),
                collapseItem = dataCollapseItem ? $(dataCollapseItem) : null,
                context = el.data('expand-context') ? el.data('expand-context').split('|') : [''];
            e.preventDefault();
            e.stopPropagation();
            if (Media.meetsContext(context)) {
                if (collapseItem && collapseItem[0] !== expandItem[0]) {
                    Expand.collapse(collapseItem, collapseItem.closest('.js-expand-wrap'), context);
                }
                if (expandItem) {
                    Expand.toggle(expandItem, expandWrap, context);
                }

            }
        },

        toggle: function(item, wrap, context) {

            if (!context) {
                context = [''];
            }

            for (var i = 0; i < context.length; i++) {

                var suffix = context[i].length ? '-' + context[i] : '';

                if (item) {
                    item.toggleClass('is-expanded' + suffix).toggleClass('is-collapsed' + suffix);
                }
                if (wrap) {
                    wrap.toggleClass('module-is-expanded' + suffix).toggleClass('module-is-collapsed' + suffix);
                }

            }

        },

        collapse: function(item, wrap, context) {

            if (!context) {
                context = [''];
            }

            for (var i = 0; i < context.length; i++) {

                var suffix = context[i].length ? '-' + context[i] : '';

                if (item) {
                    item.removeClass('is-expanded' + suffix).addClass('is-collapsed' + suffix);
                }
                if (wrap) {
                    wrap.removeClass('module-is-expanded' + suffix).addClass('module-is-collapsed' + suffix);
                }

            }

        }

    };

})();

Expand.init();