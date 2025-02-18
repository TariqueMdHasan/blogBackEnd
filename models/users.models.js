const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name']
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            unique: true
        },
        password: {
            type: String,
            required:  [true, 'Please enter you password']
        },
        profilePicture:{
            type: String,
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

module.exports = mongoose.model('User', userSchema)

