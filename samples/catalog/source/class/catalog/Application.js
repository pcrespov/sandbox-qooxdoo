/**
 * This is the main application class of "catalog"
 *
 * @asset(catalog/*)
 */
qx.Class.define("catalog.Application",
  {
    extend: qx.application.Standalone,

    members:
    {
      // data
      __restResources: {},
      __readOnlyStores: {},

      // views
      __list: null,
      __detail: null,

      main: function () {
        // Call super class
        this.base(arguments);

        // Enable logging in debug variant
        if (qx.core.Environment.get("qx.debug")) {
          // FAKE SERVER
          catalog.dev.fakesrv.restapi.User;
        }

        this.__setUpDataResources();
        this.__createGui();
        this.__setUpBinding();

        this.__restResources.users.get();

        this.__setUpConnections();

      },

      __setUpDataResources: function () {
        const PREFIX = "api/v1";

        // Implements only GET actions
        let _users = new catalog.io.rest.Resource({
          "get": {
            method: "GET",
            url: PREFIX + "/users/"
          }
        });

        let _user = new catalog.io.rest.Resource({
          // Get
          "get": {
            method: "GET",
            url: PREFIX + "/user/{id}",
            check: { id: /\d+/ }
          },
          // Modify
          "put": {
            method: "GET",
            url: PREFIX + "/user/{id}",
            check: { id: /\d+/ }
          },
          // Add
          "post": {
            method: "GET",
            url: PREFIX + "/users/"
          }
        });

        this.__restResources = {
          users: _users,
          user: _user
        };

        // Read-only stores: server -> store
        // Stores associated to a single resouce actions
        this.__readOnlyStores = {
          users: new qx.data.store.Rest(_users, "get"),
          user: new qx.data.store.Rest(_user, "get"),
        };
      },

      __createGui: function () {

        // TODO: Move to catalog.ui.CatalogView
        const itemDescription = "Users"

        let dockContainer = new qx.ui.container.Composite(new qx.ui.layout.Dock());
        dockContainer.setPadding(10);

        let label = new qx.ui.basic.Label(itemDescription);
        label.setFont("bold");
        label.setPaddingBottom(10);
        dockContainer.add(label, {
          edge: "north"
        });

        // https://www.qooxdoo.org/5.0.1/pages/widget/virtuallist.html
        this.__list = new qx.ui.list.List();
        this.__list.setWidth(200);
        this.__detail = new catalog.ui.DetailView();

        dockContainer.add(this.__list, {
          edge: "west"
        });
        dockContainer.add(this.__detail, {
          edge: "center"
        });

        this.getRoot().add(dockContainer, {
          edge: 0
        });

      },

      __setUpBinding: function () {
        let list = this.__list;
        let users = this.__readOnlyStores.users;

        // List of Users
        // TODO: ensure attribute .username exits!?
        list.setLabelPath("username");
        list.setLabelOptions({
          converter: function (label, model, source, target) {
            if (label == undefined || label === null || !label.length) {
              return String(model.getId());
            }
            return label;
          },
          onUpdate: function (sourceObj, targetObj, data) {
            console.debug("Databinding updated successfully for ", data)
          }
        });

        // store -> ui
        users.bind("model", list, "model");

        // Detail of user
        let user = this.__readOnlyStores.user;
        let view = this.__detail;

        // TODO: need to know about user's data structure
        user.bind("model.fullname", view.getDescription(), "value");
        user.bind("model.username", view.getUsername(), "value");
        user.bind("model.avatarUrl", view.getGravatar(), "source");
        user.bind("model.projects", view.getContent(), "html", {
          converter: function (data, model, source, target) {
            if (data != undefined)
            {              
              return "<pre>" + qx.dev.Debug.debugProperties(data) + "</pre>";
            }
            return qx.lang.Json.stringify(data);
          }
        });

      },

      __setUpConnections: function () {

        // On selection of item populate gist view
        this.__list.addListener("changeModel", function(evt) {
          var model = evt.getData();
          console.debug(qx.dev.Debug.debugProperties(model));

          this.__list.getSelection().push(model.getItem(0));
        }, this);

        // Selection triggers item resource request
        this.__list.getSelection().addListener("change", function (evt) {
          var id = this.__list.getSelection().getItem(0)
            .getId();
          console.debug("Requesting ", id, "...");
          this.__restResources.user.get({
            id: id
          });
        }, this);


      }
    }
  });