qx.Class.define("wam.ui.ContentPage", {
    extend: qx.ui.container.Composite,

    construct: function () {
        this.base(arguments, new qx.ui.layout.VBox(0));

        this.buildLayout();

        // Connect actions
        this.__userBtn.addListener("execute", function(){
            if (!this.__preferencesWin)
            {
                this.__preferencesWin = new wam.ui.Preferences();
                this.__preferencesWin.moveTo(0,0); // TODO: center
            }
            this.__preferencesWin.open();
        }, this)

    },

    members: {
        __preferencesWin: null, 
        __userBtn: null,        

        buildLayout: function()
        {
            let topBar = new qx.ui.container.Composite(new qx.ui.layout.HBox());
            this.buildTopLayout(topBar);
            this.add(topBar);
            
            // Project content: New project, templates, and recent ...
            this.add(new qx.ui.core.Widget().set({
                backgroundColor: "green"
            }), { flex: 1 });
        },

        buildTopLayout: function(topBar)
        {
            topBar.set({
                backgroundColor: "orange",
                height: 70,
                paddingLeft: 10,
                paddingRight: 10,
            });
            topBar.getLayout().set({
                spacing: 10,
                alignY: "middle",
            });

            // $(width)x$(height)/$(background)/$(fontcolor)/            
            const iconUrl = wam.utils.placeholders.getIcon("fa-align-justify", 32);
            const btnSettings = {
                allowGrowY: false,
                minWidth: 32,
                minHeight: 32,
            }

            // let menuBtn = new qx.ui.form.Button(null, iconUrl)
            // menuBtn.set(btnSettings);
            // topBar.add(menuBtn);

            let titleAtm = new qx.ui.basic.Atom(" simcore logo ");
            topBar.add(titleAtm);

            let searchTxt = new qx.ui.form.TextField().set({
                placeholder: "Search"
            });

            topBar.add(searchTxt, {
                flex: 2
            });

            topBar.add(new qx.ui.core.Spacer(1), {
                flex: 1
            });

            let userBtn = this.__userBtn = new qx.ui.form.Button(null, iconUrl);
            userBtn.set(btnSettings);
            topBar.add(userBtn);
        }
        
    } // members

});