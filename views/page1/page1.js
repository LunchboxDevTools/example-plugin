// all contents of this file will be exectured every time the view
// is (re)loaded
var settings = null;

$(document).ready(function () {
  console.log('loaded page1.js in example-plugin');

  // get the instantiated ExamplePlugin object
  var exampleplugin = window.active_plugin;
  // have a look at this object to see that it contains all data that we
  // assigned in main.js

  // store view data so we don't lose it between page changes
  if (!exampleplugin.plugin.settings.views.page1) {
    exampleplugin.plugin.settings.views.page1 = {
      dummy_content: ''
    };
  }

  var page1 = exampleplugin.plugin.settings.views.page1;

  // populate the content with anything we may have already saved
  var test_button_target = $('#test-button-target');
  test_button_target.html(page1.dummy_content);

  // core lunchbox settings; contains some paths that may be useful
  // to the plugin; don't modify the object
  window.lunchbox;

  // append more data on click
  $('#test-button').click(function (e) {
    e.preventDefault();

    // add more text to the existing content, then show the result
    page1.dummy_content += 'You pressed the Test Button.<br />';

    test_button_target.html(page1.dummy_content);

    var global_header = $('#' + exampleplugin.gn_name);
    global_header.css('display', 'block');
    global_header.append('Test ');
  });
});