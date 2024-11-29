import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <Link to="/">Logo</Link>
      <ul>
        <li><Link to="/about">Sobre Nosotros</Link></li>
        <li><Link to="/register">Registrarse</Link></li>
        <li><Link to="/login">Ingresar</Link></li>
      </ul>
    </div>
    </nav>
  </header>
);

export default Header;
