
const mongoose = require('mongoose')

//schema design
const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'name is required'],
    }
},{ timestamps: true });

//export
const categoryModel = mongoose.model('category', categorySchema )
module.exports = categoryModel;