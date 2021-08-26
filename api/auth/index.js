const jwt = require('jsonwebtoken')
const Users = require('../models/Users')


const isAuth = (req,res, next) =>
{
    const token = req.headers.authorization
    if(!token)
    {
        return res.sendStatus(403)
    }
    jwt.verify(token, 'mi_secreto', (err, decoded) =>
    {
        const { _id } = decoded
        Users.findOne({ _id }).exec()
         .then(user => 
            {
                req.user = user
                next()
            })
    })
}
const hasRoles = roles =>  (req,res,next) =>
{
    if(roles.indexOf(req.user.role) > -1)
    {
        return next()
    }else
    {
        res.sendStatus(403)
    }
}
module.exports = {isAuth, hasRoles}
