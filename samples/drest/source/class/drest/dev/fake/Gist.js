qx.Class.define('drest.dev.fake.Gist', {
  type: 'static',

  statics: {
    mockData: [{
      method: 'GET',
      url: '/gist/{id}',
      response: [
        200, // OK
        {
          'Content-Type': 'application/json'
        },
        qx.lang.Json.stringify({
          description: 'This is a fake response for user',
          user: {
            login: 'bizzy',
            avatar_url: drest.Utils.getGravatar('bizzy@itis.ethz.ch')
          },
          files: ['<html><h1>Hoi zaeme</h1></html>', '<html><h1>Hi there</h1></html>']
        })
      ]
    }]
  },

  defer: function (mystatics) {
    qx.dev.FakeServer.getInstance().configure(mystatics.mockData);
  }

});