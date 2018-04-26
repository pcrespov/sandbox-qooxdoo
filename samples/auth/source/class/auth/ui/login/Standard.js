/**
 * Creates a standard widget for a login
 * 
 *  Features:
 *    - Login form
 *    - Some decoration
 * 
 */
qx.Class.define("auth.ui.login.Standard", {

  extend: qx.ui.container.Composite,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct: function () {
    this.base(arguments);

    let header = this.__createHeader();
    this.__login = new auth.ui.login.Form();

    // TODO : add Forgot Password? | Create Account? links
    let footer = new qx.ui.core.Widget();

    this.__createLayout(header,
      new qx.ui.form.renderer.Single(this.__login),
      footer);

    this.__login.addListener("submit", this.__onSubmitLogin, this);
  },

  /*
   *****************************************************************************
      MEMBERS
   *****************************************************************************
   */
  members: {
    __login: null,

    __token: null,

    __createHeader: function () {
      const isDev = qx.core.Environment.get("qx.debug") ? true : false;

      // TODO bind label and icon to this property

      let header = new qx.ui.basic.Atom().set({
        icon: "auth/itis.png",
        iconPosition: "top",
      });

      return header;
    },

    __createLayout: function (header, login, footer) {
      // http://www.qooxdoo.org/5.0.2/pages/desktop/ui_layouting.html
      // http://www.qooxdoo.org/5.0.2/pages/layout.html
      // http://www.qooxdoo.org/5.0.2/pages/layout/box.html
      // http://www.qooxdoo.org/5.0.2/demobrowser/#layout~VBox.html

      const isDev = qx.core.Environment.get("qx.debug") ? true : false;

      // LayoutItem 
      this.set({
        backgroundColor: "#707070",
        padding: 10,
      });

      this.setLayoutProperties({
        allowGrowY: false
      });

      login.set({
        //backgroundColor: isDev ? "red" : null,
        // width: 100 // TODO: themed?
      });

      // Set buttom wider
      login.getLayout().set({
        //spacingY: 10 // TODO: themed?
      });

      footer.set({
        // backgroundColor: isDev ? "blue" : null
      });


      // Children's layout management
      let layout = new qx.ui.layout.VBox().set({
        alignY: "middle",
        spacing: 20, // TODO: themed?
      });
      this.setLayout(layout);


      // Example of item properties {flex:0, width='%'} passed as options.
      // notice that these options are specific for every layout abstraction!
      // the he uses the api LayoutItem.setLayoutProperties to set computed layout
      // considering parent layout hints
      this.add(header);
      this.add(login);
      // this.add(footer);
    },

    __onSubmitLogin: function (e) {
      // this is user's input
      var loginData = e.getData();

      let auth = new qx.io.request.authentication.Basic(
        loginData.user,
        loginData.password);

      // TODO: encapsulate entire request in separate class
      // let req = new auth.io.request.Login(loginData());

      //let serializer = function (object) {
      //  if (object instanceof qx.ui.form.ListItem) {
      //    return object.getLabel();
      //  }
      //};
      //console.debug("You are sending: " +
      //  qx.util.Serializer.toUriParameter(model, serializer));

      // Requests authentication to server
      let req = new qx.io.request.Xhr();
      req.set({
        // qx.io.request.authentication sets headers.
        // Can send user+passorwd or user=token w/o password!?
        authentication: auth,
        url: "/login",
        method: "POST",
        requestData: qx.util.Serializer.toJson(loginData)
      });

      req.addListener("success", this.__onLoginSucceed, this);
      req.addListener("fail", this.__onLoginFailed, this);
      req.send();
    },

    __onLoginSucceed: function (e) {
      let _req = e.getTarget();
      console.debug("Everything went fine!!");
      console.debug("status  :", _req.getStatus());
      console.debug("phase   :", _req.getPhase());
      console.debug("response: ", _req.getResponse());

      // TODO: fire success logged in and store token??
      // TODO: implement token-based authentication: we can request token and from that moment on,
      // just use that...
    },

    __onLoginFailed: function (e) {
      // Display error page!
      let _req = e.getTarget();
      console.debug("Something went wrong!!");
      console.debug("status  :", _req.getStatus());
      console.debug("phase   :", _req.getPhase());
      console.debug("response: ", _req.getResponse());

      // TODO: invalidate form view and flash error!
    },

  }

});