
const mongoose = require('mongoose')

const profileSchema = mongoose.Schema(
    {
        user: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'user'
        },
        major: {
                type: String,
                required: true
        },
        strength: {
                type: [String],
                required: true
        },
        address: {
                type: String
        },
        experience: [String]
    },
    {
            timestamps: true
    }
)

module.exports =mongoose.model('profile', profileSchema)