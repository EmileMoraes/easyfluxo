const express = require('express')
const router = express.Router();
const controller = require('../controller/lojaController')

router.post('/createLoja', controller.createLoja)

router.get('/', controller.getlojas)
router.get('/:id', controller.findLoja)

router.patch('/:id', controller.updateLoja)

router.delete('/:id', controller.deleteLoja)

module.exports = router