const express = require('express')
const router = express.Router();
const controller = require('../controller/vendaController')

router.post('/create', controller.createVend)

router.get('/', controller.getVendas)

router.patch('/:id', controller.updateVend)

router.delete('/:id', controller.deleteVend)


module.exports = router