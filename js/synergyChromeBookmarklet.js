var synergyChromeBookmarklet = {};

synergyChromeBookmarklet.subframe = parent.em_main;

(function() {
    var fr = null;

    function addJQuery() {
        // Inject dependency
        var newScriptTag = fr.createElement('script');
        newScriptTag.setAttribute('src', 'https://code.jquery.com/jquery-2.1.1.min.js');
        fr.body.appendChild(newScriptTag);
    }

    function init() {
        fr = synergyChromeBookmarklet.subframe.document;
        addJQuery();
    }

    init();
})();

// Wait until jquery loaded
synergyChromeBookmarklet.loaderInterval = setInterval(function() {
    // jquery done loading in this subframe
    if(typeof synergyChromeBookmarklet.subframe.jQuery !== 'undefined') {
        // Stop the interval loop
        window.clearInterval(synergyChromeBookmarklet.loaderInterval);
//        synergyChromeBookmarklet.coreInit();

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

            function init() {
                // Test jquery version
                // jQuery.fn.jquery;

                $('#wait', fr).css('opacity','0.7');

                bindButtons();

                setTimeout(function() {
                    $('#wait', fr).hide();
                }, 200);
            }

            $(document).ready(function() {
                fr = parent.em_main.document;
                init();
            });

        })(synergyChromeBookmarklet.subframe.jQuery);


    }
}, 100);

synergyChromeBookmarklet.coreInit = function() {
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

        function init() {
            // Test jquery version
            // jQuery.fn.jquery;

            $('#wait', fr).css('opacity','0.7');

            bindButtons();

            setTimeout(function() {
                $('#wait', fr).hide();
            }, 200);
        }

        $(document).ready(function() {
            fr = parent.em_main.document;
            init();
        });

    })(jQuery);
};



// setTimeout(function() {

//     (function($){
//         var fr = null;

//         function bindButtons() {
//             $('#btnStartDatePrev', fr).click(function() {
//                 var startDatePrevious = $('#StartDatePrev', fr).val();
//                 $('#StartDate', fr).val(startDatePrevious);
//             });

//             $('#btnStartDateNext', fr).click(function() {
//                 var startDateNext = $('#StartDateNext', fr).val();
//                 $('#StartDate', fr).val(startDateNext);
//             });
//         }

//         function init() {
//             // Test jquery version
//             // jQuery.fn.jquery;

//             $('#wait', fr).css('opacity','0.7');

//             bindButtons();

//             setTimeout(function() {
//                 $('#wait', fr).hide();
//             }, 200);
//         }

//         $(document).ready(function() {
//             fr = parent.em_main.document;
//             init();
//         });

//     })(jQuery);

// }, 2000);