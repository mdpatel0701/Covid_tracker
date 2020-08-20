//check if application is not running on production then use mongodb database from location specified in .env

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts =  require('express-ejs-layouts')

//1
const indexRouter = require('./routes/index')

app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

//Mongoose connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open',() => console.log("Successfully connected to mongoose"))
//Mongoose connection


//1
app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)