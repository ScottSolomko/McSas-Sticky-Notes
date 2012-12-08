'use strict';

function NotesController($scope) {

    var savedNotes;
    var sessionNotes;

    // get all the notes from local storage and use them for this session
    savedNotes   = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes !== null) {
        sessionNotes = savedNotes;
    } else {
        savedNotes   = [];
        sessionNotes = [];
    }

    // angular monitors this
    $scope.notes = sessionNotes;

    $scope.addNote = function() {
        var n = {"title" : $scope.noteTitle, "date" : new Date().getTime(), "msg" : $scope.noteMessage};
        sessionNotes.push(n);
        savedNotes.push(n);
        localStorage.setItem('notes', JSON.stringify(savedNotes));
    }

    $scope.deleteNote = function() {
        // delete
    }

}
