/**
 * This is the main application class of "dbind"
 *
 * @asset(dbind/*)
 */
qx.Class.define("dbind.Application",
{
  extend : qx.application.Standalone,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

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

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
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

      let rawData = [];
      rawData.push(qx.data.marshal.Json.createModel({
        name: "New Project",
        description: "Empty",
        thumbnail: "https://imgplaceholder.com/171x96/cccccc/757575/ion-plus-round",
        created: null
      }));

      for (var i = 0; i < 5; i++) {
        var item = qx.data.marshal.Json.createModel({
          name: "Project #" + (i + 1),
          description: "This is a very short description",
          thumbnail: null,
          created: null
        });
        rawData.push(item);
      }

      // http://www.qooxdoo.org/current/api/#qx.data.Array
      // A wrapper around raw array to make it "bindable"
      var data = new qx.data.Array(rawData);


      // Layout -------------
      let list = new qx.ui.form.List();
      list.set({
        orientation: "horizontal",
        spacing: 10,
        // layout
        allowGrowY: false
      });


      let layout = new qx.ui.layout.VBox();
      let container = new qx.ui.container.Composite(layout).set({
        backgroundColor: 'yellow',
      });

      container.add(list, { flex: 1 });
      this.getRoot().add(container, { edge: 0 });

      // binding -
      let controller = new qx.data.controller.List(data, list, 'name');

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
            converter: function (data){
              return data === null? "http://via.placeholder.com/171x96": data;
            }
          }, item, id);
        }
      });


  

      controller.getSelection().addListener("change", function(e){ 
        const selectedItem = e.getTarget().toArray()[0];
        console.debug("Selected Item:", selectedItem.getName());
      }, this);

    }
  }
});