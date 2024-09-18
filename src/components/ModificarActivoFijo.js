import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Checkbox, FormControlLabel, Button, Grid, Container, Typography } from '@mui/material';

const ModificarActivoFijo = () => {
  const { state } = useLocation();  // Obtener los datos desde el estado de navegación
  const { codigo } = useParams();   // Obtener el código desde la URL
  const [activoFijo, setActivoFijo] = useState(state?.activo || {  // Usar los datos si están disponibles
    codigo: '',
    nombre: '',
    precio: '',
    porcentajeResidual: '',
    tipoActivo: '',
    porcentajeDepreciacion: '',
    esDepreciable: false,
    numeroSerie: '',
    fechaCompra: '',
    ubicacionActual: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (state?.activo) {
      setActivoFijo(state.activo); // Cargar el activo desde el estado si está disponible
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setActivoFijo({
      ...activoFijo,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!activoFijo.codigo) newErrors.codigo = 'El código es obligatorio';
    if (!activoFijo.nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (!activoFijo.precio) newErrors.precio = 'El precio es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar antes de enviar
    if (!validate()) {
      return;
    }

    // Convertir valores vacíos ('') a null antes de enviar la solicitud POST para modificar
    const dataToSend = { ...activoFijo };
    Object.keys(dataToSend).forEach((key) => {
      if (dataToSend[key] === '') {
        dataToSend[key] = null;
      }
    });

    // Enviar una solicitud POST al backend para actualizar el activo fijo
    axios.post(`http://localhost:8080/activo-fijo`, dataToSend)
      .then(response => {
        console.log('Activo Fijo actualizado:', response.data);
      })
      .catch(error => {
        console.error('Hubo un error al actualizar el activo fijo:', error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Modificar Activo Fijo
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Código"
              name="codigo"
              value={activoFijo.codigo}
              onChange={handleChange}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={activoFijo.nombre}
              onChange={handleChange}
              error={!!errors.nombre}
              helperText={errors.nombre}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Precio"
              name="precio"
              type="number"
              value={activoFijo.precio}
              onChange={handleChange}
              error={!!errors.precio}
              helperText={errors.precio}
            />
          </Grid>
          {/* Campos opcionales */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Porcentaje Residual"
              name="porcentajeResidual"
              type="number"
              value={activoFijo.porcentajeResidual}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tipo de Activo"
              name="tipoActivo"
              value={activoFijo.tipoActivo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Porcentaje de Depreciación"
              name="porcentajeDepreciacion"
              type="number"
              value={activoFijo.porcentajeDepreciacion}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="esDepreciable"
                  checked={activoFijo.esDepreciable}
                  onChange={handleChange}
                />
              }
              label="¿Es Depreciable?"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Número de Serie"
              name="numeroSerie"
              value={activoFijo.numeroSerie}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Fecha de Compra"
              name="fechaCompra"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={activoFijo.fechaCompra}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ubicación Actual"
              name="ubicacionActual"
              value={activoFijo.ubicacionActual}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary" sx= {{marginBottom: 2}}>
              Guardar Cambios
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ModificarActivoFijo;
