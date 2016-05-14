// all contents of this file will be exectured every time the view
// is (re)loaded
var settings = null;

$(document).ready(function () {
  console.log('loaded page1.js in example-plugin');

  // get the instantiated ExamplePlugin object
  var exampleplugin = window.active_plugin;
  // have a look at this object to see that it contains all data that we
  // assigned in main.js

  // core lunchbox settings; contains some paths that may be useful
  // to the plugin; don't modify the object
  window.lunchbox;

  $('#test-button').click(function (e) {
    e.preventDefault();

    $('#test-button-target').append('You pressed the Test Button.<br />');

    var global_header = $('#' + exampleplugin.gn_name);
    global_header.css('display', 'block');
    global_header.append('Test ');
  });
});