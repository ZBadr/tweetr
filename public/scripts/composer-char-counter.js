$( document ).ready(function() {
$("textarea").keyup(function() {
    var remainingCount = 140 - $(this).val().length;
    $(this).closest("section").find(".counter").text(String(remainingCount));
    if(remainingCount < 0) {
   $('.new-tweet').find('.counter').css({"color": "red"});
 } else {
   $('.new-tweet').find('.counter').css({"color": "black"});
 }
});
});

