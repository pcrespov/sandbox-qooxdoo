qx.Class.define("catalog.dev.fakesrv.db.User", {
  type: "static",

  statics: {
    DUMMYNAMES : ["bizzy", "crespo", "guidon", "tobi", "maiz", "zastrow"],

    CREATEMOCK: function(userId) {
      const uname = catalog.dev.fakesrv.db.User.DUMMYNAMES[userId];
      let user = {
        id: userId,
        username: uname,
        fullname: qx.lang.String.capitalize(uname),
        email: uname + "@itis.ethz.ch",
        avatarUrl: catalog.dev.Utils.getGravatar(uname + "@itis.ethz.ch", 200),
        projects: []
      };

      const pnames = catalog.dev.fakesrv.db.Project.DUMMYNAMES;
      for (var i=0; i<uname.length; i++){
        const pid = i%pnames.length;
        user.projects.push( catalog.dev.fakesrv.db.Project.CREATEMOCK(pid));
      }
      return user;
    },
  }
});