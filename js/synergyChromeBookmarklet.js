// Inject dependency
var newScriptTag = document.createElement('script');
newScriptTag.setAttribute('src', 'https://code.jquery.com/jquery-2.1.1.min.js');
document.body.appendChild(newScriptTag);

(function($){

})(jQuery);

// Wait until js loaded
setTimeout(function() {
    // Test jquery version
    // jQuery.fn.jquery;

    $('#wait').css('opacity','0.7');

    $('#btnStartDatePrev').click(function() {
        var startDatePrevious = $('#StartDatePrev').val();
        $('#StartDate').val(startDatePrevious);
    });

    $('#btnStartDateNext').click(function() {
        var startDateNext = $('#StartDateNext').val();
        $('#StartDate').val(startDateNext);
    });

    setTimeout(function() {
        $('#wait').hide();
    }, 200);
}, 500);