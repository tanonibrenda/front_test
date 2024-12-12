import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    document.body.classList.toggle('dark-mode', savedMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.body.classList.toggle('dark-mode', newMode);
  };

  return (
    <header className={`custom-header ${darkMode ? 'dark-header' : ''}`}>
      <nav className={`navbar navbar-expand-lg ${darkMode ? 'dark-header' : ''}`}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src="/img/checkverde.gif" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/about" className={`nav-link ${darkMode ? 'text-light' : 'text-black'}`}>Sobre Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className={`nav-link ${darkMode ? 'text-light' : 'text-black'}`}>Registrarse</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className={`nav-link ${darkMode ? 'text-light' : 'text-black'}`}>Ingresar</Link>
              </li>
            </ul>
            <button onClick={toggleDarkMode} className="btn btn-info ms-auto">
              {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
