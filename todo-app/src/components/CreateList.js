import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateList = () => {
  const [lista, setLista] = useState({
    nombre: '',
    tareas: [{
      tarea: '',
      prioridad: 'Hacer',
      estado: 'No Iniciado',
      comentario: '',
      fechaInicio: '',
      fechaFin: ''
    }]
  });

  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const tareas = [...lista.tareas];
    tareas[index][name] = value;
    setLista({
      ...lista,
      tareas
    });
  };

  const handleAddTask = () => {
    setLista({
      ...lista,
      tareas: [
        ...lista.tareas,
        {
          tarea: '',
          prioridad: 'Hacer',
          estado: 'No Iniciado',
          comentario: '',
          fechaInicio: '',
          fechaFin: ''
        }
      ]
    });
  };

  const handleChangeNombre = (e) => {
    setLista({
      ...lista,
      nombre: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
  
      // Enviar datos de la lista al backend
      await axios.post('http://localhost:5000/api/lists', {
        name: lista.nombre,
        tasks: lista.tareas
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      // Redirigir a la página de listas después de crear la lista
      navigate('/task-list');
    } catch (error) {
      console.error('Error al crear la lista:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };
  
  return (
    <div className="container mt-5">
      <h2>Crear Lista</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre de la lista</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={lista.nombre}
            onChange={handleChangeNombre}
            required
          />
        </div>
        {lista.tareas.map((tarea, index) => (
          <div key={index}>
            <div className="form-group">
              <label htmlFor={`tarea-${index}`}>Tarea</label>
              <input
                type="text"
                className="form-control"
                id={`tarea-${index}`}
                name="tarea"
                value={tarea.tarea}
                onChange={(e) => handleChange(e, index)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`prioridad-${index}`}>Prioridad</label>
              <select
                className="form-control"
                id={`prioridad-${index}`}
                name="prioridad"
                value={tarea.prioridad}
                onChange={(e) => handleChange(e, index)}
                required
              >
                <option value="Hacer">Hacer</option>
                <option value="Planificar">Planificar</option>
                <option value="Delegar">Delegar</option>
                <option value="Ignorar">Ignorar</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor={`estado-${index}`}>Estado</label>
              <select
                className="form-control"
                id={`estado-${index}`}
                name="estado"
                value={tarea.estado}
                onChange={(e) => handleChange(e, index)}
                required
              >
                <option value="No Iniciado">No Iniciado</option>
                <option value="En curso">En curso</option>
                <option value="Bloqueado">Bloqueado</option>
                <option value="Completado">Completado</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor={`comentario-${index}`}>Comentario</label>
              <input
                type="text"
                className="form-control"
                id={`comentario-${index}`}
                name="comentario"
                value={tarea.comentario}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`fechaInicio-${index}`}>Fecha Inicio</label>
              <input
                type="date"
                className="form-control"
                id={`fechaInicio-${index}`}
                name="fechaInicio"
                value={tarea.fechaInicio}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`fechaFin-${index}`}>Fecha Fin</label>
              <input
                type="date"
                className="form-control"
                id={`fechaFin-${index}`}
                name="fechaFin"
                value={tarea.fechaFin}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={handleAddTask}>Agregar Tarea</button>
        <button type="submit" className="btn btn-primary ml-3">Crear Lista</button>
      </form>
    </div>
  );
};

export default CreateList;

