import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Welcome from './components/Welcome';
import CreateList from './components/CreateList';
import TaskList from './components/TaskList';
import About from './components/About';
import Footer from './components/Footer';
import UserPage from './components/UserPage';
// import MyList from './components/My_List';
import EditTask from './components/EditTask'; 
import ContactPage from './components/ContactPage';
import './App.css';

function App() {
  const nombre = "Juan";
  const apellido = "Pérez";

  const PrivateRoute = ({ element: Component, ...rest }) => {
    const token = localStorage.getItem('token');
    return token ? <Component {...rest} /> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome nombre={nombre} apellido={apellido} />} />
          <Route path="/create-list" element={<CreateList />} />
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/about" element={<About />} />
          <Route path="/user-page" element={<PrivateRoute element={UserPage} />} />
          <Route path="/contact" element={<ContactPage />}/>
          
          <Route path="/edit-task/:taskId" element={<PrivateRoute element={EditTask} />} /> {/* Nueva ruta protegida para editar tareas */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
