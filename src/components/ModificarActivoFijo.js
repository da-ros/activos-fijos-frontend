import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

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

  const handleSubmit = (e) => {
    e.preventDefault();

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
    <form onSubmit={handleSubmit}>
      <h2>Modificar Activo Fijo: {codigo}</h2>
      <input
        type="text"
        name="codigo"
        placeholder="Código"
        value={activoFijo.codigo}
        onChange={handleChange}
        disabled // El código no se debe modificar
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
      {/* Otros campos opcionales */}
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
      <button type="submit">Guardar Cambios</button>
    </form>
  );
};

export default ModificarActivoFijo;
