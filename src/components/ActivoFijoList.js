import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      <h2>Lista de Activos Fijos</h2>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Porcentaje Residual</th>
            <th>Tipo de Activo</th>
            <th>Porcentaje de Depreciación</th>
            <th>Depreciable</th>
            <th>Numero de Serie</th>
            <th>Fecha de Compra</th>
            <th>Ubicacion Actual</th>
          </tr>
        </thead>
        <tbody>
          {activosFijos.map(activo => (
            <tr key={activo.codigo}>
              <td>{activo.codigo}</td>
              <td>{activo.nombre}</td>
              <td>{activo.precio}</td>
              <td>{activo.porcentajeResidual}</td>
              <td>{activo.tipoActivo}</td>
              <td>{activo.porcentajeDepreciacion}</td>
              <td>{activo.esDepreciable}</td>
              <td>{activo.numeroSerie}</td>
              <td>{activo.fechaCompra}</td>
              <td>{activo.ubicacionActual}</td>
              <td>
                <button onClick={() => handleModificar(activo)}>Modificar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivoFijoList;
