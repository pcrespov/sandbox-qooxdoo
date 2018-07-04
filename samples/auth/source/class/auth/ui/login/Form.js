/**
 * Collection of items and buttons to log-in
 *
 * TODO add translation
*/

/* eslint no-warning-comments: "off" */

qx.Class.define("auth.ui.login.Form", {
  extend: qx.ui.form.Form,

  construct: function() {
    this.base(arguments);

    // TODO: add also login with user-id
    // FIXME: WARNING add [DOM] Password field is not contained in a form: (More info: https://goo.gl/9p2vKq)

    var username = new qx.ui.form.TextField();
    username.setRequired(true);
    username.setPlaceholder("Your email address");
    this.add(username, "", qx.util.Validate.email(), "user", null);
    username.setTabIndex(1);

    var password = new qx.ui.form.PasswordField();
    password.setRequired(true);
    password.setPlaceholder("Your password");
    this.add(password, "", null, "password", null);
    password.setTabIndex(username.getTabIndex() + 1);

    // TODO:
    // var remember = new qx.ui.form.CheckBox();
    // this.add(remember, "Remember Me", null, "remember");

    // Buttons
    var submit = new qx.ui.form.Button("Sign in");
    this.addButton(submit);
    submit.setTabIndex(password.getTabIndex() + 1);

    // data binding
    this.__controller = new qx.data.controller.Form(null, this);
    this.__model = this.__controller.createModel(); // model created out of the form

    submit.addListener("execute", this.__onSubmitButtonExecuted, this);
  },

  events: {

    // Whenever the login form is submitted: Event data: The new text value of the field.
    "submit": "qx.event.type.Data"
  },

  members: {
    __model: null,
    __controller: null,

    __onSubmitButtonExecuted: function() {
      if (this.validate()) {
        this.fireDataEvent("submit", this.getData());
      }
    },

    flashInvalidLogin: function(msg) {
      var username = this.getItems().user;
      var password = this.getItems().password;

      var message = msg === null ? "Invalid user or password" : msg;
      username.setInvalidMessage(message);
      password.setInvalidMessage(message);
      username.setValid(false);
      password.setValid(false);
    },

    getData: function() {
      // var serializer = function (object) {
      //   if (object instanceof qx.ui.form.ListItem) {
      //     return object.getLabel();
      //   }
      // };
      // var data = qx.util.Serializer.toJson(this.__model, serializer);

      var data = {
        username: this.__model.getUser(),
        password: this.__model.getPassword()
      };
      return data;
    }
  }
});
