/* ************************************************************************

   Copyright: 2018 undefined

   License: MIT license

   Authors: undefined

************************************************************************ */

/**
 * This is the main application class of "core"
 *
 * @asset(core/*)
 */
qx.Class.define("core.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    __usersResource : null,
    __userResource: null,
    __userStore: null,
    __usersStore: null,
    // views
    __list: null,
    __userDetail: null,

    main : function()
    {
      this.base(arguments);

      if (qx.core.Environment.get("qx.debug"))
      {
      }

      this._setUpResources();
      this._setUpStores();
      this._createUI();
      this._setUpBinding();


      // Note the action is invoked on the resource, not the store.
      // self._usersResource.get();
    },

    _setUpResources: function(){
      this.__userResource = new core.rest.Resource({
        get: {
          method: "GET",
          url: "api/v1/users/{id}",
          check: {
            id: /\d+/
          }
        },

        put: {
          method: "PUT",
          url: "api/v1/users/{id}",
          check: {
            id: /\d+/
          }
        },

        del: {
          method: "DELETE",
          url: "api/v1/users/{id}",
          check: {
            id: /\d+/
          }
        }
      });

      this.__usersResource = new core.rest.Resource({
        get: {
          method: "GET",
          url: "api/v1/users/"
        },

        post: {
          method: "POST",
          url: " api/v1/users/"
        }
      });
    },

    _setUpStores: function(){

      /* Attaches a particular rest action to store

        Handles response associated to a resource’ s action.
        The model property is populated with the marshaled response.
        Note the action is invoked on the resource, not the store.
      */
      this.__userStore = new qx.data.store.Rest(self.__userResource, "get");
      this.__usersStore = new qx.data.store.Rest(self.__usersResource, "get");
    },

    _createUI: function(){

      let container = new qx.ui.container.Composite(new qx.ui.layout.Dock());
      container.setPadding(10);

      let label = new qx.ui.basic.Label("Users");
      //label.setFont("bold");
      //label.setPaddingBottom(10);
      container.add(label, {
        edge: "north"
      });
      
      let list = this.__list = new qx.ui.list.List();
      list.setWidth(200);
      container.add(list, {
        edge: "west"
      });

      let detail = this.__userDetail = new core.ui.UserView();
      container.add(detail, {
        edge: "center"
      });


      this.getRoot().add(container, {edge: 0});
    },

    _setUpBinding: function (){

    },

  }
});