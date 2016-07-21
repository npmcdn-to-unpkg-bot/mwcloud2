/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/

System.defaultJSExtensions = true;



/** Map relative paths to URLs. */
const map: any = {
   '@angular2-material': 'vendor/@angular2-material',
   '@mw/core': 'core',
   'angular2-toaster': 'vendor/angular2-toaster',
   'ng2-slim-loading-bar': 'vendor/ng2-slim-loading-bar',
   'ng2-pagination': 'vendor/ng2-pagination/dist/ng2-pagination',
   'h5webstorage':'vendor/h5webstorage/index'
};

/** User packages configuration. */
const packages: any = {
  '@mw/core': {
    format: 'cjs',
    defaultExtension: 'js'
  },
  // Set the default extension for the root package, because otherwise the demo-app can't
  // be built within the production mode. Due to missing file extensions.
  '.': {
    defaultExtension: 'js'
  }
};

// put the names of any of your Material components here
const materialPkgs:string[] = [
  'core',
  'button',
  'list',
  'toolbar',
  'card',
  'checkbox',
  'input'
];
materialPkgs.forEach((pkg) => {
  packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`};
});

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/forms',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  /** @cli-barrel */
];

const _cliSystemConfig = {};
barrels.forEach((barrelName: string) => {
  (<any> _cliSystemConfig)[barrelName] = { main: 'index'};
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: _cliSystemConfig
});

// Apply the user's configuration.
System.config({ map, packages });
