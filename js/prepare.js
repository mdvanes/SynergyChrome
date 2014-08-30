/* jshint camelcase:false */

var synergyChrome = synergyChrome || (synergyChrome = {});

// Prepare bookmarklet
(function() {
    'use strict';

    /* public funtions */

    synergyChrome.URL = null;

    synergyChrome.info = function() {
        banner();
        if(typeof window.console !== 'undefined') {
            console.info(
                '    - isJqueryLoaded = ' + isJqueryLoaded() + '\n' +
                '    - isBookmarkletLoaded = ' + isBookmarkletLoaded() + '\n' +
                '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        }
    };

    /* private functions and variables */
    
    var topframe = parent.em_header;
    var subframe = parent.em_main;

    function banner() {
        if(typeof window.console !== 'undefined') {
            console.info('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n' +
                'Synergy Chrome Bookmarklet v [[VERSION]]\n' +
                'by [[AUTHOR]] on [[BUILDDATE]]\n' +
                'see [[REPO]]\n' +
                'Initializing the awesome!\n' +
                '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        }
    }

    function isSynergy() {
        // Test for 3 frame names
        return typeof topframe === 'object' &&
            typeof subframe === 'object' &&
            typeof parent.em_list === 'object';
    }

    function warnNotSynergy() {
        var message = 'Initialization failed: Synergy needs to be logged in and the active tab.';
        console.warn(message);
        alert(message);
    }

    function addJQuery() {
        var jqueryUrl = 'https://code.jquery.com/jquery-2.1.1.min.js';
        var doc = topframe.document;
        // Don't append if tag already exists (note that if the tag 
        // exists it doesn't mean that jQuery is done loading)
        var scriptTags = doc.getElementsByTagName('script');
        for(var i = 0; i < scriptTags.length; i++) {
            if(scriptTags[i].src === jqueryUrl) {
                // If jQuery script tag already added, don't add again.
                return;
            }
        }
        // Inject dependency
        var newScriptTag = doc.createElement('script');
        newScriptTag.setAttribute('src', jqueryUrl);
        doc.body.appendChild(newScriptTag);
    }

    function isJqueryLoaded() {
        return (typeof topframe.jQuery !== 'undefined');
    }

    function isBookmarkletLoaded() {
        if(isJqueryLoaded()) {
            var $ = topframe.jQuery;
            var fr = subframe.document;
            return $('body', fr).is('.synergyChromeLoaded');
        } else {
            return false;
        }
    }

    function markBookmarkletLoaded() {
        var $ = topframe.jQuery;
        var fr = subframe.document;
        $('body', fr).addClass('synergyChromeLoaded');
        console.info('SynergyChrome loaded');
    }

    function startLoadingInterval() {
        return setInterval(function() {
            // jQuery done loading in this subframe
            if(isJqueryLoaded()) {
                if( !isBookmarkletLoaded() ) {
                    var $ = topframe.jQuery;
                    markBookmarkletLoaded();
                    // Initialize the bookmarklet
                    synergyChrome.bookmarkletInit($, subframe, topframe);
                }
            } else {
                console.info('SynergyChrome not loaded, try fixing by adding jQuery before next poll');
                // Add jQuery again
                addJQuery();
            }
        }, 500);
    }

    function init() {
        banner();

        // if(synergyChrome.URL === null) {
        // If no prefilled url, try to load on the current page
        if(isSynergy()) {
            addJQuery();
            synergyChrome.loaderInterval = startLoadingInterval();
        } else {
            warnNotSynergy();
        }
        // } else {
        //     console.info('SynergyChrome: Using preloaded synergy URL.');
        //     // Check if current url matches synergyUrl
        //     if(top.location.href !== synergyChrome.URL) {
        //         // Redirect to synergy
        //         // TODO when using this, all following javascripts will be cancelled:
        //         //top.location.href = synergyChrome.URL;
        //         // $.ajax(synergyChrome.URL, function(data) {
        //         //     console.log(data);
        //         // });
        //         //var request = 
        //         $.ajax(synergyChrome.URL)
        //             .done(function(data) {
        //                 alert( '"success "' + data );
        //             })
        //             .fail(function(jqXHR, textStatus) {
        //                 console.error( '"error"' + textStatus, jqXHR );
        //             })
        //             .always(function() {
        //                 alert( '"complete"' );
        //             });
        //         // TODO add jQuery here
        //         // var height = document.getElementsByTagName('html')[0].clientHeight;
        //         // document.getElementsByTagName('body')[0].innerHTML = '<iframe src="' +
        //         //     synergyChrome.URL +
        //         //     '" width="100%" height="' +
        //         //     height +
        //         //     '"></iframe>';
        //         // TODO add CSS to remove scrollbars and iframe border
        //         // TODO execute scripts on the iframe instead of the main window
        //     }
            
        //     // if not isSynergy (not logged in) loop until logged in
        //     if(!isSynergy()) {
        //         var loggedInInterval = setInterval(function() {
        //             if(isSynergy()) {
        //                 window.clearInterval(loggedInInterval);
        //                 addJQuery();
        //                 synergyChrome.loaderInterval = startLoadingInterval();
        //             }
        //         }, 100);
        //     }
        // }
    }

    init();
})();
