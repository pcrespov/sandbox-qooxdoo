
/**
 * 
 * See https://www.chromium.org/developers/design-documents/create-amazing-password-forms
 */
qx.Class.define("tweets.ui.LoginWindow", {
    extend: qx.ui.window.Window,

    construct: function () {
        this.base(arguments, 'login', 'tweets/test.png');

        // windows layout
        this.setLayout(new qx.ui.layout.Basic());
        this.setModal(true);

        // Login form
        let form = this.createLoginForm();

        // controller: responsible of connecting a form with a data model
        let controller = new qx.data.controller.Form(null, form);

        // creates a model out of the form's children
        let model = controller.createModel();

        console.assert(model == controller.getModel(), "controller should have self-created model assigned");


        // Init events ----        
        let ok = form.getButtons()[0]; // TODO: guarantee correct button
        ok.addListener("execute", function () {
            if (form.validate()) {
                //var loginData = this.__model;
                // this is instead a copy?!
                var loginData = {
                    username: controller.getModel().getUsername(),
                    password: controller.getModel().getPassword(),
                    remember: controller.getModel().getRemember(),
                };
                this.fireDataEvent("changeLoginData", loginData);
                this.close();
            }
        }, this);

        // Defines how the form is rendered. It is a widget added to the login window
        var renderer = new qx.ui.form.renderer.Single(form);
        this.add(renderer);
    },

    members: {

        createLoginForm: function () {
            // manages form items. 
            //
            // uses qx.ui.form.Resetter and qx.ui.form.validation.Manager for
            // resettings and validation purposes
            //
            let form = new qx.ui.form.Form();

            let userName = new qx.ui.form.TextField();
            userName.setRequired(true); // implements qx.ui.form.IForm
            userName.setPlaceholder(this.tr("User name or email"));
            form.add(userName, this.tr("User"), null, "username"); // iform, label, validator, name

            let password = new qx.ui.form.PasswordField();
            password.setRequired(true);
            form.add(password, this.tr("Password"), null, "password");

            let rememberMe = new qx.ui.form.CheckBox();
            form.add(rememberMe, this.tr("Remember Me"), null, "remember");

            let ok = new qx.ui.form.Button(this.tr("Log In"));
            form.addButton(ok);

            let cancel = new qx.ui.form.Button(this.tr("Cancel"));
            form.addButton(cancel);     

            cancel.addListener("execute", function () {
                this.close();
            }, this);

            return form;
        },
    },

    events: {
        "changeLoginData" : "qx.event.type.Data"
    }

});