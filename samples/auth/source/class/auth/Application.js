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

        // Enable fake 
        //if (qx.core.Environment.get("auth.mockBackend")) {
          auth.mock.User;
        //}
      }

      let loginForm = new qx.ui.form.Form();

      { // Widget items
        loginForm.addGroupHeader("Login");

        let userNameTxt = new qx.ui.form.TextField();
        userNameTxt.setRequired(true);
        userNameTxt.setPlaceholder("User name or email");

        loginForm.add(userNameTxt, "User", null, "user", null);

        let passwordTxt = new qx.ui.form.PasswordField();
        passwordTxt.setRequired(true);
        loginForm.add(passwordTxt, "Password", null, "password", null);

        let rememberChk = new qx.ui.form.CheckBox();
        loginForm.add(rememberChk, "Remember Me", null, "remember");
      }

      let loginBtn = new qx.ui.form.Button("Log In");
      loginForm.addButton(loginBtn);


      // TODO: validation?
      // TODO add alternative login methods using tabs?

      // data binding
      // controller: responsible of connecting a form with a data model
      let controller = new qx.data.controller.Form(null, loginForm);

      // data model. In this case, created out of the form
      let model = controller.createModel();


      // events      
      loginBtn.addListener("execute", function () {
          if (loginForm.validate()) {

            let serializer = function (object) {
              if (object instanceof qx.ui.form.ListItem) {
                return object.getLabel();
              }
            };
            console.debug("You are sending: " + 
            qx.util.Serializer.toUriParameter(model, serializer));

            // Requests authentication to server
            let req = new qx.io.request.Xhr().set({
              // qx.io.request.authentication sets headers.
              // Can send user+passorwd or user=token w/o password!?
              //authentication: new qx.io.request.authentication.Basic(model.getUser(), model.getPassword()),
              url: "/login",
              method: "POST",
              requestData: qx.util.Serializer.toJson(model, serializer)
            });

            req.addListener("success", function (e) {
              // Start application X for user Y ->
              let trec = e.getTarget();
              console.debug("Everything went fine!!")
              console.debug("status  :", trec.getStatus());
              console.debug("phase   :", trec.getPhase());
              console.debug("response: ", trec.getResponse());
            }, this);

            req.addListener("fail", function (e) {
              // Display error page!
              let trec = e.getTarget();
              console.debug("Something went wrong!!")
              console.debug("status  :", trec.getStatus());
              console.debug("phase   :", trec.getPhase());
              console.debug("response: ", trec.getResponse());

            }, this);

            req.send();
          }
        },
        this);



      // layout
      let loginWidget = new qx.ui.form.renderer.Single(loginForm);


      // root is confired as a Canvas here
      this.getRoot().add(loginWidget, {
        left: "20%",
        top: "20%",
        width: "60%",
        height: "40%"
      })
    }
  }
});