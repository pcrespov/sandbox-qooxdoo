qx.Class.define("drest.dev.fakesrv.rest.Gist", {
  type: "static",

  statics: {
    mockData: [{
      method: "GET",
      url: "/gists/{id}",
      response: function(request) {
        let status = 200; // OK
        let headers = {
          "Content-Type": "application/json"
        };
        let body = qx.lang.Json.stringify({
          description: "This is a fake response for user " + request.url,
          owner: {
            "login": "bizzy",
            "avatar_url": drest.Utils.getGravatar("bizzy@itis.ethz.ch")
          },
          files: {
            "Bar": {
              "filename": "Bar",
              "type": "text/plain",
              "language": null,
              "raw_url": "https://gist.githubusercontent.com/pcrespov/f011c5d496ec1623d44f78427140061f/raw/a76000e2d203022e0cdb07161aea207fb41f586b/Bar",
              "size": 18
            },
            "Foo": {
              "filename": "Foo",
              "type": "text/plain",
              "language": null,
              "raw_url": "https://gist.githubusercontent.com/pcrespov/f011c5d496ec1623d44f78427140061f/raw/61a9fe3c3eb211f53e88c8d16bb9d3e446a19605/Foo",
              "size": 18
            }
          }
        });

        request.respond(status, headers, body);
      }
    }]
  },

  defer: function(mystatics) {
    if (qx.core.Environment.get("dev.enableFakeServer")) {
      console.debug("Fake server on /gist/{id}");
      qx.dev.FakeServer.getInstance().configure(mystatics.mockData);
    }
  }

});
