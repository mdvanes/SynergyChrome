(function($) {
    function generate() {
        var $bookmarkletlink = $('#bookmarkletlink');
        var bookmarklet = $bookmarkletlink.attr('href');
        var name = $bookmarkletlink.text();
        var synergyUrl = $('#synergyUrl').val();
        var generatedBookmarklet = bookmarklet.replace(/synergyChrome\.URL=null/,'synergyChrome.URL="' + synergyUrl + '"');
        $('#generatedBookmarkletWrapper > a')
            .attr('href', generatedBookmarklet)
            .text(name);
        $('#defaultInstallation').css('opacity', '0.3');
        $('#generatedBookmarkletWrapper').show();
    }

    function init() {
        $('#generatedBookmarkletWrapper').hide();

        $('#generateButton').click(function() {
            generate();
        });
    }

    $(document).ready(function() {
        init();
    });
})(jQuery);