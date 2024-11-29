import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyList = () => {
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.get('http://localhost:5000/api/lists', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLists(response.data.lists || []);
      } catch (error) {
        console.error('Error al obtener listas:', error);
      }
    };
    fetchLists();
  }, [navigate]);

  const fetchTasks = async (listId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/tasks?listId=${listId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
    }
  };

  const handleSelectList = (listId) => {
    setSelectedListId(listId);
    fetchTasks(listId);
  };

  const handleEditTask = (taskId) => {
    navigate(`/edit-task/${taskId}`);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter((task) => task.ID_Tarea !== taskId));
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Mis Listas</h2>
      <ul>
        {lists.length > 0 ? (
          lists.map((list) => (
            <li key={list.id} onClick={() => handleSelectList(list.id)}>{list.name}</li>
          ))
        ) : (
          <li>No hay listas disponibles</li>
        )}
      </ul>
      <hr />
      {selectedListId && (
        <>
          <h3>Tareas en la Lista</h3>
          <ul>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <li key={task.ID_Tarea}>
                  {task.Tarea} - {task.Prioridad} - {task.Estado} - {task.Fecha_Creación} - {task.Fecha_Límite}
                  <button className="btn btn-warning ml-3" onClick={() => handleEditTask(task.ID_Tarea)}>Editar</button>
                  <button className="btn btn-danger ml-3" onClick={() => handleDeleteTask(task.ID_Tarea)}>Borrar</button>
                </li>
              ))
            ) : (
              <li>No hay tareas disponibles</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default MyList;

