import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = ({ nombre, apellido }) => {
  console.log('Welcome.js - Nombre:', nombre);
  console.log('Welcome.js - Apellido:', apellido);

  return (
    <div className="container mt-5 text-center">
      <h2>Bienvenida {nombre} {apellido}</h2>
      <div className="mt-4">
        <Link to="/crear-lista" className="btn btn-primary mr-3">
          Crear Lista
        </Link>
        <Link to="/ver-lista" className="btn btn-secondary">
          Ver Lista
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
