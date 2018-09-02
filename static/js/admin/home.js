$(document).ready(function() {

  /* DataTables https://datatables.net/manual/installation */
  $('table').DataTable();
  /* $('table').DataTable( {
    select: true
  }); */

  $.ajaxSetup({
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' +  localStorage.getItem("token"));
    }
  });

  // hide components (forms & tables) at page load
  $(function() {
    $('#personalDetailsForm, #clients-table-container, #admins-table-container, #all-users-table-container, #subscribers-table-container, #bills-table-container, #services-table-container')
        .hide();
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
              //alert(data);
              var tbody = $("#clients-table-rows");

                  $.each(data, function (i) {
                    var index = i + 1;
                    var str = '<tr><th scope="row">' + index + '</th><td>' + data[i].username + '</td><td>' + data[i].eik + '</td></tr>';
                    $('#clients-table-rows').append(str);
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
              //alert(data);

                  $.each(data, function (i) {
                    var index = i + 1;
                    var str = '<tr><th scope="row">' + index + '</th><td>' + data[i].username + '</td><td>' + data[i].emailAddress + '</td><td>' + data[i].enabled + '</td><td>' + data[i].firstLogin + '</td></tr>';
                    $('#admins-table-rows').append(str);
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
    $('#all-users-table-container').show();

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
              //alert(data);

                  $.each(data, function (i) {
                    var index = i + 1;
                    var str = '<tr><th scope="row">' + index + '</th><td>' + data[i].username + '</td><td>' + data[i].role.name + '</td><td>' + data[i].eik + '</td><td>' + data[i].emailAddress + '</td><td>' + data[i].enabled + '</td><td>' + data[i].firstLogin + '</td></tr>';
                    $('#all-users-table-rows').append(str);
                  });
          },
          error: function () {
              console.log("Unsuccessful request");
          }
      });
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
              //alert(data);

                  $.each(data, function (i) {
                    var index = i + 1;
                    var str = '<tr><th scope="row">' + index + '</th><td>' + data[i].phoneNumber + '</td><td>' + data[i].firstName + '</td><td>' + data[i].lastName + '</td><td>' + data[i].egn + '</td><td>' + data[i].address.country + '</td><td>' + data[i].address.city + '</td><td>' + data[i].address.zipCode + '</td><td>' + data[i].address.street + '</td><td>' + data[i].bank.username + '</td></tr>';
                    $('#subscribers-table-rows').append(str);
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

    $("#subscribers-table-rows").empty();
      $.ajax({
         // crossOrigin: true,
         // crossDomain: true,
          type: 'GET',
          xhrFields: { withCredentials: false },
          url: "http://localhost:8080/api/admin/bills/",
          contentType: "application/json",
          dataType: "json",
          success: function (data) {
              //alert(data);

                  $.each(data, function (i) {
                    var index = i + 1;
                    var str = '<tr><th scope="row">' + index + '</th><td>' + data[i].billId + '</td><td>' + data[i].service.name + '</td><td>' + data[i].subscriber.phoneNumber + '</td><td>' + data[i].egn + '</td><td>' + data[i].address.country + '</td><td>' + data[i].address.city + '</td><td>' + data[i].address.zipCode + '</td><td>' + data[i].address.street + '</td><td>' + data[i].bank.username + '</td></tr>';
                    $('#subscribers-table-rows').append(str);
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
  });

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