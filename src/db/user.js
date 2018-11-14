const conn = require('./index').getConn()

exports.findUserByLogin = (login) => {
    conn.oneOrNone('select id, login from users where login = $1', login)
    .then((data) => {
        console.log(data)
    })
}

exports.login = () => {
    console.log('realizando login');
}

exports.signup = () => {
    console.log("signing up");
}