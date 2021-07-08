
require('dotenv-safe').config();
const VendaDb = require('../model/vendaModel');
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken');

const getVendas = async (req, res) => {
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
      const vendas = await VendaDb.find().populate({ path: 'loja', select: 'nome' });
      return res.status(200).json({ message: 'Vendas dia: ', vendas });
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  })
}

const createVend = async (req, res) => {
  try {
    const authHeader = req.get('authorization');
    if (!authHeader) {
      return res.status(401).send("Não autorizado")
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, async function (erro) {
      if (erro) {
        return res.status(403).send('Token invalido');
      }

      const{ dia, quantItensVendidoDia, valorMontanteDia, despesaPessoal, valorFornecedor, loja} = req.body

      if(dia == "" || quantItensVendidoDia == "" || valorMontanteDia =="" || despesaPessoal == "" || valorFornecedor == "" || loja == ""){
        return res.status(400).json({message: 'Favor preencher todos os campos'})
      }

      if(quantItensVendidoDia < 0 || despesaPessoal < 0 || valorFornecedor < 0 || valorMontanteDia < 0){
        return res.status(400).json({message: 'Error, não é possivel inserir números negativos'})
      }

      const venda = await VendaDb.create(req.body)

      const caixaValorDia = venda.valorMontanteDia - (venda.despesaPessoal + venda.valorFornecedor)

      if(caixaValorDia < 0){
        venda.valorPrejuizo = caixaValorDia
      } else {
        venda.valorLucro = caixaValorDia
      }

      const novaVenda = await venda.save()
      res.status(201).json({ message: 'Nova venda cadastrada com sucesso!', novaVenda })
    })
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}

const updateVend = async (req, res) => {
  try {
    const authHeader = req.get('authorization');
    if (!authHeader) {
      return res.status(401).send("Não autorizado")
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, async function (erro) {
      if (erro) {
        return res.status(403).send('Token invalido');
      }
      const venda = await VendaDb.findById(req.params.id)
      if (venda == undefined) {
        return res.status(404).json({ message: 'Registro de venda não encontrado' })
      }
      if (req.body.dia != null) {
        venda.dia = req.body.dia;
      }
      if (req.body.quantItensVendidoDia != null) {
        venda.quantItensVendidoDia = req.body.quantItensVendidoDia;
      }
      if (req.body.despesaPessoal != null) {
        venda.despesaPessoal = req.body.despesaPessoal;
      }
      if (req.body.valorFornecedor != null) {
        venda.valorFornecedor = req.body.valorFornecedor;
      }
      if (req.body.loja != null) {
        venda.loja = req.body.loja;
      }

      const upVenda = await venda.save()
      return res.status(200).json({message: 'Alteração realizada com sucesso!', upVenda})
    })
  } catch(err){
    return res.status(500).json({ message: err.message })
  }
}

const deleteVend = async (req, res) => {
    try {
      const authHeader = req.get('authorization');
      if (!authHeader) {
        return res.status(401).send("Não autorizado")
      }

      const token = authHeader.split(' ')[1];
      jwt.verify(token, SECRET, async function (erro) {
        if (erro) {
          return res.status(403).send('Token invalido');
        }

        const venda = await VendaDb.findById(req.params.id)
        if (venda == null) {
          return res.status(404).json({ message: 'Venda não encontrada' })
        }
        await venda.remove()
        return res.json('Registro removido')
      })
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }

  module.exports = {
    getVendas,
    createVend,
    deleteVend,
    updateVend
  }