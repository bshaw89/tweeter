$(document).ready(function() {
  $("textarea").keyup(function() {
    $(this).closest("form").find(".counter").val(140 - $(this).val().length);

    if ($(this).closest("form").find(".counter").val() <= 0) {
      $(this).closest("form").find(".counter").css("color", "red");
    } else {
      $(this).closest("form").find(".counter").css("color", "#545149");
    }
  });

});