import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ActivoFijoForm from './components/ActivoFijoForm.js';
import ActivoFijoList from './components/ActivoFijoList.js';
import ModificarActivoFijo from './components/ModificarActivoFijo.js';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/crear-activo">Crear Activo Fijo</Link></li>
            <li><Link to="/activo-fijo">Ver Activos Fijos</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/crear-activo" element={<ActivoFijoForm />} />
          <Route path="/activo-fijo" element={<ActivoFijoList />} />
          <Route path="/modificar-activo/:codigo" element={<ModificarActivoFijo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
