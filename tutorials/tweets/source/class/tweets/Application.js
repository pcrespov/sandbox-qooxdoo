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

      
      // binding 
      
      // service.tweets model with window.list via a controller
      var controller = new qx.data.controller.List(null, main.getList());
      controller.setLabelPath('text');
      controller.setIconPath('user.profile_image_url');

       controller.setDelegate({
        configureItem: function(item) {
          item.getChildControl('icon').setWidth(48);
          item.getChildControl('icon').setHeight(48);
          item.getChildControl('icon').setScale(true);
          item.setRich(true);
        }
      });
      
      controller.getChildren = function(){ return [];};
      service.bind('tweets', controller, 'model');

      // start the loading on startup
      service.fetchTweets();

      main.open();
    }
  }
});