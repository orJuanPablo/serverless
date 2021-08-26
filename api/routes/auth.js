const express = require('express')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const Users = require('../models/Users')
const {isAuth} = require('../auth')

const router = express.Router()

const signToken = (_id) => 
{
    return jwt.sign({_id}, 'mi_secreto', {
        expiresIn: 60 * 60 * 24 * 365,
    })
}

router.post('/register', (req,res)=>
{
    const {email, password} = req.body
    crypto.randomBytes(16,(err,salt)=>
    {
        const newSalt = salt.toString('base64')
        crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => 
        {
            const encryptedPass = key.toString('base64')
            Users.findOne({email}).exec()
            .then(user => 
                {
                    if(user)
                    {
                       return res.send('El email está vinculado a una cuenta')
                    }
                    users.create(
                        {
                            email : email,
                            password : encryptedPass,
                            salt : newSalt,
                        }).then(() => 
                        {
                            res.send('Usuario creado con éxito')
                        })
                })
        })
    })
})
router.post('/login', (req,res)=>
{
    const { email, password} = req.body
    Users.findOne({email}).exec()
    .then(user =>
        {
            if(!users)
            {
                return res.send('usuario y/o contraseña incorrectos')
            }
            crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) =>
            {
                const encryptedPass = key.toString('base64')
                if(user.password === encryptedPass)
                {
                    const token = signToken(user._id)
                    return res.send({token})
                }else
                {
                    return res.send('usuario y/o contraseña incorrectos')
                }
            })
        })
})
router.get('/me',isAuth,(req,res) =>
{
    res.send(req.user)
})

module.exports = router