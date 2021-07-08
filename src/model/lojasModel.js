const mongoose = require('mongoose')

const lojaSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    redesSociais: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true  
    },
    createAt: {
        type: Date,
        required: true,
        default: new Date
    }
})

module.exports = mongoose.model('loja', lojaSchema)
