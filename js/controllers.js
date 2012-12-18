'use strict';

function em(numberOfEms) {
    var currentEmSize = parseFloat($('body').css('font-size'));
    return (currentEmSize * numberOfEms);
}

angular.module('mcsas', []).directive('myPostRepeatDirective', function() {
    return function(scope, element, attrs) {
        if(scope.$last) {
            /*
             *
             * empty
             *
             */
        }
    };
});

function NotesController($scope) {

    var savedNotes = JSON.parse(localStorage.getItem('notes'));

    if (savedNotes == null || savedNotes.length < 1) {
        savedNotes = [];

        var n = {"title" : "Read Help", "date" : new Date().getTime(), "msg" : "Click on the \"Help\" icon where you will learn how to create and delete notes."};
        savedNotes.push(n);
        localStorage.setItem("notes", JSON.stringify(savedNotes));
    }

    $scope.notes        = savedNotes;
    $scope.noteMessage  = '';
    $scope.noteTitle    = '';
    $scope.noteId       = 0;
    $scope.submitButton = 'Add';

    $scope.submitNote = function() {
        if ($scope.noteId > 0) {
            this.editNote();
        } else {
            this.addNote();
        }
    }

    $scope.addNote = function() {
        var n = {"title" : $scope.noteTitle, "date" : new Date().getTime(), "msg" : $scope.noteMessage};
        savedNotes.push(n);
        localStorage.setItem('notes', JSON.stringify(savedNotes));

        $scope.noteMessage = '';
        $scope.noteTitle   = '';

        this.flashSuccessSave();
    }

    $scope.editNote = function() {
        for(var i = 0; i < savedNotes.length; i++) {
            if (savedNotes[i].date == $scope.noteId) {
                savedNotes[i].title = $scope.noteTitle;
                savedNotes[i].msg   = $scope.noteMessage;
                break;
            }
        }

        $scope.noteMessage = '';
        $scope.noteTitle   = '';
        $scope.noteId = 0;

        localStorage.setItem('notes', JSON.stringify(savedNotes));
        this.flashSuccessSave();
    }

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

    /*
     *  Animations/Interations
     */
    $scope.animateDeleteNote = function(id) {
        var li = document.getElementById(id);

        $(li).effect("transfer", {to: $('#trashBin')}, 750);
        $('.ui-effects-transfer').css({
            'background-color':$(li).css('background-color')
        });

        this.deleteNote(id);
    }

    $scope.showAddNoteForm = function() {
        $scope.noteMessage  = '';
        $scope.noteTitle    = '';
        $scope.submitButton = 'Add';

        $('#formWrapper').slideToggle();
        $('#formWrapper textarea').focus();
    }

    $scope.showEditNoteForm = function(note) {
        $scope.noteMessage  = note.msg;
        $scope.noteTitle    = note.title;
        $scope.noteId       = note.date;
        $scope.submitButton = 'Update';

        $('#formWrapper').slideToggle();
        $('#formWrapper textarea').focus();
    }

    $scope.closeAddNoteForm = function() {
        $scope.noteMessage = '';
        $scope.noteTitle   = '';
        $scope.noteId      = 0;
        $('#formWrapper').slideToggle();
    }

    $scope.flashSuccessSave = function() {
        $('#success').addClass('success-show');
        setTimeout(function() {
            $('#success').removeClass('success-show');
            setTimeout(function() {
                $('#formWrapper').slideToggle();
            }, 500);
        }, 1500);
    }

    $scope.toggleHelp = function() {
        $('#help').toggle("slide", {direction:"right"});
    }

    $scope.showAboutDialog = function() {
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

    $scope.closeAboutDialog = function() {
        $('#aboutWindow').dialog("close");
    }
}
