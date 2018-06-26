/* eslint no-warning-comments: "off" */
qx.Class.define("auth.mock.Auth", {
  type: "static",

  statics: {

    mockData: [{
      method: "POST",
      url: "api/v1.0/login",
      response: function (request) {
        console.log("Received request:", request)

        const login = auth.mock.Auth._decodeAuthHeader(request.requestHeaders)
        // const login = auth.mock.Auth._parseLoginParameters(request.requestBody)

        let status;
        let headers = {
          "Content-Type": "application/json"
        };
        let body;

        const DUMMY_EMAIL = "bizzy@itis.ethz.ch";
        const DUMMY_PASS = "z43";
        const DUMMY_USERTOKEN = "eeeaee5e-9b6e-475b-abeb-66a000be8d03";

        let ok = login.email == DUMMY_EMAIL && login.password == DUMMY_PASS;
        if (!ok) {
          ok = login.email == DUMMY_USERTOKEN;
        }

        if (ok) {
          status = 200;
          body = { token: DUMMY_USERTOKEN }
        }
        else {
          status = 401; // Unauthorized
          body = { error: "Unauthorized access" };
        }

        request.respond(status, headers, qx.lang.Json.stringify(body));
      }
    }],

    _decodeAuthHeader: function (requestHeaders) {
      let res = { email: null, password: null };
      let header = requestHeaders["Authorization"]

      // Remove 'Basic $value'
      let value = header.split(" ")[1]
      // parse '$username : $password'
      let pair = qx.util.Base64.decode(value).split(":")
      res['email'] = pair[0]; res['password'] = pair[1];

      return res;
    },

    /**
     * Parse {email:, password:} object extracting 
     * parameters from body
     * 
    */
    _parseLoginParameters: function (requestBody) {
      let res = { email: null, password: null }

      let vars = requestBody.split('&');
      for (let i = 0; i < vars.length; ++i) {
        let pair = vars[i].split('=');
        res[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
      return res;
    }

  },

  defer: function (mystatics) {
    qx.dev.FakeServer.getInstance().configure(mystatics.mockData);
  }

});
