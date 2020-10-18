
const express = require('express')
const router = express.Router()


const postModel = require('../model/post')

// upload contents
// @route Post http://localhost:1818/post/upload
// @desc upload contents
// @access private
router.post('/upload', (req, res) => {

    const {content, hashtag} = req.body

    const postfields = {}

    postfields.user = req.user.id
    postfields.body.content = content
    // postfields.body.file = req.body.file
    if (typeof req.body.hashtag !== 'undefined') {
        postfields.hashtag = hashtag.split(',')
    }
})





module.exports = router