qx.Class.define('wam.utils.placeholders', {
    type: 'static',

    statics: {

        getIcon: function (iconId, width, height = null) {
            // see https://imgplaceholder.com/
            height = (height === null) ? width : height;

            const prefix = "https://imgplaceholder.com/";
            const shape = width + "x" + height;
            const url = prefix + shape + "/transparent/757575/" + iconId;

            // e.g. // https://imgplaceholder.com/128x128/transparent/757575/fa-user         
            return url;
        },

        getImage: function (width, height = null) {
            // see https://placeholder.com/

            height = (height === null) ? width : height;
            const url = "http://via.placeholder.com/" + width + "x" + height;
            
            // e.g. http://via.placeholder.com/350x150
            return url;
        }

        
        // TODO: getAvatar: function (avatarId)
    },
});