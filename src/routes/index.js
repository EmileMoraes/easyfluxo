const express = require("express")
const router = express.Router()

router.get("/", function (req, res) {
    res.status(200).send({
        title: "EasyFluxo - Seu melhor controle financeiro. {Reprograma} - Projeto Final",
        version: "1.0.0",
        mensagem: "Bem vindes"
    })
})

module.exports = router