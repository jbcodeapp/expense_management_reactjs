const mongoose = require('mongoose')

//schema design
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'name is required'],
    },
    email:{
        type: String,
        required:[true, 'email is required and should be unique'],
        unique: true,
    },
    password:{
        type: String,
        required:[true, 'password is required'],
    },
    phone:{
        type: Number,
        required:[true, 'phone number is required'],
    },
    country:{
        type: String,
        required:[true, 'country is required'],
    },
    address:{
        type: String,
        required:[true, 'address is required'],
    },
},{ timestamps: true });

//export
const userModel = mongoose.model('users', userSchema )
module.exports = userModel;