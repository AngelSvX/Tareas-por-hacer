const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())


const mysql = require('mysql2')
const db = mysql.createConnection({
  host: 'your_host',
  user: 'your_user',
  password: 'your_password',
  database: 'your_database'
});


app.post("/createTask", (req, res) =>{
  const task = req.body.task

  db.query('INSERT INTO tareas(tareas) VALUES(?)', [task],
  (err, result) =>{
    if(err){
      console.log(err)
    }else{
      res.send(result)
    }
  }
  )
})

app.get("/tasks", (req,res) =>{

  db.query('SELECT * FROM tareas',
  (err, result) =>{
    if(err){
      console.log(err)
    }else{
      res.send(result)
    }
  }
  )
})

// PUT

app.put("/updateTask", (req, res) =>{
  const id = req.body.id
  const task = req.body.task

  db.query('UPDATE tareas SET tareas=? WHERE id=?', [task, id],
  (err, result) =>{
    if(err){
      console.log(err)
    }else{
      res.send(result)
    }
  }
  )
})

// DELETE

app.delete("/deleteTask/:id", (req, res) =>{
  const id = req.params.id

  db.query('DELETE FROM tareas WHERE id=?', [id],
  (err, result) =>{
    if(err){
      console.log(err)
    }else{
      res.send(result)
    }
  }
  )
})

app.listen(3001, () =>{
  console.log('Port 3001 is running.')
})