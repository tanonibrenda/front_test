import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [listName, setListName] = useState('');
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const listRef = useRef(null)
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
          console.warn('TaskList.js - No token found, redirecting to login');
          navigate('/login');
          return;
        }
        console.log('TaskList.js - Fetching lists with token:', token);
        const response = await axios.get('http://localhost:5000/api/lists', {
          headers: { Authorization: `Bearer ${token}` } 
        });
        console.log('TaskList.js - Lists fetched:', response.data.lists);
        setLists(response.data.lists || []);
      } catch (error) {
        console.error('TaskList.js - Error al cargar listas:', error);
        if (error.response && error.response.status === 401){
          navigate('/login');
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
          console.warn('TaskList.js - No token found, redirecting to login');
          navigate('/login');
          return;
        }
        console.log('TaskList.js - Fetching tasks with token:', token);
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` } 
        });
        console.log('TaskList.js - Datos de tareas recibidos:', response.data.tasks);
        setTasks(response.data.tasks || []);
      } catch (error) {
        console.error('TaskList.js - Error al cargar tareas:', error);
        if (error.response && error.response.status === 401){
          navigate('/login');
        }
      }
    };
    fetchTasks();
  }, [navigate]);
  
  // Nuevo useEffect para depurar editingTaskId
  useEffect(() => {
    console.log('TaskList.js - Estado editingTaskId actualizado a:', editingTaskId);
  }, [editingTaskId]);
  

  useEffect(()=>{
    if(listRef.current){
      listRef.current.setAttribute('aria-live', 'polite')
    }
  },[lists]

  );
  
  const handleCreateList = async () => {
    try {
      const token = localStorage.getItem('token'); 
      console.log('TaskList.js - Creating list with name:', listName);
      const response = await axios.post('http://localhost:5000/api/lists', { name: listName }, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      console.log('TaskList.js - List created:', response.data);
      setLists([...lists, response.data]);
      setListName('');
    } catch (error) {
      console.error('TaskList.js - Error al crear lista:', error);
      if (error.response && error.response.status === 401){
        navigate('/login');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('TaskList.js - handleChange - name:', name, ', value:', value);
    setTask({ ...task, [name]: value });
  };

  const handleUpdateList = async (id, updatedName) => {
    try {
      const token = localStorage.getItem('token');
      console.log(`TaskList.js - Updating list with ID ${id} and name:`, updatedName);
      const response = await axios.put(`http://localhost:5000/api/lists/${id}`, { name: updatedName }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('TaskList.js - List updated:', response.data);
      setLists(lists.map((list) => (list.id === id ? response.data : list)));
    } catch (error) {
      console.error(`TaskList.js - Error al actualizar la lista con ID ${id}:`, error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

 const handleDeleteList = async (id) => {
  try {
    const token = localStorage.getItem('token');
    console.log('TaskList.js - handleDeleteList - Token:', token);
    
    if (!token) {
      console.warn('TaskList.js - handleDeleteList - No token found, redirecting to login');
      navigate('/login');
      return;
    }

    console.log(`TaskList.js - handleDeleteList - Deleting list with ID: ${id}`);
    await axios.delete(`http://localhost:5000/api/lists/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('TaskList.js - handleDeleteList - List deleted, updating state');
    setLists(lists.filter((list) => list.id !== id));
  } catch (error) {
    console.error(`TaskList.js - Error al eliminar la lista con ID ${id}:`, error);
    if (error.response && error.response.status === 401) {
      navigate('/login');
    }
  }
};

const handleCreateTask = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('TaskList.js - handleCreateTask - Token:', token);
    
    console.log('TaskList.js - handleCreateTask - Creating task with data:', task);
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
    console.log('TaskList.js - handleCreateTask - Task created:', response.data.task);
    
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
    console.error('TaskList.js - Error al crear tarea:', error);
    if (error.response && error.response.status === 401) {
      navigate('/login');
    }
  }
};


const handleEditTask = (id) => {
  console.log('TaskList.js - handleEditTask - ID recibido para editar:', id);
  console.log('TaskList.js - handleEditTask - Tareas disponibles:', tasks);

  const taskToEdit = tasks.find(
    (t) => Number(t.ID_Tarea || t.id) === Number(id)
  );

  if (taskToEdit) {
    console.log('TaskList.js - handleEditTask - Tarea encontrada para editar:', taskToEdit);
    setTask({
      ID_Lista: taskToEdit.ID_Lista || '',
      Tarea: taskToEdit.Tarea || '',
      Prioridad: taskToEdit.Prioridad || 'Hacer',
      Estado: taskToEdit.Estado || 'No Iniciado',
      Fecha_Creación: taskToEdit.Fecha_Creación || '',
      Fecha_Límite: taskToEdit.Fecha_Límite || ''
    });
    setEditingTaskId(id);
    console.log('TaskList.js - handleEditTask - Editing Task ID:', id);
  } else {
    console.error('TaskList.js - handleEditTask - No se encontró la tarea con el ID:', id);
  }
};

const handleUpdateTask = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('TaskList.js - handleUpdateTask - Token:', token);
    
    console.log('TaskList.js - handleUpdateTask - Datos enviados:', {
      editingTaskId,
      ID_Lista: task.ID_Lista,
      Tarea: task.Tarea,
      Prioridad: task.Prioridad,
      Estado: task.Estado,
      Fecha_Creación: task.Fecha_Creación,
      Fecha_Límite: task.Fecha_Límite
    });

    if (!task.ID_Lista || !task.Tarea) {
      console.error('TaskList.js - handleUpdateTask - Faltan datos obligatorios: ID_Lista o Tarea.');
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

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

    console.log('TaskList.js - handleUpdateTask - Respuesta del servidor:', response.data);

    if (!response.data) { 
      console.error('TaskList.js - handleUpdateTask - Tarea actualizada pero no recibida en la respuesta:', response.data); 
      return; }
    setTasks(tasks.map((t) => (t.ID_Tarea === editingTaskId ? response.data.task : t)));
    resetTaskForm();
  } catch (error) {
    console.error('TaskList.js - Error al actualizar tarea:', error);
    if (error.response) {
      console.error('TaskList.js - handleUpdateTask - Respuesta del servidor:', error.response.data);
    }
    if (error.response && error.response.status === 401) {
      navigate('/login');
    }
  }
};

const handleDeleteTask = async (id) => {
  try {
    const token = localStorage.getItem('token');
    console.log('TaskList.js - handleDeleteTask - Token:', token);
    
    console.log(`TaskList.js - handleDeleteTask - Deleting task with ID: ${id}`);
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('TaskList.js - handleDeleteTask - Task deleted, updating state');
    setTasks(tasks.filter((t) => t.ID_Tarea !== id));
  } catch (error) {
    console.error('TaskList.js - Error al eliminar tarea:', error);
  }
};

const resetTaskForm = () => {
  console.log('TaskList.js - resetTaskForm - Resetting task form');
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
            <h3>Nombre de la lista</h3>
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
    <li key={`${list.id}-${index}`} className="d-flex justify-content-between align-items-center mb-2"> 
    <span>{list.name}</span> 
    <div> 
      <button
       className="btn btn-warning ml-2"
        onClick={() => handleUpdateList(list.id, prompt('Nuevo nombre de la lista:', list.name)) 

        } 
        aria-label={`Editar lista ${list.name}`
        } 
        > Editar </button> 
        <button 
        className="btn btn-danger ml-2" 
        onClick={() => handleDeleteList(list.id)} aria-label={`Eliminar lista ${list.name}`
        }
         > Borrar </button> 
         </div>
          </li> 
        ))
        } 
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
              placeholder='Ingrese su tarea'
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
  <ul className="list-unstyled"> {tasks.length > 0 && 
  tasks.map((task, index) => { console.log("Tarea en el mapeo:", task);
   if (!task) 
   { console.warn('TaskList.js - task is undefined:', task);
    return null;
     } 
     return ( <li key={task.ID_Tarea || task.id || index} className="d-flex justify-content-between align-items-center mb-2"> 
     <span> {task.Tarea} - {task.Prioridad} - {task.Estado} </span> 
     <div> 
      <button 
      className="btn btn-warning ml-2" onClick={
        () => { console.log("ID enviado al editar:", task.ID_Tarea || task.id);
         handleEditTask(task.ID_Tarea || task.id); }
         } aria-label={`Editar tarea ${task.Tarea}`}
          > Editar </button>
           <button
            className="btn btn-danger ml-2" onClick={
              () => handleDeleteTask(task.ID_Tarea || task.id)} aria-label={`Eliminar tarea ${task.Tarea}`}
               > Borrar </button> 
               </div> 
               </li> 
              );
               })
               }
                </ul>
                 </section>

      </div>
    </div>
  </div>
);
}
export default TaskList;