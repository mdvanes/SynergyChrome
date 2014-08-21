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
                    // keyCode 113 = F2
                    if(ev.keyCode === 113) {
                        alert('a');
                    }
                });
        }

        function openSearchWindow() {
            
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
