
const mongoose = require('mongoose')
const gravatar = require('gravatar')
const normalize = require('normalize-url')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({

    nickName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }

},
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (next) {

    try {
        console.log('entered')

        //make a avatart
        const avatar = await normalize(
            gravatar.url(this.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            }),
            { forceHttps: true }
        )
        this.avatar = avatar

        // encoding passowrd
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(this.password, salt)
        this.password = passwordHash

        console.log('exited')
        next()
    }

    catch (error) {
        next(error)
    }

})

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err)
        cb (null, isMatch)
    })
}

module.exports = mongoose.model('user', userSchema)