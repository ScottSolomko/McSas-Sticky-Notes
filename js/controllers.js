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

        var n = {"title" : "Read Help", "date" : new Date().getTime(), "msg" : "Click on the \"Help\" icon where you will learn how to create and delete notes."};
        savedNotes.push(n);
        localStorage.setItem("notes", JSON.stringify(savedNotes));
    }

    // angular monitors this
    $scope.notes = savedNotes;

    // add a new note
    $scope.addNote = function() {
        var n = {"title" : $scope.noteTitle, "date" : new Date().getTime(), "msg" : $scope.noteMessage};
        savedNotes.push(n);
        localStorage.setItem('notes', JSON.stringify(savedNotes));

        $scope.noteMessage = '';
        $scope.noteTitle   = '';

        // flash success message
        $('#success').addClass('success-show');
        setTimeout(function() {
            $('#success').removeClass('success-show');
            setTimeout(function() {
                $('#formWrapper').slideToggle();
            }, 500);
        }, 1500);
    }

    // delete a note
    $scope.deleteNote = function(id) {
        var index;

        for(var i = 0; i < savedNotes.length; i++) {
            if (savedNotes[i].date == id) {
                index = i;
                break;
            }
        }

        savedNotes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(savedNotes));
    }

}
