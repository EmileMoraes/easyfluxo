const mongoose = require('mongoose');
const vendaSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    dia: {
        type: Date,
        default: Date.now,
        required: true
    },
    quantItensVendidoDia: { 
        type: Number,
        required: true
     },
    valorLucro: {
        type: Number,
        default: 0
    },
    valorMontanteDia: {
        type: Number,
        required: true
    },
    valorPrejuizo: {
        type: Number,
        default: 0
    }, 
    despesaPessoal: {
        type: Number,
        required: true
    },
    valorFornecedor: {
        type: Number,
        required: true
    },
    loja: {
        type: String,
        required: true,
        ref: 'loja'
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('venda', vendaSchema);