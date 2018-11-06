const express = require('express')
const auth = require('../config/auth')

module.exports = function(server) {
    //API routes
    const router = express.Router();
    server.use('/api', router) 
    router.use(auth)


  /*
  * Rotas abertas
  */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../domain/authService')
    
    openApi.get('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)

}