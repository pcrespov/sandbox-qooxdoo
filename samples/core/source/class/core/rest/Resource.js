/**
 * Class created to set basic configuration for all rest resources
 * 
 * See also https://www.qooxdoo.org/5.0.1/pages/communication/rest.html
 */
qx.Class.define("core.rest.Resource",{
  extend: qx.io.rest.Resource,

  construct: function(description){
    this.base(arguments, description)

    // configures requests

    this.configureRequest(function(req){
      req.setRequestHeader("Content-Type", "application/json");
    });

    // this.setBaseUrl();
  }

});
