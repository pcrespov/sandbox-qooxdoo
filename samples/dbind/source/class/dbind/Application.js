/**
 * This is the main application class of "dbind"
 *
 * @asset(dbind/*)
 */
qx.Class.define("dbind.Application", {
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
      }

      // const USER = new dbind.data.User();

      // Data model --------------
      const rawData = dbind.data.Fake.createProjectDescriptors();
      
      // http://www.qooxdoo.org/current/api/#qx.data.Array
      // A wrapper around raw array to make it "bindable"
      var data = new qx.data.Array(rawData);


      // DEMOS ----
      let demo = new dbind.demo.App1();
      demo.main(data);
      
      this.getRoot().add(demo, {edge: 5});
    },

  } // members
});