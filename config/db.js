
const mongoose = require('mongoose')



const dbAdress = "mongodb+srv://bangnany:4275@cluster0.kgd8x.mongodb.net/Shoppingmall?retryWrites=true&w=majority"
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}

mongoose
    .connect(dbAdress, dbOptions)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))