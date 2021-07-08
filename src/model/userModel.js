const mongoose = require('mongoose');


const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Favor fornecer email valido'],
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('usuario', usuarioSchema)
