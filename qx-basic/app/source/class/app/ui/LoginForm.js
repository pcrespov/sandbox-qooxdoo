qx.Class.define("app.ui.LoginForm", {
    extend: qx.ui.container.Composite,

    construct: function () {
        this.base(arguments);

        // create UI
        var name = new qx.ui.form.TextField();
        var password = new qx.ui.form.PasswordField();
        var rememberMe = new qx.ui.form.CheckBox();
        


        // BINDING --

        // creates a qx-object called model
        var model = this.__model = qx.data.marshal.Json.createModel({ 
            name: "null", 
            password: "null", 
            rememberMe: false 
        });

        // create controller on model
        var controller = this.__controller = new qx.data.controller.Object(model);

        // bind model and ui items
        controller.addTarget(name, "value", "name", true);
        controller.addTarget(password, "value", "password", true);
        controller.addTarget(rememberMe, "value", "password", true);

        // 

    },
    members: {
        __model: null,
        __view: null,
        __controller: null,

        /**
         * 
         */
        _createMVC: function(){


        },
    }
});