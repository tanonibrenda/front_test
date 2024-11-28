import React, { useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [listName, setListName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    tarea: '',
    prioridad: 'Hacer',
    estado: 'No Iniciado',
    fechaCreacion: '',
    fechaLimite: ''
  });
  const [editingTaskId, setEditingTaskId] = useState(null);

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

  const handleCreateTask = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', task);
      console.log('Tarea creada:', response.data);
      setTasks([...tasks, response.data.task]);
      setTask({
        tarea: '',
        prioridad: 'Hacer',
        estado: 'No Iniciado',
        fechaCreacion: '',
        fechaLimite: ''
      });
    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
  };

  const handleEditTask = async (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    setTask(taskToEdit);
    setEditingTaskId(id);
  };

  const handleUpdateTask = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${editingTaskId}`, task);
      console.log('Tarea actualizada:', response.data);
      setTasks(tasks.map((t) => (t.id === editingTaskId ? response.data.task : t)));
      setTask({
        tarea: '',
        prioridad: 'Hacer',
        estado: 'No Iniciado',
        fechaCreacion: '',
        fechaLimite: ''
      });
      setEditingTaskId(null);
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      console.log('Tarea eliminada');
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
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
      <div className="form-group">
        <label htmlFor="fechaCreacion">Fecha de Creación</label>
        <input
          type="date"
          className="form-control"
          id="fechaCreacion"
          name="fechaCreacion"
          value={task.fechaCreacion}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fechaLimite">Fecha Límite</label>
        <input
          type="date"
          className="form-control"
          id="fechaLimite"
          name="fechaLimite"
          value={task.fechaLimite}
          onChange={handleChange}
        />
      </div>
      
      {editingTaskId ? (
        <button className="btn btn-primary mt-3" onClick={handleUpdateTask}>Actualizar Tarea</button>
      ) : (
        <button className="btn btn-primary mt-3" onClick={handleCreateTask}>Crear Tarea</button>
      )}

      <hr />

      <h3>Lista de Tareas</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.tarea} - {task.prioridad} - {task.estado} - {task.fechaCreacion} - {task.fechaLimite}
            <button className="btn btn-warning ml-3" onClick={() => handleEditTask(task.id)}>Editar</button>
            <button className="btn btn-danger ml-3" onClick={() => handleDeleteTask(task.id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
