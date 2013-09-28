/*global $ */

'use strict';

// A little module for displaying chosen fields from a group of form fields

var Chosenbox = (function () {
    var s;

    return {
        settings: {
            docbody: $('body'),
            groups: $('.js-chosenbox-group'),
            wraps: $('.js-chosenbox-wrap'),
            toggles: $('.js-chosenbox-toggle'),
            showToggles: $('.js-chosenbox-show-children'),
            items: $('.js-chosenbox-items'),
            popupsOpen: false
        },

        init: function() {
            s = this.settings;
            this.bindUIActions();
        },

        bindUIActions: function() {
            s.docbody.on('click', function(e) {
                Chosenbox.closeOpenPopups(e);
            });
            s.showToggles.on('click', function() {
                $(this).find('.js-chosenbox-group').toggleClass('is-open').toggleClass('is-closed');
            });
            s.toggles.on('change', function() {
                Chosenbox.updateBox($(this));
            });
            s.items.on('click', '.js-chosenbox-remove', function(e) {
                e.preventDefault();
                var parent = $(this).parent('li'),
                    parentSiblings = parent.siblings(),
                    formElements = parent.closest('.js-chosenbox-wrap').find('.js-chosenbox-toggle'),
                    type = formElements[0].type.toLowerCase();
                if (parentSiblings.length === 0) {
                    parent.closest('.js-chosenbox-items').addClass('is-empty');
                }
                if (formElements.length) {
                    if (type === 'select-one') {
                        formElements[0].options.selectedIndex = 0;
                    } else if (type === 'checkbox') {
                        var uncheck = $(this).data('chosen-remove');
                        $(uncheck).prop('checked', false);
                    }
                }
                parent.remove();

            });
        },

        updateBox: function(el) {
            var box = el.closest('.js-chosenbox-wrap').find('.js-chosenbox-items'),
                choices = [],
                type = el[0].type.toLowerCase();
            if (type === 'select-one') {
                choices.push(el.val());
                box.removeClass('is-empty').empty().append('<li>' + choices[0] + '<a href="#"" class="chosenbox-remove js-chosenbox-remove">X</a></li>');
            } else if (type === 'checkbox') {
                choices = el.closest('.js-chosenbox-group').find(':checked');
                totalChoices = choices.length
                box.removeClass('is-empty').empty();
                for (var i = 0; i < totalChoices; i++) {
                    box.append('<li>' + choices.eq(i).val() + '<a href="#" data-chosen-remove="#' + choices[i].id + '" class="chosenbox-remove js-chosenbox-remove">X</a></li>');
                };
            }
        },

        closeOpenPopups: function(e) {
            var el = e.target,
                closePopup = true;
            while (el) {
                var targetClass = el.className,
                    isPopup;
                if (targetClass && typeof targetClass.match === 'function') {
                    isPopup = targetClass.match(/js-chosenbox-wrap/g);
                    if (isPopup) {
                        closePopup = false;
                    }
                }
                el = el.parentNode;
            }
            if (closePopup) {
                $('.js-chosenbox-group.is-open').removeClass('is-open').addClass('is-closed');
            }
        }

    };
})();
Chosenbox.init();