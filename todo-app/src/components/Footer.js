import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Footer = () => (
  <footer className="custom-footer text-center text-white mt-5">
    <div className="container p-4">
      {/* Sección de enlaces de navegación */}
      <section className="mb-4">
        <nav>
          <ul className="list-unstyled d-flex justify-content-center gap-3 mb-3">
            <li><Link to="/contact" className="text-black text-decoration-none">Contacto</Link></li>
            <li><Link to="/newsletter" className="text-black text-decoration-none">Newsletter</Link></li>
          </ul>
        </nav>
      </section>
      
      <section className="mb-4">
        <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#3b5998' }} href="#!" role="button" aria-label="Facebook">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#55acee' }} href="#!" role="button" aria-label="Twitter">
          <i className="fab fa-twitter"></i>
        </a>
        <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#dd4b39' }} href="#!" role="button" aria-label="Google">
          <i className="fab fa-google"></i>
        </a>
        <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#ac2bac' }} href="#!" role="button" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#0082ca' }} href="#!" role="button" aria-label="LinkedIn">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#333333' }} href="#!" role="button" aria-label="GitHub">
          <i className="fab fa-github"></i>
        </a>
      </section>
    </div>

    {/* Derechos de autor */}
    <div className="text-center p-3" id='copyrigth'>
      © 2024 Copyright:
      <a className="text-white text-decoration-none ms-1" href="#"></a>
    </div>
  </footer>
);

export default Footer;
