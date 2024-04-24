/* eslint-disable */

/*


 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json

// doc ready
$(() => {

const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
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
      "created_at": 1461113959088
    }
  ]

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
  const timeAgo = Math.floor((currentDate - dateCreated) / (1000 * 60 * 60 * 24)); // Convert to day
  // create the tweet article element using template literals
  let $tweet = $(`
    <article class="tweet">
      <header>
        <div class="tweet-header">
          <img src="${user.avatars}" alt="User avatar" class="tweet-avatar">
          <span class="tweet-user-name">${user.name}</span>
          <span class="tweet-user-handle">${user.handle}</span>
        </div>
      </header>
      <div class="tweet-content">
        <p>${content.text}</p>
      </div>
      <footer>
        <span class="tweet-time">${timeAgo} days ago</span>
        <div class="tweet-icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
  `);

  return $tweet;
};

renderTweets(data);


});