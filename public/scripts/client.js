$(() => {
  console.log( "ready!" );

  $("#error-msg").hide();

  /*
  * Client-side JS logic goes here
  * jQuery is already loaded
  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
  */


  const renderTweets = function(tweetsArr) {
    let tweetsArrRev = tweetsArr.reverse();
    for (let tweet of tweetsArrRev) {
      let output = createTweetElement(tweet);
      $(`.tweets-all`).append(output);
     }
    }

    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

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
</article>`

return $output;
}

// Date.now() -- current timestamp
// (created_at) - (above^)

// function takes in date

const timeStamp = function(date) {
  const currentTime = Date.now();
  const timeDelta = currentTime - date;
  if (timeDelta < 60000) {
    return "Just now";
  } else if (timeDelta < 60000*30) {
    return `${Math.round(timeDelta / 1000 / 60)} minutes ago`; 
  } else if (timeDelta < 60000 * 60 * 10) {
    return `${Math.round(timeDelta / 1000 / 60 / 60)} hours ago`
  } else if (timeDelta < 60000 * 60 * 24 * 30) {
    return `${Math.round(timeDelta / 1000 / 60 / 60 / 24)} days ago`
  } else {
    return `a long time ago`;
  }
  // days ago
  // hours ago
  // minutes ago
  // just now
}


//  const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
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
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1589749532000
//   }
// ]

$( ".new-tweet form" ).submit(function ( event ) {
  event.preventDefault();
  // event.target.value
  const rawText = $('#tweet-text').val();
  const output = $(this).serialize()
  // console.log(output)
  // console.log($("#error-msg p").text("hiii"));
  if (rawText === "") {
    $("#error-msg p").text("Say something!")
    $( "#error-msg" ).show();
  } else if (rawText.length > 140) {
    $("#error-msg p").text("Too verbose!")
    $( "#error-msg" ).show();
  } else {
    $( "#error-msg" ).hide();
    $.ajax({
      method: "POST",
      url: "/tweets",
      // data: { text: "text" }
      data: output
    })
    .done(function (data) {
      // console.log(data);
      $('.tweets-all').empty();
      $(loadTweets());
    })
  }
})


// $.ajax('index.html', { method: 'POST' }, data: { })
//     .then(function (morePostsHtml) {
//       console.log('Success: ', morePostsHtml);
//       $button.replaceWith(morePostsHtml);
//     });

const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
  .then(function (tweetsJSON) {
    console.log("Success: ", renderTweets(tweetsJSON));
  })
}
// loadTweets();

//  renderTweets(data);


 
});

// :nth-child won't work because more tweets keep getting added
// currently adds random user when posting new tweet; need to refresh page to see
// add slide animation to error message
// switch px to em