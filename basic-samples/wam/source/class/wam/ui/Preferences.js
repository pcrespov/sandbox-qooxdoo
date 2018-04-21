qx.Class.define("wam.ui.Preferences", {
    extend: qx.ui.window.Window,

    construct: function () {
        this.base(arguments, this.tr("Account Settings"));

        // window
        this.set({
            modal:true,
            width: 500,
            height: 600,
        });
        this.setLayout(new qx.ui.layout.VBox());


        var tabView = new qx.ui.tabview.TabView().set({
            barPosition: 'left'
        });
        tabView.add(this.getGeneral());
        tabView.add(this.getGeneral());        
        // security
        // notifications
        // display
        // advanced

        this.add(tabView, {flex:1});
    },


    members:
    {
        _data : null,

        getGeneral: function()
        {
            let page = new qx.ui.tabview.Page("General");
            page.setLayout(new qx.ui.layout.VBox(4));
            
            //title
            page.add(new qx.ui.basic.Label("<h3>General Settings</h3>").set({
                rich: true
            }));

            page.add(new qx.ui.core.Spacer(null, 10)); // TODO add decorator?

            // content
            let username = new qx.ui.form.TextField();
            username.set({
                placeholder: "User Name"
            })
            page.add(username);

            let fullname = new qx.ui.form.TextField();
            fullname.set({
                placeholder: "Full Name"
            })

            page.add(fullname);

            let email = new qx.ui.form.TextField();
            email.set({
                placeholder: "Email",
            })
            page.add(email);

            
            const url = wam.utils.placeholders.getIcon("fa-user", 200);
            let picture = new qx.ui.basic.Image(url);
            page.add(picture);            

            return page;
        }
    }

});