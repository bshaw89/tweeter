$(() => {
  console.log( "ready!" );

  $("#error-msg").hide();
  $(".container form").hide();

  /*
  * Client-side JS logic goes here
  * jQuery is already loaded
  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
  */
  
  // Hidden elements on page load. Click to reveal.
  $( "#new-tweet-icon" ).click(function() {
    $(".container form").fadeToggle();
    $("#tweet-text").focus();
  });

  const renderTweets = function(tweetsArr) {
    let tweetsArrRev = tweetsArr.reverse();
    for (let tweet of tweetsArrRev) {
      let output = createTweetElement(tweet);
      $(`.tweets-all`).append(output);
    }
  };

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {

    let $output = `<article>
 <header>
  <div id="handle">
  <span id="avatar">
      <img src=${tweet.user.avatars}>
      <p>${tweet.user.name}</p>
    </span>
    <span id="usr-handle">
      <p>${tweet.user.handle}</p>
    </span>
  </div>
  <p>${escape(tweet.content.text)}</p>
</header>
<footer>
  <p>${timeStamp(tweet.created_at)}</p>
  <span>
  <i class="fas fa-flag"></i>
  <i class="fas fa-retweet"></i>
  <i class="fas fa-heart"></i>
  </span>
</footer>
</article>`;

    return $output;
  };

  const timeStamp = function(date) {
    const currentTime = Date.now();
    const timeDelta = currentTime - date;
    if (timeDelta < 60000) {
      return "Just now";
    } else if (timeDelta < 60000 * 30) {
      return `${Math.round(timeDelta / 1000 / 60)} minutes ago`;
    } else if (timeDelta < 60000 * 60 * 10) {
      return `${Math.round(timeDelta / 1000 / 60 / 60)} hours ago`;
    } else if (timeDelta < 60000 * 60 * 24 * 30) {
      return `${Math.round(timeDelta / 1000 / 60 / 60 / 24)} days ago`;
    } else {
      return `a long time ago`;
    }
  };

  // submit new tweet form
  $( ".new-tweet form" ).submit(function(event) {
    event.preventDefault();
    const rawText = $('#tweet-text').val();
    const output = $(this).serialize();
    if (rawText === "") {
      $("#error-msg p").text("Say something!");
      $( "#error-msg" ).fadeIn().show();
    } else if (rawText.length > 140) {
      $("#error-msg p").text("Too verbose!");
      $( "#error-msg" ).show();
    } else {
      $( "#error-msg" ).fadeOut().hide();
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: output
      })
        .done(function() {
          $('.tweets-all').empty();
          $(loadTweets());
          $(".new-tweet form").trigger("reset");
        });
    }
  });

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(tweetsJSON) {
        console.log("Success: ", renderTweets(tweetsJSON));
      });
  };
});