qx.Class.define('tweets.ui.MainWindow', {
  extend: qx.ui.window.Window,

  construct: function () {
    this.base(arguments, 'tweets', 'tweets/test.png');

    this.setShowMaximize(false);
    this.setShowMinimize(false);
    this.setShowClose(false);

    this.setWidth(500);
    this.setHeight(400);

    var layout = new qx.ui.layout.Grid(0, 0);
    this.setLayout(layout);

    var toolbar = new qx.ui.toolbar.ToolBar(); 
    {
      var reloadButton = new qx.ui.toolbar.Button(this.tr('Reload'));

      reloadButton.setToolTipText(this.tr('Reload the tweets'));

      // connect reloadButton event with main window's reload event
      // 
      reloadButton.addListener('execute', function () {
        this.fireEvent('reload');
      }, this);

      toolbar.add(reloadButton);      
      toolbar.addSpacer();

      // preferences
      var preferencesButton = new qx.ui.toolbar.Button(this.tr("Preferences"));
      toolbar.add(preferencesButton);

      var settingsWindow = null;
      preferencesButton.setToolTipText(this.tr("Change the applications settings."));
      preferencesButton.addListener("execute", function () {
        if (!settingsWindow) {
          settingsWindow = new tweets.ui.PreferencesWindow();
          settingsWindow.moveTo(320, 30);
        }
        settingsWindow.open();
      }, this);

    }

    this.add(toolbar, {
      row: 0,
      column: 0,
      colSpan: 2
    });

    {
      //var list = this.__list = new qx.ui.list.List();
      var list = this.__list = new qx.ui.form.List();
      this.setContentPadding(1);
      this.add(list, {
        row: 1,
        column: 0,
        colSpan: 2
      });
      // this.debug( this.__list );
    }

    layout.setRowFlex(1, 1);
    layout.setColumnFlex(0, 1);

    this.debug('Window is logging...');

    // textarea & post button
    {
      var textarea = new qx.ui.form.TextArea();
      textarea.setPlaceholder(this.tr('Add here a message'));

      var postButton = new qx.ui.form.Button(this.tr('Post')).set({
        width: Math.floor(this.getWidth() / 4.0),
        enabled: false
      });
      postButton.setToolTipText(this.tr('Post message ...'));

      // layout
      this.add(textarea, {
        row: 2,
        column: 0
      });
      this.add(postButton, {
        row: 2,
        column: 1
      });

      postButton.addListener('execute', function () {
        this.fireDataEvent('post', textarea.getValue());
      }, this);

      textarea.addListener('input', function (e) {
        var value = e.getData();
        postButton.setEnabled(value.length < 140 && value.length > 0);
      }, this);

    }
  },

  // http://www.qooxdoo.org/current/pages/core/oo_feature_summary.html#events
  events: {
    'reload': 'qx.event.type.Event',
    'post': 'qx.event.type.Data',
  },

  members: {
    __list: null,

    getList: function () {
      return this.__list;
    }
  }
});