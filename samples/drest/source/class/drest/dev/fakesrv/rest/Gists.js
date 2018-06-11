/**
 * http://www.qooxdoo.org/current/pages/communication/fake_server.html
 */
qx.Class.define("drest.dev.fakesrv.rest.Gists", {
  type: "static",

  statics: {
    mockData: [{
      method: "GET",
      url: "/gists/",
      response: [
        200, // OK
        {
          "Content-Type": "application/json"
        },
        qx.lang.Json.stringify([{
          id: 1
        }, {
          id: 2
        }, {
          id: 3
        }, {
          id: 4
        }
        ])
      ]
    }]
  },

  defer: function(mystatics) {
    if (qx.core.Environment.get("dev.enableFakeServer")) {
      qx.dev.FakeServer.getInstance().configure(mystatics.mockData);
    }
  }

});
