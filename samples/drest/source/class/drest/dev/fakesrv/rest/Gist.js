qx.Class.define("drest.dev.fakesrv.rest.Gist", {
  type: "static",

  statics: {
    mockData: [{
      method: "GET",
      url: "/gist/{id}",
      response: function(request) {
        let status = 200; // OK
        let headers = {
          "Content-Type": "application/json"
        };
        let body = qx.lang.Json.stringify({
          description: "This is a fake response for user " + request.url,
          user: {
            login: "bizzy",
            avatarUrl: drest.Utils.getGravatar("bizzy@itis.ethz.ch")
          },
          files: ["<html><h1>Hoi zaeme</h1></html>", "<html><h1>Hi there</h1></html>"]
        });

        request.respond(status, headers, body);
      }
    }]
  },

  defer: function(mystatics) {
    if (qx.core.Environment.get("dev.enableFakeServer")) {
      qx.dev.FakeServer.getInstance().configure(mystatics.mockData);
    }
  }

});
