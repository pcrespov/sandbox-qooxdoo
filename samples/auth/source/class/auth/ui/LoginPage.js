/**
 *  TODO: layout should be adaptable
 *
 *
 * Based on
 * http://www.softwaresamurai.org/2018/01/06/login-form-with-php-and-qooxdoo/
 *
 */
/* global auth */
qx.Class.define("auth.ui.LoginPage", {
  extend: qx.ui.container.Composite,
  include: auth.ui.MPage,

  construct: function() {
    this.base(arguments);
    // Setup children's layout and widget dims
    this.setLayout(new qx.ui.layout.Canvas());
    this.set({
      width: 300,
      height: 250
    });
    this.__buildPage();
    // Place this in document's center. TODO: should be automatically reposition of document size changed!?
    var top = parseInt((qx.bom.Document.getHeight() - this.getHeight()) / 2, 10);
    var left = parseInt((qx.bom.Document.getWidth() - this.getWidth()) / 2, 10);
    var app = qx.core.Init.getApplication();
    app.getRoot().add(this, {
      top: top,
      left: left
    });
  },
  destruct: function() {
    console.debug("destroying LoginPage");
  },
  members: {
    _name: null,
    _pass: null,
    _remember: null,

    __buildPage: function() {
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

      var btnForgot = this.createLinkButton("Forgot Password?", function() {
        this.forgot();
      }, this);
      this.add(btnForgot, {
        top: 130,
        right: 10
      });

      var width = parseInt((this.getWidth() - 30) / 2, 10);
      var btnLogin = this.createButton("Log In", width, function() {
        this.login();
      }, this);
      this.add(btnLogin, {
        bottom: 20,
        left: 10
      });

      var btnRegister = this.createButton("Register", width, function() {
        this.register();
      }, this);
      this.add(btnRegister, {
        bottom: 20,
        right: 10
      });
    },

    login: function() {
      // Data
      var name = this._name.getValue();
      var pass = this._pass.getValue();
      var remember = this._remember.getValue();

      var str = "type=login";
      str += "&username=" + name;
      str += "&password=" + pass;
      str += "&remember=" + remember;

      var app = qx.core.Init.getApplication();
      app.request(str, function(success) {
        var page = null;
        if (success) {
          page = new auth.ui.MainApplication();
          page.show();
          this.destroy();
        } else {
          alert(this.tr("Could not log in."));
        }
      }, this);
    },

    forgot: function() {
      var forgot = new auth.ui.ForgotPage();
      forgot.show();
      this.destroy();
    },

    register: function() {
      var register = new auth.ui.RegisterPage();
      register.show();
      this.destroy();
    }
  }
});
