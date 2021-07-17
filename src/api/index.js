const express = require('express')
require('dotenv').config()

const app = express()
const port = 8000

app.get('/recado/lista', (req, res) => {
  res.send({"teste":"ashdbahds"});
})

app.post('/recado/cria', (req, res) => {
  red.send(req);
})

app.listen(port, () => console.log(`Aplicação rodando na porta: ${port}!`))
