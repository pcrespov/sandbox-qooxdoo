/**
 * TODO: implement validators? 
 * 
 */
qx.Class.define("dbind.data.User", {
  extend: qx.core.Object,

  properties: {
    // TODO: create id upon creation?
    id: {
      check: "String",
      nullable: true
    }, 
    userName: {
      check: "String",
      nullable: true
    },
    fullName: {
      check: "String",
      nullable: true
    },
    email: {
      check: "String",
      nullable: true
    },
    roleId: {
      check: "Integer",
      nullable: true
    },
    about: {
      check: "String",
      nullable: true
    }
  },

  members: {
    toString: function () {
      return self.getfullName() + " [@" + self.getUserName() + "]"
    }
  }
});