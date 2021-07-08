const express = require('express')
const router = express.Router();
const controller = require('../controller/produtoController')

router.post('/create', controller.createProduct)

router.get('/', controller.getAllProducts)
router.get('/findProduto', controller.findProduct)

router.patch('/:id', controller.updateProduct)

router.delete('/:id', controller.deleteProduct)

module.exports = router