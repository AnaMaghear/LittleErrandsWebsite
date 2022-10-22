const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    fullname:{
        type: String,
        require: [true, "Please add your full name"]
    },

    username:{
        type: String,
        require: [true, "Please add your username"]
    },

    email:{
        type: String,
        require: [true, "Plese add your email"]
    },

    phoneNumber:{
        type: String,
        require: [true, "Plese add your phone number"]
    },

    password:{
        type: String,
        require: [true, "Please add a password"]
    }

},

{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);