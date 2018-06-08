qx.Class.define("drest.Application", {
  extend: qx.application.Standalone,

  members: {
    __gistsRes: null,
    __gistRes: null,
    __gistsStore: null,
    __gistStore: null,
    __list: null,
    __gist: null,

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

      this._setUpResources();
      this._setUpStores();
      this._createGui();
      this._setUpBinding();

      this.__gistsRes.get();

      // Select first item in list
      this.__list.addListener("changeModel", function (evt) {
        var model = evt.getData();
        this.__list.getSelection().push(model.getItem(0));
      }, this);

      // On selection of item populate gist view
      this.__list.getSelection().addListener("change", function (evt) {
        var id = this.__list.getSelection().getItem(0).getId();
        this.__gistRes.get({
          id: id
        });
      }, this);
    },

    _setUpResources: function () {
      // Index of gists
      this.__gistsRes = new drest.rest.Resource({
        "get": {
          method: "GET",
          url: "/gists"
        }
      });

      // Single gist
      this.__gistRes = new drest.rest.Resource({
        "get": {
          method: "GET",
          url: "/gists/{id}"
        }
      });
    },

    _setUpStores: function () {
      // Attach particular resource action to stores
      this.__gistsStore = new qx.data.store.Rest(this.__gistsRes, "get");
      this.__gistStore = new qx.data.store.Rest(this.__gistRes, "get");
    },

    _createGui: function () {
      var dockContainer = new qx.ui.container.Composite(new qx.ui.layout.Dock());
      dockContainer.setPadding(10);

      var label = new qx.ui.basic.Label("Gists");
      label.setFont("bold");
      label.setPaddingBottom(10);
      dockContainer.add(label, {
        edge: "north"
      });

      this.__list = new qx.ui.list.List();
      this.__list.setWidth(200);
      this.__gist = new drest.view.Gist();

      dockContainer.add(this.__list, {
        edge: "west"
      });
      dockContainer.add(this.__gist, {
        edge: "center"
      });

      this.getRoot().add(dockContainer, {
        edge: 0
      });
    },


    _setUpBinding: function () {
      var list = this.__list,
        gistsStore = this.__gistsStore,
        gistStore = this.__gistStore;

      // List
      list.setLabelPath("description");
      list.setLabelOptions({
        converter: function (label, model, source, target) {
          if (label === null || !label.length) {
            return model.getId();
          }
          return label;
        }
      });

      gistsStore.bind("model", list, "model");

      // Gist
      var gist = this.__gist;

      gistStore.bind("model.description", gist.getDescription(), "value");
      gistStore.bind("model.user.login", gist.getUsername(), "value");
      gistStore.bind("model.user.avatar_url", gist.getGravatar(), "source");
      gistStore.bind("model.files", gist.getContent(), "html", {
        converter: function (model) {
          var files = qx.Class.getProperties(model.constructor);
          var content = model.get(files[0]).getContent();
          content = qx.bom.String.escape(content);
          return "<pre>" + content + "</pre>";
        }
      });
    },
  } // members
});