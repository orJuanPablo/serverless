const express = require('express')
const Orders = require('../models/Orders')
const {isAuth, hasRoles} = require('../auth')
const router = express.Router()

router.get('/', (req,res)=>
{
    Orders.find()
    .exec()
    .then(x => res.status(200).send(x))
})
router.get('/:id', (req,res)=>
{
    Orders.findById(req.params.id)
    .exec()
    .then(x => res.status(200).send(x))
})
router.post('/', isAuth, (req,res)=>
{
    const {_id} = req.user
    Orders.create({...req.body, user_id : _id}).then(x => res.status(201).send(x))
})
router.put('/:id', isAuth, (req,res)=>
{
    Orders.findOneAndUpdate(req.params.id, req.body).exec()
    .then(()=> res.sendStatus(204))
})
router.delete('/:id', isAuth, (req,res)=>
{
    Orders.findOneAndDelete(req.params.id, req.body).exec()
    .then(()=> res.sendStatus(204))
})

module.exports = router