const app = require('./src/app')
require('dotenv').config()

const port = process.env.PORT
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))