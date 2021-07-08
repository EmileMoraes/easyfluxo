const express = require('express')
const cors = require('cors')
const lojaRouter = require('./routes/lojaRouter')
const productRouter = require('./routes/produtoRouter')
const vendaRouter = require('./routes/vendaRouter')
const usuarioRouter = require('./routes/userRouter')
const index = require('./routes/index')
const  swaggerUi  =  require('swagger-ui-express')  
const  swaggerDocument  =  require('../swagger.json')

const app = express()


app.use(cors())

const db = require('./data/dataBase')
db.connect()

app.use(express.json())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument) ) ;

app.use('/lojas', lojaRouter)
app.use('/produtos', productRouter)
app.use('/vendas', vendaRouter)
app.use('/usuarios', usuarioRouter)

app.get('/', (req, res) => {
    res.send('Bem vindes ao EasyFluxo')
})

module.exports = app