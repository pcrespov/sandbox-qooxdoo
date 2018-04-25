/***
 *  
 * See http://www.qooxdoo.org/5.0.2/pages/communication/fake_server.html
*/
qx.Class.define("auth.mock.User", {

  statics: {
    mockData: [
      // GET /api/users/123
      {
        method: "GET",
        url: "api/users/{userId}",
        response: [
          200,
          {
            "Content-Type": "application/json"
          },
          qx.lang.Json.stringify({
            userName: 'FakeUser'
          })
        ]
      },
      // POST /login
      {
        method: "POST",
        url: "login",
        response: [
          200,
          {
            "Content-Type": "application/json"
          },
          qx.lang.Json.stringify({
            userId: '123',
            userToken: '456'
          })
        ]
      }
      
      // Add more here ...
    ]
  },


  defer: function (statics) {
    //  we make sure that the mock backend is ready as soon as the class is loaded
    qx.dev.FakeServer.getInstance().configure(statics.mockData);
  }

});