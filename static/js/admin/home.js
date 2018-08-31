$(document).ready(function() {

    $('#test').click(function (ev) {
        ev.preventDefault();

        var token = localStorage.getItem("token");
        $.ajaxSetup({
            headers : {
              'Authorization' : 'Bearer '+token,
            }
          });

        var jqxhr = $.getJSON( "http://localhost:8080/api/admin/admins/", function() {
            console.log( "success" );
          })
            .done(function() {
              console.log( "second success" );
            })
            .fail(function() {
              console.log( "error" );
            })
            .always(function() {
              console.log( "complete" );
            });
    });

});