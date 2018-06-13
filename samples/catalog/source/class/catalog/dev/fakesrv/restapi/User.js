qx.Class.define("catalog.dev.fakesrv.restapi.User", {
  type: "static",

  statics: {
    mockData: [{
        method: "GET",
        url: "api/v1/user/{id}",
        response: function (request) {
          let status = 200; // OK
          let headers = {
            "Content-Type": "application/json"
          };
          // FIXME: parse id from url request!   
          let data = catalog.dev.fakesrv.db.User.CREATEMOCK(request.getId());
          let body = qx.lang.Json.stringify(data);
          request.respond(status, headers, body);
        }
      },{
        method: "GET",
        url: "api/v1/users/",
        response: function (request) {
          let users = catalog.dev.fakesrv.db.User.DUMMYNAMES;

          let data = [];
          for (let i = 0; i < users.length; i++) {
            data.push({ id: i, username: users[i] });
          }
          request.respond(200,
            { "Content-Type": "application/json" },
            qx.lang.Json.stringify(data));
        }
      }]
  },

  defer: function (mystatics) {
    //if (qx.core.Environment.get("dev.enableFakeServer")) {
    console.debug("Fake server REST API enabled");
    qx.dev.FakeServer.getInstance().configure(mystatics.mockData);
    //}
  }

});
