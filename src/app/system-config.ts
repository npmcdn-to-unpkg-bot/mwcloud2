/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/

System.defaultJSExtensions = true;



/** Map relative paths to URLs. */
const map: any = {
   '@angular2-material': 'vendor/@angular2-material',
   '@mw/core': 'core'
};

/** User packages configuration. */
const packages: any = {
};

// put the names of any of your Material components here
const materialPkgs:string[] = [
  'core',
  'button'
];
materialPkgs.forEach((pkg) => {
  packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`};
});

const mwComponents = [
  'card'
];
mwComponents.forEach(name => map[`@mw/${name}`] = `components/${name}`);


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
  ...mwComponents,
  /** @cli-barrel */
];

const _cliSystemConfig = {};
barrels.forEach((barrelName: string) => {
  (<any> _cliSystemConfig)[barrelName] = { main: 'index' };
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
