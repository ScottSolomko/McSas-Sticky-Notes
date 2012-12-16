$(function() {

    function em(numberOfEms) {
        var currentEmSize = parseFloat($('body').css('font-size'));
        return (currentEmSize * numberOfEms);
    }

    function showAboutWindow() {
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
        $('.ui-dialog-buttonset button').addClass('btn');
    }

    $('#formWrapper').hide();       // hide the Add form on initial load
    $('#help').hide();              // hide the Help on initial load
    $('#aboutWindow').hide();       // hide the About window on initial load

    $('#help article').accordion({
        collapsible:    true,
        header:         "h2",
        heightStyle:    "content",
        icons:          false
    });

    /**
     * About Window
     */
    $('#showAbout').click( function(e) {
        e.preventDefault();
        showAboutWindow();
    });

    $('#showAbout a').click( function(e) {
        e.preventDefault();
        showAboutWindow();
    });

    /**
     * Our hand-crafted close button in the About diaglog's title bar
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
            $('#trashBin').effect("shake", {distance:em(0.25), times:5});
        }
    });

    /**
     * let our trashBin be droppable
     */
    $('#trashBin').droppable({
        accept:         ".aNote",
        tolerance:      "touch",
        hoverClass:     "trash-hover",
        drop:           function(e, ui) {
            $(ui.draggable).effect("transfer", {to: $('#trashBin')}, 750);
            $('.ui-effects-transfer').css({
                'background-color':$(ui.draggable).css('background-color')
            });

            var ang = angular.element('body').scope();
            ang.deleteNote(ui.draggable[0].id);

            $(ui.draggable).empty().remove();
        }
    });

});
