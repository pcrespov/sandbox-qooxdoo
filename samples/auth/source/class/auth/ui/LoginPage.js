/**
 * Based on
 * http://www.softwaresamurai.org/2018/01/06/login-form-with-php-and-qooxdoo/
 */
qx.Class.define("auth.ui.LoginPage",{
  extend: qx.ui.composite.Container,
  construct: function(){
    this.base(arguments);
    // Setup children's layout and widget dims
    this.setLayout(new qx.ui.layout.Canvas());
    this.set( { width : 300, height : 200 } );
    this._buildLogin();
    // Place this in document's center
    var top = parseInt((qx.bom.Document.getHeight() - this.getHeight()) / 2, 10);
    var left = parseInt((qx.bom.Document.getWidth() - this.getWidth())/2, 10);
    var root = qx.core.Init.getApplication();
    root.add(this, {top: top, left: left});
  },
  destruct: function(){
  },
  members: {
    _name: null,
    _pass: null,
    _remember: null,
    _buildLogin: function(){
      // semi-transparent background
      var semi = new qx.ui.core.Widget();
      this.add(semi, {top:1, left:1, right:1, bottom:1});

      var lbl = new qx.ui.core.Label();
      this.add(lbl, { top: 10, left: 10} );

      var line = new qx.ui.core.Widget();
      this.add(line, { top: 1, left: 1, right: 1, bottom: 1 });

      var name = new qx.ui.form.TextField();
      this.add(name);
      this._name = name;

      var pass = new qx.ui.form.PasswordField();
      this.add(pass);
      this._pass = pass;

      var chk = new qx.ui.form.CheckBox();
      this.add(chk);
      this._remember = chk;

      var btnForgot = this._createLinkButton("Forgot?", function(){
        this.forgot();
      }, this);
      this.add(btnForgot);

      var btnLogin = this._createButton("Log In", clr, width, function(){
        this.login();
      }, this);
      this.add(btnLogin);

      var btnRegister = this._createButton("Register", clr, width, function () {
        this.register();
      }, this);
      this.add(btnRegister);
    },
    /**
     * Create link button
     */
    _createLinkButton: function(txt, cbk, ctx){
      var atm = new qx.ui.basic.Atom(txt);
      atm.set({cursor: "pointer"});
      lbl = atm.getChildControl("label");
      lbl.setRich(true);
      atm.addListener("mouseover", function(){
        // change color
      }, this);
      atm.addListener("mouseout", function(){
        // change color
      }, this);
      atm.addListener('click', function() {
        cbk.call(this);  //  == this.cbk()
      }, ctx)

    },
    /**
     * Custom button creation
     */
    _createButton: function(txt, clr, width, cbk, ctx){
      var btn = new qx.ui.form.Button();
      btn.set({width:width, pointer:"pointer"});
      btn.addListenerOnce("appear", function(){

      });
      btn.addListener("hover", function(){
        // change button's color
      }, this);
      btn.addListener("mouseout", function(){
        // change button's color
      }, this);
      btn.addListener("execute", function(e){
        cbk.call();
      }, ctx);
    },
    /**
     * Funtionality
     */
    login: function(){
      var name = this._name.getValue();
      var pass = this._pass.getValue();
      var remember = this._remember.getValue();

      app.check()
      var str = "type=login";
      str += "&username=" + name;
      str += "&password=" + pass;
      str += "&remember=" + remember;
      var app = qx.core.Init.getApplication();
      app.rpc(str, function (success) {
        var win = null;
        if (success) {
          win = new ao.apps.users.SoftwareSamurai.ApplicationWindow();
          win.show();
          this.destroy();
        }
        else {
          alert(this.tr("Could not log in."));
        }
      }, this);

    },

    forgot: function(){
      var forgot = new auth.ui.ForgotWindow();
      forgot.show();
      this.destroy(); //<---- this is how close this window
    },

    register: function(){
      var signup = new auth.ui.SignupWindow();
      signup.show();
      this.destroy();
    }
  }
});