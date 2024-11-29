import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTask = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState({
    ID_Lista: '',
    Tarea: '',
    Prioridad: 'Hacer',
    Estado: 'No Iniciado',
    Fecha_Creación: '',
    Fecha_Límite: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTask(response.data.task || {});
      } catch (error) {
        console.error('Error al obtener la tarea:', error);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, task, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/my-lists');
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Editar Tarea</h2>
      <form onSubmit={handleUpdateTask}>
        {/* Campos para editar la tarea */}
        <div className="form-group">
          <label htmlFor="Tarea">Tarea</label>
          <input
            type="text"
            className="form-control"
            id="Tarea"
            name="Tarea"
            value={task.Tarea}
            onChange={handleChange}
            required
          />
        </div>
        {/* Añadir los demás campos aquí */}
        <button type="submit" className="btn btn-primary">Actualizar Tarea</button>
      </form>
    </div>
  );
};

export default EditTask;
