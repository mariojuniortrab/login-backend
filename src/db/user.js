const conn = require('./index').getConn()

exports.findUserByUsername = (username) => {
   return conn.oneOrNone('select id, username, password, ativo, email from users where username = $1', username)
}

exports.insertUser = (user) => {
    return conn.none('INSERT INTO users(username, password, email, ativo) VALUES(${username}, ${password}, ${email}, ${ativo})', user)
}