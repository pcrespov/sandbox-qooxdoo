/**
 * This is the main application class of "wam"
 *
 * @asset(wam/*)
 */
qx.Class.define("wam.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);
      
      // application's root widget
      let rootView = this.getRoot();

      rootView.set({
        backgroundColor: 'gray',
      });


      let form = new qx.ui.form.Form();
      {
        let userTxt = new qx.ui.form.TextField().set({
          required: true,
        });
        form.add(userTxt, 'User Id', null, 'user', null);

        let passTxt = new qx.ui.form.PasswordField().set({
          required: true,
        });
        form.add(passTxt, 'Password', null, 'password', null);

        let loginBtn = new qx.ui.form.Button("Log In");
        form.addButton(loginBtn);
      }

      let formView = new qx.ui.form.renderer.Single(form);
      {
        formView.set({
          backgroundColor: "red",
          width:300,
        });
        formView.getLayout().set({
          spacingY: 10
        });
      }

      var baseView = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
      baseView.set({
        //backgroundColor: "yellow",
        padding: 10
      });
      baseView.getLayout().set({
        alignX: 'center',
      });

      baseView.add(new qx.ui.core.Widget().set({ 
       // backgroundColor: "green"
      }));
      baseView.add(formView);
      baseView.add(new qx.ui.core.Widget().set({ 
        //backgroundColor: "green"
      }));
      baseView.add(new qx.ui.core.Widget().set({ 
        //backgroundColor: "blue"
      }));
      
      rootView.add(baseView, {edge: '30%'});

    }
  }
});