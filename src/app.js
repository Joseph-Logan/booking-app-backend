require('./config')
require('./db')

const middlewares = require('./app/middleware')
const express = require('express')
const app = express()
const routes = require('./routes')

// Middlewares
app.use(middlewares)
// routes
app.use('/api', routes)

module.exports = app
