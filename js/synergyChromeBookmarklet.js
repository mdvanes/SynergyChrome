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
                    // keyCode 113 = F2
                    if(ev.keyCode === 113) {
                        //var hourCode = 
                        openSearchWindow($input);
                        // console.info('hourCode', hourCode);
                        // $input.val(hourCode);
                    }
                });
        }

        function openSearchWindow($input) {
            var url = 'https://synergy.everest.nl/Synergy/docs/BacoBrowserSearch.asp?Name=CSPSAResourceProjects&ResultCols=p%2EProjectNr%2Cp%2EDescription&Options=1&ParamName=m.res_id&ParamValue=164&Where=((m.FromDate%20BETWEEN%20{d%20%272014-08-18%27}%20AND%20{d%20%272014-08-24%27})%20OR%20(m.FromDate%20%3C=%20{d%20%272014-08-18%27}%20AND%20ISNULL(m.UntilDate,%20%2722991231%27)%20%3E=%20{d%20%272014-08-18%27}))%20AND%20((p.InitialStartDate%20BETWEEN%20{d%20%272014-08-18%27}%20AND%20{d%20%272014-08-24%27})%20OR%20(p.InitialStartDate%20%3C=%20{d%20%272014-08-18%27}%20AND%20ISNULL(p.InitialEndDate,%20%2722991231%27)%20%3E=%20{d%20%272014-08-18%27}))%20AND%20p.Status%20=%20%27A%27';
            var searchModal = window.open(url, 'searchModal', 'height=520,width=830,x=50,y=0,location=0');

            // TODO convert to setInterval
            setTimeout(function() {
                var cx = searchModal.document; // context

                // Hide NYI elements
                $('div.BtnBar', cx).hide();
                $('table.Search', cx).hide();
                $('div#wait', cx).hide();

                // Bind click to all the hour codes
                $('#BrowseTable td > a', cx).click(function() {
                    var hourCode = $(this).text();
                    //alert($(this).text());

                    // Set the hourCode in the field that opened the searchWindow
                    $input.val(hourCode);

                    // Close the window
                    searchModal.close();

                    // Return the value
                    //return $(this).text();
                });
            }, 1000);
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
