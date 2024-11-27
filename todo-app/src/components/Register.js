import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate

const Register = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    confirmarContraseña: ''
  });
  const navigate = useNavigate();  // Inicializar useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.contraseña !== form.confirmarContraseña) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        Nombre: form.nombre,
        Apellido: form.apellido,
        Email: form.email,
        Contraseña: form.contraseña
      });

      console.log('Datos del usuario registrados:', response.data);
      alert('Registro exitoso');
      navigate('/user-page');  // Redirigir a UserPage después de un registro exitoso
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Hubo un error en el registro');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Formulario de Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="contraseña"
            name="contraseña"
            value={form.contraseña}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmarContraseña">Confirmar Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="confirmarContraseña"
            name="confirmarContraseña"
            value={form.confirmarContraseña}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
