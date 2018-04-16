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
      var doc = this.getRoot();

      // Floating window
      var main = new tweets.MainWindow();
      main.open();

      main.addListener("reload", function(){
        this.debug("Clicked reload");
      });

      main.addListener("post", function(e){
        this.debug("Posting data '" + e.getData() + "'");
      })
    }
  }
});