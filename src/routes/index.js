const api = require('express').Router();
const { validateActiveAuth } = require('../services/handle-token') 
/**
 * Passing a filter to some fields that will be required
 * Controller with your actions
 */

const AuthController = require('../app/controller/authentication_controller')
const RoleController = require('../app/controller/role_controller')

/**
* ROUTES
*/
api.post('/sign-up', AuthController.singUp)
api.post('/sign-in', AuthController.signInAndSendToken)

// ROLES

api.get('/role', validateActiveAuth, RoleController.index)
api.post('/role', validateActiveAuth, RoleController.store)

/**
 * Response when route was not found
 */
api.get('*', (req, res) => {
  res.status(404).send('Error Route')
})

module.exports = api