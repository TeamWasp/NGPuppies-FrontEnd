$(document).ready(function () {
    
    // redirect when user is trying to access admin site via url or if it is first login of admin
    if (localStorage.getItem("role") != "ROLE_ADMIN" || localStorage.getItem("firstLogin") == "false") {
        window.location.replace("http://localhost:8081/error/access-denied.html");
    }

    // add form validators
    $('#first-login-reset-form').validator();

    if ($("#firstLoginResetPassword1").val().length > 0 &&
        $("#firstLoginResetPassword2").val().length > 0) {
        $("#firstLoginSubmitButton").prop("disabled", false);
    } else {
        $("#firstLoginSubmitButton").prop("disabled", true);
    }
    $("#firstLoginResetPassword1, #firstLoginResetPassword2").change(function () {
        if ($("#firstLoginResetPassword1").val().length > 0 &&
            $("#firstLoginResetPassword2").val().length > 0) {

            $("#firstLoginSubmitButton").prop("disabled", false);
        } else {
            $("#firstLoginSubmitButton").prop("disabled", true);
        }
    });

    // PASSWORD RESET FORM - SUBMIT BUTTON
    $('#firstLoginSubmitButton').click(function () {
        $('#first-login-reset-form').submit(function (event) {
            event.preventDefault();
        });
        var updatedPassword = $("#firstLoginResetPassword1").val();
        var updatedPassword2 = $("#firstLoginResetPassword2").val();

        $.ajax({
            type: 'PUT',
            xhrFields: {
                withCredentials: false
            },
            beforeSend: function(request) {
                request.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
            },
            url: 'http://localhost:8080/api/reset',
            contentType: "application/json",
            data: JSON.stringify({
                "password": updatedPassword
            }),
            success: function () {
                alert("Password is reset! Please login again with the new password!");
                window.location.href = "http://localhost:8081/login.html";
            },
            error: function() {
                alert("Password reset failure! Please try again.");
            }
        });
    });
});