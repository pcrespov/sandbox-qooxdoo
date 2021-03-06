/**
 *  Features:
 *      - Composes all widgets for Login page: form
 *      - Sets page layout
 *      - Creates view-model binding
 *      -
 */
qx.Class.define("wam.ui.LoginPage", {
  extend: qx.ui.container.Composite, // should this be something else?

  construct: function() {
    this.base(arguments);

    // forms
    // are complex ser inputs: implements validation, retting, ...
    // they can be widgets with extended functionality (using mixins)
    let loginForm = new wam.ui.form.Login();

    // widget items    
    let header = new qx.ui.basic.Atom("<h2>Welcome to simcore</h2>", "wam/test.png").set({
      rich: true,
      iconPosition: "top",
    });
    // TODO Logo and welcome message

    let formView = new qx.ui.form.renderer.Single(loginForm);
    let footer = new qx.ui.core.Widget();
    // TODO Add forgot password? | Create Account

    // layouting & apperance
    {
      header.set({
        backgroundColor: "green",
      });

      formView.set({
        backgroundColor: "red",
        width: 300 // TODO: themed?
      });
      formView.getLayout().set({
        spacingY: 10 // TODO: themed?
      });

      footer.set({
        backgroundColor: "blue"
      });

      // http://www.qooxdoo.org/5.0.2/pages/desktop/ui_layouting.html
      // http://www.qooxdoo.org/5.0.2/pages/layout.html
      // http://www.qooxdoo.org/5.0.2/pages/layout/box.html
      // http://www.qooxdoo.org/5.0.2/demobrowser/#layout~VBox.html

      this.set({
        backgroundColor: "yellow"
      });

      // Layout abstraction
      let layout = new qx.ui.layout.VBox().set({
        alignY: "middle",
        spacing: 5, // TODO: themed?
      });

      this.setLayout(layout);

      // Current's LayoutItem props
      this.setLayoutProperties({
        allowGrowY: false
      });

      // Example of item properties {flex:0, width='%'} passed as options.
      // notice that these options are specific for every layout abstraction!
      // the he uses the api LayoutItem.setLayoutProperties to set computed layout
      // considering parent layout hints
      this.add(header);
      this.add(formView);
      this.add(footer);
    }


    // Connect actions
    loginForm.addListener("loginChanged", function(e) {
      var loginData = e.getData(); // this loginData is already verified by the form

      // TODO: POST server for user authentication!
      console.debug("TODO posting: ", e.getData());
    }, this);
  }
});
