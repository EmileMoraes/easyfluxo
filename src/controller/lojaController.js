require('dotenv-safe').config();
const mongoose = require('mongoose')
const LojaDb = require('../model/lojasModel')
const utils = require('../utils/func')
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken');
const createLoja = async (req, res) => {
    const authHeader = req.get('authorization');
    if (!authHeader) {
        return res.status(401).send("Não autorizado")
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, async function (erro) {
        if (erro) {
            return res.status(403).send('Token invalido');
        }


        const { nome, endereco, redesSociais, telefone } = req.body
        if ((nome == "" || nome == undefined) || (endereco == "" || endereco == undefined) || (redesSociais == "" || redesSociais == undefined) || (telefone == "" || telefone == undefined)) {
            return res.status(400).json({ error: 'Favor inserir ou preencher todos os campos' })
        }
        req.body.nome = utils.transfMaiuscula(req.body.nome)
        const lojaExiste = await LojaDb.findOne({ nome: req.body.nome })
        if (lojaExiste) {
            return res.status(409).json({ error: 'Loja já existe' })
        }

        try {
            const loja = await LojaDb.create(req.body)
            const novaLoja = await loja.save()
            return res.status(201).json({ message: 'Nova loja cadastrada com sucesso!', novaLoja })
        } catch (err) {
            return res.status(400).json({ message: erro.message })
        }
    })
}

const getlojas = async (req, res) => {
    const authHeader = req.get('authorization');
    if (!authHeader) {
        return res.status(401).send("Não autorizado")
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, async function (erro) {
        if (erro) {
            return res.status(403).send('Token invalido');
        }
        try {
            const lojas = await LojaDb.find();
            return res.status(200).json({ message: 'Informações da loja cadastrada no sistema: ', lojas });
        } catch (err) {
            return res.status(500).json({ message: message.err })
        }
    })
}

const findLoja = async (req, res) => {
    const authHeader = req.get('authorization');
    if (!authHeader) {
        return res.status(401).send("Não autorizado")
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, async function (erro) {
        if (erro) {
            return res.status(403).send('Token invalido');
        }
        try {
            const loja = await LojaDb.findById(req.params.id)
            if (loja == undefined) {
                return res.status(404).json({ message: 'Loja não encontrada' })
            }
            res.status(200).json(loja)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })
}

const updateLoja = async (req, res) => {
    const authHeader = req.get('authorization');
    if (!authHeader) {
        return res.status(401).send("Não autorizado")
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, async function (erro) {
        if (erro) {
            return res.status(403).send('Token invalido');
        }
        try {
            const loja = await LojaDb.findById(req.params.id)
            if (loja == undefined) {
                return res.status(404).json({ message: 'Loja não encontrada' })
            }

            if (req.body.nome != null) {
                loja.nome = req.body.nome;
            }
            if (req.body.endereco != null) {
                loja.endereco = req.body.endereco;
            }
            if (req.body.redesSociais != null) {
                loja.redesSociais = req.body.redesSociais;
            }
            if (req.body.telefone != null) {
                loja.telefone = req.body.telefone;
            }

            const upLoja = await loja.save()
            return res.status(200).json({ message: 'Alteração realizada com sucesso!' })

        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    })
}

const deleteLoja = async (req, res) => {
    const authHeader = req.get('authorization');
    if (!authHeader) {
        return res.status(401).send("Não autorizado")
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, async function (erro) {
        if (erro) {
            return res.status(403).send('Token invalido');
        }
        try {
            const loja = await LojaDb.findByIdAndDelete(req.params.id)
            if (loja == undefined || loja == null) {
                return res.status(404).json({ message: 'Loja não encontrada' })
            }
            await loja.remove()
            return res.json({ message: 'Loja deletada com sucesso!' })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    })
}

module.exports = {
    createLoja,
    getlojas,
    findLoja,
    updateLoja,
    deleteLoja
}