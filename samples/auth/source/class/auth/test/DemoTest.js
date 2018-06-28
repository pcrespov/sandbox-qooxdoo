
/**
 *
 */
qx.Class.define("auth.test.DemoTest",
  {
    extend: qx.dev.unit.TestCase,

    members:
    {
      /*
      ---------------------- -----------------------------------------------------
        TESTS
      ---------------------------------------------------------------------------
      */

      testSimple: function () {
        this.assertEquals(4, 3 + 1, "This should never fail!");
        this.assertFalse(false, "Can false be true?!");
      },

      testAdvanced: function () {
        var a = 3;
        var b = a;
        this.assertIdentical(a, b, "A rose by any other name is still a rose");
        this.assertInRange(3, 1, 10, "You must be kidding, 3 can never be outside [1,10]!");
      },

      testEncDecoding: function () {
        var got = qx.util.Base64.decode(qx.util.Base64.encode("foo:bar")).split(":");
        this.assertIdentical(got[0], "foo");
        this.assertIdentical(got[1], "bar");

        got = qx.util.Base64.decode(qx.util.Base64.encode("foo:")).split(":");
        this.assertIdentical(got[0], "foo");
        this.assertIdentical(got[1], "");

        got = qx.util.Base64.decode(qx.util.Base64.encode("foo:" + null)).split(":");
        this.assertIdentical(got[0], "foo");
        this.assertIdentical(got[1], "null");
      },

      testFail: function () {
        this.assertEquals(3, 3);
      },


      testBackendRequest: function () {
        this.require(["backend"]);
        // test code goes here
      }
    }
  });
