$(document).ready(function() {
  
    /* DataTables https://datatables.net/manual/installation */
    var unpaidTable = $('#unpaid-bills-table').DataTable();

    
  $.ajaxSetup({
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' +  localStorage.getItem("token"));
    }
  });

    $(function() {
      $('#subscribers-table-container, #bills-table-container, #top-10-subscribers-table-container, #paid-bills-table-container')
          .hide();
    });
  
    $("#subscribersButton").click(function(ev){
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
         xhrFields: { withCredentials: false },
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
      $('#paid-bills-table-container').hide();
      $('#top-10-subscribers-table-container').hide();
      $('#bills-table-container').show();
    });
  
    $("#topTenSubscribersButton").click(function(ev){
      ev.preventDefault;
      $('#subscribers-table-container').hide();
      $('#bills-table-container').hide();
      $('#paid-bills-table-container').hide();
      $('#top-10-subscribers-table-container').show();
    });

    $("#paidBillsButton").click(function(ev){

        ev.preventDefault;
        $('#subscribers-table-container').hide();
        $('#bills-table-container').hide();
        $('#top-10-subscribers-table-container').hide();
        $('#paid-bills-table-container').show();

    });

    $('#unpaid-bills-table tbody').on( 'click', 'tr', function () {
      $(this).toggleClass('selected');
  } );

    $("#payBill").click(function(){
      var clientData = unpaidTable.rows('.selected').data();
      var newData=[];
      $.each(billData,function(i){
        newData.push(billData[i][0]);
      });

      $.ajax({
        type: 'PUT',
        xhrFields: { withCredentials: false },
        url: 'http://localhost:8080/api/admin/clients/updateClient',
        contentType: "application/json",
        data: JSON.stringify(newData),

        success: function(data) {
          alert('Load was performed.');
          location.reload();
        }
      });
    });
  });
  
 