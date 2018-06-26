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
    this.__form = new auth.ui.login.Form();

    // TODO : add Forgot Password? | Create Account? links
    let footer = new qx.ui.core.Widget();

    this.__createLayout(header,
      new qx.ui.form.renderer.Single(this.__form),
      footer);

    this.__form.addListener("submit", this.__onSubmitLogin, this);
  },

  /*
   *****************************************************************************
      MEMBERS
   *****************************************************************************
   */
  members: {
    __form: null,
    __auth: null,

    __createHeader: function () {
      const isDev = qx.core.Environment.get("qx.debug") ? true : false;

      // TODO: bind label and icon to this property

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

      //let auth = new qx.io.request.authentication.Basic(
      //  loginData.user,
      //  loginData.password);
      // Can send user+passorwd or user=token w/o password!?
      let auth = new qx.io.request.authentication.Basic(
        loginData.username,
        loginData.password)

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
      // TODO: mimetypes supported??
      let req = new qx.io.request.Xhr("api/v1.0/login", "POST");
      req.set({
        accept: "application/json",
        authentication: auth,
        //requestData: {
        //  email: loginData.username,
        //  password: loginData.password
        //},
        cache: false
      });

      req.addListener("success", this.__onLoginSucceed, this);
      req.addListener("fail", this.__onLoginFailed, this);
      req.send();
    },

    __onLoginSucceed: function (e) {
      let _req = e.getTarget();
      console.debug("Authorized",
        "status  :", _req.getStatus(),
        "phase   :", _req.getPhase(),
        "response: ", _req.getResponse()
      );

      const token = _req.getResponse().token;
      this.__auth = new qx.io.request.authentication.Basic(token, null)


      // TODO: implement token-based authentication: we can request token and from that moment on,
      // just use that...

      // TODO: fire success logged in and store token??
      this.fireDataEvent("login", true);
    },

    __onLoginFailed: function (e) {
      let _req = e.getTarget();
      console.debug("Unauthorized",
        "status  :", _req.getStatus(),
        "phase   :", _req.getPhase(),
        "response: ", _req.getResponse()
      );

      // TODO: invalidate form view and flash error!
      this.fireDataEvent("login", false);
    },

  },

  /*
  *****************************************************************************
   EVENTS
  *****************************************************************************
  */
  events: {
    "login": "qx.event.type.Data"
  },

});