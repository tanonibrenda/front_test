import React from 'react';

const Home = () => (
  <main>
    <section className="py-5">
    <div className="container px-4 px-lg-5 my-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Columna izquierda con la imagen */}
          <div className="col-md-5"> {/* 40% de la pantalla */}
            <img
              src="/img/giftodo.gif" 
              alt="Imagen descriptiva"
              className="img-fluid img-thumbnail"
            />
          </div>

          {/* Columna derecha con el texto */}
          <div className="col-md-7"> {/* 60% de la pantalla */}
            <h1 className="text-primary">To Do List</h1>

            <div className='container'>
            <h2>Bienvenido a Tu Aliado de Productividad</h2>
            <p className="mt-3">
            Nuestra plataforma de to-do list está diseñada para ayudarte a gestionar tus tareas de manera fácil y eficiente. Con una interfaz intuitiva y herramientas poderosas, podrás mantenerte al tanto de tus proyectos y alcanzar tus metas sin esfuerzo.
            </p>
            </div>
           
          </div>
        </div>
      </div>
      </div>
    </section>
  </main>
);

export default Home;
