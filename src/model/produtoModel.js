const mongoose = require('mongoose')

const produtoSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    precoUnitario: {
        type: Number,
        required: true
    },
    estoque: {
        type: Number,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    loja: {
        type: String,
        required: true,
        unique: true,
        ref: 'loja'
    },
    createAt: {
        type: Date,
        required: true,
        default: new Date
    }
})

module.exports = mongoose.model('produto', produtoSchema)