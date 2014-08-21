var synergyChromeBookmarklet = {};

synergyChromeBookmarklet.subframe = parent.em_main;

// Inject jQuery
(function() {
    var fr = null;

    function banner() {
        if(typeof window.console !== 'undefined') {
            console.info('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n' +
                'Synergy Chrome Bookmarklet v 0.0.1\n' +
                'Initializing the awesome!\n' +
                '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        }
    }

    function addJQuery() {
        // Inject dependency
        var newScriptTag = fr.createElement('script');
        newScriptTag.setAttribute('src', 'https://code.jquery.com/jquery-2.1.1.min.js');
        fr.body.appendChild(newScriptTag);
    }

    function init() {
        banner();
        fr = synergyChromeBookmarklet.subframe.document;
        addJQuery();
    }

    init();
})();

// Wait until jQuery loaded
synergyChromeBookmarklet.loaderInterval = setInterval(function() {
    // jQuery done loading in this subframe
    if(typeof synergyChromeBookmarklet.subframe.jQuery !== 'undefined') {
        // Stop the interval loop
        window.clearInterval(synergyChromeBookmarklet.loaderInterval);
        // Initialize the bookmarklet
        synergyChromeBookmarklet.bookmarkletInit();
    }
}, 100);

// Bookmarklet
synergyChromeBookmarklet.bookmarkletInit = function() {
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
            //$('#ProjectNumberFin', fr).keydown(function(ev) {
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
            console.info('e url:', url);
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
            fr = parent.em_main.document;
            init();
        });

    })(synergyChromeBookmarklet.subframe.jQuery);
};
