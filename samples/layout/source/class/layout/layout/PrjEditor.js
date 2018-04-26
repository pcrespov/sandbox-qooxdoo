/* global document */

qx.Class.define("layout.layout.PrjEditor", {
  extend: qx.ui.container.Composite,

  construct: function() {
    this.base();

    this.set({
      layout: new qx.ui.layout.Canvas()
    });

    // Create a horizontal split pane
    this._Pane = new qx.ui.splitpane.Pane("horizontal");

    this._PaneLeft = this._getItemLeft();
    this._Pane.add(this._PaneLeft, 0);

    this._PaneRight = this._getItemRight();
    this._Pane.add(this._PaneRight, 1);

    this._Pane.getChildren()[0].set({
      width: parseInt(this._getDocWidth() / 2)
    });

    console.log(this._Pane);

    this.add(this._Pane, {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    });
  },

  members: {
    _Pane: null,
    _PaneLeft: null,
    _PaneRight: null,

    _getDocWidth: function() {
      let body = document.body;
      let html = document.documentElement;
      let docWidth = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
      return docWidth;
    },

    _getItemLeft: function() {
      let comp = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
      comp.set({
        backgroundColor: "blue"
      });
      return comp;
    },

    _getItemRight: function() {
      let comp = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      comp.set({
        backgroundColor: "green"
      });
      return comp;
    }
  }
});
