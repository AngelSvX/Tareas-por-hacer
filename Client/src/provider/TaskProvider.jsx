import React, { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import Axios from 'axios'
import Swal from 'sweetalert2'

const TaskContext = createContext();

export const MyContext = ({children}) =>{

  //Este Estado nos ayuda a obtener el valor que se escribe en el input

  const [task, setTask] = useState('')

  // a continuación creamos una función asíncrona con trycatch para hacer una petición Axios
  // con el puerto elegido por nosotros más la ruta, dentro de esta petición, almacenaremos el estado 'task' en otra
  // variable llamada igual, la cual servirá para dar como referencia al backend
  const addTask = async () =>{
    try {
      await Axios.post("http://localhost:3001/createTask", {
        task: task,
      })
      getTask()
      setTask('')
      setLimitLetters(0)
    } catch (error) {
      
    }
  }

  // a continuación creamos un estado el cual significará una lista vacía, en esta lista queremos almacenar los datos
  // que traigamos de la base de datos mediante el backend
  const [taskList, setTaskList] = useState([])

  // Luego creamos otra función asíncrona con trycatch y hacemos la petición axios 'GET' hacia la dirección que nosotros definimos en el backend 
  
  const getTask = async () =>{
    try {

      const response = await Axios.get('http://localhost:3001/tasks');

      setTaskList(response.data)

    } catch (error) {
      
    }
  }

  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(0)

  const taskEdit = async ( val ) =>{
    try {
      setEdit(true);

      setTask(val.tareas)
      setId(val.id)

    } catch (error) {
      console.log(error)
    }
  }

    const updateTask = async () =>{
      try {
        await Axios.put("http://localhost:3001/updateTask", {
          id: id,
          task: task
        })
        getTask()
        setLimitLetters(0)
      } catch (error) {
        console.log(error)
      }
    }

    const [limitLetters, setLimitLetters] = useState(0);

    // DELETE

    const deleteTask = async (id) =>{

      await Swal.fire({
        title: "¿Estás seguro de eliminar la tarea?",
        text: "No podrás revertir la acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, deseo eliminarla.",
        cancelButtonText: "No, deseo revertirlo.",
      }).then((res) =>{
        if (res.isConfirmed){
          Axios.delete(`http://localhost:3001/deleteTask/${id}`)
          getTask()
          setTask("")
          Swal.fire({
            icon: "success",
            title: "Completo!",
            text: "Tarea eliminada correctamente",
            timer: 2000
          });
        }
      })
    }

  return(
    <TaskContext.Provider value={{setTask, task, addTask, taskList, getTask, taskEdit, edit, setEdit, updateTask, limitLetters, setLimitLetters, deleteTask}}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTaskContext = () =>{
  return useContext(TaskContext)
}