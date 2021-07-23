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
  try {

    const {title,message} = req.body;
    const id = uuid();

    tarefas.push({id,title,message})

    res.status(201).json({id,title,message});

  } catch (error) {
  
    res.status(500).send(error);
  }
})

app.put('/mudar/:id', (req, res) => {
 try {
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
 } catch (error) {

  res.status(500).send(error);
 }
});

app.delete('/apaga/:id', (req, res) =>{
try {
  const id = req.params.id;
  const position = tarefas.findIndex((tarefa) => tarefa.id == id);

  if (position < 0 ){
    return res.status(404).send('try again');
  }

  tarefas.splice(position,1);
  res.status(200).send('alteração feita');

} catch (error) {
  res.status(500).send(error);
}
})

app.listen(port, () => console.log(`Aplicação rodando na porta: ${port}!`))
