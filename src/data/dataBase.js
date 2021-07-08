require('dotenv').config()
const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('Database connected!')
    } catch (error) {
        console.error(`Database connection error! ${error}`)
    }

}
module.exports = { connect }
