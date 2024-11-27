import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Inicializar useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        Email: email,
        Contraseña: password
      });

      if (response.data.User) {
        console.log(`Usuario encontrado: ${response.data.User.Nombre}`);
        alert(`Bienvenido ${response.data.User.Nombre}`);
        navigate('/user-page');  // Redirigir a UserPage después de un inicio de sesión exitoso
      }
    } catch (error) {
      console.error(error);
      alert('Usuario no encontrado');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        {/* ...Formulario sin cambios... */}
        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
