qx.Mixin.define("auth.ui.MPage", {

  members:{
    /**
     * Create link button
     */
    createLinkButton: function(txt, cbk, ctx) {
      var strForgot = "<center><i style='color: white'>" + txt + "</i></center>";
      var atm = new qx.ui.basic.Atom(strForgot);
      atm.set({
        cursor: "pointer"
      });
      var lbl = atm.getChildControl("label");
      lbl.setRich(true);
      lbl.setAllowGrowY(true);
      atm.addListener("mouseover", function() {
        atm.setLabel("<u style='color: white'>" + strForgot + "</u>");
      }, this);
      atm.addListener("mouseout", function() {
        atm.setLabel(strForgot);
      }, this);
      atm.addListener("click", function() {
        cbk.call(this); //  == this.cbk()
      }, ctx);

      return atm;
    },

    /**
     * Custom button creation
     */
    createButton: function(txt, width, cbk, ctx) {
      var btn = new qx.ui.form.Button(txt);
      btn.set({
        width: width,
        cursor: "pointer"
      });
      btn.addListenerOnce("appear", function() {
        // TODO: set color
      });
      btn.addListener("hover", function() {
        // change button's color
      }, this);
      btn.addListener("mouseout", function() {
        // set original color
      }, this);
      btn.addListener("execute", function(e) {
        cbk.call(this); // <= this.call() in ctx
      }, ctx);

      return btn;
    }
  }
});
