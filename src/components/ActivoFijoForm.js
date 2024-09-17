import React, { useState } from 'react';
import axios from 'axios';

const ActivoFijoForm = () => {
  const [activoFijo, setActivoFijo] = useState({
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setActivoFijo({
      ...activoFijo,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convertir valores vacíos ('') a null
    const dataToSend = { ...activoFijo };
    Object.keys(dataToSend).forEach((key) => {
        if (dataToSend[key] === '') {
            dataToSend[key] = null;
        }
    });

    axios.post('http://localhost:8080/activo-fijo', dataToSend)
      .then(response => {
        console.log('Activo Fijo creado:', response.data);
      })
      .catch(error => {
        console.error('Hubo un error al crear el activo fijo:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="codigo"
        placeholder="Código"
        value={activoFijo.codigo}
        onChange={handleChange}
      />
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={activoFijo.nombre}
        onChange={handleChange}
      />
      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={activoFijo.precio}
        onChange={handleChange}
      />
      {/* Campos opcionales */}
      <input
        type="number"
        name="porcentajeResidual"
        placeholder="Porcentaje Residual"
        value={activoFijo.porcentajeResidual}
        onChange={handleChange}
      />
      <input
        type="text"
        name="tipoActivo"
        placeholder="Tipo de Activo"
        value={activoFijo.tipoActivo}
        onChange={handleChange}
      />
      <input
        type="number"
        name="porcentajeDepreciacion"
        placeholder="Porcentaje de Depreciación"
        value={activoFijo.porcentajeDepreciacion}
        onChange={handleChange}
      />
      <label>
        ¿Es Depreciable?
        <input
          type="checkbox"
          name="esDepreciable"
          checked={activoFijo.esDepreciable}
          onChange={handleChange}
        />
      </label>
      <input
        type="text"
        name="numeroSerie"
        placeholder="Número de Serie"
        value={activoFijo.numeroSerie}
        onChange={handleChange}
      />
      <input
        type="date"
        name="fechaCompra"
        placeholder="Fecha de Compra"
        value={activoFijo.fechaCompra}
        onChange={handleChange}
      />
      <input
        type="text"
        name="ubicacionActual"
        placeholder="Ubicación Actual"
        value={activoFijo.ubicacionActual}
        onChange={handleChange}
      />
      <button type="submit">Crear Activo Fijo</button>
    </form>
  );
};

export default ActivoFijoForm;
