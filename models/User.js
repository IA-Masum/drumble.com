const {Schema, model} = require('mongoose')


const userSchema = new Schema({
    userName:{
        type: String,
        trim: true,
        maxlength: 15,
        required: true
    },
    email:{
        type: String,
        trim: true,
        required: true
    },
    password:{
        type: String,
        required: true,
        min: 8
    },
    profile:{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }
},{
    timestamps: true
})


const User = model('User', userSchema)

module.exports = User