/* global require, module */

'use strict';
const fs = require('fs');
const path = require('path');

// Import the require hook. Enables us to require TS files natively.
require('ts-node/register');

const Angular2App = require('angular-cli/lib/broccoli/angular2-app');
const Funnel = require('broccoli-funnel');
const MergeTree = require('broccoli-merge-trees');
const autoPrefixerTree = require('broccoli-autoprefixer');


module.exports = function(defaults) {
  // The Angular Application tree.
  const appTree = _buildAppTree(defaults);

  // The CSS tree that is auto prefixed with browser support.
  const cssAutoprefixed = autoPrefixerTree(new Funnel(appTree, {
    include: [ '**/*.css' ]
  }));

  // Include the scss sources in the output for when we publish.
  const scssSources = new Funnel('src', {include: ['**/*.scss']});

  return new MergeTree([appTree, cssAutoprefixed, scssSources], { overwrite: true });
};


/**
 * Build the Broccoli Tree containing all the files used as the input to the Demo Angular2App.
 */
function _buildDemoAppInputTree() {
  return new MergeTree([
    new Funnel('typings', {
      destDir: 'typings'
    }),
    new Funnel('src', {
      include: ['components/**/*', 'core/**/*'],
      destDir: 'src/app'
    }),
    new Funnel('src/app', {
      destDir: 'src/app'
    }),
    new Funnel('public', {
      destDir: 'public'
    })
  ]);
}


/**
 * Build the Broccoli Tree containing all the files used as the input to the e2e Angular2App.
 */
function _buildE2EAppInputTree() {
  return new MergeTree([
    new Funnel('typings', {
      destDir: 'typings'
    }),
    new Funnel('src', {
      include: ['components/**/*', 'core/**/*'],
      destDir: 'src/e2e-app'
    }),
    new Funnel('src/e2e-app', {
      destDir: 'src/e2e-app'
    })
  ]);
}


/**
 * Build the Broccoli Tree that contains the Angular2 App. This picks between E2E, Example or Demo
 * app.
 * @param defaults The default objects from AngularCLI (deprecated).
 * @returns {Angular2App}
 */
function _buildAppTree(defaults) {
  let inputNode;
  let sourceDir;
  switch(process.env['MD_APP']) {
    case 'e2e':
      inputNode = _buildE2EAppInputTree();
      sourceDir = 'src/e2e-app';
      break;
    default:
      inputNode = _buildDemoAppInputTree();
      sourceDir = 'src/app';
  }

  return new Angular2App(defaults, inputNode, {
    sourceDir: sourceDir,
    polyfills: [
      'vendor/jquery/dist/jquery.min.js',
      'vendor/core-js/client/core.js',
      'vendor/systemjs/dist/system.src.js',
      'vendor/zone.js/dist/zone.js',
      'vendor/hammerjs/hammer.min.js',
      'vendor/intl/dist/intl.min.js',
      'vendor/ng2-pagination/dist/ng2-pagination-bundle.js',
      'vendor/ng2-datetime/src/vendor/bootstrap-datepicker/bootstrap-datepicker.min.js',
      'vendor/ng2-datetime/src/vendor/bootstrap-timepicker/bootstrap-timepicker.min.js'
    ],
    tsCompiler: {},
    sassCompiler: {
      includePaths: [
        'src/core/style',
        'src/core/component'
      ]
    },
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/*.+(js|js.map)',
      'core-js/client/core.js',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      'hammerjs/*.min.+(js|js.map)',
      '@angular2-material/**/*',
      'jasmine-core/lib/jasmine-core/**/*',
      'reflect-metadata/Reflect.js',
      'bootstrap/**/*',
      'jquery/dist/jquery.min.js',
      'material-design-icons-iconfont/dist/**/*',
      'font-awesome/**/*',
      'angular2-toaster/**/*',
      'ng2-slim-loading-bar/**/*.+(ts|css|js|js.map)',
      'ng2-dnd/**/*.+(ts|js|css|js.map)',
      'ng2-pagination/dist/*.+(js|js.map)',
      'ng2-select/**/*.+(js|ts|css|js.map)',
      'ng2-datetime/**/*.+(js|ts|css|js.map)',
      'sweetalert2/**/*.+(js|ts|css|js.map)',
      'lodash.assign/index.js',
      'lodash.keys/index.js',
      'lodash.rest/index.js',
      'intl/dist/*.min.+(js|js.map)',
      'h5webstorage/*.+(js|js.map)',
      'moment/moment.js',
      'calendar-utils/dist/src/*.+(ts|js|js.map)',
    ]
  });
}
