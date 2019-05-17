$(document).ready(() => {

  let tweets;
  $.ajax({
    url: '../../feeds',
    type: 'GET',
    dataType : 'json',
    success: (data) => {
      console.log('You received some data!', data);
      tweets = data;
      }
    });

Vue.component('tweet-component', {
  template: `
    <div class="tweet">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img :src="tweet.image" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{tweet.user}}</strong> <small>{{tweet.handle}}</small>
                <br>
                {{tweet.tweet}}
              </p>
            </div>
              <div class="level-left">
                <a class="level-item">
                  <span class="icon is-small"><i class="fas fa-heart"></i></span>
                  <span class="likes">{{tweet.likes}}</span>
                </a>
              </div>
          </div>
        </article>
      </div>
    </div>
  `,
  props: {
    tweet: Object
  }
});

new Vue({
  el: '#app',
  data: {
    tweets
  }
});


});


$(document).ajaxError(() => {
  $('#status').html('Error: unknown ajaxError!');
});
