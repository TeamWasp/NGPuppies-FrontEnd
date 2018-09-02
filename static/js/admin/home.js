$(document).ready(function() {

  // hide components (forms & tables) at page load
  $(function() {
    $('#personalDetailsForm, #clients-table-container, #admins-table-container, #all-users-table-container, #subscribers-table-container, #bills-table-container, #services-table-container')
        .hide();
  });

  /* DataTables https://datatables.net/manual/installation */

  // set tables to work with DataTable api and make them preserve the last set state (ordering)
  var clientsTable = $('#clients-table').DataTable({
    stateSave: true,
    responsive: true
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

  /* $('#clients-table tbody').on( 'click', 'tr', function () {
    $(this).toggleClass('selected');
  }); */

  $('#clients-table tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        clientsTable.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
  });

  $('#deleteClient').click( function () {
        clientsTable.row('.selected').remove().draw( false );
        var data = clientsTable.rows('.selected').data();
        console.log(data);
        var clientData = [];
        clientData.push(data[0][1]);
        $.ajax({
            type: 'DELETE',
            xhrFields: { withCredentials: false },
            url: 'http://localhost:8080/api/admin/clients/deleteClient/' + clientId,
            contentType: "application/json",
            data: JSON.stringify(clientData),
      
            success: function(data) {
              alert('Load was performed.');
              location.reload();
            }
          });
  });

  /* $("#updateClient").click(function(){
      alert("edit button click");
    /* var billData = unpaidTable.rows('.selected').data();
    var newData=[];
    $.each(billData,function(i){
      newData.push(billData[i][0]);
    });

    $.ajax({
      type: 'PUT',
      xhrFields: { withCredentials: false },
      url: 'http://localhost:8080/api/client/bills/pay',
      contentType: "application/json",
      data: JSON.stringify(newData),

      success: function(data) {
        alert('Load was performed.');
        location.reload();
      }
    }); */
  //}); */
});