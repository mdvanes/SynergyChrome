/* jshint camelcase:false */

var synergyChrome = {};

// Prepare bookmarklet
(function() {
    'use strict';

    /* public funtions and variables */
    synergyChrome.subframe = parent.em_main;

    synergyChrome.info = function() {
        banner();
        if(typeof window.console !== 'undefined') {
            console.info(
                '    - isJqueryLoaded = ' + isJqueryLoaded() + '\n' +
                '    - isBookmarkletLoaded = ' + isBookmarkletLoaded() + '\n' +
                '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        }
    };

    /* private functions */
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

    function isJqueryLoaded() {
        return (typeof synergyChrome.subframe.jQuery !== 'undefined');
    }

    function isBookmarkletLoaded() {
        if(isJqueryLoaded()) {
            var $ = synergyChrome.subframe.jQuery;
            var fr = synergyChrome.subframe.document;
            return $('body', fr).is('.synergyChromeLoaded');
        } else {
            return false;
        }
    }

    function markBookmarkletLoaded() {
        var $ = synergyChrome.subframe.jQuery;
        var fr = synergyChrome.subframe.document;
        $('body', fr).addClass('synergyChromeLoaded');
        console.info('SynergyChrome loaded');
    }

    function startLoadingInterval() {
        setInterval(function() {
            // jQuery done loading in this subframe
            if(isJqueryLoaded()) {
                if( !isBookmarkletLoaded() ) {
                    // var $ = synergyChrome.subframe.jQuery;
                    // var fr = synergyChrome.subframe.document;
                    // $('body', fr).addClass('synergyChromeLoaded');
                    // console.info('SynergyChrome loaded');
                    markBookmarkletLoaded();
                    // Initialize the bookmarklet
                    synergyChrome.bookmarkletInit();
                }
            } else {
                console.info('SynergyChrome not loaded, try fixing by adding jQuery before next poll');
                // TODO add jQuery on a higher level so it only has to be done once?
                // Add jQuery again
                addJQuery(synergyChrome.subframe.document);
            }
        }, 500);
    }

    function init() {
        banner();
        addJQuery(synergyChrome.subframe.document);
        synergyChrome.loaderInterval = startLoadingInterval();
    }

    init();
})();


// Bookmarklet
synergyChrome.bookmarkletInit = function() {
    'use strict';
    (function($){
        var fr = null;

        function bindButtons() {
            // Save button
            $('#btnSave', fr).click(function() {
                // Replace last character "0" by "1"
                var oldAction = $('form#Baco', fr).attr('action');
                var newAction = oldAction.substring(0, oldAction.length - 1) + '1';

                // Modify action to 1
                $('form#Baco', fr).attr('action', newAction);

                // Add button1=
                $('#ProjectNumberFin', fr).before('<input name="button1"/>');
            });

            // Previous Week button
            $('#btnStartDatePrev', fr).click(function() {
                var startDatePrevious = $('#StartDatePrev', fr).val();
                $('#StartDate', fr).val(startDatePrevious);
            });

            // Next Week button
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

        function removeValidateNumber() {
            $('input[name="ItemCountHour"]', fr)
                .removeAttr('onkeypress');
        }

        // Automatically prefill ItemCodeHour with PRUUR on focus
        function bindItemCode() {
            $('#ItemCodeHour', fr)
                .removeAttr('onkeydown')
                .focus(function() {
                    $(this).val('PRUUR');
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
            bindItemCode();
            removeValidateNumber();

            setTimeout(function() {
                $('#wait', fr).hide();
            }, 200);
        }

        $(document).ready(function() {
            fr = synergyChrome.subframe.document;
            init();
        });

    })(synergyChrome.subframe.jQuery);
};