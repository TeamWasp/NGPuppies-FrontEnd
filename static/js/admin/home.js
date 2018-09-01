$(document).ready(function() {

  /* $("a").click(function(){
    var href = $(this).attr('href');
    $("#content").load(href + "#content > *", function(_responseTxt, statusTxt, xhr){
        if(statusTxt == "success")
            alert("External content loaded successfully!");
        if(statusTxt == "error")
            alert("Error: " + xhr.status + ": " + xhr.statusText);
    });
}); */

   //$( "#createClient" ).load( "clientsModule/createClient.html" );

  /*  $("a").click(function(){
     ev.preventDefault();
     var href = $(this).attr('href');
      $("#content").load(href, function(responseTxt, statusTxt, xhr){
          if(statusTxt == "success")
              alert("External content loaded successfully!");
          if(statusTxt == "error")
              alert("Error: " + xhr.status + ": " + xhr.statusText);
      });
    }); */

    $("#logoutButton").click(function (ev) {
      ev.preventDefault;

      var href = "http://localhost:8081/logout";

      alert("href is " + href);

      $("#content").load(href + "#content > *", function(responseTxt, statusTxt, xhr) {
        if(statusTxt == "error")
            alert("error: " + xhr.status + ": " + xhr.statusTxt);
      });
    });

    $("#personalDetails").click(function (ev) {
      ev.preventDefault();
      
      var href="http://localhost:8081/admin/personal-page";

      alert("href is " + href);

      $("#content").load(href + "#content > *", function(responseTxt, statusTxt, xhr) {
        if(statusTxt == "error")
            alert("error: " + xhr.status + ": " + xhr.statusTxt);
      });
    });

    $("a").click(function (ev) {
      ev.preventDefault();

      var href = $(this).attr('href');

      $("#content").load(href + "#content > *", function(responseTxt, statusTxt, xhr) {
        if(statusTxt == "error")
            alert("error: " + xhr.status + ": " + xhr.statusTxt);
      });
    });

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