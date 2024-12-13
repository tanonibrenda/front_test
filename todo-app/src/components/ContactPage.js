import React, { useState } from 'react';
import axios from 'axios';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      console.log('Mensaje enviado:', response.data);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
      <div className="card shadow-sm">
      <div className="card-body">
      <h1 className="text-center text-primary mb-4">Contacto</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder='Ingrese su nombre'
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder='Ingrese su e-mail'
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder='Ingrese su mensaje'
          />
        </div>
        <div className="d-grid mt-2">
        <button type="submit" className="btn btn-primary py-2 fw-bold">Enviar</button>
        </div>
      </form>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default ContactPage;
