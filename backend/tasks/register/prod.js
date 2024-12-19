/**
 * `tasks/register/prod.js`
 *
 * ---------------------------------------------------------------
 *
 * This Grunt tasklist will be executed instead of `default` when
 * your Sails app is lifted in a production environment (e.g. using
 * `NODE_ENV=production node app`).
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/tasks/register/prod.js
 *
 */
module.exports = function(grunt) {
  grunt.registerTask('prod', [
  // 'polyfill:dev', //« uncomment to ALSO transpile during development (for broader browser compat.)
  'compileAssets',
  // 'babel', //« uncomment to ALSO transpile during development (for broader browser compat.)
  'linkAssets',
  //'watch'
  ]);
};

