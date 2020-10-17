const api = require('express').Router();
const { validateActiveAuth } = require('../services/handle-token') 
/**
 * Passing a filter to some fields that will be required
 * Controller with your actions
 */

// TODO Controllers
const AuthController = require('../app/controller/AuthenticationController')

/**
* ROUTES
*/
api.post('/sign-up', validateActiveAuth, AuthController.singUp)
api.post('/sign-in', AuthController.signInAndSendToken)

/**
 * Response when route was not found
 */
api.get('*', (req, res) => {
  res.status(404).send('Error Route')
})

module.exports = api