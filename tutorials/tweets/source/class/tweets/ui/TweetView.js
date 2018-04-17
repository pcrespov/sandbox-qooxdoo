
qx.Class.define("tweets.ui.TweetView",
{
    extend: qx.ui.core.Widget,

    // Can be included for implementing qx.ui.form.IModel. It only contains a nullable property named ‘model’ with a ‘changeModel’ event.
    include: [ qx.ui.form.MModelProperty ],

    construct: function(){
        this.base(arguments);

        // create a date format like "June 18, 2010 9:31 AM"
        this._dateFormat = new qx.util.format.DateFormat(
            qx.locale.Date.getDateFormat("long") + " " +
            qx.locale.Date.getTimeFormat("short")
        );

        // initialize the layout and allow wrap for "post"
        var layout = new qx.ui.layout.Grid(4, 2);
        layout.setColumnFlex(1, 1);
        this._setLayout(layout);

        // create the widgets
        this._createChildControl("icon");
        this._createChildControl("time");
        this._createChildControl("post");
    },

    properties: {
        // This property is needed for the theming
        apperance:
        {
            refine: true,
            init: "listitem"
        },

        icon: 
        {
            //  But be careful, the check is only done in the source version
            check: "String",
            // which method should be called when the value changes.
            aply: "_applyIcon",
            nullable: true
        },

        time: 
        {
            check: "Date",
            nullable: true
        },

        text: 
        {
            check: "String",
            nullable: true
        }
    },

    members :
    {
        // overridden to create sub-widgets
        // see http://www.qooxdoo.org/current/pages/desktop/ui_develop.html
        _createChildControlImpl: function (id) 
        {
            var control;

            switch (id) {
                case "icon":
                    control = new qx.ui.basic.Image(this.getIcon());
                    control.setAnonymous(true);
                    // added in grid
                    this._add(control, {
                        row: 0,
                        column: 0,
                        rowSpan: 2
                    });
                    break;

                case "time":
                    control = new qx.ui.basic.Label(this.getTime());
                    control.setAnonymous(true);
                    this._add(control, {
                        row: 0,
                        column: 1
                    });
                    break;

                case "post":
                    control = new qx.ui.basic.Label(this.getPost());
                    control.setAnonymous(true);
                    control.setRich(true);
                    this._add(control, {
                        row: 1,
                        column: 1
                    });
                    break;
            }

            return control || this.base(arguments, id);
        },

        // property apply
        _applyIcon : function(value, old) 
        {
          var icon = this.getChildControl("icon");
          icon.setSource(value);
        },

        _applyPost : function(value, old) {
          var post = this.getChildControl("post");
          post.setValue(value);
        },

        // property apply
        _applyTime : function(value, old) {
          var time = this.getChildControl("time");
          time.setValue(this._dateFormat.format(value));
        }

    }

});