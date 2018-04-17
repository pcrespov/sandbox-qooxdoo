/* ************************************************************************

   Copyright: 2018 

   License: MIT license

   Authors: 

************************************************************************ */

/**
 * This is the main application class of "tweets"
 *
 * @asset(tweets/*)
 */
qx.Class.define("tweets.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      // Document is the application root
      // var doc = this.getRoot();

      const version = qx.core.Environment.get('qx.version');
      this.debug("Running qx version" + version);

      // Floating window
      let main = new tweets.ui.MainWindow();
      let service = new tweets.data.MessagesService();

      this.__loginWindow = new tweets.ui.LoginWindow();
      this.__loginWindow.moveTo(320, 30);
      this.__loginWindow.open();
      
      service.addListener('changeTweets', function(e) {
        this.debug("Model changed:\n model=" + qx.dev.Debug.debugProperties(e.getData()));
      }, this);       

      main.addListener("reload", function(){
        this.debug("Clicked reload");
        service.fetchTweets();
      }, this);

      main.addListener("post", function(e){
        this.debug("Posting data '" + e.getData() + "'");
      }, this);

      this.__loginWindow.addListener("changeLoginData", function(e){
        this.debug("changeLoginData data" + qx.dev.Debug.debugProperties(e.getData()));
        var loginData = e.getData();
        service.fetchTweets();
      }, this);
      
      
      // binding       
      // service.tweets model with window.list via a controller
      var controller = new qx.data.controller.List(null, main.getList());
      controller.setLabelPath('text');
      controller.setIconPath('user.profile_image_url');

      controller.setDelegate({
        createItem: function() {
          return new tweets.ui.TweetView();
        },

        // Keeps properties from model and widget in sync
        // sourcePath, targetProperty, map options, widget, index to current
        // binding (i.e. index in the list)
        bindItem: function(controller, item, index) {
          console.debug('binding', item, index);
          controller.bindProperty('text', 'post', null, item, index);
          controller.bindProperty(
              'user.profile_image_url', 'icon', null, item, index);
          controller.bindProperty(
              'created_at', 'time', {
                converter: function(data) {
                  // converts model string to Data object in widget property
                  return new Date(data);
                }
              },
              item, index);
        },

        configureItem: function(item) {
          item.getChildControl('icon').setWidth(48);
          item.getChildControl('icon').setHeight(48);
          item.getChildControl('icon').setScale(true);
          item.setMinHeight(60);
        }
      });

      service.bind('tweets', controller, 'model');
      

      main.open();
    }
  }
});