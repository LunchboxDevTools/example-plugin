// all contents of this file will be exectured every time the view
// is (re)loaded
var settings = null;

$(document).ready(function () {
  console.log('loaded page2.js in example-plugin');

  // get the instantiated ExamplePlugin object
  var exampleplugin = window.active_plugin;

  // store view data so we don't lose it between page changes
  if (!exampleplugin.plugin.settings.views.page2) {
    exampleplugin.plugin.settings.views.page2 = {
      dummy_content: ''
    };
  }

  var page2 = exampleplugin.plugin.settings.views.page2;

  // populate the content with anything we may already have
  var test_button_target_2 = $('#test-button-target-2');
  test_button_target_2.html(page2.dummy_content);

  $('#test-button-2').click(function (e) {
    e.preventDefault();

    exampleplugin.runCommand('ls', ['-la', '/'], function (output) {
      page2.dummy_content = output;

      test_button_target_2.html(page2.dummy_content);
    });
  });
});