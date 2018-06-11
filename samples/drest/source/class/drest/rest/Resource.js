/**
 * A GitHub REST API resource
 */
qx.Class.define("drest.rest.Resource", {
  extend: qx.io.rest.Resource,

  /**
   * @ignore(GITHUB.*)
   */
  construct: function (description) {
    this.base(arguments, description);

    this.configureRequest(function (req) {
      req.setRequestHeader("Accept", "application/json");
      // req.setRequestHeader("Authorization", "token " + GITHUB.access_token);
    });

    // this.setBaseUrl("https://api.github.com");
  }
});
