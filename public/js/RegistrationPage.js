$(document).ready(function () {
    $('#newUser').submit(function (e) {
        //e.preventDefault();

        var user = $("#usernameSubmission").val();
        var pass = $("#passwordSubmission").val();

        $.post('/register/' + user + '/' + pass, function (res) {
            if (res == 'SUCCESS') {
                window.location = "/";
            } else {
                alert("ERROR");
            }
        });

    });

});