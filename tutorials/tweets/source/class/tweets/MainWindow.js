


qx.Class.define('tweets.MainWindow', {
  extend: qx.ui.window.Window,
  construct: function() {
    this.base(arguments, 'tweets');

    this.setShowMaximize(false);
    this.setShowMinimize(false);
    this.setShowClose(false);

    this.setStatus('This is the status bar');

    this.setWidth(250);
    this.setHeight(300);
  }
});