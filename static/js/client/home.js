$(document).ready(function() {

    // redirect when admin is trying to access user site via url
    if (localStorage.getItem("role") == "ROLE_ADMIN") {
      window.location.replace("http://localhost:8081/error/access-denied.html");
    }
    // logout button
    $("#logoutButton").click(function(ev) {

      localStorage.clear();
      window.location.replace("http://localhost:8081/login.html");
    });

    // set logged user and role in footer printRole
    var printUsername = localStorage.getItem("username");
    var printRole = localStorage.getItem("role");

    $("#printUsername").html('<ins>' + printUsername + '</ins>');
    $("#printRole").html('<ins>' + printRole + '</ins>');
    
    /* DataTables https://datatables.net/manual/installation */
    var unpaidTable = $('#unpaid-bills-table').DataTable({
      responsive: true,
      stateSave: true
    });

    var subscriberTable = $('#subscribers-table').DataTable({
      responsive: true,
      stateSave: true
    });

    var topTenSubTable = $('#top-ten-subscribers-table').DataTable({
      responsive: true,
      stateSave: true
    });

    var paidBillsTable = $('#paid-bills-table').DataTable({
      responsive: true,
      stateSave: true
    });

    
    $.ajaxSetup({
      beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' +  localStorage.getItem("token"));
      }
    });

    $(document).ajaxError(function () {

      alert("Error occurred during ajax request!");
      //window.location.replace("http://localhost:8081/login.html");
    });

    $(function() {
      $('#subscribers-table-container, #bills-table-container, #top-10-subscribers-table-container, #paid-bills-table-container')
          .hide();
    });
  
    $("#subscribersButton").click(function(ev){

      $.ajax({
        // crossOrigin: true,
        // crossDomain: true,
         type: 'GET',
         url: "http://localhost:8080/api/client/subs/",
         contentType: "application/json",
         dataType: "json",
         success: function (data) {
             subscriberTable.clear();
             //alert(data);

                 $.each(data, function (i) {
                   subscriberTable.row.add([

                       data[i].phoneNumber, 
                       data[i].firstName, 
                       data[i].lastName, 
                       data[i].egn,
                       data[i].address.country,
                       data[i].address.city,
                       data[i].address.zipCode



                   ]).draw(false);
                  
                 });
         },
         error: function () {
             console.log("Unsuccessful request");
         }
      });


      ev.preventDefault;
      $('#bills-table-container').hide();
      $('#paid-bills-table-container').hide();
      $('#top-10-subscribers-table-container').hide();
      $('#subscribers-table-container').show();
    });
  
    $("#billsButton").click(function(ev){

      $.ajax({
        // crossOrigin: true,
        // crossDomain: true,
         type: 'GET',
         url: "http://localhost:8080/api/client/bills/unpaid",
         contentType: "application/json",
         dataType: "json",
         success: function (data) {
             unpaidTable.clear();
             //alert(data);

                 $.each(data, function (i) {
                   unpaidTable.row.add([

                       data[i].billId, 
                       data[i].service.name, 
                       data[i].subscriber.phoneNumber, 
                       data[i].subscriber.firstName +" "+ data[i].subscriber.lastName,
                       data[i].startDate,
                       data[i].endDate,
                       data[i].amount,
                       (data[i].amount * data[i].currency.exchangeRate).toFixed(2),
                       data[i].currency.currency

                   ]).draw(false);
                  
                 });
         },
         error: function () {
             console.log("Unsuccessful request");
         }
     });





      ev.preventDefault;
      $('#subscribers-table-container').hide();
      $('#paid-bills-table-container').hide();
      $('#top-10-subscribers-table-container').hide();
      $('#bills-table-container').show();
    });
  
    $("#topTenSubscribersButton").click(function(ev){
      $.ajax({
        // crossOrigin: true,
        // crossDomain: true,
         type: 'GET',
         url: "http://localhost:8080/api/client/top/",
         contentType: "application/json",
         dataType: "json",
         success: function (data) {
             topTenSubTable.clear();
             //alert(data);

                 $.each(data, function (i) {
                   topTenSubTable.row.add([
                       i+1,
                       data[i].phoneNumber, 
                       data[i].firstName, 
                       data[i].lastName, 
                       data[i].sumAmount.toFixed(2)

                   ]).draw(false);
                 });
         },
         error: function () {
             console.log("Unsuccessful request");
         }
      });
      ev.preventDefault;
      $('#subscribers-table-container').hide();
      $('#bills-table-container').hide();
      $('#paid-bills-table-container').hide();
      $('#top-10-subscribers-table-container').show();
    });

    $("#paidBillsButton").click(function(ev){
      $.ajax({
        // crossOrigin: true,
        // crossDomain: true,
         type: 'GET',
         url: "http://localhost:8080/api/client/bills/history",
         contentType: "application/json",
         dataType: "json",
         success: function (data) {
             paidBillsTable.clear();
             //alert(data);

                 $.each(data, function (i) {
                   paidBillsTable.row.add([

                       data[i].billId, 
                       data[i].service.name, 
                       data[i].subscriber.phoneNumber, 
                       data[i].subscriber.firstName +" "+ data[i].subscriber.lastName,
                       data[i].startDate,
                       data[i].endDate,
                       data[i].amount,
                       (data[i].amount * data[i].currency.exchangeRate).toFixed(2),
                       data[i].currency.currency,
                       data[i].paymentDate

                   ]).draw(false);
                  
                 });
         },
         error: function () {
             console.log("Unsuccessful request");
         }
     });

        ev.preventDefault;
        $('#subscribers-table-container').hide();
        $('#bills-table-container').hide();
        $('#top-10-subscribers-table-container').hide();
        $('#paid-bills-table-container').show();

    });

    $('#unpaid-bills-table tbody').on( 'click', 'tr', function () {
      $(this).toggleClass('selected');
      $('#payBill').html("Pay "+unpaidTable.rows('.selected').data().length+" bills");
  } );

    $("#payBill").click(function(){
      var billData = unpaidTable.rows('.selected').data();
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
      });
    });
  });
  
 