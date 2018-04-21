qx.Class.define("wam.ui.ContentPage", {
    extend: qx.ui.container.Composite,

    construct: function () {
        this.base(arguments, new qx.ui.layout.VBox(0));


        let toolbar = new qx.ui.container.Composite(new qx.ui.layout.HBox()); {
            toolbar.set({
                backgroundColor: "orange",
                height: 70,
                paddingLeft: 10,
                paddingRight: 10,
            });
            toolbar.getLayout().set({
                spacing: 10,
                alignY: "middle",
            });

            // $(width)x$(height)/$(background)/$(fontcolor)/
            const urlPrefix = "https://imgplaceholder.com/32x32/transparent/757575/";
            const btnSettings = {
                allowGrowY: false,
                minWidth: 32,
                minHeight: 32,
            }
            
            let menuBtn = new qx.ui.form.Button(null, urlPrefix + "fa-align-justify")
            menuBtn.set(btnSettings);
            toolbar.add(menuBtn);

            let titleAtm = new qx.ui.basic.Atom(" simcore logo ");
            toolbar.add(titleAtm);


            let searchTxt = new qx.ui.form.TextField().set({
                placeholder: "Search"
            });

            toolbar.add(searchTxt, {
                flex: 1
            });

            toolbar.add(new qx.ui.core.Spacer(1), {
                flex: 2
            });
            
            let userBtn = new qx.ui.form.Button(null, urlPrefix + "glyphicon-user");
            userBtn.set(btnSettings);
            toolbar.add(userBtn);
        }

        this.add(toolbar);

        this.add(new qx.ui.core.Widget().set({
            backgroundColor: "green"
        }), {
            flex: 1
        });
    },

    members: {

    }

});