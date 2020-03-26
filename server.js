const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const config = require('./utils/config')

const app = express()

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

// Bodyparser middleware
app.use(express.urlencoded({
  limit: '10mb',
  extended: false
}))

// Connect to MongoDB
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error while connecting to MongoDB:', err.message))

// Serve static assets
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// Controllers
app.use('/', indexRouter)
app.use('/authors', authorRouter)


// Connect to PORT
app.listen(config.PORT, () => 
  console.log(`Server running on port ${config.PORT}`)
)