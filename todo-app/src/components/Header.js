import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <Link to="/"  class="navbar-brand">Logo</Link>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item"><Link to="/about" class="nav-link">Sobre Nosotros</Link></li>
        <li class="nav-item"><Link to="/register" class="nav-link">Registrarse</Link></li>
        <li class="nav-item"><Link to="/login" class="nav-link">Ingresar</Link></li>
      </ul>
      </div>
    </div>
    </nav>
  </header>
);

export default Header;
