const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const env = require('../config/.env')
const user = require('../db/user')

const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/


const sendErrorsFromDB = (res, dbErrors) => {
  const errors = []
  _.forIn(dbErrors.errors, error => errors.push(error.message))
  return res.status(400).json({errors})
}

exports.login = (req, res, next) => {
    const login = req.body.login || ''
    const password = req.body.password || ''

    user.findUserByLogin('mareto')
    res.send('testeiculo')
}

exports.validateToken = (req, res, next) => {
    const token = req.body.token || ''
    jwt.verify(token, env.authSecret, function (err, decoded) {
        return res.status(200).send({
            valid: !err
        })
    })
}

exports.signup = (req, res, next) => {
    const name = req.body.name || ''
    const email = req.body.email || ''
    const login = req.body.login || ''
    const password = req.body.password || ''
    const confirmPassword = req.body.confirm_password || ''

    user.signup()
}
