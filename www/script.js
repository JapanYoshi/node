import hashCode from "./hash.js";

$(document).ready(function(){
  $("#loginform").submit(function(event){
    event.preventDefault();
    window.alert("Submit");
    ajaxPost();
  });
  function ajaxPost(){
    var formData = {
      email: $("#email").val(),
      hash : hashCode($("#email").val() + "||" + $("#password").val() + "||")
    }
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: window.location + "api/login",
      data: JSON.stringify(formData),
      dataType: "json",
      success: function(customer){
        if (customer.valid) {
          $("#loginform").removeClass("fail");
          $("#loginform").addClass("success");
        } else {
          $("#loginform").removeClass("success");
          $("#loginform").addClass("fail");
        }
        $("#postResultDiv").html("<p>Post successfully completed</p><p>Email address: " + customer.email + "</p><p>Hash: " + customer.hash + "</p><p>Valid: " + customer.valid + "</p>")
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