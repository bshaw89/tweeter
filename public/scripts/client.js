$(() => {
  console.log( "ready!" );

  /*
  * Client-side JS logic goes here
  * jQuery is already loaded
  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
  */


  const renderTweets = function(tweetsArr) {
    for (let tweet of tweetsArr) {
      let output = createTweetElement(tweet);
      $(`.tweets-all`).append(output);
     }
    }

 const createTweetElement = function(tweet) {

 let $output = `<article>
 <header>
  <div>
  <span>
      <img src=${tweet.user.avatars}>
      <p>${tweet.user.name}</p>
    </span>
    <span>
      <p>${tweet.user.handle}</p>
    </span>
  </div>
  <p>${tweet.content.text}</p>
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


 const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1589749532000
  }
]

$( ".new-tweet" ).submit(function ( event ) {
  event.preventDefault();
})

$.ajax({
  method: "POST",
  url: "index.html",
  data: "textarea"
})

// $.ajax('index.html', { method: 'POST' }, data: { })
//     .then(function (morePostsHtml) {
//       console.log('Success: ', morePostsHtml);
//       $button.replaceWith(morePostsHtml);
//     });

 renderTweets(data);


 
});