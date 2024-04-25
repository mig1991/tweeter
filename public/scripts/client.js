/* eslint-disable */

/*


 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json

// doc ready
$(() => {

// const data = [
//     {
//       "user": {
//         "name": "Newton",
//         "avatars": "https://i.imgur.com/73hZDYK.png",
//         "handle": "@SirIsaac"
//       },
//       "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//       "created_at": 1461116232227
//     },
//     {
//       "user": {
//         "name": "Descartes",
//         "avatars": "https://i.imgur.com/nlhLi3I.png",
//         "handle": "@rd" },
//       "content": {
//         "text": "Je pense , donc je suis"
//       },
//       "created_at": 1461113959088
//     }
//   ]

  const renderTweets = function(tweets) {
    // empty the container before appending new tweets to avoid duplicates
    const $container = $('#tweets-container');
    $container.empty();
    // loop through the array of tweets and prepend each to the container
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $container.prepend($tweet);
    });
  }
  

const createTweetElement = function(tweet) {
  const { user, content, created_at } = tweet;
  // format the creation date using JavaScript's Date constructor
  const dateCreated = new Date(created_at);
  const currentDate = new Date();
  let timeAgo = timeago.format(new Date(created_at));

  timeAgo = "Posted " + timeAgo;
  // using template literals
  let $tweet = $(`
  <article class="tweet-container">
  <header>
      <div class="tweet-header-left">
          <img src="${user.avatars}" alt="User avatar" class="tweet-avatar">
          <h2>${user.name}</h2>
      </div>
      <div class="tweet-header-right">
          <h3>${user.handle}</h3>
      </div>
  </header>
  <div class="tweet-content">
      <p>${content.text}</p>
  </div>
  <footer>
      <h3>${timeAgo}</h3>
      <div class="footer-icons">
          <i class="fas fa-heart"></i>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-share"></i>
      </div>
  </footer>
</article>

  `);

  return $tweet;
};

$('.new-tweet form').submit(function(event) {
  event.preventDefault(); // stop normal submit (refresh)

  const tweetText = $('#tweet-text').val().trim(); //get content from text


  if (tweetText.length === 0) {
    alert("Please enter some text for your tweet.");
    return; // if tweet is empty, give this alert
}

// if tweet exceeds 140 characters
if (tweetText.length > 140) {
    alert("Your tweet is too long. Please limit your tweet to 140 characters.");
    return; // stop the function here
}

// if it passes both,then serialize the data and continue
const formData = $(this).serialize(); 

  $.ajax({
      type: 'POST',
      url: '/tweets',
      data: formData,
      success: function(response) {
          console.log('Tweet posted:', response);
          loadTweets();
      },
      error: function(xhr, status, error) {
          console.error('Failed to post tweet:', error);
      }
  });
});

// load tweets dynamically
function loadTweets() {
  $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(tweets) {
          renderTweets(tweets);
      },
      error: function(error) {
          console.log('Error loading tweets:', error);
      }
  });
}

// load tweets
loadTweets();

});