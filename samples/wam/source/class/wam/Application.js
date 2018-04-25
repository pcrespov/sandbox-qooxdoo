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
    main : function() {

      const DEBUG=false;

      // Call super class
      this.base(arguments);

      // application's root widget
      let rootView = this.getRoot();

      let loginPage = new wam.ui.LoginPage();
      let contentPage = new wam.ui.ContentPage();

      loginPage.set({
        backgroundColor: DEBUG ? "gray" : null
      });

      //rootView.add(loginPage, {edge: "30%"});
      rootView.add(contentPage, {edge:0});
    }
  }
  });
