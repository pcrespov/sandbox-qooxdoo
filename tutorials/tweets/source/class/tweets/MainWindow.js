


qx.Class.define('tweets.MainWindow', {
  extend: qx.ui.window.Window,

  construct: function() {
    this.base(arguments, 'tweets', 'tweets/test.png');

    this.setShowMaximize(false);
    this.setShowMinimize(false);
    this.setShowClose(false);

    this.setWidth(250);
    this.setHeight(300);

    var layout = new qx.ui.layout.Grid(0, 0);
    this.setLayout(layout);

    var toolbar = new qx.ui.toolbar.ToolBar();
    {
      var reloadButton = new qx.ui.toolbar.Button('Reload');

      reloadButton.setToolTipText('Reload the tweets');

      reloadButton.addListener('execute', function() {
        this.fireEvent('reload')
      }, this);

      toolbar.add(reloadButton);
    }

    this.add(toolbar, {row: 0, column: 0, colSpan: 2});

    {
      var list = new qx.ui.list.List();
      this.setContentPadding(1);
      this.add(list, {row: 1, column: 0, colSpan: 2});
    }

    layout.setRowFlex(1, 1);
    layout.setColumnFlex(0, 1);

    this.debug('Window is logging...');

    // textarea & post button
    {
      var textarea = new qx.ui.form.TextArea();
      textarea.setPlaceholder('Add here a message');    

      var postButton = new qx.ui.form.Button('Post').set({
          width: Math.floor(this.getWidth()/4.0),
          enabled: false
      });
      postButton.setToolTipText('Post message ...');

      // layout
      this.add(textarea, {row: 2, column: 0});
      this.add(postButton, {row: 2, column: 1});

      postButton.addListener('execute', function() {
        this.fireDataEvent('post', textarea.getValue());
      }, this);

      textarea.addListener('input', function(e) {
        var value = e.getData();
        postButton.setEnabled(value.length < 140 && value.length > 0);
      }, this);

      // TODO use validator with textarea
    }
  },

  events: {'reload': 'qx.event.type.Event', 'post': 'qx.event.type.Data'}
});