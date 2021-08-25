const express = require('express')
const crypto = require('crypto')
const Users = require('../models/Users')
const router = express.Router()


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

module.exports = router