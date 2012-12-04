$(function() {

    $('#formWrapper').hide();       // hide the form on initial load

    /**
     * When the user clicks the "add note" icon in their control
     * panel toggle the visibility of the form
     */
    $('#addNote').click( function(e) {
        e.preventDefault();
        $('#formWrapper').slideToggle();
    });

    /**
     * let the individual notes be draggable
     */
    $('ul li').draggable({
        revert:         "invalid",
        containment:    "document",
        cursorAt:       {right: 30, top: 15}
    });

    /**
     * let our trashBin be droppable
     */
    $('#trashBin').droppable({
        accept:         ".aNote",
        tolerance:      "touch",
        activeClass:    "trash-highlight",
        hoverClass:     "trash-hover",
        drop:           function(e, ui) {}
    });

});
