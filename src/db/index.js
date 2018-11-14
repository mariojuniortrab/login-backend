var pgp = require('pg-promise')(/*options*/)
var conn = null

exports.getConn = () => {
  if(!conn){
    conn = pgp('postgres://postgres:senhadobanco@localhost:5433/marioso')
  }
  return conn 
}
