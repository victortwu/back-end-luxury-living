const express = require('express')
const user = express.Router()
const User = require('../models/usersModel')
const bcrypt = require('bcrypt')


user.get('/', (req, res) => {
  User.find({}, (error, foundUser) => {
    if(error){
      res.status(400).json(error)
    }
    else{

      res.status(200).json(foundUser)
    }
  })
})
user.get('/new/:id', (req, res) => {
  User.find(req.params.id, (error, foundUser) => {
    if(error){
      res.status(400).json(error)
    }
    else{

      res.status(200).json(foundUser)
    }
  })
})
user.post('/new', (req, res) => {
  if(req.body.password.length < 8){
    res.status(400).json({error: 'Password must be at least 8 characters'})
  }
  else{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (error, createdUser) => {
      if(error){
        res.status(400).json({message: "User already exists"})
      }
      else{
        res.status(201).json(createdUser)
      }
    })
  }
})
user.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id, (error, deletedUser) => {
    if(error){
      res.status(400).json({error: error.message})
    }
    else if(deletedUser === null) {
      res.status(404).json({message: 'User not found'})
    }
    else{
      res.status(200).json({message: `User ${deletedUser.username} deleted successfully`})
    }
  })
})
user.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedUser) => {
    if(error){
      res.status(400).json({error: error.message})
    }
    else{
      res.status(200).json({
        message: `User ${updatedUser.username} updated successfully`,
        data: updatedUser
      })
    }
  })
})


module.exports = user
