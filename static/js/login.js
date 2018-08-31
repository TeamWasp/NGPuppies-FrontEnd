$(document).ready(function() {

    var auth = null;
    var role = null;
    $('#signInForm').submit(function (ev) {
        ev.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/login',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "username": username,
                "password": password
            })
        }).done(function (body) {
            auth = body["token"];
            role = body["role"];
            localStorage.setItem("token", auth);
            localStorage.setItem("role", role);

            alert("Welcome to NG Puppies. Logged in as " + role);
            if(role === "ROLE_ADMIN") {
                window.location.href = "http://localhost:8081/admin/home.html";
                /*test();*/
            } else {
                window.location.href = "http://localhost:8081/client/home.html";
            }
        });
    });

});