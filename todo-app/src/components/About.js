import React from 'react';

const About = () => (
  <main>
    <section className="hero">
      <h1 className="text-center text-primary mb-4">Sobre Nosotros</h1>
      <p>Descripción básica de la plataforma</p>
      <div className="container mx-auto mt-4">
        <div className="row">
          <div className="col-12 col-md-6 mb-4">
            <div className="card" style={{ width: '18rem' }}>
              <img src="/img/GABI.jpg" className="card-img-top" alt="foto de Gabriel" />
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mb-4">
            <div className="card" style={{ width: '18rem' }}>
              <img src="/img/eze.jpg" className="card-img-top" alt="foto de Ezequiel" />
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mb-4">
            <div className="card" style={{ width: '18rem' }}>
              <img src="/img/nico.jpg" className="card-img-top" alt="foto de Nicolás" />
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mb-4">
            <div className="card" style={{ width: '18rem' }}>
              <img src="/img/brenda.jpg" className="card-img-top" alt="foto de Brenda" />
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default About;


