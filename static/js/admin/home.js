$(document).ready(function() {

  // hide components (forms & tables) at page load
  $(function() {
    $('#personalDetailsForm, #clients-table-container, #admins-table-container, #all-users-table-container, #subscribers-table-container, #bills-table-container, #services-table-container')
        .hide();
  });

  /* DataTables https://datatables.net/manual/installation */

  // set tables to work with DataTable api
  var clientsTable = $('#clients-table').DataTable();
  var adminsTable = $('#admins-table').DataTable();
  var subscribersTable = $('#subscribers-table').DataTable();
  var servicesTable = $('#services-table').DataTable();
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
    ]
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
    ]
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
                  data[i].subscriber.egn,
                  data[i].subscriber.address.country,
                  data[i].subscriber.address.city,
                  data[i].subscriber.address.zipCode,
                  data[i].subscriber.address.street,
                  data[i].subscriber.bank.username
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

  //$.fn.dataTable.ext.errMode = 'none';
  

    /* $("#createClient").click(function(ev){
      ev.preventDefault();
        $.ajax({
          method: 'GET',
          url: 'localhost:8080/api/admin/services/1',
          dataType: 'json',
          // Fetch the stored token from localStorage and set in the header
          headers: {"Authorization": localStorage.getItem('token')}
      }).done(function(data){        
          alert("serviceId is " + data.item.serviceId);
          /* $.each(data, function(index, item){
            var $tr = $('<tr>').append(
              $('<td>').text(item.serviceId),
              $('<td>').text(item.name)
          ).appendTo('#records_table');*/
          /*});
    }); */

    /* $("#proceed").on("click", function () {
      $("#clients-table-rows").empty();
      var invoices = $.ajax({
          type: 'GET',
          url: "http://localhost:8080/api/admin/clients/",
          contentType: "application/json",
          success: function (data) {
              var tbody = $("#clients-table-rows"),
                  props = ["username", "password", "EIK"];
              $.each(data, function (i, data) {
                  var tr = $('<tr>');
                  $('<input' + " value=" + data["userId"] + ' type="checkbox" class="form-check-input" checked="checked">').appendTo(tr);
                  $.each(props, function (i, prop) {
                      $('<td>').html(data[prop]).appendTo(tr);
                  });
              });
          },
          error: function () {
              console.log("Unsuccessful request");
          }
      })
    }); */

    // $('#test').click(function (ev) {
    //     ev.preventDefault();

    //     var token = localStorage.getItem("token");
    //     $.ajaxSetup({
    //         headers : {
    //           'Authorization' : 'Bearer '+token,
    //         }
    //       });

    //     var jqxhr = $.getJSON( "http://localhost:8080/api/admin/admins/", function() {
    //         console.log( "success" );
    //       })
    //         .done(function() {
    //           console.log( "second success" );
    //         })
    //         .fail(function() {
    //           console.log( "error" );
    //         })
    //         .always(function() {
    //           console.log( "complete" );
    //         });
    // });
});