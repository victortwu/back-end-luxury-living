const mongoose = require('mongoose')
const { Schema, model } = mongoose

const cartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' //get from George
  },
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car' // get from Debbie
      },
      make: String,
      model: String,
      year: Number,
      img: String,
      price: Number,
      quantity: Number,
    }
  ]
})

const Cart = model('Cart', cartSchema)

module.exports = Cart
