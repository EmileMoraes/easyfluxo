const express = require('express')
const router = express.Router();
const controller = require('../controller/userAdminController')

router.post('/create', controller.createUsuario)

router.delete('/:id', controller.deleteUsuario)

router.post("/login", controller.login);

router.get('/', controller.getUsuario)


module.exports = router