qx.Class.define('wam.utils.dom', {
    type: 'static',

    statics: {
        getDocWidth: function () {
            //  Check qx.bom.Document
            let body = document.body;
            let html = document.documentElement;
            let docWidth = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
            return docWidth;
        },

        getDocHeight: function () {
            let body = document.body;
            let html = document.documentElement;
            let docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            return docHeight;
        },

    },
});