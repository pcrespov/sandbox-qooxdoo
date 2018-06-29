/** global qxapp
  TODO: Create common interface for all types of login. e.g. openID or NIH or standard
*/
/* eslint no-warning-comments: "off" */
/* global auth */
qx.Class.define("auth.ui.login.LoginPage", {
  extend: qx.ui.container.Composite,

  construct: function() {
    this.base(arguments, new qx.ui.layout.HBox(30));

    // standard login. i.e. using app database
    var platformLogin = new auth.ui.login.BasicView();
    this.add(platformLogin, {
      width: "60%"
    });

    // login could offer different types. eg. standard, NIH, lDAP ...
    // or other third parties. Each login can be added as a different
    // widget. Can be e.g. implemented as a Tabview as in gitlab or
    // with buttons on the side as in wix
    var externalLogin = this.__createExternalLogin();
    this.add(externalLogin);

    // TODO: check how to bypass child events to parent
    platformLogin.addListener("login", function(e) {
      this.fireDataEvent("login", e.getData());
    }, this);
  },

  events: {
    "login": "qx.event.type.Data"
  },

  members: {

    __createExternalLogin: function() {
      /**
       * For demo purposes
       */
      var layout = new qx.ui.layout.VBox(10).set({
        alignY: "middle"
      });
      var loginGroup = new qx.ui.container.Composite(layout);

      var loginOpenId = new qx.ui.form.Button().set({
        label: "Continue with openID"
        // FIXME: icon size
        // icon: "https://upload.wikimedia.org/wikipedia/commons/8/88/Openid.svg",
      });
      loginGroup.add(loginOpenId);

      var loginNIH = new qx.ui.form.Button().set({
        label: "Continue with NIH"
        // FIXME: icon size
        // icon: "qxapp/nih-419.png",
      });
      loginGroup.add(loginNIH);

      // Connect dummy
      loginOpenId.addListener("execute", function() {
        var img = "https://upload.wikimedia.org/wikipedia/commons/8/88/Openid.svg";

        var win = new qx.ui.window.Window("External Login");
        win.setLayout(new qx.ui.layout.Basic());
        win.setModal(true);
        win.add(new qx.ui.basic.Image(img));
        win.open();
      });

      loginNIH.addListener("execute", function() {
        var img = "https://upload.wikimedia.org/wikipedia/commons/8/88/Openid.svg";

        var win = new qx.ui.window.Window("External Login");
        win.setLayout(new qx.ui.layout.Basic());
        win.setModal(true);
        win.add(new qx.ui.basic.Image(img));
        win.open();
      });

      return loginGroup;
    }
  }
});
