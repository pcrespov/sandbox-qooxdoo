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

      let root = this.getRoot();
      this.__demo(root);

    },

    __demo: function (root) {
      /**
       *  Demo #1
       * 
       */
      // root is configured as a Canvas here
      root.set({
        backgroundColor: "#707070",
      });

      // FIXME: focus order when pressing tab
      let loginGroup = new qx.ui.container.Composite(new qx.ui.layout.HBox(30));

      // standard login. i.e. using app database
      let platformLogin = new auth.ui.login.Standard();
      loginGroup.add(platformLogin, {
        width: "60%"
      });

      // login could offer different types. eg. standard, NIH, lDAP ...
      // or other third parties. Each login can be added as a different
      // widget. Can be e.g. implemented as a Tabview as in gitlab or 
      // with buttons on the side as in wix
      let externalLogin = this.__createExternalLogin();
      loginGroup.add(externalLogin);

      root.add(loginGroup, {
        left: "10%",
        top: "10%",
        height: "30%",
      });
    },

    __createExternalLogin: function () {
      /**
       * For demo purposes
      */
      let layout = new qx.ui.layout.VBox(10).set({
        alignY: "middle"
      })
      let loginGroup = new qx.ui.container.Composite(layout);

      let loginOpenId = new qx.ui.form.Button().set({
        label: "Continue with openID",
        // FIXME: icon size
        //icon: "https://upload.wikimedia.org/wikipedia/commons/8/88/Openid.svg",
      });
      loginGroup.add(loginOpenId);

      let loginNIH = new qx.ui.form.Button().set({
        label: "Continue with NIH",
        // FIXME: icon size
        //icon: "auth/nih-419.png",
      });
      loginGroup.add(loginNIH);

      // Connect dummy      
      loginOpenId.addListener("execute", function (){
        const img = "https://upload.wikimedia.org/wikipedia/commons/8/88/Openid.svg";
        
        let win = new qx.ui.window.Window("External Login");
        win.setLayout(new qx.ui.layout.Basic());
        win.setModal(true);
        win.add(new qx.ui.basic.Image(img));
        win.open();
      });

      loginNIH.addListener("execute", function (){
        const img = "auth/nih-419.png";

        let win = new qx.ui.window.Window("External Login");
        win.setLayout(new qx.ui.layout.Basic());
        win.setModal(true);
        win.add(new qx.ui.basic.Image(img));
        win.open();
      });

      return loginGroup;
    },

  }
});