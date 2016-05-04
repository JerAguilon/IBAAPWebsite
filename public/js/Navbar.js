document).ready(function() {
    var pathname = window.location.pathname;
    var argList = pathname.split("/");
    var user = argList[argList.length - 1];

    $('#user').text(user);
    $('#chart').click(function() {
        window.location = "/Chart/" + user;
    });

    $('#firstscreen').click(function() {
        window.location = "/Chart/" + user;
    });

    $('#trigger').click(function() {
        window.location = "/Chart/" + user;
    });

    $('#notifications').click(function() {
        window.location = "/Chart/" + user;
    });
});