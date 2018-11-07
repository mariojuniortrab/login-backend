const port = 3000

const bodyParser = require('body-parser')
const logger = require('morgan')
const express = require('express')
const server = express()
const allowCors = require('./cors')

server.use(logger('dev'))
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(allowCors)


server.listen(port, function(){
    console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server