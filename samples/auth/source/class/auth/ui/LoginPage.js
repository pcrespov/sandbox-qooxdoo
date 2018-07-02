/**
 *  TODO: layout should be adaptable
 *
 *
 * Based on
 * http://www.softwaresamurai.org/2018/01/06/login-form-with-php-and-qooxdoo/
 *
 */
qx.Class.define("auth.ui.LoginPage", {
  extend: qx.ui.container.Composite,
  construct: function () {
    this.base(arguments);
    // Setup children's layout and widget dims
    this.setLayout(new qx.ui.layout.Canvas());
    this.set({
      width: 300,
      height: 250
    });
    this._buildLogin();
    // Place this in document's center. TODO: should be automatically reposition of document size changed!?
    var top = parseInt((qx.bom.Document.getHeight() - this.getHeight()) / 2, 10);
    var left = parseInt((qx.bom.Document.getWidth() - this.getWidth()) / 2, 10);
    var app = qx.core.Init.getApplication();
    app.getRoot().add(this, {
      top: top,
      left: left
    });
  },
  destruct: function () {
    console.debug("destroying LoginPage");
  },
  members: {
    _name: null,
    _pass: null,
    _remember: null,

    _buildLogin: function () {
      var semi = new qx.ui.core.Widget();
      semi.set({
        opacity: 0.8
      });
      this.add(semi, {
        top: 1,
        left: 1,
        right: 1,
        bottom: 1
      });

      var atm = new qx.ui.basic.Atom().set({
        icon: "auth/itis.png",
        iconPosition: "top"
      });
      atm.setWidth(this.getWidth() - 20);
      this.add(atm, {
        top: 0,
        left: 10
      });


      var name = new qx.ui.form.TextField();
      name.setPlaceholder("Your email address");
      this.add(name, {
        top: 65,
        left: 10,
        right: 10
      });
      this._name = name;

      var pass = new qx.ui.form.PasswordField();
      pass.setPlaceholder("Your password");
      this.add(pass, {
        top: 100,
        left: 10,
        right: 10
      });
      this._pass = pass;

      var chk = new qx.ui.form.CheckBox("<b style='color: #FFFFFF'>" + this.tr("Remember me ?") + "</b>");
      var lbl = chk.getChildControl("label");
      lbl.setRich(true);
      this.add(chk, {
        top: 130,
        left: 10
      });
      this._remember = chk;

      var btnForgot = this._createLinkButton("Forgot Password?", function () {
        this.forgot();
      }, this);
      this.add(btnForgot, {
        top: 130,
        right: 10
      });

      var width = parseInt((this.getWidth() - 30) / 2, 10);
      var btnLogin = this._createButton("Log In", width, function () {
        this.login();
      }, this);
      this.add(btnLogin, {
        bottom: 20,
        left: 10
      });

      var btnRegister = this._createButton("Register", width, function () {
        this.register();
      }, this);
      this.add(btnRegister, {
        bottom: 20,
        right: 10
      });
    },
    /**
     * Create link button
     */
    _createLinkButton: function (cbk, ctx) {
      var strForgot = "<center><i style='color: white'>" + this.tr("Forgot Password ?") + "</i></center>";
      var atm = new qx.ui.basic.Atom(strForgot);
      atm.set({ cursor: 'pointer' });
      var lbl = atm.getChildControl("label");
      lbl.setRich(true);
      lbl.setAllowGrowY(true);
      atm.addListener("mouseover", function () {
        atm.setLabel("<u style='color: white'>" + strForgot + "</u>");
      }, this);
      atm.addListener("mouseout", function () {
        atm.setLabel(strForgot);
      }, this);
      atm.addListener("click", function () {
        cbk.call(this); //  == this.cbk()
      }, ctx);

      return atm;
    },
    /**
     * Custom button creation
     */
    _createButton: function (txt, width, cbk, ctx) {
      var btn = new qx.ui.form.Button(txt);
      btn.set({
        width: width,
        cursor: "pointer"
      });
      btn.addListenerOnce("appear", function () {
        // TODO: set color
      });
      btn.addListener("hover", function () {
        // change button's color
      }, this);
      btn.addListener("mouseout", function () {
        // set original color
      }, this);
      btn.addListener("execute", function (e) {
        cbk.call(this); // <= this.call() in ctx
      }, ctx);

      return btn;
    },

    /**
     * Funtionality
     */
    login: function () {
      var name = this._name.getValue();
      var pass = this._pass.getValue();
      var remember = this._remember.getValue();

      // app.check();
      var str = "type=login";
      str += "&username=" + name;
      str += "&password=" + pass;
      str += "&remember=" + remember;


      // request server for login.
      var app = qx.core.Init.getApplication();
      app.request_login(str, function (success) {
        var win = null;
        if (success) {
          win = new ao.apps.users.SoftwareSamurai.ApplicationWindow();
          win.show();
          this.destroy();
        } else {
          alert(this.tr("Could not log in."));
        }
      }, this);
    },

    forgot: function () {
      var forgot = new auth.ui.ForgotWindow();
      forgot.show();
      this.destroy(); // <---- this is how close this window
    },

    register: function () {
      var signup = new auth.ui.SignupWindow();
      signup.show();
      this.destroy();
    }
  }
});
