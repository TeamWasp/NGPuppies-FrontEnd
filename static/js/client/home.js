$(document).ready(function() {
  
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
  });