import React from 'react';

const Newsletter = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Actualidad en Gestión de Proyectos</h2>
      
      <section>
        <h3 className="text-primary">Tendencias en Gestión de Proyectos</h3>
        <p>
          La gestión de proyectos está en constante evolución, impulsada por tecnologías emergentes y la necesidad de mejorar la eficiencia y la colaboración. Algunas de las tendencias actuales incluyen el uso de inteligencia artificial y machine learning para la previsión de riesgos, herramientas de colaboración remota mejoradas, y metodologías ágiles como Scrum y Kanban.
        </p>
      </section>
      
      <section className="mt-5">
        <h3 className="text-primary">Utilidad de las To-Do Lists</h3>
        <p>
          Las listas de tareas o to-do lists son herramientas esenciales para mantener un trabajo ordenado y eficiente. Facilitan la priorización de tareas, el seguimiento del progreso y la gestión del tiempo. Además, proporcionan una clara visión de las responsabilidades y ayudan a evitar el olvido de tareas importantes.
        </p>
        <ul>
          <li><b>Priorización:</b> Identificar qué tareas son más urgentes y deben ser abordadas primero.</li>
          <li><b>Seguimiento del Progreso:</b> Monitorizar el avance de cada tarea y el proyecto en su totalidad.</li>
          <li><b>Gestión del Tiempo:</b> Ayudar a distribuir el tiempo de manera efectiva entre diferentes tareas.</li>
          <li><b>Reducción del Estrés:</b> Tener un plan claro reduce la ansiedad y mejora la productividad.</li>
        </ul>
      </section>
      
      {/* <section className="mt-5">
        <h3 className="text-primary">Suscríbete a Nuestro Boletín</h3>
        <p>
          Mantente al día con las últimas noticias y tendencias en gestión de proyectos y productividad. Suscríbete a nuestro boletín mensual para recibir consejos, herramientas y actualizaciones directamente en tu bandeja de entrada.
        </p>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input type="email" className="form-control" id="email" placeholder="nombre@ejemplo.com" required />
          </div>
          <button type="submit" className="btn btn-primary">Suscribirse</button>
        </form>
      </section> */}
    </div>
  );
};

export default Newsletter;
