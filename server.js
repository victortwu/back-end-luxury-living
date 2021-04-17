const express = require('express')
const app = express()
const PORT = 3003
const mongoose = require('mongoose')
const cors = require('cors')
// middleware
app.use(express.json())
// cors middleware
const whitelist = ['http://localhost:3000']
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	}
}
app.use(cors(corsOptions))
// set up connection with the DB
mongoose.connect('mongodb://localhost:27017/luxurylivingDB',{
	useNewUrlParser:true,
	useUnifiedTopology: true,
  useFindAndModify: false
});
// set up listeners to monitor your database connection
const db = mongoose.connection;
db.once('open', ()=> console.log('DB connected...'));
db.on('error', (err)=> console.log(err.message));
db.on('disconnected', ()=> console.log('mongoose disconnected'));
// This is index middleware -- Debbie's file?
// app.use('./luxuryliving', require('./controllers/carsController'))
// USER middleware - George
// CART middleware
app.listen(PORT, () => {
  console.log('Listening on port: ', PORT)
})
