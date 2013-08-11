/*global $ */

// This function handles calling secondary scripts that are only needed on certain pages
// The 'js-depend' class is applied somewhere in the html of the page, along with a 'data-depend' attribute/value
// with the value being the name of the needed module/script. Multiple scripts can be used if divided by a vertical bar ('|')

'use strict';

var Dependencies = (function () {
    var s;

    return {
        settings: {
            dependToggles: $('[data-depend]'),
            loadedDependencies: []
        },

        init: function() {
            s = this.settings;
            this.getDependencies();
        },

        getDependencies: function() {
            if (s.dependToggles.length) {
                s.dependToggles.each(function() {
                    var dependArray = $(this).data('depend').split('|');
                    for (var i = 0; i < dependArray.length; i++) {
                        // Check if dependency has already been loaded first
                        // If not, add it to the loadedDependencies array and append the script
                        if ($.inArray(dependArray[i], s.loadedDependencies) < 0) {
                            s.loadedDependencies.push(dependArray[i]);
                            Dependencies.appendScript(dependArray[i]);
                        }
                    }
                });
            }
        },

        appendScript: function(module) {
            var script = document.createElement('script'),
                pageScripts = document.getElementsByTagName('script'),
                totalScripts = pageScripts.length;
            script.type = 'text/javascript';
            script.async = true;
            script.src = '/js/modules/' + module + '.js';
            pageScripts[totalScripts - 1].parentNode.insertBefore(script, pageScripts[totalScripts - 1]);
        }

    };

})();

Dependencies.init();