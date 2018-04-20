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
      // Call super class
      this.base(arguments);

      // application's root widget
      let rootView = this.getRoot();

      let loginView = new wam.ui.LoginPage();

      rootView.set({
        backgroundColor: "gray"
      });

      rootView.add(loginView, {edge: "30%"});
    }
  }
  });
