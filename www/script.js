var hash = exports

$(document).ready(function(){
  $("#loginform").submit(function(event){
    event.preventDefault();
    ajaxPost();
  });
  function ajaxPost(){
    var formData = {
      email: $("#email").val(),
      hash : hash.hashCode($("#email").val() + "||" + $("#password").val() + "||")
    }
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: (window.location).toString().substring(0, (window.location).toString().indexOf("/", 8)) + "/api/login",
      data: JSON.stringify(formData),
      dataType: "json",
      success: function(customer){
        var msg = "";
        if (customer.valid) {
          $("#loginform").removeClass("fail");
          $("#loginform").addClass("success");
          msg = "Welcome back!";
        } else {
          $("#loginform").removeClass("success");
          $("#loginform").addClass("fail");
          msg = "User credentials do not match.";
        }
        $("#postResultDiv").html("<h3>" + msg + "</h3><p>Email address: " + customer.email + "</p><p>Mock hash: " + customer.hash + "</p>")
      },
      error: function(e){
        alert("An error occured while sending a POST request. Details have been logged in the console.");
        console.log("ERROR: ", e);
      }
    });
    resetData();
  }
  function resetData(){
    $("#email").val("");
    $("#password").val("");
  }
});