import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer>
    <nav>
      <ul>
        <li><Link to="/contact">Contacto</Link></li> {/* Ajuste la ruta aquí */}
        <li><Link to="/newsletter">Newsletter</Link></li>
        {/* <li><Link to="/my-lists">Mis listas</Link></li> */}
      </ul>
    </nav>
  </footer>
);

export default Footer;

