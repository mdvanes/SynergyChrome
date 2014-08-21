/* jshint camelcase:false */

var synergyChromeBookmarklet = {};

// Prepare bookmarklet
(function() {
    'use strict';

    synergyChromeBookmarklet.subframe = parent.em_main;

    function addJQuery(doc) {
        // Inject dependency
        var newScriptTag = doc.createElement('script');
        newScriptTag.setAttribute('src', 'https://code.jquery.com/jquery-2.1.1.min.js');
        doc.body.appendChild(newScriptTag);
    }

    function banner() {
        if(typeof window.console !== 'undefined') {
            console.info('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n' +
                'Synergy Chrome Bookmarklet v [[VERSION]]\n' +
                'Initializing the awesome!\n' +
                '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        }
    }

    function startLoadingInterval() {
        setInterval(function() {
            // jQuery done loading in this subframe
            if(typeof synergyChromeBookmarklet.subframe.jQuery !== 'undefined') {
                var $ = synergyChromeBookmarklet.subframe.jQuery;
                var fr = synergyChromeBookmarklet.subframe.document;
                if(!$('body', fr).is('.synergyChromeLoaded')) {
                    $('body', fr).addClass('synergyChromeLoaded');
                    console.info('SynergyChrome loaded');
                    // Initialize the bookmarklet
                    synergyChromeBookmarklet.bookmarkletInit();
                }
            } else {
                console.info('SynergyChrome not loaded, try fixing by adding jQuery before next poll');
                // TODO add jQuery on a higher level so it only has to be done once?
                // Add jQuery again
                addJQuery(synergyChromeBookmarklet.subframe.document);
            }
        }, 500);
    }

    function init() {
        banner();
        addJQuery(synergyChromeBookmarklet.subframe.document);
        synergyChromeBookmarklet.loaderInterval = startLoadingInterval();
    }

    init();
})();


// Bookmarklet
synergyChromeBookmarklet.bookmarkletInit = function() {
    'use strict';
    (function($){
        var fr = null;

        function bindButtons() {
            $('#btnStartDatePrev', fr).click(function() {
                var startDatePrevious = $('#StartDatePrev', fr).val();
                $('#StartDate', fr).val(startDatePrevious);
            });

            $('#btnStartDateNext', fr).click(function() {
                var startDateNext = $('#StartDateNext', fr).val();
                $('#StartDate', fr).val(startDateNext);
            });
        }

        function bindSearch() {
            $('#ProjectNumberHour', fr)
                .removeAttr('onkeydown')
                .keydown(function(ev) {
                    ev.stopPropagation();
                    var $input = $(this);
                    var url = extractUrl($input.next('script'));
                    // keyCode 113 = F2
                    if(ev.keyCode === 113) {
                        openSearchWindow(url, $input);
                    }
                });
        }

        function extractUrl($elem) {
            var str = $elem.text();
            var regexp = /window\.showModalDialog\("(.*)",/g;
            var match, url;
             
            while ((match = regexp.exec(str)) !== null) {
                url = match[1];
                if (match.index === regexp.lastIndex) {
                    regexp.lastIndex++;
                }
            }

            //var encodedUrl = encodeURI(url);
            url = url.replace(/BacoBrowser/g, 'BacoBrowserSearch');
            url = url.replace(/\s/g, '%20');
            //console.info('e url:', url);
            return url;
        }

        function openSearchWindow(url, $input) {
            var searchModal = window.open(url, 'searchModal', 'height=520,width=830'); //,x=50,y=0,location=0');

            var windowLoadedInterval = setInterval(function() {
                if($('#BrowseTable', searchModal.document).length > 0) {
                    // Stop checking if window is loaded
                    window.clearInterval(windowLoadedInterval);
                    // Set bindings on window content
                    var cx = searchModal.document; // context

                    // Hide NYI elements
                    $('div.BtnBar', cx).hide();
                    $('table.Search', cx).hide();
                    $('div#wait', cx).hide();

                    // Bind click to all the hour codes
                    $('#BrowseTable td > a', cx).click(function() {
                        var hourCode = $(this).text();

                        // Set the hourCode in the field that opened the searchWindow
                        $input.val(hourCode);

                        // Close the window
                        searchModal.close();
                    });
                }
            }, 100);
        }

        function init() {
            // Test jquery version
            // jQuery.fn.jquery;

            $('#wait', fr).css('opacity','0.7');

            bindButtons();
            bindSearch();

            setTimeout(function() {
                $('#wait', fr).hide();
            }, 200);
        }

        $(document).ready(function() {
            fr = synergyChromeBookmarklet.subframe.document;
            init();
        });

    })(synergyChromeBookmarklet.subframe.jQuery);
};
