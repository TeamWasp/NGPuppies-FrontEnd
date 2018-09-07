$(document).ready(function () {
    
    // redirect when user is trying to access admin site via url or if it is first login of admin
    if (localStorage.getItem("role") != "ROLE_ADMIN" || localStorage.getItem("firstLogin") == "true") {
        window.location.replace("http://localhost:8081/error/access-denied.html");
    }
    
    /*-------------------------------------------- INITIAL SETUP ------------------------------------------------------*/
    // hide components (forms & tables) at page load
    $(function () {
        $('#personalDetailsForm, #clients-table-container, #admins-table-container, #all-users-table-container, #subscribers-table-container, #bills-table-container, #services-table-container, #clientsDetailsForm-update, #clientsDetailsForm-create, #adminsDetailsForm-update, #adminsDetailsForm-create, #subscribersDetailsForm-update, #subscribersDetailsForm-create, #billsDetailsForm-create, #servicesDetailsForm-update, #servicesDetailsForm-create')
            .hide();
    });

    $(document).ajaxError(function () {

        alert("Error occurred during ajax request!");
        //window.location.replace("http://localhost:8081/login.html");
    });

    // set logged user and role in footer printRole
    var printUsername = localStorage.getItem("username");
    var printRole = localStorage.getItem("role");

    $("#printUsername").html('<ins>' + printUsername + '</ins>');
    $("#printRole").html('<ins>' + printRole + '</ins>');

    //options += '<option value="' + data[i].username + '">' + data[i].username + '</option>';

    /* DataTables https://datatables.net/manual/installation */

    // set tables to work with DataTable api and make them preserve the last set state (ordering)
    var clientsTable = $('#clients-table').DataTable({
        stateSave: true,
        responsive: true,
    });

    var adminsTable = $('#admins-table').DataTable({
        stateSave: true,
        responsive: true
    });
    var subscribersTable = $('#subscribers-table').DataTable({
        stateSave: true,
        responsive: true
    });
    var servicesTable = $('#services-table').DataTable({
        stateSave: true,
        responsive: true
    });

    // add form validators
    $('#personal-details-update-form').validator();
    $('#client-create-form').validator();
    $('#client-update-form').validator();
    $('#admin-create-form').validator();
    $('#admin-update-form').validator();
    $('#subscriber-create-form').validator();
    $('#subscriber-update-form').validator();
    $('#bill-create-form').validator();
    $('#service-create-form').validator();
    $('#service-update-form').validator();

    //set default values in columns when value is undefined/ empty
    var allUsersTable = $('#all-users-table').DataTable({
        "columns": [
            null,
            null,
            null,
            null,
            {
                "data.eik": "EIK",
                "defaultContent": ""
            },
            {
                "data.emailAddress": "E-mail",
                "defaultContent": ""
            },
            null,
            null
        ],
        stateSave: true,
        responsive: true
    });

    var billsTable = $('#bills-table').DataTable({
        "columns": [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                "data.paymentDate": "Payment date",
                "defaultContent": ""
            }
        ],
        stateSave: true,
        responsive: true
    });

    // set ajax requests header to contain token
    $.ajaxSetup({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
        }
    });

    // logout button
    $("#logoutButton").click(function(ev) {

        localStorage.clear();
        window.location.replace("http://localhost:8081/login.html");
    });

    /*-------------------------------------------- LOADING MODULE TABLES ------------------------------------------------------*/
    $("#personalDetailsButton").click(function (ev) {
        ev.preventDefault;
        $(".container").not("#footer, #footer-container").hide();

        var username = localStorage.getItem("username");

        $.ajax({
            // crossOrigin: true,
            // crossDomain: true,
            type: 'GET',
            xhrFields: {
                withCredentials: false
            },
            url: "http://localhost:8080/api/admin/admins?username=" + username,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                $("#personalDetailsUserId-update").val(data.userId);
                $("#personalDetailsUsername-update").val(data.username);
                $("#personalDetailsEmail-update").val(data.emailAddress);   
                $("personalDetailsPassword1-update").val(null);           
                $("personalDetailsPassword2-update").val(null);

                // validates that again in case update is press again before submit/ cancel form
                $("#personal-details-update-form").validator('validate');
                if ($("#personalDetailsUsername-update").val().length > 0 &&
                    $("#personalDetailsEmail-update").val().length > 0) {
                    $("#personalDetailsSubmitButton-update").prop("disabled", false);
                } else {
                    $("#personalDetailsSubmitButton-update").prop("disabled", true);
                }

                $("#personalDetailsUserId-update, #personalDetailsUsername-update, #personalDetailsEmail-update").change(function () {
                    if ($("#personalDetailsUserId-update").val().length > 0 &&
                        $("#personalDetailsUsername-update").val().length > 0 &&
                        $("#personalDetailsEmail-update").val().length > 0) {

                        $("#personalDetailsSubmitButton-update").prop("disabled", false);
                    } else {
                        $("#personalDetailsSubmitButton-update").prop("disabled", true);
                    }
                });

                $('#personal-details-update-form').validator('update');

                $("#personalDetailsForm").show();
            },
            error: function () {
                console.log("Unsuccessful request");
            }
        });
    });

    $("#clientsButton").click(function (ev) {
        ev.preventDefault;

        $(".container").not("#footer, #footer-container").hide();
        $("#clients-table-container").show();

        $("#clients-table-rows").empty();
        $.ajax({
            // crossOrigin: true,
            // crossDomain: true,
            type: 'GET',
            xhrFields: {
                withCredentials: false
            },
            url: "http://localhost:8080/api/admin/clients/",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                clientsTable.clear();

                $.each(data, function (i) {
                    var index = i + 1;
                    clientsTable.row.add([
                        index,
                        data[i].userId,
                        data[i].username,
                        data[i].eik
                    ]).draw(false);

                });
            },
            error: function () {
                console.log("Unsuccessful request");
            }
        });
    });

    $("#adminsButton").click(function (ev) {
        ev.preventDefault;

        $(".container").not("#footer, #footer-container").hide();
        $("#admins-table-container").show();

        $("#admins-table-rows").empty();
        $.ajax({
            // crossOrigin: true,
            // crossDomain: true,
            type: 'GET',
            xhrFields: {
                withCredentials: false
            },
            url: "http://localhost:8080/api/admin/admins/",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                adminsTable.clear();

                $.each(data, function (i) {
                    var index = i + 1;
                    adminsTable.row.add([
                        index,
                        data[i].userId,
                        data[i].username,
                        data[i].emailAddress,
                        data[i].enabled,
                        data[i].firstLogin
                    ]).draw(false);

                });
            },
            error: function () {
                console.log("Unsuccessful request");
            }
        });
    });

    $("#allUsersButton").click(function (ev) {
        ev.preventDefault;

        $(".container").not("#footer, #footer-container").hide();

        $("#all-users-table-rows").empty();
        $.ajax({
            // crossOrigin: true,
            // crossDomain: true,
            type: 'GET',
            xhrFields: {
                withCredentials: false
            },
            url: "http://localhost:8080/api/admin/users/",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                allUsersTable.clear();

                $.each(data, function (i) {
                    var index = i + 1;
                    allUsersTable.row.add([
                        index,
                        data[i].userId,
                        data[i].username,
                        data[i].role.name,
                        data[i].eik,
                        data[i].emailAddress,
                        data[i].enabled,
                        data[i].firstLogin
                    ]).draw(false);

                });
            },
            error: function () {
                console.log("Unsuccessful request");
            }
        });

        $('#all-users-table-container').show();
    });

    $("#subscribersButton").click(function (ev) {
        ev.preventDefault;

        $(".container").not("#footer, #footer-container").hide();
        $('#subscribers-table-container').show();

        $("#subscribers-table-rows").empty();
        $.ajax({
            // crossOrigin: true,
            // crossDomain: true,
            type: 'GET',
            xhrFields: {
                withCredentials: false
            },
            url: "http://localhost:8080/api/admin/subscribers/",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                subscribersTable.clear();

                $.each(data, function (i) {
                    var index = i + 1;
                    subscribersTable.row.add([
                        index,
                        data[i].phoneNumber,
                        data[i].firstName,
                        data[i].lastName,
                        data[i].egn,
                        data[i].address.country,
                        data[i].address.city,
                        data[i].address.zipCode,
                        data[i].address.street,
                        data[i].bank.username
                    ]).draw(false);
                });
            },
            error: function () {
                console.log("Unsuccessful request");
            }
        });
    });

    $("#billsButton").click(function (ev) {
        ev.preventDefault;

        $(".container").not("#footer, #footer-container").hide();
        $('#bills-table-container').show();

        $("#bills-table-rows").empty();
        $.ajax({
            // crossOrigin: true,
            // crossDomain: true,
            type: 'GET',
            xhrFields: {
                withCredentials: false
            },
            url: "http://localhost:8080/api/admin/bills/",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                billsTable.clear();

                $.each(data, function (i) {
                    billsTable.row.add([
                        data[i].billId,
                        data[i].service.name,
                        data[i].subscriber.phoneNumber,
                        data[i].subscriber.firstName + " " + data[i].subscriber.lastName,
                        data[i].startDate,
                        data[i].endDate,
                        data[i].amount,
                        data[i].currency.currency,
                        data[i].paymentDate
                    ]).draw(false);
                });
            },
            error: function () {
                console.log("Unsuccessful request");
            }
        });
    });

    $("#servicesButton").click(function (ev) {
        ev.preventDefault;

        $(".container").not("#footer, #footer-container").hide();
        $('#services-table-container').show();

        $("#services-table-rows").empty();
        $.ajax({
            // crossOrigin: true,
            // crossDomain: true,
            type: 'GET',
            xhrFields: {
                withCredentials: false
            },
            url: "http://localhost:8080/api/admin/services/",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                servicesTable.clear();

                $.each(data, function (i) {
                    servicesTable.row.add([
                        data[i].serviceId,
                        data[i].name
                    ]).draw(false);
                });
            },
            error: function () {
                console.log("Unsuccessful request");
            }
        });
    });

    /*-------------------------------------------- ADD (SINGLE-)ROW SELECTORS TO TABLES ------------------------------------------------------*/
    // add single row selector to clients table body
    $('#clients-table tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            clientsTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        // hide clients details forms when switching across rows
        $("#clientsDetailsForm-update").hide();
        $("#clientsDetailsForm-create").hide();
    });

    // add single row selector to admins table body
    $('#admins-table tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            adminsTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        // hide admins details forms when switching across rows
        $("#adminsDetailsForm-update").hide();
        $("#adminsDetailsForm-create").hide();
    });

    // add single row selector to all users table body
    $('#all-users-table tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            allUsersTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        // hide all users details forms when switching across rows
        $("#allUsersDetailsForm-update").hide();
        $("#allUsersDetailsForm-create").hide();
    });

    // add single row selector to subscribers table body
    $('#subscribers-table tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            subscribersTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        // hide subscribers details forms when switching across rows
        $("#subscribersDetailsForm-update").hide();
        $("#subscribersDetailsForm-create").hide();
    });

    // add single row selector to bills table body
    $('#bills-table tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            billsTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        // hide bills details forms when switching across rows
        $("#billsDetailsForm-update").hide();
        $("#billsDetailsForm-create").hide();
    });

    // add single row selector to services table body
    $('#services-table tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            servicesTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        // hide services details forms when switching across rows
        $("#servicesDetailsForm-update").hide();
        $("#servicesDetailsForm-create").hide();
    });

    /*-------------------------------------------- ADD BUTTON FUNCTIONALITY TO TABLES ------------------------------------------------------*/

    /*-------------------------------------------- CLIENTS TABLE ------------------------------------------------------*/
    // CLIENTS TABLE - DELETE BUTTON
    $('#deleteClient').click(function () {
        $("#clientsDetailsForm-create").hide();
        $("#clientsDetailsForm-update").hide();
        var data = clientsTable.row('.selected').data();
        if (data == null) {
            alert("No row is selected! Please select a row before deleting!");
        } else {
            clientsTable.row('.selected').remove().draw(false);
            var clientData = data[1];

            $.ajax({
                type: 'DELETE',
                xhrFields: {
                    withCredentials: false
                },
                url: 'http://localhost:8080/api/admin/clients/deleteClient/' + clientData,
                contentType: "application/json",
                data: JSON.stringify(clientData),

                success: function (data) {
                    alert('User successfully deleted!');
                }
            });
        }
    });

    // CLIENTS TABLE - UPDATE BUTTON
    $('#updateClient').click(function () {
        $("#clientsDetailsForm-create").hide();
        var data = clientsTable.row('.selected').data();
        if (data == null) {
            alert("No row is selected! Please select a row before updating!");
        } else {
            // reset previously entered passwords
            data.push(null);
            data.push(null);
            var clientsForm = $('#clientsDetailsForm-update');

            var userId = data[1];
            var username = data[2];
            var eik = data[3];
            var password1 = data[4];
            var password2 = data[5];

            $("#clientUserId-update").val(userId);
            $("#clientUsername-update").val(username);
            $("#clientEik-update").val(eik);
            $("#clientPassword1-update").val(password1);
            $("#clientPassword2-update").val(password2);

            // validates that again in case update is press again before submit/ cancel form
            $("#client-update-form").validator('validate');
            if ($("#clientUsername-update").val().length > 0 &&
            $("#clientEik-update").val().length > 0) {
            $("#clientSubmitButton-update").prop("disabled", false);
        } else {
            $("#clientSubmitButton-update").prop("disabled", true);
        }
        $("#clientUsername-update, #clientEik-update").change(function () {
            if ($("#clientUsername-update").val().length > 0 &&
                $("#clientEik-update").val().length > 0) {
                $("#clientSubmitButton-update").prop("disabled", false);
            } else {
                $("#clientSubmitButton-update").prop("disabled", true);
            }
        });
        $('#client-update-form').validator('update');
            $(clientsForm).show();
        }
    });

    // CREATE CLIENT CONSTRUCTOR
    var Client = function (id, username, password, eik) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.eik = eik;
    }

    // CLIENT TABLE UPDATE FORM - CANCEL BUTTON
    $('#clientCancelButton-update').click(function () {
        $('#client-update-form').submit(function (event) {
            event.preventDefault();
        });
        $("#clientsDetailsForm-update").hide();
    });

    // CLIENT TABLE UPDATE FORM - SUBMIT BUTTON
    $('#clientSubmitButton-update').click(function () {
        $('#client-update-form').submit(function (event) {
            event.preventDefault();
        });
        var userId = $("#clientUserId-update").val();
        var updatedUsername = $("#clientUsername-update").val();
        var updatedEik = $("#clientEik-update").val();
        var updatedPassword = $("#clientPassword1-update").val();
        var updatedPassword2 = $("#clientPassword2-update").val();

        if (updatedPassword != null && updatedPassword != updatedPassword2) {
            alert("Password mismatch! Please check password before making changes!");
        } else {
            var updatedClient = new Client(userId, updatedUsername, updatedPassword, updatedEik);

            $.ajax({
                type: 'PUT',
                xhrFields: {
                    withCredentials: false
                },
                url: 'http://localhost:8080/api/admin/clients/updateClient/' + userId,
                contentType: "application/json",
                data: JSON.stringify(updatedClient),

                success: function (data) {
                    $("#clients-table-rows").empty();
                    $("#clientsDetailsForm-update").hide();
                    $.ajax({
                        // crossOrigin: true,
                        // crossDomain: true,
                        type: 'GET',
                        xhrFields: {
                            withCredentials: false
                        },
                        url: "http://localhost:8080/api/admin/clients/",
                        contentType: "application/json",
                        dataType: "json",
                        success: function (data) {
                            clientsTable.clear();

                            $.each(data, function (i) {
                                var index = i + 1;
                                clientsTable.row.add([
                                    index,
                                    data[i].userId,
                                    data[i].username,
                                    data[i].eik
                                ]).draw(false);
                            });
                        },
                        error: function () {
                            console.log("Unsuccessful request");
                        }
                    });
                }
            });
        };
    });

    // CLIENT TABLE CREATE BUTTON
    $('#createClient').click(function () {
        $("#clientsDetailsForm-update").hide();

        // reset here else submit active if form filled but instead of submit, you press create button again
        $("#client-create-form").get(0).reset();

        if ($("#clientUsername-create").val().length > 0 &&
            $("#clientEik-create").val().length > 0 &&
            $("#clientPassword1-create").val().length > 0 &&
            $("#clientPassword2-create").val().length > 0) {
            $("#clientSubmitButton-create").prop("disabled", false);
        } else {
            $("#clientSubmitButton-create").prop("disabled", true);
        }
        $("#clientUsername-create, #clientEik-create, #clientPassword1-create, #clientPassword2-create").change(function () {
            if ($("#clientUsername-create").val().length > 0 &&
                $("#clientEik-create").val().length > 0 &&
                $("#clientPassword1-create").val().length > 0 &&
                $("#clientPassword2-create").val().length > 0) {
                $("#clientSubmitButton-create").prop("disabled", false);
            } else {
                $("#clientSubmitButton-create").prop("disabled", true);
            }
        });

        $('#client-create-form').validator('update');
        $('#clientsDetailsForm-create').show();
    });

    // CLIENT TABLE CREATE FORM - CANCEL BUTTON
    $('#clientCancelButton-create').click(function () {
        $('#client-create-form').submit(function (event) {
            event.preventDefault();
        });
        $("#clientsDetailsForm-create").hide();
    });

    // CLIENT TABLE CREATE FORM - SUBMIT BUTTON
    $('#clientSubmitButton-create').click(function () {
        $('#client-create-form').submit(function (event) {
            event.preventDefault();
        });
        var newUsername = $("#clientUsername-create").val();
        var newEik = $("#clientEik-create").val();
        var newPassword = $("#clientPassword1-create").val();
        var newPassword2 = $("#clientPassword2-create").val();

        if (newUsername == "" || newEik == "" || newPassword == "" || newPassword2 == "") {
            alert("Please fill all fields in form to continue!");
        } else if (newPassword != null && newPassword != newPassword2) {
            alert("Password mismatch! Please check password before making changes!");
        } else {
            // set user id to 1, which used only for constructor building
            var newClient = new Client(1, newUsername, newPassword, newEik);

            $.ajax({
                type: 'POST',
                xhrFields: {
                    withCredentials: false
                },
                url: 'http://localhost:8080/api/admin/clients/createClient',
                contentType: "application/json",
                data: JSON.stringify(newClient),

                success: function (data) {
                    $("#clients-table-rows").empty();
                    $("#clientsDetailsForm-create").hide();
                    $.ajax({
                        // crossOrigin: true,
                        // crossDomain: true,
                        type: 'GET',
                        xhrFields: {
                            withCredentials: false
                        },
                        url: "http://localhost:8080/api/admin/clients/",
                        contentType: "application/json",
                        dataType: "json",
                        success: function (data) {
                            clientsTable.clear();

                            $.each(data, function (i) {
                                var index = i + 1;
                                clientsTable.row.add([
                                    index,
                                    data[i].userId,
                                    data[i].username,
                                    data[i].eik
                                ]).draw(false);
                            });
                        },
                        error: function () {
                            console.log("Unsuccessful request");
                        }
                    });
                }
            });
        };
    });

    /*-------------------------------------------- ADMINS TABLE ------------------------------------------------------*/
    // ADMINS TABLE - DELETE BUTTON
    $('#deleteAdmin').click(function () {
        $("#adminsDetailsForm-create").hide();
        $("#adminsDetailsForm-update").hide();
        var data = adminsTable.row('.selected').data();
        if (data == null) {
            alert("No row is selected! Please select a row before deleting!");
        } else {
            adminsTable.row('.selected').remove().draw(false);
            var adminId = data[1];

            $.ajax({
                type: 'DELETE',
                xhrFields: {
                    withCredentials: false
                },
                url: 'http://localhost:8080/api/admin/admins/deleteAdmin/' + adminId,
                contentType: "application/json",
                data: JSON.stringify(adminId),

                success: function () {
                    alert('Admin successfully deleted!');
                }
            });
        }
    });

    // ADMINS TABLE - UPDATE BUTTON
    $('#updateAdmin').click(function () {
        $("#adminsDetailsForm-create").hide();
        var data = adminsTable.row('.selected').data();
        if (data == null) {
            alert("No row is selected! Please select a row before updating!");
        } else {
            // reset previously entered passwords
            data.push(null);
            data.push(null);
            var adminsForm = $('#adminsDetailsForm-update');

            var userId = data[1];
            var username = data[2];
            var emailAddress = data[3];
            // set passwords fields to null at start
            var password1 = data[6];
            var password2 = data[7];

            $("#adminUserId-update").val(userId);
            $("#adminUsername-update").val(username);
            $("#adminEmailAddress-update").val(emailAddress);
            $("#adminPassword1-update").val(password1);
            $("#adminPassword2-update").val(password2);

            // validates that again in case update is press again before submit/ cancel form
            $("#admin-update-form").validator('validate');
            if ($("#adminUserId-update").val().length > 0 &&
            $("#adminUsername-update").val().length > 0 &&
            $("#adminEmailAddress-update").val().length > 0) {
            $("#adminSubmitButton-update").prop("disabled", false);
        } else {
            $("#adminSubmitButton-update").prop("disabled", true);
        }

        $("#adminUserId-update, #adminUsername-update, #adminEmailAddress-update, #adminPassword1-update, #adminPassword2-update").change(function () {
            if ($("#adminUserId-update").val().length > 0 &&
                $("#adminUsername-update").val().length > 0 &&
                $("#adminEmailAddress-update").val().length > 0) {
                $("#adminSubmitButton-update").prop("disabled", false);
            } else {
                $("#adminSubmitButton-update").prop("disabled", true);
            }
        });
        $('#admin-update-form').validator('update');
        $(adminsForm).show();
        }
    });

    // CREATE ADMIN CONSTRUCTOR
    var Admin = function (id, username, password, emailAddress) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.emailAddress = emailAddress;
    }

    // ADMIN TABLE UPDATE FORM - CANCEL BUTTON
    $('#adminCancelButton-update').click(function () {
        $('#admin-update-form').submit(function (event) {
            event.preventDefault();
        });
        $("#adminsDetailsForm-update").hide();
    });

    // ADMIN TABLE UPDATE FORM - SUBMIT BUTTON
    $('#adminSubmitButton-update').click(function () {
        $('#admin-update-form').submit(function (event) {
            event.preventDefault();
        });
        var userId = $("#adminUserId-update").val();
        var updatedUsername = $("#adminUsername-update").val();
        var updatedEmailAddress = $("#adminEmailAddress-update").val();
        var updatedPassword = $("#adminPassword1-update").val();
        var updatedPassword2 = $("#adminPassword2-update").val();

        if (updatedPassword != null && updatedPassword != updatedPassword2) {
            alert("Password mismatch! Please check password before making changes!");
        } else {
            var updatedAdmin = new Admin(userId, updatedUsername, updatedPassword, updatedEmailAddress);

            $.ajax({
                type: 'PUT',
                xhrFields: {
                    withCredentials: false
                },
                url: 'http://localhost:8080/api/admin/admins/updateAdmin/' + userId,
                contentType: "application/json",
                data: JSON.stringify(updatedAdmin),

                success: function () {
                    $("#admins-table-rows").empty();
                    $("#adminsDetailsForm-update").hide();
                    $.ajax({
                        // crossOrigin: true,
                        // crossDomain: true,
                        type: 'GET',
                        xhrFields: {
                            withCredentials: false
                        },
                        url: "http://localhost:8080/api/admin/admins/",
                        contentType: "application/json",
                        dataType: "json",
                        success: function (data) {
                            adminsTable.clear();

                            $.each(data, function (i) {
                                var index = i + 1;
                                adminsTable.row.add([
                                    index,
                                    data[i].userId,
                                    data[i].username,
                                    data[i].emailAddress,
                                    data[i].enabled,
                                    data[i].firstLogin
                                ]).draw(false);
                            });
                        },
                        error: function () {
                            console.log("Unsuccessful request");
                        }
                    });
                }
            });
        };
    });

    // ADMIN TABLE CREATE BUTTON
    $('#createAdmin').click(function () {
        $("#adminsDetailsForm-update").hide();

        // reset here else submit active if form filled but instead of submit, you press create button again
        $("#admin-create-form").get(0).reset();

        if ($("#adminUsername-create").val().length > 0 &&
            $("#adminEmailAddress-create").val().length > 0 &&
            $("#adminPassword1-create").val().length > 0 &&
            $("#adminPassword2-create").val().length > 0) {
            $("#adminSubmitButton-create").prop("disabled", false);
        } else {
            $("#adminSubmitButton-create").prop("disabled", true);
        }
        $("#adminUsername-create, #adminEmailAddress-create, #adminPassword1-create, #adminPassword2-create").change(function () {
            if ($("#adminUsername-create").val().length > 0 &&
                $("#adminEmailAddress-create").val().length > 0 &&
                $("#adminPassword1-create").val().length > 0 &&
                $("#adminPassword2-create").val().length > 0) {
                $("#adminSubmitButton-create").prop("disabled", false);
            } else {
                $("#adminSubmitButton-create").prop("disabled", true);
            }
        });
        $('#adminsDetailsForm-create').show();
        $('#admin-create-form').validator('update');
    });


    // ADMIN TABLE CREATE FORM - CANCEL BUTTON
    $('#adminCancelButton-create').click(function () {
        $('#admin-create-form').submit(function (event) {
            event.preventDefault();
        });
        $("#adminsDetailsForm-create").hide();
    });

    // ADMIN TABLE CREATE FORM - SUBMIT BUTTON
    $('#adminSubmitButton-create').click(function () {
        $('#admin-create-form').submit(function (event) {
            event.preventDefault();
        });
        var newUsername = $("#adminUsername-create").val();
        var newEmailAddress = $("#adminEmailAddress-create").val();
        var newPassword = $("#adminPassword1-create").val();
        var newAdmin = new Admin(1, newUsername, newPassword, newEmailAddress);

        $.ajax({
            type: 'POST',
            xhrFields: {
                withCredentials: false
            },
            url: 'http://localhost:8080/api/admin/admins/createAdmin',
            contentType: "application/json",
            data: JSON.stringify(newAdmin),

            success: function (data) {

                $("#admins-table-rows").empty();
                $("#adminsDetailsForm-create").hide();
                $.ajax({
                    // crossOrigin: true,
                    // crossDomain: true,
                    type: 'GET',
                    xhrFields: {
                        withCredentials: false
                    },
                    url: "http://localhost:8080/api/admin/admins/",
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {
                        adminsTable.clear();


                        $.each(data, function (i) {
                            var index = i + 1;
                            adminsTable.row.add([
                                index,
                                data[i].userId,
                                data[i].username,
                                data[i].emailAddress,
                                data[i].enabled,
                                data[i].firstLogin
                            ]).draw(false);
                        });
                    },
                    error: function () {
                        console.log("Unsuccessful request");
                    }
                });
            }
        });
    });

    /*-------------------------------------------- ALL USERS TABLE ------------------------------------------------------*/
    // ALL USERS TABLE - DELETE BUTTON
    $('#deleteAnyUser').click(function () {
        var data = allUsersTable.row('.selected').data();
        if (data == null) {
            alert("No row is selected! Please select a row before deleting!");
        } else {
            allUsersTable.row('.selected').remove().draw(false);
            var userId = data[1];

            $.ajax({
                type: 'DELETE',
                xhrFields: {
                    withCredentials: false
                },
                url: 'http://localhost:8080/api/admin/users/deleteUser/' + userId,
                contentType: "application/json",
                data: JSON.stringify(userId),

                success: function () {
                    alert('User successfully deleted!');
                }
            });
        }
    });

    /*-------------------------------------------- SUBSCRIBERS TABLE ------------------------------------------------------*/
    // SUBSCRIBERS TABLE - DELETE BUTTON
    $('#deleteSubscriber').click(function () {
        $("#subscribersDetailsForm-create").hide();
        $("#subscribersDetailsForm-update").hide();
        var data = subscribersTable.row('.selected').data();
        if (data == null) {
            alert("No row is selected! Please select a row before deleting!");
        } else {
            subscribersTable.row('.selected').remove().draw(false);
            var phoneNumber = data[1];

            $.ajax({
                type: 'DELETE',
                xhrFields: {
                    withCredentials: false
                },
                url: 'http://localhost:8080/api/admin/subscribers/deleteSubscriber/' + phoneNumber,
                contentType: "application/json",
                data: JSON.stringify(phoneNumber),

                success: function () {
                    alert('Subscriber successfully deleted!');
                }
            });
        }
    });

    // SUBSCRIBERS TABLE - UPDATE BUTTON
    $('#updateSubscriber').click(function () {
        $("#subscribersDetailsForm-create").hide();
        var data = subscribersTable.row('.selected').data();
        if (data == null) {
            alert("No row is selected! Please select a row before updating!");
        } else {
            var subscribersForm = $('#subscribersDetailsForm-update');

            var phoneNumber = data[1];
            var firstName = data[2];
            var lastName = data[3];
            var egn = data[4];
            var country = data[5];
            var city = data[6];
            var zipCode = data[7];
            var street = data[8];
            var bank = data[9];

            $("#subscriberPhoneNumber-update").val(phoneNumber);
            $("#subscriberFirstName-update").val(firstName);
            $("#subscriberLastName-update").val(lastName);
            $("#subscriberEgn-update").val(egn);
            $("#subscriberCountry-update").val(country);
            $("#subscriberCity-update").val(city);
            $("#subscriberZipCode-update").val(zipCode);
            $("#subscriberStreet-update").val(street);
            $("#subscriberBank-update").val(bank);

            // validates that again in case update is press again before submit/ cancel form
            $("#subscriber-update-form").validator('validate');
            if ($("#subscriberPhoneNumber-update").val().length > 0 &&
            $("#subscriberFirstName-update").val().length > 0 &&
            $("#subscriberLastName-update").val().length > 0 &&
            $("#subscriberEgn-update").val().length > 0 &&
            $("#subscriberCountry-update").val().length > 0 &&
            $("#subscriberCity-update").val().length > 0 &&
            $("#subscriberZipCode-update").val().length > 0 &&
            $("#subscriberStreet-update").val().length > 0 &&
            $("#subscriberBank-update").val().length >0) {
            $("#subscriberSubmitButton-update").prop("disabled", false);
        } else {
            $("#subscriberSubmitButton-update").prop("disabled", true);
        }

        $("#subscriberPhoneNumber-update, #subscriberFirstName-update, #subscriberLastName-update, #subscriberEgn-update, #subscriberCountry-update, #subscriberCity-update, #subscriberZipCode-update, #subscriberStreet-update, #subscriberBank-update").change(function () {
            if ($("#subscriberPhoneNumber-update").val().length > 0 &&
            $("#subscriberFirstName-update").val().length > 0 &&
            $("#subscriberLastName-update").val().length > 0 &&
            $("#subscriberEgn-update").val().length > 0 &&
            $("#subscriberCountry-update").val().length > 0 &&
            $("#subscriberCity-update").val().length > 0 &&
            $("#subscriberZipCode-update").val().length > 0 &&
            $("#subscriberStreet-update").val().length > 0 &&
            $("#subscriberBank-update").val().length >0) {
                $("#subscriberSubmitButton-update").prop("disabled", false);
            } else {
                $("#subscriberSubmitButton-update").prop("disabled", true);
            }
        });
        $('#subscriber-update-form').validator('update');
        $(subscribersForm).show();
        }
    });

    // CREATE SUBSCRIBER DTO CONSTRUCTOR
    var SubscriberDto = function (phoneNumber, firstName, lastName, egn, country, city, zipCode, street, bank) {
        this.phoneNumber = phoneNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.egn = egn;
        this.country = country;
        this.city = city;
        this.zipCode = zipCode;
        this.street = street;
        this.bank = bank;
    }

    // SUBSCRIBER TABLE UPDATE FORM - CANCEL BUTTON
    $('#subscriberCancelButton-update').click(function () {
        $('#subscriber-update-form').submit(function (event) {
            event.preventDefault();
        });
        $("#subscribersDetailsForm-update").hide();
    });

    // SUBSCRIBER TABLE UPDATE FORM - SUBMIT BUTTON
    $('#subscriberSubmitButton-update').click(function () {
        $('#subscriber-update-form').submit(function (event) {
            event.preventDefault();
        });
        var updatedPhoneNumber = $("#subscriberPhoneNumber-update").val();
        var updatedFirstName = $("#subscriberFirstName-update").val();
        var updatedLastName = $("#subscriberLastName-update").val();
        var updatedEgn = $("#subscriberEgn-update").val();
        var updatedCountry = $("#subscriberCountry-update").val();
        var updatedCity = $("#subscriberCity-update").val();
        var updatedZipCode = $("#subscriberZipCode-update").val();
        var updatedStreet = $("#subscriberStreet-update").val();
        var updatedBank = $("#subscriberBank-update").val();

        // check if entered bank on subscriber update exists; if not, alert and do nothing;
        var bankFoundInDb = false;
        $.ajax({
            // crossOrigin: true,
            // crossDomain: true,
            type: 'GET',
            xhrFields: {
                withCredentials: false
            },
            url: "http://localhost:8080/api/admin/clients/",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                $.each(data, function (i) {
                    if(updatedBank == data[i].username) {
                        bankFoundInDb = true;
                        return false;
                    }
                });

                if (bankFoundInDb == false) {
                    alert("No bank with this name exist! Please change bank's name to continue!");
                } else {
                    var updateSubscriberDto = new SubscriberDto(updatedPhoneNumber, updatedFirstName, updatedLastName, updatedEgn, updatedCountry, updatedCity, updatedZipCode, updatedStreet, updatedBank);

                    $.ajax({
                        type: 'PUT',
                        xhrFields: {
                            withCredentials: false
                        },
                        url: 'http://localhost:8080/api/admin/subscribers/updateSubscriber/' + updatedPhoneNumber,
                        contentType: "application/json",
                        data: JSON.stringify(updateSubscriberDto),

                        success: function () {
                            $("#subscribers-table-rows").empty();
                            $("#subscribersDetailsForm-update").hide();
                            $.ajax({
                                // crossOrigin: true,
                                // crossDomain: true,
                                type: 'GET',
                                xhrFields: {
                                    withCredentials: false
                                },
                                url: "http://localhost:8080/api/admin/subscribers/",
                                contentType: "application/json",
                                dataType: "json",
                                success: function (data) {
                                    subscribersTable.clear();

                                    $.each(data, function (i) {
                                        var index = i + 1;
                                        subscribersTable.row.add([
                                            index,
                                            data[i].phoneNumber,
                                            data[i].firstName,
                                            data[i].lastName,
                                            data[i].egn,
                                            data[i].address.country,
                                            data[i].address.city,
                                            data[i].address.zipCode,
                                            data[i].address.street,
                                            data[i].bank.username
                                        ]).draw(false);
                                    });
                                },
                                error: function () {
                                    console.log("Unsuccessful request");
                                }
                            });
                        }
                    });
                }
            },
            error: function () {
                console.log("Unsuccessful request");
            }
        });
    });

    // SUBSCRIBER TABLE CREATE BUTTON
    $('#createSubscriber').click(function () {
        $("#subscribersDetailsForm-update").hide();

        // reset here else submit active if form filled but instead of submit, you press create button again
        $("#subscriber-create-form").get(0).reset();

        if ($("#subscriberPhoneNumber-create").val().length > 0 &&
            $("#subscriberFirstName-create").val().length > 0 &&
            $("#subscriberLastName-create").val().length > 0 &&
            $("#subscriberEgn-create").val().length > 0 &&
            $("#subscriberCountry-create").val().length > 0 &&
            $("#subscriberCity-create").val().length > 0 &&
            $("#subscriberZipCode-create").val().length > 0 &&
            $("#subscriberStreet-create").val().length) {
            $("#subscriberSubmitButton-create").prop("disabled", false);
        } else {
            $("#subscriberSubmitButton-create").prop("disabled", true);
        }
        $("#subscriberPhoneNumber-create, #subscriberFirstName-create, #subscriberLastName-create, #subscriberEgn-create, #subscriberCountry-create, #subscriberCity-create, #subscriberZipCode-create, #subscriberStreet-create").change(function () {
            if ($("#subscriberPhoneNumber-create").val().length > 0 &&
                $("#subscriberFirstName-create").val().length > 0 &&
                $("#subscriberLastName-create").val().length > 0 &&
                $("#subscriberEgn-create").val().length > 0 &&
                $("#subscriberCountry-create").val().length > 0 &&
                $("#subscriberCity-create").val().length > 0 &&
                $("#subscriberZipCode-create").val().length > 0 &&
                $("#subscriberStreet-create").val().length) {
                $("#subscriberSubmitButton-create").prop("disabled", false);
            } else {
                $("#subscriberSubmitButton-create").prop("disabled", true);
            }
        });
        
        $('#subscriber-create-form').validator('update');

        $.ajax({
            // crossOrigin: true,
            // crossDomain: true,
            type: 'GET',
            xhrFields: {
                withCredentials: false
            },
            url: "http://localhost:8080/api/admin/clients/",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                var options = '';
                $.each(data, function (i) {
                    options += '<option value="' + data[i].username + '">' + data[i].username + '</option>';


                });
                $('#subscriber-bank-select').html(options);
            },
            error: function () {
                console.log("Unsuccessful request");
            }
        });
        $('#subscribersDetailsForm-create').show();
    });

    // SUBSCRIBER TABLE CREATE FORM - CANCEL BUTTON
    $('#subscriberCancelButton-create').click(function () {
        $('#subscriber-create-form').submit(function (event) {
            event.preventDefault();
        });
        $("#subscribersDetailsForm-create").hide();
    });

    // SUBSCRIBER TABLE CREATE FORM - SUBMIT BUTTON
    $('#subscriberSubmitButton-create').click(function () {
        $('#subscriber-create-form').submit(function (event) {
            event.preventDefault();
        });
        var newPhoneNumber = $("#subscriberPhoneNumber-create").val();
        var newFirstName = $("#subscriberFirstName-create").val();
        var newLastName = $("#subscriberLastName-create").val();
        var newEgn = $("#subscriberEgn-create").val();
        var newCountry = $("#subscriberCountry-create").val();
        var newCity = $("#subscriberCity-create").val();
        var newZipCode = $("#subscriberZipCode-create").val();
        var newStreet = $("#subscriberStreet-create").val();
        var newBank = $("#subscriber-bank-select").val();

        if (newPhoneNumber == "" || newFirstName == "" || newLastName == "" || newEgn == "" || newCountry == "" || newCity == "" || newZipCode == "" || newStreet == "" || newBank == "") {
            alert("Please fill all fields in form to continue!");
        } else {
            var newSubscriberDto = new SubscriberDto(newPhoneNumber, newFirstName, newLastName, newEgn, newCountry, newCity, newZipCode, newStreet, newBank);
            console.log(newSubscriberDto);
            $.ajax({
                type: 'POST',
                xhrFields: {
                    withCredentials: false
                },
                url: 'http://localhost:8080/api/admin/subscribers/createSubscriber',
                contentType: "application/json",
                data: JSON.stringify(newSubscriberDto),

                success: function (data) {
                    $("#subscribers-table-rows").empty();
                    $("#subscribersDetailsForm-create").hide();
                    $.ajax({
                        // crossOrigin: true,
                        // crossDomain: true,
                        type: 'GET',
                        xhrFields: {
                            withCredentials: false
                        },
                        url: "http://localhost:8080/api/admin/subscribers/",
                        contentType: "application/json",
                        dataType: "json",
                        success: function (data) {
                            subscribersTable.clear();

                            $.each(data, function (i) {
                                var index = i + 1;
                                subscribersTable.row.add([
                                    index,
                                    data[i].phoneNumber,
                                    data[i].firstName,
                                    data[i].lastName,
                                    data[i].egn,
                                    data[i].address.country,
                                    data[i].address.city,
                                    data[i].address.zipCode,
                                    data[i].address.street,
                                    data[i].bank.username
                                ]).draw(false);
                            });
                        },
                        error: function () {
                            console.log("Unsuccessful request");
                        }
                    });
                }
            });
        };
    });
    /*-------------------------------------------- BILLS TABLE ------------------------------------------------------*/

    // CREATE BILL DTO CONSTRUCTOR
    var billDto = function (billId, service, phoneNumber, startDate, endDate, amount, currency) {
        this.billId = billId;
        this.service = service;
        this.phoneNumber = phoneNumber;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.currency = currency;
    }

    // BILL TABLE CREATE BUTTON
    $('#createBill').click(function () {

        // reset here else submit active if form filled but instead of submit, you press create button again
        $("#bill-create-form").get(0).reset();
        if ($("#billStartDate-create").val().length > 0 &&
            $("#billEndDate-create").val().length > 0 &&
            $("#billAmount-create").val().length > 0) {
            $("#billSubmitButton-create").prop("disabled", false);
        } else {
            $("#billSubmitButton-create").prop("disabled", true);
        }
        $("#billStartDate-create, #billEndDate-create, #billAmount-create").change(function () {
            if ($("#billStartDate-create").val().length > 0 &&
            $("#billEndDate-create").val().length > 0 &&
            $("#billAmount-create").val().length > 0) {
                $("#billSubmitButton-create").prop("disabled", false);
            } else {
                $("#billSubmitButton-create").prop("disabled", true);
            }
        });

        $('#bill-create-form').validator('update');

        $.ajax({
            // crossOrigin: true,
            // crossDomain: true,
            type: 'GET',
            xhrFields: {
                withCredentials: false
            },
            url: "http://localhost:8080/api/admin/services/",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                var options = '';
                $.each(data, function (i) {
                    options += '<option class="form-control form-control-sm" value="' + data[i].name + '">' + data[i].name + '</option>';


                });
                $('#bill-service-select').html(options);
            },
            error: function () {
                console.log("Unsuccessful request");
            }
        });

        $.ajax({
            // crossOrigin: true,
            // crossDomain: true,
            type: 'GET',
            xhrFields: {
                withCredentials: false
            },
            url: "http://localhost:8080/api/admin/subscribers/",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                var options = '';
                $.each(data, function (i) {
                    options += '<option class="form-control form-control-sm" value="' + data[i].phoneNumber + '">' + data[i].phoneNumber + '</option>';


                });
                $('#bill-subscriber-select').html(options);
            },
            error: function () {
                console.log("Unsuccessful request");
            }
        });

        $.ajax({
            // crossOrigin: true,
            // crossDomain: true,
            type: 'GET',
            xhrFields: {
                withCredentials: false
            },
            url: "http://localhost:8080/api/admin/currencies/",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                var options = '';
                $.each(data, function (i) {
                    options += '<option class="form-control form-control-sm" value="' + data[i].currency + '">' + data[i].currency + '</option>';


                });
                $('#bill-currency-select').html(options);
            },
            error: function () {
                console.log("Unsuccessful request");
            }
        });

        $('#billsDetailsForm-create').show();
    });

    // BILL TABLE CREATE FORM - CANCEL BUTTON
    $('#billCancelButton-create').click(function () {
        $('#bill-create-form').submit(function (event) {
            event.preventDefault();
        });
        $("#billsDetailsForm-create").hide();
    });

    // BILL TABLE CREATE FORM - SUBMIT BUTTON
    $('#billSubmitButton-create').click(function () {
        $('#bill-create-form').submit(function (event) {
            event.preventDefault();
        });
        var newService = $("#bill-service-select").val();
        var newPhoneNumber = $("#bill-subscriber-select").val();
        var newStartDate = $("#billStartDate-create").val();
        var newEndDate = $("#billEndDate-create").val();
        var newAmount = $("#billAmount-create").val();
        var newCurrency = $("#bill-currency-select").val();

        if (newAmount < 0) {
            alert("Please enter a positive number for amount!")
        } else {
            var newBillDto = new billDto(1, newService, newPhoneNumber, newStartDate, newEndDate, newAmount, newCurrency);

            $.ajax({
                type: 'POST',
                xhrFields: {
                    withCredentials: false
                },
                url: 'http://localhost:8080/api/admin/bills/createBill',
                contentType: "application/json",
                data: JSON.stringify(newBillDto),

                success: function (data) {
                    $("#bills-table-rows").empty();
                    $("#billsDetailsForm-create").hide();
                    $.ajax({
                        // crossOrigin: true,
                        // crossDomain: true,
                        type: 'GET',
                        xhrFields: {
                            withCredentials: false
                        },
                        url: "http://localhost:8080/api/admin/bills/",
                        contentType: "application/json",
                        dataType: "json",
                        success: function (data) {
                            billsTable.clear();

                            $.each(data, function (i) {
                                billsTable.row.add([
                                    data[i].billId,
                                    data[i].service.name,
                                    data[i].subscriber.phoneNumber,
                                    data[i].subscriber.firstName + " " + data[i].subscriber.lastName,
                                    data[i].startDate,
                                    data[i].endDate,
                                    data[i].amount,
                                    data[i].currency.currency,
                                    data[i].paymentDate
                                ]).draw(false);
                            });
                        },
                        error: function () {
                            console.log("Unsuccessful request");
                        }
                    });
                }
            });
        };
    });

    /*-------------------------------------------- SERVICES TABLE ------------------------------------------------------*/
    // SERVICES TABLE - DELETE BUTTON
    $('#deleteService').click(function () {
        $("#servicesDetailsForm-create").hide();
        $("#servicesDetailsForm-update").hide();
        var data = servicesTable.row('.selected').data();
        if (data == null) {
            alert("No row is selected! Please select a row before deleting!");
        } else {
            servicesTable.row('.selected').remove().draw(false);
            var serviceId = data[0];

            $.ajax({
                type: 'DELETE',
                xhrFields: {
                    withCredentials: false
                },
                url: 'http://localhost:8080/api/admin/services/deleteService/' + serviceId,
                contentType: "application/json",
                data: JSON.stringify(serviceId),

                success: function (data) {
                    alert('Service successfully deleted!');
                }
            });
        }
    });

    // SERVICES TABLE - UPDATE BUTTON
    $('#updateService').click(function () {
        $("#servicesDetailsForm-create").hide();
        var data = servicesTable.row('.selected').data();
        if (data == null) {
            alert("No row is selected! Please select a row before updating!");
        } else {
            var servicesForm = $('#servicesDetailsForm-update');

            var serviceId = data[0];
            var serviceName = data[1];

            $("#serviceServiceId-update").val(serviceId);
            $("#serviceName-update").val(serviceName);


            // validates that again in case update is press again before submit/ cancel form
            $("#service-update-form").validator('validate');
            if ($("#serviceServiceId-update").val().length > 0 &&
                $("#serviceName-update").val().length > 0) {

                $("#serviceSubmitButton-update").prop("disabled", false);
            } else {
                $("#serviceSubmitButton-update").prop("disabled", true);
            }

            $("#serviceServiceId-update, #serviceName-update").change(function () {
            if ($("#serviceServiceId-update").val().length > 0 &&
                $("#serviceName-update").val().length > 0) {

                $("#serviceSubmitButton-update").prop("disabled", false);
            } else {
                $("#serviceSubmitButton-update").prop("disabled", true);
            }
            });
            $('#service-update-form').validator('update');

            $(servicesForm).show();
        }
    });

    // CREATE SERVICE CONSTRUCTOR
    var Service = function (id, name) {
        this.id = id;
        this.name = name;
    }

    // SERVICE TABLE UPDATE FORM - CANCEL BUTTON
    $('#serviceCancelButton-update').click(function () {
        $('#service-update-form').submit(function (event) {
            event.preventDefault();
        });
        $("#servicesDetailsForm-update").hide();
    });

    // SERVICE TABLE UPDATE FORM - SUBMIT BUTTON
    $('#serviceSubmitButton-update').click(function () {
        $('#service-update-form').submit(function (event) {
            event.preventDefault();
        });
        var serviceId = $("#serviceServiceId-update").val();
        var updatedServiceName = $("#serviceName-update").val();

        if (updatedServiceName == "") {
            alert("Please fill service name!");
        } else {
            var updatedService = new Service(serviceId, updatedServiceName);

            $.ajax({
                type: 'PUT',
                xhrFields: {
                    withCredentials: false
                },
                url: 'http://localhost:8080/api/admin/services/updateService/' + serviceId,
                contentType: "application/json",
                data: JSON.stringify(updatedService),

                success: function (data) {
                    $("#services-table-rows").empty();
                    $("#servicesDetailsForm-update").hide();
                    $.ajax({
                        // crossOrigin: true,
                        // crossDomain: true,
                        type: 'GET',
                        xhrFields: {
                            withCredentials: false
                        },
                        url: "http://localhost:8080/api/admin/services/",
                        contentType: "application/json",
                        dataType: "json",
                        success: function (data) {
                            servicesTable.clear();

                            $.each(data, function (i) {
                                servicesTable.row.add([
                                    data[i].serviceId,
                                    data[i].name
                                ]).draw(false);
                            });
                        },
                        error: function () {
                            console.log("Unsuccessful request");
                        }
                    });
                }
            });
        };
    });

    // SERVICE TABLE CREATE BUTTON
    $('#createService').click(function () {
        $("#servicesDetailsForm-update").hide();

        // reset here else submit active if form filled but instead of submit, you press create button again
        $("#service-create-form").get(0).reset();

        if ($("#serviceName-create").val().length > 0) {
            $("#serviceSubmitButton-create").prop("disabled", false);
        } else {
            $("#serviceSubmitButton-create").prop("disabled", true);
        }
        $("#serviceName-create").change(function () {
            if ($("#serviceName-create").val().length > 0) {
                $("#serviceSubmitButton-create").prop("disabled", false);
            } else {
                $("#serviceSubmitButton-create").prop("disabled", true);
            }
        });

        $('#service-create-form').validator('update');

        $('#servicesDetailsForm-create').show();
    });

    // SERVICE TABLE CREATE FORM - CANCEL BUTTON
    $('#serviceCancelButton-create').click(function () {
        $('#service-create-form').submit(function (event) {
            event.preventDefault();
        });
        $("#servicesDetailsForm-create").hide();
    });

    // SERVICE TABLE CREATE FORM - SUBMIT BUTTON
    $('#serviceSubmitButton-create').click(function () {
        $('#service-create-form').submit(function (event) {
            event.preventDefault();
        });
        var newServiceName = $("#serviceName-create").val();

        if (newServiceName == "") {
            alert("Please fill service name to continue!");
        } else {
            // set service id to 1, which used only for constructor building
            var newService = new Service(1, newServiceName);

            $.ajax({
                type: 'POST',
                xhrFields: {
                    withCredentials: false
                },
                url: 'http://localhost:8080/api/admin/services/createService',
                contentType: "application/json",
                data: JSON.stringify(newService),

                success: function (data) {
                    $("#services-table-rows").empty();
                    $("#servicesDetailsForm-create").hide();
                    $.ajax({
                        // crossOrigin: true,
                        // crossDomain: true,
                        type: 'GET',
                        xhrFields: {
                            withCredentials: false
                        },
                        url: "http://localhost:8080/api/admin/services/",
                        contentType: "application/json",
                        dataType: "json",
                        success: function (data) {
                            servicesTable.clear();

                            $.each(data, function (i) {
                                servicesTable.row.add([
                                    data[i].serviceId,
                                    data[i].name
                                ]).draw(false);
                            });
                        },
                        error: function () {
                            console.log("Unsuccessful request");
                        }
                    });
                }
            });
        };
    });

    /*------------------------------------------ PERSONAL DETAILS FORM --------------------------------------------------------------------*/

    // ADMIN PERSONAL DETAILS OF LOGGED USER - UPDATE FORM - CANCEL BUTTON
    $('#personalDetailsCancelButton-update').click(function () {
        $('#personal-details-update-form').submit(function (event) {
            event.preventDefault();
        });

        var userId = $("#personalDetailsUserId-update").val();
        
        $.ajax({
            // crossOrigin: true,
            // crossDomain: true,
            type: 'GET',
            xhrFields: {
                withCredentials: false
            },
            url: "http://localhost:8080/api/admin/admins/" + userId,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                $("#personalDetailsUserId-update").val(data.userId);
                $("#personalDetailsUsername-update").val(data.username);
                $("#personalDetailsEmail-update").val(data.emailAddress);   
                $("personalDetailsPassword1-update").val(null);           
                $("personalDetailsPassword2-update").val(null);
            },
            error: function () {
                console.log("Unsuccessful request");
            }
        });

        // validates that again in case update is press again before submit/ cancel form
        $("#personal-details-update-form").validator('validate');
        if ($("#personalDetailsUserId-update").val().length > 0 &&
            $("#personalDetailsUsername-update").val().length > 0 &&
            $("#personalDetailsEmail-update").val().length > 0) {
            $("#personalDetailsSubmitButton-update").prop("disabled", false);
        } else {
            $("#personalDetailsSubmitButton-update").prop("disabled", true);
        }

        $("#personalDetailsUserId-update, #personalDetailsUsername-update, #personalDetailsEmail-update").change(function () {
            if ($("#personalDetailsUserId-update").val().length > 0 &&
                $("#personalDetailsUsername-update").val().length > 0 &&
                $("#personalDetailsEmail-update").val().length > 0) {

                $("#personalDetailsSubmitButton-update").prop("disabled", false);
            } else {
                $("#personalDetailsSubmitButton-update").prop("disabled", true);
            }
        });

        $('#personal-details-update-form').validator('update');
    });

    // ADMIN PERSONAL DETAILS UPDATE FORM - SUBMIT BUTTON
    $('#personalDetailsSubmitButton-update').click(function () {
        $('#admin-update-form').submit(function (event) {
            event.preventDefault();
        });

        var userId = $("#personalDetailsUserId-update").val();
        var updatedUsername = $("#personalDetailsUsername-update").val();
        var updatedEmailAddress = $("#personalDetailsEmailAddress-update").val();
        var updatedPassword = $("#personalDetailsPassword1-update").val();
        var updatedPassword2 = $("#personalDetailsPassword2-update").val();

        var updatedAdminPD = new Admin(userId, updatedUsername, updatedPassword, updatedEmailAddress);

        $.ajax({
            type: 'PUT',
            xhrFields: {
                withCredentials: false
            },
            url: 'http://localhost:8080/api/admin/admins/updateAdmin/' + userId,
            contentType: "application/json",
            data: JSON.stringify(updatedAdminPD),

            success: function () {
                localStorage.clear();
                window.location.replace("http://localhost:8081/login.html");
                alert("You have been logged out due to profile change. Please log in to continue!");
            }
        });
    });
});