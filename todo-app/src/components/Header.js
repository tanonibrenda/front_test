import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src="/img/checkverde.gif" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
          
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/about" className="nav-link">Sobre Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Registrarse</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Ingresar</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;

