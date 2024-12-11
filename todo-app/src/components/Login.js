import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        Email: email,
        Contraseña: password,
      });

      if (response.data.user) {
        console.log(`Usuario encontrado: ${response.data.user.Nombre}`);
        localStorage.setItem('token', response.data.token);
        console.log(`Token guardado: ${localStorage.getItem('token')}`);
        alert(`Bienvenido ${response.data.user.Nombre}`);
        navigate('/user-page');
      }
    } catch (error) {
      console.error(error);
      alert('Usuario no encontrado o contraseña incorrecta');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
            <h1 className="text-center text-primary mb-4">Iniciar Sesión</h1>
              {/* <h2 className="text-center text-primary mb-4">Iniciar Sesión</h2> */}
              <form onSubmit={handleLogin}>
                {/* Email Field */}
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="mimail@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="form-group mb-4">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary py-2 fw-bold"
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
