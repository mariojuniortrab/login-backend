const server = require('./config/server')
require('./config/database')
require('./routes/routes')(server)