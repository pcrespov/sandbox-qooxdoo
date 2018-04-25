/* ************************************************************************
   Copyright:

   License:

   Authors:

   TODO: setup a copyright+license scheme
   
************************************************************************ */

/**
 * This is the main application class of your custom application "${Name}"
 *
 * @asset(${NamespacePath}/*)
 * 
 * 
 * See 
 * 
 * http://www.qooxdoo.org/5.0.1/pages/core/classes.html?highlight=events#configuration
 * http://www.qooxdoo.org/5.0.1/pages/core/properties_quickref.html
 * 
 */
qx.Class.define("${Namespace}.MyClass", {
  // type: "abstract", // unset or abstract, static and singleton

  extend: qx.ui.core.Widget,

  implement: [
    qx.ui.form.IForm
  ],

  include: [
    qx.ui.core.MRemoteChildrenHandling,
    qx.ui.form.MForm
  ],

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct: function (arg1, arg2) {
    this.base(arguments, arg1);

  },

  /*
  *****************************************************************************
     STATIC MEMBERS
  *****************************************************************************
  */

  statics: {
    __privateStaticVar: null,
    _protectedStaticVar: null,
    publicStaticVar: null,

    staticFoo: function () {

    }
  },

  /*
  *****************************************************************************
   PROPERTIES
  *****************************************************************************
  */

  properties: {
    focusable: {
      refine: true,
      init: true
    }
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members: {
    __privateVar: null,
    _protectedVar: null,
    publicVar: null,


    foo: function () {

    },
  },

  /*
  *****************************************************************************
     ENVIRONMENT
  *****************************************************************************
  */
  environment: {},

  /*
  *****************************************************************************
   EVENTS
  *****************************************************************************
  */
  events: {

  },

  /*
  *****************************************************************************
  DEFER
  *****************************************************************************
  */
  defer: function () {
    // Function that is called at the end of processing the class declaration. 
     // It allows access to the declared statics, members and properties.
  },

  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
  destruct: function () {

  }
});