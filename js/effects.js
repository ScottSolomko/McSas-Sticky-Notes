$(function() {

    function em(numberOfEms) {
        var currentEmSize = parseFloat($('body').css('font-size'));
        return (currentEmSize * numberOfEms);
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
