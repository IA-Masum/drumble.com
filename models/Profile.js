const {Schema, model} = require('mongoose')


const profileSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name:{
        type: String,
        trim: true,
        maxlength: 30,
        required: true
    },
    title:{
        type: String,
        maxlength: 100,
        trim: true
    },
    bio:{
        type: String,
        trim: true,
        maxlength: 1000
    },
    pic: String,
    links:{
        website: String,
        facebook: String,
        twitter: String,
        github: String
    },
    posts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    bookmarks:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
},{
    timestamps: true
})


const Profile = model('Profile', profileSchema)

module.exports = Profile