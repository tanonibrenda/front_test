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
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirige si no hay token
          return;
        }

        // Obtener el nombre del usuario
        const userResponse = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsername(userResponse.data.name); // Guarda el nombre del usuario en el estado

        // Obtener las listas
        const listResponse = await axios.get('http://localhost:5000/api/lists', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLists(listResponse.data.lists || []);
      } catch (error) {
        console.error('Error al obtener datos del usuario o listas:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Funcionalidad de botones
  const handleCreateList = () => {
    navigate('/task-list'); // Redirige a la página para crear lista
  };

  const handleViewList = () => {
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

