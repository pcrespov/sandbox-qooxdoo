/**
 * A GitHub REST API resource
 *
 */
/* global GITHUB */
qx.Class.define("drest.rest.Resource", {
  extend: qx.io.rest.Resource,

  /**
   * @ignore(GITHUB.*)
   */
  construct: function(description) {
    this.base(arguments, description);

    if (qx.core.Environment.get("dev.enableFakeServer")) {
      this.configureRequest(function(req) {
        req.setRequestHeader("Accept", "application/json");
      });
    } else {
      this.configureRequest(function(req) {
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Authorization", "token " + GITHUB.accessToken);
      });
      this.setBaseUrl("https://api.github.com");
    }
  }
});
