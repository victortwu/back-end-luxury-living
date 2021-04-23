const express = require('express')
const car = express.Router()
const carModel = require('../models/carModel')


// seed route
car.get('/seed', (req, res) => {
	carModel.create([
		{
			make: 'Ferrari',
	    model: 'LaFerrari Aperta Hybrid',
	    year: 2017,
	    img: 'https://i.imgur.com/RAnOIVu.jpg',
	    price: 4499999,
	    likes: 0,
		},
		{
			make: 'Ferrari',
	    model: 'F40',
	    year: 1990,
	    img: 'https://i.imgur.com/L7m7KHd.jpg',
	    price: 1199999,
	    likes: 0,
		},
		{
			make: 'Ferrari',
	    model: 'Crockett & Tubbs Testarossa',
	    year: 1985,
	    img: 'https://i.imgur.com/naDVBVP.jpg',
	    price: 4999999,
	    likes: 0,
		},
		{
			make: 'Ferrari',
	    model: 'F8 Tributo',
	    year: 2020,
	    img: 'https://i.imgur.com/oHjC0Nh.jpg',
	    price: 274999,
	    likes: 0,
		},
		{
			make: 'Rolls Royce',
	    model: 'Sweptail',
	    year: 2017,
	    img: 'https://i.imgur.com/0DQmQ4H.jpg',
	    price: 12999999,
	    likes: 0,
		},
		{
			make: 'Bentley',
	    model: 'Continental GT',
	    year: 2020,
	    img: 'https://i.imgur.com/on1XA7K.jpg',
	    price: 199999,
	    likes: 0,
		},
		{
			make: 'Audi',
	    model: 'Ironman Car',
	    year: 2012,
	    img: 'https://i.imgur.com/KNHirdo.jpg',
	    price: 4999999,
	    likes: 0,
		},
		{
			make: 'Mercedes',
	    model: 'AMG GT C Roadster',
	    year: 2020,
	    img: 'https://i.imgur.com/d9QXhSQ.jpg',
	    price: 164999,
	    likes: 0,
		},
    {
      make: 'Porche',
      model: '911 GT3',
      year: 2018,
      img: 'https://i.imgur.com/D7w1NSa.jpg',
      price: 144999,
      likes: 0,
    },
    {
      make: 'Porche',
      model: 'Carrera GT',
      year: 2006,
      img: 'https://i.imgur.com/UVaI26z.jpg',
      price: 599999,
      likes: 0,
    },
	], (err, data) => {
    if(err) {
      console.log(err)
    }
    res.send(data)
  })
})


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

car.patch('/addlikes/:id', (req, res)=> {
	carModel.findByIdAndUpdate(req.params.id, { $inc: {likes : 1}}, {new:true}, (error, updatedCar) => {
		if(error){
			res.status(400).json({error:error.message})
		}
		else{
			res.status(200).json({
				data: updatedCar
			})
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
