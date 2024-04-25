/* eslint-disable */




function isTweetValid(tweetText) {
  tweetText = tweetText.trim(); // Trim whitespace

  if (tweetText.length === 0) {
      // nothing in text area
      return { isValid: false, message: "Please enter some text for your tweet." };
  }
  if (tweetText.length > 140) {
      // tweet too long
      return { isValid: false, message: "Your tweet is too long. Please limit your tweet to 140 characters." };
  }
  return { isValid: true, message: "" }; // otherwise, return true
}
// doc ready
$(() => {


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
  // format the creation date using date constructor
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
      <p></p>
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

  $tweet.find('.tweet-content p').text(content.text);


  return $tweet;
};

$('.new-tweet form').submit(function(event) {
  event.preventDefault(); // stop normal submit (refresh)

  const tweetText = $('#tweet-text').val();
  const validationResult = isTweetValid(tweetText);

  if (!validationResult.isValid) {
    // Display the error message near the tweet input area
    $('#tweet-error-message').text(validationResult.message).show();
    return; // Stop the function if the tweet is invalid
} else {
    // Hide the error message if the tweet passes validation
    $('#tweet-error-message').hide();
}

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