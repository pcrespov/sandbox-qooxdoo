/* ************************************************************************

   Copyright: 2018 

   License: MIT license

   Authors: 

************************************************************************ */

qx.Theme.define('tweets.theme.Appearance', {
  extend: qx.theme.simple.Appearance,

  appearances: {
    'tweet-view': {},
    'toolbar': {
      style: function() {
        return {
          backgroundColor: 'window-border-inner'
        }
      }
    }
  }
});