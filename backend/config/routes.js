/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const {acceptBooking} = require("../api/controllers/BuchungController");
module.exports.routes = {
  'POST /kurs/erstellen': {controller: 'KursController', action: 'create'},
  'GET /kurse': { controller: 'KursController', action: 'find' },
  'GET /kurse/:id': { controller: 'KursController', action:'findOne' },
  'PUT /kurse/:id': { controller: 'KursController', action: 'update' },
  'DELETE /delete/kurs/:id': { controller: 'KursController', action: 'delete' },
  'GET /trainer': { controller: 'TrainerController', action: 'find'},
  'POST /login': {controller: 'LoginController', action: 'login'},
  'POST /login/mitglied': {controller: 'LoginController', action:'loginmitglied'},
  'POST /login/rezeptionist': {controller: 'LoginController', action: 'loginrezeptionist'},
  'GET /logout': {controller: 'LoginController', action:'logout'},
  'GET /exercises': { controller: 'ExerciseController', action: 'find' },
  'GET /exercises/:id': {controller: 'ExerciseController', action: 'findOne'},
  'POST /newBooking': {controller: 'BuchungController', action: 'booking'},
  'GET /getBookings': {controller: 'BuchungController', action: 'getBookings'},
  'GET /getBookingsandMitglied/:id': {controller: 'BuchungController', action: 'getBookingsandMitglied'},
  'POST /message/send' : {controller: 'MessageController', action: 'create'},
  'PUT /updateBooking': {controller: 'BuchungController', action: 'updateBooking'},
  'POST /register': {controller: 'LoginController', action: 'register'},


  /***************************************************************************
 *                                                                          *
 * Make the view located at `views/homepage.ejs` your home page.            *
 *                                                                          *
 * (Alternatively, remove this and add an `index.html` file in your         *
 * `assets` directory)                                                      *
 *                                                                          *
 ***************************************************************************/


  /***************************************************************************
 *                                                                          *
 * More custom routes here...                                               *
 * (See https://sailsjs.com/config/routes for examples.)                    *
 *                                                                          *
 * If a request to a URL doesn't match any of the routes in this file, it   *
 * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
 * not match any of those, it is matched against static assets.             *
 *                                                                          *
 ***************************************************************************/


};
