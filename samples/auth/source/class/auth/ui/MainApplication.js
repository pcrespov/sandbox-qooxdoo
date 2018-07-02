qx.Class.define("auth.ui.MainApplication", {
  extend: qx.ui.container.Composite,
  construct: function() {
    this.base(arguments);
    this.setLayout(new qx.ui.layout.Canvas());
    this.set({
      width:qx.bom.Document.getWidth(),
      height: qx.bom.Document.getHeight()
    });

    this.__buildPage();

    var app = qx.core.Init.getApplication();
    app.getRoot().add(this, {
      top: 0,
      left: 0,
      bottom:0,
      right:0
    });
  },
  destruct: function() {
    console.debug("destroying Main Application");
  },

  members: {
    __buildPage: function() {
      var atm = new qx.ui.basic.Atom().set({
        icon: "auth/itis.png",
        iconPosition: "top"
      });
      atm.setWidth(this.getWidth() - 20);

      var top = parseInt(this.getHeight()/4);
      this.add(atm, {
        top: top,
        left: 10
      });
    }  
  }
});
