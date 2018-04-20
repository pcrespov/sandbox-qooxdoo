/**
 *   A form with login widgets
 *      - adds all input fields/buttons for login
 *      - implements IForm interface (enable, required, validation)
 *      - triggers
 */
qx.Class.define("wam.ui.form.Login", {
  extend: qx.ui.form.Form,

  construct: function() {
    this.base(arguments);

    const loc = new qx.ui.core.Widget();

    // Widget items
    let userTxt = new qx.ui.form.TextField();
    userTxt.setRequired(true);
    userTxt.setPlaceholder(loc.tr("User name or email"));

    this.add(userTxt, loc.tr("User"), null, "user", null);

    let passTxt = new qx.ui.form.PasswordField();
    passTxt.setRequired(true);
    this.add(passTxt, loc.tr("Password"), null, "password", null);

    let rememberCBx = new qx.ui.form.CheckBox();
    this.add(rememberCBx, loc.tr("Remember Me"), null, "remember");

    let loginBtn = new qx.ui.form.Button(loc.tr("Log In"));
    this.addButton(loginBtn);

    // data binding

    // controller: responsible of connecting a form with a data model
    let controller = new qx.data.controller.Form(null, this);

    // data model. In this case, created out of the form
    let model = controller.createModel();

    loginBtn.addListener("execute", function() {
      if (this.validate()) {
        // var loginData = this.__model;
        // this is instead a copy?!
        var loginData = {
          username: model.getUser(),
          password: model.getPassword(),
          remember: model.getRemember()
        };
        this.fireDataEvent("loginChanged", loginData);
      }
    }, this);
  },

  events: {
    "loginChanged": "qx.event.type.Data"
  }
});
