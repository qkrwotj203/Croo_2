
const express = require('express')
const router = express.Router()
const passport = require('passport')

const authCheck = passport.authenticate('jwt', {session:false})

const profileModel = require('../model/profile')

// profile register
// @route Post http://localhost:1818/profile/register
// @desc post profile
// @access private
router.post('/register', authCheck, (req, res) => {

    const profileFields = {}

    profileFields.user = req.user.id

    if (req.body.major) profileFields.major = req.body.major
    if (req.body.address) profileFields.address = req.body.address

    if (typeof req.body.strength !== 'undefined') {
        profileFields.strength = req.body.strength.split(',')
    }
    if (typeof req.body.experience !== 'undefined') {
        profileFields.experience = req.body.experience.split(',')
    }

    profileModel
        .findOne({user: req.user.id})
        .then(profile => {
            if (profile) {
                profileModel
                    .findOneAndUpdate(
                        {user: req.user.id},
                        {$set: profileFields},
                        {new: true}
                    )
                    .then(profile => res.json(profile))
                    .catch(err => {
                        res.json({
                            message: err.message
                        })
                    })
            }
            else {
                new profileModel(profileFields)
                    .save()
                    .then(profile => {
                        res.json({
                            message: 'Completed',
                            profileInfo: profile
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

router.get('/', authCheck, (req, res) => {
    profileModel
        .findOne({user: req.user.id})
        .populate('user', ['name', 'email'])
        .then(profile => {
            res.json({
                message: 'completed get the profile',
                profileInfo: profile
            })
            }
        )
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})

// find the profile
// @route get http://localhost:1818/profile/total
// @desc get total profile
// @access public
router.get('/total', (req, res) => {
    profileModel
        .find()
        .then(profile => {
            res.json(profile)
        })
        .catch(err => {
            res.json({
                meesage: err.message
            })
        })
})

// find the profile
// @route get http://localhost:1818/profile/total
// @desc get total profile
// @access public
router.get('/:userId', (req, res) => {
    profileModel
        .findById(req.params.userId)
        .then(profile => {
            res.json(profile)
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})




module.exports = router