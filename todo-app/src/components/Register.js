import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  

const Register = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    confirmarContraseña: ''
  });
  const navigate = useNavigate();  

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Register.js - handleChange - Campo: ${name}, Valor: ${value}`);
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Register.js - handleSubmit - Formulario enviado');
    console.log('Register.js - handleSubmit - Datos del formulario:', form);

    if (form.contraseña !== form.confirmarContraseña) {
      alert('Las contraseñas no coinciden');
      console.warn('Register.js - handleSubmit - Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        Nombre: form.nombre,
        Apellido: form.apellido,
        Email: form.email,
        Contraseña: form.contraseña
      });

      console.log('Register.js - Datos del usuario registrados:', response.data);
      alert('Registro exitoso');
      navigate('/user-page');  
    } catch (error) {
      console.error('Register.js - Error al registrar usuario:', error);
      alert('Hubo un error en el registro');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="text-center text-primary mb-4">Formulario de Registro</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    placeholder='Ingresa tu nombre'
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
                    placeholder='Ingresa tu apellido'
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
                    placeholder='Ingresa tu email'
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
                    placeholder='Ingresa tu contraseña'
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
                    placeholder='Ingresa nuevamente tu contraseña'
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary mt-4 py-2">Registrarse</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
