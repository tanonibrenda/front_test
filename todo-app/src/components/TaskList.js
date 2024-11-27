import React from 'react';

const TaskList = () => {
  // Datos iniciales de ejemplo. Debes conectarlos con el backend.
  const tasks = [
    { tarea: 'Tarea 1', prioridad: 'Hacer', estado: 'No Iniciado' },
    { tarea: 'Tarea 2', prioridad: 'Planificar', estado: 'En curso' }
  ];

  return (
    <div className="container mt-5">
      <h2>Mis Tareas</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Tarea</th>
            <th scope="col">Prioridad</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.tarea}</td>
              <td>{task.prioridad}</td>
              <td>{task.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
