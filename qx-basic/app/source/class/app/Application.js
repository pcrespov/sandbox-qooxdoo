/* ************************************************************************

   Copyright: 2018 undefined

   License: MIT license

   Authors: pcrespov
************************************************************************ */

/**
 * This is the main application class of "app"
 *
 * @asset(app/*)
 */
qx.Class.define("app.Application", {
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
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */
      var container1 = new qx.ui.container.Composite(new qx.ui.layout.HBox());

      // Document is the application root
      this.getRoot().add(container1, {
        left: 22,
        top: 0
      });
      //this.getRoot().add(container2, { left: 22, top: 150 });

      //this.addStuffTo(container1);
      //this.addButtonsDemoTo(container2);
      this.addLoginFormTo(container1);
    },

    addStuffTo: function (container) {
      var button1 = new qx.ui.form.Button("Click me here", "app/test.png");

      container.add(button1);

      var label1 = new qx.ui.basic.Label("This <b>LABEL</b>").set({
        rich: true,
        width: 150
      });

      container.add(label1);

      var atom1 = new qx.ui.basic.Atom("User Name:", "app/test.png").set({
        decorator: "main",
        iconPosition: "left",
        padding: 5,
      });

      container.add(atom1);

      // Add an event listener
      button1.addListener("execute", function () {
        /* eslint no-alert: "off" */
        alert("Hoi zäme!");
      });
    },

    addButtonsDemoTo: function (container) {
      var btn_on = new qx.ui.form.ToggleButton("On", "app/test.png");
      var btn_off = new qx.ui.form.ToggleButton("Off", "app/test.png");
      var light = new qx.ui.basic.Label().set({
        value: "on",
      });

      var group = new qx.ui.form.RadioGroup();
      group.add(btn_on, btn_off);


      group.addListener("changeValue", function (e) {
        this.debug("Clicked on" + e.getData());
      }, this);


      container.add(btn_on);
      container.add(btn_off);
    },

    addLoginFormTo: function (container) {
      var cnt = new qx.ui.container.Composite(new qx.ui.layout.VBox());

      cnt.add(new qx.ui.basic.Label().set({
        value: "<h1>Log In</h1>",
        rich: true,
        width: 120,
        textAlign: "center",
      }));
      cnt.add(new qx.ui.basic.Label("New? Sign-Up"));

      var cntForm = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
        alignX: "center",
        spacing: 10,
        separator: new qx.ui.decoration.Decorator().set({
          width: 1,
          style: "solid",
          color: "black"
        })
      }));

      {
        var cntLeft = new qx.ui.container.Composite(new qx.ui.layout.VBox());
        cntLeft.add(new qx.ui.form.TextField("Email").set({
          required: true,
        }));
        cntLeft.add(new qx.ui.form.TextField("Password"));
        cntLeft.add(new qx.ui.form.CheckBox("Remember me"));
        cntLeft.add(new qx.ui.form.Button("Log in"));
        cntForm.add(cntLeft);


        var cntRight = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({
          spacing: 12,
          alignY: "middle"
        }));
        cntRight.add(new qx.ui.form.Button("OpenID", "app/openid-16.png"));
        cntForm.add(cntRight);
      }
      cnt.add(cntForm);
      container.add(cnt);
    },

  }
});