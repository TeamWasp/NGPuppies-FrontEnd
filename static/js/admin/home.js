$(document).ready(function() {

  /*-------------------------------------------- INITIAL SETUP ------------------------------------------------------*/
  // hide components (forms & tables) at page load
  $(function() {
    $('#personalDetailsForm, #clients-table-container, #admins-table-container, #all-users-table-container, #subscribers-table-container, #bills-table-container, #services-table-container, #clientsDetailsForm-update, #clientsDetailsForm-create')
        .hide();
  });

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
  //set default values in columns when value is undefined/ empty
  var allUsersTable = $('#all-users-table').DataTable({
    "columns": [
        null,
        null,
        null,
        { "data.eik": "EIK", "defaultContent": "" },
        { "data.emailAddress": "E-mail", "defaultContent": "" },
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
        { "data.paymentDate": "Payment date", "defaultContent": "" }
    ],
    stateSave: true,
    responsive: true
  });  

  // set ajax requests header to contain token
  $.ajaxSetup({
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' +  localStorage.getItem("token"));
    }
  });

  /*-------------------------------------------- LOADING MODULE TABLES ------------------------------------------------------*/
  $("#personalDetailsButton").click(function(ev){
    ev.preventDefault;

    $(".container").not("#footer").hide();
    $("#personalDetailsForm").show();
  });

  $("#clientsButton").click(function(ev){
    ev.preventDefault;

    $(".container").not("#footer").hide();
    $("#clients-table-container").show();

    $("#clients-table-rows").empty();
      $.ajax({
         // crossOrigin: true,
         // crossDomain: true,
          type: 'GET',
          xhrFields: { withCredentials: false },
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

  $("#adminsButton").click(function(ev){
    ev.preventDefault;
    
    $(".container").not("#footer").hide();
    $("#admins-table-container").show();

    $("#admins-table-rows").empty();
      $.ajax({
         // crossOrigin: true,
         // crossDomain: true,
          type: 'GET',
          xhrFields: { withCredentials: false },
          url: "http://localhost:8080/api/admin/admins/",
          contentType: "application/json",
          dataType: "json",
          success: function (data) {
            adminsTable.clear();

            $.each(data, function (i) {
              var index = i + 1;
              adminsTable.row.add([
                  index, 
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

  $("#allUsersButton").click(function(ev){
    ev.preventDefault;
    
    $(".container").not("#footer").hide();

    $("#all-users-table-rows").empty();
      $.ajax({
         // crossOrigin: true,
         // crossDomain: true,
          type: 'GET',
          xhrFields: { withCredentials: false },
          url: "http://localhost:8080/api/admin/users/",
          contentType: "application/json",
          dataType: "json",
          success: function (data) {
              allUsersTable.clear();

                  $.each(data, function (i) {
                    var index = i + 1;
                    allUsersTable.row.add([
                        index, 
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

  $("#subscribersButton").click(function(ev){
    ev.preventDefault;
    
    $(".container").not("#footer").hide();
    $('#subscribers-table-container').show();

    $("#subscribers-table-rows").empty();
      $.ajax({
         // crossOrigin: true,
         // crossDomain: true,
          type: 'GET',
          xhrFields: { withCredentials: false },
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

  $("#billsButton").click(function(ev){
    ev.preventDefault;
    
    $(".container").not("#footer").hide();
    $('#bills-table-container').show();

    $("#bills-table-rows").empty();
      $.ajax({
         // crossOrigin: true,
         // crossDomain: true,
          type: 'GET',
          xhrFields: { withCredentials: false },
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

  $("#servicesButton").click(function(ev){
    ev.preventDefault;
    
    $(".container").not("#footer").hide();
    $('#services-table-container').show();

    $("#services-table-rows").empty();
    $.ajax({
       // crossOrigin: true,
       // crossDomain: true,
        type: 'GET',
        xhrFields: { withCredentials: false },
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
  $('#clients-table tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        clientsTable.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
    // hide clients details form when switching across rows
    $("#clientsDetailsForm-update").hide();
    $("#clientsDetailsForm-create").hide();
  });
    // CLIENTS TABLE - DELETE BUTTON
  $('#deleteClient').click( function () {
        var data = clientsTable.row('.selected').data();
        console.log(data);
        clientsTable.row('.selected').remove().draw( false );
        var clientData = data[1];
        
        $.ajax({
            type: 'DELETE',
            xhrFields: { withCredentials: false },
            url: 'http://localhost:8080/api/admin/clients/deleteClient/' + clientData,
            contentType: "application/json",
            data: JSON.stringify(clientData),
      
            success: function(data) {
              alert('Load was performed.');
            }
          });
  });

  // CLIENTS TABLE - UPDATE BUTTON
  $('#updateClient').click( function () {
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

            $(clientsForm).show();
        }
  });

  // CREATE CLIENT CONSTRUCTOR
  var Client = function(id, username, password, eik) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.eik = eik;
    }

    // CLIENT TABLE UPDATE FORM - CANCEL BUTTON
  $('#clientCancelButton-update').click( function () {
    $("#clientsDetailsForm-update").hide();
  });

    // CLIENT TABLE UPDATE FORM - SUBMIT BUTTON
  $('#clientSubmitButton-update').click( function () {
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
            xhrFields: { withCredentials: false },
            url: 'http://localhost:8080/api/admin/clients/updateClient/' + userId,
            contentType: "application/json",
            data: JSON.stringify(updatedClient),
    
            success: function(data) {
              $("#clients-table-rows").empty();
              $("#clientsDetailsForm-update").hide();
                $.ajax({
                    // crossOrigin: true,
                    // crossDomain: true,
                    type: 'GET',
                    xhrFields: { withCredentials: false },
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
  $('#createClient').click( function () {
    $("#clientsDetailsForm-update").hide();
      var data = [];
      data.push(null);
      var defaultVal = data[0];
      $("#clientUsername-create").val(defaultVal);
      $("#clientEik-create").val(defaultVal);
      $("#clientPassword1-create").val(defaultVal);
      $("#clientPassword2-create").val(defaultVal);
      $('#clientsDetailsForm-create').show();
  });

  // CLIENT TABLE CREATE FORM - CANCEL BUTTON
  $('#clientCancelButton-create').click( function () {
    $("#clientsDetailsForm-create").hide();
  });

    // CLIENT TABLE CREATE FORM - SUBMIT BUTTON
  $('#clientSubmitButton-create').click( function () {
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
            xhrFields: { withCredentials: false },
            url: 'http://localhost:8080/api/admin/clients/createClient',
            contentType: "application/json",
            data: JSON.stringify(newClient),
    
            success: function(data) {
              $("#clients-table-rows").empty();
              $("#clientsDetailsForm-create").hide();
                $.ajax({
                    // crossOrigin: true,
                    // crossDomain: true,
                    type: 'GET',
                    xhrFields: { withCredentials: false },
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
});