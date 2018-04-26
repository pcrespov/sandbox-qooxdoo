/* ************************************************************************

   Copyright: 2018 undefined

   License: MIT license

   Authors: undefined

************************************************************************ */

/**
 * This is the main application class of "layout"
 *
 * @asset(layout/*)
 */
qx.Class.define("layout.Application", {
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
    main : function() {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug")) {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */

      // Document is the application root
      var doc = this.getRoot();

      let loginWin = new layout.login.Login();
      loginWin.addListener("Login", function(e) {
        if (e.getData() === true) {
          this._layoutManager = new layout.layout.LayoutManager();
          doc.add(this._layoutManager);
        }
      });

      this.getRoot().add(loginWin, {
        left:400,
        top:400
      });
      loginWin.open();
    }
  }
});
