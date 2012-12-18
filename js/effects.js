$(function() {

    function em(numberOfEms) {
        var currentEmSize = parseFloat($('body').css('font-size'));
        return (currentEmSize * numberOfEms);
    }

    $('#formWrapper').hide();       // hide the Add form on initial load
    $('#help').hide();              // hide the Help on initial load
    $('#aboutWindow').hide();       // hide the About window on initial load

    $('#help article').accordion({
        active:         false,
        collapsible:    true,
        header:         "h2",
        heightStyle:    "content",
        icons:          false
    });

    $('#notesContainer').sortable({
        containment: "window",
        cursor: "move",
        cursorAt: {left: em(7), top: em(1)},
        forcePlaceholderSize: true,
        opacity: 0.85,
        placeholder: "sortablePlaceHolder",
        revert: true,
        tolerance: "pointer"
    });
    $('#notesContainer').disableSelection();
});
