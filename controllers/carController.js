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
            res.status(201).json(createCar)
        }
    })

})

// DELETE ROUTE
car.delete('/:id', (req, res)=>{

    carModel.findByIdAndDelete(req.params.id, (error, deletedCar)=>{
        if (error){
            res.status(400).json({error: error.message})
        }
        else if (deletedCar === null){
            res.status(404).json({message: 'Car not Found'})
        }
        else{
            res.status(200).json({message: `Car ${deletedCar.make} deleted successfully`})
        }
    })
})

// UPDATE ROUTE
car.put('/:id', (req, res)=>{

    carModel.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedCar)=>{
        if (error){
            res.status(400).json({error: error.message})
        }
        else{
            res.status(200).json({
                message: `Car ${updatedCar.id} updated successfully`,
                data: updatedCar
            })
        }
    })
})




module.exports = car