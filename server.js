
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const BP = require('body-parser')


const app = express()


const dbAdress = "mongodb+srv://bangnany:4275@cluster0.kgd8x.mongodb.net/Shoppingmall?retryWrites=true&w=majority"
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose
    .connect(dbAdress, dbOptions)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))


const userRoute = require('./routes/user')


app.use(morgan('dev'))
app.use(BP.json())
app.use(BP.urlencoded({ extended: false }))


app.use('/user', userRoute)


const port = 1818


app.listen(port, console.log('server started'))