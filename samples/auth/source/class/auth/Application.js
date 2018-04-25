/* ************************************************************************

   Copyright: 2018 undefined

   License: MIT license

   Authors: undefined

************************************************************************ */

/**
 * This is the main application class of "auth"
 *
 * @asset(auth/*)
 */
qx.Class.define("auth.Application", {
  extend: qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members: {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main: function () {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug")) {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;

        // Enables fake server if in qx.debug!
        //if (qx.core.Environment.get("auth.mockBackend")) {
        auth.mock.User;
        //}
      }

      // standard login. i.e. using app database
      let login = new auth.ui.login.Standard();
      
      // TODO: login could offer different types. eg. standard, NIH, lDAP ...
      // or other third parties. Each login can be added as a different
      // widget. Can be e.g. implemented as a Tabview as in gitlab or 
      // with buttons on the side as in wix

      // root is configured as a Canvas here
      this.getRoot().add(login, {
        left: "20%",
        top: "20%",
        width: "60%",
        height: "40%"
      });

    }
  }
});