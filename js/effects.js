$(function() {

    function em(numberOfEms) {
        var currentEmSize = parseFloat($('body').css('font-size'));
        return (currentEmSize * numberOfEms);
    }

    $('#formWrapper').hide();       // hide the Add form on initial load
    $('#help').hide();              // hide the Help on initial load
    $('#aboutWindow').hide();       // hide the About window on initial load

    /**
     * Help FAQ's accordion style
     */
    $('#help article').accordion({
        active:         false,
        collapsible:    true,
        header:         "h2",
        heightStyle:    "content",
        icons:          false
    });

    $('#notesContainer').sortable();
    $('#notesContainer').disableSelection();
});
