'use strict';

function NotesController($scope) {

    $scope.notes = [
        {title : "Read Help", date : new Date().getTime(), msg : "Read the quick instructions to learn how to use this application."},
        {title : "Read Help", date : new Date().getTime(), msg : "Read the quick instructions to learn how to use this application."},
        {title : "Read Help", date : new Date().getTime(), msg : "Read the quick instructions to learn how to use this application."},
        {title : "Read Help", date : new Date().getTime(), msg : "Read the quick instructions to learn how to use this application."},
        {title : "Read Help", date : new Date().getTime(), msg : "Read the quick instructions to learn how to use this application."}
    ];

    if ( $scope.notes.length < 1 ) {
        var now = new Date();
        //localStorage.setItem(now.getTime(), JSON.stringify({title : "Read Help", date : now.getTime(), msg : "Read the quick instructions to learn how to use this application."}));
        $scope.notes.push({title : "Read Help", date : now.getTime(), msg : "Read the quick instructions to learn how to use this application."});
    }

    $scope.addNote = function() {
        var now = new Date();
        //localStorage.setItem(now.getTime(), angular.toJson({title : $scope.noteTitle, date : now.getTime(), msg : $scope.noteMessage}));
        $scope.notes.push({title : $scope.noteTitle, date : now.getTime(), msg : $scope.noteMessage});
    }

    // testing
    $scope.toObj = function(str) {
        return angular.fromJson(str);
    }
}
