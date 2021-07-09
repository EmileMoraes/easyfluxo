const userAdminDB = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const utils = require('../utils/func')

const getUsuario = async (req, res) => {

    const authHeader = req.get('authorization');
    if (!authHeader) {
        return res.status(401).send("Não autorizado")
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, async function (erro) {
        if (erro) {
            return res.status(403).send('Token invalido');
        }

        const usuarios = await userAdminDB.find()
        return res.status(200).json({ message: 'Administradores cadastrados no banco de dados', usuarios });
    })
}

const createUsuario = async (req, res) => {

    const senhaHash = bcrypt.hashSync(req.body.senha, 10);
    req.body.senha = senhaHash

    const { nome, email, senha, isAdmin } = req.body

    if (email == "" || senha == "" || nome == "" || isAdmin == "") {
        return res.status(400).json({ message: 'Favor preencher todos campos' })
    }

    const validaEmail = utils.validadeEmail(email)
    if (!validaEmail) {
        return res.status(400).json({ message: 'Favor inserir um email valido' })
    }
    const userExiste = await userAdminDB.findOne({ email: req.body.email })
    if (userExiste) {
        return res.status(409).json({ error: 'User já existe' })
    }
    const usuario = await userAdminDB.create(req.body)
    const novoUsuario = usuario.save()
    return res.status(201).json({ message: 'Novo usuario criado com sucesso:', usuario })

}

const deleteUsuario = async (req, res) => {
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
            const usuario = await userAdminDB.findById(req.params.id)
            if (userAdminDB == null) {
                return res.status(404).json({ message: 'Administrador não encontrado' })
            }
            await usuario.remove()
            res.json({ message: 'Administrador deletado com sucesso!' })

        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    })
}

const login = async (req, res) => {
    const { email, senha } = req.body

    if (email == "" || senha == "" || senha == undefined) {
        return res.status(400).json({ message: 'Favor preencher os campos e-mail e senha ' })
    }

    const usuario = await userAdminDB.findOne({ email: req.body.email })
    if (!usuario) {
        return res.status(404).send(`Não existe administrador com email ${req.body.email}`);
    }

    const senhaValida = bcrypt.compareSync(req.body.senha, usuario.senha);

    if (!senhaValida) {
        return res.status(403).send(`Senha invalida ${senhaValida}`);
    }
    try {
        const token = jwt.sign({ email: req.body.email }, SECRET);

        return res.status(200).json(token);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = {
    createUsuario,
    getUsuario,
    deleteUsuario,
    login
}