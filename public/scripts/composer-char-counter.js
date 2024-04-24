$(document).ready(function () {
  const maxLength = 140;

  $("#tweet-text").on("input", function () {
    const remaining = maxLength - $(this).val().length;
    const counter = $(".counter");

    counter.text(remaining);

    if (remaining < 0) {
      counter.css("color", "red");
    } else if (remaining <= 20) {
      counter.css("color", "#8B0000");
    } else {
      counter.css("color", "black");
    }
  });

  console.log("counter script loaded.");
});
