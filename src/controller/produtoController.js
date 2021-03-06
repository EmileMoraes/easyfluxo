const mongoose = require('mongoose')
const ProductBD = require('../model/produtoModel')
const Lojadb = require('../model/lojasModel')
const utils = require('../utils/func')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = `${process.env.SECRET}`;

const createProduct = async (req, res) => {
    const authHeader = req.get('authorization');
    if (!authHeader) {
        return res.status(401).send("Não autorizado")
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, async function (erro) {
        if (erro) {
            return res.status(403).send('Token invalido');
        }
        const { nome, precoUnitario, estoque, categoria, loja } = req.body
        if ((nome == "" || nome == undefined) || (precoUnitario == "" || precoUnitario == undefined) || (estoque == "" || estoque == undefined) || (categoria == "" || categoria == undefined)) {
            return res.status(400).json({ error: 'Favor inserir ou preencher todos os campos' })
        }

        if (precoUnitario < 0 || estoque < 0) {
            return res.status(400).json({ message: 'Favor não inserir valores negativos' })
        }
        try {
            req.body.nome = utils.transfMaiuscula(req.body.nome)
            const productExiste = await ProductBD.findOne({ nome: req.body.nome })
            if (productExiste) {
                return res.status(409).json({ error: 'Produto já existe' })
            }
            const lojaExiste = await Lojadb.findById({ _id: loja })
            if (!lojaExiste) {
                return res.status(400).json({ message: 'Loja não existe' })
            }

            const product = await ProductBD.create(req.body)
            const novoproduct = await product.save()
            res.status(201).json({ message: 'Novo produto cadastrado com sucesso!', novoproduct })
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    })
}

const getAllProducts = async (req, res) => {
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
            const products = await ProductBD.find().populate({ path: 'loja', select: 'nome' });
            return res.status(200).json({ message: 'Produtos cadastrados no banco de dados', products });
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    })
}

const findProduct = async (req, res) => {
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
            const { busca } = req.query
            if (busca == "") {
                return res.status(400).json({ message: 'Favor inserir o nome do produto' })
            }
            const produto = await ProductBD.find({ nome: { $regex: `.*${busca}.*` } })
            if (produto == undefined) {
                return res.status(404).json({ message: 'Produto não encontrado, favor inserir nome valido' })
            }
            return res.status(200).json({ message: 'Produtos encontrados: ', produto })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })
}

const updateProduct = async (req, res) => {
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
            const product = await ProductBD.findById(req.params.id)

            if (product == undefined) {
                return res.status(404).json({ message: 'Produto não encontrado' })
            }

            if (req.body.nome != null) {
                product.nome = req.body.nome
            }
            if (req.body.precoUnitario != null) {
                product.precoUnitario = req.body.precoUnitario
            }
            if (req.body.estoque != null) {
                product.estoque = req.body.estoque
            }
            if (req.body.categoria != null) {
                product.categoria = req.body.categoria
            }

            product.nome = utils.transfMaiuscula(product.nome)
            const upProduct = await product.save()
            return res.status(200).json({ message: 'Alteração realizada com sucesso', upProduct })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    })
}

const deleteProduct = async (req, res) => {
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
            const product = await ProductBD.findById(req.params.id)
            if (product == undefined) {
                return res.status(400).json({ message: 'Por favor verificar e preencher ID correto' })
            }


            await product.remove()
            return res.json({ message: 'Produto deletado com sucesso!' })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    })
}

module.exports = {
    createProduct,
    getAllProducts,
    findProduct,
    updateProduct,
    deleteProduct
}