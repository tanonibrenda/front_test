import React, { useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [listName, setListName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    tarea: '',
    prioridad: 'Hacer',
    estado: 'No Iniciado'
  });

  const handleCreateList = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/lists', {
        name: listName
      });
      console.log('Lista creada:', response.data);
      setListName('');
    } catch (error) {
      console.error('Error al crear lista:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value
    });
  };

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      task
    ]);
    setTask({
      tarea: '',
      prioridad: 'Hacer',
      estado: 'No Iniciado'
    });
  };

  const handleCreateTask = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', task);
      console.log('Tarea creada:', response.data);
      setTasks([
        ...tasks,
        task
      ]);
      setTask({
        tarea: '',
        prioridad: 'Hacer',
        estado: 'No Iniciado'
      });
    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Crear Lista y Tareas</h2>
      
      <div className="form-group">
        <label htmlFor="listName">Nombre de la lista</label>
        <input
          type="text"
          className="form-control"
          id="listName"
          name="listName"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <button className="btn btn-primary mt-3" onClick={handleCreateList}>Crear Lista</button>
      </div>
      
      <hr />

      <h3>Crear Nueva Tarea</h3>
      <div className="form-group">
        <label htmlFor="tarea">Tarea</label>
        <input
          type="text"
          className="form-control"
          id="tarea"
          name="tarea"
          value={task.tarea}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="prioridad">Prioridad</label>
        <select
          className="form-control"
          id="prioridad"
          name="prioridad"
          value={task.prioridad}
          onChange={handleChange}
        >
          <option value="Hacer">Hacer</option>
          <option value="Planificar">Planificar</option>
          <option value="Delegar">Delegar</option>
          <option value="Ignorar">Ignorar</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="estado">Estado</label>
        <select
          className="form-control"
          id="estado"
          name="estado"
          value={task.estado}
          onChange={handleChange}
        >
          <option value="No Iniciado">No Iniciado</option>
          <option value="En Curso">En Curso</option>
          <option value="Bloqueado">Bloqueado</option>
          <option value="Completado">Completado</option>
        </select>
      </div>
      
      <button className="btn btn-secondary mt-3" onClick={handleAddTask}>Agregar Tarea</button>
      <button className="btn btn-primary mt-3 ml-3" onClick={handleCreateTask}>Crear Tarea</button>

      <hr />

      <h3>Lista de Tareas</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.tarea} - {task.prioridad} - {task.estado}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
