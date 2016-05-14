// all contents of this file will be exectured every time the view
// is (re)loaded
var settings = null;

$(document).ready(function () {
  console.log('loaded page2.js in example-plugin');

  // get the instantiated ExamplePlugin object
  var exampleplugin = window.active_plugin;
  window.lunchbox;

  console.log(exampleplugin);

  $('#test-button-2').click(function (e) {
    e.preventDefault();

    exampleplugin.runCommand('ls', ['-la'], function (output) {
      $('#test-button-target-2').html(output);
    });
  });
});