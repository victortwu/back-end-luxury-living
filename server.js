
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3003
const mongoose = require('mongoose')

const session = require('express-session')

const cors = require('cors')




// middleware
app.use(express.json())

//cors middleware
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

// const corsOptions = {  //<--need a different variable name? or does this go above?
//     "origin": "http://localhost:3000",
//     "methods": "GET,PUT,PATCH,POST,DELETE",
//     "credentials" : true
// }
app.use(cors(corsOptions))


// app.use(cors(corsOptions))
// set up connection with the DB
mongoose.connect('mongodb://localhost:27017/luxurylivingDB',{
	useNewUrlParser:true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});




// set up listeners to monitor your database connection
const db = mongoose.connection;
db.once('open', ()=> console.log('DB connected...'));
db.on('error', (err)=> console.log(err.message));
db.on('disconnected', ()=> console.log('mongoose disconnected'));









// USER middleware - George
app.use(session({
  secret: 'lamborghini',
  resave: false,
  saveUninitiaized: false,
}))
// const isAuthenticated = (req, res, next) => {
//     if (req.session.currentUser) {
//         return next()
//     } else {
//         res.status(400).json({error:'Sign in to proceed'})
//     }
// }
//
// const isAdministrator = (req, res, next) => {
//   if (req.session.currentUser.admin === true) {
//       return next()
//   } else {
//     res.status(400).json({error:'Admin only'})
//   }
// }

//  middleware for routes
const carController = require('./controllers/carController')
app.use('/luxuryliving', carController)

const cartController = require('./controllers/cartController')
app.use('/cart', cartController)

const usersControllers = require('./controllers/userController')
app.use('/users', usersControllers)

const sessionsControllers = require('./controllers/sessionsController')
app.use('/sessions', sessionsControllers)


// app.get('/', (req, res) => {
//    currentUser: req.session.currentUser
// })


app.listen(PORT, () => {
  console.log('Listening on port: ', PORT)
})
