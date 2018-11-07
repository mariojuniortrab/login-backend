const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    login : { type: Sequelize.STRING(32), allowNull:false},
    password: { type:Sequelize.STRING(32), allowNull:false},
    active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
})

exports.login = () => {
    console.log('realizando login');
}

exports.signup = () => {
    console.log("signing up");
}