
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const normalize = require('normalize-url')

const userModel = require('../model/user')

router.post('/register', (req, res) => {
// 이메일 체크 - 비밀번호 암호화 - 저장하고
    const {nickName, email, phoneNumber, password} = req.body

    userModel
        .findOne({email})
        .then(user => {
            if (user) {
                res.json({
                    message: 'email already existed'
                })
            }
            else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        return res.json({
                            message: err.message
                        })
                    }
                    else {
                        //automation regist avatar
                        const avatar = normalize(
                            gravatar.url(email, {
                                s: '200',
                                r: 'pg',
                                d: 'mm'
                            }),
                            { forceHttps: true }
                        )

                        const newUser = new userModel({
                            nickName,
                            email,
                            phoneNumber,
                            password,
                            avatar
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
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })







})

router.post('/login', (req, res) => {
    //이메일 매칭 - 패스워드 매칭 - 토큰 저장
    const {email, password} = req.body

    userModel
        .findOne({email})
        .then(user => {
            if (!user) {
                return res.json({
                    message: 'email doesnt exist'
                })
            }
            else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err || result === false) {
                        res.json({
                            message: 'wrong password'
                        })
                    }
                    else {
                        // 토큰 생성
                        const token = jwt.sign(
                            {
                                email: user.email,
                                id: user._id
                            },
                            'key',
                            {expiresIn: '1d'}
                        )
                        //token return
                        res.json({
                            message:'auth successful',
                            token: token
                        })

                    }
                })
            }
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })



})


module.exports = router