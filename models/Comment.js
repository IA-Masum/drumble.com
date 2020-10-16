const {Schema, model} = require('mongoose')


const commentSchema = new Schema({
    post:{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body:{
        type: String,
        maxlength: 300,
        trim: true,
        required: true
    },
    replies:[
        {
            body: {
                type: String,
                maxlength: 300,
                trim: true,
                required: true
            },
            user:{
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            createdAt:{
                type: Date,
                default: new Date()
            }
        }
    ]

})


const Comment  = model('Comment', commentSchema)

module.exports = Comment