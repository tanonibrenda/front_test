import React from 'react';

const About = () => (
  <main>
    <section className="hero">
      <h1 className="text-center text-primary mb-4">Sobre Nosotros</h1>
      <div className="container mx-auto mt-4">
      <p>Bienvenidos a nuestro proyecto final para el Bootscamp Full Stack de Cilsa. Para cumplir los requisitos del programa construimos una web responsive y accesible con una app de "To Do List" utilizanco React, Javascript y Sqlite2.<br/>
      La gestión de proyecto se hizo con espíritu de respetar la inclusión y accesibilidad. Se utilizaron herramientas que sean accesibles para todos los miembros del equipo:
      </p>
      <ul>
      <li>Se creó un grupo de WhatsApp.</li>
      <li>Se creo una carpeta en Google Drive para Compartir documentos.</li>
      <li>Se creó un repositorio para gestión de versiones.</li>
      </ul>
      </div>
      <div className="container mx-auto mt-4">
        <div className="row">
          <div className="col-12 col-md-6 mb-4">
            <div className="card" style={{ width: '18rem' }}>
              <img src="/img/GABI.jpg" className="card-img-top" alt="foto de Gabriel" />
              <div className="card-body">
                <p className="card-text">Gabriel Manfredi.</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mb-4">
            <div className="card" style={{ width: '18rem' }}>
              <img src="/img/eze.jpg" className="card-img-top" alt="foto de Ezequiel" />
              <div className="card-body">
                <p className="card-text">Ezequiel Bernandini.</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mb-4">
            <div className="card" style={{ width: '18rem' }}>
              <img src="/img/nico.jpg" className="card-img-top" alt="foto de Nicolás" />
              <div className="card-body">
                <p className="card-text">Nicolás Hernandez.</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mb-4">
            <div className="card" style={{ width: '18rem' }}>
              <img src="/img/brenda.jpg" className="card-img-top" alt="foto de Brenda" />
              <div className="card-body">
                <p className="card-text">Brenda Yohena Tanoni.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default About;


