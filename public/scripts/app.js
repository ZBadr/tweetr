/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.


// var data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];



function createTweetElement(obj) {
  return `
    <article>
         <header>
         <img src=${obj.user.avatars.large} width = 100 height = 100 >
         <span class= "username">${obj.user.name}</span>
         <span class= "handle">${obj.user.handle}</span>
         </header>
         <p>${obj.content.text}</p>
         <footer></footer>
       </article>`;

}

function renderTweets (arr) {
  $('#tweetbox').html('');
  for (var i = 0; i < arr.length; i++) {
    let z = createTweetElement(arr[i]);
    $('#tweetbox').append(z);
  }

}



$(document).ready(function() {
$("#textarea").slideUp();

  function loadTweets() {
     $.ajax({
      url: '/tweets',
      method: 'GET',
      // data: "json",
      success: function (array) {
        renderTweets(array.reverse());
      }
    });
  }

$(".compose").on("click", function(event) {
  $("#textarea").slideToggle();
  $("#textarea").focus();
});

$("#submitTweet").on("click", function(event) {
  event.preventDefault();
 if ($("#textarea").val() === "") {
  $(".error").text("Please enter tweet!");
} else if ($("#textarea").val().length > 140) {
  $(".error").text("Tweet too long!");
} else {
  $(".error").text("");
  $.ajax({
      url : "/tweets",
      type: "POST",
      data : $("#textarea").serialize(),
      success: function(data) {
        loadTweets();
         $("#textarea").val("");
      }
  });
}
})

});


