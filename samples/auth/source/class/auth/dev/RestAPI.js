/** Fake rest-API for testing
 *
 *  Hooks to the client and attends its requests emulating the responses of
 *  a server. This is intended only FOR DEVELOPMENT
 *
 * See http://www.qooxdoo.org/5.0.2/pages/communication/fake_server.html
 * See HTTP status codes: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
 */

qx.Class.define("auth.dev.RestAPI", {

  statics: {
    //  Defines responses to HTTP method/request URL pairs
    mockResponses: [
      // GET api/users/123
      {
        method: "GET",
        url: "api/users/{userId}",
        response: [
          200, // OK
          {
            "Content-Type": "application/json"
          },
          qx.lang.Json.stringify({
            userName: "FakeUser"
          })
        ]
      },
      // POST login
      {
        method: "POST",
        url: "login",
        response: [
          200, // OK
          {
            "Content-Type": "application/json"
          },
          qx.lang.Json.stringify(
            {
              userId: "123",
              userToken: "456;alskjdf;alkjsdf;lakjsdf"
            })
        ]
      }
      /*
      // Add more here ...
      {
        method:
        url:
        response: [
          status,
          {headers ... },
          body
        ]
      }
      */
    ]
  },


  defer: function(statics) {
    //  we make sure that the mock backend is ready as soon as the class is loaded

    if (qx.core.Environment.get("auth.mockBackend")) {
      qx.dev.FakeServer.getInstance().configure(statics.mockResponses);
    }
  }

});
