const api = require('express').Router();
const { validateActiveAuth } = require('../services/handle-token') 

// Controllers
const { 
  AuthController,
  RoleController,
  CategoryController,
  MembershipController,
  ProjectController,
  UserController
} = require('../app/controller')

/** 
 * ROUTES
 */
api.post('/sign-up', AuthController.singUp)
api.post('/sign-in', AuthController.signInAndSendToken)

// ROLES
api.get('/role', validateActiveAuth, RoleController.index)
api.get('/role/:id', validateActiveAuth, RoleController.show)
api.post('/role', validateActiveAuth, RoleController.store)
api.put('/role/:id', validateActiveAuth, RoleController.update)
api.delete('/role/:id', validateActiveAuth, RoleController.destroy)

// CATEGORY
api.get('/category', validateActiveAuth, CategoryController.index)
api.get('/category/:id', validateActiveAuth, CategoryController.show)
api.post('/category', validateActiveAuth, CategoryController.store)
api.put('/category/:id', validateActiveAuth, CategoryController.update)
api.delete('/category/:id', validateActiveAuth, CategoryController.destroy)

// MEMBERSHIP
api.get('/membership', validateActiveAuth, MembershipController.index)
api.post('/purchase-membership', validateActiveAuth, MembershipController.pruchaseAndStoreMembership)
// PROJECT
api.get('/project', validateActiveAuth, ProjectController.index)
api.post('/project', validateActiveAuth, ProjectController.store)
api.post('/active-project', validateActiveAuth, ProjectController.activeProjectAndMembership)
// USER
api.get('/user', validateActiveAuth, UserController.index)
api.post('/user-project', validateActiveAuth, UserController.storeProjectByUserId)
api.put('/user/:id', validateActiveAuth, UserController.update)

// Response when route was not found
api.get('*', (req, res) => {
  res.status(404).send('Error Route')
})

module.exports = api