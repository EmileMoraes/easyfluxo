require('dotenv').config()
const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URI
const connect = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
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
