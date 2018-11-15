const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const env = require('../config/.env')
const user = require('../db/user')

const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

const login = (req, res, next) => {
    const username = req.body.username || ''
    const password = req.body.password || ''

    user.findUserByUsername(username)
    .then( data => {
        if(data && bcrypt.compareSync(password, data.password)){
            const token = jwt.sign(data, env.authSecret, {
                expiresIn: "1 day"
            })
            const { ativo ,username, email} = data
            res.json({ativo,username, email,token})
        }else{
            res.status(400).send({
                errors:['Usuário/senha inválidos!']
            })
        }
    }).catch( error => {
        console.error(error)
        return res.status(400).send({
            errors: ['Erro ao efetuar login. Erro no banco de dados'], error
        })
    })
    
}

exports.login = login 

exports.validateToken = (req, res, next) => {
    const token = req.body.token || ''
    jwt.verify(token, env.authSecret, function (err, decoded) {
        return res.status(200).send({
            valid: !err
        })
    })
}

exports.signup = (req, res, next) => {
    const ativo = req.body.ativo || ''
    const email = req.body.email || ''
    const username = req.body.username || ''
    const password = req.body.password || ''
    const confirmPassword = req.body.confirm_password || ''
    
    if (!email.match(emailRegex)) {
        return res.status(400).send({
            errors: ['O e-mail informado está inválido']
        })
    }

    if (!password.match(passwordRegex)) {
        return res.status(400).send({
            errors: [
                "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@# $ % ) e tamanho entre 6 - 20. "
            ]
        })
    }

    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)
    
    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({
            errors: ['Senhas não conferem.']
        })
    }

    user.findUserByUsername(username)
    .then( data => {
        if(data){
            return res.status(400).send({
                errors: ['Usuário já cadastrado.']
            })
        }else{
            user.insertUser({ativo,email, username, password:passwordHash})
            .then(() => {
                login(req, res, next)
            })
            .catch(error => {
                console.error(error)
                return sendErrorsFromDB(res, {errors:{error:{message:'Erro de banco de dados'}}})
            })
        }
    }).catch( error => {
        return sendErrorsFromDB(res, {errors:{error:{message:'Erro de banco de dados'}}})
    })
}
