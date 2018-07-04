/**
 * http://www.qooxdoo.org/current/pages/communication/fake_server.html
 */
qx.Class.define("drest.dev.fakesrv.rest.Gists", {
  type: "static",

  statics: {
    mockData: [{
      method: "GET",
      url: "/gists_all", // FIXME:cannot be called /gists while having /gists/{id}!
      response: [
        200, // OK
        {
          "Content-Type": "application/json"
        },
        qx.lang.Json.stringify([{
          id: "1",
          description: "Demo1"
        }, {
          id: "2",
          description: "Demo2"
        }, {
          id: "3",
          description: "Demo3"
        }, {
          id: "4",
          description: "Demo4"
        }
        ])
      ]
    }]
  },

  defer: function(mystatics) {
    if (qx.core.Environment.get("dev.enableFakeServer")) {
      console.debug("Fake server on /gists");
      qx.dev.FakeServer.getInstance().configure(mystatics.mockData);
    }
  }

});
