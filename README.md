Example Plugin for Lunchbox
====

Lunchbox stores its configuration in a 'settings.json' file, located in the user data settings. The path to this file will vary depending on your operating system. On OSX this will usually be `/Users/your_user/Library/Application Support/Lunchbox/settings.json`. This settings file includes information about available plugins, and will be written to when adding a plugin through Lunchbox's UI.


Every plugin implementation starts at the `main.js` file. If a plugin that does not contain this file is added to Lunchbox, the boot scripts will fail validation and error out with `Malformed plugin: [Plugin Name]. Missing main.js.`

The main.js file should export a class that extends the core `LunchboxPlugin` class.

