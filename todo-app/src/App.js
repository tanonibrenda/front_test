import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import Welcome from './components/Welcome';
import CreateList from './components/CreateList';
import Footer from './components/Footer';

function App() {
  // Suponiendo que estos valores se obtienen después de registrarse o iniciar sesión
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
          <Route path="/crear-lista" element={<CreateList />} />
          {/* Otros routes para las demás páginas */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
