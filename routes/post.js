
const express = require('express')
const router = express.Router()
const passport = require('passport')

const authCheck = passport.authenticate('jwt', {session:false})

const postModel = require('../model/post')

// upload contents
// @route Post http://localhost:1818/post/upload
// @desc upload contents
// @access private
router.post('/upload', authCheck, (req, res) => {

    const {content, file, hashtag, toolsInfo, reply, like} = req.body

    const postfields = {}

    postfields.user = req.user.id
    if (content)postfields.content = content
    if (file)postfields.file = file
    if (toolsInfo)postfields.toolsInfo = toolsInfo
    // postfields.body.file = req.body.file
    if (typeof hashtag !== 'undefined') {
        postfields.hashtag = hashtag.split(',')
    }
    if (typeof reply !== 'undefined') {
        postfields.reply = reply.split(',')
    }
    if (typeof like !== 'undefined') {
        postfields.like = like.split(',')
    }

    new postModel(postfields)
        .save()
        .then(() => {
            res.json({
                message: 'Good!! Now your content can see everyone',
                request: {
                    type: 'GET',
                    url: 'https://localhost:1818/post'
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})


// edit content
// @route put http://localhost:1818/post/edit
// @desc edit content
// @access private
router.put('/:postId', authCheck, (req, res) => {


    const {content, file, hashtag, toolsInfo, reply, like} = req.body

    const postfields = {}

    postfields.user = req.user.id
    if (content)postfields.content = content
    if (file)postfields.file = file
    if (toolsInfo)postfields.toolsInfo = toolsInfo
    // postfields.body.file = req.body.file
    if (typeof hashtag !== 'undefined') {
        postfields.hashtag = hashtag.split(',')
    }
    if (typeof reply !== 'undefined') {
        postfields.reply = reply.split(',')
    }
    if (typeof like !== 'undefined') {
        postfields.like = like.split(',')
    }
    // 1. check who man a posted content
    // 2. if has not error then upload
    postModel
        .findById(req.params.postId)
        .then(post => {
            if (post.user.toString() !== req.user.id) {
                return res.json({
                    message: 'Hey Hey! its not yours'
                })
            }
            else {

                console.log(post)
                postModel
                    .findOneAndUpdate(
                        {_id: post._id},
                        {$set: postfields},
                        {new: true}
                    )
                    .then(post => {
                        res.json({
                            message: 'edited the content'
                        })
                    })
                    .catch(err => {
                        res.json(err)
                    })
            }
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })

})

// delete content
// @route delete http://localhost:1818/post/delete
// @desc delete content
// @access private
router.delete('/:postId', authCheck, (req, res) => {

    postModel
        .findById(req.params.postId)
        .then(post => {

            if (post.user.toString() !== req.user.id) {
                return res.json({
                    message: 'its not yours'
                })
            }
            else {
                postModel
                    .findByIdAndDelete(req.params.postId)
                    .then(() => {
                        res.json({
                            message: 'clear'
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
    // postModel
    //     .findOneAndDelete()
    //     .then(() => {
    //         res.json({
    //             message: 'deleted content',
    //             request: {
    //                 type: 'GET',
    //                 url: 'https://localhost:1818/post'
    //             }
    //         })
    //     })
    //     .catch(err => {
    //         res.json({
    //             message: err.message
    //         })
    //     })
})

// get content
// @route get http://localhost:1818/post
// @desc get content
// @access public
router.get('/', (req, res) => {
    postModel
        .find()
        .populate('user', ['name', 'email', 'avatar'])
        .then(post => {res.json(post)})
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})

router.get('/:postId', (req, res) => {
    postModel
        .findById(req.params.postId)
        .then(post => {
            res.json(post)
        })
        .catch(err => {
            res.json(err)
        })
})


module.exports = router