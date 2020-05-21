$(document).ready(function() {
  // --- our code goes here ---
  $("textarea").keyup(function() {
    // console.log(140 - $(this).val().length);
    // console.log($(this))
    console.log($(this).closest("form").find(".counter").val());
    $(this).closest("form").find(".counter").val(140 - $(this).val().length);

    if ($(this).closest("form").find(".counter").val() <= 0) {
      $(this).closest("form").find(".counter").css("color", "red"); // append class .class
    } else {
      $(this).closest("form").find(".counter").css("color", "#545149") // .remove class (class name)
    }
  });

});

// class: error, color: red