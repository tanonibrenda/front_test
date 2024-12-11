import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [listName, setListName] = useState('');
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    ID_Lista: '',
    Tarea: '',
    Prioridad: 'Hacer',
    Estado: 'No Iniciado',
    Fecha_Creación: '',
    Fecha_Límite: ''
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = localStorage.getItem('token'); 
        if (!token){
          navigate('/login');
          return;
        }
        //
        // const response = await axios.get('http://localhost:5000/api/task', {
          const response = await axios.get('http://localhost:5000/api/lists', {
          headers: { Authorization: `Bearer ${token}` } 

        });
        setLists(response.data.lists || []);
        console.log('Lists:', response.data.lists);
      } catch (error) {
        console.error('Error al cargar listas:', error);
        if (error.response && error.response.status === 401){
          navigate('/login')
        }
      }
    };
    fetchLists();
  }, [navigate]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token'); 
        if (!token){
          navigate('/login');
          return;
        }
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` } 
        });
        setTasks(response.data.tasks || []);
        console.log('Tasks:', response.data.tasks);
      } catch (error) {
        console.error('Error al cargar tareas:', error);
        if (error.response && error.response.status === 401){
          navigate('/login')
        }
      }
    };
    fetchTasks();
  }, [navigate]);

  const handleCreateList = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.post('http://localhost:5000/api/lists', { name: listName }, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      setLists([...lists, response.data]);
      setListName('');
    } catch (error) {
      console.error('Error al crear lista:', error);
      if (error.response && error.response.status === 401){
        navigate('/login');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleUpdateList = async (id, updatedName) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/lists/${id}`, { name: updatedName }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLists(lists.map((list) => (list.id === id ? response.data : list)));
    } catch (error) {
      console.error(`Error al actualizar la lista con ID ${id}:`, error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };
  
  // const handleDeleteList = async (id) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     await axios.delete(`http://localhost:5000/api/lists/${id}`, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  //     setLists(lists.filter((list) => list.id !== id));
  //   } catch (error) {
  //     console.error(`Error al eliminar la lista con ID ${id}:`, error);
  //     if (error.response && error.response.status === 401) {
  //       navigate('/login');
  //     }
  //   }
  // };
  

  const handleDeleteList = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
      if (!token) {
        navigate('/login'); // Redirige si no hay token
        return;
      }
  
      // Realizar la solicitud DELETE con el token en los headers
      await axios.delete(`http://localhost:5000/api/lists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Actualizar el estado local después de borrar
      setLists(lists.filter((list) => list.id !== id));
    } catch (error) {
      console.error(`Error al eliminar la lista con ID ${id}:`, error);
      if (error.response && error.response.status === 401) {
        navigate('/login'); // Redirige si el token es inválido
      }
    }
  };
  

  //
  const handleCreateTask = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.post('http://localhost:5000/api/tasks', {
        ID_Lista: task.ID_Lista,
        Tarea: task.Tarea,
        Prioridad: task.Prioridad,
        Estado: task.Estado,
        Fecha_Creación: task.Fecha_Creación,
        Fecha_Límite: task.Fecha_Límite
      }, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      setTasks([...tasks, response.data.task]);
      setTask({
        ID_Lista: '',
        Tarea: '',
        Prioridad: 'Hacer',
        Estado: 'No Iniciado',
        Fecha_Creación: '',
        Fecha_Límite: ''
      });
    } catch (error) {
      console.error('Error al crear tarea:', error);
      if (error.response && error.response.status === 401){
        navigate('/login');
      }
    }
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((t) => t.ID_Tarea === id);
    if (taskToEdit) {
      setTask({
        ID_Lista: taskToEdit.ID_Lista || '',
        Tarea: taskToEdit.Tarea || '',
        Prioridad: taskToEdit.Prioridad || 'Hacer',
        Estado: taskToEdit.Estado || 'No Iniciado',
        Fecha_Creación: taskToEdit.Fecha_Creación || '',
        Fecha_Límite: taskToEdit.Fecha_Límite || ''
      });
      setEditingTaskId(id);
      setTimeout(() => {
        console.log('Editing Task ID:', id);
      }, 0);

    }
  };

  const handleUpdateTask = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.put(`http://localhost:5000/api/tasks/${editingTaskId}`, {
        ID_Lista: task.ID_Lista,
        Tarea: task.Tarea,
        Prioridad: task.Prioridad,
        Estado: task.Estado,
        Fecha_Creación: task.Fecha_Creación,
        Fecha_Límite: task.Fecha_Límite
      }, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      setTasks(tasks.map((t) => (t.ID_Tarea === editingTaskId ? response.data.task : t)));
      setTask({
        ID_Lista: '',
        Tarea: '',
        Prioridad: 'Hacer',
        Estado: 'No Iniciado',
        Fecha_Creación: '',
        Fecha_Límite: ''
      });
      setEditingTaskId(null);
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      if (error.response && error.response.status === 401){
        navigate('login')
      }
    }
  };
  

  const handleDeleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token'); 
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      setTasks(tasks.filter((t) => t.ID_Tarea !== id));
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };
  const resetTaskForm = () => {
    setTask({
      ID_Lista: '',
      Tarea: '',
      Prioridad: 'Hacer',
      Estado: 'No Iniciado',
      Fecha_Creación: '',
      Fecha_Límite: ''
    });
    setEditingTaskId(null);
  };
  
  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      role="main"
      aria-label="Formulario de gestión de tareas y listas"
    >
      <div
        className="card shadow-lg"
        style={{
          width: '80%',
          maxWidth: '1000px', 
          height: '80%',
          overflowY: 'auto', 
        }}
      >
        <div className="card-body">
          <h1 className="text-center text-primary mb-4">Crear Lista y Tareas</h1>
          
          {/* Formulario para crear listas */}
          <form aria-labelledby="form-crear-lista">
            <div className="form-group">
              <label htmlFor="listName" className="form-label">
                Nombre de la lista
              </label>
              <input
                type="text"
                className="form-control"
                id="listName"
                name="listName"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                aria-required="true"
                placeholder='Ingrese el nombre de su lista'
              />
              <button
                type="button"
                className="btn btn-primary py-2 fw-bold mt-2 item-center"
                onClick={handleCreateList}
              >
                Crear Lista
              </button>
            </div>
          </form>
  
          <hr />
  
          {/* Listado de listas */}
          <section aria-labelledby="listas">
            <h3 id="listas">Listas</h3>
            <ul className="list-unstyled">
              {lists.length > 0 &&
                lists.map((list, index) => (
                  <li key={`${list.id}-${index}`} className="mb-2">
                    <span>{list.name}</span>
                    <button
                      className="btn btn-warning ml-3"
                      onClick={() =>
                        handleUpdateList(list.id, prompt('Nuevo nombre de la lista:', list.name))
                      }
                      aria-label={`Editar lista ${list.name}`}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger ml-3"
                      onClick={() => handleDeleteList(list.id)}
                      aria-label={`Eliminar lista ${list.name}`}
                    >
                      Borrar
                    </button>
                  </li>
                ))}
            </ul>
          </section>
  
          <hr />
  
          {/* Formulario para crear tareas */}
          <form aria-labelledby="form-crear-tarea">
            {/* <h3 id="form-crear-tarea">Crear Nueva Tarea</h3> */}
            <h3>{editingTaskId ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h3>
            <div className="form-group">
              <label htmlFor="ID_Lista" className="form-label">
                Lista
              </label>
              <select
                className="form-control"
                id="ID_Lista"
                name="ID_Lista"
                value={task.ID_Lista}
                onChange={handleChange}
                aria-required="true"
              >
                <option value="">Seleccione una lista</option>
                {lists.length > 0 &&
                  lists.map((list) => (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="Tarea" className="form-label">
                Tarea
              </label>
              <input
                type="text"
                className="form-control"
                id="Tarea"
                name="Tarea"
                value={task.Tarea}
                onChange={handleChange}
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Prioridad" className="form-label">
                Prioridad
              </label>
              <select
                className="form-control"
                id="Prioridad"
                name="Prioridad"
                value={task.Prioridad}
                onChange={handleChange}
                aria-required="true"
              >
                <option value="Hacer">Hacer</option>
                <option value="Planificar">Planificar</option>
                <option value="Delegar">Delegar</option>
                <option value="Ignorar">Ignorar</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="Estado" className="form-label">
                Estado
              </label>
              <select
                className="form-control"
                id="Estado"
                name="Estado"
                value={task.Estado}
                onChange={handleChange}
                aria-required="true"
              >
                <option value="No Iniciado">No Iniciado</option>
                <option value="En Curso">En Curso</option>
                <option value="Bloqueado">Bloqueado</option>
                <option value="Completado">Completado</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="Fecha_Creación" className="form-label">
                Fecha de Creación
              </label>
              <input
                type="date"
                className="form-control"
                id="Fecha_Creación"
                name="Fecha_Creación"
                value={task.Fecha_Creación}
                onChange={handleChange}
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Fecha_Límite" className="form-label">
                Fecha Límite
              </label>
              <input
                type="date"
                className="form-control"
                id="Fecha_Límite"
                name="Fecha_Límite"
                value={task.Fecha_Límite}
                onChange={handleChange}
                aria-required="true"
              />
            </div>
                  
            {editingTaskId ? (
  <>
    <button
      type="button"
      className="btn btn-success mt-3 me-2"
      onClick={handleUpdateTask}
    >
      Guardar Cambios
    </button>
    <button
      type="button"
      className="btn btn-secondary mt-3"
      onClick={resetTaskForm}
    >
      Cancelar Cambios
    </button>
  </>
) : (
  <button
    type="button"
    className="btn btn-primary mt-3"
    onClick={handleCreateTask}
  >
    Crear Tarea
  </button>
)}

            
          </form>
  
          <hr />
  
          {/* Lista de tareas */}
          <section aria-labelledby="lista-tareas">
            <h3 id="lista-tareas">Lista de Tareas</h3>
            <ul className="list-unstyled">
              {tasks.length > 0 &&
                tasks.map((task, index) => (
                  <li key={`${task.ID_Tarea}-${index}`} className="mb-2">
                    {task.Tarea} - {task.Prioridad} - {task.Estado} - {task.Fecha_Creación} -{' '}
                    {task.Fecha_Límite} - Lista:{' '}
                    {lists.find((list) => Number(list.id) === Number(task.ID_Lista))?.name || 'Sin lista'}
                    <button
                      className="btn btn-warning ml-3"
                      onClick={() => handleEditTask(task.ID_Tarea)}
                      aria-label={`Editar tarea ${task.Tarea}`}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger ml-3"
                      onClick={() => handleDeleteTask(task.ID_Tarea)}
                      aria-label={`Eliminar tarea ${task.Tarea}`}
                    >
                      Borrar
                    </button>
                  </li>
                ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
export default TaskList;
