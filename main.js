// load required modules
var Q = require('q');

/**
 * Constructor.
 * 
 * @param {[type]} plugin [description]
 * @param {[type]} dialog [description]
 */
var ExamplePlugin = function (plugin, dialog) {
  /**
   * The `plugin` parameter will contain an object of this plugin's data
   * from Lunchbox's main settings.json file, including the following
   * properties: enabled, git, name, name_nice, path
   */

  // we can optionally use this to save plugin data
  if (typeof plugin.settings == 'undefined') {
    plugin.settings = {
      views: {}
    };
  }

  // call parent constructor
  LunchboxPlugin.call(this, plugin, dialog);

  // load CSS dependencies
  this.addCSS('css/example-plugin.css');

  // global notices/header wrapper dom name
  this.gn_name = 'global-notices-' + this.getUniqueName();

  var global_notices = $('#global-notices');
  if (global_notices.length) {
    global_notices.append('<div id="' + this.gn_name + '" class="alert alert-info" role="alert" style="display: none;"></div>');
  }

  // set up promises for later use
  this.loadedConfig = Q.defer();

  // dummy examples
  this.constructor_property_1 = 'foo';
};

// make sure these lines come immediately after the constructor above,
// otherwise they may overwrite the class implementation
ExamplePlugin.prototype = Object.create(LunchboxPlugin.prototype);
ExamplePlugin.prototype.constructor = ExamplePlugin;

/**
 * OPTIONAL: 
 *   Provide an array of boot tasks.
 *
 * @return {Array} Each element should be a promie that gets resolved 
 * when the task is complete.
 */
ExamplePlugin.prototype.getBootOps = function () {
  var loadConfigFile = function (dialog) {
    this.logDialog('Loading example config.');

    return this.loadConfig();
  };

  // array of promises
  var operations = [
    loadConfigFile
  ];

  return operations;
};

/**
 * Load a custom configuration file.
 * 
 * @return {[type]} [description]
 */
ExamplePlugin.prototype.loadConfig = function () {
  var self = this;

  self.config = new GenericSettings(self.plugin.path + '/config.yml');

  // GenericSetting's async load() method will load the data and execute 
  // the callback when finished
  self.config.load(function (error, data) {
    // we've got an error; reject the promise
    if (error !== null) {
      self.loadedConfig.reject(error);
      return;
    }

    // all good; resolve the promise
    self.loadedConfig.resolve();
  });

  // we created the loadedConfig promise via the Q library in the constructor
  return this.loadedConfig.promise;
};

/**
 * OPTIONAL:
 *   Provide an array of main menu items.
 * 
 * @return {[type]} [description]
 */
ExamplePlugin.prototype.getNav = function () {
  var nav = {
    // optional menu title; can include HTML
    title: 'Example Plugin',
    items: [
      {
        href: 'views/page1/page1.html', // relative path to body content
        name: 'page1', // unique string identifying this view
        text: 'Page 1' // can include HTML
      },
      {
        href: 'views/page2/page2.html', // relative path to body content
        name: 'page2', // unique string identifying this view
        text: 'Page 2' // can include HTML
      }
    ],
  };

  return nav;
};

ExamplePlugin.prototype.runCommand = function (command, args, callback) {
  callback = callback || function () {};

  var run = Q.defer();

  var spawn = require('child_process').spawn;
  var child = spawn(command, args);

  // save buffer output
  var stdout = '';
  var write = function (buffer) {
    stdout += buffer.toString('utf8');
  };

  child.stdout.on('data', write);
  child.stderr.on('data', write);

  var self = this;
  child.on('exit', function (exitCode) {
    if (exitCode !== 0) {
      run.reject('Got exit code: ' + exitCode);
      return;
    }
  });

  child.on('close', function () {
    run.resolve(stdout);
  });

  run.promise.then(function (output) {
    callback(output);
  });
};

module.exports = ExamplePlugin;