'use strict';

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
