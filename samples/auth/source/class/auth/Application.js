/**
 * This is the main application class of "auth"
 *
 * @asset(auth/*)
 *
 */
/* global auth */
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
    main: function() {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug")) {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      // Enables fake server if in qx.debug!
      if (qx.core.Environment.get("auth.mockBackend")) {
        console.debug("Initializing FakeServer ...");
        auth.dev.RestAPI;
        auth.dev.Auth;
      }

      var root = this.getRoot();
      root.set({
        backgroundColor: "#00284d"
      });

      
      // a page adds himself to the root
      var page = new auth.ui.LoginPage();

      // this.check(function (success) {
      //   let page = null;
      //   if (success) {
      //     page = new Applicatio
      //   } else {
      //     page = new auth.ui.login.LoginPage();
      //   }
      //   page.show();
      // }, this);

      //this.__demo(root);
    },

    request: function(cb, ctx) {
      console.info("Request");
    },

    __demo: function(root) {
      /**
       *  Demo #1
       *
       */
      // root is configured as a Canvas here
      root.set({
        backgroundColor: "#00284d"
      });

      var widget = new qx.ui.container.Composite(new qx.ui.layout.Dock()).set(
        {
          // decorator: "main",
          allowGrowX: false
        });

      var loginPage = new auth.ui.login.LoginPage();
      loginPage.addListener("login", function(e) {
        if (e.getData() == true) {
          alert("Logged in!");
        }
      }, this);

      widget.add(loginPage, {
        edge: "center"
      });
      root.add(widget, {
        left: "0%",
        top: "0%",
        right: "0%",
        bottom: "0%",
        width: "0%",
        height: "0%"
      });
    }
  }
});
