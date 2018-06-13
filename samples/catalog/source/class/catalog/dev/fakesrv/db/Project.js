qx.Class.define("catalog.dev.fakesrv.db.Project",{
  type: "static",

  statics: {
    DUMMYNAMES : ['EM', 'FDTD5', 'Neuro1', 'clancy', 'DemoPrj', 'LF Simulation'],

    CREATEMOCK: function (projectId) {
      const name = catalog.dev.fakesrv.db.Project.DUMMYNAMES[projectId]
      let project = {
        id: projectId,
        name: name, 
        thumbnail: "https://imgplaceholder.com/171x96/cccccc/757575/ion-plus-round",
        createDate: Date.now(),
        modifiedDate: Date.now()
      };
      return project;
    },
  }
});