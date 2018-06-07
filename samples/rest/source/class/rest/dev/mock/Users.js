/**
 * TODO: response status enums
 * 
 */

qx.Class.define('rest.dev.mock.Users', {
  statics: {
    mockResponses: [
      {
        method: 'GET',
        url: 'api/v1/users/{id}',
        response: [
          200,  // OK
          {'Content-Type': 'application/json'},
          qx.lang.Json.stringify([{id: 'FakeUser1'}, {id: 'FakeUser2'}])
        ]
      },
      {
        method: 'POST',
        url: 'api/v1/users/',
        response: function(request) {
          // Create new user given username and password
          // Return id
          var user = qx.lang.Json.parse(request.json);
          // user.username
          // user.password

          let status = 201; // Resource was created
          let headers = { "Content-Type": "application/json" };
          let responseData = {
            userId: 123
          };
          let body = qx.lang.Json.stringify(responseData);
          
          request.respond(status, headers, body);
        }
      }
    ]
  },

  defer: function(statics) {
    qx.dev.FakeServer.getInstance().configure(statics.mockResponses);
  }
});