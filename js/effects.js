$(function() {

    function em(numberOfEms) {
        var currentEmSize = parseFloat($('body').css('font-size'));
        return (currentEmSize * numberOfEms);
    }

    function closeAddNoteForm() {
        $('form textarea').val('');             // clear the textarea
        $('form input[type="text"]').val('');   // clear the title
        $('#formWrapper').slideToggle();        // hide the form
    }

    $('#formWrapper').hide();       // hide the Add form on initial load
    $('#help').hide();              // hide the Help on initial load
    $('#aboutWindow').hide();       // hide the About window on initial load

    /**
     * When the user clicks the "add note" icon in their control
     * panel toggle the visibility of the form
     */
    $('#addNote').click( function(e) {
        e.preventDefault();

        $('#formWrapper').slideToggle();    // show the form
        $('#formWrapper textarea').focus(); // give focus to the textarea, user will be able to immediately start typing
    });

    /**
     * The "Close" icon on the "Add Note" form.
     */
    $('#closeIcon').click( function(e) {
        e.preventDefault();
        closeAddNoteForm();
    });

    /**
     * The "Cancel" button on the "Add Note" form.
     */
    $('#cancelButton').click( function(e) {
        e.preventDefault();
        closeAddNoteForm();
    });

    /**
     * The "Help" navigation icon
     */
    $('#showHelp').click( function(e) {
        e.preventDefault();
        $('#help').toggle("slide", {direction:"right"});
    });

    /**
     * About Window
     */
    $('#showAbout').click( function(e) {
        e.preventDefault();

        $('#aboutWindow').dialog({
            closeText: "",
            draggable: false,
            minWidth: em(30),
            modal: true,
            resizable: false,
            buttons: {
                OK: function() {
                    $(this).dialog("close");
                }
            }
        });

        $('.ui-dialog-content').addClass('clearfix');
        $('.ui-dialog-buttonset button').addClass('btn btn-primary');
    });

    /**
     * Our hand-crafted close button on the diaglog's title bar
     */
    $('#closeDialog').click( function(e) {
        e.preventDefault();
        $('#aboutWindow').dialog("close");
    });

    /**
     * let the individual notes be draggable
     */
    $('ul#notesContainer li').draggable({
        revert:         "invalid",
        containment:    "window",
        cursorAt:       {right: em(2), top: em(1)},
        helper:         "clone",
        start:          function (e, ui) {
            ui.helper.css({'background-color':ui.helper.prevObject.css('background-color')});
        }
    });

    /**
     * let our trashBin be droppable
     */
    $('#trashBin').droppable({
        accept:         ".aNote",
        tolerance:      "touch",
        //activeClass:    "trash-highlight",
        hoverClass:     "trash-hover",
        drop:           function(e, ui) {
            $(ui.draggable).effect("transfer", {to: $('#trashBin')});
            $('.ui-effects-transfer').css({
                'background-color':$(ui.draggable).css('background-color')
            });
            $(ui.draggable).empty().remove();
        }
    });

});
