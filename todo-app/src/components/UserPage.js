import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const [lists, setLists] = useState([]);
  const [username, setUsername] = useState(''); // Estado para almacenar el nombre del usuario
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('UserPage.js - Obteniendo token de localStorage');
        const token = localStorage.getItem('token');
        console.log('UserPage.js - Token obtenido:', token);
        
        if (!token) {
          console.warn('UserPage.js - No token found, redirecting to login');
          navigate('/login'); // Redirige si no hay token
          return;
        }

        // Obtener el nombre del usuario
        console.log('UserPage.js - Fetching user data');
        const userResponse = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('UserPage.js - User data fetched:', userResponse.data);
        setUsername(userResponse.data.name); // Guarda el nombre del usuario en el estado

        // Obtener las listas
        console.log('UserPage.js - Fetching lists');
        const listResponse = await axios.get('http://localhost:5000/api/lists', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('UserPage.js - Lists fetched:', listResponse.data.lists);
        setLists(listResponse.data.lists || []);
      } catch (error) {
        console.error('UserPage.js - Error al obtener datos del usuario o listas:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Funcionalidad de botones
  const handleCreateList = () => {
    console.log('UserPage.js - Redirigiendo a /task-list para crear una nueva lista');
    navigate('/task-list'); // Redirige a la página para crear lista
  };

  const handleViewList = () => {
    console.log('UserPage.js - Redirigiendo a /view-lists para ver las listas');
    navigate('/view-lists'); // Ajusta esto a tu ruta real para ver listas
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Bienvenida {username}</h2>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-primary" onClick={handleCreateList}>Crear Lista</button>
        <button className="btn btn-secondary" onClick={handleViewList}>Ver Lista</button>
      </div>

      <h3 className="mt-5">Tus Listas</h3>
      {lists.length > 0 ? (
        <ul className="list-unstyled">
          {lists.map((list) => (
            <li key={list.id} className="mt-2">{list.name}</li>
          ))}
        </ul>
      ) : (
        <p>No hay listas disponibles</p>
      )}
    </div>
  );
};

export default UserPage;
