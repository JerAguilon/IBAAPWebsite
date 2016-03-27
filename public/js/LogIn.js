$(document).ready(function() {
    $('#loginForm').submit(function (e) {
        e.preventDefault();

        var user = $("#usernameSubmission").val();
        var pass = $("#passwordSubmission").val();
        alert(user + pass);

        $.post('/login/' + user + '/' + pass, function (res) {
            if (res == 'SUCCESS') {
                alert("Welcome! Feel free to log in now.")
                window.location = "/FirstScreen";
            } else {
                window.location = "/RegistrationPage";
                alert("User already exists.");
            }
        });
        //get the values from the form, add it to the userdatabase,
        //And then make sure that the user matches the database

    });

/*    $('#register').click(function (e) {
        $.get('/RegistrationPage');
    });
*/

});