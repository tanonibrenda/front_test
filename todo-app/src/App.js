import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import Welcome from './components/Welcome';
import CreateList from './components/CreateList';
import TaskList from './components/TaskList';  
import Footer from './components/Footer';
import './App.css';

function App() {
  const nombre = "Juan";
  const apellido = "Pérez";

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/welcome" element={<Welcome nombre={nombre} apellido={apellido} />} />
          <Route path="/create-list" element={<CreateList />} />  {/* Asegurarse de usar la ruta correcta */}
          <Route path="/task-list" element={<TaskList />} />  {/* Asegurarse de incluir la ruta del TaskList */}
          {/* Otros routes para las demás páginas */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

