qx.Class.define("dbind.data.Fake", {
  type: 'static',

  statics: {

    createProjectDescriptors: function (count = 3) {
      let rawData = [];
      rawData.push(qx.data.marshal.Json.createModel({
        name: "New Project",
        description: "Empty",
        thumbnail: "https://imgplaceholder.com/171x96/cccccc/757575/ion-plus-round",
        created: null
      }));

      for (var i = 0; i < 5; i++) {
        var item = qx.data.marshal.Json.createModel({
          name: "Project #" + (i + 1),
          description: "This is a very short description " + (i + 1),
          thumbnail: null,
          created: null
        });
        rawData.push(item);
      }

      return rawData;
    }

  } // statics

});