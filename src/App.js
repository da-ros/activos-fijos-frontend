import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ActivoFijoForm from './components/ActivoFijoForm.js';
import ActivoFijoList from './components/ActivoFijoList.js';
import ModificarActivoFijo from './components/ModificarActivoFijo.js';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Button, Container, Stack } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginTop: 4, marginBottom: 4 }}>
            <Button component={Link} to="/crear-activo" variant="contained" color="primary">
              Crear Activo Fijo
            </Button>
            <Button component={Link} to="/activo-fijo" variant="contained" color="primary">
              Ver Activos Fijos
            </Button>
          </Stack>
            <Routes>
              <Route path="/crear-activo" element={<ActivoFijoForm />} />
              <Route path="/activo-fijo" element={<ActivoFijoList />} />
              <Route path="/modificar-activo/:codigo" element={<ModificarActivoFijo />} />
            </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
