/* ************************************************************************

   Copyright: 2018 

   License: MIT license

   Authors: 

************************************************************************ */

/**
 * This is the main application class of "rest"
 *
 * @asset(rest/*)
 */
qx.Class.define("rest.Application",
  {
    extend: qx.application.Standalone,
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members:
      {

        main: function () {
          // Call super class
          this.base(arguments);

          // FIXME: enable only when dev flags
          //if (qx.core.Environment.get("auth.mockBackend")) {
          console.debug("Initializing FakeServer ...");
          rest.dev.mock.Users;
          //}

          // Document is the application root
          var doc = this.getRoot();

          // Resources
          let user = new qx.io.rest.Resource();
          user.map('get', 'GET', 'api/v1/user/{id}', { id: qx.io.rest.Resource.REQUIRED }); // get user
          // TODO: add check: { id: /\d+/ } }

          let users = new qx.io.rest.Resource();
          users.map('get', 'GET', 'api/v1/users/');  //Retrieve list of users 
          users.map('post', 'POST', 'api/v1/users/'); //create user

          users.addListener("success", function(e) {
            console.debug(e.getId() + " event went well")
          });

          let store = new qx.data.store.Rest(users, "get");

          var embed = new qx.ui.embed.Html();
          embed.setBackgroundColor("white");
          embed.setDecorator("main");
          embed.setWidth(500);
          embed.setHeight(200);
          embed.setOverflow("auto", "auto");

          doc.add(embed, { left: 10, top: 110 });

          // after the data has been loaded
          store.addListener("loaded", function () {
            var model = store.getModel();
            // display the model in the log
            this.debug(qx.dev.Debug.debugProperties(model));
            // display the model in an html embed
            embed.setHtml(qx.dev.Debug.debugProperties(model, 10, true));
          }, this);

          users.longPoll("get");


          // Create a button
          var button1 = new qx.ui.form.Button("Click me", "rest/test.png");

          // Add button to document at fixed coordinates
          doc.add(button1, { left: 100, top: 50 });

          // Add an event listener
          button1.addListener("execute", function () {
            /* eslint no-alert: "off" */
            alert("Hello World!");
          });
        }
      }
  });