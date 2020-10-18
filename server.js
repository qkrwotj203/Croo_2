
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const BP = require('body-parser')
const passport = require('passport')

const app = express()





const userRoute = require('./routes/user')
const postRoute = require('./routes/post')
const profileRoute = require('./routes/profile')

require('./config/db')

app.use(morgan('dev'))
app.use(BP.json())
app.use(BP.urlencoded({ extended: false }))

app.use(passport.initialize())

require('./config/passport')(passport)


app.use('/user', userRoute)
app.use('/post', postRoute)
app.use('/profile', profileRoute )

const port = 1818


app.listen(port, console.log('started at 1818 server'))