qx.Class.define("wam.ui.ContentPage", {
    extend: qx.ui.container.Composite,

    construct: function () {
        this.base(arguments, new qx.ui.layout.VBox(0));

        this.buildLayout();
    },

    members: {
        __preferencesWin: null,


        buildLayout: function () {
            let topBar = new qx.ui.container.Composite(new qx.ui.layout.HBox());
            this.buildTopLayout(topBar);
            this.add(topBar);

            // Content Pane: New project, templates, and recent ...
            this.add(new qx.ui.core.Widget().set({
                backgroundColor: "#00264d"
            }), {
                flex: 1
            });
        },

        buildTopLayout: function (topBar) {
            topBar.set({
                height: 70,
                paddingLeft: 10,
                paddingRight: 10,
            });
            topBar.getLayout().set({
                spacing: 10,
                alignY: "middle",
            });

            // $(width)x$(height)/$(background)/$(fontcolor)/            
            // const iconUrl = wam.utils.placeholders.getIcon("fa-align-justify", 24);
            const btnSettings = {
                allowGrowY: false,
                minWidth: 32,
                minHeight: 32,
            }

            // let menuBtn = new qx.ui.form.Button(null, iconUrl)
            // menuBtn.set(btnSettings);
            // topBar.add(menuBtn);

            let logo = new lib.ui.image.Image("wam/osparc.png").set({
                maxWidth: 70
            });
            topBar.add(logo);

            let titleAtm = new qx.ui.basic.Atom("<h2>simcore</h2>").set({
                rich: true
            });
            topBar.add(titleAtm);

            let searchTxt = new qx.ui.form.TextField().set({
                placeholder: "Search"
            });

            topBar.add(searchTxt, {
                flex: 2
            });

            topBar.add(new qx.ui.core.Spacer(5), {
                flex: 1
            });


            let userLbl = new qx.ui.basic.Label("@bizzi").set({
                minWidth: 20,
            });
            topBar.add(userLbl);

            let menuBtn = this.__createUserBtn()
            menuBtn.setIcon(wam.utils.placeholders.getGravatar("bizzi@simcore.io", 32));
            menuBtn.set(btnSettings);
            topBar.add(menuBtn);
        },

        __createUserBtn: function (iconUrl) {
            var menu = new qx.ui.menu.Menu();

            // Account Settings
            // ---
            // Groups
            // ---
            // Help
            // Report a Problem
            // About 
            // ---
            // Logout

            // TODO: add commands (i.e. short-cut system)
            let preferences = new qx.ui.menu.Button("Account Settings");
            preferences.addListener("execute", this.__onOpenAccountSettings);

            menu.add(preferences);
            menu.addSeparator();
            menu.add(new qx.ui.menu.Button("Groups"));
            menu.addSeparator();
            menu.add(new qx.ui.menu.Button("Help"));
            menu.add(new qx.ui.menu.Button("Report a Problem"));
            menu.add(new qx.ui.menu.Button("About"));
            menu.addSeparator();
            menu.add(new qx.ui.menu.Button("Logout"));

            var button = new qx.ui.form.MenuButton(null, null, menu);
            return button;
        },

        __onOpenAccountSettings: function () {
            if (!this.__preferencesWin) {
                this.__preferencesWin = new wam.ui.window.Preferences();
            }
            this.__preferencesWin.open();

            let win = this.__preferencesWin;
            const [left, top] = wam.utils.dom.getCenteredLoc(win.getWidth(), win.getHeight());
            win.moveTo(left, top);
        }
    } // members

});