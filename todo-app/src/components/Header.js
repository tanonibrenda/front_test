import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <Link to="/">Logo</Link>
      <ul>
        <li><Link to="/about">Sobre Nosotros</Link></li>
        <li><Link to="/register">Registrarse</Link></li>
        <li><Link to="/login">Ingresar</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
