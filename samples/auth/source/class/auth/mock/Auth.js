/* eslint no-warning-comments: "off" */
qx.Class.define("auth.mock.Auth", {
  type: "static",

  statics: {
    mockData: [{
      method: "POST",
      url: "api/v1.0/login",
      response: function (request) {
        let status = 401; // Unauthorized
        let headers = {
          "Content-Type": "application/json"
        };
        let body = { error: "Unauthorized access" };

        
        // parse login parameters
        let login = {email: null, password: null}
        let vars = request.requestBody.split('&');        
        for (let i = 0; i < vars.length; ++i) {
          let pair = vars[i].split('=');                    
          login[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }

        console.log("Received request:", request)

        // 
        //const login = qx.lang.Json.parse(request.requestBody);
        // TODO: validate json!

        // if login.user exists:
        //  if verified:
        //    if valid login.password:
        //      if suceeds:
        //        return token

        const DUMMY_EMAIL = "bizzy@itis.ethz.ch";
        const DUMMY_PASS = "z43";

        if (login.email == DUMMY_EMAIL && login.password == DUMMY_PASS) {
          status = 200;
          const DUMMY_USERID = 1;
          const DUMMY_USERTOKEN = "eeeaee5e-9b6e-475b-abeb-66a000be8d03";  
          body = { userId: DUMMY_USERID, token: DUMMY_USERTOKEN }
        }

        request.respond(status, headers, qx.lang.Json.stringify(body));
      }
    }]
  },

  defer: function (mystatics) {
    qx.dev.FakeServer.getInstance().configure(mystatics.mockData);
  }

});
