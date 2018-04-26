qx.Class.define("dbind.demo.App1", {

  extend: qx.ui.container.Composite,

  construct: function () {
    this.base(arguments);

    const itemSchema = {
      name: "New Project",
      description: "Empty",
      thumbnail: "https://imgplaceholder.com/171x96/cccccc/757575/ion-plus-round",
      created: null
    };

    this.__buildLayout(itemSchema);

  }, // construct

  members: {
    __searchTxf: null,
    __projectsList: null,
    __form: null,

    main: function (data) {

      let controller = new qx.data.controller.List(data, this.__projectsList, 'name');

      // https://www.qooxdoo.org/current/pages/data_binding/single_value_binding.html#options-conversion-and-validation
      // http://www.qooxdoo.org/current/api/#qx.data.SingleValueBinding~bind
      controller.setDelegate({
        configureItem: function (item) {
          // http://www.qooxdoo.org/5.0.2/api/#qx.ui.basic.Atom
          item.set({
            iconPosition: "top",
            gap: 0,
            rich: true,
            allowGrowY: false,
            maxWidth: 200
          });
        },
        bindItem: function (controler, item, id) {
          controler.bindProperty("name", "label", {
            converter: function (data, model, source, target) {
              return "<b>" + data + "</b>: " + model.getDescription();
            }
          }, item, id);
          controler.bindProperty("thumbnail", "icon", {
            converter: function (data) {
              return data === null ? "http://via.placeholder.com/171x96" : data;
            }
          }, item, id);
        }
      });

      // creates a form
      let controllerFrm = new qx.data.controller.Form(controller.getSelection(), this.__form);


      controller.getSelection().addListener("change", function (e) {
        const selectedItem = e.getTarget().toArray()[0];
        controllerFrm.setModel(selectedItem);
        console.debug("Selected Item:", selectedItem.getName());
      }, this);


      //searchTxt.bind("changeValue", );
      this.__searchTxf.addListener("changeValue", function (e) {
        console.debug("Search string: ", e.getData());

      }, this);

    },

    __buildLayout: function (modelSkeleton) {

      let layout = new qx.ui.layout.VBox().set({
        spacing: 10
      });

      this.setLayout(layout);
      this.set({
        backgroundColor: 'yellow',
      });

      let search = this.__searchTxf = new qx.ui.form.TextField();
      search.set({
        placeholder: "Search",
        liveUpdate: true
      });
      this.add(this.__searchTxf);


      let list = this.__projectsList = new qx.ui.form.List();
      list.set({
        orientation: "horizontal",
        spacing: 0,
        allowGrowY: false
      });
      this.add(this.__projectsList);

      
      let form = this.__form = new qx.ui.form.Form();
      form.addGroupHeader("Selected Item");

      // Builds a form out a JSON
      for (var key in modelSkeleton) {
        form.add(new qx.ui.form.TextField().set({
          readOnly: true
        }), key);
      }
      this.add(new qx.ui.form.renderer.Single(this.__form));
    }

  } // members

});