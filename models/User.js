
const mongoose = require ('mongoose')


const UserSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true //unique for email for the user
    },
    password: {
        type: String,   
        required: true
    },
    
    role: { //role  of user it will be (normal or admin)
        type: Number,
        default: 0
    }

},{timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;