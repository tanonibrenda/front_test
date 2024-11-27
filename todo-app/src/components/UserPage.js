import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPage = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/lists');
        setLists(response.data.lists || []);  // Asegúrate de que la lista no sea undefined
      } catch (error) {
        console.error('Error al obtener listas:', error);
      }
    };
    fetchLists();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Bienvenido a tu página de usuario</h2>
      <button className="btn btn-primary mb-3">Crear Nueva Lista</button>
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
