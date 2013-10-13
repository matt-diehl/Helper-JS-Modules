/*global $, Media */

'use strict';

var Expand = (function (args) {
    var s;

    return {
        settings: {
            expandToggle: $('.js-expand-toggle'),
            externalTrigger: $('.js-external-trigger') // Trigger another toggle
        },

        init: function() {
            s = $.extend({}, settings, args);
            this.bindUIActions();
        },

        // If the expand functionality only applies to one or two media queries, the data-expand-context attribute
        // is added to the expand toggle. The value should be the media query it applies to (mq-small)
        // Multiple contexts are handled by separating values with vertical bar characters (mq-small|mq-medium)
        bindUIActions: function() {
            s.expandToggle.on('click', function(e) {
                Expand.triggerActions($(this), e);
            });
            s.externalTrigger.on('click', function(e) {
                var item = $($(this).data('trigger'));
                e.preventDefault();
                item.trigger('click');
            });
        },

        triggerActions: function(el, e) {
            var dataExpandItem = el.data('expand-item'),
                dataCollapseItem = el.data('collapse'),
                expandWrap = el.closest('.js-expand-wrap'),
                expandItem = dataExpandItem ? $(dataExpandItem) : expandWrap.children('.js-expand-item'),
                collapseItem = dataCollapseItem ? $(dataCollapseItem) : null,
                context = el.data('expand-context') ? el.data('expand-context').split('|') : [''];
            e.stopPropagation();
            if (Media.meetsContext(context)) {
                e.preventDefault();
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

        expand: function(item, wrap, context) {

            if (!context) {
                context = [''];
            }

            for (var i = 0; i < context.length; i++) {

                var suffix = context[i].length ? '-' + context[i] : '';

                if (item) {
                    item.addClass('is-expanded' + suffix).removeClass('is-collapsed' + suffix);
                }
                if (wrap) {
                    wrap.addClass('module-is-expanded' + suffix).removeClass('module-is-collapsed' + suffix);
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