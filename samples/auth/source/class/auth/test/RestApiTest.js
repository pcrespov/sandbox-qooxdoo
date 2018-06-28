
/**
 *
 */
qx.Class.define("auth.test.RestApiTest",
  {
    extend: qx.dev.unit.TestCase,
    include : qx.dev.unit.MMock,

    members:
    {
      /*
      ---------------------- -----------------------------------------------------
        TESTS
      ---------------------------------------------------------------------------
      */
      tearDown: function() {
        this.getSandbox().restore();
      },

      testSimple2: function() {
        this.assertEquals(4, 3 + 1, "This should never fail!");
        this.assertFalse(false, "Can false be true?!");
      },

      testAdvanced2: function() {
        var a = 3;
        var b = a;
        this.assertIdentical(a, b, "A rose by any other name is still a rose");
        this.assertInRange(3, 1, 10, "You must be kidding, 3 can never be outside [1,10]!");
      },

      testFail2: function() {
        this.assertEquals(3, 3);
      },

      "test: spy this function": function() {
        var obj = {
          mymethod: function() {}
        };
        this.spy(obj, "mymethod");

        // run function to be tested
        //foo(spy);
        //spy();
        obj.mymethod();

        this.assertCalled(obj.mymethod);
      } 

    }
  });
