
/**
 *
 */
qx.Class.define("auth.test.DemoTest",
  {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MRequirements, qx.dev.unit.MMock],

    members:
    {
      setUp: function () {
        console.debug("Setting up .. ");
        this.debug("Setting up ...");
      },

      tearDown: function () {
        console.debug("Tear down .. ");
        this.debug("Tear down ...");
        this.getSandbox().restore();
      },

      /*
      ---------------------- -----------------------------------------------------
        TESTS  qx.dev.unit.TestCase assert functions
      ---------------------------------------------------------------------------
      */

      testAdvanced: function () {
        var a = 3;
        var b = a;
        this.assertIdentical(a, b, "A rose by any other name is still a rose");
        this.assertInRange(3, 1, 10, "You must be kidding, 3 can never be outside [1,10]!");
      },

      testFail: function () {
        this.assertEquals(3, 88);
      },

      /*
      ---------------------- -----------------------------------------------------
        TESTS  with fakes. See qx.dev.unit.MMock
      ---------------------------------------------------------------------------
      */

      "test: spy this function": function () {
        var obj = {
          mymethod: function () { }
        };
        this.spy(obj, "mymethod");

        // run function to be tested
        //foo(spy);
        //spy();
        obj.mymethod();

        this.assertCalled(obj.mymethod);
      },


      /*
      ---------------------- -----------------------------------------------------
        TESTS  with requirements. See qqx.dev.unit.MRequirements
      ---------------------------------------------------------------------------
      */

      testWithRequirements: function () {
        this.require(["qx.debug"]);
        // test code goes here
        this.debug("This is running in debug");
        qx.log.Logger.debug("This is running");
      },

      testWithUI: function () {
        console.debug("Requirement helpers:", this.hasChrome(), this.hasGuiApp());

        this.require(["chrome", "guiApp"]);
        this.debug("this is running");
      }
    }
  });
