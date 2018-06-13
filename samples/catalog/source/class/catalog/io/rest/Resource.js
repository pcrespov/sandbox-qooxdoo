/**
 * Base class for catalog resources?
 */
qx.Class.define("catalog.io.rest.Resource", {
  extend: qx.io.rest.Resource,

  construct: function(description, accessToken = "") {
    this.base(arguments, description);

    // TODO: first time tx username/password and then token
    //let auth_header = qx.io.request.authentication.Basic(username, password).getAuthHeaders();

    this.configureRequest(function (req) {
      req.setRequestHeader("Accept", "application/json");
      req.setRequestHeader("Authorization", "token " + accessToken);
    });
  }

});
