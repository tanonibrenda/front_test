import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewList = () => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('ViewList.js - No token found, redirecting to login');
          navigate('/login');
          return;
        }
        console.log('ViewList.js - Fetching lists with token:', token);
        const response = await axios.get('http://localhost:5000/api/lists', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('ViewList.js - Lists fetched:', response.data.lists);
        setLists(response.data.lists || []);
      } catch (error) {
        console.error('ViewList.js - Error al cargar listas:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };
    fetchLists();
  }, [navigate]);

  const handleCreateList = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('ViewList.js - Creating list with name:', newListName);
      const response = await axios.post('http://localhost:5000/api/lists', { name: newListName }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('ViewList.js - List created:', response.data);
      setLists([...lists, response.data]);
      setNewListName('');
    } catch (error) {
      console.error('ViewList.js - Error al crear lista:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleUpdateList = async (id, updatedName) => {
    try {
      const token = localStorage.getItem('token');
      console.log(`ViewList.js - Updating list with ID ${id} and name:`, updatedName);
      const response = await axios.put(`http://localhost:5000/api/lists/${id}`, { name: updatedName }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('ViewList.js - List updated:', response.data);
      setLists(lists.map((list) => (list.id === id ? response.data : list)));
    } catch (error) {
      console.error(`ViewList.js - Error al actualizar la lista con ID ${id}:`, error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleDeleteList = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      console.log(`ViewList.js - Deleting list with ID: ${id}`);
      await axios.delete(`http://localhost:5000/api/lists/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLists(lists.filter((list) => list.id !== id));
    } catch (error) {
      console.error(`ViewList.js - Error al eliminar la lista con ID ${id}:`, error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Mis Listas</h2>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Nueva lista"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleCreateList}>Crear Lista</button>
      </div>
      <ul className="list-group mt-3">
        {lists.map((list, index) => (
          <li key={`${list.id}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{list.name}</span>
            <div>
              <button
                className="btn btn-warning mr-2"
                onClick={() => {
                  const updatedName = prompt('Nuevo nombre de la lista:', list.name);
                  if (updatedName) {
                    handleUpdateList(list.id, updatedName);
                  }
                }}
              >
                Editar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteList(list.id)}
              >
                Borrar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewList;
