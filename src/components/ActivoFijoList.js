import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container, Typography } from '@mui/material';

const ActivoFijoList = () => {
  const [activosFijos, setActivosFijos] = useState([]);
  const navigate = useNavigate(); // Para redirigir y pasar datos

  useEffect(() => {
    // Hacer una solicitud GET al backend para obtener los activos fijos
    axios.get('http://localhost:8080/activo-fijo')
      .then(response => {
        setActivosFijos(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los activos fijos:', error);
      });
  }, []);

  // Función para manejar la redirección y enviar datos al componente de modificación
  const handleModificar = (activo) => {
    navigate(`/modificar-activo/${activo.codigo}`, { state: { activo } });
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Lista de Activos Fijos
      </Typography>
      <TableContainer component={Paper} sx= {{marginBottom: 2}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Porcentaje Residual</TableCell>
              <TableCell>Tipo de Activo</TableCell>
              <TableCell>Porcentaje de Depreciación</TableCell>
              <TableCell>Depreciable</TableCell>
              <TableCell>Numero de Serie</TableCell>
              <TableCell>Fecha de Compra</TableCell>
              <TableCell>Ubicacion Actual</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activosFijos.map((activo) => (
              <TableRow key={activo.codigo}>
                <TableCell>{activo.codigo}</TableCell>
                <TableCell>{activo.nombre}</TableCell>
                <TableCell>{activo.precio}</TableCell>
                <TableCell>{activo.porcentajeResidual}</TableCell>
                <TableCell>{activo.tipoActivo}</TableCell>
                <TableCell>{activo.porcentajeDepreciacion}</TableCell>
                <TableCell>{activo.esDepreciable === true ? 'SI' : 'NO'}</TableCell>
                <TableCell>{activo.numeroSerie}</TableCell>
                <TableCell>{activo.fechaCompra}</TableCell>
                <TableCell>{activo.ubicacionActual}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleModificar(activo)}
                  >
                    Modificar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ActivoFijoList;
