'use strict';
    function em(numberOfEms) {
        var currentEmSize = parseFloat($('body').css('font-size'));
        return (currentEmSize * numberOfEms);
    }
    
angular.module('mcsas', []).directive('myPostRepeatDirective', function() {
    return function(scope, element, attrs) {
        if(scope.$last) {
            $('ul#notesContainer li:not(".ui-draggable")').draggable({
                revert:         "invalid",
                containment:    "window",
                cursorAt:       {right: em(2), top: em(1)},
                helper:         "clone",
                start:          function (e, ui) {
                    ui.helper.css({'background-color':ui.helper.prevObject.css('background-color')});
                    $('#trashBin').effect("shake", {distance:em(0.25), times:5});
                }
            });
        }
    };
});

function NotesController($scope) {

    var savedNotes;

    // get all the notes from local storage and use them for this session
    savedNotes   = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes == null) {
        savedNotes = [];
    }

    // angular monitors this
    $scope.notes = savedNotes;

    $scope.addNote = function() {
        var n = {"title" : $scope.noteTitle, "date" : new Date().getTime(), "msg" : $scope.noteMessage};
        savedNotes.push(n);
        localStorage.setItem('notes', JSON.stringify(savedNotes));
    }

    $scope.deleteNote = function() {
        // delete
    }

}
