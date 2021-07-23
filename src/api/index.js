const express = require('express')
const {uuid} = require('uuidv4')
const cors = require('cors')
require('dotenv').config()


const app = express();
const port = process.env.PORT||8000

app.use(express.json());
app.use(cors());

const tarefas = [];

app.get('/listar', (req, res) => {
  res.send(tarefas)
})

app.post('/adicionar', (req, res) => {
  const {title,message} = req.body;

  tarefas.push({id: uuid(),title,message})

  res.status(201).send('tarefa cadastrada');
})

app.put('/mudar/:id', (req, res) => {
  const id = req.params.id;
  const {title,message} = req.body;
  const position = tarefas.findIndex((tarefa) => tarefa.id == id);

  if (position < 0 ){
    return res.status(404).send('try again')
  }

  const tarefa = {
    id,
    title,
    message
  }

  tarefas[position] = tarefa;

  res.status(200).json(tarefa);
});

app.delete('/apaga/:id', (req, res) =>{
  const id = req.params.id;
  const position = tarefas.findIndex((tarefa) => tarefa.id == id);

  if (position < 0 ){
    return res.status(404).send('try again');
  }

  tarefas.splice(position,1);
  res.status(200).send('alteração feita');
})

app.listen(port, () => console.log(`Aplicação rodando na porta: ${port}!`))
