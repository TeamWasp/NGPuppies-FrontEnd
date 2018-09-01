$(document).ready(function() {

  $.ajaxSetup({
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwic2NvcGVzIjpbIlJPTEVfQURNSU4iXSwiaXNzIjoiaHR0cDovL2RldmdsYW4uY29tIiwiaWF0IjoxNTM1ODI4NzE2LCJleHAiOjE1MzU4NDY3MTZ9.2fvxoE5re70-iCtuTZk7WGI-d8d5lZWHVGCJTEVfR8M');
    }
  });

  $(function() {
    $('#personalDetailsForm, #clients-table-container, #admins-table-container, #all-users-table-container, #subscribers-table-container, #bills-table-container, #services-table-container')
        .hide();
  });

  $("#personalDetailsButton").click(function(ev){
    ev.preventDefault;
    $('#all-users-table-container').hide();
    $('#subscribers-table-container').hide();
    $('#bills-table-container').hide();
    $('#services-table-container').hide();
    $('#admins-table-container').hide();
    $("#clients-table-container").hide();
    $("#personalDetailsForm").show();
  });

  $("#clientsButton").click(function(ev){
    ev.preventDefault;
    $("#personalDetailsForm").hide();
    $('#all-users-table-container').hide();
    $('#subscribers-table-container').hide();
    $('#bills-table-container').hide();
    $('#services-table-container').hide();
    $('#admins-table-container').hide();
    $("#clients-table-container").show();

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
  });

  $("#adminsButton").click(function(ev){
    ev.preventDefault;
    $("#personalDetailsForm").hide();
    $('#clients-table-container').hide();
    $('#all-users-table-container').hide();
    $('#subscribers-table-container').hide();
    $('#bills-table-container').hide();
    $('#services-table-container').hide();
    $('#admins-table-container').show();
  });

  $("#allUsersButton").click(function(ev){
    ev.preventDefault;
    $("#personalDetailsForm").hide();
    $('#clients-table-container').hide();
    $('#admins-table-container').hide();
    $('#subscribers-table-container').hide();
    $('#bills-table-container').hide();
    $('#services-table-container').hide();
    $('#all-users-table-container').show();
  });

  $("#subscribersButton").click(function(ev){
    ev.preventDefault;
    $("#personalDetailsForm").hide();
    $('#clients-table-container').hide();
    $('#admins-table-container').hide();
    $('#all-users-table-container').hide();
    $('#bills-table-container').hide();
    $('#services-table-container').hide();
    $('#subscribers-table-container').show();
  });

  $("#billsButton").click(function(ev){
    ev.preventDefault;
    $("#personalDetailsForm").hide();
    $('#clients-table-container').hide();
    $('#admins-table-container').hide();
    $('#all-users-table-container').hide();
    $('#subscribers-table-container').hide();
    $('#services-table-container').hide();
    $('#bills-table-container').show();
  });

  $("#servicesButton").click(function(ev){
    ev.preventDefault;
    $("#personalDetailsForm").hide();
    $('#clients-table-container').hide();
    $('#admins-table-container').hide();
    $('#all-users-table-container').hide();
    $('#subscribers-table-container').hide();
    $('#bills-table-container').hide();
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