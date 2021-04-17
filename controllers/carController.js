const express = require('express')
const car = express.Router()
const carModel = require('../models/carModel')


// GET (index) list of cars
car.get('/', (req, res)=>{
    //res.send('Get route is working!!!')
    carModel.find({}, (error, foundCar)=>{
        if (error){
            res.status(400).json(error)
        }
        else{
            res.status(200).json(foundCar)
        }
    })
})

// POST ROUTE
car.post('/', (req, res)=>{

    carModel.create(req.body, (error, createCar)=>{
        if (error){
            res.status(400).json({error: error.message})
        }
        else{
            res.status(200).json(createCar)
        }
    })

}) 




module.exports = car