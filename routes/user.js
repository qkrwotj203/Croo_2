
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const userModel = require('../model/user')

router.post('/register', (req, res) => {
// 이메일 체크 - 비밀번호 암호화 - 저장하고
    const {nickName, email, phoneNumber, password} = req.body

    // @route POST http://localhost:1818/user/register
    // @desc register user
    // @access public

    userModel
        .findOne({email})
        .then(user => {
            if (user) {
                res.json({
                    message: 'email already existed'
                })
            }
            else {

                const newUser = new userModel({
                    email, nickName, password, phoneNumber
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
        .catch(err => {
            res.json({
                message: err.message
            })
        })
    })

router.post('/login', (req, res) => {
    //이메일 매칭 - 패스워드 매칭 - 토큰 저장
    const {email, password} = req.body

    // @route POST http://localhost:1818/user/login
    // @desc login user
    // @access privvate
    userModel
        .findOne({email})
        .then(user => {
            if (!user) {
                return res.json({
                    message: 'email doesnt exist'
                })
            } else {
                user
                    .comparePassword(password, (err, isMatch) => {
                        if (err || !isMatch) {
                            return res.json({
                                message: 'wrong password'
                            })
                        }


                    else
                        {
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
                                message: 'auth successful',
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