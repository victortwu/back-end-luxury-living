const mongoose = require('mongoose')
const {Schema, model} = mongoose


const carSchema = new Schema({
    make: {type: String},
    model: {type: String},
    year: {type: Number},
    img: {type: String},
    price: {type: Number},
    likes: {type: Number, default: 0},
})

module.exports = model('car', carSchema)
