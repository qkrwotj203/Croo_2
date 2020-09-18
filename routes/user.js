
const express = require('express')
const router = express.Router()
// const bcrypt = require('bcryptjs')

const userModel = require('../model/user')

router.post('/register', (req, res) => {

    const {nickName, email, phoneNumber, password} = req.body

    const newUser = new userModel({
        nickName,
        email,
        phoneNumber,
        password
    })

    newUser
        .save()
        .then(user => {
            res.json({
                message: 'WELCOME!!',
                userInfo: user
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })


})




module.exports = router