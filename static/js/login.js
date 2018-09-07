$(document).ready(function() {

    localStorage.clear();

    var auth = null;
    var role = null;
    var firstLogin = null;

    $('#signInForm').submit(function (ev) {
        ev.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        localStorage.setItem("username", username);

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
            firstLogin = body["firstLogin"];

            localStorage.setItem("token", auth);
            localStorage.setItem("role", role);
            localStorage.setItem("firstLogin", firstLogin);

            if (role == "ROLE_ADMIN") {

                // check first-login value for admin
                if (firstLogin == true) {
                    alert("This is your first login. Please reset your password to continue!");
                    window.location.href = "http://localhost:8081/admin/password-reset.html";
                } else {
                    alert("Welcome to NG Puppies. Logged in as " + role);
                    window.location.href = "http://localhost:8081/admin/home.html";
                }

                /* $.ajax({
                    type: 'GET',
                    xhrFields: {
                        withCredentials: false
                    },
                    beforeSend: function(request) {
                        request.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
                        console.log(localStorage.getItem("token"));
                      },
                    url: "http://localhost:8080/api/admin/admins?username=" + localStorage.getItem("username"),
                    contentType: "application/json",
                    dataType: "json",
                    success: function() {
                        alert("Welcome to NG Puppies. Logged in as " + role);
                        window.location.href = "http://localhost:8081/admin/home.html";
                    },
                    error: function (data) {
                        console.log(data);
                        alert("This is your first login. Please reset your password to continue!");
                        window.location.href = "http://localhost:8081/admin/reset.html";
                    }
                }); */
            } else {
                alert("Welcome to NG Puppies. Logged in as " + role);
                window.location.href = "http://localhost:8081/client/home.html";
            }
        });

        
    });
});