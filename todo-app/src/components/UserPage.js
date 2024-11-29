import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
        if (!token) {
          navigate('/login'); // Redirigir a la página de inicio de sesión si no hay token
          return;
        }
        const response = await axios.get('http://localhost:5000/api/lists', {
          headers: { Authorization: `Bearer ${token}` } // Incluir el token en los encabezados de la solicitud
        });
        setLists(response.data.lists || []);
      } catch (error) {
        console.error('Error al obtener listas:', error);
      }
    };
    fetchLists();
  }, [navigate]);

  const handleCreateList = () => {
    navigate('/task-list');
  };

  return (
    <div className="container mt-5">
      <h2>Bienvenido a tu página de usuario</h2>
      <button className="btn btn-primary mb-3" onClick={handleCreateList}>Crear Nueva Lista</button>
      <h3>Tus Listas</h3>
      <ul>
        {lists.length > 0 ? (
          lists.map((list) => (
            <li key={list.id}>{list.name}</li>
          ))
        ) : (
          <li>No hay listas disponibles</li>
        )}
      </ul>
    </div>
  );
};

export default UserPage;
