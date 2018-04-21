/**
 * Fetches tweets and binds to property tweets
 */
qx.Class.define('tweets.data.MessagesService', {
  extend: qx.core.Object,

  properties: {
      tweets: {
        nullable: true, 
        event: 'changeTweets' // fires qx.event.type.Data upon property change
      }
    },

  members: {
    __store: null,    

    fetchTweets: function() {
      if (this.__store == null) {
        // BUG: version for 5.0.2 does not exists
        var url =
            'http://demo.qooxdoo.org/5.0.1/tweets_step4.5/resource/tweets/service.js';
        this.__store = new qx.data.store.Jsonp();
        this.__store.setCallbackName('callback');
        this.__store.setUrl(url);
        // more to do
      } else {
        this.__store.reload();
      }

      // single value binding: 
      // binds these properties:  store.model <-> this.tweets
      this.__store.bind('model', this, 'tweets');
    },
  }
});
