/* eslint no-warning-comments: "off" */
/* eslint no-underscore-dangle: "off" */
/* global auth */
qx.Class.define("auth.dev.Auth", {
  type: "static",

  statics: {
    REMEMBER: false,

    mockData: [{
      method: "POST",
      url: "api/v1.0/login",
      response: function(request) {
        console.log("Received request:", request);

        var login = auth.dev.Auth.__decodeAuthHeader(request.requestHeaders);
        // var login = auth.dev.Auth.__parseLoginParameters(request.requestBody)

        var status;
        var headers = {
          "Content-Type": "application/json"
        };
        var body;

        var DUMMY_EMAIL = "bizzy@itis.ethz.ch";
        var DUMMY_PASS = "z43";
        var DUMMY_USERTOKEN = "eeeaee5e-9b6e-475b-abeb-66a000be8d03";

        var ok = login.email == DUMMY_EMAIL && login.password == DUMMY_PASS;
        if (!ok) {
          ok = login.email == DUMMY_USERTOKEN;
        }

        if (ok) {
          status = 200;
          body = {
            token: DUMMY_USERTOKEN
          };
        } else {
          status = 401; // Unauthorized
          body = {
            error: "Unauthorized access"
          };
        }

        request.respond(status, headers, qx.lang.Json.stringify(body));
      }
    }, {
      method: "GET",
      url: "api/auth",
      response: function(request) {
        var headers = {
          "Content-Type": "application/text"
        };

        var DUMMY_EMAIL = "bizzy@itis.ethz.ch";
        var DUMMY_PASS = "z43";

        var parts = request.url.split("?")[1].split("&");
        var operation = parts[0];
        if (operation == "type=check") {
          request.respond(200, headers, String(auth.dev.Auth.REMEMBER));
        } else if (operation == "type=login") {
          var email = parts[1].split("=")[1];
          var pass = parts[2].split("=")[1];
          auth.dev.Auth.REMEMBER = parts[3].split("=")[1]=="true";

          var ok = DUMMY_EMAIL == email && DUMMY_PASS == pass;    
          request.respond(200, headers, ok? "true": "false");
        }
      }
    }],

    __decodeAuthHeader: function(requestHeaders) {
      var res = {
        email: null,
        password: null
      };
      var header = requestHeaders["Authorization"];

      // Remove 'Basic $value'
      var value = header.split(" ")[1];
      // parse '$username : $password'
      var pair = qx.util.Base64.decode(value).split(":");
      res["email"] = pair[0];
      res["password"] = pair[1];

      return res;
    },

    /**
     * Parse {email:, password:} object extracting
     * parameters from body
     *
    */
    _parseLoginParameters: function(requestBody) {
      var res = {
        email: null,
        password: null
      };

      var vars = requestBody.split("&");
      for (var i = 0; i < vars.length; ++i) {
        var pair = vars[i].split("=");
        res[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
      return res;
    }

  },

  defer: function(mystatics) {
    qx.dev.FakeServer.getInstance().configure(mystatics.mockData);
  }

});
