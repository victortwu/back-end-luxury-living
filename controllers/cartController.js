const express = require('express')
const cart = express.Router()
const Cart = require('../models/cartModel')


// routes
// get route
cart.get('/', (req, res) => {
  Cart.findOne( {userId: req.session.currentUser._id}, (err, foundCart) => {
    if (err){
      res.status(400).json(err)
    } else {
      res.status(200).json(foundCart)
    }
  })

})


// POST route, push items into cart or make new cart
cart.post('/:id', (req, res) => {
  const userId = req.session.currentUser._id
  const { make, model, year, img, price, quantity } = req.body
  Cart.findOneAndUpdate( {userId}, { $push: { cartItems: [{
    make,
    model,
    year,
    img,
    price,
    quantity
  }]}}, (err, result) => {
    if (err) {
      res.status(400).json({error: error.message})
    } else if (result === null) {
      Cart.create({userId, cartItems: [{
        make,
        model,
        year,
        img,
        price,
        quantity
      }]}, (err, createdCart)=> {
        if (err) {
          res.status(400).json({error: error.message})
        } else {
          res.status(200).json(createdCart)
        }
      })
    } else {
      // else what??
    }
  })


})

//delete route for fake 'Place Order'
cart.delete('/:id', (req, res) => {
  Cart.findByIdAndDelete(req.params.id, (err, deletedCart) => {
    if (err) {
      res.status(400).json(err)
    } else if (deletedCart === null){
      res.status(404).json({message: "Cart ID not Found"})
    } else {
      res.status(200).json({message: `Cart id ${deletedCart._id} was successfully deleted.`})
    }
  })
})


// remove current item from cartItems array
cart.put('/:id/:itemId', (req, res) => {
  Cart.findByIdAndUpdate(req.params.id, {$pull: {cartItems: {_id: req.params.itemId}}}, (err, updatedCart) => {
    if (err) {
      res.status(400).json(err)
    } else {
      updatedCart.save()
      res.status(200).json(updatedCart)
    }
  })
})





module.exports = cart
